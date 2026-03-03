/* ------------------------------------------------------------------ */
/*  Rainbow Integration — Abstract Interface + Providers              */
/* ------------------------------------------------------------------ */

import type { EscalationRequest } from './types'
import { getRainbowBridge } from './rainbow-bridge'

export interface RainbowProvider {
  /** Notify an available agent about a new escalation */
  notifyAgent(escalation: EscalationRequest): Promise<void>
  /** Get list of available agents (online + accepting chats) */
  getAvailableAgents(): Promise<Array<{ id: string; name: string; available: boolean }>>
  /** Check if Rainbow service is reachable */
  ping(): Promise<boolean>
}

/* ======================== Production: Rainbow Bridge Provider ======================== */

class RainbowBridgeProvider implements RainbowProvider {
  async notifyAgent(escalation: EscalationRequest): Promise<void> {
    const bridge = getRainbowBridge()
    if (!bridge) {
      throw new Error('Rainbow bridge not available')
    }
    await bridge.escalateSession(escalation.sessionId, escalation.reason)
  }

  async getAvailableAgents(): Promise<Array<{ id: string; name: string; available: boolean }>> {
    // Agent availability is managed by Rainbow itself — always report available
    const agents = (process.env.RAINBOW_SUPPORT_AGENTS || '')
      .split(',')
      .map((j) => j.trim())
      .filter(Boolean)
    return agents.map((jid, i) => ({ id: jid, name: `Agent ${i + 1}`, available: true }))
  }

  async ping(): Promise<boolean> {
    return getRainbowBridge() !== null
  }
}

/* ======================== Development: Stub Provider ======================== */

class StubRainbowProvider implements RainbowProvider {
  async notifyAgent(escalation: EscalationRequest): Promise<void> {
    console.log('[Rainbow Stub] Agent notification:', {
      sessionId: escalation.sessionId,
      reason: escalation.reason,
    })
  }

  async getAvailableAgents(): Promise<Array<{ id: string; name: string; available: boolean }>> {
    return [
      { id: 'stub-agent-1', name: 'Test Agent', available: true },
    ]
  }

  async ping(): Promise<boolean> {
    return true
  }
}

/* ======================== Factory ======================== */

let providerInstance: RainbowProvider | null = null

export function getRainbowProvider(): RainbowProvider {
  if (providerInstance) return providerInstance

  if (process.env.RAINBOW_APP_ID && process.env.RAINBOW_BOT_LOGIN) {
    console.log('[Rainbow] Using Rainbow Bridge provider (rainbow-node-sdk)')
    providerInstance = new RainbowBridgeProvider()
  } else {
    console.log('[Rainbow] Using stub provider (no RAINBOW_APP_ID + RAINBOW_BOT_LOGIN)')
    providerInstance = new StubRainbowProvider()
  }

  return providerInstance
}
