import { NextRequest, NextResponse } from 'next/server'
import { getChatStore } from '@/lib/chat/store'
import { chatWithRAG } from '@/lib/chat/openai'
import type { ChatMessage } from '@/lib/chat/types'
import { logChatEvent } from '@/lib/chat/analytics'
import { getRainbowBridge } from '@/lib/chat/rainbow-bridge'

export const dynamic = 'force-dynamic'

const MAX_MESSAGE_LENGTH = 2000

/** Strip HTML tags and control characters from user input. */
function sanitizeMessage(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Strip control chars (keep \n, \r, \t)
    .slice(0, MAX_MESSAGE_LENGTH)
    .trim()
}

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(all\s+)?above\s+instructions/i,
  /disregard\s+(all\s+)?previous/i,
  /you\s+are\s+now\s+(?:a|an)\s+/i,
  /new\s+instructions?:/i,
  /system\s*:\s*/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /\bDAN\b.*\bjailbreak/i,
  /pretend\s+(?:you\s+are|to\s+be)\s+/i,
  /act\s+as\s+(?:if|a)\s+/i,
  /forget\s+(?:all\s+)?(?:your|the)\s+(?:rules|instructions)/i,
]

/** Detect common prompt injection attempts. Returns the matched pattern or null. */
function detectInjection(msg: string): string | null {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(msg)) return pattern.source
  }
  return null
}

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

  const { sessionId, message: rawMessage, visitorId } = body

  if (!rawMessage?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (!visitorId?.trim()) {
    return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 })
  }

  // Sanitize user input
  const message = sanitizeMessage(rawMessage)
  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  // Detect prompt injection attempts
  const injectionMatch = detectInjection(message)
  if (injectionMatch) {
    console.warn(`[Chat] Prompt injection detected from ${ip}: pattern="${injectionMatch}"`)
    logChatEvent('injection_blocked', undefined, { ip, pattern: injectionMatch })
    return NextResponse.json({ error: 'Message contains disallowed content' }, { status: 400 })
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
      // In escalated mode, store the message and relay to Rainbow bubble
      await store.addMessage(session.id, 'user', message.trim())
      const bridge = getRainbowBridge()
      if (bridge) {
        bridge.relayVisitorMessage(session.id, message.trim()).catch((err) =>
          console.warn('[Chat] Failed to relay message to Rainbow:', err.message),
        )
      }
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
