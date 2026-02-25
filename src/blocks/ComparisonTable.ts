import type { Block } from 'payload'

export const ComparisonTableBlock: Block = {
  slug: 'comparisonTable',
  labels: { singular: 'Comparison Table', plural: 'Comparison Tables' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 5,
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', required: true, localized: true },
        {
          name: 'values',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true, localized: true },
          ],
        },
      ],
    },
  ],
}
