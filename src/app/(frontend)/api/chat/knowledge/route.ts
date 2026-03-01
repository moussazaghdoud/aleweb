import { NextRequest, NextResponse } from 'next/server'
import { listVectorStoreFiles, uploadFileToVectorStore, deleteFileFromVectorStore } from '@/lib/chat/openai'

export const dynamic = 'force-dynamic'

function checkSecret(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')
  return secret === process.env.PAYLOAD_SECRET
}

/** GET — List knowledge base files */
export async function GET(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const files = await listVectorStoreFiles()
    return NextResponse.json({ files })
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

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadFileToVectorStore(buffer, file.name)

    return NextResponse.json({
      success: true,
      fileId: result.fileId,
      vectorStoreId: result.vectorStoreId,
      filename: file.name,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

/** DELETE — Remove a file from the knowledge base */
export async function DELETE(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body?.fileId) {
    return NextResponse.json({ error: 'fileId is required' }, { status: 400 })
  }

  try {
    await deleteFileFromVectorStore(body.fileId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
