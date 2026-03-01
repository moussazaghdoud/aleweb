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

    if (action === 'push-schema') {
      // Nuclear option: let Payload re-push entire schema
      try {
        const db = payload.db as any
        if (typeof db.push === 'function') {
          await db.push()
          return NextResponse.json({ action: 'push-schema', result: 'Schema pushed successfully' })
        }
        // Alternative: call drizzle push
        if (db.drizzle && typeof db.schemaName === 'string') {
          return NextResponse.json({ action: 'push-schema', result: 'Drizzle available but push not exposed' })
        }
        return NextResponse.json({ action: 'push-schema', result: 'push() not available on db adapter' })
      } catch (err: any) {
        return NextResponse.json({ action: 'push-schema', error: err.message?.slice(0, 300) })
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
