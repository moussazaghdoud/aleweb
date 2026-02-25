import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { editorAccess, publishedOnly } from '@/access/roles'
import { allBlocks } from '@/blocks'

const enforceApproval: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'update' && data?._status === 'published') {
    if (data?.approvalStatus !== 'approved' && req.user?.role !== 'admin') {
      throw new Error('Cannot publish — approval status must be "approved" first.')
    }
  }
  return data
}

export const CompanyPages: CollectionConfig = {
  slug: 'company-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'approvalStatus', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/company/${data.slug}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  hooks: {
    beforeChange: [enforceApproval],
  },
  access: {
    ...editorAccess,
    read: publishedOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'approvalStatus',
      type: 'select',
      defaultValue: 'pending',
      admin: { position: 'sidebar', description: 'Must be "Approved" before publishing' },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'approvalNotes',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Notes from approver' },
    },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'contentSections',
      type: 'array',
      localized: true,
      admin: { description: 'Simple text sections (title + content pairs)' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'content', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      admin: { description: 'Key statistics (About page)' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'offices',
      type: 'array',
      admin: { description: 'Office locations (Contact page)' },
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'pressReleases',
      type: 'array',
      admin: { description: 'Press releases (Newsroom page)' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'date', type: 'date', required: true },
        { name: 'summary', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: allBlocks,
      localized: true,
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
