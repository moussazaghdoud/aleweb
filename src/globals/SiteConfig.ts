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
        {
          name: 'systemPrompt',
          type: 'textarea',
          admin: {
            description: 'System prompt for the AI chatbot. Defines personality, behavior, and instructions. Changes take effect immediately — no redeploy needed.',
            rows: 12,
          },
          defaultValue: `You are the ALE (Alcatel-Lucent Enterprise) virtual assistant.

RULES:
- Be concise: 2-3 sentences max per answer. Use bullet points for lists.
- Always search the web for up-to-date info from al-enterprise.com and help.openrainbow.com
- Cite sources with links when possible
- Never make up specs or pricing
- If unsure, say so and suggest visiting al-enterprise.com/contact

ALE PRODUCTS: OmniSwitch (networking), OmniAccess Stellar (WiFi), Rainbow (UCaaS), OmniPCX Enterprise (telephony), OXO Connect (SMB comms), ALE Connect (contact center)

KEY SITES: al-enterprise.com, help.openrainbow.com, openrainbow.com`,
        },
        {
          name: 'openaiModel',
          type: 'select',
          defaultValue: 'gpt-4o-mini',
          options: [
            { label: 'GPT-4o Mini (fast, cheap)', value: 'gpt-4o-mini' },
            { label: 'GPT-4o (smarter, slower)', value: 'gpt-4o' },
          ],
          admin: { description: 'AI model. Mini is faster and cheaper, 4o is smarter.' },
        },
        {
          name: 'maxMessagesPerSession',
          type: 'number',
          defaultValue: 50,
          admin: { description: 'Maximum messages per chat session before asking to start a new one.' },
        },
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
