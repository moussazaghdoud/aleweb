import { NextRequest, NextResponse } from 'next/server'
import { getSearchProvider } from '@/lib/search/index'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() || ''
  const locale = request.nextUrl.searchParams.get('locale') || 'en'

  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    const provider = await getSearchProvider()
    const result = await provider.suggest(q, locale)

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
      },
    })
  } catch {
    return NextResponse.json({ suggestions: [] })
  }
}
