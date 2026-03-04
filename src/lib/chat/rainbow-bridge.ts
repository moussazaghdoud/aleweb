/* ------------------------------------------------------------------ */
/*  Rainbow Bridge — spawns S2S worker process (same pattern as       */
/*  ConnectPlus). The worker runs rainbow-node-sdk outside Next.js    */
/*  bundling. Commands via stdin, events via stdout + webhook.        */
/* ------------------------------------------------------------------ */

import { getChatStore } from './store'

// Use eval("require") to hide from Turbopack static analysis
// eslint-disable-next-line no-eval
const _require = eval('require') as NodeRequire

type ChildProcess = import('child_process').ChildProcess

/* ---------- Types ---------- */

interface BridgeMapping {
  sessionId: string
  bubbleId: string
  bubbleJid: string
  conversationDbId?: string
  agentJoined: boolean
}

interface PendingRequest {
  resolve: (data: any) => void
  reject: (err: Error) => void
  timer: ReturnType<typeof setTimeout>
}

/* ---------- Service ---------- */

class RainbowBridgeService {
  private worker: ChildProcess | null = null
  private workerReady = false
  private starting: Promise<void> | null = null
  private pendingRequests = new Map<string, PendingRequest>()
  private requestCounter = 0

  /** sessionId → BridgeMapping */
  private bySession = new Map<string, BridgeMapping>()
  /** bubbleJid or bubbleId or conversationDbId → sessionId */
  private byBubble = new Map<string, string>()
  /** Prevents duplicate escalation (race condition guard) */
  private escalatingSessionIds = new Set<string>()
  /** Buffer for unmatched inbound messages (conversation_id not yet mapped) */
  private messageBuffer = new Map<string, { content: string; fromId: string; ts: number }[]>()

  private agentEmails: string[]

  constructor() {
    this.agentEmails = (process.env.RAINBOW_SUPPORT_AGENTS || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
  }

  /* ---- Worker lifecycle ---- */

  private async ensureWorker(): Promise<void> {
    if (this.worker && this.workerReady) return

    if (this.starting) {
      await this.starting
      return
    }

    this.starting = this._spawnWorker()
    await this.starting
    this.starting = null
  }

  private async _spawnWorker(): Promise<void> {
    const workerPath = process.cwd() + '/scripts/rainbow-s2s-worker.js'
    // Rainbow appends sub-paths (/message, /receipt, etc.) to the callback URL.
    // It MUST point to our webhook route so sub-paths hit our catch-all.
    const baseUrl = process.env.RAINBOW_HOST_CALLBACK
      || process.env.NEXT_PUBLIC_SERVER_URL
      || 'https://aleweb-production-b8f6.up.railway.app'
    // Ensure the callback URL ends with our webhook path
    const callbackUrl = baseUrl.includes('/api/chat/rainbow-webhook')
      ? baseUrl
      : `${baseUrl.replace(/\/$/, '')}/api/chat/rainbow-webhook`

    console.log(`[Rainbow Bridge] Callback URL for S2S: ${callbackUrl}`)

    const { spawn } = _require('child_process') as typeof import('child_process')

    this.worker = spawn('node', [workerPath], {
      env: {
        ...process.env,
        RAINBOW_APP_ID: process.env.RAINBOW_APP_ID,
        RAINBOW_APP_SECRET: process.env.RAINBOW_APP_SECRET,
        RAINBOW_HOST: process.env.RAINBOW_HOST || 'official',
        RAINBOW_HOST_CALLBACK: callbackUrl,
        RAINBOW_BOT_LOGIN: process.env.RAINBOW_BOT_LOGIN,
        RAINBOW_BOT_PASSWORD: process.env.RAINBOW_BOT_PASSWORD,
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    let stdoutBuffer = ''

    this.worker.stdout?.on('data', (data: Buffer) => {
      stdoutBuffer += data.toString()
      const lines = stdoutBuffer.split('\n')
      stdoutBuffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('__RESP__')) {
          // Response to a command
          try {
            const resp = JSON.parse(line.slice(8))
            const pending = this.pendingRequests.get(resp.id)
            if (pending) {
              clearTimeout(pending.timer)
              this.pendingRequests.delete(resp.id)
              if (resp.ok) {
                pending.resolve(resp)
              } else {
                const err = new Error(resp.error || 'Command failed') as any
                err.data = resp // preserve full response data (e.g. conversationDbId)
                pending.reject(err)
              }
            }
          } catch (parseErr: any) {
            console.error('[Rainbow Bridge] Failed to parse worker response:', line, parseErr.message)
          }
        } else if (line.startsWith('__ASYNC__')) {
          // Async notification from worker (e.g. conversationDbId ready)
          try {
            const data = JSON.parse(line.slice(9))
            this.handleWorkerAsync(data)
          } catch (parseErr: any) {
            console.error('[Rainbow Bridge] Failed to parse async notification:', line, parseErr.message)
          }
        } else {
          // Log line from worker
          if (line.includes('SDK ready')) {
            this.workerReady = true
          }
          console.log(line)
        }
      }
    })

    this.worker.stderr?.on('data', (data: Buffer) => {
      console.error(data.toString())
    })

    this.worker.on('exit', (code) => {
      console.log(`[Rainbow Bridge] Worker exited (code: ${code})`)
      this.workerReady = false
      this.worker = null
      // Reject pending requests
      for (const [id, pending] of this.pendingRequests) {
        clearTimeout(pending.timer)
        pending.reject(new Error('Worker exited'))
      }
      this.pendingRequests.clear()
    })

    // Wait for SDK ready (up to 30s)
    await new Promise<void>((resolve) => {
      const check = setInterval(() => {
        if (this.workerReady) {
          clearInterval(check)
          clearTimeout(timeout)
          resolve()
        }
      }, 500)
      const timeout = setTimeout(() => {
        clearInterval(check)
        resolve() // Don't block forever — worker might still be connecting
      }, 30_000)
    })

    // Restore mappings after worker is ready
    await this.restoreMappings()
  }

  /** Send a command to the worker and await the response */
  private sendCommand(cmd: Record<string, unknown>): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.worker || !this.worker.stdin) {
        reject(new Error('Worker not running'))
        return
      }

      const id = `cmd_${++this.requestCounter}`
      const timer = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject(new Error('Command timed out (45s)'))
      }, 45_000)

      this.pendingRequests.set(id, { resolve, reject, timer })
      this.worker.stdin.write(JSON.stringify({ id, ...cmd }) + '\n')
    })
  }

  /* ---- Public: test connection ---- */

  async testConnection(): Promise<{ workerReady: boolean }> {
    await this.ensureWorker()
    return { workerReady: this.workerReady }
  }

  /* ---- Escalation ---- */

  async escalateSession(sessionId: string, reason?: string): Promise<void> {
    if (this.bySession.has(sessionId)) return
    if (this.escalatingSessionIds.has(sessionId)) return // prevent race condition
    this.escalatingSessionIds.add(sessionId)

    try {
    await this.ensureWorker()
    const store = getChatStore()

    // 1. Create bubble
    const bubbleName = `ALE Support — ${sessionId.slice(0, 8)}`
    const result = await this.sendCommand({
      cmd: 'create_bubble',
      name: bubbleName,
      description: reason || 'Visitor requested human agent',
    })

    const bubbleId = result.bubbleId
    const bubbleJid = result.bubbleJid

    // 2. Invite agents
    if (this.agentEmails.length > 0) {
      await this.sendCommand({
        cmd: 'invite_agents',
        bubbleId,
        emails: this.agentEmails,
      }).catch((err: any) => console.warn('[Rainbow Bridge] Invite failed:', err.message))
    }

    // 3. Send conversation history (and capture conversationDbId)
    let conversationDbId: string | undefined
    const messages = await store.getMessages(sessionId)
    if (messages.length > 0) {
      const historyLines = messages.map((m) => {
        const label = m.role === 'user' ? 'Visitor' : m.role === 'assistant' ? 'Bot' : m.role
        return `[${label}]: ${m.content}`
      })
      const historyText = `--- Conversation history ---\n${historyLines.join('\n')}\n--- End history ---`
      try {
        const sendResult = await this.sendCommand({
          cmd: 'send_message',
          bubbleId,
          bubbleJid,
          body: historyText,
        })
        conversationDbId = sendResult?.conversationDbId || undefined
      } catch (err: any) {
        console.warn('[Rainbow Bridge] History send failed:', err.message)
        // Still capture conversationDbId from error response if available
        conversationDbId = err.data?.conversationDbId || undefined
      }
    }

    // 4. Store mapping (including conversationDbId for inbound message lookup)
    const mapping: BridgeMapping = { sessionId, bubbleId, bubbleJid, conversationDbId, agentJoined: false }
    this.bySession.set(sessionId, mapping)
    this.byBubble.set(bubbleJid, sessionId)
    this.byBubble.set(bubbleId, sessionId)
    if (conversationDbId) {
      this.byBubble.set(conversationDbId, sessionId)
      console.log(`[Rainbow Bridge] Mapped conversationDbId ${conversationDbId} → session ${sessionId}`)
    }

    // 5. Persist in DB metadata
    const session = await store.getSession(sessionId)
    if (session) {
      const pool = await this._getPool()
      if (pool) {
        const metadata = { ...session.metadata, bubbleId, bubbleJid, conversationDbId }
        await pool.query(
          `UPDATE chat_sessions SET metadata = $1, updated_at = NOW() WHERE id = $2`,
          [JSON.stringify(metadata), sessionId],
        )
      }
    }

    console.log(`[Rainbow Bridge] Session ${sessionId} escalated → bubble ${bubbleId}`)
    } finally {
      this.escalatingSessionIds.delete(sessionId)
    }
  }

  /* ---- Visitor → Rainbow ---- */

  async relayVisitorMessage(sessionId: string, content: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    await this.ensureWorker()
    try {
      const result = await this.sendCommand({
        cmd: 'send_message',
        bubbleId: mapping.bubbleId,
        bubbleJid: mapping.bubbleJid,
        body: `[Visitor]: ${content}`,
      })
      // Capture conversationDbId if not yet mapped
      if (result?.conversationDbId && !mapping.conversationDbId) {
        mapping.conversationDbId = result.conversationDbId
        this.byBubble.set(result.conversationDbId, sessionId)
        console.log(`[Rainbow Bridge] Mapped conversationDbId ${result.conversationDbId} → session ${sessionId}`)
      }
    } catch (err: any) {
      console.warn('[Rainbow Bridge] Relay failed:', err.message)
    }
  }

  /* ---- Async notifications from worker ---- */

  private handleWorkerAsync(data: any): void {
    if (data.type === 'conversation_ready' && data.bubbleId && data.conversationDbId) {
      const sessionId = this.byBubble.get(data.bubbleId)
      if (sessionId) {
        const mapping = this.bySession.get(sessionId)
        if (mapping) {
          mapping.conversationDbId = data.conversationDbId
          this.byBubble.set(data.conversationDbId, sessionId)
          console.log(`[Rainbow Bridge] Mapped conversationDbId ${data.conversationDbId} → session ${sessionId}`)
        }
      }
    }
  }

  /* ---- Rainbow webhook → Visitor (called from webhook route) ---- */

  async handleWebhookEvent(event: any, subPath?: string): Promise<void> {
    console.log(`[Rainbow Bridge] handleWebhookEvent (path: ${subPath || '/'}):`, JSON.stringify(event).slice(0, 1000))

    // Handle /conversation callbacks — maps agent's conversation_id → bubbleId.
    // Rainbow uses per-user conversation IDs, so the agent's conversation_id differs
    // from the bot's. This callback tells us: conversation.id → conversation.peer (bubbleId).
    if (event.conversation && event.conversation.type === 'room' && event.conversation.peer && event.conversation.id) {
      const convId = event.conversation.id
      const bubbleId = event.conversation.peer
      const sessionId = this.byBubble.get(bubbleId)
      if (sessionId) {
        this.byBubble.set(convId, sessionId)
        console.log(`[Rainbow Bridge] Mapped agent conversationId ${convId} (bubble ${bubbleId}) → session ${sessionId}`)

        // Replay any buffered messages for this conversation_id
        const buffered = this.messageBuffer.get(convId)
        if (buffered?.length) {
          this.messageBuffer.delete(convId)
          console.log(`[Rainbow Bridge] Replaying ${buffered.length} buffered message(s) for conversation ${convId}`)
          for (const msg of buffered) {
            await this.processIncomingMessage(sessionId, msg.content, msg.fromId)
          }
        }
      } else {
        console.log(`[Rainbow Bridge] /conversation callback: bubble ${bubbleId} not in byBubble — ignoring`)
      }
      return
    }

    let content = ''
    let fromId = ''
    const lookupKeys: string[] = []

    // Format A: Worker-forwarded { type: "message", data: { body, roomJid, roomId } }
    if (event.type === 'message' && event.data) {
      content = event.data.body || ''
      fromId = event.data.fromUserId || ''
      if (event.data.roomJid) lookupKeys.push(event.data.roomJid)
      if (event.data.roomId) lookupKeys.push(event.data.roomId)
    }
    // Format B: Rainbow S2S callback { message: { conversation_id, body, from } }
    else if (event.message) {
      const msg = event.message
      content = msg.body || msg.content || ''
      fromId = msg.from || msg.fromJid || event.userId || ''
      // Add conversation_id — may be bot's or agent's (both mapped via /conversation callback)
      if (msg.conversation_id) lookupKeys.push(msg.conversation_id)
      if (msg.conversationId) lookupKeys.push(msg.conversationId)
      // Also try 'from' field — for bubble system messages, 'from' is the bubbleId
      if (msg.from) lookupKeys.push(msg.from)
    }
    // Format C: Rainbow event { event: "chat/message", data: { content/body, fromJid, ... } }
    else if (event.event && event.data) {
      content = event.data.content || event.data.body || ''
      fromId = event.data.fromJid || event.data.from || ''
      if (event.data.roomJid) lookupKeys.push(event.data.roomJid)
      if (event.data.roomId) lookupKeys.push(event.data.roomId)
      if (event.data.conversationId) lookupKeys.push(event.data.conversationId)
      if (event.data.conversation_id) lookupKeys.push(event.data.conversation_id)
    }
    // Format D: Flat structure { body, conversationId, ... }
    else if (event.body || event.content) {
      content = event.body || event.content || ''
      fromId = event.from || event.fromJid || event.userId || ''
      if (event.conversationId) lookupKeys.push(event.conversationId)
      if (event.conversation_id) lookupKeys.push(event.conversation_id)
      if (event.roomId) lookupKeys.push(event.roomId)
      if (event.roomJid) lookupKeys.push(event.roomJid)
    }

    if (!content.trim()) {
      return
    }

    // Echo prevention — skip bot's own messages
    if (content.startsWith('[Visitor]:')) return
    if (content.startsWith('--- Conversation history ---')) return
    // Skip bubble system messages (join/leave notifications)
    if (content.includes('has joined the bubble') || content.includes('has left the bubble')) return

    // Find session by trying all available lookup keys
    let sessionId: string | undefined
    for (const key of lookupKeys) {
      sessionId = this.byBubble.get(key)
      if (sessionId) {
        console.log(`[Rainbow Bridge] Matched session ${sessionId} via key "${key}"`)
        break
      }
    }

    if (!sessionId) {
      // Buffer the message — the /conversation callback may arrive shortly and map the ID
      const convId = lookupKeys[0]
      if (convId && content.trim()) {
        const buf = this.messageBuffer.get(convId) || []
        buf.push({ content, fromId, ts: Date.now() })
        this.messageBuffer.set(convId, buf)
        console.log(`[Rainbow Bridge] Buffered message for unmatched conversation ${convId}: "${content.slice(0, 60)}"`)
        // Clean up old buffer entries (>60s) to prevent memory leaks
        this.cleanMessageBuffer()
      } else {
        console.warn(`[Rainbow Bridge] No session found and no key to buffer. Keys: ${lookupKeys.join(', ')}`)
      }
      return
    }

    await this.processIncomingMessage(sessionId, content, fromId)
  }

  /** Process a matched incoming agent message — stores it and checks for /close */
  private async processIncomingMessage(sessionId: string, content: string, _fromId: string): Promise<void> {
    const store = getChatStore()
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    if (!mapping.agentJoined) {
      mapping.agentJoined = true
      await store.addMessage(sessionId, 'system', 'An agent has joined the conversation.')
    }

    console.log(`[Rainbow Bridge] Storing agent message for session ${sessionId}: ${content.slice(0, 80)}`)
    await store.addMessage(sessionId, 'agent', content)

    const lower = content.toLowerCase().trim()
    if (lower === '/close' || lower === '/end') {
      await this.closeSession(sessionId)
    }
  }

  /** Remove buffered messages older than 60 seconds */
  private cleanMessageBuffer(): void {
    const cutoff = Date.now() - 60_000
    for (const [key, msgs] of this.messageBuffer) {
      const fresh = msgs.filter((m) => m.ts > cutoff)
      if (fresh.length === 0) {
        this.messageBuffer.delete(key)
      } else {
        this.messageBuffer.set(key, fresh)
      }
    }
  }

  /* ---- Close session ---- */

  async closeSession(sessionId: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    const store = getChatStore()
    await store.addMessage(sessionId, 'system', 'The agent has ended this conversation. Thank you for contacting ALE support!')
    await store.updateSessionStatus(sessionId, 'closed')

    await this.sendCommand({
      cmd: 'close_bubble',
      bubbleId: mapping.bubbleId,
    }).catch((err: any) => console.warn('[Rainbow Bridge] Close failed:', err.message))

    this.bySession.delete(sessionId)
    this.byBubble.delete(mapping.bubbleJid)
    this.byBubble.delete(mapping.bubbleId)
    if (mapping.conversationDbId) this.byBubble.delete(mapping.conversationDbId)
    console.log(`[Rainbow Bridge] Session ${sessionId} closed`)
  }

  /* ---- Restore on restart ---- */

  private async restoreMappings(): Promise<void> {
    try {
      const store = getChatStore()
      const sessions = await store.getRecentSessions('escalated', 100)

      for (const session of sessions) {
        const meta = session.metadata as Record<string, unknown>
        const bubbleId = meta?.bubbleId as string | undefined
        const bubbleJid = meta?.bubbleJid as string | undefined
        const conversationDbId = meta?.conversationDbId as string | undefined
        if (!bubbleId) continue

        const mapping: BridgeMapping = {
          sessionId: session.id,
          bubbleId,
          bubbleJid: bubbleJid || '',
          conversationDbId,
          agentJoined: true,
        }

        this.bySession.set(session.id, mapping)
        if (bubbleJid) this.byBubble.set(bubbleJid, session.id)
        this.byBubble.set(bubbleId, session.id)
        if (conversationDbId) this.byBubble.set(conversationDbId, session.id)
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
  // Pre-warm the worker so the SDK connects immediately at server startup,
  // not on the first escalation (which would add 15-30s delay)
  bridgeInstance.testConnection().catch(() => {})
  return bridgeInstance
}
