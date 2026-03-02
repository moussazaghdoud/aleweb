import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'
import { chatWithRAG } from '@/lib/chat/openai'
import type { ChatMessage } from '@/lib/chat/types'

export const dynamic = 'force-dynamic'

/* Rate limiter: 10 messages / 60s per IP */
const rateMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW = 60_000

function checkRate(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, val] of rateMap.entries()) {
      if (now > val.reset) rateMap.delete(key)
    }
  }, 5 * 60_000).unref?.()
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!checkRate(ip)) {
    return NextResponse.json({ error: 'Rate limited. Please wait.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { sessionId, message, visitorId } = body

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (!visitorId?.trim()) {
    return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 })
  }

  const store = getChatStore()

  try {
    // Get or create session
    let session = sessionId ? await store.getSession(sessionId) : null

    if (session && session.visitorId !== visitorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (!session) {
      session = await store.createSession(visitorId, { ip, userAgent: request.headers.get('user-agent') || '' })
    }

    // Check if session is escalated (agent is handling)
    if (session.status === 'escalated') {
      // In escalated mode, just store the message for the agent to see
      await store.addMessage(session.id, 'user', message.trim())
      return NextResponse.json({ sessionId: session.id, status: 'escalated', message: 'Message sent to agent' })
    }

    // Store user message
    await store.addMessage(session.id, 'user', message.trim())

    // Get conversation history
    const history = await store.getMessages(session.id)
    const chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = history
      .filter((m: ChatMessage) => m.role === 'user' || m.role === 'assistant')
      .map((m: ChatMessage) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    // Call OpenAI
    const response = await chatWithRAG(message.trim(), chatHistory.slice(0, -1))

    if (response.type === 'escalation_needed') {
      return NextResponse.json({
        sessionId: session.id,
        type: 'escalation_needed',
        reason: response.reason,
      })
    }

    // Stream the response via SSE
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Send session ID first
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'session', sessionId: session.id })}\n\n`),
          )

          for await (const chunk of response.stream) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'delta', content: chunk })}\n\n`),
            )
          }

          // Store complete assistant response
          const fullResponse = response.getFullResponse()
          if (fullResponse) {
            await store.addMessage(session.id, 'assistant', fullResponse)
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`),
          )
          controller.close()
        } catch (err) {
          console.error('[Chat] Stream error:', err)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'An error occurred' })}\n\n`),
          )
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err: any) {
    console.error('[Chat] Error:', err.message, err.stack)
    return NextResponse.json({ error: err.message || 'Chat service unavailable' }, { status: 503 })
  }
}
