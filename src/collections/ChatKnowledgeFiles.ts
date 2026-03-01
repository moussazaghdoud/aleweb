import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/roles'

export const ChatKnowledgeFiles: CollectionConfig = {
  slug: 'chat-knowledge-files',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'status', 'createdAt'],
    description: 'Documents indexed in the AI chatbot knowledge base (OpenAI vector store). Upload files via the /api/chat/knowledge endpoint.',
    group: 'Chat',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      required: true,
      admin: { description: 'Original filename' },
    },
    {
      name: 'openaiFileId',
      type: 'text',
      admin: { readOnly: true, description: 'OpenAI File ID' },
    },
    {
      name: 'vectorStoreId',
      type: 'text',
      admin: { readOnly: true, description: 'OpenAI Vector Store ID' },
    },
    {
      name: 'fileSize',
      type: 'number',
      admin: { readOnly: true, description: 'File size in bytes' },
    },
    {
      name: 'mimeType',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'processing',
      options: [
        { label: 'Processing', value: 'processing' },
        { label: 'Indexed', value: 'indexed' },
        { label: 'Error', value: 'error' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'errorMessage',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => data?.status === 'error',
      },
    },
  ],
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.openaiFileId) return

        try {
          const { deleteFileFromVectorStore } = await import('@/lib/chat/openai')
          await deleteFileFromVectorStore(doc.openaiFileId)
          console.log('[Chat] File removed from vector store:', doc.openaiFileId)
        } catch (err: any) {
          console.warn('[Chat] Failed to remove file from vector store:', err.message)
        }
      },
    ],
  },
}
