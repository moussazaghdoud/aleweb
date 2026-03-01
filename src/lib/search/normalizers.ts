/**
 * Document Normalizers
 *
 * One pure function per collection type. Transforms raw CMS/static data
 * into the canonical SearchDocument shape for indexing.
 */

import type { SearchDocument } from './types'
import type { CatalogProduct } from '@/data/products-catalog'
import type { SolutionData } from '@/data/solutions'
import type { IndustryData } from '@/data/industries'
import type { ProductData } from '@/data/platform'
import type { ServiceData } from '@/data/services'
import type { BlogPost } from '@/data/blog'
import type { PartnerPageData } from '@/data/partners'
import type { CompanyPageData } from '@/data/company'
import type { Resource } from '@/data/resources'
import type { LegalPageData } from '@/data/legal'

/** Join non-empty parts with spaces */
function join(...parts: (string | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ')
}

/** Extract plain text from a features/capabilities array */
function arrayText(arr: { title?: string; description?: string }[] = []): string {
  return arr.map(item => join(item.title, item.description)).join(' ')
}

/** Extract text from highlights array (stat + label) */
function highlightText(arr: { stat?: string; label?: string }[] = []): string {
  return arr.map(h => join(h.stat, h.label)).join(' ')
}

// ─── Collection Normalizers ───────────────────────────────

export function normalizeProduct(doc: CatalogProduct): SearchDocument {
  return {
    id: `Product:${doc.slug}`,
    type: 'Product',
    slug: doc.slug,
    href: `/products/${doc.category}/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      arrayText(doc.features),
      highlightText(doc.highlights),
      doc.variants?.map(v => join(v.model, v.description)).join(' '),
    ),
    keywords: join(doc.slug.replace(/-/g, ' '), doc.category, doc.subcategory),
    category: doc.category,
    locale: 'en',
    boost: 0,
  }
}

export function normalizeSolution(doc: SolutionData): SearchDocument {
  return {
    id: `Solution:${doc.slug}`,
    type: 'Solution',
    slug: doc.slug,
    href: `/solutions/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      arrayText(doc.capabilities),
      doc.products.join(' '),
      highlightText(doc.benefits),
    ),
    keywords: join(doc.slug.replace(/-/g, ' '), doc.industries?.join(' ')),
    locale: 'en',
    boost: 0,
  }
}

export function normalizeIndustry(doc: IndustryData): SearchDocument {
  return {
    id: `Industry:${doc.slug}`,
    type: 'Industry',
    slug: doc.slug,
    href: `/industries/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      arrayText(doc.solutions),
      doc.customers?.map(c => join(c.name, c.detail)).join(' '),
      doc.products?.join(' '),
    ),
    keywords: doc.slug.replace(/-/g, ' '),
    industry: doc.slug,
    locale: 'en',
    boost: 0,
  }
}

export function normalizePlatform(doc: ProductData): SearchDocument {
  return {
    id: `Platform:${doc.slug}`,
    type: 'Platform',
    slug: doc.slug,
    href: `/platform/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      arrayText(doc.features),
      highlightText(doc.highlights),
      doc.relatedProducts?.join(' '),
    ),
    keywords: join(doc.slug.replace(/-/g, ' '), doc.category, 'platform'),
    category: doc.category,
    locale: 'en',
    boost: 0,
  }
}

export function normalizeService(doc: ServiceData): SearchDocument {
  return {
    id: `Service:${doc.slug}`,
    type: 'Service',
    slug: doc.slug,
    href: `/services/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      arrayText(doc.features),
      doc.highlights?.join(' '),
    ),
    keywords: join(doc.slug.replace(/-/g, ' '), doc.industries?.join(' ')),
    locale: 'en',
    boost: 0,
  }
}

export function normalizeBlog(doc: BlogPost): SearchDocument {
  return {
    id: `Blog:${doc.slug}`,
    type: 'Blog',
    slug: doc.slug,
    href: `/blog/${doc.slug}`,
    title: doc.title,
    tagline: doc.excerpt.slice(0, 120),
    description: doc.excerpt,
    body: Array.isArray(doc.content) ? doc.content.join(' ') : '',
    keywords: join(doc.slug.replace(/-/g, ' '), doc.category, 'article blog'),
    category: doc.category,
    locale: 'en',
    publishedAt: doc.date,
    boost: 0,
    meta: { author: doc.author, date: doc.date },
  }
}

export function normalizePartner(doc: PartnerPageData): SearchDocument {
  return {
    id: `Partner:${doc.slug}`,
    type: 'Partner',
    slug: doc.slug,
    href: `/partners/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      arrayText(doc.features),
      doc.highlights?.join(' '),
    ),
    keywords: doc.slug.replace(/-/g, ' '),
    locale: 'en',
    boost: 0,
  }
}

export function normalizeCompany(doc: CompanyPageData): SearchDocument {
  return {
    id: `Company:${doc.slug}`,
    type: 'Company',
    slug: doc.slug,
    href: `/company/${doc.slug}`,
    title: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    body: join(
      doc.sections?.map(s => join(s.title, s.content)).join(' '),
      doc.pressReleases?.map(pr => join(pr.title, pr.summary)).join(' '),
    ),
    keywords: doc.slug.replace(/-/g, ' '),
    locale: 'en',
    boost: 0,
  }
}

export function normalizeResource(doc: Resource): SearchDocument {
  return {
    id: `Resource:${doc.slug}`,
    type: 'Resource',
    slug: doc.slug,
    href: `/resources#${doc.slug}`,
    title: doc.title,
    tagline: doc.type.replace(/-/g, ' '),
    description: doc.summary,
    body: join(doc.solution, doc.industry),
    keywords: join(doc.slug.replace(/-/g, ' '), doc.type, 'resource download'),
    category: doc.type,
    industry: doc.industry,
    locale: 'en',
    publishedAt: doc.date,
    boost: 0,
    meta: { resourceType: doc.type, date: doc.date },
  }
}

export function normalizeLegal(doc: LegalPageData): SearchDocument {
  return {
    id: `Legal:${doc.slug}`,
    type: 'Legal',
    slug: doc.slug,
    href: `/legal/${doc.slug}`,
    title: doc.name,
    tagline: 'Legal document',
    description: doc.sections?.[0]?.content?.slice(0, 200) || '',
    body: doc.sections?.map(s => join(s.title, s.content)).join(' ') || '',
    keywords: join(doc.slug.replace(/-/g, ' '), 'legal policy terms privacy'),
    locale: 'en',
    boost: -2,
  }
}
