/* ------------------------------------------------------------------ */
/*  Chat Analytics — Fire-and-forget event logging                    */
/* ------------------------------------------------------------------ */

type Pool = {
  query: (text: string, values?: any[]) => Promise<{ rows: any[]; rowCount: number }>
}

let pool: Pool | null = null
let initialized = false

async function getPool(): Promise<Pool | null> {
  if (pool) return pool
  const dbUri = process.env.DATABASE_URI || ''
  if (!dbUri.startsWith('postgres')) return null // No analytics on SQLite

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    pool = (payload.db as any).pool as Pool
    return pool
  } catch {
    return null
  }
}

async function ensureTable(): Promise<void> {
  if (initialized) return
  const p = await getPool()
  if (!p) return

  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS chat_analytics (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        session_id TEXT,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    await p.query(`
      CREATE INDEX IF NOT EXISTS idx_chat_analytics_type
      ON chat_analytics(event_type, created_at)
    `)
    initialized = true
  } catch (err: any) {
    console.warn('[Chat Analytics] Failed to create table:', err.message)
  }
}

/**
 * Log a chat event (fire-and-forget — never throws)
 */
export function logChatEvent(
  eventType: string,
  sessionId?: string,
  metadata?: Record<string, unknown>,
): void {
  // Fire and forget
  ;(async () => {
    try {
      await ensureTable()
      const p = await getPool()
      if (!p) return

      await p.query(
        `INSERT INTO chat_analytics (event_type, session_id, metadata) VALUES ($1, $2, $3)`,
        [eventType, sessionId || null, JSON.stringify(metadata || {})],
      )
    } catch {
      // Silent — analytics should never break the app
    }
  })()
}

/**
 * Get chat analytics for the last N days
 */
export async function getChatAnalytics(days: number): Promise<{
  totalSessions: number
  totalMessages: number
  escalationRate: number
  avgMessagesPerSession: number
  topEventTypes: Array<{ event_type: string; count: number }>
  dailyVolume: Array<{ date: string; count: number }>
}> {
  const p = await getPool()
  if (!p) {
    return {
      totalSessions: 0,
      totalMessages: 0,
      escalationRate: 0,
      avgMessagesPerSession: 0,
      topEventTypes: [],
      dailyVolume: [],
    }
  }

  await ensureTable()

  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const [sessions, messages, escalations, eventTypes, daily] = await Promise.all([
    p.query(
      `SELECT COUNT(DISTINCT session_id) as count FROM chat_analytics
       WHERE event_type = 'session_start' AND created_at > $1`,
      [cutoff],
    ),
    p.query(
      `SELECT COUNT(*) as count FROM chat_analytics
       WHERE event_type = 'message_sent' AND created_at > $1`,
      [cutoff],
    ),
    p.query(
      `SELECT COUNT(*) as count FROM chat_analytics
       WHERE event_type = 'escalation_requested' AND created_at > $1`,
      [cutoff],
    ),
    p.query(
      `SELECT event_type, COUNT(*) as count FROM chat_analytics
       WHERE created_at > $1 GROUP BY event_type ORDER BY count DESC LIMIT 10`,
      [cutoff],
    ),
    p.query(
      `SELECT DATE(created_at) as date, COUNT(*) as count FROM chat_analytics
       WHERE created_at > $1 GROUP BY DATE(created_at) ORDER BY date`,
      [cutoff],
    ),
  ])

  const totalSessions = parseInt(sessions.rows[0]?.count || '0')
  const totalMessages = parseInt(messages.rows[0]?.count || '0')
  const totalEscalations = parseInt(escalations.rows[0]?.count || '0')

  return {
    totalSessions,
    totalMessages,
    escalationRate: totalSessions > 0 ? totalEscalations / totalSessions : 0,
    avgMessagesPerSession: totalSessions > 0 ? totalMessages / totalSessions : 0,
    topEventTypes: eventTypes.rows.map((r: any) => ({
      event_type: r.event_type,
      count: parseInt(r.count),
    })),
    dailyVolume: daily.rows.map((r: any) => ({
      date: r.date,
      count: parseInt(r.count),
    })),
  }
}
