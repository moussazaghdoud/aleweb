/**
 * Search Configuration
 *
 * Loads tuning parameters from search.config.json at the project root.
 * Edit that file to add synonyms, boost rules, or pinned results
 * without changing any code.
 */

import configJson from '../../../search.config.json'

export interface SearchConfig {
  /** Acronym/term → alternative phrases for query expansion */
  synonyms: Record<string, string[]>
  /** SearchDocument.id → boost value override */
  boosts: Record<string, number>
  /** Words stripped from queries before searching */
  stopwords: string[]
  /** Hard-pinned results for specific queries */
  pinnedResults: Array<{
    query: string
    ids: string[]
  }>
}

const config: SearchConfig = configJson as SearchConfig

export function getSearchConfig(): SearchConfig {
  return config
}
