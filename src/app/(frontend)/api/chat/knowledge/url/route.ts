import { NextRequest, NextResponse } from 'next/server'
import { logChatEvent } from '@/lib/chat/analytics'

export const dynamic = 'force-dynamic'

function checkSecret(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '')
  return secret === process.env.PAYLOAD_SECRET
}

async function getKnowledgeConfig(): Promise<{
  allowedDomains: string[]
  maxSources: number
}> {
  try {
    const { getPayload } = await import('@/lib/payload')
    const payload = await getPayload()
    const config = await payload.findGlobal({ slug: 'site-config' }) as any
    const domains = (config?.knowledgeBase?.allowedDomains || [])
      .map((d: any) => d.domain)
      .filter(Boolean)
    return {
      allowedDomains: domains,
      maxSources: config?.knowledgeBase?.maxSources || 50,
    }
  } catch {
    return { allowedDomains: [], maxSources: 50 }
  }
}

/** POST — Add a URL knowledge source */
export async function POST(request: NextRequest) {
  if (!checkSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { url, name, crawlDepth = 0 } = body

    if (!url) {
      return NextResponse.json({ error: 'url is required' }, { status: 400 })
    }

    // Validate URL format
    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    if (!parsed.protocol.startsWith('http')) {
      return NextResponse.json({ error: 'URL must use http or https' }, { status: 400 })
    }

    const { allowedDomains, maxSources } = await getKnowledgeConfig()

    // Check allowed domains
    if (allowedDomains.length > 0) {
      const domainAllowed = allowedDomains.some(
        (d) => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`),
      )
      if (!domainAllowed) {
        return NextResponse.json(
          { error: `Domain not allowed. Allowed: ${allowedDomains.join(', ')}` },
          { status: 400 },
        )
      }
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

    // Check for duplicate URL
    const existing = await payload.find({
      collection: 'knowledge-sources',
      where: { sourceUrl: { equals: url } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: 'This URL is already indexed', existingId: existing.docs[0].id },
        { status: 409 },
      )
    }

    // Create document — afterChange hook will handle crawling in background
    const doc = await payload.create({
      collection: 'knowledge-sources',
      data: {
        name: name || parsed.hostname + parsed.pathname,
        type: 'url',
        sourceUrl: url,
        crawlDepth: Math.min(Math.max(crawlDepth, 0), 2),
        status: 'pending',
      } as any,
    })

    logChatEvent('url_crawled', undefined, {
      url,
      depth: Math.min(Math.max(crawlDepth, 0), 2),
      sourceId: doc.id,
    })

    return NextResponse.json({
      success: true,
      id: doc.id,
      status: 'pending',
      message: 'URL source created. Crawling will start in the background.',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
