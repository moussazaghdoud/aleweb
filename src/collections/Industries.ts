import type { CollectionConfig } from 'payload'
import { editorAccess, publishedOnly } from '@/access/roles'
import { protectDeletion } from '@/hooks/protectDeletion'
import { afterChangeSyncHook, afterDeleteSyncHook } from '@/lib/search/hooks'
import { adaptIndustry } from '@/lib/search/hook-adapters'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/industries/${data.slug}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  hooks: {
    beforeDelete: [protectDeletion('industries', ['healthcare', 'education', 'hospitality', 'government', 'transportation', 'energy', 'manufacturing', 'retail'])],
    afterChange: [afterChangeSyncHook('Industry', adaptIndustry)],
    afterDelete: [afterDeleteSyncHook('Industry')],
  },
  access: {
    ...editorAccess,
    read: publishedOnly,
  },
  fields: [
    {
      name: 'name',
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
      name: 'tagline',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Icon identifier (e.g. "healthcare", "education")' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'solutions',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'customers',
      type: 'array',
      maxRows: 10,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'detail', type: 'text', localized: true },
      ],
    },
    {
      name: 'productNames',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
      ],
    },
    {
      name: 'subPages',
      type: 'array',
      admin: { description: 'Sub-pages within this industry (e.g. Digital Health, Senior Living)' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'slug', type: 'text', required: true },
      ],
    },
    // ---- SEO ----
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
