/**
 * PostgreSQL Search Provider
 *
 * Production search engine using tsvector (weighted full-text) + pg_trgm (typo tolerance).
 * Accesses the existing PG pool from Payload's postgres adapter — no extra connections.
 *
 * Resilient design:
 * - pg_trgm is optional (graceful degradation if extension can't be created)
 * - ensureTable() errors are caught and logged, never crash the process
 * - All queries handle missing trgm gracefully
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
  private hasTrgm = false // Track whether pg_trgm is available

  private async getPool(): Promise<Pool> {
    if (this.pool) return this.pool

    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    // Payload CMS v3.77 @payloadcms/db-postgres exposes pool directly on payload.db
    const pool = (payload.db as any).pool

    if (!pool || typeof pool.query !== 'function') {
      throw new Error('[Search] Could not access PostgreSQL pool from Payload adapter. payload.db.pool is ' + typeof pool)
    }

    this.pool = pool as Pool
    return this.pool
  }

  private async ensureTable(): Promise<void> {
    if (this.initialized) return
    const pool = await this.getPool()

    // Try to enable pg_trgm — may fail on managed Postgres without superuser
    try {
      await pool.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`)
      this.hasTrgm = true
    } catch (err: any) {
      console.warn('[Search] pg_trgm extension not available (typo tolerance disabled):', err.message)
      this.hasTrgm = false
    }

    // Drop old table if it has GENERATED columns (migration from previous schema)
    // Check if search_vector is a generated column — if so, drop and recreate
    try {
      const genCheck = await pool.query(`
        SELECT attgenerated FROM pg_attribute
        WHERE attrelid = 'search_documents'::regclass
          AND attname = 'search_vector'
      `)
      if (genCheck.rows.length > 0 && genCheck.rows[0].attgenerated !== '') {
        console.log('[Search] Migrating: dropping old table with GENERATED columns...')
        await pool.query('DROP TABLE IF EXISTS search_documents CASCADE')
        await pool.query('DROP TABLE IF EXISTS search_analytics CASCADE')
      }
    } catch {
      // Table doesn't exist yet — that's fine
    }

    // Create the main search_documents table (no GENERATED columns)
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
        search_vector TSVECTOR,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `)

    // Indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_vector ON search_documents USING GIN (search_vector)
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_type_locale ON search_documents (type, locale)
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_search_category ON search_documents (category) WHERE category IS NOT NULL
    `)

    // Trigram indexes only if extension is available
    if (this.hasTrgm) {
      try {
        await pool.query(`
          CREATE INDEX IF NOT EXISTS idx_search_title_trgm ON search_documents USING GIN (title gin_trgm_ops)
        `)
      } catch (err: any) {
        console.warn('[Search] Could not create trigram index:', err.message)
        this.hasTrgm = false
      }
    }

    // Analytics table — simpler schema without GENERATED column
    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_analytics (
        id SERIAL PRIMARY KEY,
        query TEXT NOT NULL,
        result_count INT NOT NULL,
        latency_ms INT NOT NULL,
        filters JSONB,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_analytics_created ON search_analytics (created_at DESC)
    `)

    this.initialized = true
    console.log(`[Search] PostgreSQL provider initialized (pg_trgm: ${this.hasTrgm ? 'enabled' : 'disabled'})`)
  }

  // ── Helper: compute tsvector for a document ────────────────
  private buildTsVector(doc: SearchDocument): string {
    return `
      setweight(to_tsvector('english', coalesce($5, '')), 'A') ||
      setweight(to_tsvector('english', coalesce($6, '')), 'B') ||
      setweight(to_tsvector('english', coalesce($7, '')), 'C') ||
      setweight(to_tsvector('english', coalesce($8, '') || ' ' || coalesce($9, '')), 'D')
    `
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
    // Compute tsvector on insert/update instead of GENERATED ALWAYS
    await pool.query(
      `INSERT INTO search_documents
        (id, type, slug, href, title, tagline, description, body, keywords,
         category, industry, locale, published_at, boost, meta, search_vector, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
         setweight(to_tsvector('english', coalesce($5, '')), 'A') ||
         setweight(to_tsvector('english', coalesce($6, '')), 'B') ||
         setweight(to_tsvector('english', coalesce($7, '')), 'C') ||
         setweight(to_tsvector('english', coalesce($8, '') || ' ' || coalesce($9, '')), 'D'),
         now())
       ON CONFLICT (id) DO UPDATE SET
        type=$2, slug=$3, href=$4, title=$5, tagline=$6, description=$7,
        body=$8, keywords=$9, category=$10, industry=$11, locale=$12,
        published_at=$13, boost=$14, meta=$15,
        search_vector = setweight(to_tsvector('english', coalesce($5, '')), 'A') ||
                        setweight(to_tsvector('english', coalesce($6, '')), 'B') ||
                        setweight(to_tsvector('english', coalesce($7, '')), 'C') ||
                        setweight(to_tsvector('english', coalesce($8, '') || ' ' || coalesce($9, '')), 'D'),
        updated_at=now()`,
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

    // Expand synonyms
    const synonymTerms = this.getSynonymTerms(q, config.synonyms)

    // Build filter clauses — $1 = raw query, $2 = locale
    const conditions: string[] = ['d.locale = $2']
    const params: any[] = [q, locale]
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

    // Build synonym join for tsquery: use plainto_tsquery for each synonym term
    // This is safe — plainto_tsquery handles any user input without syntax errors
    const synonymTsqParts: string[] = ['plainto_tsquery(\'english\', $1)']
    for (const synTerm of synonymTerms) {
      const idx = paramIdx
      synonymTsqParts.push(`plainto_tsquery('english', $${idx})`)
      params.push(synTerm)
      paramIdx++
    }
    const combinedTsq = synonymTsqParts.join(' || ')

    // Trigram parts (conditional on pg_trgm availability)
    const trgmSelect = this.hasTrgm
      ? `GREATEST(similarity(d.title, $1), similarity(d.tagline, $1)) AS trgm_sim,`
      : `0::float AS trgm_sim,`

    const trgmWhere = this.hasTrgm
      ? `OR (length($1) >= 3 AND similarity(d.title, $1) > 0.25)`
      : `OR (d.title ILIKE '%' || $1 || '%')`

    const trgmOrder = this.hasTrgm
      ? `+ GREATEST(similarity(d.title, $1), 0) * 0.3`
      : ''

    const limitIdx = paramIdx
    const offsetIdx = paramIdx + 1
    params.push(limit, offset)

    // Main search query — uses plainto_tsquery (safe, no syntax errors possible)
    const searchSql = `
      WITH query AS (
        SELECT (${combinedTsq}) AS tsq
      )
      SELECT
        d.*,
        ts_rank_cd(d.search_vector, q.tsq, 4) AS text_rank,
        ${trgmSelect}
        ts_headline('english', d.description, q.tsq,
          'StartSel=<mark>, StopSel=</mark>, MaxWords=30, MinWords=10') AS hl_desc,
        ts_headline('english', d.title, q.tsq,
          'StartSel=<mark>, StopSel=</mark>') AS hl_title
      FROM search_documents d, query q
      WHERE ${whereClause}
        AND (
          d.search_vector @@ q.tsq
          ${trgmWhere}
        )
      ORDER BY
        (ts_rank_cd(d.search_vector, q.tsq, 4)
         ${trgmOrder}
         + d.boost::float / 10.0) DESC
      LIMIT $${limitIdx} OFFSET $${offsetIdx}
    `

    // Params for count/facet (exclude limit/offset)
    const countParams = params.slice(0, -2)

    // Count query
    const countSql = `
      WITH query AS (
        SELECT (${combinedTsq}) AS tsq
      )
      SELECT count(*) AS total
      FROM search_documents d, query q
      WHERE ${whereClause}
        AND (
          d.search_vector @@ q.tsq
          ${trgmWhere}
        )
    `

    // Facet query
    const facetSql = `
      WITH query AS (
        SELECT (${combinedTsq}) AS tsq
      )
      SELECT d.type, d.category, d.industry, count(*) AS n
      FROM search_documents d, query q
      WHERE ${whereClause}
        AND (
          d.search_vector @@ q.tsq
          ${trgmWhere}
        )
      GROUP BY d.type, d.category, d.industry
    `

    try {
      const [searchRes, countRes, facetRes] = await Promise.all([
        pool.query(searchSql, params),
        pool.query(countSql, countParams),
        pool.query(facetSql, countParams),
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
      // Fall back to simple ILIKE search if anything goes wrong with tsquery
      console.error('[Search] tsquery search failed, using fallback:', err.message)
      return this.fallbackSearch(pool, q, locale, page, limit)
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

  /** Returns additional synonym terms (not including the original query) */
  private getSynonymTerms(q: string, synonyms: Record<string, string[]>): string[] {
    const extra: string[] = []
    const words = q.split(/\s+/)
    for (const word of words) {
      const syns = synonyms[word.toUpperCase()] || synonyms[word]
      if (syns) {
        for (const syn of syns) {
          extra.push(syn)
        }
      }
    }
    return extra
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
    if (this.hasTrgm) {
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

    // Fallback without pg_trgm: ILIKE partial match
    const result = await pool.query(
      `SELECT DISTINCT title
       FROM search_documents
       WHERE title ILIKE $1
       ORDER BY title
       LIMIT 3`,
      [`%${q}%`],
    )
    return result.rows.map((r: any) => r.title)
  }

  /** Simple fallback for queries that can't be parsed as tsquery */
  private async fallbackSearch(
    pool: Pool, q: string, locale: string, page: number, limit: number,
  ): Promise<SearchResponse> {
    const start = performance.now()
    const offset = (page - 1) * limit

    const simSelect = this.hasTrgm
      ? `similarity(title, $1) AS sim`
      : `0::float AS sim`

    const result = await pool.query(
      `SELECT *, ${simSelect}
       FROM search_documents
       WHERE locale = $2
         AND (title ILIKE $3 OR description ILIKE $3 OR keywords ILIKE $3)
       ORDER BY boost DESC, title
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
