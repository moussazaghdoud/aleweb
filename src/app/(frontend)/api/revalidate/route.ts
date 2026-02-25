import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { secret, path, tag } = body as { secret?: string; path?: string; tag?: string }

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (!path && !tag) {
    return NextResponse.json({ error: 'Must provide path or tag' }, { status: 400 })
  }

  if (path) {
    revalidatePath(path, 'page')
  }

  if (tag) {
    revalidateTag(tag, { expire: 0 })
  }

  return NextResponse.json({ revalidated: true, path: path || null, tag: tag || null })
}
