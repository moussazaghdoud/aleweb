/**
 * Search Provider Factory
 *
 * Picks the right provider based on DATABASE_URI:
 * - PostgreSQL → PostgresSearchProvider (tsvector + pg_trgm)
 * - Otherwise  → InMemorySearchProvider (dev fallback for SQLite)
 *
 * Singleton: initialized once per process.
 */

import type { SearchProvider } from './types'

let _provider: SearchProvider | null = null

export async function getSearchProvider(): Promise<SearchProvider> {
  if (_provider) return _provider

  const dbUri = process.env.DATABASE_URI || ''
  const isPostgres = dbUri.startsWith('postgresql') || dbUri.startsWith('postgres://')

  if (isPostgres) {
    try {
      const { PostgresSearchProvider } = await import('./providers/postgres')
      _provider = new PostgresSearchProvider()
      console.log('[Search] Using PostgreSQL search provider')
    } catch (err: any) {
      console.error('[Search] Failed to load PostgreSQL provider, falling back to in-memory:', err.message)
      const { InMemorySearchProvider } = await import('./providers/in-memory')
      _provider = new InMemorySearchProvider()
    }
  } else {
    const { InMemorySearchProvider } = await import('./providers/in-memory')
    _provider = new InMemorySearchProvider()
    console.log('[Search] Using in-memory search provider (SQLite/dev)')
  }

  return _provider
}
