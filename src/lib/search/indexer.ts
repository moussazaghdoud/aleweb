/**
 * Indexing Pipeline
 *
 * Reads all collections via existing cms.ts fetchers, normalizes to
 * SearchDocument, and sends to the active SearchProvider.
 */

import { getSearchProvider } from './index'
import type { DocType, SearchDocument } from './types'
import {
  normalizeProduct, normalizeSolution, normalizeIndustry,
  normalizePlatform, normalizeService, normalizeBlog,
  normalizePartner, normalizeCompany, normalizeResource, normalizeLegal,
} from './normalizers'
import {
  getCatalogProducts, getSolutionsData, getIndustriesData,
  getPlatformData, getServicesData, getBlogData, getPartnersData,
  getCompanyData, getResourcesData, getLegalData,
} from '@/lib/cms'

type IndexJob = {
  type: DocType
  fetcher: () => Promise<any[]>
  normalizer: (doc: any) => SearchDocument
}

const jobs: IndexJob[] = [
  { type: 'Product',  fetcher: getCatalogProducts, normalizer: normalizeProduct },
  { type: 'Solution', fetcher: getSolutionsData,   normalizer: normalizeSolution },
  { type: 'Industry', fetcher: getIndustriesData,  normalizer: normalizeIndustry },
  { type: 'Platform', fetcher: getPlatformData,     normalizer: normalizePlatform },
  { type: 'Service',  fetcher: getServicesData,     normalizer: normalizeService },
  { type: 'Blog',     fetcher: getBlogData,          normalizer: normalizeBlog },
  { type: 'Partner',  fetcher: getPartnersData,     normalizer: normalizePartner },
  { type: 'Company',  fetcher: getCompanyData,      normalizer: normalizeCompany },
  { type: 'Resource', fetcher: getResourcesData,    normalizer: normalizeResource },
  { type: 'Legal',    fetcher: getLegalData,         normalizer: normalizeLegal },
]

export type IndexResult = { count: number; durationMs: number; error?: string }

/** Reindex a specific collection type */
export async function reindexType(type: DocType): Promise<IndexResult> {
  const provider = await getSearchProvider()
  const job = jobs.find(j => j.type === type)
  if (!job) throw new Error(`Unknown DocType: ${type}`)

  const start = Date.now()
  try {
    const raw = await job.fetcher()
    const docs = raw.map(job.normalizer)
    await provider.indexByType(type, docs)
    const result = { count: docs.length, durationMs: Date.now() - start }
    console.log(`[Search] Indexed ${result.count} ${type} docs in ${result.durationMs}ms`)
    return result
  } catch (err: any) {
    console.error(`[Search] Failed to index ${type}:`, err.message)
    return { count: 0, durationMs: Date.now() - start, error: err.message }
  }
}

/** Reindex all collections in parallel */
export async function reindexAll(): Promise<Record<string, IndexResult>> {
  const start = Date.now()
  console.log('[Search] Starting full reindex...')

  const results = await Promise.allSettled(
    jobs.map(job => reindexType(job.type)),
  )

  const out: Record<string, IndexResult> = {}
  let totalDocs = 0

  jobs.forEach((job, i) => {
    const r = results[i]
    if (r.status === 'fulfilled') {
      out[job.type] = r.value
      totalDocs += r.value.count
    } else {
      out[job.type] = { count: 0, durationMs: 0, error: (r.reason as Error).message }
    }
  })

  console.log(`[Search] Full reindex complete: ${totalDocs} docs in ${Date.now() - start}ms`)
  return out
}

/** Check if the search index has been populated */
export async function isIndexEmpty(): Promise<boolean> {
  try {
    const provider = await getSearchProvider()
    const result = await provider.search({ q: '*', limit: 1 })
    return result.total === 0
  } catch {
    return true
  }
}
