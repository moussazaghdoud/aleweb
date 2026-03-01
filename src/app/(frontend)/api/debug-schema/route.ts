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

    if (action === 'fix') {
      // Add missing columns to site_config
      const alterStatements = [
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
        // Locales table
        `ALTER TABLE site_config_locales ADD COLUMN IF NOT EXISTS chat_greeting varchar`,
      ]

      const results: string[] = []
      for (const sql of alterStatements) {
        try {
          await pool.query(sql)
          results.push(`OK: ${sql.slice(0, 80)}`)
        } catch (err: any) {
          results.push(`ERR: ${sql.slice(0, 60)} — ${err.message}`)
        }
      }

      // Verify fix
      let payloadOk = false
      try {
        await payload.findGlobal({ slug: 'site-config' })
        payloadOk = true
      } catch (err: any) {
        results.push(`Payload still fails: ${err.message.slice(0, 200)}`)
      }

      return NextResponse.json({ action: 'fix', results, payloadOk })
    }

    // Default: diagnose
    const cols = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'site_config' ORDER BY ordinal_position
    `)

    let payloadError = null
    try {
      await payload.findGlobal({ slug: 'site-config' })
    } catch (err: any) {
      payloadError = err.message?.slice(0, 300)
    }

    return NextResponse.json({
      columns: cols.rows.map((r: any) => r.column_name),
      payloadError,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
}
