import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'
import { authenticateAgent } from '@/lib/chat/auth'

export const dynamic = 'force-dynamic'

/** GET — List escalated chat sessions for agents */
export async function GET(request: NextRequest) {
  const { user } = await authenticateAgent(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = getChatStore()

  try {
    const [escalated, active] = await Promise.all([
      store.getRecentSessions('escalated', 50),
      store.getRecentSessions('active', 10),
    ])

    // For each escalated session, get the last few messages for preview
    const withPreviews = await Promise.all(
      escalated.map(async (session) => {
        const messages = await store.getMessages(session.id)
        const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
        return {
          ...session,
          messageCount: messages.length,
          lastMessage: lastUserMessage?.content.slice(0, 120) || '',
        }
      }),
    )

    return NextResponse.json({
      pending: withPreviews.filter((s) => !s.agentId),
      active: withPreviews.filter((s) => s.agentId),
    })
  } catch (err: any) {
    console.error('[Chat] Queue fetch error:', err.message)
    return NextResponse.json({ error: 'Failed to fetch queue' }, { status: 500 })
  }
}
