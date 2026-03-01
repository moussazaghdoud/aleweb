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
      const results: string[] = []

      // Fix site_config missing columns
      const siteConfigCols = [
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS marketing_eloqua_site_id varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS marketing_eloqua_form_action_url varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS marketing_eloqua_tracking_enabled boolean DEFAULT false`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS consent_platform varchar DEFAULT 'custom'`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS consent_script_url varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS consent_domain_script varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS chat_enabled boolean DEFAULT false`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS chat_provider varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS chat_script_url varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS chat_position varchar DEFAULT 'bottom-right'`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS search_provider varchar DEFAULT 'none'`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS search_api_key varchar`,
        `ALTER TABLE site_config ADD COLUMN IF NOT EXISTS search_organization_id varchar`,
        `ALTER TABLE site_config_locales ADD COLUMN IF NOT EXISTS chat_greeting varchar`,
      ]
      for (const sql of siteConfigCols) {
        try { await pool.query(sql); results.push(`OK`) } catch (e: any) { results.push(`ERR: ${e.message.slice(0,80)}`) }
      }

      // Fix other globals that might have missing columns
      // Check navigation
      const navFixes = [
        `ALTER TABLE navigation ADD COLUMN IF NOT EXISTS updated_at timestamptz`,
        `ALTER TABLE navigation ADD COLUMN IF NOT EXISTS created_at timestamptz`,
      ]
      for (const sql of navFixes) {
        try { await pool.query(sql) } catch { /* already exists */ }
      }

      // Fix footer
      const footerFixes = [
        `ALTER TABLE footer ADD COLUMN IF NOT EXISTS updated_at timestamptz`,
        `ALTER TABLE footer ADD COLUMN IF NOT EXISTS created_at timestamptz`,
      ]
      for (const sql of footerFixes) {
        try { await pool.query(sql) } catch { /* already exists */ }
      }

      // Fix redirects
      const redirectsFixes = [
        `ALTER TABLE redirects ADD COLUMN IF NOT EXISTS updated_at timestamptz`,
        `ALTER TABLE redirects ADD COLUMN IF NOT EXISTS created_at timestamptz`,
      ]
      for (const sql of redirectsFixes) {
        try { await pool.query(sql) } catch { /* already exists */ }
      }

      // Fix homepage
      const homepageFixes = [
        `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS updated_at timestamptz`,
        `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS created_at timestamptz`,
      ]
      for (const sql of homepageFixes) {
        try { await pool.query(sql) } catch { /* already exists */ }
      }

      return NextResponse.json({ action: 'fix-all', siteConfigResults: results })
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
