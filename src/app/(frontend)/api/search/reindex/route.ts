import { NextRequest, NextResponse } from 'next/server'
import { reindexAll, reindexType } from '@/lib/search/indexer'
import type { DocType } from '@/lib/search/types'
import { ALL_DOC_TYPES } from '@/lib/search/types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // Authenticate with PAYLOAD_SECRET
  const authHeader = request.headers.get('Authorization')
  const secret = authHeader?.replace('Bearer ', '')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const { type } = body as { type?: DocType }

  try {
    if (type) {
      if (!ALL_DOC_TYPES.includes(type)) {
        return NextResponse.json({ error: `Invalid type: ${type}` }, { status: 400 })
      }
      const result = await reindexType(type)
      return NextResponse.json({ success: true, [type]: result })
    }

    const results = await reindexAll()
    return NextResponse.json({ success: true, results })
  } catch (err: any) {
    console.error('[Reindex API] Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
