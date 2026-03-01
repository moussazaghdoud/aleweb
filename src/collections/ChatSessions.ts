import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '@/access/roles'

export const ChatSessions: CollectionConfig = {
  slug: 'chat-sessions',
  admin: {
    useAsTitle: 'sessionId',
    defaultColumns: ['sessionId', 'status', 'messageCount', 'createdAt'],
    description: 'AI chatbot conversation sessions (read-only view).',
    group: 'Chat',
  },
  access: {
    create: () => false, // Sessions are created programmatically
    read: isAdminOrEditor,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'sessionId',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: 'visitorId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Escalated', value: 'escalated' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'agentId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'messageCount',
      type: 'number',
      admin: { readOnly: true },
    },
  ],
}
