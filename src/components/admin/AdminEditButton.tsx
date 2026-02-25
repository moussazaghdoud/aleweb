import { getAdminUser } from '@/lib/admin-auth'

type Props = {
  /** Payload collection slug (e.g. 'products', 'solutions', 'industries') */
  collection: string
  /** Document slug — used to look up the CMS document ID */
  documentSlug: string
}

/**
 * Server component: "Edit this page" button for authenticated CMS admins.
 *
 * Security:
 * - Performs server-side auth check via Payload JWT cookie
 * - Renders NOTHING for anonymous users (no HTML, no URLs, no IDs leaked)
 * - Gated behind ADMIN_EDIT_BUTTON_ENABLED env flag
 *
 * Rendering:
 * - Fixed overlay in top-right corner, high z-index
 * - pointer-events only on the button itself
 * - No layout shift, no CLS impact for public users
 */
export async function AdminEditButton({ collection, documentSlug }: Props) {
  const user = await getAdminUser()
  if (!user) return null

  // Look up the actual CMS document ID by slug
  let docId: string | null = null
  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: collection as any,
      where: { slug: { equals: documentSlug } },
      limit: 1,
      depth: 0,
    })
    docId = docs[0]?.id ? String(docs[0].id) : null
  } catch {
    // CMS unavailable — skip the button
    return null
  }

  if (!docId) return null

  const adminBase = process.env.NEXT_PUBLIC_URL || ''
  const editUrl = `${adminBase}/admin/collections/${collection}/${docId}`

  return (
    <div
      className="fixed top-4 right-4 z-[9999] pointer-events-none"
      style={{ isolation: 'isolate' }}
    >
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 bg-gray-900/90 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm hover:bg-gray-900 transition-colors"
        title={`Edit in CMS (${collection}/${documentSlug})`}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit this page
      </a>
    </div>
  )
}
