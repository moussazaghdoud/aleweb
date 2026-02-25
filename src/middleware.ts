import { NextRequest, NextResponse } from 'next/server'

type RedirectRule = {
  source: string
  destination: string
  type: '301' | '302'
  active: boolean
}

let cachedRules: RedirectRule[] | null = null
let cacheTime = 0
const CACHE_TTL = 60_000 // 1 minute

async function getRedirectRules(): Promise<RedirectRule[]> {
  if (cachedRules && Date.now() - cacheTime < CACHE_TTL) return cachedRules

  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/globals/redirects`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    })
    if (!res.ok) return cachedRules || []
    const data = await res.json()
    cachedRules = (data?.rules || []).filter((r: RedirectRule) => r.active)
    cacheTime = Date.now()
    return cachedRules!
  } catch {
    return cachedRules || []
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const rules = await getRedirectRules()
  const match = rules.find((r) => r.source === pathname)

  if (match) {
    const destination = match.destination.startsWith('http')
      ? match.destination
      : new URL(match.destination, request.url).toString()

    return NextResponse.redirect(destination, {
      status: match.type === '302' ? 302 : 301,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next (Next.js internals)
     * - api (API routes — handled separately)
     * - admin (Payload admin)
     * - static files (images, fonts, etc.)
     */
    '/((?!_next|api|admin|favicon\\.ico|media|.*\\..*).*)',
  ],
}
