import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/roles'

/**
 * Minimal upload collection for knowledge base files (PDF, TXT, MD, DOCX).
 * Referenced by KnowledgeSources via an `upload` field.
 * Hidden from admin nav — accessed only through KnowledgeSources.
 */
export const KnowledgeUploads: CollectionConfig = {
  slug: 'knowledge-uploads',
  upload: {
    staticDir: 'knowledge-uploads',
    mimeTypes: [
      'application/pdf',
      'text/plain',
      'text/markdown',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  admin: {
    hidden: true,
    group: 'Chat',
  },
  access: adminOnly,
  fields: [],
}
