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

    // ── schema-diff: compare Payload's expected tables vs actual DB tables ──
    if (action === 'schema-diff') {
      const db = payload.db as any

      // Get all table names Payload expects from its Drizzle schema
      const expectedTables = Object.keys(db.tables || {}).sort()

      // Get all actual tables in the database
      const result = await pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' ORDER BY table_name
      `)
      const actualTables = result.rows.map((r: any) => r.table_name).sort()

      // Find missing tables
      const actualSet = new Set(actualTables)
      const missingTables = expectedTables.filter((t: string) => !actualSet.has(t))

      // For each missing table, get column info from Drizzle schema
      const missingDetails: Record<string, string[]> = {}
      for (const tableName of missingTables) {
        const table = db.tables[tableName]
        if (table) {
          const cols = Object.keys(table).filter(
            (k: string) => k !== Symbol.for('drizzle:Name') && !k.startsWith('_')
          )
          missingDetails[tableName] = cols
        }
      }

      // Also check for missing columns in existing tables
      const missingColumns: Record<string, string[]> = {}
      for (const tableName of expectedTables) {
        if (actualSet.has(tableName) && db.tables[tableName]) {
          const expectedCols = Object.keys(db.tables[tableName]).filter(
            (k: string) => typeof db.tables[tableName][k] === 'object' && db.tables[tableName][k]?.name
          )

          const actualCols = await pool.query(`
            SELECT column_name FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = $1
          `, [tableName])
          const actualColSet = new Set(actualCols.rows.map((r: any) => r.column_name))

          const missing = expectedCols.filter((c: string) => {
            const colName = db.tables[tableName][c]?.name
            return colName && !actualColSet.has(colName)
          })

          if (missing.length > 0) {
            missingColumns[tableName] = missing.map((c: string) => db.tables[tableName][c]?.name)
          }
        }
      }

      return NextResponse.json({
        action: 'schema-diff',
        expectedTableCount: expectedTables.length,
        actualTableCount: actualTables.length,
        missingTableCount: missingTables.length,
        missingTables,
        missingColumns,
      })
    }

    // ── sync-schema: create all missing tables using Drizzle schema info ──
    if (action === 'sync-schema') {
      const db = payload.db as any
      const results: Record<string, string> = {}

      // Get existing enum types in the database
      const existingEnums = await pool.query(`
        SELECT typname FROM pg_type WHERE typtype = 'e'
      `)
      const existingEnumSet = new Set(existingEnums.rows.map((r: any) => r.typname))

      // First pass: discover and create all missing enum types from Drizzle enums
      const drizzleEnums = db.enums || {}
      for (const enumName of Object.keys(drizzleEnums)) {
        if (existingEnumSet.has(enumName)) continue
        const enumObj = drizzleEnums[enumName]
        // Drizzle enum has .enumValues array
        const values = enumObj?.enumValues
        if (values && Array.isArray(values) && values.length > 0) {
          const valList = values.map((v: string) => `'${v}'`).join(', ')
          try {
            await pool.query(`CREATE TYPE "${enumName}" AS ENUM (${valList})`)
            results[`enum:${enumName}`] = 'CREATED'
            existingEnumSet.add(enumName)
          } catch (e: any) {
            if (e.message?.includes('already exists')) {
              existingEnumSet.add(enumName)
            } else {
              results[`enum:${enumName}`] = `ERR: ${e.message?.slice(0, 100)}`
            }
          }
        }
      }

      // Get actual tables
      const result = await pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' ORDER BY table_name
      `)
      const actualSet = new Set(result.rows.map((r: any) => r.table_name))

      // Get all expected tables from Drizzle schema
      const expectedTables = Object.keys(db.tables || {})

      for (const tableName of expectedTables) {
        if (actualSet.has(tableName)) continue // Table exists

        const table = db.tables[tableName]
        if (!table) continue

        // Build CREATE TABLE from Drizzle column definitions
        const columns: string[] = []
        for (const key of Object.keys(table)) {
          const col = table[key]
          if (!col || typeof col !== 'object' || !col.name) continue
          // Skip if it's not a column (could be a relation or index)
          if (!col.dataType && !col.columnType) continue

          let colDef = `"${col.name}"`

          // Map Drizzle types to PostgreSQL types
          const sqlType = col.getSQLType?.() || col.sqlName || 'varchar'
          if (col.primary && sqlType === 'serial') {
            colDef += ' serial PRIMARY KEY'
          } else {
            colDef += ` ${sqlType}`
            if (col.notNull) colDef += ' NOT NULL'
            if (col.hasDefault && col.default !== undefined) {
              const def = typeof col.default === 'function' ? null : col.default
              if (def !== null && def !== undefined && typeof def !== 'object') {
                colDef += ` DEFAULT ${typeof def === 'string' ? `'${def}'` : def}`
              }
            }
          }
          columns.push(colDef)
        }

        if (columns.length === 0) continue

        const sql = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columns.join(', ')})`
        try {
          await pool.query(sql)
          results[tableName] = 'CREATED'
        } catch (e: any) {
          results[tableName] = `ERR: ${e.message?.slice(0, 120)}`
        }
      }

      // Also add missing columns to existing tables
      for (const tableName of expectedTables) {
        if (!actualSet.has(tableName)) continue // Already handled above
        const table = db.tables[tableName]
        if (!table) continue

        const actualCols = await pool.query(`
          SELECT column_name FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
        `, [tableName])
        const actualColSet = new Set(actualCols.rows.map((r: any) => r.column_name))

        for (const key of Object.keys(table)) {
          const col = table[key]
          if (!col || typeof col !== 'object' || !col.name) continue
          if (!col.dataType && !col.columnType) continue
          if (actualColSet.has(col.name)) continue // Column exists

          const sqlType = col.getSQLType?.() || col.sqlName || 'varchar'
          const sql = `ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "${col.name}" ${sqlType}`
          try {
            await pool.query(sql)
            results[`${tableName}.${col.name}`] = 'ADDED'
          } catch (e: any) {
            results[`${tableName}.${col.name}`] = `ERR: ${e.message?.slice(0, 100)}`
          }
        }
      }

      // Verify the 3 broken items
      const verify: Record<string, string> = {}
      for (const slug of ['homepage'] as const) {
        try { await payload.findGlobal({ slug }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 200) }
      }
      for (const slug of ['pages', 'company-pages'] as const) {
        try { await payload.find({ collection: slug, limit: 1 }); verify[slug] = 'OK' } catch (e: any) { verify[slug] = e.message?.slice(0, 200) }
      }

      return NextResponse.json({ action: 'sync-schema', results, verify })
    }

    // ── fix-chat-tables: drop Payload's chat_sessions (serial id) so store can create its own (text id) ──
    if (action === 'fix-chat-tables') {
      const fixes: Record<string, string> = {}
      // Drop the Payload-created tables (they have serial id, but store needs text id)
      for (const t of ['chat_messages', 'chat_sessions']) {
        try {
          await pool.query(`DROP TABLE IF EXISTS "${t}" CASCADE`)
          fixes[`drop:${t}`] = 'OK'
        } catch (e: any) {
          fixes[`drop:${t}`] = `ERR: ${e.message?.slice(0, 100)}`
        }
      }
      // Now let the store recreate them with correct schema
      try {
        const { getChatStore } = await import('@/lib/chat/store')
        const store = getChatStore()
        await store.getRecentSessions(undefined, 1) // triggers ensureTables
        fixes['recreate'] = 'OK'
      } catch (e: any) {
        fixes['recreate'] = `ERR: ${e.message?.slice(0, 150)}`
      }
      return NextResponse.json({ action: 'fix-chat-tables', fixes })
    }

    // ── create-chat-tables: manually create chat tables ──
    if (action === 'create-chat-tables') {
      const results: Record<string, string> = {}
      const statements = [
        `CREATE TABLE IF NOT EXISTS "chat_knowledge_files" (
          "id" serial PRIMARY KEY,
          "filename" varchar NOT NULL,
          "openai_file_id" varchar,
          "vector_store_id" varchar,
          "file_size" numeric,
          "mime_type" varchar,
          "status" enum_chat_knowledge_files_status DEFAULT 'processing',
          "error_message" varchar,
          "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
          "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS "chat_sessions" (
          "id" serial PRIMARY KEY,
          "session_id" varchar NOT NULL UNIQUE,
          "visitor_id" varchar,
          "status" enum_chat_sessions_status,
          "agent_id" varchar,
          "message_count" numeric,
          "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
          "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        )`,
      ]
      for (const sql of statements) {
        try {
          await pool.query(sql)
          results[sql.match(/\"(\w+)\"/)?.[1] || 'unknown'] = 'CREATED'
        } catch (e: any) {
          results[sql.match(/\"(\w+)\"/)?.[1] || 'unknown'] = `ERR: ${e.message?.slice(0, 150)}`
        }
      }
      // Verify
      for (const slug of ['chat-knowledge-files', 'chat-sessions'] as const) {
        try { await payload.find({ collection: slug, limit: 1 }); results[`verify:${slug}`] = 'OK' } catch (e: any) { results[`verify:${slug}`] = `ERR: ${e.message?.slice(0, 150)}` }
      }
      return NextResponse.json({ action: 'create-chat-tables', results })
    }

    // ── fix-homepage: fix column type mismatches in homepage tables ──
    if (action === 'fix-homepage') {
      const fixes: Record<string, string> = {}
      const statements = [
        // Fix id columns: integer → varchar (text)
        `ALTER TABLE "homepage_hero_cta_buttons" ALTER COLUMN "id" TYPE varchar USING id::varchar`,
        `ALTER TABLE "homepage_stats" ALTER COLUMN "id" TYPE varchar USING id::varchar`,
        // Fix _locale columns to use the enum type
        `ALTER TABLE "homepage_hero_cta_buttons_locales" ALTER COLUMN "_locale" TYPE enum__locales USING _locale::text::enum__locales`,
        `ALTER TABLE "homepage_stats_locales" ALTER COLUMN "_locale" TYPE enum__locales USING _locale::text::enum__locales`,
        `ALTER TABLE "homepage_locales" ALTER COLUMN "_locale" TYPE enum__locales USING _locale::text::enum__locales`,
        // Fix _parent_id in locales tables: ensure varchar type
        `ALTER TABLE "homepage_hero_cta_buttons_locales" ALTER COLUMN "_parent_id" TYPE varchar USING _parent_id::varchar`,
        `ALTER TABLE "homepage_stats_locales" ALTER COLUMN "_parent_id" TYPE varchar USING _parent_id::varchar`,
        // Drop old column name if exists
        `ALTER TABLE "homepage_locales" DROP COLUMN IF EXISTS "hero_sub_heading"`,
      ]
      for (const sql of statements) {
        try {
          await pool.query(sql)
          fixes[sql.slice(0, 80)] = 'OK'
        } catch (e: any) {
          fixes[sql.slice(0, 80)] = `ERR: ${e.message?.slice(0, 150)}`
        }
      }
      // Verify
      try {
        const data = await payload.findGlobal({ slug: 'homepage' })
        fixes['VERIFY'] = 'OK'
      } catch (e: any) {
        fixes['VERIFY'] = `ERR: ${e.message?.slice(0, 300)}`
      }
      return NextResponse.json({ action: 'fix-homepage', fixes })
    }

    // ── homepage-debug: inspect homepage tables and columns ──
    if (action === 'homepage-debug') {
      const homepageTables = await pool.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name LIKE 'homepage%'
        ORDER BY table_name
      `)
      const tables: Record<string, string[]> = {}
      for (const row of homepageTables.rows) {
        const cols = await pool.query(`
          SELECT column_name, data_type FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
          ORDER BY ordinal_position
        `, [row.table_name])
        tables[row.table_name] = cols.rows.map((c: any) => `${c.column_name} (${c.data_type})`)
      }
      // Also show Drizzle expected tables for homepage
      const db = payload.db as any
      const drizzleHomepage: Record<string, string[]> = {}
      for (const tName of Object.keys(db.tables || {})) {
        if (tName.startsWith('homepage')) {
          const t = db.tables[tName]
          const cols = Object.keys(t).filter((k: string) => {
            const c = t[k]
            return c && typeof c === 'object' && c.name && (c.dataType || c.columnType)
          }).map((k: string) => `${t[k].name} (${t[k].getSQLType?.() || t[k].columnType || '?'})`)
          drizzleHomepage[tName] = cols
        }
      }
      return NextResponse.json({ actual: tables, expected: drizzleHomepage })
    }

    // ── Default: diagnose all globals and collections ──
    const globalSlugs = ['site-config', 'navigation', 'footer', 'redirects', 'homepage']
    const globalResults: Record<string, string> = {}
    for (const slug of globalSlugs) {
      try {
        await payload.findGlobal({ slug })
        globalResults[slug] = 'OK'
      } catch (err: any) {
        globalResults[slug] = `ERROR: ${err.message?.slice(0, 500)}`
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

    return NextResponse.json({ globals: globalResults, collections: collectionResults })
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack?.slice(0, 500) })
  }
}
