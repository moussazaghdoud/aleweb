/**
 * Manual Reindex Script
 *
 * Usage:
 *   npx tsx scripts/reindex.ts          # Reindex all collections
 *   npx tsx scripts/reindex.ts Product  # Reindex only Products
 *
 * Requires DATABASE_URI and PAYLOAD_SECRET to be set.
 */

import 'dotenv/config'

async function main() {
  const type = process.argv[2] as string | undefined

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const secret = process.env.PAYLOAD_SECRET

  if (!secret) {
    console.error('Error: PAYLOAD_SECRET environment variable is required')
    process.exit(1)
  }

  console.log(`Reindexing${type ? ` type: ${type}` : ' all collections'}...`)
  console.log(`Target: ${baseUrl}`)

  const body = type ? JSON.stringify({ type }) : '{}'

  const res = await fetch(`${baseUrl}/api/search/reindex`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secret}`,
      'Content-Type': 'application/json',
    },
    body,
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`Reindex failed (${res.status}):`, err)
    process.exit(1)
  }

  const data = await res.json()
  console.log('\nReindex complete:')
  console.log(JSON.stringify(data, null, 2))
}

main().catch((err) => {
  console.error('Script error:', err)
  process.exit(1)
})
