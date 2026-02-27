import type { Access, FieldAccess } from 'payload'

// ---------- helpers ----------
export const isAdmin: Access = ({ req: { user } }) =>
  user?.role === 'admin'

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor'

export const isProductManager: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'product-manager'

export const isRegionalMarketer: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor' || user?.role === 'regional-marketer'

export const isLegalApprover: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'legal-approver'

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) =>
  user?.role === 'admin'

// ---------- collection-level ----------
export const adminOnly = {
  create: isAdmin,
  read: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}

export const editorAccess = {
  create: isAdminOrEditor,
  read: () => true,
  update: isAdminOrEditor,
  delete: isAdmin,
}

export const productManagerAccess = {
  create: isProductManager,
  read: () => true,
  update: isProductManager,
  delete: isAdmin,
}

export const regionalMarketerAccess = {
  create: isRegionalMarketer,
  read: () => true,
  update: isRegionalMarketer,
  delete: isAdmin,
}

export const legalApproverAccess = {
  create: isAdminOrEditor,
  read: () => true,
  update: isLegalApprover,
  delete: isAdmin,
}

export const reviewerAccess = {
  create: isAdmin,
  read: () => true,
  update: isAdmin,
  delete: isAdmin,
}

// ---------- published-only for frontend queries ----------
export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
