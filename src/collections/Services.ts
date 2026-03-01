import type { CollectionConfig } from 'payload'
import { editorAccess, publishedOnly } from '@/access/roles'
import { afterChangeSyncHook, afterDeleteSyncHook } from '@/lib/search/hooks'
import { adaptService } from '@/lib/search/hook-adapters'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/services/${data.slug}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  hooks: {
    afterChange: [afterChangeSyncHook('Service', adaptService)],
    afterDelete: [afterDeleteSyncHook('Service')],
  },
  access: {
    ...editorAccess,
    read: publishedOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'tagline', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'offerings',
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
