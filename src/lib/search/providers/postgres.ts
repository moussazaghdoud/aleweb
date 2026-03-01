/**
 * PostgreSQL Search Provider
 *
 * Production search engine using tsvector (weighted full-text) + pg_trgm (typo tolerance).
 * Accesses the existing PG pool from Payload's postgres adapter — no extra connections.
 */

import type {
  SearchProvider, SearchDocument, SearchQuery, SearchResponse,
  SearchResult, SuggestResponse, FacetCounts, DocType,
} from '../types'
import { getSearchConfig } from '../config'

type Pool = {
  query: (text: string, values?: any[]) => Promise<{ rows: any[]; rowCount: number }>
}

export class PostgresSearchProvider implements SearchProvider {
  private pool: Pool | null = null
  private initialized = false

  private async getPool(): Promise<Pool> {
    if (this.pool) return this.pool

    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const pool = (payload.db as any).pool

    if (!pool || typeof pool.query !== 'function') {
      throw new Error('[Search] Could not access PostgreSQL pool from Payload adapter')
    }

    this.pool = pool as Pool
    return this.pool
  }

  private async ensureTable(): Promise<void> {
    if (this.initialized) return
    const pool = await this.getPool()

    await pool.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_documents (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        slug TEXT NOT NULL,
        href TEXT NOT NULL,
        title TEXT NOT NULL,
        tagline TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        keywords TEXT NOT NULL DEFAULT '',
        category TEXT,
        industry TEXT,
        locale TEXT NOT NULL DEFAULT 'en',
        published_at TIMESTAMPTZ,
        boost SMALLINT NOT NULL DEFAULT 0,
        meta JSONB,
        search_vector TSVECTOR GENERATED ALWAYS AS (
          setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(tagline, '')), 'B') ||
          setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
          setweight(to_tsvector('english', coalesce(body, '') || ' ' || coalesce(keywords, '')), 'D')
        ) STORED,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `)

    // Indexes (IF NOT EXISTS prevents errors on re-init)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_vector ON search_documents USING GIN (search_vector)
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_title_trgm ON search_documents USING GIN (title gin_trgm_ops)
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_type_locale ON search_documents (type, locale)
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_category ON search_documents (category) WHERE category IS NOT NULL
    `)

    // Analytics table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_analytics (
        id SERIAL PRIMARY KEY,
        query TEXT NOT NULL,
        result_count INT NOT NULL,
        latency_ms INT NOT NULL,
        filters JSONB,
        zero_results BOOLEAN GENERATED ALWAYS AS (result_count = 0) STORED,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_analytics_created ON search_analytics (created_at DESC)
    `)

    this.initialized = true
  }

  // ── SearchProvider Interface ─────────────────────────────

  async indexByType(type: DocType, docs: SearchDocument[]): Promise<void> {
    await this.ensureTable()
    const pool = await this.getPool()

    // Delete existing docs of this type, then insert new ones in a transaction
    await pool.query('BEGIN')
    try {
      await pool.query('DELETE FROM search_documents WHERE type = $1', [type])
      for (const doc of docs) {
        await this.upsertInternal(pool, doc)
      }
      await pool.query('COMMIT')
    } catch (err) {
      await pool.query('ROLLBACK')
      throw err
    }
  }

  async upsert(doc: SearchDocument): Promise<void> {
    await this.ensureTable()
    const pool = await this.getPool()
    await this.upsertInternal(pool, doc)
  }

  private async upsertInternal(pool: Pool, doc: SearchDocument): Promise<void> {
    await pool.query(
      `INSERT INTO search_documents
        (id, type, slug, href, title, tagline, description, body, keywords,
         category, industry, locale, published_at, boost, meta, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,now())
       ON CONFLICT (id) DO UPDATE SET
        type=$2, slug=$3, href=$4, title=$5, tagline=$6, description=$7,
        body=$8, keywords=$9, category=$10, industry=$11, locale=$12,
        published_at=$13, boost=$14, meta=$15, updated_at=now()`,
      [
        doc.id, doc.type, doc.slug, doc.href, doc.title, doc.tagline,
        doc.description, doc.body, doc.keywords, doc.category || null,
        doc.industry || null, doc.locale, doc.publishedAt || null,
        doc.boost, doc.meta ? JSON.stringify(doc.meta) : null,
      ],
    )
  }

  async delete(id: string): Promise<void> {
    await this.ensureTable()
    const pool = await this.getPool()
    await pool.query('DELETE FROM search_documents WHERE id = $1', [id])
  }

  async deleteByType(type: DocType): Promise<void> {
    await this.ensureTable()
    const pool = await this.getPool()
    await pool.query('DELETE FROM search_documents WHERE type = $1', [type])
  }

  async search(query: SearchQuery): Promise<SearchResponse> {
    await this.ensureTable()
    const pool = await this.getPool()
    const start = performance.now()
    const config = getSearchConfig()

    const q = query.q.trim()
    const locale = query.locale || 'en'
    const page = query.page || 1
    const limit = query.limit || 20
    const offset = (page - 1) * limit

    // Expand synonyms into the query
    const expandedTerms = this.expandSynonyms(q, config.synonyms)
    const tsQuery = expandedTerms
      .map(t => t.split(/\s+/).filter(Boolean).map(w => `${w}:*`).join(' & '))
      .join(' | ')

    // Build filter clauses
    const conditions: string[] = ['d.locale = $2']
    const params: any[] = [tsQuery, locale]
    let paramIdx = 3

    if (query.type?.length) {
      conditions.push(`d.type = ANY($${paramIdx}::text[])`)
      params.push(query.type)
      paramIdx++
    }
    if (query.category) {
      conditions.push(`d.category = $${paramIdx}`)
      params.push(query.category)
      paramIdx++
    }
    if (query.industry) {
      conditions.push(`d.industry = $${paramIdx}`)
      params.push(query.industry)
      paramIdx++
    }
    if (query.dateFrom) {
      conditions.push(`d.published_at >= $${paramIdx}::timestamptz`)
      params.push(query.dateFrom)
      paramIdx++
    }
    if (query.dateTo) {
      conditions.push(`d.published_at <= $${paramIdx}::timestamptz`)
      params.push(query.dateTo)
      paramIdx++
    }

    const whereClause = conditions.join(' AND ')

    // Main search query with hybrid ranking (tsvector + trigram fallback)
    const searchSql = `
      WITH query AS (
        SELECT to_tsquery('english', $1) AS tsq
      )
      SELECT
        d.*,
        ts_rank_cd(d.search_vector, q.tsq, 4) AS text_rank,
        GREATEST(similarity(d.title, $${paramIdx}), similarity(d.tagline, $${paramIdx})) AS trgm_sim,
        ts_headline('english', d.description, q.tsq,
          'StartSel=<mark>, StopSel=</mark>, MaxWords=30, MinWords=10') AS hl_desc,
        ts_headline('english', d.title, q.tsq,
          'StartSel=<mark>, StopSel=</mark>') AS hl_title
      FROM search_documents d, query q
      WHERE ${whereClause}
        AND (
          d.search_vector @@ q.tsq
          OR (length($${paramIdx}) >= 3 AND similarity(d.title, $${paramIdx}) > 0.25)
        )
      ORDER BY
        (ts_rank_cd(d.search_vector, q.tsq, 4)
         + GREATEST(similarity(d.title, $${paramIdx}), 0) * 0.3
         + d.boost::float / 10.0) DESC
      LIMIT $${paramIdx + 1} OFFSET $${paramIdx + 2}
    `
    params.push(q, limit, offset)

    // Count query
    const countSql = `
      WITH query AS (
        SELECT to_tsquery('english', $1) AS tsq
      )
      SELECT count(*) AS total
      FROM search_documents d, query q
      WHERE ${whereClause}
        AND (
          d.search_vector @@ q.tsq
          OR (length($${paramIdx - 2}) >= 3 AND similarity(d.title, $${paramIdx - 2}) > 0.25)
        )
    `

    // Facet query
    const facetSql = `
      WITH query AS (
        SELECT to_tsquery('english', $1) AS tsq
      )
      SELECT d.type, d.category, d.industry, count(*) AS n
      FROM search_documents d, query q
      WHERE ${whereClause}
        AND (
          d.search_vector @@ q.tsq
          OR (length($${paramIdx - 2}) >= 3 AND similarity(d.title, $${paramIdx - 2}) > 0.25)
        )
      GROUP BY d.type, d.category, d.industry
    `

    try {
      const [searchRes, countRes, facetRes] = await Promise.all([
        pool.query(searchSql, params),
        pool.query(countSql, params.slice(0, -2)),
        pool.query(facetSql, params.slice(0, -2)),
      ])

      const total = parseInt(countRes.rows[0]?.total || '0')
      const facets = this.buildFacets(facetRes.rows)

      // Check for pinned results
      const pinned = config.pinnedResults.find(
        p => p.query.toLowerCase() === q.toLowerCase(),
      )

      const results: SearchResult[] = searchRes.rows.map((row: any) => ({
        id: row.id,
        type: row.type,
        slug: row.slug,
        href: row.href,
        title: row.title,
        tagline: row.tagline,
        description: row.description,
        body: row.body,
        keywords: row.keywords,
        category: row.category,
        industry: row.industry,
        locale: row.locale,
        publishedAt: row.published_at,
        boost: row.boost,
        meta: row.meta,
        score: (pinned?.ids.includes(row.id) ? 1000 : 0)
          + parseFloat(row.text_rank || '0')
          + parseFloat(row.trgm_sim || '0') * 0.3
          + row.boost / 10,
        highlights: {
          title: row.hl_title || row.title,
          description: row.hl_desc || row.description,
        },
      }))

      // Re-sort if pinned results need to move to top
      if (pinned) {
        results.sort((a, b) => b.score - a.score)
      }

      // "Did you mean" for zero results
      let suggestions: string[] | undefined
      if (total === 0) {
        suggestions = await this.didYouMean(pool, q)
      }

      return {
        results,
        facets,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        queryTime: Math.round(performance.now() - start),
        suggestions,
      }
    } catch (err: any) {
      // If tsquery parsing fails (bad syntax), fall back to simpler search
      if (err.message?.includes('syntax error in tsquery')) {
        return this.fallbackSearch(pool, q, locale, page, limit)
      }
      throw err
    }
  }

  async suggest(q: string, locale = 'en'): Promise<SuggestResponse> {
    await this.ensureTable()
    const pool = await this.getPool()

    const result = await pool.query(
      `SELECT title, href, type
       FROM search_documents
       WHERE locale = $1
         AND (title ILIKE $2 OR title ILIKE $3)
       ORDER BY
         CASE WHEN title ILIKE $2 THEN 0 ELSE 1 END,
         boost DESC,
         title
       LIMIT 8`,
      [locale, `${q}%`, `%${q}%`],
    )

    return {
      suggestions: result.rows.map((r: any) => ({
        title: r.title,
        href: r.href,
        type: r.type as DocType,
      })),
    }
  }

  async ping(): Promise<boolean> {
    try {
      const pool = await this.getPool()
      const result = await pool.query('SELECT 1')
      return result.rows.length > 0
    } catch {
      return false
    }
  }

  // ── Private Helpers ──────────────────────────────────────

  private expandSynonyms(q: string, synonyms: Record<string, string[]>): string[] {
    const expanded = [q]
    const words = q.split(/\s+/)
    for (const word of words) {
      const syns = synonyms[word.toUpperCase()] || synonyms[word]
      if (syns) {
        for (const syn of syns) {
          expanded.push(syn)
        }
      }
    }
    return expanded
  }

  private buildFacets(rows: any[]): FacetCounts {
    const facets: FacetCounts = { type: {}, category: {}, industry: {} }
    for (const row of rows) {
      const n = parseInt(row.n)
      facets.type[row.type] = (facets.type[row.type] || 0) + n
      if (row.category) facets.category[row.category] = (facets.category[row.category] || 0) + n
      if (row.industry) facets.industry[row.industry] = (facets.industry[row.industry] || 0) + n
    }
    return facets
  }

  private async didYouMean(pool: Pool, q: string): Promise<string[]> {
    const result = await pool.query(
      `SELECT DISTINCT title
       FROM search_documents
       WHERE similarity(title, $1) > 0.2
       ORDER BY similarity(title, $1) DESC
       LIMIT 3`,
      [q],
    )
    return result.rows.map((r: any) => r.title)
  }

  /** Simple fallback for queries that can't be parsed as tsquery */
  private async fallbackSearch(
    pool: Pool, q: string, locale: string, page: number, limit: number,
  ): Promise<SearchResponse> {
    const start = performance.now()
    const offset = (page - 1) * limit
    const result = await pool.query(
      `SELECT *, similarity(title, $1) AS sim
       FROM search_documents
       WHERE locale = $2
         AND (title ILIKE $3 OR description ILIKE $3 OR keywords ILIKE $3)
       ORDER BY sim DESC
       LIMIT $4 OFFSET $5`,
      [q, locale, `%${q}%`, limit, offset],
    )

    const countRes = await pool.query(
      `SELECT count(*) AS total FROM search_documents
       WHERE locale = $1 AND (title ILIKE $2 OR description ILIKE $2 OR keywords ILIKE $2)`,
      [locale, `%${q}%`],
    )

    const total = parseInt(countRes.rows[0]?.total || '0')

    return {
      results: result.rows.map((row: any) => ({
        id: row.id, type: row.type, slug: row.slug, href: row.href,
        title: row.title, tagline: row.tagline, description: row.description,
        body: row.body, keywords: row.keywords, category: row.category,
        industry: row.industry, locale: row.locale, publishedAt: row.published_at,
        boost: row.boost, meta: row.meta,
        score: parseFloat(row.sim || '0'),
        highlights: { title: row.title, description: row.description },
      })),
      facets: { type: {}, category: {}, industry: {} },
      total,
      page,
      totalPages: Math.ceil(total / limit),
      queryTime: Math.round(performance.now() - start),
    }
  }
}
