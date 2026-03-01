import { NextRequest, NextResponse } from 'next/server'
import { getChatAnalytics } from '@/lib/chat/analytics'

export const dynamic = 'force-dynamic'

/** GET — Admin-only chat analytics */
export async function GET(request: NextRequest) {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const days = Math.min(Math.max(1, parseInt(request.nextUrl.searchParams.get('days') || '7')), 90)

  try {
    const data = await getChatAnalytics(days)
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
