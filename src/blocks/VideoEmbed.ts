import type { Block } from 'payload'

export const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      admin: { description: 'YouTube, Vimeo, or MP4 URL' },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
