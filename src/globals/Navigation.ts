import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/access/roles'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation Menu',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'primaryNav',
      type: 'array',
      label: 'Primary Navigation',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', required: true },
            { name: 'description', type: 'text', localized: true },
          ],
        },
        {
          name: 'featured',
          type: 'group',
          admin: { description: 'Optional featured callout in the dropdown' },
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'text', localized: true },
            { name: 'href', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'utilityNav',
      type: 'array',
      label: 'Utility Navigation',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        { name: 'label', type: 'text', localized: true, defaultValue: 'Contact Us' },
        { name: 'href', type: 'text', defaultValue: '/company/contact' },
      ],
    },
  ],
}
