/**
 * Shared Payload CMS helpers for frontend data fetching.
 *
 * Uses Payload's Local API (in-process, no HTTP overhead).
 * Each function returns data matching the existing data structures
 * so frontend components need minimal changes.
 */

import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

// Singleton — avoids re-initializing on every call in the same request
let cached: Awaited<ReturnType<typeof getPayloadInstance>> | null = null
let initFailed = false

export async function getPayload() {
  if (initFailed) throw new Error('Payload init previously failed — database unavailable')
  if (!cached) {
    try {
      cached = await getPayloadInstance({ config })
    } catch (err) {
      initFailed = true
      throw err
    }
  }
  return cached
}

// ── Products ────────────────────────────────────────────────

export async function getAllProducts() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'products', limit: 500, pagination: false, sort: 'name' })
  return docs
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

export async function getProductsByCategory(category: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'products', where: { category: { equals: category } }, limit: 500, pagination: false, sort: 'name' })
  return docs
}

// ── Solutions ───────────────────────────────────────────────

export async function getAllSolutions() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'solutions', limit: 100, pagination: false, sort: 'name' })
  return docs
}

export async function getSolutionBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'solutions', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Industries ──────────────────────────────────────────────

export async function getAllIndustries() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'industries', limit: 100, pagination: false, sort: 'name' })
  return docs
}

export async function getIndustryBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'industries', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Platforms ───────────────────────────────────────────────

export async function getAllPlatforms() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'platforms', limit: 100, pagination: false, sort: 'name' })
  return docs
}

export async function getPlatformBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'platforms', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Blog Posts ──────────────────────────────────────────────

export async function getAllBlogPosts() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'blog-posts', limit: 500, pagination: false, sort: '-publishedDate' })
  return docs
}

export async function getBlogPostBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Services ────────────────────────────────────────────────

export async function getAllServices() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'services', limit: 100, pagination: false, sort: 'name' })
  return docs
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Partners ────────────────────────────────────────────────

export async function getAllPartners() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'partners', limit: 100, pagination: false, sort: 'name' })
  return docs
}

export async function getPartnerBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'partners', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Company Pages ───────────────────────────────────────────

export async function getAllCompanyPages() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'company-pages', limit: 100, pagination: false, sort: 'title' })
  return docs
}

export async function getCompanyPageBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'company-pages', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Legal Pages ─────────────────────────────────────────────

export async function getAllLegalPages() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'legal-pages', limit: 100, pagination: false, sort: 'title' })
  return docs
}

export async function getLegalPageBySlug(slug: string) {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'legal-pages', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0] || null
}

// ── Resources ───────────────────────────────────────────────

export async function getAllResources() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'resources', limit: 500, pagination: false, sort: '-createdAt' })
  return docs
}

// ── Globals ─────────────────────────────────────────────────

export async function getNavigation() {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'navigation' })
}

export async function getFooter() {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'footer' })
}

export async function getSiteConfig() {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'site-config' })
}

export async function getHomepage() {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'homepage' })
}

export async function getRedirectRules() {
  const payload = await getPayload()
  const data = await payload.findGlobal({ slug: 'redirects' })
  return ((data as any)?.rules || []).filter((r: any) => r.active)
}
