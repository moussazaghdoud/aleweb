import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '@/access/roles'

export const PlanLeads: CollectionConfig = {
  slug: 'plan-leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'goal', 'status', 'createdAt'],
    description: 'Leads captured when users request their AI-generated plan by email.',
  },
  access: {
    create: () => true, // Public — front-end submissions
    read: isAdminOrEditor,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'goal',
      type: 'textarea',
      admin: {
        description: 'The business goal the user entered.',
      },
    },
    {
      name: 'planJson',
      type: 'json',
      admin: {
        description: 'Full AI-generated plan payload.',
      },
    },
    {
      name: 'locale',
      type: 'text',
      defaultValue: 'en',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Emailed', value: 'emailed' },
        { label: 'Email Failed', value: 'email_failed' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Converted', value: 'converted' },
      ],
      access: {
        create: () => false, // Submitters cannot set status
      },
    },
  ],
}
