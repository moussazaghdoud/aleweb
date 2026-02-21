/**
 * Content Migration Script
 *
 * Migrates all content from src/data/*.ts files into Payload CMS collections.
 *
 * Prerequisites:
 *   1. Database configured in .env.local (SQLite default, no setup needed)
 *   2. Run: npx payload run scripts/migrate-content.ts
 *      OR:  npm run migrate
 *
 * This script uses Payload's local API (no HTTP server needed).
 * It is idempotent — re-running will skip items whose slugs already exist.
 */

import { getPayload } from 'payload'

// ── Import all existing data ─────────────────────────────────
import { blogData } from '../src/data/blog.ts'
import { companyData } from '../src/data/company.ts'
import { industriesData } from '../src/data/industries.ts'
import { industrySubPagesData } from '../src/data/industry-subpages.ts'
import { legalData } from '../src/data/legal.ts'
import { primaryNav, utilityNav } from '../src/data/navigation.ts'
import { partnersData } from '../src/data/partners.ts'
import { platformData } from '../src/data/platform.ts'
import { catalogProducts, productCategories } from '../src/data/products-catalog.ts'
import { resourcesData } from '../src/data/resources.ts'
import { servicesData } from '../src/data/services.ts'
import { solutionsData } from '../src/data/solutions.ts'
import {
  industries as homepageIndustries,
  outcomeStories,
  solutionPathways,
  trustStats,
} from '../src/data/homepage.ts'

// ── Helpers ──────────────────────────────────────────────────

let created = 0
let skipped = 0
let errors = 0

async function upsert(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  slug: string,
  data: Record<string, unknown>,
) {
  try {
    // Check if item already exists
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
    console.log(`  ✓ ${collection}: ${slug}`)
    return doc
  } catch (err: any) {
    errors++
    console.error(`  ✗ ${collection}: ${slug} — ${err.message}`)
    return null
  }
}

function textToLexical(paragraphs: string[]): any {
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

function sectionsToLexical(sections: { title: string; content: string }[]): any {
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
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ── Main Migration ───────────────────────────────────────────

async function migrate() {
  console.log('\n🚀 ALE CMS — Content Migration\n')
  console.log('Initializing Payload...')

  const payload = await getPayload({
    config: (await import('../src/payload.config.ts')).default,
  })

  console.log('Payload initialized. Starting migration...\n')

  // ── 1. Products ──────────────────────────────────────────
  console.log('📦 Migrating Products...')
  for (const product of catalogProducts) {
    await upsert(payload, 'products', product.slug, {
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory || '',
      features: product.features,
      highlights: product.highlights,
    })
  }

  // ── 2. Industries ────────────────────────────────────────
  console.log('\n🏭 Migrating Industries...')
  for (const industry of industriesData) {
    await upsert(payload, 'industries', industry.slug, {
      name: industry.name,
      tagline: industry.tagline,
      description: industry.description,
      icon: industry.slug,
      solutions: industry.solutions,
      customers: industry.customers,
      productNames: industry.products.map((name) => ({ name })),
      subPages: industry.subPages || [],
    })
  }

  // ── 3. Solutions ─────────────────────────────────────────
  console.log('\n💡 Migrating Solutions...')
  for (const solution of solutionsData) {
    await upsert(payload, 'solutions', solution.slug, {
      name: solution.name,
      tagline: solution.tagline,
      description: solution.description,
      capabilities: solution.capabilities,
      productNames: solution.products.map((name) => ({ name })),
      benefits: solution.benefits,
    })
  }

  // ── 4. Platforms ─────────────────────────────────────────
  console.log('\n🖥️  Migrating Platforms...')
  for (const platform of platformData) {
    await upsert(payload, 'platforms', platform.slug, {
      name: platform.name,
      tagline: platform.tagline,
      description: platform.description,
      category: platform.category,
      features: platform.features,
      highlights: platform.highlights,
    })
  }

  // ── 5. Blog Posts ────────────────────────────────────────
  console.log('\n📝 Migrating Blog Posts...')
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

  // ── 6. Services ──────────────────────────────────────────
  console.log('\n🔧 Migrating Services...')
  for (const service of servicesData) {
    await upsert(payload, 'services', service.slug, {
      name: service.name,
      tagline: service.tagline,
      description: service.description,
      offerings: service.features,
    })
  }

  // ── 7. Partners ──────────────────────────────────────────
  console.log('\n🤝 Migrating Partners...')
  for (const partner of partnersData) {
    await upsert(payload, 'partners', partner.slug, {
      name: partner.name,
      tagline: partner.tagline,
      description: partner.description,
      benefits: partner.features,
    })
  }

  // ── 8. Company Pages ─────────────────────────────────────
  console.log('\n🏢 Migrating Company Pages...')
  for (const page of companyData) {
    await upsert(payload, 'company-pages', page.slug, {
      title: page.name,
      tagline: page.tagline,
      description: page.description,
    })
  }

  // ── 9. Legal Pages ───────────────────────────────────────
  console.log('\n⚖️  Migrating Legal Pages...')
  for (const legal of legalData) {
    await upsert(payload, 'legal-pages', legal.slug, {
      title: legal.name,
      lastUpdated: legal.lastUpdated,
      content: sectionsToLexical(legal.sections),
    })
  }

  // ── 10. Resources ────────────────────────────────────────
  console.log('\n📚 Migrating Resources...')
  for (const resource of resourcesData) {
    await upsert(payload, 'resources', resource.slug, {
      title: resource.title,
      description: resource.summary,
      type: resource.type,
    })
  }

  // ── 11. Navigation (Global) ──────────────────────────────
  console.log('\n🧭 Migrating Navigation...')
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
          featured: item.featured
            ? {
                title: item.featured.title,
                description: item.featured.description,
                href: item.featured.href,
              }
            : {},
        })),
        utilityNav: utilityNav.map((item) => ({
          label: item.label,
          href: item.href,
        })),
        ctaButton: {
          label: 'Contact Us',
          href: '/company/contact',
        },
      },
    })
    console.log('  ✓ Navigation global updated')
  } catch (err: any) {
    console.error(`  ✗ Navigation — ${err.message}`)
    errors++
  }

  // ── 12. Footer (Global) ─────────────────────────────────
  console.log('\n🦶 Migrating Footer...')
  try {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        columns: [
          {
            heading: 'Solutions',
            links: [
              { label: 'Modernize Communications', href: '/solutions/modernize-communications' },
              { label: 'Secure Your Network', href: '/solutions/secure-your-network' },
              { label: 'Optimize with AI', href: '/solutions/optimize-with-ai' },
              { label: 'Move to Cloud', href: '/solutions/move-to-cloud' },
              { label: 'All Solutions', href: '/solutions' },
            ],
          },
          {
            heading: 'Platform',
            links: [
              { label: 'Rainbow', href: '/platform/rainbow' },
              { label: 'OmniSwitch', href: '/platform/omniswitch' },
              { label: 'Stellar Wi-Fi', href: '/platform/stellar-wifi' },
              { label: 'Product Catalog', href: '/products' },
            ],
          },
          {
            heading: 'Company',
            links: [
              { label: 'About ALE', href: '/company/about' },
              { label: 'Careers', href: '/company/careers' },
              { label: 'Newsroom', href: '/company/newsroom' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/company/contact' },
            ],
          },
          {
            heading: 'Resources',
            links: [
              { label: 'Resources', href: '/resources' },
              { label: 'Support', href: '/support' },
              { label: 'Developers', href: '/developers' },
              { label: 'Partners', href: '/partners' },
            ],
          },
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
    console.log('  ✓ Footer global updated')
  } catch (err: any) {
    console.error(`  ✗ Footer — ${err.message}`)
    errors++
  }

  // ── 13. Site Config (Global) ─────────────────────────────
  console.log('\n⚙️  Migrating Site Config...')
  try {
    await payload.updateGlobal({
      slug: 'site-config',
      data: {
        siteName: 'Alcatel-Lucent Enterprise',
        siteUrl: 'https://www.al-enterprise.com',
        defaultSeo: {
          metaTitle: 'Alcatel-Lucent Enterprise | Enterprise Technology for the AI Era',
          metaDescription:
            'Enterprise technology that transforms industries. Cloud communications, secure networking, and AI-driven operations for healthcare, education, hospitality, and more.',
        },
      },
    })
    console.log('  ✓ Site Config global updated')
  } catch (err: any) {
    console.error(`  ✗ Site Config — ${err.message}`)
    errors++
  }

  // ── Summary ──────────────────────────────────────────────
  console.log('\n' + '='.repeat(50))
  console.log(`Migration complete!`)
  console.log(`  ✓ Created: ${created}`)
  console.log(`  → Skipped (already exists): ${skipped}`)
  console.log(`  ✗ Errors: ${errors}`)
  console.log('='.repeat(50) + '\n')

  process.exit(errors > 0 ? 1 : 0)
}

migrate().catch((err) => {
  console.error('Fatal migration error:', err)
  process.exit(1)
})
