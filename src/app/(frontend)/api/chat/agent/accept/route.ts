import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'
import { authenticateAgent } from '@/lib/chat/auth'

export const dynamic = 'force-dynamic'

/** POST — Agent accepts an escalated session */
export async function POST(request: NextRequest) {
  const { user } = await authenticateAgent(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body?.sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
  }

  const store = getChatStore()
  const session = await store.getSession(body.sessionId)

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (session.status !== 'escalated') {
    return NextResponse.json({ error: 'Session is not escalated' }, { status: 409 })
  }

  if (session.agentId) {
    return NextResponse.json({ error: 'Session already claimed by another agent' }, { status: 409 })
  }

  // Assign agent to session
  const agentId = String(user.id || user.email || 'agent')
  await store.updateSessionStatus(body.sessionId, 'escalated', agentId)

  // Add system message
  await store.addMessage(body.sessionId, 'system', `Agent has joined the conversation.`)

  return NextResponse.json({ accepted: true, sessionId: body.sessionId, agentId })
}
