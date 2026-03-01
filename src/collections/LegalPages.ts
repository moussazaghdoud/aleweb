import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { legalApproverAccess, publishedOnly } from '@/access/roles'
import { afterChangeSyncHook, afterDeleteSyncHook } from '@/lib/search/hooks'
import { adaptLegal } from '@/lib/search/hook-adapters'

const enforceApproval: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'update' && data?._status === 'published') {
    if (data?.approvalStatus !== 'approved' && req.user?.role !== 'admin') {
      throw new Error('Cannot publish — approval status must be "approved" first.')
    }
  }
  return data
}

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'approvalStatus', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/legal/${data.slug}`,
    },
  },
  versions: { drafts: { autosave: { interval: 30000 } }, maxPerDoc: 25 },
  hooks: {
    beforeChange: [enforceApproval],
    afterChange: [afterChangeSyncHook('Legal', adaptLegal)],
    afterDelete: [afterDeleteSyncHook('Legal')],
  },
  access: {
    ...legalApproverAccess,
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
