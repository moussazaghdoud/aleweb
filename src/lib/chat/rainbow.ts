/* ------------------------------------------------------------------ */
/*  Rainbow Integration — Abstract Interface + Providers              */
/* ------------------------------------------------------------------ */

import type { EscalationRequest } from './types'

export interface RainbowProvider {
  /** Notify an available agent about a new escalation */
  notifyAgent(escalation: EscalationRequest): Promise<void>
  /** Get list of available agents (online + accepting chats) */
  getAvailableAgents(): Promise<Array<{ id: string; name: string; available: boolean }>>
  /** Check if Rainbow service is reachable */
  ping(): Promise<boolean>
}

/* ======================== Production: Rainbow REST API ======================== */

class RainbowWebhookProvider implements RainbowProvider {
  private apiUrl: string
  private apiKey: string

  constructor() {
    this.apiUrl = process.env.RAINBOW_API_URL || 'https://openrainbow.com/api/v1'
    this.apiKey = process.env.RAINBOW_API_KEY || ''
  }

  async notifyAgent(escalation: EscalationRequest): Promise<void> {
    // Send notification to Rainbow webhook/API
    // Exact endpoint TBD based on Rainbow API documentation
    const res = await fetch(`${this.apiUrl}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        type: 'chat_escalation',
        sessionId: escalation.sessionId,
        reason: escalation.reason,
        callbackUrl: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/chat/webhook`,
        timestamp: escalation.createdAt,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Rainbow API error ${res.status}: ${text}`)
    }
  }

  async getAvailableAgents(): Promise<Array<{ id: string; name: string; available: boolean }>> {
    const res = await fetch(`${this.apiUrl}/agents/available`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    })

    if (!res.ok) return []
    const data = await res.json()
    return data.agents || []
  }

  async ping(): Promise<boolean> {
    try {
      const res = await fetch(`${this.apiUrl}/health`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      })
      return res.ok
    } catch {
      return false
    }
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

  if (process.env.RAINBOW_API_KEY) {
    console.log('[Rainbow] Using production Rainbow API provider')
    providerInstance = new RainbowWebhookProvider()
  } else {
    console.log('[Rainbow] Using stub provider (no RAINBOW_API_KEY)')
    providerInstance = new StubRainbowProvider()
  }

  return providerInstance
}
