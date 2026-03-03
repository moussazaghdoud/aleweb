/* ------------------------------------------------------------------ */
/*  Rainbow Bridge — REST API + optional S2S webhooks                 */
/*  Bot account authenticates via REST, creates bubbles, invites      */
/*  agents. If S2S is available, messages relay bidirectionally.      */
/*  If not, the room still serves as agent notification with history. */
/* ------------------------------------------------------------------ */

import { createHash } from 'crypto'
import { getChatStore } from './store'

/* ---------- Types ---------- */

interface BridgeMapping {
  sessionId: string
  roomId: string
  roomJid: string
  conversationId: string
  agentJoined: boolean
}

/* ---------- Service ---------- */

class RainbowBridgeService {
  private baseUrl = 'https://openrainbow.com'
  private token: string | null = null
  private tokenExpiry = 0
  private botUserId: string | null = null
  private cnxId: string | null = null
  private s2sAvailable = false

  /** sessionId → BridgeMapping */
  private bySession = new Map<string, BridgeMapping>()
  /** roomJid or roomId → sessionId */
  private byRoom = new Map<string, string>()

  private agentEmails: string[]

  constructor() {
    this.agentEmails = (process.env.RAINBOW_SUPPORT_AGENTS || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
  }

  /* ---- Auth ---- */

  private getAppAuthHeader(): string {
    const appId = process.env.RAINBOW_APP_ID || ''
    const appSecret = process.env.RAINBOW_APP_SECRET || ''
    const password = process.env.RAINBOW_BOT_PASSWORD || ''
    const hash = createHash('sha256').update(appSecret + password).digest('hex')
    return 'Basic ' + Buffer.from(`${appId}:${hash}`).toString('base64')
  }

  private getBasicAuthHeader(): string {
    const login = process.env.RAINBOW_BOT_LOGIN || ''
    const password = process.env.RAINBOW_BOT_PASSWORD || ''
    return 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64')
  }

  private async ensureAuth(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpiry) return this.token

    const res = await fetch(`${this.baseUrl}/api/rainbow/authentication/v1.0/login`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: this.getBasicAuthHeader(),
        'x-rainbow-app-auth': this.getAppAuthHeader(),
      },
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(`Rainbow auth failed (${res.status}): ${body.errorDetails || body.errorMsg || JSON.stringify(body)}`)
    }

    const data = await res.json()
    this.token = data.token
    this.botUserId = data.loggedInUser?.id || null
    this.tokenExpiry = Date.now() + 23 * 60 * 60 * 1000

    console.log(`[Rainbow Bridge] Authenticated as ${data.loggedInUser?.loginEmail}`)
    return this.token!
  }

  private async authHeaders(): Promise<Record<string, string>> {
    const token = await this.ensureAuth()
    return {
      Authorization: `Bearer ${token}`,
      'x-rainbow-app-auth': this.getAppAuthHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }

  /* ---- S2S Connection (optional) ---- */

  private async tryS2SConnection(): Promise<void> {
    if (this.cnxId) return

    try {
      const headers = await this.authHeaders()
      const callbackUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://aleweb-production-b8f6.up.railway.app'}/api/chat/rainbow-webhook`

      const res = await fetch(`${this.baseUrl}/api/rainbow/ucs/v1.0/connections`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          connection: {
            resource: 's2s_ale_chatbot',
            callback_url: callbackUrl,
          },
        }),
      })

      if (res.ok) {
        const data = await res.json()
        this.cnxId = data.data?.id || data.id
        this.s2sAvailable = true
        console.log(`[Rainbow Bridge] S2S connection created: ${this.cnxId}`)
      } else {
        const body = await res.json().catch(() => ({}))
        console.warn(`[Rainbow Bridge] S2S not available (${res.status}): ${body.errorMsg || 'unknown'}. Falling back to room-only mode.`)
        this.s2sAvailable = false
      }
    } catch (err: any) {
      console.warn('[Rainbow Bridge] S2S connection failed:', err.message, '— using room-only mode')
      this.s2sAvailable = false
    }
  }

  /* ---- Public: test connection ---- */

  async testConnection(): Promise<{ auth: boolean; s2s: boolean }> {
    await this.ensureAuth()
    await this.tryS2SConnection()
    return { auth: true, s2s: this.s2sAvailable }
  }

  /* ---- Escalation ---- */

  async escalateSession(sessionId: string, reason?: string): Promise<void> {
    if (this.bySession.has(sessionId)) return

    const headers = await this.authHeaders()
    await this.tryS2SConnection()
    const store = getChatStore()

    // 1. Create room (bubble)
    const roomName = `ALE Support — ${sessionId.slice(0, 8)}`

    // Build topic with conversation summary
    const messages = await store.getMessages(sessionId)
    const historyLines = messages.map((m) => {
      const label = m.role === 'user' ? 'Visitor' : m.role === 'assistant' ? 'Bot' : m.role
      return `[${label}]: ${m.content}`
    })
    const topicText = reason || 'Visitor requested human agent'
    const historyText = historyLines.length > 0
      ? `${topicText}\n\n--- Conversation ---\n${historyLines.join('\n')}`
      : topicText

    const roomRes = await fetch(`${this.baseUrl}/api/rainbow/enduser/v1.0/rooms`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: roomName,
        topic: historyText.slice(0, 4000), // Topic has a size limit
        history: 'all',
        visibility: 'private',
      }),
    })

    if (!roomRes.ok) {
      const body = await roomRes.json().catch(() => ({}))
      throw new Error(`Room creation failed (${roomRes.status}): ${JSON.stringify(body)}`)
    }

    const room = (await roomRes.json()).data
    const roomId = room.id
    const roomJid = room.jid || ''

    // 2. Invite agents by email
    if (this.agentEmails.length > 0) {
      try {
        await fetch(`${this.baseUrl}/api/rainbow/enduser/v1.0/rooms/${roomId}/invitations`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ scenario: 'chat', emails: this.agentEmails }),
        })
      } catch (err: any) {
        console.warn('[Rainbow Bridge] Agent invitation failed:', err.message)
      }
    }

    // 3. S2S: join room and create conversation (if S2S available)
    let conversationId = roomId
    if (this.s2sAvailable && this.cnxId) {
      try {
        await fetch(`${this.baseUrl}/api/rainbow/ucs/v1.0/connections/${this.cnxId}/rooms/${roomId}/join`, {
          method: 'POST',
          headers,
        })

        const convRes = await fetch(`${this.baseUrl}/api/rainbow/ucs/v1.0/connections/${this.cnxId}/conversations`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ peer: roomId, type: 'room' }),
        })

        if (convRes.ok) {
          const convData = await convRes.json()
          conversationId = convData.data?.id || convData.id || roomId
        }

        // Send history as a message in the room
        if (historyLines.length > 0) {
          await this._sendToRoom(conversationId, `--- Conversation history ---\n${historyLines.join('\n')}\n--- End history ---`)
        }
      } catch (err: any) {
        console.warn('[Rainbow Bridge] S2S room join/message failed:', err.message)
      }
    }

    // 4. Store mapping
    const mapping: BridgeMapping = {
      sessionId,
      roomId,
      roomJid,
      conversationId,
      agentJoined: false,
    }
    this.bySession.set(sessionId, mapping)
    if (roomJid) this.byRoom.set(roomJid, sessionId)
    this.byRoom.set(roomId, sessionId)

    // 5. Persist in session metadata
    const session = await store.getSession(sessionId)
    if (session) {
      const pool = await this._getPool()
      if (pool) {
        const metadata = { ...session.metadata, roomId, roomJid, conversationId }
        await pool.query(
          `UPDATE chat_sessions SET metadata = $1, updated_at = NOW() WHERE id = $2`,
          [JSON.stringify(metadata), sessionId],
        )
      }
    }

    console.log(`[Rainbow Bridge] Session ${sessionId} escalated → room ${roomId} (s2s: ${this.s2sAvailable})`)
  }

  /* ---- Visitor → Rainbow ---- */

  async relayVisitorMessage(sessionId: string, content: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    if (this.s2sAvailable && this.cnxId) {
      await this._sendToRoom(mapping.conversationId, `[Visitor]: ${content}`)
    } else {
      // Fallback: update room topic with latest visitor message
      try {
        const headers = await this.authHeaders()
        await fetch(`${this.baseUrl}/api/rainbow/enduser/v1.0/rooms/${mapping.roomId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ topic: `Latest from visitor: ${content}` }),
        })
      } catch (err: any) {
        console.warn('[Rainbow Bridge] Topic update failed:', err.message)
      }
    }
  }

  private async _sendToRoom(conversationId: string, body: string): Promise<void> {
    if (!this.cnxId) return
    const headers = await this.authHeaders()

    const res = await fetch(
      `${this.baseUrl}/api/rainbow/ucs/v1.0/connections/${this.cnxId}/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ body, lang: 'en' }),
      },
    )

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.warn(`[Rainbow Bridge] Send message failed (${res.status}):`, JSON.stringify(data))
    }
  }

  /* ---- Rainbow webhook → Visitor ---- */

  async handleWebhookEvent(event: any): Promise<void> {
    const eventType = event.type || event.event
    if (eventType !== 'message' && eventType !== 'rainbow_onmessagereceived') return

    const message = event.data || event.message || event
    const content: string = message.body || message.content || ''
    if (!content.trim()) return

    // Echo prevention
    if (content.startsWith('[Visitor]:')) return
    if (content.startsWith('--- Conversation history ---')) return

    // Skip bot's own messages
    const senderId = message.fromUserId || message.from?.userId || ''
    if (senderId && senderId === this.botUserId) return

    // Find session
    const roomId = message.roomId || message.room?.id || message.conversationId || ''
    const roomJid = message.roomJid || message.room?.jid || ''
    const sessionId = this.byRoom.get(roomId) || this.byRoom.get(roomJid)
    if (!sessionId) return

    const store = getChatStore()
    const mapping = this.bySession.get(sessionId)!

    if (!mapping.agentJoined) {
      mapping.agentJoined = true
      await store.addMessage(sessionId, 'system', 'An agent has joined the conversation.')
    }

    await store.addMessage(sessionId, 'agent', content)

    const lower = content.toLowerCase().trim()
    if (lower === '/close' || lower === '/end') {
      await this.closeSession(sessionId)
    }
  }

  /* ---- Close session ---- */

  async closeSession(sessionId: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    const store = getChatStore()
    await store.addMessage(sessionId, 'system', 'The agent has ended this conversation. Thank you for contacting ALE support!')
    await store.updateSessionStatus(sessionId, 'closed')

    try {
      const headers = await this.authHeaders()
      await fetch(`${this.baseUrl}/api/rainbow/enduser/v1.0/rooms/${mapping.roomId}`, {
        method: 'DELETE',
        headers,
      })
    } catch (err: any) {
      console.warn('[Rainbow Bridge] Error deleting room:', err.message)
    }

    this.bySession.delete(sessionId)
    if (mapping.roomJid) this.byRoom.delete(mapping.roomJid)
    this.byRoom.delete(mapping.roomId)
    console.log(`[Rainbow Bridge] Session ${sessionId} closed`)
  }

  /* ---- Restore on restart ---- */

  async restoreMappings(): Promise<void> {
    try {
      const store = getChatStore()
      const sessions = await store.getRecentSessions('escalated', 100)

      for (const session of sessions) {
        const meta = session.metadata as Record<string, unknown>
        const roomId = meta?.roomId as string | undefined
        const roomJid = meta?.roomJid as string | undefined
        const conversationId = meta?.conversationId as string | undefined
        if (!roomId) continue

        const mapping: BridgeMapping = {
          sessionId: session.id,
          roomId,
          roomJid: roomJid || '',
          conversationId: conversationId || roomId,
          agentJoined: true,
        }

        this.bySession.set(session.id, mapping)
        if (roomJid) this.byRoom.set(roomJid, session.id)
        this.byRoom.set(roomId, session.id)
      }

      if (this.bySession.size > 0) {
        console.log(`[Rainbow Bridge] Restored ${this.bySession.size} session mappings`)
      }
    } catch (err: any) {
      console.warn('[Rainbow Bridge] Could not restore mappings:', err.message)
    }
  }

  /* ---- Helpers ---- */

  private async _getPool(): Promise<any> {
    try {
      const { getPayload } = await import('@/lib/payload')
      const payload = await getPayload()
      return (payload.db as any).pool || null
    } catch {
      return null
    }
  }
}

/* ======================== Factory ======================== */

let bridgeInstance: RainbowBridgeService | null = null

export function getRainbowBridge(): RainbowBridgeService | null {
  if (bridgeInstance) return bridgeInstance

  if (!process.env.RAINBOW_APP_ID || !process.env.RAINBOW_BOT_LOGIN) {
    return null
  }

  bridgeInstance = new RainbowBridgeService()
  return bridgeInstance
}
