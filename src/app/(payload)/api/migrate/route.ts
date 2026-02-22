/**
 * POST /api/migrate
 *
 * Explicitly pushes the Payload CMS database schema to PostgreSQL.
 * This creates all tables needed by the collections and globals.
 * Protected: requires the seed secret.
 *
 * Usage:
 *   curl -X POST https://your-app.up.railway.app/api/migrate \
 *     -H "x-seed-secret: <PAYLOAD_SECRET>"
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

    // Push schema to database (creates/updates all tables)
    if (typeof db.push === 'function') {
      await db.push({ forceAcceptWarning: true })
      return NextResponse.json({ message: 'Schema pushed successfully via push()' })
    }

    // Fallback: try running migrations
    if (typeof db.migrate === 'function') {
      await db.migrate()
      return NextResponse.json({ message: 'Migrations completed successfully' })
    }

    return NextResponse.json({ error: 'No push or migrate method available on db adapter', methods: Object.keys(db) }, { status: 500 })
  } catch (err: any) {
    return NextResponse.json({
      error: 'Migration failed',
      details: err?.message || String(err),
    }, { status: 500 })
  }
}
