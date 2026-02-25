import type { Block } from 'payload'

export const TabsContentBlock: Block = {
  slug: 'tabsContent',
  labels: { singular: 'Tabs Content', plural: 'Tabs Content' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'tabs',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'content', type: 'richText', required: true, localized: true },
      ],
    },
  ],
}
