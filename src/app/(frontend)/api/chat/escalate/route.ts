import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'
import { getRainbowProvider } from '@/lib/chat/rainbow'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { sessionId, visitorId, reason } = body

  if (!sessionId || !visitorId) {
    return NextResponse.json({ error: 'sessionId and visitorId are required' }, { status: 400 })
  }

  const store = getChatStore()

  try {
    const session = await store.getSession(sessionId)
    if (!session || session.visitorId !== visitorId) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (session.status === 'escalated') {
      return NextResponse.json({ error: 'Session already escalated' }, { status: 409 })
    }

    // Update session status
    await store.updateSessionStatus(sessionId, 'escalated')

    // Add system message
    await store.addMessage(sessionId, 'system', 'Chat escalated to a human agent. Please wait...')

    // Notify Rainbow
    const rainbow = getRainbowProvider()
    try {
      await rainbow.notifyAgent({
        sessionId,
        reason: reason || 'User requested human agent',
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
    } catch (err: any) {
      console.warn('[Chat] Rainbow notification failed (queued):', err.message)
    }

    return NextResponse.json({
      escalated: true,
      sessionId,
      message: 'Your request has been sent to our team. An agent will be with you shortly.',
    })
  } catch (err: any) {
    console.error('[Chat] Escalation error:', err.message)
    return NextResponse.json({ error: 'Failed to escalate' }, { status: 500 })
  }
}
