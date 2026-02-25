import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Product Manager', value: 'product-manager' },
        { label: 'Regional Marketer', value: 'regional-marketer' },
        { label: 'Legal Approver', value: 'legal-approver' },
        { label: 'Reviewer', value: 'reviewer' },
      ],
      access: {
        update: isAdminFieldLevel,
      },
    },
  ],
}
