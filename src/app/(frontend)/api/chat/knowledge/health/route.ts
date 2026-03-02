import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function checkSecret(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')
  return secret === process.env.PAYLOAD_SECRET
}

/** GET — Health check for the knowledge base system */
export async function GET(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const health: {
    status: 'ok' | 'degraded' | 'error'
    vectorStore: { id?: string; fileCount?: number; error?: string }
    knowledgeSources: {
      total: number
      indexed: number
      failed: number
      pending: number
      crawling: number
    }
  } = {
    status: 'ok',
    vectorStore: {},
    knowledgeSources: { total: 0, indexed: 0, failed: 0, pending: 0, crawling: 0 },
  }

  // Check OpenAI vector store connectivity
  try {
    const { getOpenAIClient, ensureVectorStore } = await import('@/lib/chat/openai')
    const vectorStoreId = await ensureVectorStore()
    const client = getOpenAIClient()
    const store = await client.vectorStores.retrieve(vectorStoreId)
    const files = await client.vectorStores.files.list(vectorStoreId, { limit: 1 })

    health.vectorStore = {
      id: store.id,
      fileCount: store.file_counts?.completed ?? files.data.length,
    }
  } catch (err: any) {
    health.status = 'degraded'
    health.vectorStore = { error: err.message }
  }

  // Count knowledge sources by status
  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    const [total, indexed, failed, pending, crawling] = await Promise.all([
      payload.count({ collection: 'knowledge-sources' }),
      payload.count({ collection: 'knowledge-sources', where: { status: { equals: 'indexed' } } }),
      payload.count({ collection: 'knowledge-sources', where: { status: { equals: 'failed' } } }),
      payload.count({ collection: 'knowledge-sources', where: { status: { equals: 'pending' } } }),
      payload.count({ collection: 'knowledge-sources', where: { status: { equals: 'crawling' } } }),
    ])

    health.knowledgeSources = {
      total: total.totalDocs,
      indexed: indexed.totalDocs,
      failed: failed.totalDocs,
      pending: pending.totalDocs,
      crawling: crawling.totalDocs,
    }

    if (failed.totalDocs > 0) {
      health.status = health.status === 'ok' ? 'degraded' : health.status
    }
  } catch (err: any) {
    health.status = 'error'
  }

  return NextResponse.json(health)
}
