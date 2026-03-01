/**
 * Enterprise Search Engine — Core Types
 *
 * Every file in the search system imports from here.
 * This is the single source of truth for all search-related types.
 */

/* ------------------------------------------------------------------ */
/*  Document Types                                                     */
/* ------------------------------------------------------------------ */

export type DocType =
  | 'Product'
  | 'Solution'
  | 'Platform'
  | 'Industry'
  | 'Service'
  | 'Blog'
  | 'Company'
  | 'Partner'
  | 'Resource'
  | 'Legal'

export const ALL_DOC_TYPES: DocType[] = [
  'Product', 'Solution', 'Platform', 'Industry', 'Service',
  'Blog', 'Company', 'Partner', 'Resource', 'Legal',
]

/* ------------------------------------------------------------------ */
/*  Search Document (canonical indexed shape)                          */
/* ------------------------------------------------------------------ */

export interface SearchDocument {
  /** Globally unique: "{Type}:{slug}" e.g. "Product:omniswitch-6860" */
  id: string
  type: DocType
  slug: string
  /** Canonical URL for navigation */
  href: string

  // Primary search fields (weighted differently in ranking)
  title: string
  tagline: string
  description: string
  /** Concatenated features, capabilities, offerings — deep search content */
  body: string
  /** Slug fragments, acronyms, model numbers — extra searchable terms */
  keywords: string

  // Facet fields
  category?: string
  industry?: string
  locale: string
  publishedAt?: string

  /** Ranking boost (-10 to 10). Higher = ranked higher. Default 0. */
  boost: number

  /** Extra metadata shown on result cards */
  meta?: {
    author?: string
    resourceType?: string
    date?: string
  }
}

/* ------------------------------------------------------------------ */
/*  Search Result                                                      */
/* ------------------------------------------------------------------ */

export interface SearchResult extends SearchDocument {
  score: number
  highlights: {
    title?: string
    description?: string
    body?: string
  }
}

/* ------------------------------------------------------------------ */
/*  Facets                                                             */
/* ------------------------------------------------------------------ */

export interface FacetCounts {
  type: Record<string, number>
  category: Record<string, number>
  industry: Record<string, number>
}

/* ------------------------------------------------------------------ */
/*  Query / Response                                                   */
/* ------------------------------------------------------------------ */

export interface SearchQuery {
  q: string
  type?: DocType[]
  category?: string
  industry?: string
  locale?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}

export interface SearchResponse {
  results: SearchResult[]
  facets: FacetCounts
  total: number
  page: number
  totalPages: number
  /** Query execution time in ms */
  queryTime: number
  /** "Did you mean" alternatives (populated on zero-result queries) */
  suggestions?: string[]
}

/* ------------------------------------------------------------------ */
/*  Suggest (autocomplete)                                             */
/* ------------------------------------------------------------------ */

export interface SuggestItem {
  title: string
  href: string
  type: DocType
}

export interface SuggestResponse {
  suggestions: SuggestItem[]
}

/* ------------------------------------------------------------------ */
/*  Search Provider Interface                                          */
/* ------------------------------------------------------------------ */

export interface SearchProvider {
  /** Replace all documents of a given type (used during full reindex) */
  indexByType(type: DocType, docs: SearchDocument[]): Promise<void>

  /** Update or insert a single document */
  upsert(doc: SearchDocument): Promise<void>

  /** Remove a single document by id */
  delete(id: string): Promise<void>

  /** Remove all documents of a given type */
  deleteByType(type: DocType): Promise<void>

  /** Full-text search with faceting */
  search(query: SearchQuery): Promise<SearchResponse>

  /** Fast prefix-based autocomplete (max 8 results) */
  suggest(q: string, locale?: string): Promise<SuggestResponse>

  /** Health check — returns true if backend is reachable */
  ping(): Promise<boolean>
}
