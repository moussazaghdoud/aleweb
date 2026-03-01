/**
 * Search Analytics
 *
 * Fire-and-forget logging of search queries to the search_analytics table.
 * PostgreSQL-only — silently no-ops on SQLite/dev.
 */

interface LogEntry {
  query: string
  resultCount: number
  latencyMs: number
  filters?: Record<string, any>
}

export async function logSearchQuery(entry: LogEntry): Promise<void> {
  const isPostgres = process.env.DATABASE_URI?.startsWith('postgresql')
  if (!isPostgres) return

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool

    if (!pool?.query) return

    await pool.query(
      `INSERT INTO search_analytics (query, result_count, latency_ms, filters)
       VALUES ($1, $2, $3, $4)`,
      [entry.query, entry.resultCount, entry.latencyMs, JSON.stringify(entry.filters || {})],
    )
  } catch {
    // Analytics failures must never surface to users
  }
}

export async function getSearchAnalytics(days = 7) {
  const isPostgres = process.env.DATABASE_URI?.startsWith('postgresql')
  if (!isPostgres) {
    return { topQueries: [], zeroResultQueries: [], avgLatency: 0, p95Latency: 0, totalSearches: 0 }
  }

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool

    const interval = `${days} days`

    const [topQueries, zeroResults, latency, totalSearches] = await Promise.all([
      pool.query(
        `SELECT query, count(*) AS count, round(avg(result_count)) AS avg_results
         FROM search_analytics
         WHERE created_at > now() - $1::interval AND result_count > 0
         GROUP BY query ORDER BY count DESC LIMIT 20`,
        [interval],
      ),
      pool.query(
        `SELECT query, count(*) AS count
         FROM search_analytics
         WHERE created_at > now() - $1::interval AND zero_results = true
         GROUP BY query ORDER BY count DESC LIMIT 20`,
        [interval],
      ),
      pool.query(
        `SELECT round(avg(latency_ms)) AS avg_ms,
                round(percentile_cont(0.95) WITHIN GROUP (ORDER BY latency_ms)) AS p95_ms
         FROM search_analytics
         WHERE created_at > now() - $1::interval`,
        [interval],
      ),
      pool.query(
        `SELECT count(*) AS total
         FROM search_analytics
         WHERE created_at > now() - $1::interval`,
        [interval],
      ),
    ])

    return {
      topQueries: topQueries.rows,
      zeroResultQueries: zeroResults.rows,
      avgLatency: parseInt(latency.rows[0]?.avg_ms || '0'),
      p95Latency: parseInt(latency.rows[0]?.p95_ms || '0'),
      totalSearches: parseInt(totalSearches.rows[0]?.total || '0'),
    }
  } catch (err) {
    console.error('[Search Analytics] Error:', err)
    return { topQueries: [], zeroResultQueries: [], avgLatency: 0, p95Latency: 0, totalSearches: 0 }
  }
}
