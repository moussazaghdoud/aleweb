import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const start = Date.now()

  let dbStatus: 'ok' | 'error' = 'ok'
  try {
    // Use Payload directly instead of fetching our own API (avoids circular/network issues)
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    // Simple query to verify DB connection
    const pool = (payload.db as any).pool
    if (pool?.query) {
      await pool.query('SELECT 1')
    } else {
      // Fallback: try via Payload API
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-config`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) dbStatus = 'error'
    }
  } catch {
    dbStatus = 'error'
  }

  let searchStatus: 'ok' | 'error' = 'ok'
  try {
    const { getSearchProvider } = await import('@/lib/search/index')
    const provider = await getSearchProvider()
    const ok = await provider.ping()
    if (!ok) searchStatus = 'error'
  } catch {
    searchStatus = 'error'
  }

  const latency = Date.now() - start
  const allOk = dbStatus === 'ok' && searchStatus === 'ok'

  return NextResponse.json({
    status: allOk ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    latency: `${latency}ms`,
    checks: {
      database: dbStatus,
      search: searchStatus,
    },
  }, {
    status: allOk ? 200 : 503,
  })
}
