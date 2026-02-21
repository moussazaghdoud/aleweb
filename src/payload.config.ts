import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Products } from './collections/Products'
import { BlogPosts } from './collections/BlogPosts'
import { Solutions } from './collections/Solutions'
import { Industries } from './collections/Industries'
import { Platforms } from './collections/Platforms'
import { Services } from './collections/Services'
import { Partners } from './collections/Partners'
import { CompanyPages } from './collections/CompanyPages'
import { LegalPages } from './collections/LegalPages'
import { Resources } from './collections/Resources'

// Globals
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { SiteConfig } from './globals/SiteConfig'
import { Redirects } from './globals/Redirects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // ── Admin Panel ──────────────────────────────────────────────
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— ALE CMS',
      icons: [{ url: '/favicon.ico' }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const base = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'
        const slug = data?.slug || ''
        const collection = collectionConfig?.slug || ''

        // Map collection to URL pattern
        const urlMap: Record<string, string> = {
          'products': `/products/${data?.category || 'switches'}/${slug}`,
          'solutions': `/solutions/${slug}`,
          'industries': `/industries/${slug}`,
          'platforms': `/platform/${slug}`,
          'services': `/services/${slug}`,
          'partners': `/partners/${slug}`,
          'company-pages': `/company/${slug}`,
          'legal-pages': `/legal/${slug}`,
          'blog-posts': `/blog/${slug}`,
          'pages': `/${slug}`,
        }

        const pagePath = urlMap[collection] || `/${slug}`
        return `${base}/api/preview?slug=${encodeURIComponent(pagePath)}&secret=${process.env.PAYLOAD_SECRET}`
      },
      collections: ['products', 'solutions', 'industries', 'platforms', 'services', 'partners', 'company-pages', 'legal-pages', 'blog-posts', 'pages'],
    },
  },

  // ── Collections ──────────────────────────────────────────────
  collections: [
    Users,
    Media,
    Pages,
    Products,
    BlogPosts,
    Solutions,
    Industries,
    Platforms,
    Services,
    Partners,
    CompanyPages,
    LegalPages,
    Resources,
  ],

  // ── Globals ──────────────────────────────────────────────────
  globals: [
    Navigation,
    Footer,
    SiteConfig,
    Redirects,
  ],

  // ── Editor ───────────────────────────────────────────────────
  editor: lexicalEditor(),

  // ── Database ─────────────────────────────────────────────────
  // Automatically switches between PostgreSQL (production) and SQLite (development)
  // based on the DATABASE_URI environment variable prefix.
  db: process.env.DATABASE_URI?.startsWith('postgresql')
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./data/payload.db',
        },
      }),

  // ── i18n / Localization ──────────────────────────────────────
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Français', code: 'fr' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  // ── Image Processing ─────────────────────────────────────────
  sharp,

  // ── Security ─────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',

  // ── TypeScript ───────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
