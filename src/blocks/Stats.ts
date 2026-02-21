import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats Section', plural: 'Stats Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'stat', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'inline',
      options: [
        { label: 'Inline Row', value: 'inline' },
        { label: 'Grid Cards', value: 'grid' },
      ],
    },
  ],
}
