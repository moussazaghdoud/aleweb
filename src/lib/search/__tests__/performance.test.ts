/**
 * Performance Tests
 *
 * Runs 100 diverse queries and asserts average latency is under 10ms.
 *
 * Run: npx tsx src/lib/search/__tests__/performance.test.ts
 */

import { InMemorySearchProvider } from '../providers/in-memory'
import type { SearchDocument, DocType } from '../types'

const types: DocType[] = ['Product', 'Solution', 'Platform', 'Industry', 'Service', 'Blog', 'Company', 'Partner', 'Resource', 'Legal']

// Generate a larger fixture set
function generateFixtures(count: number): SearchDocument[] {
  const docs: SearchDocument[] = []
  const words = ['network', 'cloud', 'switch', 'wireless', 'security', 'communications', 'enterprise', 'digital', 'platform', 'solution', 'access', 'management', 'analytics', 'IoT', 'AI', 'unified', 'collaboration']

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    const w1 = words[i % words.length]
    const w2 = words[(i + 3) % words.length]
    docs.push({
      id: `${type}:test-${i}`,
      type,
      slug: `test-${i}`,
      href: `/${type.toLowerCase()}/test-${i}`,
      title: `${w1} ${w2} ${i}`,
      tagline: `A ${type.toLowerCase()} for ${w1}`,
      description: `Enterprise ${w1} ${w2} solution for modern businesses. Featuring ${words[(i + 5) % words.length]} capabilities.`,
      body: words.slice(0, 8).join(' '),
      keywords: `${w1} ${w2} test-${i}`,
      locale: 'en',
      boost: 0,
    })
  }
  return docs
}

const queries = [
  'network', 'cloud', 'switch', 'wireless', 'security',
  'communications', 'enterprise', 'digital', 'platform', 'solution',
  'access', 'management', 'analytics', 'IoT', 'AI',
  'unified', 'collaboration', 'network switch', 'cloud security',
  'enterprise wireless', 'digital platform', 'unified communications',
  'net', 'clo', 'swi', 'wir', 'sec',
  'comm', 'ent', 'dig', 'plat', 'sol',
  'ntwrk', 'cluod', 'swtch', 'wirless', 'secrity', // typos
  'network management analytics', 'cloud security platform',
  'enterprise digital collaboration', 'wireless access IoT',
  'unified communications AI', 'abc', 'xyz', 'test-1',
  'modern business', 'feature capability', 'solution enterprise',
  'access point', 'data center', 'campus backbone',
]

async function runPerfTest() {
  const provider = new InMemorySearchProvider()
  const fixtures = generateFixtures(200) // 200 docs = larger than real site

  const byType = new Map<DocType, SearchDocument[]>()
  for (const doc of fixtures) {
    const arr = byType.get(doc.type) || []
    arr.push(doc)
    byType.set(doc.type, arr)
  }
  for (const [type, docs] of byType) {
    await provider.indexByType(type, docs)
  }

  const times: number[] = []
  const iterations = 100

  for (let i = 0; i < iterations; i++) {
    const q = queries[i % queries.length]
    const start = performance.now()
    await provider.search({ q })
    times.push(performance.now() - start)
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length
  const sorted = [...times].sort((a, b) => a - b)
  const p50 = sorted[Math.floor(sorted.length * 0.5)]
  const p95 = sorted[Math.floor(sorted.length * 0.95)]
  const p99 = sorted[Math.floor(sorted.length * 0.99)]
  const max = sorted[sorted.length - 1]

  console.log(`Performance Results (${iterations} queries, ${fixtures.length} docs):`)
  console.log(`  avg: ${avg.toFixed(2)}ms`)
  console.log(`  p50: ${p50.toFixed(2)}ms`)
  console.log(`  p95: ${p95.toFixed(2)}ms`)
  console.log(`  p99: ${p99.toFixed(2)}ms`)
  console.log(`  max: ${max.toFixed(2)}ms`)

  if (avg > 10) {
    console.log(`\n  FAIL  Average latency ${avg.toFixed(2)}ms exceeds 10ms target`)
    process.exit(1)
  } else {
    console.log(`\n  PASS  Average latency ${avg.toFixed(2)}ms is within 10ms target`)
  }
}

runPerfTest().catch((err) => {
  console.error('Performance test error:', err)
  process.exit(1)
})
