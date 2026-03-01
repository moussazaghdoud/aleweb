/**
 * Hook Adapters
 *
 * Transform raw Payload CMS documents into the shapes that the normalizers expect.
 * The normalizers were designed to work with the CMS adapter output (see cms.ts),
 * which sometimes renames or transforms fields. These thin adapters bridge the gap
 * so that afterChange hooks can call normalizers correctly.
 *
 * Collections where raw Payload fields already match the normalizer input:
 *   Products, Platforms (close enough — relatedProducts becomes objects but normalizer handles it)
 *
 * Collections requiring adaptation:
 *   Solutions, Industries, Services, BlogPosts, Partners, CompanyPages, LegalPages, Resources
 */

import type { SearchDocument } from './types'
import {
  normalizeProduct,
  normalizeSolution,
  normalizeIndustry,
  normalizePlatform,
  normalizeService,
  normalizeBlog,
  normalizePartner,
  normalizeCompany,
  normalizeResource,
  normalizeLegal,
} from './normalizers'

// ─── Direct pass-through (fields match) ───────────────────

export function adaptProduct(doc: any): SearchDocument {
  return normalizeProduct(doc)
}

export function adaptPlatform(doc: any): SearchDocument {
  // relatedProducts in Payload is a relationship array (objects or IDs),
  // but the normalizer calls ?.join(' ') which is safe (produces stringified IDs)
  return normalizePlatform({
    ...doc,
    relatedProducts: Array.isArray(doc.relatedProducts)
      ? doc.relatedProducts.map((r: any) => (typeof r === 'string' ? r : r?.slug || r?.name || String(r?.id || '')))
      : [],
  })
}

// ─── Solutions: productNames[].name → products string[] ───

export function adaptSolution(doc: any): SearchDocument {
  return normalizeSolution({
    ...doc,
    products: Array.isArray(doc.productNames)
      ? doc.productNames.map((p: any) => p.name || '')
      : [],
    industries: [], // relationship array — not needed for search text
  })
}

// ─── Industries: productNames[].name → products string[] ──

export function adaptIndustry(doc: any): SearchDocument {
  return normalizeIndustry({
    ...doc,
    products: Array.isArray(doc.productNames)
      ? doc.productNames.map((p: any) => p.name || '')
      : [],
  })
}

// ─── Services: offerings → features ───────────────────────

export function adaptService(doc: any): SearchDocument {
  return normalizeService({
    ...doc,
    features: doc.offerings || [],
  })
}

// ─── Blog: publishedDate → date, richText → string[] ─────

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

export function adaptBlog(doc: any): SearchDocument {
  return normalizeBlog({
    ...doc,
    date: doc.publishedDate || '',
    content: lexicalToStrings(doc.content),
    heroImage: '', // not needed for search
  })
}

// ─── Partners: benefits → features ────────────────────────

export function adaptPartner(doc: any): SearchDocument {
  return normalizePartner({
    ...doc,
    features: doc.benefits || [],
    heroImage: '', // not needed for search
  })
}

// ─── Company: title → name, contentSections → sections ────

export function adaptCompany(doc: any): SearchDocument {
  return normalizeCompany({
    ...doc,
    name: doc.title || '',
    sections: Array.isArray(doc.contentSections)
      ? doc.contentSections.map((s: any) => ({
          title: s.title || '',
          content: s.content || '',
        }))
      : [],
    heroImage: '', // not needed for search
  })
}

// ─── Legal: title → name, richText content → sections ─────

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

export function adaptLegal(doc: any): SearchDocument {
  return normalizeLegal({
    ...doc,
    name: doc.title || '',
    sections: lexicalToSections(doc.content),
  })
}

// ─── Resources: description → summary, createdAt → date ───

export function adaptResource(doc: any): SearchDocument {
  return normalizeResource({
    ...doc,
    summary: doc.description || '',
    date: doc.createdAt?.split('T')[0] || '',
    type: doc.type || 'whitepaper',
  })
}
