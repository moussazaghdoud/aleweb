import { getAdminUser } from '@/lib/admin-auth'

type Props = {
  /** Payload global slug (e.g. 'homepage', 'navigation', 'footer') */
  globalSlug: string
  /** Display label */
  label?: string
}

/**
 * Server component: "Edit this page" button for CMS global documents.
 * Same security model as AdminEditButton but links to /admin/globals/{slug}.
 */
export async function AdminEditGlobal({ globalSlug, label = 'Edit this page' }: Props) {
  const user = await getAdminUser()
  if (!user) return null

  const adminBase = process.env.NEXT_PUBLIC_URL || ''
  const editUrl = `${adminBase}/admin/globals/${globalSlug}`

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
        title={`Edit ${globalSlug} in CMS`}
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
        {label}
      </a>
    </div>
  )
}
