import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ROLES = ['admin', 'editor', 'product-manager', 'legal-approver']

/**
 * POST /api/admin-check
 *
 * Server-side admin verification endpoint.
 * Reads the payload-token cookie, decodes the JWT, verifies the user,
 * and returns the edit URL if authorized.
 *
 * Body: { collection, slug } or { global }
 * Returns: { editUrl } or 401/403
 */
export async function POST(request: NextRequest) {
  // Feature flag
  if (process.env.ADMIN_EDIT_BUTTON_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Disabled' }, { status: 404 })
  }

  try {
    // Read auth cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Decode JWT claims
    const parts = token.split('.')
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const claims = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8'),
    )
    if (!claims?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get the user's role — try JWT claims first, then query Payload
    let role: string | null = claims.role || null

    if (!role) {
      const { getPayload } = await import('@/lib/payload')
      const payload = await getPayload()
      const user = await payload.findByID({
        collection: 'users',
        id: claims.id,
        depth: 0,
      })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 })
      }
      role = (user as any).role as string
    }

    if (!role || !ALLOWED_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request body
    const body = await request.json().catch(() => ({}))
    const { collection, slug, global: globalSlug } = body as {
      collection?: string
      slug?: string
      global?: string
    }

    const adminBase = process.env.NEXT_PUBLIC_URL || ''

    // Global edit URL
    if (globalSlug) {
      return NextResponse.json({
        editUrl: `${adminBase}/admin/globals/${globalSlug}`,
      })
    }

    // Collection edit URL — look up document ID by slug
    if (collection && slug) {
      const { getPayload } = await import('@/lib/payload')
      const payload = await getPayload()
      const { docs } = await payload.find({
        collection: collection as any,
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      })
      const docId = docs[0]?.id
      if (!docId) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 })
      }

      return NextResponse.json({
        editUrl: `${adminBase}/admin/collections/${collection}/${docId}`,
      })
    }

    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
