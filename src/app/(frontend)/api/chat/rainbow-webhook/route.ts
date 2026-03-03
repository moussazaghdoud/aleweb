import { NextRequest, NextResponse } from 'next/server'
import { getRainbowBridge } from '@/lib/chat/rainbow-bridge'

export const dynamic = 'force-dynamic'

/** Rainbow S2S callback — receives events (messages, presence, etc.) */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ received: true })
  }

  const bridge = getRainbowBridge()
  if (!bridge) {
    return NextResponse.json({ received: true })
  }

  try {
    await bridge.handleWebhookEvent(body)
  } catch (err: any) {
    console.error('[Rainbow Webhook] Error handling event:', err.message)
  }

  // Always return 200 so Rainbow doesn't retry
  return NextResponse.json({ received: true })
}
