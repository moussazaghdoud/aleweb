import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'

export const dynamic = 'force-dynamic'

/** POST — Rainbow webhook receiver for agent events */
export async function POST(request: NextRequest) {
  // Validate webhook signature
  const signature = request.headers.get('x-rainbow-signature')
  const secret = process.env.RAINBOW_WEBHOOK_SECRET
  if (secret && signature !== secret) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body?.event || !body?.sessionId) {
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
  }

  const store = getChatStore()

  try {
    switch (body.event) {
      case 'agent_accepted': {
        const agentId = body.agentId || 'rainbow-agent'
        await store.updateSessionStatus(body.sessionId, 'escalated', agentId)
        await store.addMessage(body.sessionId, 'system', `Agent ${body.agentName || ''} has joined the conversation.`)
        break
      }

      case 'agent_message': {
        if (body.content) {
          await store.addMessage(body.sessionId, 'agent', body.content)
        }
        break
      }

      case 'agent_closed': {
        await store.updateSessionStatus(body.sessionId, 'closed')
        await store.addMessage(body.sessionId, 'system', 'The agent has ended the conversation. Thank you!')
        break
      }

      default:
        console.warn('[Rainbow Webhook] Unknown event:', body.event)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('[Rainbow Webhook] Error:', err.message)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
