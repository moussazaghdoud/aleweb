import { NextRequest, NextResponse } from 'next/server'
import { logChatEvent } from '@/lib/chat/analytics'

export const dynamic = 'force-dynamic'

function checkSecret(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')
  return secret === process.env.PAYLOAD_SECRET
}

/** POST — Re-index a knowledge source by Payload doc ID */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    const doc = await payload.findByID({
      collection: 'knowledge-sources',
      id,
    }) as any

    if (!doc) {
      return NextResponse.json({ error: 'Source not found' }, { status: 404 })
    }

    if (doc.type === 'file') {
      return NextResponse.json(
        { error: 'File sources cannot be re-indexed. Please delete and re-upload the file.' },
        { status: 400 },
      )
    }

    // Deduplication: reject if already crawling
    if (doc.status === 'crawling') {
      return NextResponse.json(
        { error: 'This source is already being re-indexed' },
        { status: 409 },
      )
    }

    if (doc.type === 'url' && doc.sourceUrl) {
      // Update status to crawling
      await payload.update({
        collection: 'knowledge-sources',
        id,
        data: { status: 'crawling', errorMessage: '' } as any,
      })

      logChatEvent('reindex_started', undefined, { id, url: doc.sourceUrl })

      // Re-crawl in background
      ;(async () => {
        try {
          const { processUrlSource, processUrlSourceWithDepth } = await import('@/lib/chat/crawler')
          const crawlDepth = doc.crawlDepth || 0

          if (crawlDepth > 0) {
            const result = await processUrlSourceWithDepth(doc.sourceUrl, crawlDepth)
            const rootPage = result.pages[0]

            await payload.update({
              collection: 'knowledge-sources',
              id,
              data: {
                status: result.pagesIndexed > 0 ? 'indexed' : 'failed',
                openaiFileId: rootPage?.fileId || doc.openaiFileId || '',
                fileSize: result.totalBytes,
                lastIndexedAt: new Date().toISOString(),
                errorMessage: result.pagesFailed > 0
                  ? `${result.pagesIndexed} indexed, ${result.pagesFailed} failed, ${result.pagesSkipped} skipped`
                  : '',
              } as any,
            })

            console.log(`[Knowledge] Re-indexed URL (depth ${crawlDepth}): ${doc.sourceUrl} — ${result.pagesIndexed} pages`)
            logChatEvent('reindex_completed', undefined, { id, url: doc.sourceUrl, pagesIndexed: result.pagesIndexed })
          } else {
            const result = await processUrlSource(doc.sourceUrl, doc.openaiFileId || undefined)

            await payload.update({
              collection: 'knowledge-sources',
              id,
              data: {
                status: 'indexed',
                openaiFileId: result.fileId,
                vectorStoreId: result.vectorStoreId,
                fileSize: result.byteSize,
                contentChecksum: result.contentHash,
                lastIndexedAt: new Date().toISOString(),
                errorMessage: '',
              } as any,
            })

            console.log(`[Knowledge] Re-indexed URL: ${doc.sourceUrl} → ${result.fileId}`)
            logChatEvent('reindex_completed', undefined, { id, url: doc.sourceUrl, fileId: result.fileId })
          }
        } catch (err: any) {
          console.error(`[Knowledge] Failed to re-index ${doc.sourceUrl}:`, err.message)
          logChatEvent('reindex_failed', undefined, { id, url: doc.sourceUrl, error: err.message })
          try {
            await payload.update({
              collection: 'knowledge-sources',
              id,
              data: {
                status: 'failed',
                errorMessage: err.message?.slice(0, 500),
              } as any,
            })
          } catch {
            // Best effort
          }
        }
      })()

      return NextResponse.json({
        success: true,
        message: 'Re-indexing started in background',
      })
    }

    return NextResponse.json({ error: 'Unknown source type' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
