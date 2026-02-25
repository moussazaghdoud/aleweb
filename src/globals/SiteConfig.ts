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
    {
      name: 'marketing',
      type: 'group',
      label: 'Marketing Integrations',
      fields: [
        { name: 'eloquaSiteId', type: 'text', admin: { description: 'Oracle Eloqua Site ID' } },
        { name: 'eloquaFormActionUrl', type: 'text', admin: { description: 'Eloqua form action URL' } },
        { name: 'eloquaTrackingEnabled', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'consent',
      type: 'group',
      label: 'Cookie Consent',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'OneTrust', value: 'onetrust' },
            { label: 'Cookiebot', value: 'cookiebot' },
            { label: 'Custom Banner', value: 'custom' },
          ],
          defaultValue: 'custom',
        },
        { name: 'scriptUrl', type: 'text', admin: { description: 'External consent script URL (OneTrust/Cookiebot)' } },
        { name: 'domainScript', type: 'text', admin: { description: 'Domain script ID for consent platform' } },
      ],
    },
    {
      name: 'chat',
      type: 'group',
      label: 'Chat Widget',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        {
          name: 'provider',
          type: 'select',
          options: [
            { label: 'Rainbow', value: 'rainbow' },
            { label: 'Intercom', value: 'intercom' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        { name: 'scriptUrl', type: 'text' },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'bottom-right',
          options: [
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
          ],
        },
        { name: 'greeting', type: 'text', localized: true, defaultValue: 'How can we help you?' },
      ],
    },
    {
      name: 'search',
      type: 'group',
      label: 'Search',
      fields: [
        {
          name: 'provider',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Coveo', value: 'coveo' },
            { label: 'Algolia', value: 'algolia' },
          ],
        },
        { name: 'apiKey', type: 'text', admin: { description: 'Search provider API key' } },
        { name: 'organizationId', type: 'text', admin: { description: 'Search provider organization/app ID' } },
      ],
    },
  ],
}
