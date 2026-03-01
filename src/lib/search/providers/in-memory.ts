/**
 * In-Memory Search Provider
 *
 * Development fallback when running SQLite (no tsvector/pg_trgm).
 * Implements the full SearchProvider interface with word-boundary scoring,
 * basic trigram simulation, and in-memory facet counting.
 */

import type {
  SearchProvider, SearchDocument, SearchQuery, SearchResponse,
  SearchResult, SuggestResponse, FacetCounts, DocType,
} from '../types'
import { getSearchConfig } from '../config'

export class InMemorySearchProvider implements SearchProvider {
  private docs: Map<string, SearchDocument> = new Map()

  async indexByType(type: DocType, docs: SearchDocument[]): Promise<void> {
    // Remove existing docs of this type
    for (const [id, doc] of this.docs) {
      if (doc.type === type) this.docs.delete(id)
    }
    // Insert new docs
    for (const doc of docs) {
      this.docs.set(doc.id, doc)
    }
  }

  async upsert(doc: SearchDocument): Promise<void> {
    this.docs.set(doc.id, doc)
  }

  async delete(id: string): Promise<void> {
    this.docs.delete(id)
  }

  async deleteByType(type: DocType): Promise<void> {
    for (const [id, doc] of this.docs) {
      if (doc.type === type) this.docs.delete(id)
    }
  }

  async search(query: SearchQuery): Promise<SearchResponse> {
    const start = performance.now()
    const config = getSearchConfig()
    const q = query.q.toLowerCase().trim()
    const terms = q.split(/\s+/).filter(Boolean)
    const locale = query.locale || 'en'
    const page = query.page || 1
    const limit = query.limit || 20

    // Expand synonyms
    const expandedTerms = [...terms]
    for (const term of terms) {
      const upper = term.toUpperCase()
      if (config.synonyms[upper]) {
        for (const syn of config.synonyms[upper]) {
          expandedTerms.push(...syn.toLowerCase().split(/\s+/))
        }
      }
    }
    const allTerms = [...new Set(expandedTerms)]

    // Check pinned results
    const pinned = config.pinnedResults.find(p => p.query.toLowerCase() === q)

    // Score all documents
    const scored: SearchResult[] = []
    for (const doc of this.docs.values()) {
      if (doc.locale !== locale) continue
      if (query.type?.length && !query.type.includes(doc.type)) continue
      if (query.category && doc.category !== query.category) continue
      if (query.industry && doc.industry !== query.industry) continue
      if (query.dateFrom && doc.publishedAt && doc.publishedAt < query.dateFrom) continue
      if (query.dateTo && doc.publishedAt && doc.publishedAt > query.dateTo) continue

      const score = this.scoreDoc(doc, allTerms, config.boosts)
      if (score <= 0 && !pinned?.ids.includes(doc.id)) continue

      const isPinned = pinned?.ids.includes(doc.id)
      scored.push({
        ...doc,
        score: isPinned ? score + 1000 : score,
        highlights: {
          title: this.highlight(doc.title, terms),
          description: this.highlight(doc.description, terms),
        },
      })
    }

    scored.sort((a, b) => b.score - a.score)

    // Compute facets from all matching (pre-pagination) results
    const facets = this.computeFacets(scored)
    const total = scored.length
    const totalPages = Math.ceil(total / limit)
    const results = scored.slice((page - 1) * limit, page * limit)

    // "Did you mean" for zero results
    let suggestions: string[] | undefined
    if (total === 0) {
      suggestions = this.didYouMean(q)
    }

    return {
      results,
      facets,
      total,
      page,
      totalPages,
      queryTime: Math.round(performance.now() - start),
      suggestions,
    }
  }

  async suggest(q: string, locale = 'en'): Promise<SuggestResponse> {
    const lower = q.toLowerCase()
    const suggestions: SuggestResponse['suggestions'] = []

    for (const doc of this.docs.values()) {
      if (doc.locale !== locale) continue
      if (doc.title.toLowerCase().startsWith(lower) || doc.title.toLowerCase().includes(lower)) {
        suggestions.push({ title: doc.title, href: doc.href, type: doc.type })
        if (suggestions.length >= 8) break
      }
    }

    // Sort: prefix matches first, then contains
    suggestions.sort((a, b) => {
      const aPrefix = a.title.toLowerCase().startsWith(lower) ? 0 : 1
      const bPrefix = b.title.toLowerCase().startsWith(lower) ? 0 : 1
      return aPrefix - bPrefix
    })

    return { suggestions }
  }

  async ping(): Promise<boolean> {
    return true
  }

  // ── Scoring ──────────────────────────────────────────────

  private scoreDoc(
    doc: SearchDocument,
    terms: string[],
    boosts: Record<string, number>,
  ): number {
    const title = doc.title.toLowerCase()
    const tagline = doc.tagline.toLowerCase()
    const desc = doc.description.toLowerCase()
    const body = doc.body.toLowerCase()
    const kw = doc.keywords.toLowerCase()
    let score = 0
    let allMatch = true

    for (const term of terms) {
      let matched = false
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const wordBoundary = new RegExp(`\\b${escaped}`, 'i')

      // Title: word boundary +10, contains +5
      if (wordBoundary.test(title)) { score += 10; matched = true }
      else if (title.includes(term)) { score += 5; matched = true }

      // Tagline: +4
      if (tagline.includes(term)) { score += 4; matched = true }

      // Description: +2
      if (desc.includes(term)) { score += 2; matched = true }

      // Body: +1
      if (body.includes(term)) { score += 1; matched = true }

      // Keywords: +1
      if (kw.includes(term)) { score += 1; matched = true }

      // Trigram fallback for typo tolerance
      if (!matched && term.length >= 3) {
        const sim = this.trigram(title, term)
        if (sim > 0.3) { score += sim * 5; matched = true }
      }

      if (!matched) allMatch = false
    }

    if (allMatch && terms.length > 1) score += 5

    // Apply boost from config
    const configBoost = boosts[doc.id] ?? 0
    score += configBoost + doc.boost

    return score
  }

  /** Basic trigram similarity (Dice coefficient) */
  private trigram(a: string, b: string): number {
    const trigramsOf = (s: string): Set<string> => {
      const padded = `  ${s.toLowerCase()} `
      const set = new Set<string>()
      for (let i = 0; i < padded.length - 2; i++) {
        set.add(padded.slice(i, i + 3))
      }
      return set
    }
    const ta = trigramsOf(a)
    const tb = trigramsOf(b)
    let intersection = 0
    for (const t of tb) {
      if (ta.has(t)) intersection++
    }
    return (2 * intersection) / (ta.size + tb.size)
  }

  /** Highlight matching terms in text */
  private highlight(text: string, terms: string[]): string {
    if (!terms.length) return text
    const pattern = new RegExp(
      `(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi',
    )
    return text.replace(pattern, '<mark>$1</mark>')
  }

  /** Compute facet counts from scored results */
  private computeFacets(results: SearchResult[]): FacetCounts {
    const facets: FacetCounts = { type: {}, category: {}, industry: {} }
    for (const r of results) {
      facets.type[r.type] = (facets.type[r.type] || 0) + 1
      if (r.category) facets.category[r.category] = (facets.category[r.category] || 0) + 1
      if (r.industry) facets.industry[r.industry] = (facets.industry[r.industry] || 0) + 1
    }
    return facets
  }

  /** Suggest alternatives for zero-result queries */
  private didYouMean(q: string): string[] {
    const suggestions: { title: string; sim: number }[] = []
    for (const doc of this.docs.values()) {
      const sim = this.trigram(doc.title, q)
      if (sim > 0.2) {
        suggestions.push({ title: doc.title, sim })
      }
    }
    return suggestions
      .sort((a, b) => b.sim - a.sim)
      .slice(0, 3)
      .map(s => s.title)
  }
}
