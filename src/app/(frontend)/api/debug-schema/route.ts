import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action')

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool

    if (!pool?.query) {
      return NextResponse.json({ error: 'No pool' })
    }

    if (action === 'dashboard-fix') {
      // Clean up locked_documents and preferences that reference removed collections
      const results: Record<string, string> = {}
      for (const sql of [
        `DELETE FROM payload_locked_documents_rels WHERE pages_id IS NOT NULL OR company_pages_id IS NOT NULL`,
        `DELETE FROM payload_locked_documents WHERE id IN (
          SELECT ld.id FROM payload_locked_documents ld
          LEFT JOIN payload_locked_documents_rels r ON r."parent_id" = ld.id
          WHERE r.id IS NULL
        )`,
      ]) {
        try {
          const r = await pool.query(sql)
          results[sql.slice(0, 60)] = `OK (${r.rowCount} rows)`
        } catch (e: any) {
          results[sql.slice(0, 60)] = `ERR: ${e.message?.slice(0, 100)}`
        }
      }

      // Also check if there are columns referencing removed collections
      try {
        const cols = await pool.query(`
          SELECT column_name FROM information_schema.columns
          WHERE table_name = 'payload_locked_documents_rels'
          ORDER BY ordinal_position
        `)
        results['locked_docs_rels_columns'] = cols.rows.map((r: any) => r.column_name).join(', ')
      } catch (e: any) {
        results['locked_docs_rels_columns'] = `ERR: ${e.message?.slice(0, 100)}`
      }

      return NextResponse.json({ action: 'dashboard-fix', results })
    }

    if (action === 'fix-all') {
      const results: Record<string, string[]> = {}

      // Helper to run ALTER statements
      async function runAlters(label: string, statements: string[]) {
        results[label] = []
        for (const sql of statements) {
          try {
            await pool.query(sql)
            results[label].push('OK')
          } catch (e: any) {
            results[label].push(`ERR: ${e.message.slice(0, 100)}`)
          }
        }
      }

      // 1. Fix contact_submissions — table missing entirely
      await runAlters('contact_submissions', [
        `CREATE TABLE IF NOT EXISTS contact_submissions (
          id serial PRIMARY KEY,
          first_name varchar NOT NULL,
          last_name varchar NOT NULL,
          email varchar NOT NULL,
          company varchar,
          message text NOT NULL,
          consent_given boolean DEFAULT false,
          consent_timestamp timestamptz,
          status varchar DEFAULT 'new',
          updated_at timestamptz DEFAULT NOW(),
          created_at timestamptz DEFAULT NOW()
        )`,
      ])

      // 2. Fix homepage — missing columns for hero CTA buttons and locales
      await runAlters('homepage', [
        `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_video_url varchar`,
        `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS updated_at timestamptz`,
        `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS created_at timestamptz`,
        `CREATE TABLE IF NOT EXISTS homepage_hero_cta_buttons (
          _order integer NOT NULL, _parent_id integer NOT NULL,
          id serial PRIMARY KEY, label varchar, href varchar, variant varchar
        )`,
        `CREATE TABLE IF NOT EXISTS homepage_stats (
          _order integer NOT NULL, _parent_id integer NOT NULL,
          id serial PRIMARY KEY, value varchar, label varchar
        )`,
        `CREATE TABLE IF NOT EXISTS homepage_locales (
          id serial PRIMARY KEY, _locale varchar NOT NULL, _parent_id integer NOT NULL,
          hero_heading varchar, hero_sub_heading varchar
        )`,
      ])

      // 3. Fix pages — missing block tables
      await runAlters('pages', [
        `ALTER TABLE pages ADD COLUMN IF NOT EXISTS parent_id integer`,
        `ALTER TABLE pages ADD COLUMN IF NOT EXISTS seo_og_image_id integer`,
        `ALTER TABLE pages ADD COLUMN IF NOT EXISTS seo_no_index boolean DEFAULT false`,
      ])

      // 4. Fix company_pages — missing columns
      await runAlters('company_pages', [
        `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS approval_status varchar DEFAULT 'draft'`,
        `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS approval_notes varchar`,
        `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS seo_og_image_id integer`,
      ])

      // 5. Fix legal_pages — missing columns
      await runAlters('legal_pages', [
        `ALTER TABLE legal_pages ADD COLUMN IF NOT EXISTS approval_status varchar DEFAULT 'draft'`,
        `ALTER TABLE legal_pages ADD COLUMN IF NOT EXISTS approval_notes varchar`,
        `ALTER TABLE legal_pages ADD COLUMN IF NOT EXISTS last_updated timestamptz`,
        `ALTER TABLE legal_pages ADD COLUMN IF NOT EXISTS seo_no_index boolean DEFAULT false`,
      ])

      // Verify all globals and failing collections
      const verify: Record<string, string> = {}
      for (const slug of ['site-config', 'homepage'] as const) {
        try { await payload.findGlobal({ slug }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 150) }
      }
      for (const slug of ['pages', 'company-pages', 'legal-pages', 'contact-submissions'] as const) {
        try { await payload.find({ collection: slug, limit: 1 }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 150) }
      }

      return NextResponse.json({ action: 'fix-all', results, verify })
    }

    if (action === 'inspect') {
      // Inspect specific tables to understand what's missing
      const inspectTables = ['homepage', 'pages', 'company_pages']
      const inspection: Record<string, any> = {}

      for (const table of inspectTables) {
        try {
          // Check if table exists and get columns
          const cols = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = $1
            ORDER BY ordinal_position
          `, [table])
          inspection[table] = { exists: cols.rows.length > 0, columns: cols.rows }
        } catch (e: any) {
          inspection[table] = { exists: false, error: e.message?.slice(0, 100) }
        }
      }

      // Also check for homepage-related tables
      const homepageTables = await pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name LIKE 'homepage%'
        ORDER BY table_name
      `)
      inspection['homepage_related_tables'] = homepageTables.rows.map((r: any) => r.table_name)

      return NextResponse.json({ action: 'inspect', inspection })
    }

    if (action === 'fix-tables') {
      const results: Record<string, string> = {}

      async function runSQL(label: string, sql: string) {
        try {
          await pool.query(sql)
          results[label] = 'OK'
        } catch (e: any) {
          results[label] = `ERR: ${e.message?.slice(0, 150)}`
        }
      }

      // 1. Create homepage main table (sub-tables already exist)
      await runSQL('homepage_table', `
        CREATE TABLE IF NOT EXISTS homepage (
          id serial PRIMARY KEY,
          hero_video_url varchar,
          updated_at timestamptz DEFAULT NOW(),
          created_at timestamptz DEFAULT NOW()
        )
      `)

      // Insert a default row if empty (globals need exactly 1 row)
      await runSQL('homepage_default_row', `
        INSERT INTO homepage (id) VALUES (1) ON CONFLICT (id) DO NOTHING
      `)

      // 2. Fix pages — check what columns/sub-tables are missing
      // The query references pages__blocks — let me check what Payload expects
      // For versioned collections with blocks, Payload creates _blocks_ tables
      // Check if pages_blocks_* tables have the right _parent_id references
      await runSQL('pages_add_parent_id', `ALTER TABLE pages ADD COLUMN IF NOT EXISTS parent_id integer`)
      await runSQL('pages_add_seo_og_image_id', `ALTER TABLE pages ADD COLUMN IF NOT EXISTS seo_og_image_id integer`)
      await runSQL('pages_add_seo_no_index', `ALTER TABLE pages ADD COLUMN IF NOT EXISTS seo_no_index boolean DEFAULT false`)

      // 3. Fix company_pages
      await runSQL('company_pages_add_approval_status', `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS approval_status varchar DEFAULT 'pending'`)
      await runSQL('company_pages_add_approval_notes', `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS approval_notes varchar`)
      await runSQL('company_pages_add_hero_image_id', `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS hero_image_id integer`)
      await runSQL('company_pages_add_seo_og_image_id', `ALTER TABLE company_pages ADD COLUMN IF NOT EXISTS seo_og_image_id integer`)

      // Verify after fix — get FULL error messages
      const verify: Record<string, string> = {}
      for (const slug of ['homepage'] as const) {
        try { await payload.findGlobal({ slug }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 600) }
      }
      for (const slug of ['pages', 'company-pages'] as const) {
        try { await payload.find({ collection: slug, limit: 1 }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 600) }
      }

      return NextResponse.json({ action: 'fix-tables', results, verify })
    }

    if (action === 'push-schema') {
      // Inline the pushDevSchema logic from @payloadcms/drizzle
      // We bypass Turbopack bundling by using createRequire to load drizzle-kit at runtime.
      try {
        const db = payload.db as any

        // Use the adapter's own requireDrizzleKit which uses createRequire internally
        // If that fails (Turbopack hashing), fall back to process.cwd()-based require
        let pushSchema: any
        try {
          const kit = db.requireDrizzleKit()
          pushSchema = kit.pushSchema
        } catch {
          // Turbopack may hash the module name — try loading from node_modules directly
          const { createRequire } = await import('module')
          const nodeRequire = createRequire(process.cwd() + '/package.json')
          const kit = nodeRequire('drizzle-kit/api')
          pushSchema = kit.pushSchema
        }

        // 2. Call pushSchema with the adapter's schema
        const { apply, hasDataLoss, warnings } = await pushSchema(
          db.schema,
          db.drizzle,
          db.schemaName ? [db.schemaName] : undefined,
          db.tablesFilter,
          undefined, // extensionsFilter
        )

        const pushInfo = {
          warnings: warnings || [],
          hasDataLoss: !!hasDataLoss,
        }

        // 3. Apply the schema changes (auto-accept warnings in production)
        await apply()

        // 4. Update the migration record
        const migrationsTable = db.schemaName
          ? `"${db.schemaName}"."payload_migrations"`
          : '"payload_migrations"'

        const devPush = await db.execute({
          drizzle: db.drizzle,
          raw: `SELECT * FROM ${migrationsTable} WHERE batch = '-1'`,
        })

        if (!devPush.rows?.length) {
          await db.drizzle.insert(db.tables.payload_migrations).values({
            name: 'dev',
            batch: -1,
          })
        } else {
          await db.execute({
            drizzle: db.drizzle,
            raw: `UPDATE ${migrationsTable} SET updated_at = CURRENT_TIMESTAMP WHERE batch = '-1'`,
          })
        }

        // 5. Verify all globals and collections after push
        const verify: Record<string, string> = {}
        for (const slug of ['site-config', 'navigation', 'footer', 'redirects', 'homepage'] as const) {
          try { await payload.findGlobal({ slug }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 150) }
        }
        for (const slug of ['users', 'media', 'pages', 'products', 'blog-posts', 'solutions', 'industries', 'platforms', 'services', 'partners', 'company-pages', 'legal-pages', 'resources', 'contact-submissions'] as const) {
          try { await payload.find({ collection: slug as any, limit: 1 }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 150) }
        }

        return NextResponse.json({ action: 'push-schema', status: 'schema pushed successfully', pushInfo, verify })
      } catch (err: any) {
        return NextResponse.json({ action: 'push-schema', error: err.message?.slice(0, 500), stack: err.stack?.slice(0, 500) })
      }
    }

    // Diagnose: test every global and collection
    const globalSlugs = ['site-config', 'navigation', 'footer', 'redirects', 'homepage']
    const globalResults: Record<string, string> = {}
    for (const slug of globalSlugs) {
      try {
        await payload.findGlobal({ slug })
        globalResults[slug] = 'OK'
      } catch (err: any) {
        globalResults[slug] = `ERROR: ${err.message?.slice(0, 200)}`
      }
    }

    const collectionSlugs = [
      'users', 'media', 'pages', 'products', 'blog-posts', 'solutions',
      'industries', 'platforms', 'services', 'partners', 'company-pages',
      'legal-pages', 'resources', 'contact-submissions',
    ]
    const collectionResults: Record<string, string> = {}
    for (const slug of collectionSlugs) {
      try {
        await payload.find({ collection: slug as any, limit: 1 })
        collectionResults[slug] = 'OK'
      } catch (err: any) {
        collectionResults[slug] = `ERROR: ${err.message?.slice(0, 200)}`
      }
    }

    // Check all tables exist
    const tables = await pool.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name
    `)

    return NextResponse.json({
      globals: globalResults,
      collections: collectionResults,
      tableCount: tables.rows.length,
      tables: tables.rows.map((r: any) => r.table_name),
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack?.slice(0, 500) })
  }
}
