import { NextRequest, NextResponse } from 'next/server'
import { getRainbowBridge } from '@/lib/chat/rainbow-bridge'

export const dynamic = 'force-dynamic'

/** Rainbow S2S appends sub-paths to the callback URL — catch them all */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: pathSegments } = await params
  const subPath = '/' + (pathSegments || []).join('/')

  const body = await request.json().catch(() => null)
  console.log(`[Rainbow Webhook ${subPath}] Received:`, JSON.stringify(body).slice(0, 500))

  if (!body) return NextResponse.json({ received: true })

  const bridge = getRainbowBridge()
  if (!bridge) return NextResponse.json({ received: true })

  try {
    await bridge.handleWebhookEvent(body, subPath)
  } catch (err: any) {
    console.error(`[Rainbow Webhook ${subPath}] Error:`, err.message)
  }

  return NextResponse.json({ received: true })
}
