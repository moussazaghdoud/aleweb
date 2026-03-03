import { NextResponse } from 'next/server'
import { getRainbowBridge } from '@/lib/chat/rainbow-bridge'

export const dynamic = 'force-dynamic'

export async function GET() {
  const envCheck = {
    RAINBOW_APP_ID: !!process.env.RAINBOW_APP_ID,
    RAINBOW_APP_SECRET: !!process.env.RAINBOW_APP_SECRET,
    RAINBOW_BOT_LOGIN: !!process.env.RAINBOW_BOT_LOGIN,
    RAINBOW_BOT_PASSWORD: !!process.env.RAINBOW_BOT_PASSWORD,
    RAINBOW_SUPPORT_AGENTS: process.env.RAINBOW_SUPPORT_AGENTS || '(not set)',
    RAINBOW_HOST: process.env.RAINBOW_HOST || '(not set)',
  }

  const bridge = getRainbowBridge()

  return NextResponse.json({
    bridgeAvailable: bridge !== null,
    envVars: envCheck,
  })
}
