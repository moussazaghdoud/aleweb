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

  const isPostgres = process.env.DATABASE_URI?.startsWith('postgresql')

  if (isPostgres) {
    const { PostgresSearchProvider } = await import('./providers/postgres')
    _provider = new PostgresSearchProvider()
  } else {
    const { InMemorySearchProvider } = await import('./providers/in-memory')
    _provider = new InMemorySearchProvider()
  }

  return _provider
}
