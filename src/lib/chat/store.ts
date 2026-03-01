/* ------------------------------------------------------------------ */
/*  Chat Message Store — PostgreSQL (prod) + In-Memory (dev)          */
/* ------------------------------------------------------------------ */

import { nanoid } from 'nanoid'
import type { ChatSession, ChatMessage, ChatStore, SessionStatus, MessageRole } from './types'

/* ======================== PostgreSQL Provider ======================== */

type Pool = {
  query: (text: string, values?: any[]) => Promise<{ rows: any[]; rowCount: number }>
}

class PostgresChatStore implements ChatStore {
  private pool: Pool | null = null
  private initialized = false

  private async getPool(): Promise<Pool> {
    if (this.pool) return this.pool
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool
    if (!pool || typeof pool.query !== 'function') {
      throw new Error('[Chat] Could not access PostgreSQL pool from Payload adapter')
    }
    this.pool = pool as Pool
    return this.pool
  }

  private async ensureTables(): Promise<void> {
    if (this.initialized) return
    const pool = await this.getPool()

    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS chat_sessions (
          id TEXT PRIMARY KEY,
          visitor_id TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'active',
          agent_id TEXT,
          metadata JSONB DEFAULT '{}',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )
      `)

      await pool.query(`
        CREATE TABLE IF NOT EXISTS chat_messages (
          id TEXT PRIMARY KEY,
          session_id TEXT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `)

      // Indexes
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_chat_messages_session
        ON chat_messages(session_id, created_at)
      `)
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_chat_sessions_status
        ON chat_sessions(status, updated_at DESC)
      `)
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor
        ON chat_sessions(visitor_id, created_at DESC)
      `)

      this.initialized = true
      console.log('[Chat] PostgreSQL tables ready')
    } catch (err: any) {
      console.error('[Chat] Failed to create tables:', err.message)
      throw err
    }
  }

  async createSession(visitorId: string, metadata?: Record<string, unknown>): Promise<ChatSession> {
    await this.ensureTables()
    const pool = await this.getPool()
    const id = nanoid(16)
    const now = new Date().toISOString()

    await pool.query(
      `INSERT INTO chat_sessions (id, visitor_id, status, metadata, created_at, updated_at)
       VALUES ($1, $2, 'active', $3, $4, $4)`,
      [id, visitorId, JSON.stringify(metadata || {}), now],
    )

    return { id, visitorId, status: 'active', metadata: metadata || {}, createdAt: now, updatedAt: now }
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    await this.ensureTables()
    const pool = await this.getPool()
    const { rows } = await pool.query(`SELECT * FROM chat_sessions WHERE id = $1`, [sessionId])
    if (rows.length === 0) return null
    const r = rows[0]
    return {
      id: r.id,
      visitorId: r.visitor_id,
      status: r.status,
      agentId: r.agent_id || undefined,
      metadata: r.metadata || {},
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }
  }

  async addMessage(sessionId: string, role: MessageRole, content: string): Promise<ChatMessage> {
    await this.ensureTables()
    const pool = await this.getPool()
    const id = nanoid(16)
    const now = new Date().toISOString()

    await pool.query(
      `INSERT INTO chat_messages (id, session_id, role, content, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, sessionId, role, content, now],
    )

    // Touch session updated_at
    await pool.query(
      `UPDATE chat_sessions SET updated_at = $1 WHERE id = $2`,
      [now, sessionId],
    )

    return { id, sessionId, role, content, createdAt: now }
  }

  async getMessages(sessionId: string, after?: string): Promise<ChatMessage[]> {
    await this.ensureTables()
    const pool = await this.getPool()

    let query = `SELECT * FROM chat_messages WHERE session_id = $1`
    const params: any[] = [sessionId]

    if (after) {
      query += ` AND created_at > $2`
      params.push(after)
    }

    query += ` ORDER BY created_at ASC`

    const { rows } = await pool.query(query, params)
    return rows.map((r: any) => ({
      id: r.id,
      sessionId: r.session_id,
      role: r.role,
      content: r.content,
      createdAt: r.created_at,
    }))
  }

  async updateSessionStatus(sessionId: string, status: SessionStatus, agentId?: string): Promise<void> {
    await this.ensureTables()
    const pool = await this.getPool()
    const now = new Date().toISOString()

    if (agentId) {
      await pool.query(
        `UPDATE chat_sessions SET status = $1, agent_id = $2, updated_at = $3 WHERE id = $4`,
        [status, agentId, now, sessionId],
      )
    } else {
      await pool.query(
        `UPDATE chat_sessions SET status = $1, updated_at = $2 WHERE id = $3`,
        [status, now, sessionId],
      )
    }
  }

  async getRecentSessions(status?: SessionStatus, limit = 50): Promise<ChatSession[]> {
    await this.ensureTables()
    const pool = await this.getPool()

    let query = `SELECT * FROM chat_sessions`
    const params: any[] = []

    if (status) {
      query += ` WHERE status = $1`
      params.push(status)
    }

    query += ` ORDER BY updated_at DESC LIMIT $${params.length + 1}`
    params.push(limit)

    const { rows } = await pool.query(query, params)
    return rows.map((r: any) => ({
      id: r.id,
      visitorId: r.visitor_id,
      status: r.status,
      agentId: r.agent_id || undefined,
      metadata: r.metadata || {},
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }))
  }
}

/* ======================== In-Memory Provider ======================== */

class InMemoryChatStore implements ChatStore {
  private sessions = new Map<string, ChatSession>()
  private messages = new Map<string, ChatMessage[]>()

  async createSession(visitorId: string, metadata?: Record<string, unknown>): Promise<ChatSession> {
    const id = nanoid(16)
    const now = new Date().toISOString()
    const session: ChatSession = {
      id, visitorId, status: 'active', metadata: metadata || {},
      createdAt: now, updatedAt: now,
    }
    this.sessions.set(id, session)
    this.messages.set(id, [])
    return session
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    return this.sessions.get(sessionId) || null
  }

  async addMessage(sessionId: string, role: MessageRole, content: string): Promise<ChatMessage> {
    const id = nanoid(16)
    const now = new Date().toISOString()
    const msg: ChatMessage = { id, sessionId, role, content, createdAt: now }

    const msgs = this.messages.get(sessionId) || []
    msgs.push(msg)
    this.messages.set(sessionId, msgs)

    const session = this.sessions.get(sessionId)
    if (session) session.updatedAt = now

    return msg
  }

  async getMessages(sessionId: string, after?: string): Promise<ChatMessage[]> {
    const msgs = this.messages.get(sessionId) || []
    if (!after) return msgs
    return msgs.filter((m) => m.createdAt > after)
  }

  async updateSessionStatus(sessionId: string, status: SessionStatus, agentId?: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return
    session.status = status
    if (agentId) session.agentId = agentId
    session.updatedAt = new Date().toISOString()
  }

  async getRecentSessions(status?: SessionStatus, limit = 50): Promise<ChatSession[]> {
    let sessions = Array.from(this.sessions.values())
    if (status) sessions = sessions.filter((s) => s.status === status)
    return sessions.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, limit)
  }
}

/* ======================== Factory ======================== */

let storeInstance: ChatStore | null = null

export function getChatStore(): ChatStore {
  if (storeInstance) return storeInstance

  const dbUri = process.env.DATABASE_URI || ''
  if (dbUri.startsWith('postgres')) {
    console.log('[Chat] Using PostgreSQL message store')
    storeInstance = new PostgresChatStore()
  } else {
    console.log('[Chat] Using in-memory message store (dev)')
    storeInstance = new InMemoryChatStore()
  }

  return storeInstance
}
