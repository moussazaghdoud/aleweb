import type { CollectionConfig } from 'payload'
import { editorAccess, publishedOnly } from '@/access/roles'
import { allBlocks } from '@/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/${data.slug === 'home' ? '' : data.slug ?? ''}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  access: {
    ...editorAccess,
    read: publishedOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
        description: 'Parent page for breadcrumb hierarchy',
      },
    },
    // ---- Page Builder: array of reusable blocks ----
    {
      name: 'sections',
      type: 'blocks',
      blocks: allBlocks,
      localized: true,
    },
    // ---- SEO ----
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true,
          admin: { description: 'Override the page title for search engines (max 60 chars)' } },
        { name: 'metaDescription', type: 'textarea', localized: true,
          admin: { description: 'Page description for search results (max 160 chars)' } },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false,
          admin: { description: 'Prevent this page from being indexed by search engines' } },
      ],
    },
  ],
}
