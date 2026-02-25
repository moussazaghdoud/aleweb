import type { CollectionConfig } from 'payload'
import { productManagerAccess, publishedOnly } from '@/access/roles'
import { protectDeletion } from '@/hooks/protectDeletion'

export const Platforms: CollectionConfig = {
  slug: 'platforms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/platform/${data.slug}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  hooks: {
    beforeDelete: [protectDeletion('platforms', ['omniswitch', 'omniaccess-stellar', 'rainbow', 'omnipcx-enterprise'])],
  },
  access: {
    ...productManagerAccess,
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
      name: 'category',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Communications', value: 'communications' },
        { label: 'Networking', value: 'networking' },
        { label: 'Management', value: 'management' },
        { label: 'Connectivity', value: 'connectivity' },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'stat', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
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
