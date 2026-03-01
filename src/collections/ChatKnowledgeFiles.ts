import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/roles'

export const ChatKnowledgeFiles: CollectionConfig = {
  slug: 'chat-knowledge-files',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'status', 'createdAt'],
    description: 'Documents indexed in the AI chatbot knowledge base (OpenAI vector store).',
    group: 'Chat',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    mimeTypes: [
      'application/pdf',
      'text/plain',
      'text/markdown',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    staticDir: 'uploads/knowledge',
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      admin: { readOnly: true, description: 'Original filename (auto-populated from upload)' },
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
    afterChange: [
      async ({ doc, operation, req }) => {
        // Only process on create (new upload)
        if (operation !== 'create') return doc

        try {
          const { uploadFileToVectorStore } = await import('@/lib/chat/openai')
          const fs = await import('fs')
          const path = await import('path')

          // Read the uploaded file
          const filePath = path.join(process.cwd(), 'uploads/knowledge', doc.filename)
          if (!fs.existsSync(filePath)) {
            console.warn('[Chat] Upload file not found at', filePath)
            return doc
          }

          const buffer = fs.readFileSync(filePath)
          const { fileId, vectorStoreId } = await uploadFileToVectorStore(
            buffer,
            doc.filename,
          )

          // Update the document with OpenAI IDs
          await req.payload.update({
            collection: 'chat-knowledge-files',
            id: doc.id,
            data: {
              openaiFileId: fileId,
              vectorStoreId,
              status: 'indexed',
            },
          })

          console.log('[Chat] File indexed:', doc.filename, '→', fileId)
        } catch (err: any) {
          console.error('[Chat] File indexing failed:', err.message)
          await req.payload.update({
            collection: 'chat-knowledge-files',
            id: doc.id,
            data: {
              status: 'error',
              errorMessage: err.message?.slice(0, 200),
            },
          })
        }

        return doc
      },
    ],
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
