import type { CollectionBeforeDeleteHook } from 'payload'

/**
 * Factory: returns a beforeDelete hook that prevents deletion of documents
 * whose slug matches any of the given protected slugs.
 *
 * Usage: protectDeletion('products', ['omniswitch', 'rainbow'])
 */
export function protectDeletion(
  collectionSlug: string,
  protectedSlugs: string[],
): CollectionBeforeDeleteHook {
  return async ({ req, id }) => {
    const doc = await req.payload.findByID({
      collection: collectionSlug as any,
      id,
    })
    if (doc?.slug && protectedSlugs.includes(doc.slug as string)) {
      throw new Error(
        `Cannot delete "${doc.slug}" — it is a protected structural page. Remove it from the protectedSlugs list first if you really need to delete it.`,
      )
    }
  }
}
