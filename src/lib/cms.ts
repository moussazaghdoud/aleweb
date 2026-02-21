/**
 * CMS Data Adapters
 *
 * These functions fetch from Payload CMS and return data in the EXACT
 * same shape as the original src/data/*.ts interfaces. This means the
 * frontend JSX components need zero changes — only the import line changes.
 *
 * Example migration per page:
 *   BEFORE: import { solutionsData } from "@/data/solutions"
 *   AFTER:  const solutionsData = await getSolutionsData()
 */

import { getPayload } from './payload'

// ── Types matching existing interfaces ──────────────────────

// These mirror src/data/*.ts interfaces exactly
import type { SolutionData } from '@/data/solutions'
import type { IndustryData } from '@/data/industries'
import type { IndustrySubPageData } from '@/data/industry-subpages'
import type { CatalogProduct, ProductCategory } from '@/data/products-catalog'
import type { BlogPost } from '@/data/blog'
import type { ProductData } from '@/data/platform'
import type { ServiceData } from '@/data/services'
import type { PartnerPageData } from '@/data/partners'
import type { CompanyPageData } from '@/data/company'
import type { LegalPageData } from '@/data/legal'
import type { Resource } from '@/data/resources'
import type { NavItem, NavChild } from '@/data/navigation'

export type { SolutionData, IndustryData, IndustrySubPageData, CatalogProduct, ProductCategory, BlogPost, ProductData, ServiceData, PartnerPageData, CompanyPageData, LegalPageData, Resource, NavItem, NavChild }

// ── Solutions ───────────────────────────────────────────────

export async function getSolutionsData(options?: { draft?: boolean }): Promise<SolutionData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'solutions',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    heroImage: doc.heroImage?.url || '',
    capabilities: doc.capabilities || [],
    products: (doc.productNames || []).map((p: any) => p.name),
    benefits: doc.benefits || [],
    industries: [], // Will be populated if relationships are set
  }))
}

// ── Industries ──────────────────────────────────────────────

export async function getIndustriesData(options?: { draft?: boolean }): Promise<IndustryData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'industries',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    heroImage: doc.heroImage?.url || '',
    icon: doc.icon || doc.slug,
    solutions: doc.solutions || [],
    customers: doc.customers || [],
    products: (doc.productNames || []).map((p: any) => p.name),
    subPages: doc.subPages || [],
  }))
}

// ── Products ────────────────────────────────────────────────

export async function getCatalogProducts(options?: { draft?: boolean }): Promise<CatalogProduct[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'products',
    limit: 500,
    pagination: false,
    sort: 'name',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    category: doc.category,
    subcategory: doc.subcategory || undefined,
    features: doc.features || [],
    highlights: doc.highlights || [],
  }))
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  // These are static — same as the original
  return [
    { slug: 'switches', name: 'Network Switches', description: 'Enterprise LAN switching from access edge to core data center' },
    { slug: 'wlan', name: 'Wireless LAN', description: 'OmniAccess Stellar indoor and outdoor access points' },
    { slug: 'devices', name: 'Phones & Devices', description: 'Desk phones, softphones, handsets, and headsets' },
    { slug: 'applications', name: 'Contact Center & Applications', description: 'Contact center, dispatch, recording, and attendant solutions' },
    { slug: 'integration', name: 'Ecosystem Integration', description: 'Microsoft Teams, CRM connectors, and open APIs' },
    { slug: 'management', name: 'Communications & Network Management', description: 'Management platforms, security, and administration tools' },
    { slug: 'platforms', name: 'Communication Platforms', description: 'DECT and SIP-DECT base station infrastructure' },
  ]
}

// ── Blog ────────────────────────────────────────────────────

function lexicalToStrings(richText: any): string[] {
  if (!richText?.root?.children) return []
  return richText.root.children
    .filter((node: any) => node.type === 'paragraph')
    .map((node: any) =>
      (node.children || [])
        .map((child: any) => child.text || '')
        .join('')
    )
    .filter((s: string) => s.length > 0)
}

export async function getBlogData(options?: { draft?: boolean }): Promise<BlogPost[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    limit: 500,
    pagination: false,
    sort: '-publishedDate',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    author: doc.author,
    date: doc.publishedDate,
    heroImage: doc.heroImage?.url || '',
    content: lexicalToStrings(doc.content),
  }))
}

// ── Platforms ────────────────────────────────────────────────

export async function getPlatformData(options?: { draft?: boolean }): Promise<ProductData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'platforms',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    heroImage: doc.heroImage?.url || '',
    category: (doc.category || 'communications') as ProductData['category'],
    features: doc.features || [],
    highlights: doc.highlights || [],
    relatedProducts: [],
  }))
}

// ── Services ────────────────────────────────────────────────

export async function getServicesData(options?: { draft?: boolean }): Promise<ServiceData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'services',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    heroImage: doc.heroImage?.url || '',
    features: doc.offerings || [],
  }))
}

// ── Partners ────────────────────────────────────────────────

export async function getPartnersData(options?: { draft?: boolean }): Promise<PartnerPageData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'partners',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    heroImage: doc.heroImage?.url || '',
    features: doc.benefits || [],
  }))
}

// ── Company ─────────────────────────────────────────────────

export async function getCompanyData(options?: { draft?: boolean }): Promise<CompanyPageData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'company-pages',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.title,
    tagline: doc.tagline || '',
    description: doc.description,
    heroImage: doc.heroImage?.url || '',
    sections: (doc.contentSections || []).map((s: any) => ({
      title: s.title || '',
      content: s.content || '',
    })),
    stats: doc.stats?.length ? doc.stats.map((s: any) => ({
      label: s.label || '',
      value: s.value || '',
    })) : undefined,
    offices: doc.offices?.length ? doc.offices.map((o: any) => ({
      city: o.city || '',
      country: o.country || '',
      address: o.address || '',
      phone: o.phone,
    })) : undefined,
    pressReleases: doc.pressReleases?.length ? doc.pressReleases.map((pr: any) => ({
      title: pr.title || '',
      date: pr.date || '',
      summary: pr.summary || '',
    })) : undefined,
  }))
}

// ── Legal ───────────────────────────────────────────────────

function lexicalToSections(richText: any): { title: string; content: string }[] {
  if (!richText?.root?.children) return []
  const sections: { title: string; content: string }[] = []
  let currentTitle = ''
  let currentContent = ''

  for (const node of richText.root.children) {
    if (node.type === 'heading') {
      if (currentTitle) {
        sections.push({ title: currentTitle, content: currentContent.trim() })
      }
      currentTitle = (node.children || []).map((c: any) => c.text || '').join('')
      currentContent = ''
    } else if (node.type === 'paragraph') {
      const text = (node.children || []).map((c: any) => c.text || '').join('')
      if (text) currentContent += text + ' '
    }
  }
  if (currentTitle) {
    sections.push({ title: currentTitle, content: currentContent.trim() })
  }
  return sections
}

export async function getLegalData(options?: { draft?: boolean }): Promise<LegalPageData[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'legal-pages',
    limit: 500,
    pagination: false,
    sort: 'createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    name: doc.title,
    lastUpdated: doc.lastUpdated || '',
    sections: lexicalToSections(doc.content),
  }))
}

// ── Resources ───────────────────────────────────────────────

export async function getResourcesData(options?: { draft?: boolean }): Promise<Resource[]> {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'resources',
    limit: 500,
    pagination: false,
    sort: '-createdAt',
    draft: options?.draft,
  })
  return docs.map((doc: any) => ({
    slug: doc.slug,
    title: doc.title,
    type: (doc.type || 'whitepaper') as Resource['type'],
    summary: doc.description,
    date: doc.createdAt?.split('T')[0] || '',
    industry: undefined,
    solution: undefined,
  }))
}

// ── Navigation ──────────────────────────────────────────────

export async function getNavigationData() {
  const payload = await getPayload()
  const nav = await payload.findGlobal({ slug: 'navigation' })
  return {
    primaryNav: (nav.primaryNav || []).map((item: any) => ({
      label: item.label,
      href: item.href,
      children: (item.children || []).map((child: any) => ({
        label: child.label,
        href: child.href,
        description: child.description,
      })),
      featured: item.featured?.title ? {
        title: item.featured.title,
        description: item.featured.description || '',
        href: item.featured.href || '',
      } : undefined,
    })),
    utilityNav: (nav.utilityNav || []).map((item: any) => ({
      label: item.label,
      href: item.href,
    })),
  }
}
