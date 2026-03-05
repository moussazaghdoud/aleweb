import { NextResponse } from 'next/server'
import { getRainbowBridge } from '@/lib/chat/rainbow-bridge'

export const dynamic = 'force-dynamic'

export async function GET() {
  const bridge = getRainbowBridge()
  if (!bridge) {
    return NextResponse.json({ error: 'Rainbow bridge not initialized (missing env vars?)' })
  }

  return NextResponse.json(bridge.getDebugState(), { status: 200 })
}
