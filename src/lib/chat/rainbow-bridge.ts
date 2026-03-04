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
  /** bubbleJid or bubbleId → sessionId */
  private byBubble = new Map<string, string>()

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
    const callbackUrl = process.env.RAINBOW_HOST_CALLBACK
      || process.env.NEXT_PUBLIC_SERVER_URL
      || 'https://aleweb-production-b8f6.up.railway.app'

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
            const resp = JSON.parse(line.slice(7))
            const pending = this.pendingRequests.get(resp.id)
            if (pending) {
              clearTimeout(pending.timer)
              this.pendingRequests.delete(resp.id)
              if (resp.ok) {
                pending.resolve(resp)
              } else {
                pending.reject(new Error(resp.error || 'Command failed'))
              }
            }
          } catch {}
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

    // 3. Send conversation history
    const messages = await store.getMessages(sessionId)
    if (messages.length > 0) {
      const historyLines = messages.map((m) => {
        const label = m.role === 'user' ? 'Visitor' : m.role === 'assistant' ? 'Bot' : m.role
        return `[${label}]: ${m.content}`
      })
      const historyText = `--- Conversation history ---\n${historyLines.join('\n')}\n--- End history ---`
      await this.sendCommand({
        cmd: 'send_message',
        bubbleId,
        bubbleJid,
        body: historyText,
      }).catch((err: any) => console.warn('[Rainbow Bridge] History send failed:', err.message))
    }

    // 4. Store mapping
    const mapping: BridgeMapping = { sessionId, bubbleId, bubbleJid, agentJoined: false }
    this.bySession.set(sessionId, mapping)
    this.byBubble.set(bubbleJid, sessionId)
    this.byBubble.set(bubbleId, sessionId)

    // 5. Persist in DB metadata
    const session = await store.getSession(sessionId)
    if (session) {
      const pool = await this._getPool()
      if (pool) {
        const metadata = { ...session.metadata, bubbleId, bubbleJid }
        await pool.query(
          `UPDATE chat_sessions SET metadata = $1, updated_at = NOW() WHERE id = $2`,
          [JSON.stringify(metadata), sessionId],
        )
      }
    }

    console.log(`[Rainbow Bridge] Session ${sessionId} escalated → bubble ${bubbleId}`)
  }

  /* ---- Visitor → Rainbow ---- */

  async relayVisitorMessage(sessionId: string, content: string): Promise<void> {
    const mapping = this.bySession.get(sessionId)
    if (!mapping) return

    await this.ensureWorker()
    await this.sendCommand({
      cmd: 'send_message',
      bubbleId: mapping.bubbleId,
      bubbleJid: mapping.bubbleJid,
      body: `[Visitor]: ${content}`,
    }).catch((err: any) => console.warn('[Rainbow Bridge] Relay failed:', err.message))
  }

  /* ---- Rainbow webhook → Visitor (called from webhook route) ---- */

  async handleWebhookEvent(event: any): Promise<void> {
    if (event.type !== 'message') return

    const data = event.data || {}
    const content: string = data.body || ''
    if (!content.trim()) return

    // Echo prevention
    if (content.startsWith('[Visitor]:')) return
    if (content.startsWith('--- Conversation history ---')) return

    // Find session
    const sessionId = this.byBubble.get(data.roomJid) || this.byBubble.get(data.roomId)
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

    await this.sendCommand({
      cmd: 'close_bubble',
      bubbleId: mapping.bubbleId,
    }).catch((err: any) => console.warn('[Rainbow Bridge] Close failed:', err.message))

    this.bySession.delete(sessionId)
    this.byBubble.delete(mapping.bubbleJid)
    this.byBubble.delete(mapping.bubbleId)
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
        if (!bubbleId) continue

        const mapping: BridgeMapping = {
          sessionId: session.id,
          bubbleId,
          bubbleJid: bubbleJid || '',
          agentJoined: true,
        }

        this.bySession.set(session.id, mapping)
        if (bubbleJid) this.byBubble.set(bubbleJid, session.id)
        this.byBubble.set(bubbleId, session.id)
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
