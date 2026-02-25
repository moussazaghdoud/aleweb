import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/roles'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
      localized: true,
      defaultValue: 'Intelligent Networks. Cloud Services. AI Operations. One Platform.',
    },
    {
      name: 'heroSubheading',
      type: 'textarea',
      localized: true,
      defaultValue:
        'From OmniSwitch infrastructure and Stellar Wi-Fi to Rainbow cloud communications and AI-driven operations — ALE connects, secures, and automates the enterprises that power the world.',
    },
    {
      name: 'heroVideoUrl',
      type: 'text',
      admin: { description: 'URL to the hero background video (MP4)' },
    },
    {
      name: 'heroCtaButtons',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
