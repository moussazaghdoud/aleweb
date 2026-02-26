/**
 * Server-side admin authentication check.
 *
 * Reads the Payload CMS `payload-token` cookie and decodes the JWT
 * to determine if the current request is from an authenticated admin.
 * Falls back to querying Payload if the role isn't in the JWT claims.
 *
 * Returns null for anonymous users — no user data is leaked.
 * Returns null during SSG build (no request context) — safe for static pages.
 */

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
    // Dynamic import — cookies() throws during SSG build, caught below
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value
    if (!token) return null

    // Decode the JWT payload (base64url-encoded middle segment)
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const claims = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8'),
    )
    if (!claims?.id) return null

    // Try to get role from JWT claims first
    let role: string | null = claims.role || null

    if (!role) {
      // Role not embedded in JWT — look it up from Payload
      const { getPayload } = await import('./payload')
      const payload = await getPayload()
      const user = await payload.findByID({
        collection: 'users',
        id: claims.id,
        depth: 0,
      })
      if (!user) return null
      role = (user as any).role as string
    }

    // Only these roles can see the edit button
    if (!role || !['admin', 'editor', 'product-manager', 'legal-approver'].includes(role)) {
      return null
    }

    return {
      id: String(claims.id),
      email: claims.email || '',
      role,
    }
  } catch {
    // SSG build (no request context), CMS down, invalid token, etc.
    return null
  }
}
