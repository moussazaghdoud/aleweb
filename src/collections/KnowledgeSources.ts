import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/roles'

export const KnowledgeSources: CollectionConfig = {
  slug: 'knowledge-sources',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'lastIndexedAt', 'updatedAt'],
    description: 'Manage knowledge base sources for the AI chatbot. Supports file uploads and URL crawling.',
    group: 'Chat',
  },
  access: adminOnly,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Human-readable label for this knowledge source' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'File Upload', value: 'file' },
        { label: 'URL', value: 'url' },
      ],
      admin: { description: 'Source type' },
    },

    // --- URL fields ---
    {
      name: 'sourceUrl',
      type: 'text',
      admin: {
        description: 'URL to crawl and index',
        condition: (data) => data?.type === 'url',
      },
      validate: (value: unknown, { siblingData }: any) => {
        if (siblingData?.type !== 'url') return true
        if (!value) return 'URL is required for URL sources'
        try {
          new URL(value as string)
          return true
        } catch {
          return 'Must be a valid URL'
        }
      },
    },
    {
      name: 'crawlDepth',
      type: 'number',
      min: 0,
      max: 2,
      defaultValue: 0,
      admin: {
        description: 'How many levels of child pages to follow (0 = this page only)',
        condition: (data) => data?.type === 'url',
      },
    },

    // --- File fields ---
    {
      name: 'file',
      type: 'upload',
      relationTo: 'knowledge-uploads',
      admin: {
        condition: (data) => data?.type === 'file',
        description: 'Upload a PDF, TXT, Markdown, or DOCX file',
      },
    },
    {
      name: 'originalFilename',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Original filename of the uploaded file',
        condition: (data) => data?.type === 'file',
      },
    },
    {
      name: 'mimeType',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => data?.type === 'file',
      },
    },

    // --- OpenAI tracking (sidebar) ---
    {
      name: 'openaiFileId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'OpenAI File ID',
      },
    },
    {
      name: 'vectorStoreId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'OpenAI Vector Store ID',
      },
    },

    // --- Status ---
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Crawling', value: 'crawling' },
        { label: 'Processing', value: 'processing' },
        { label: 'Indexed', value: 'indexed' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'errorMessage',
      type: 'textarea',
      admin: {
        readOnly: true,
        condition: (data) => data?.status === 'failed',
      },
    },

    // --- Metadata ---
    {
      name: 'fileSize',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Size in bytes',
        position: 'sidebar',
      },
    },
    {
      name: 'contentChecksum',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'SHA-256 hash for change detection',
      },
    },
    {
      name: 'lastIndexedAt',
      type: 'date',
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc

        // --- Handle file uploads ---
        if (doc.type === 'file' && doc.file) {
          const docId = doc.id
          ;(async () => {
            try {
              const { getPayload } = await import('@/lib/payload')
              const payload = await getPayload()
              const { logChatEvent } = await import('@/lib/chat/analytics')
              const { readFile } = await import('fs/promises')
              const path = await import('path')

              await payload.update({
                collection: 'knowledge-sources',
                id: docId,
                data: { status: 'processing' } as any,
              })

              // Resolve uploaded file — doc.file can be an ID or populated object
              let uploadDoc: any = doc.file
              if (typeof doc.file === 'string' || typeof doc.file === 'number') {
                uploadDoc = await payload.findByID({
                  collection: 'knowledge-uploads',
                  id: String(doc.file),
                })
              }

              const filename = uploadDoc?.filename
              if (!filename) throw new Error('Upload document has no filename')

              // Read the file from the static upload directory
              const filePath = path.resolve('knowledge-uploads', filename)
              const buffer = await readFile(filePath)

              const { uploadFileToVectorStore } = await import('@/lib/chat/openai')
              const result = await uploadFileToVectorStore(buffer, filename)

              await payload.update({
                collection: 'knowledge-sources',
                id: docId,
                data: {
                  status: 'indexed',
                  originalFilename: filename,
                  mimeType: uploadDoc?.mimeType || '',
                  openaiFileId: result.fileId,
                  vectorStoreId: result.vectorStoreId,
                  fileSize: buffer.length,
                  lastIndexedAt: new Date().toISOString(),
                } as any,
              })

              console.log(`[Knowledge] File indexed: ${filename} → ${result.fileId}`)
              logChatEvent('file_indexed', undefined, { filename, size: buffer.length, fileId: result.fileId })
            } catch (err: any) {
              console.error(`[Knowledge] Failed to index file:`, err.message)
              try {
                const { getPayload } = await import('@/lib/payload')
                const payload = await getPayload()
                await payload.update({
                  collection: 'knowledge-sources',
                  id: docId,
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
          return doc
        }

        // --- Handle URL sources ---
        if (doc.type !== 'url' || !doc.sourceUrl) return doc

        // Deduplication: skip if already crawling
        if (doc.status === 'crawling') return doc

        const docId = doc.id
        const crawlDepth = doc.crawlDepth || 0

        // Run async — don't block the response
        ;(async () => {
          try {
            const { getPayload } = await import('@/lib/payload')
            const payload = await getPayload()
            const { logChatEvent } = await import('@/lib/chat/analytics')

            // Update status to crawling
            await payload.update({
              collection: 'knowledge-sources',
              id: docId,
              data: { status: 'crawling' } as any,
            })

            if (crawlDepth > 0) {
              // Depth crawl — multiple pages
              const { processUrlSourceWithDepth } = await import('@/lib/chat/crawler')
              const result = await processUrlSourceWithDepth(
                doc.sourceUrl,
                crawlDepth,
                {},
                (url, pageResult, error) => {
                  if (pageResult) {
                    logChatEvent('url_crawled', undefined, { url, fileId: pageResult.fileId, depth: crawlDepth })
                  } else if (error) {
                    logChatEvent('url_crawl_failed', undefined, { url, error, depth: crawlDepth })
                  }
                },
              )

              // Store root page's fileId + aggregate stats
              const rootPage = result.pages[0]
              await payload.update({
                collection: 'knowledge-sources',
                id: docId,
                data: {
                  status: result.pagesIndexed > 0 ? 'indexed' : 'failed',
                  openaiFileId: rootPage?.fileId || '',
                  vectorStoreId: rootPage ? result.pages[0].fileId : '',
                  fileSize: result.totalBytes,
                  lastIndexedAt: new Date().toISOString(),
                  errorMessage: result.pagesFailed > 0
                    ? `${result.pagesIndexed} indexed, ${result.pagesFailed} failed, ${result.pagesSkipped} skipped`
                    : '',
                } as any,
              })

              console.log(`[Knowledge] Depth crawl done: ${doc.sourceUrl} — ${result.pagesIndexed} pages indexed`)
              logChatEvent('url_crawled', undefined, {
                url: doc.sourceUrl,
                depth: crawlDepth,
                pagesIndexed: result.pagesIndexed,
                pagesFailed: result.pagesFailed,
              })
            } else {
              // Single-page crawl
              const { processUrlSource } = await import('@/lib/chat/crawler')
              const result = await processUrlSource(doc.sourceUrl)

              await payload.update({
                collection: 'knowledge-sources',
                id: docId,
                data: {
                  status: 'indexed',
                  openaiFileId: result.fileId,
                  vectorStoreId: result.vectorStoreId,
                  fileSize: result.byteSize,
                  contentChecksum: result.contentHash,
                  lastIndexedAt: new Date().toISOString(),
                } as any,
              })

              console.log(`[Knowledge] URL indexed: ${doc.sourceUrl} → ${result.fileId}`)
              logChatEvent('url_crawled', undefined, { url: doc.sourceUrl, fileId: result.fileId, depth: 0 })
            }
          } catch (err: any) {
            console.error(`[Knowledge] Failed to index URL ${doc.sourceUrl}:`, err.message)
            try {
              const { getPayload } = await import('@/lib/payload')
              const payload = await getPayload()
              const { logChatEvent } = await import('@/lib/chat/analytics')

              await payload.update({
                collection: 'knowledge-sources',
                id: docId,
                data: {
                  status: 'failed',
                  errorMessage: err.message?.slice(0, 500),
                } as any,
              })
              logChatEvent('url_crawl_failed', undefined, { url: doc.sourceUrl, error: err.message })
            } catch {
              // Best effort
            }
          }
        })()

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.openaiFileId) return

        try {
          const { deleteFileFromVectorStore } = await import('@/lib/chat/openai')
          await deleteFileFromVectorStore(doc.openaiFileId)
          console.log('[Knowledge] File removed from vector store:', doc.openaiFileId)
        } catch (err: any) {
          console.warn('[Knowledge] Failed to remove file from vector store:', err.message)
        }
      },
    ],
  },
}
