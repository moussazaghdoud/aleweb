import { NextRequest, NextResponse } from 'next/server'
import { getSearchAnalytics } from '@/lib/search/analytics'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Authenticate with PAYLOAD_SECRET
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const days = Math.min(Math.max(1, parseInt(request.nextUrl.searchParams.get('days') || '7')), 90)

  try {
    const data = await getSearchAnalytics(days)
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
