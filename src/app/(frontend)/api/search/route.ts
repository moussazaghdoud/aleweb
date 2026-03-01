import { NextRequest, NextResponse } from 'next/server'
import { getSearchProvider } from '@/lib/search/index'
import { logSearchQuery } from '@/lib/search/analytics'
import { reindexAll } from '@/lib/search/indexer'
import type { DocType, SearchQuery } from '@/lib/search/types'
import { ALL_DOC_TYPES } from '@/lib/search/types'

export const dynamic = 'force-dynamic'

/* ------------------------------------------------------------------ */
/*  Rate Limiter (in-process, 30 req / 10s per IP)                     */
/* ------------------------------------------------------------------ */

const rateMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 30
const RATE_WINDOW = 10_000

function checkRate(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// Purge stale entries every 5 min
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, val] of rateMap.entries()) {
      if (now > val.reset) rateMap.delete(key)
    }
  }, 5 * 60_000).unref?.()
}

/* ------------------------------------------------------------------ */
/*  Auto-index on first request if index is empty                      */
/* ------------------------------------------------------------------ */

let autoIndexed = false

async function ensureIndexed(): Promise<void> {
  if (autoIndexed) return
  autoIndexed = true
  try {
    const provider = await getSearchProvider()
    // Quick check: search for something common
    const test = await provider.suggest('a')
    if (test.suggestions.length === 0) {
      console.log('[Search] Index appears empty — running initial reindex...')
      await reindexAll()
    }
  } catch (err) {
    console.warn('[Search] Auto-index check failed:', err)
  }
}

/* ------------------------------------------------------------------ */
/*  GET /api/search                                                    */
/* ------------------------------------------------------------------ */

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: { 'Retry-After': '10' } },
    )
  }

  const url = request.nextUrl
  const q = url.searchParams.get('q')?.trim() || ''
  const typeParam = url.searchParams.get('type')
  const category = url.searchParams.get('category') || undefined
  const industry = url.searchParams.get('industry') || undefined
  const locale = url.searchParams.get('locale') || 'en'
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'))
  const limit = Math.min(Math.max(1, parseInt(url.searchParams.get('limit') || '20')), 50)
  const format = url.searchParams.get('format') || 'grouped'

  if (!q || q.length < 2) {
    return NextResponse.json({ results: {}, query: q, facets: { type: {}, category: {}, industry: {} }, total: 0 })
  }

  // Validate type parameter
  let types: DocType[] | undefined
  if (typeParam) {
    const parsed = typeParam.split(',').filter(t => ALL_DOC_TYPES.includes(t as DocType)) as DocType[]
    if (parsed.length > 0) types = parsed
  }

  await ensureIndexed()
  const startTime = Date.now()

  try {
    const provider = await getSearchProvider()
    const query: SearchQuery = { q, type: types, category, industry, locale, page, limit }
    const response = await provider.search(query)
    const elapsed = Date.now() - startTime

    // Fire-and-forget analytics
    logSearchQuery({
      query: q,
      resultCount: response.total,
      latencyMs: elapsed,
      filters: { type: typeParam, category, industry },
    }).catch(() => {})

    // Grouped format: backward-compatible with existing SearchModal
    if (format === 'grouped') {
      const typeOrder: DocType[] = [
        'Product', 'Solution', 'Platform', 'Industry', 'Service',
        'Blog', 'Company', 'Partner', 'Resource', 'Legal',
      ]
      const grouped: Record<string, any[]> = {}
      let total = 0
      for (const t of typeOrder) {
        const items = response.results.filter(r => r.type === t).slice(0, 5)
        if (items.length > 0 && total < 25) {
          const take = items.slice(0, 25 - total)
          grouped[t] = take
          total += take.length
        }
      }
      return NextResponse.json({
        results: grouped,
        query: q,
        facets: response.facets,
        total: response.total,
        suggestions: response.suggestions,
        queryTime: elapsed,
      })
    }

    // Flat format: for full search results page
    return NextResponse.json({
      results: response.results,
      facets: response.facets,
      total: response.total,
      page: response.page,
      totalPages: response.totalPages,
      query: q,
      suggestions: response.suggestions,
      queryTime: elapsed,
    })
  } catch (err: any) {
    console.error('[Search API] Error:', err?.message || err)
    console.error('[Search API] Stack:', err?.stack)
    return NextResponse.json(
      { error: 'Search unavailable', detail: process.env.NODE_ENV === 'development' ? err?.message : undefined },
      { status: 503 },
    )
  }
}
