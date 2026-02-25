/**
 * Server-side admin authentication check.
 *
 * Reads the Payload CMS `payload-token` cookie and verifies it
 * against the Payload Local API to determine if the current
 * request is from an authenticated admin/editor.
 *
 * Returns null for anonymous users — no user data is leaked.
 */

import { cookies } from 'next/headers'
import { getPayload } from './payload'

export type AdminUser = {
  id: string
  email: string
  role: string
}

/**
 * Check if current request is from an authenticated CMS admin.
 * Returns the user object if authenticated, null otherwise.
 *
 * This runs server-side only — never exposes auth state to the client.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  // Feature flag check
  if (process.env.ADMIN_EDIT_BUTTON_ENABLED !== 'true') return null

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value
    if (!token) return null

    const payload = await getPayload()

    // Verify the JWT token against Payload's auth
    const { user } = await payload.auth({ headers: new Headers({ Authorization: `JWT ${token}` }) })

    if (!user) return null

    const role = (user as any).role as string
    // Only allow admin and editor roles to see the edit button
    if (!['admin', 'editor', 'product-manager', 'legal-approver'].includes(role)) {
      return null
    }

    return {
      id: String(user.id),
      email: (user as any).email || '',
      role,
    }
  } catch {
    // Any failure (CMS down, invalid token, etc.) — treat as anonymous
    return null
  }
}
