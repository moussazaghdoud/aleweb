import { NextRequest, NextResponse } from 'next/server'
import { getRainbowBridge } from '@/lib/chat/rainbow-bridge'

export const dynamic = 'force-dynamic'

/** Rainbow S2S appends sub-paths to the callback URL — catch them all */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ received: true })

  const bridge = getRainbowBridge()
  if (!bridge) return NextResponse.json({ received: true })

  try {
    await bridge.handleWebhookEvent(body)
  } catch (err: any) {
    console.error('[Rainbow Webhook] Error:', err.message)
  }

  return NextResponse.json({ received: true })
}
