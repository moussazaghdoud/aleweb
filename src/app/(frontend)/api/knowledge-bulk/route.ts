import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/knowledge-bulk
 * Accepts multipart form with multiple files.
 * For each file: creates knowledge-uploads + knowledge-sources docs via Payload local API.
 * Returns JSON array of results per file.
 */
export async function POST(request: NextRequest) {
  try {
    // Auth: check Payload JWT from cookie or Authorization header
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    // Extract JWT token
    const authHeader = request.headers.get('Authorization')
    const cookieToken = request.cookies.get('payload-token')?.value
    const token = authHeader?.replace(/^(JWT|Bearer)\s+/i, '') || cookieToken

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify the token by finding the user
    let user: any
    try {
      const headers = new Headers()
      headers.set('Authorization', `JWT ${token}`)
      const result = await payload.auth({ headers })
      user = result.user
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const results: Array<{ name: string; status: 'ok' | 'error'; error?: string; id?: string }> = []

    for (const file of files) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer())

        // Create upload doc via local API (bypasses HTTP layer)
        const uploadDoc = await payload.create({
          collection: 'knowledge-uploads',
          data: {},
          file: {
            data: buffer,
            name: file.name,
            mimetype: file.type || 'text/html',
            size: file.size,
          },
          user,
        })

        // Create knowledge-sources doc
        const sourceDoc = await payload.create({
          collection: 'knowledge-sources',
          data: {
            name: file.name,
            type: 'file',
            file: uploadDoc.id,
          } as any,
          user,
        })

        results.push({ name: file.name, status: 'ok', id: String(sourceDoc.id) })
        console.log(`[BulkUpload] Created source for ${file.name} → ${sourceDoc.id}`)
      } catch (err: any) {
        console.error(`[BulkUpload] Failed for ${file.name}:`, err.message)
        results.push({ name: file.name, status: 'error', error: err.message })
      }
    }

    return NextResponse.json({ results })
  } catch (err: any) {
    console.error('[BulkUpload] Fatal error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
