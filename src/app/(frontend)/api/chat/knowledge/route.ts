import { NextRequest, NextResponse } from 'next/server'
import { uploadFileToVectorStore, deleteFileFromVectorStore } from '@/lib/chat/openai'
import { logChatEvent } from '@/lib/chat/analytics'

export const dynamic = 'force-dynamic'

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function checkSecret(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')
  return secret === process.env.PAYLOAD_SECRET
}

async function getKnowledgeConfig(): Promise<{ maxFileSize: number; maxSources: number }> {
  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const config = await payload.findGlobal({ slug: 'site-config' }) as any
    return {
      maxFileSize: config?.knowledgeBase?.maxFileSize || 10485760,
      maxSources: config?.knowledgeBase?.maxSources || 50,
    }
  } catch {
    return { maxFileSize: 10485760, maxSources: 50 }
  }
}

/** GET — List knowledge sources from Payload collection */
export async function GET(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    const { docs } = await payload.find({
      collection: 'knowledge-sources',
      limit: 100,
      sort: '-createdAt',
    })

    return NextResponse.json({ sources: docs })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

/** POST — Upload a file to the knowledge base */
export async function POST(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check MIME type allowlist
    const mimeType = file.type || 'application/octet-stream'
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${mimeType}. Allowed: PDF, TXT, Markdown, DOCX` },
        { status: 415 },
      )
    }

    // Check limits from SiteConfig
    const { maxFileSize, maxSources } = await getKnowledgeConfig()

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${Math.round(maxFileSize / 1048576)} MB` },
        { status: 400 },
      )
    }

    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    // Check source count limit
    const { totalDocs } = await payload.count({ collection: 'knowledge-sources' })
    if (totalDocs >= maxSources) {
      return NextResponse.json(
        { error: `Maximum number of sources reached (${maxSources})` },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadFileToVectorStore(buffer, file.name)

    // Create knowledge-sources document
    const doc = await payload.create({
      collection: 'knowledge-sources',
      data: {
        name: file.name,
        type: 'file',
        originalFilename: file.name,
        mimeType: file.type || 'application/octet-stream',
        openaiFileId: result.fileId,
        vectorStoreId: result.vectorStoreId,
        fileSize: file.size,
        status: 'indexed',
        lastIndexedAt: new Date().toISOString(),
      } as any,
    })

    logChatEvent('file_indexed', undefined, {
      filename: file.name,
      size: file.size,
      fileId: result.fileId,
    })

    return NextResponse.json({
      success: true,
      id: doc.id,
      fileId: result.fileId,
      vectorStoreId: result.vectorStoreId,
      filename: file.name,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

/** DELETE — Remove a knowledge source by Payload doc ID */
export async function DELETE(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body?.id) {
    return NextResponse.json({ error: 'id is required (Payload document ID)' }, { status: 400 })
  }

  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()

    // Delete from Payload — afterDelete hook handles OpenAI cleanup
    await payload.delete({
      collection: 'knowledge-sources',
      id: body.id,
    })

    logChatEvent('file_deleted', undefined, { id: body.id })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
