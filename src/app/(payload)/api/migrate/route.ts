/**
 * POST /api/migrate
 *
 * Explicitly pushes the Payload CMS database schema to PostgreSQL.
 * This creates all tables needed by the collections and globals.
 * Protected: requires the seed secret.
 *
 * Payload's built-in push only runs in development (NODE_ENV !== 'production'),
 * so this endpoint calls drizzle-kit's pushSchema() directly.
 */

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  const seedSecret = request.headers.get('x-seed-secret')
  const payloadSecret = process.env.PAYLOAD_SECRET

  if (!seedSecret || seedSecret !== payloadSecret) {
    return NextResponse.json({ error: 'Auth required. Send x-seed-secret header.' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })
    const db = payload.db as any

    // Get drizzle-kit's pushSchema function via the adapter
    const { pushSchema } = db.requireDrizzleKit()

    // Push schema to database (creates/alters all tables)
    const result = await pushSchema(
      db.schema,
      db.drizzle,
      db.schemaName ? [db.schemaName] : undefined,
      undefined,
      undefined,
    )

    if (result.warnings?.length) {
      console.warn('[migrate] Warnings:', result.warnings)
    }

    // Apply the schema changes
    await result.apply()

    // Promote user ID 1 to admin (bypasses access control via local API)
    try {
      await payload.update({ collection: 'users', id: 1, data: { role: 'admin' } as any, overrideAccess: true })
    } catch { /* ignore if no user yet */ }

    return NextResponse.json({
      message: 'Schema pushed successfully',
      statements: result.statementsToExecute?.length || 0,
      warnings: result.warnings || [],
      hasDataLoss: result.hasDataLoss || false,
    })
  } catch (err: any) {
    return NextResponse.json({
      error: 'Migration failed',
      details: err?.message || String(err),
    }, { status: 500 })
  }
}
