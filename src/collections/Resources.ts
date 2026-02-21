import type { CollectionConfig } from 'payload'
import { editorAccess, publishedOnly } from '@/access/roles'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', '_status', 'updatedAt'],
  },
  versions: { drafts: true },
  access: {
    ...editorAccess,
    read: publishedOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'description', type: 'textarea', required: true, localized: true },
    {
      name: 'type',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        { label: 'White Paper', value: 'whitepaper' },
        { label: 'Case Study', value: 'case-study' },
        { label: 'Datasheet', value: 'datasheet' },
        { label: 'Video', value: 'video' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Guide', value: 'guide' },
      ],
    },
    { name: 'href', type: 'text', admin: { description: 'External or internal link' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'file', type: 'upload', relationTo: 'media', admin: { description: 'Downloadable file (PDF, etc.)' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
      ],
    },
  ],
}
