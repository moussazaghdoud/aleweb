import { NextRequest, NextResponse } from 'next/server'
import {
  getCatalogProducts,
  getSolutionsData,
  getIndustriesData,
  getServicesData,
  getPlatformData,
  getCompanyData,
  getBlogData,
  getPartnersData,
} from '@/lib/cms'

type SearchItem = {
  title: string
  description: string
  href: string
  type: string
}

let cachedIndex: SearchItem[] | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function buildIndex(): Promise<SearchItem[]> {
  if (cachedIndex && Date.now() - cacheTime < CACHE_TTL) return cachedIndex

  const [products, solutions, industries, services, platforms, company, blog, partners] =
    await Promise.all([
      getCatalogProducts(),
      getSolutionsData(),
      getIndustriesData(),
      getServicesData(),
      getPlatformData(),
      getCompanyData(),
      getBlogData(),
      getPartnersData(),
    ])

  const index: SearchItem[] = [
    ...products.map((p) => ({
      title: p.name,
      description: p.tagline,
      href: `/products/${p.category}/${p.slug}`,
      type: 'Product',
    })),
    ...solutions.map((s) => ({
      title: s.name,
      description: s.tagline,
      href: `/solutions/${s.slug}`,
      type: 'Solution',
    })),
    ...industries.map((i) => ({
      title: i.name,
      description: i.description,
      href: `/industries/${i.slug}`,
      type: 'Industry',
    })),
    ...services.map((s) => ({
      title: s.name,
      description: s.tagline,
      href: `/services/${s.slug}`,
      type: 'Service',
    })),
    ...platforms.map((p) => ({
      title: p.name,
      description: p.tagline,
      href: `/platform/${p.slug}`,
      type: 'Platform',
    })),
    ...company.map((c) => ({
      title: c.name,
      description: c.tagline,
      href: `/company/${c.slug}`,
      type: 'Company',
    })),
    ...blog.map((b) => ({
      title: b.title,
      description: b.excerpt,
      href: `/blog/${b.slug}`,
      type: 'Blog',
    })),
    ...partners.map((p) => ({
      title: p.name,
      description: p.tagline,
      href: `/partners/${p.slug}`,
      type: 'Partner',
    })),
  ]

  cachedIndex = index
  cacheTime = Date.now()
  return index
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.toLowerCase().trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], query: q || '' })
  }

  const index = await buildIndex()
  const terms = q.split(/\s+/)

  const results = index
    .map((item) => {
      const text = `${item.title} ${item.description} ${item.type}`.toLowerCase()
      const matchCount = terms.filter((t) => text.includes(t)).length
      return { ...item, score: matchCount }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)

  return NextResponse.json({ results, query: q })
}
