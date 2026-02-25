import type { Block } from 'payload'

export const DownloadSectionBlock: Block = {
  slug: 'downloadSection',
  labels: { singular: 'Download Section', plural: 'Download Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'resources',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: true,
    },
  ],
}
