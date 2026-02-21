import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/roles'

export const Redirects: GlobalConfig = {
  slug: 'redirects',
  label: 'Redirects',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'rules',
      type: 'array',
      admin: { description: 'URL redirect rules (301 permanent redirects)' },
      fields: [
        {
          name: 'source',
          type: 'text',
          required: true,
          admin: { description: 'Source path (e.g. /old-page)' },
        },
        {
          name: 'destination',
          type: 'text',
          required: true,
          admin: { description: 'Destination path or URL (e.g. /new-page)' },
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: '301',
          options: [
            { label: '301 - Permanent', value: '301' },
            { label: '302 - Temporary', value: '302' },
          ],
        },
        {
          name: 'active',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
