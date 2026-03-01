import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params
  const visitorId = request.nextUrl.searchParams.get('visitorId')

  if (!visitorId) {
    return NextResponse.json({ error: 'visitorId is required' }, { status: 400 })
  }

  const store = getChatStore()

  try {
    const session = await store.getSession(sessionId)
    if (!session || session.visitorId !== visitorId) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const after = request.nextUrl.searchParams.get('after') || undefined
    const messages = await store.getMessages(sessionId, after)

    return NextResponse.json({
      session: {
        id: session.id,
        status: session.status,
        agentId: session.agentId,
        createdAt: session.createdAt,
      },
      messages,
    })
  } catch (err: any) {
    console.error('[Chat] Session fetch error:', err.message)
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 })
  }
}
