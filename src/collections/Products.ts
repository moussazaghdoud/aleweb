import type { CollectionConfig } from 'payload'
import { productManagerAccess, publishedOnly } from '@/access/roles'
import { protectDeletion } from '@/hooks/protectDeletion'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'subcategory', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/products/${data.category}/${data.slug}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  hooks: {
    beforeDelete: [protectDeletion('products', ['omniswitch', 'omniaccess-stellar', 'omnipcx-enterprise', 'rainbow'])],
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
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Network Switches', value: 'switches' },
        { label: 'Wireless LAN', value: 'wlan' },
        { label: 'Phones & Devices', value: 'devices' },
        { label: 'Contact Center & Applications', value: 'applications' },
        { label: 'Ecosystem Integration', value: 'integration' },
        { label: 'Communications & Network Management', value: 'management' },
        { label: 'Communication Platforms', value: 'platforms' },
      ],
    },
    {
      name: 'subcategory',
      type: 'text',
      localized: true,
      admin: { position: 'sidebar' },
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
      admin: { position: 'sidebar' },
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
