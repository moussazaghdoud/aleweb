import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'
import { authenticateAgent } from '@/lib/chat/auth'

export const dynamic = 'force-dynamic'

/** GET — SSE stream of new messages for an agent watching a session */
export async function GET(request: NextRequest) {
  const { user } = await authenticateAgent(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sessionId = request.nextUrl.searchParams.get('sessionId')
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
  }

  const store = getChatStore()
  const session = await store.getSession(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // SSE stream — poll for new messages every 2s
  const encoder = new TextEncoder()
  let lastTimestamp = request.nextUrl.searchParams.get('after') || ''
  let closed = false

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        if (closed) return
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Send initial keepalive
      send({ type: 'connected', sessionId })

      const poll = async () => {
        if (closed) return
        try {
          const messages = await store.getMessages(sessionId, lastTimestamp || undefined)
          if (messages.length > 0) {
            send({ type: 'messages', messages })
            lastTimestamp = messages[messages.length - 1].createdAt
          }

          // Check if session is closed
          const currentSession = await store.getSession(sessionId)
          if (currentSession?.status === 'closed') {
            send({ type: 'session_closed' })
            closed = true
            controller.close()
            return
          }
        } catch (err) {
          console.error('[Chat] SSE poll error:', err)
        }

        if (!closed) {
          setTimeout(poll, 2000)
        }
      }

      // Start polling
      setTimeout(poll, 1000)
    },
    cancel() {
      closed = true
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

/** POST — Agent sends a message to a session */
export async function POST(request: NextRequest) {
  const { user } = await authenticateAgent(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { sessionId, content } = body
  if (!sessionId || !content?.trim()) {
    return NextResponse.json({ error: 'sessionId and content are required' }, { status: 400 })
  }

  const store = getChatStore()
  const session = await store.getSession(sessionId)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const message = await store.addMessage(sessionId, 'agent', content.trim())
  return NextResponse.json({ message })
}
