import type { Access, FieldAccess } from 'payload'

// ---------- helpers ----------
export const isAdmin: Access = ({ req: { user } }) =>
  user?.role === 'admin'

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor'

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) =>
  user?.role === 'admin'

// ---------- collection-level ----------
export const adminOnly = {
  create: isAdmin,
  read: () => true,
  update: isAdmin,
  delete: isAdmin,
}

export const editorAccess = {
  create: isAdminOrEditor,
  read: () => true,
  update: isAdminOrEditor,
  delete: isAdmin,
}

// ---------- published-only for frontend queries ----------
export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
