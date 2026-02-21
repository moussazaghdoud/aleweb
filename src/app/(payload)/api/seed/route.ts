/**
 * POST /api/seed
 *
 * Migrates all content from src/data/*.ts files into Payload CMS collections.
 * Protected: requires admin auth or a secret token.
 * Idempotent: re-running skips items whose slugs already exist.
 *
 * Usage:
 *   curl -X POST http://localhost:3000/api/seed \
 *     -H "Authorization: Bearer <your-jwt>" \
 *     -H "Content-Type: application/json"
 *
 *   OR with seed secret:
 *   curl -X POST http://localhost:3000/api/seed \
 *     -H "x-seed-secret: <PAYLOAD_SECRET>"
 */

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// ── Import all existing data ─────────────────────────────────
import { blogData } from '@/data/blog'
import { companyData } from '@/data/company'
import { industriesData } from '@/data/industries'
import { legalData } from '@/data/legal'
import { primaryNav, utilityNav } from '@/data/navigation'
import { partnersData } from '@/data/partners'
import { platformData } from '@/data/platform'
import { catalogProducts } from '@/data/products-catalog'
import { resourcesData } from '@/data/resources'
import { servicesData } from '@/data/services'
import { solutionsData } from '@/data/solutions'

// ── Helpers ──────────────────────────────────────────────────

function textToLexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: p, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function sectionsToLexical(sections: { title: string; content: string }[]) {
  const children: any[] = []
  for (const section of sections) {
    children.push({
      type: 'heading',
      tag: 'h2',
      children: [{ type: 'text', text: section.title, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })
    children.push({
      type: 'paragraph',
      children: [{ type: 'text', text: section.content, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })
  }
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } }
}

let created = 0
let skipped = 0
let errors = 0
const log: string[] = []

async function upsert(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  slug: string,
  data: Record<string, unknown>,
) {
  try {
    const existing = await payload.find({
      collection: collection as any,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      return existing.docs[0]
    }
    const doc = await payload.create({
      collection: collection as any,
      data: { ...data, slug, _status: 'published' } as any,
    })
    created++
    log.push(`+ ${collection}/${slug}`)
    return doc
  } catch (err: any) {
    errors++
    log.push(`! ${collection}/${slug}: ${err.message}`)
    return null
  }
}

// ── Main Seed Function ───────────────────────────────────────

async function seed(payload: Awaited<ReturnType<typeof getPayload>>) {
  created = 0
  skipped = 0
  errors = 0
  log.length = 0

  // 1. Products
  for (const p of catalogProducts) {
    await upsert(payload, 'products', p.slug, {
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      subcategory: p.subcategory || '',
      features: p.features,
      highlights: p.highlights,
    })
  }

  // 2. Industries
  for (const i of industriesData) {
    await upsert(payload, 'industries', i.slug, {
      name: i.name,
      tagline: i.tagline,
      description: i.description,
      icon: i.slug,
      solutions: i.solutions,
      customers: i.customers,
      productNames: i.products.map((name) => ({ name })),
      subPages: i.subPages || [],
    })
  }

  // 3. Solutions
  for (const s of solutionsData) {
    await upsert(payload, 'solutions', s.slug, {
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      capabilities: s.capabilities,
      productNames: s.products.map((name) => ({ name })),
      benefits: s.benefits,
    })
  }

  // 4. Platforms
  for (const p of platformData) {
    await upsert(payload, 'platforms', p.slug, {
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      features: p.features,
      highlights: p.highlights,
    })
  }

  // 5. Blog Posts
  for (const post of blogData) {
    await upsert(payload, 'blog-posts', post.slug, {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      publishedDate: post.date,
      content: textToLexical(post.content),
    })
  }

  // 6. Services
  for (const s of servicesData) {
    await upsert(payload, 'services', s.slug, {
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      offerings: s.features,
    })
  }

  // 7. Partners
  for (const p of partnersData) {
    await upsert(payload, 'partners', p.slug, {
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      benefits: p.features,
    })
  }

  // 8. Company Pages
  for (const page of companyData) {
    await upsert(payload, 'company-pages', page.slug, {
      title: page.name,
      tagline: page.tagline,
      description: page.description,
      contentSections: page.sections.map((s) => ({
        title: s.title,
        content: s.content,
      })),
      ...(page.stats
        ? { stats: page.stats.map((s) => ({ value: s.value, label: s.label })) }
        : {}),
      ...(page.offices
        ? {
            offices: page.offices.map((o) => ({
              city: o.city,
              country: o.country,
              address: o.address,
              phone: o.phone,
            })),
          }
        : {}),
      ...(page.pressReleases
        ? {
            pressReleases: page.pressReleases.map((pr) => ({
              title: pr.title,
              date: pr.date,
              summary: pr.summary,
            })),
          }
        : {}),
    })
  }

  // 9. Legal Pages
  for (const legal of legalData) {
    await upsert(payload, 'legal-pages', legal.slug, {
      title: legal.name,
      lastUpdated: legal.lastUpdated,
      content: sectionsToLexical(legal.sections),
    })
  }

  // 10. Resources
  for (const r of resourcesData) {
    await upsert(payload, 'resources', r.slug, {
      title: r.title,
      description: r.summary,
      type: r.type,
    })
  }

  // 11. Navigation
  try {
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        primaryNav: primaryNav.map((item) => ({
          label: item.label,
          href: item.href,
          children: item.children?.map((child) => ({
            label: child.label,
            href: child.href,
            description: child.description || '',
          })) || [],
          featured: item.featured ? {
            title: item.featured.title,
            description: item.featured.description,
            href: item.featured.href,
          } : {},
        })),
        utilityNav: utilityNav.map((item) => ({ label: item.label, href: item.href })),
        ctaButton: { label: 'Contact Us', href: '/company/contact' },
      },
    })
    log.push('+ global/navigation')
  } catch (err: any) {
    log.push(`! global/navigation: ${err.message}`)
    errors++
  }

  // 12. Footer
  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        columns: [
          { heading: 'Solutions', links: [
            { label: 'Modernize Communications', href: '/solutions/modernize-communications' },
            { label: 'Secure Your Network', href: '/solutions/secure-your-network' },
            { label: 'Optimize with AI', href: '/solutions/optimize-with-ai' },
            { label: 'Move to Cloud', href: '/solutions/move-to-cloud' },
            { label: 'All Solutions', href: '/solutions' },
          ]},
          { heading: 'Platform', links: [
            { label: 'Rainbow', href: '/platform/rainbow' },
            { label: 'OmniSwitch', href: '/platform/omniswitch' },
            { label: 'Stellar Wi-Fi', href: '/platform/stellar-wifi' },
            { label: 'Product Catalog', href: '/products' },
          ]},
          { heading: 'Company', links: [
            { label: 'About ALE', href: '/company/about' },
            { label: 'Careers', href: '/company/careers' },
            { label: 'Newsroom', href: '/company/newsroom' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/company/contact' },
          ]},
          { heading: 'Resources', links: [
            { label: 'Resources', href: '/resources' },
            { label: 'Support', href: '/support' },
            { label: 'Developers', href: '/developers' },
            { label: 'Partners', href: '/partners' },
          ]},
        ],
        legal: {
          copyright: '© 2026 Alcatel-Lucent Enterprise. All rights reserved.',
          links: [
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Terms of Use', href: '/legal/terms' },
            { label: 'Cookie Policy', href: '/legal/cookies' },
            { label: 'Disclaimer', href: '/legal/disclaimer' },
          ],
        },
        social: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/company/alcatel-lucent-enterprise/' },
          { platform: 'twitter', url: 'https://twitter.com/ALaboratoire' },
          { platform: 'youtube', url: 'https://www.youtube.com/user/enterpriseALU' },
        ],
      },
    })
    log.push('+ global/footer')
  } catch (err: any) {
    log.push(`! global/footer: ${err.message}`)
    errors++
  }

  // 13. Site Config
  try {
    await payload.updateGlobal({
      slug: 'site-config',
      data: {
        siteName: 'Alcatel-Lucent Enterprise',
        siteUrl: 'https://www.al-enterprise.com',
        defaultSeo: {
          metaTitle: 'Alcatel-Lucent Enterprise | Enterprise Technology for the AI Era',
          metaDescription: 'Enterprise technology that transforms industries. Cloud communications, secure networking, and AI-driven operations.',
        },
      },
    })
    log.push('+ global/site-config')
  } catch (err: any) {
    log.push(`! global/site-config: ${err.message}`)
    errors++
  }

  return { created, skipped, errors, log }
}

// ── Route Handler ────────────────────────────────────────────

export async function POST(request: Request) {
  // Auth check: require seed secret or authenticated admin
  const seedSecret = request.headers.get('x-seed-secret')
  const payloadSecret = process.env.PAYLOAD_SECRET

  if (seedSecret !== payloadSecret) {
    // Fall back to checking for an authenticated admin user
    const payload = await getPayload({ config })
    const authHeader = request.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const { user } = await payload.auth({ headers: request.headers as any })
        if (!user || (user as any).role !== 'admin') {
          return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
        }
      } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
    } else {
      return NextResponse.json({ error: 'Auth required. Send x-seed-secret header or Bearer token.' }, { status: 401 })
    }
  }

  const payload = await getPayload({ config })
  const result = await seed(payload)

  return NextResponse.json({
    message: 'Migration complete',
    ...result,
  })
}
