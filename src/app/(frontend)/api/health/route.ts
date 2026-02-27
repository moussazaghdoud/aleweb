import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const start = Date.now()

  let dbStatus: 'ok' | 'error' = 'ok'
  try {
    // Attempt a lightweight CMS query to verify database connectivity
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/site-config`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) dbStatus = 'error'
  } catch {
    dbStatus = 'error'
  }

  const latency = Date.now() - start

  return NextResponse.json({
    status: dbStatus === 'ok' ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    latency: `${latency}ms`,
    checks: {
      database: dbStatus,
    },
  }, {
    status: dbStatus === 'ok' ? 200 : 503,
  })
}
