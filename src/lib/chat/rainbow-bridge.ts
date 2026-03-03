/* ------------------------------------------------------------------ */
/*  Rainbow Bridge — Backend relay via rainbow-node-sdk               */
/*  Bot account maintains a persistent Rainbow connection. On         */
/*  escalation it creates a bubble, invites agents, and relays        */
/*  messages bidirectionally.                                         */
/* ------------------------------------------------------------------ */

import { getChatStore } from './store'
import type { EscalationRequest } from './types'

/* ---------- Types ---------- */

interface BridgeMapping {
  sessionId: string
  bubbleJid: string
  bubbleId: string
  agentJoined: boolean
}

interface RainbowSDK {
  start: () => Promise<unknown>
  stop: () => Promise<unknown>
  events: { on: (event: string, cb: (...args: any[]) => void) => void }
  bubbles: {
    createBubble: (name: string, description: string, history?: string) => Promise<any>
    inviteContactsByEmailsToBubble: (emails: string[], bubble: any) => Promise<any>
    inviteContactToBubble: (contact: any, bubble: any, isModerator: boolean, withInvitation: boolean, reason?: string) => Promise<any>
    closeAndDeleteBubble: (bubble: any) => Promise<any>
    getBubbleByJid: (jid: string) => any
    getBubbleById: (id: string) => any
  }
  im: {
    sendMessageToBubbleJid: (message: string, jid: string, lang: string, content?: any, subject?: string) => Promise<any>
  }
  contacts: {
    getContactByJid: (jid: string, forceServer?: boolean) => Promise<any>
    getContactByLoginEmail: (email: string, forceServer?: boolean) => Promise<any>
  }
}

/* ---------- Service ---------- */

class RainbowBridgeService {
  private sdk: RainbowSDK | null = null
  private connecting: Promise<void> | null = null
  private connected = false

  /** sessionId → BridgeMapping */
  private bySession = new Map<string, BridgeMapping>()
  /** bubbleJid → sessionId */
  private byBubble = new Map<string, string>()

  private agentJids: string[]

  constructor() {
    this.agentJids = (process.env.RAINBOW_SUPPORT_AGENTS || '')
      .split(',')
      .map((j) => j.trim())
      .filter(Boolean)
  }

  /** Test connection — used by health endpoint */
  async testConnection(): Promise<void> {
    await this.ensureConnected()
  }

  /* ---- Lazy connection ---- */

  private async ensureConnected(): Promise<RainbowSDK> {
    if (this.sdk && this.connected) return this.sdk

    if (this.connecting) {
      await this.connecting
      return this.sdk!
    }

    this.connecting = this._connect()
    await this.connecting
    this.connecting = null
    return this.sdk!
  }

  private async _connect(): Promise<void> {
    // Dynamic import — rainbow-node-sdk is CommonJS
    const { NodeSDK } = await import('rainbow-node-sdk')

    const host = process.env.RAINBOW_HOST || 'official'

    this.sdk = new NodeSDK({
      rainbow: { host },
      credentials: {
        login: process.env.RAINBOW_BOT_LOGIN,
        password: process.env.RAINBOW_BOT_PASSWORD,
      },
      application: {
        appID: process.env.RAINBOW_APP_ID,
        appSecret: process.env.RAINBOW_APP_SECRET,
      },
      logs: {
        enableConsoleLogs: false,
        enableFileLogs: false,
        level: 'error',
      },
      im: {
        sendReadReceipt: true,
        sendMessageToConnectedUser: false,
        storeMessages: false,
      },
    }) as unknown as RainbowSDK

    // Listen for incoming messages before starting
    this.sdk.events.on('rainbow_onmessagereceived', (msg: any) => {
      this._handleIncomingMessage(msg).catch((err) =>
        console.error('[Rainbow Bridge] Error handling incoming message:', err.message),
      )
    })

    // Listen for bubble invitation acceptance (agent joined)
    this.sdk.events.on('rainbow_onbubbleaffiliationchanged', (data: any) => {
      this._handleAffiliationChange(data).catch((err) =>
        console.error('[Rainbow Bridge] Error handling affiliation change:', err.message),
      )
    })

    await this.sdk.start()
    this.connected = true
    console.log('[Rainbow Bridge] Connected to Rainbow')

    // Restore any existing escalated sessions
    await this.restoreMappings()
  }

  /* ---- Escalation ---- */

  async escalateSession(sessionId: string, reason?: string): Promise<void> {
    const sdk = await this.ensureConnected()
    const store = getChatStore()

    // Don't re-escalate
    if (this.bySession.has(sessionId)) return

    // Create bubble for this conversation
    const bubbleName = `ALE Support — ${sessionId.slice(0, 8)}`
    const description = reason || 'Visitor requested human agent'
    const bubble = await sdk.bubbles.createBubble(bubbleName, description, 'all')

    const mapping: BridgeMapping = {
      sessionId,
      bubbleJid: bubble.jid,
      bubbleId: bubble.id,
      agentJoined: false,
    }

    this.bySession.set(sessionId, mapping)
    this.byBubble.set(bubble.jid, sessionId)

    // Store bubble info in session metadata
    const session = await store.getSession(sessionId)
    if (session) {
      const pool = await this._getPool()
      if (pool) {
        const metadata = { ...session.metadata, bubbleJid: bubble.jid, bubbleId: bubble.id }
        await pool.query(
          `UPDATE chat_sessions SET metadata = $1, updated_at = NOW() WHERE id = $2`,
          [JSON.stringify(metadata), sessionId],
        )
      }
    }

    // Invite support agents
    await this._inviteAgents(bubble)

    // Send conversation history to the bubble
    const messages = await store.getMessages(sessionId)
    if (messages.length > 0) {
      const historyLines = messages.map((m) => {
        const label = m.role === 'user' ? 'Visitor' : m.role === 'assistant' ? 'Bot' : m.role
        return `[${label}]: ${m.content}`
      })
      const historyText = `--- Conversation history ---\n${historyLines.join('\n')}\n--- End history ---`
      await sdk.im.sendMessageToBubbleJid(historyText, bubble.jid, 'en')
    }

    console.log(`[Rainbow Bridge] Session ${sessionId} escalated → bubble ${bubble.jid}`)
  }

  private async _inviteAgents(bubble: any): Promise<void> {
    const sdk = this.sdk!

    for (const jid of this.agentJids) {
      try {
        // Try as JID first, fall back to email
        if (jid.includes('/') || jid.includes('@') && !jid.includes('.')) {
          const contact = await sdk.contacts.getContactByJid(jid, true)
          await sdk.bubbles.inviteContactToBubble(contact, bubble, false, false, 'Support escalation')
        } else {
          // Looks like an email
          await sdk.bubbles.inviteContactsByEmailsToBubble([jid], bubble)
        }
      } catch (err: any) {
        console.warn(`[Rainbow Bridge] Could not invite agent ${jid}:`, err.message)
      }
    }
  }

  /* ---- Visitor → Rainbow ---- */

  async relayVisitorMessage(sessionId: string, content: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    const sdk = await this.ensureConnected()
    await sdk.im.sendMessageToBubbleJid(`[Visitor]: ${content}`, mapping.bubbleJid, 'en')
  }

  /* ---- Rainbow → Visitor ---- */

  private async _handleIncomingMessage(msg: any): Promise<void> {
    // msg.fromBubbleJid identifies messages from a bubble
    const bubbleJid = msg.fromBubbleJid
    if (!bubbleJid) return // Not a bubble message

    const sessionId = this.byBubble.get(bubbleJid)
    if (!sessionId) return // Unknown bubble

    const content: string = msg.content || msg.data || ''
    if (!content.trim()) return

    // Echo prevention: skip messages we sent (prefixed with [Visitor]:)
    if (content.startsWith('[Visitor]:')) return

    // Skip messages from ourselves (the bot)
    if (msg.fromJid === (this.sdk as any)?._core?._rest?.account?.jid_im) return

    const store = getChatStore()
    const mapping = this.bySession.get(sessionId)!

    // First agent message → add "Agent joined" system message
    if (!mapping.agentJoined) {
      mapping.agentJoined = true
      await store.addMessage(sessionId, 'system', 'An agent has joined the conversation.')
    }

    // Store agent message
    await store.addMessage(sessionId, 'agent', content)

    // Check for close commands
    const lower = content.toLowerCase().trim()
    if (lower === '/close' || lower === '/end') {
      await this.closeSession(sessionId)
    }
  }

  /* ---- Affiliation changes (agent joined bubble) ---- */

  private async _handleAffiliationChange(data: any): Promise<void> {
    const bubbleJid = data?.bubble?.jid || data?.jid
    if (!bubbleJid) return

    const sessionId = this.byBubble.get(bubbleJid)
    if (!sessionId) return

    const mapping = this.bySession.get(sessionId)
    if (!mapping || mapping.agentJoined) return

    // An agent has been added/accepted into the bubble
    if (data.status === 'accepted' || data.privilege === 'user' || data.privilege === 'moderator') {
      mapping.agentJoined = true
      const store = getChatStore()
      await store.addMessage(sessionId, 'system', 'An agent has joined the conversation.')
    }
  }

  /* ---- Close session ---- */

  async closeSession(sessionId: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    const store = getChatStore()
    await store.addMessage(sessionId, 'system', 'The agent has ended this conversation. Thank you for contacting ALE support!')
    await store.updateSessionStatus(sessionId, 'closed')

    // Clean up Rainbow bubble
    try {
      const sdk = await this.ensureConnected()
      const bubble = sdk.bubbles.getBubbleByJid(mapping.bubbleJid)
        || sdk.bubbles.getBubbleById(mapping.bubbleId)
      if (bubble) {
        await sdk.bubbles.closeAndDeleteBubble(bubble)
      }
    } catch (err: any) {
      console.warn('[Rainbow Bridge] Error closing bubble:', err.message)
    }

    // Remove mappings
    this.bySession.delete(sessionId)
    this.byBubble.delete(mapping.bubbleJid)

    console.log(`[Rainbow Bridge] Session ${sessionId} closed`)
  }

  /* ---- Restore on restart ---- */

  private async restoreMappings(): Promise<void> {
    try {
      const store = getChatStore()
      const sessions = await store.getRecentSessions('escalated', 100)

      for (const session of sessions) {
        const meta = session.metadata as Record<string, unknown>
        const bubbleJid = meta?.bubbleJid as string | undefined
        const bubbleId = meta?.bubbleId as string | undefined
        if (!bubbleJid || !bubbleId) continue

        const mapping: BridgeMapping = {
          sessionId: session.id,
          bubbleJid,
          bubbleId,
          agentJoined: true, // Assume agent already joined for restored sessions
        }

        this.bySession.set(session.id, mapping)
        this.byBubble.set(bubbleJid, session.id)
      }

      if (sessions.length > 0) {
        console.log(`[Rainbow Bridge] Restored ${this.bySession.size} escalated session mappings`)
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

/**
 * Returns the bridge singleton, or `null` if Rainbow env vars are missing.
 * Safe to call in any context — graceful fallback.
 */
export function getRainbowBridge(): RainbowBridgeService | null {
  if (bridgeInstance) return bridgeInstance

  if (!process.env.RAINBOW_APP_ID || !process.env.RAINBOW_BOT_LOGIN) {
    return null
  }

  bridgeInstance = new RainbowBridgeService()
  return bridgeInstance
}
