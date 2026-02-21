import type { CollectionConfig } from 'payload'
import { editorAccess, publishedOnly } from '@/access/roles'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/legal/${data.slug}`,
    },
  },
  versions: { drafts: true },
  access: {
    ...editorAccess,
    read: publishedOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'lastUpdated', type: 'date', admin: { position: 'sidebar' } },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
