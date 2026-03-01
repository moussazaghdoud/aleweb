import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool

    if (!pool?.query) {
      return NextResponse.json({ error: 'No pool' })
    }

    // Check what tables exist related to site-config
    const tables = await pool.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE '%site%'
      ORDER BY table_name
    `)

    // Check columns in the site-config related tables
    const columns: Record<string, any[]> = {}
    for (const row of tables.rows) {
      const cols = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [row.table_name])
      columns[row.table_name] = cols.rows
    }

    // Try to read site-config directly
    let siteConfigData = null
    let siteConfigError = null
    try {
      const result = await pool.query(`SELECT * FROM site_config LIMIT 1`)
      siteConfigData = result.rows[0] ? Object.keys(result.rows[0]) : 'empty'
    } catch (err: any) {
      siteConfigError = err.message
    }

    // Try via Payload
    let payloadError = null
    try {
      await payload.findGlobal({ slug: 'site-config' })
    } catch (err: any) {
      payloadError = err.message
    }

    return NextResponse.json({
      tables: tables.rows.map((r: any) => r.table_name),
      columns,
      siteConfigData,
      siteConfigError,
      payloadError,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack?.slice(0, 500) })
  }
}
