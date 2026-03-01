/**
 * Payload CMS Hooks for Search Index Sync
 *
 * afterChange: upserts the document into the search index (skip drafts)
 * afterDelete: removes the document from the search index
 *
 * Usage in collection config:
 *   import { afterChangeSyncHook, afterDeleteSyncHook } from '@/lib/search/hooks'
 *   import { normalizeProduct } from '@/lib/search/normalizers'
 *
 *   hooks: {
 *     afterChange: [afterChangeSyncHook('Product', normalizeProduct)],
 *     afterDelete: [afterDeleteSyncHook('Product')],
 *   }
 */

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { DocType, SearchDocument } from './types'

type NormalizerFn = (doc: any) => SearchDocument

export function afterChangeSyncHook(
  type: DocType,
  normalize: NormalizerFn,
): CollectionAfterChangeHook {
  return async ({ doc }) => {
    // Skip draft/unpublished documents
    if (doc._status && doc._status !== 'published') return doc

    try {
      const { getSearchProvider } = await import('./index')
      const provider = await getSearchProvider()
      const searchDoc = normalize(doc)
      await provider.upsert(searchDoc)
    } catch (err) {
      // Never crash Payload saves due to search sync failure
      console.error(`[Search] afterChange sync failed for ${type}:${doc.slug}:`, err)
    }
    return doc
  }
}

export function afterDeleteSyncHook(type: DocType): CollectionAfterDeleteHook {
  return async ({ doc }) => {
    try {
      const { getSearchProvider } = await import('./index')
      const provider = await getSearchProvider()
      const slug = doc?.slug || doc?.id
      if (slug) {
        await provider.delete(`${type}:${slug}`)
      }
    } catch (err) {
      console.error(`[Search] afterDelete sync failed for ${type}:`, err)
    }
  }
}
