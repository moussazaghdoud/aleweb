/* ------------------------------------------------------------------ */
/*  Agent authentication helper for API routes                        */
/*  Reads Payload JWT from cookie or Authorization header             */
/* ------------------------------------------------------------------ */

import { NextRequest } from 'next/server'

export type AgentUser = {
  id: string
  email: string
  role: string
}

const ADMIN_ROLES = ['admin', 'editor', 'product-manager']

/**
 * Authenticate an agent from a NextRequest.
 * Checks both the payload-token cookie and the Authorization header.
 */
export async function authenticateAgent(
  request: NextRequest,
): Promise<{ user: AgentUser | null; error?: string }> {
  try {
    // Try cookie first (browser-based agent console)
    let token = request.cookies.get('payload-token')?.value

    // Fall back to Bearer token
    if (!token) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice(7)
      }
    }

    if (!token) {
      return { user: null, error: 'No authentication token' }
    }

    // Decode JWT payload
    const parts = token.split('.')
    if (parts.length !== 3) {
      return { user: null, error: 'Invalid token format' }
    }

    const claims = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8'),
    )

    if (!claims?.id) {
      return { user: null, error: 'Invalid token claims' }
    }

    // Get role from JWT or look up from Payload
    let role: string | null = claims.role || null

    if (!role) {
      const { getPayload } = await import('@/lib/payload')
      const payload = await getPayload()
      const user = await payload.findByID({
        collection: 'users',
        id: claims.id,
        depth: 0,
      })
      if (!user) return { user: null, error: 'User not found' }
      role = (user as any).role as string
    }

    if (!role || !ADMIN_ROLES.includes(role)) {
      return { user: null, error: 'Insufficient permissions' }
    }

    return {
      user: {
        id: String(claims.id),
        email: claims.email || '',
        role,
      },
    }
  } catch {
    return { user: null, error: 'Authentication failed' }
  }
}
