import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/roles'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Site Configuration',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Alcatel-Lucent Enterprise',
    },
    {
      name: 'siteUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://www.al-enterprise.com',
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true,
          defaultValue: 'Alcatel-Lucent Enterprise | Enterprise Technology for the AI Era' },
        { name: 'metaDescription', type: 'textarea', localized: true,
          defaultValue: 'Enterprise technology that transforms industries. Cloud communications, secure networking, and AI-driven operations.' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'googleAnalyticsId', type: 'text', admin: { description: 'GA4 measurement ID (e.g. G-XXXXXXXXXX)' } },
        { name: 'googleTagManagerId', type: 'text' },
      ],
    },
  ],
}
