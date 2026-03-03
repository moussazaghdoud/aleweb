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
    RAINBOW_HOST_HINT: 'Should be "official" or "sandbox", not a raw hostname',
  }

  const bridge = getRainbowBridge()

  // Try a test connection if bridge is available
  let connectionTest: Record<string, unknown> = { status: 'skipped' }
  if (bridge) {
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Worker timed out after 30s')), 30_000),
      )
      const result = await Promise.race([bridge.testConnection(), timeout])
      connectionTest = { status: 'connected', ...result }
    } catch (err: any) {
      const errorDetail = err.message || (typeof err === 'object' ? JSON.stringify(err, null, 2) : String(err))
      connectionTest = { status: 'failed', error: errorDetail }
    }
  }

  return NextResponse.json({
    bridgeAvailable: bridge !== null,
    envVars: envCheck,
    connectionTest,
  })
}
