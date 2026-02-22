import type { CollectionConfig } from 'payload'
import { editorAccess } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'createdAt'],
  },
  access: editorAccess,
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'application/pdf'],
    // imageSizes temporarily disabled - will re-enable after verifying uploads work
    // imageSizes: [
    //   { name: 'thumbnail', width: 300, height: 200, position: 'centre' },
    //   { name: 'card', width: 600, height: 400, position: 'centre' },
    //   { name: 'hero', width: 1400, height: 600, position: 'centre' },
    //   { name: 'og', width: 1200, height: 630, position: 'centre' },
    // ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
