/**
 * Golden Query Tests
 *
 * Validates that the search engine returns expected results for
 * representative ALE queries. Runs against the InMemorySearchProvider
 * with a fixture dataset — no database required.
 *
 * Run: npx tsx src/lib/search/__tests__/golden.test.ts
 */

import { InMemorySearchProvider } from '../providers/in-memory'
import type { SearchDocument, DocType } from '../types'

// ── Test Fixtures ──────────────────────────────────────────

const fixtures: SearchDocument[] = [
  { id: 'Platform:rainbow', type: 'Platform', slug: 'rainbow', href: '/platform/rainbow', title: 'Rainbow', tagline: 'Cloud Communications Platform', description: 'Enterprise CPaaS and UCaaS platform for collaboration, messaging, and video.', body: 'cloud communications unified collaboration messaging video conferencing', keywords: 'rainbow cpaas ucaas communications', locale: 'en', boost: 5 },
  { id: 'Platform:stellar-wifi', type: 'Platform', slug: 'stellar-wifi', href: '/platform/stellar-wifi', title: 'OmniAccess Stellar Wi-Fi', tagline: 'Enterprise Wireless LAN', description: 'High-performance wireless access points for enterprise deployments.', body: 'wifi wireless access point enterprise indoor outdoor', keywords: 'stellar wifi wlan omniaccess', locale: 'en', boost: 4 },
  { id: 'Product:omniswitch-6860', type: 'Product', slug: 'omniswitch-6860', href: '/products/switches/omniswitch-6860', title: 'OmniSwitch 6860', tagline: 'Stackable LAN Switch', description: 'High-performance stackable gigabit Ethernet switch for campus networks.', body: 'gigabit ethernet PoE zero-touch provisioning campus edge', keywords: 'omniswitch 6860 switches', category: 'switches', locale: 'en', boost: 3 },
  { id: 'Product:omniswitch-9900', type: 'Product', slug: 'omniswitch-9900', href: '/products/switches/omniswitch-9900', title: 'OmniSwitch 9900', tagline: 'Core Chassis Switch', description: 'Modular core switch for data center and campus backbone.', body: 'chassis modular core data center backbone high availability', keywords: 'omniswitch 9900 switches', category: 'switches', locale: 'en', boost: 2 },
  { id: 'Solution:modernize-communications', type: 'Solution', slug: 'modernize-communications', href: '/solutions/modernize-communications', title: 'Modernize Communications', tagline: 'Transform your business communications', description: 'Move to cloud-based unified communications with AI-powered collaboration tools.', body: 'cloud migration voip ai collaboration teams', keywords: 'modernize communications', locale: 'en', boost: 2 },
  { id: 'Solution:secure-your-network', type: 'Solution', slug: 'secure-your-network', href: '/solutions/secure-your-network', title: 'Secure Your Network', tagline: 'Zero Trust Network Security', description: 'Implement zero trust network access with micro-segmentation and IoT containment.', body: 'zero trust micro-segmentation iot containment nac', keywords: 'secure network security', locale: 'en', boost: 2 },
  { id: 'Industry:healthcare', type: 'Industry', slug: 'healthcare', href: '/industries/healthcare', title: 'Healthcare', tagline: 'Connected Healthcare Solutions', description: 'Digital healthcare solutions for hospitals, clinics, and senior living facilities.', body: 'hospital clinic patient nurse call alarm telemedicine', keywords: 'healthcare medical hospital', industry: 'healthcare', locale: 'en', boost: 0 },
  { id: 'Industry:education', type: 'Industry', slug: 'education', href: '/industries/education', title: 'Education', tagline: 'Smart Campus Solutions', description: 'Connected campus solutions for universities and K-12 schools.', body: 'campus university school k12 student classroom digital learning', keywords: 'education campus school university', industry: 'education', locale: 'en', boost: 0 },
  { id: 'Blog:ai-networking', type: 'Blog', slug: 'ai-networking', href: '/blog/ai-networking', title: 'AI in Enterprise Networking', tagline: 'How AI is transforming network management', description: 'Explore how artificial intelligence is revolutionizing enterprise network operations.', body: 'machine learning anomaly detection predictive analytics', keywords: 'ai networking article blog', category: 'Artificial Intelligence', locale: 'en', publishedAt: '2025-12-15', boost: 0, meta: { author: 'ALE Team', date: '2025-12-15' } },
  { id: 'Service:support', type: 'Service', slug: 'support', href: '/services/support', title: 'Support Services', tagline: 'Enterprise-Grade Support', description: 'Global support services with 24/7 technical assistance and SLA guarantees.', body: 'technical support sla ticket maintenance', keywords: 'support service help', locale: 'en', boost: 0 },
  { id: 'Company:contact', type: 'Company', slug: 'contact', href: '/company/contact', title: 'Contact Us', tagline: 'Get in Touch', description: 'Contact Alcatel-Lucent Enterprise sales, support, or general inquiries.', body: 'sales inquiry phone email', keywords: 'contact company', locale: 'en', boost: 0 },
  { id: 'Resource:dan-whitepaper', type: 'Resource', slug: 'dan-whitepaper', href: '/resources#dan-whitepaper', title: 'Digital Age Networking Whitepaper', tagline: 'whitepaper', description: 'Building autonomous enterprise networks with ALE Digital Age Networking.', body: 'autonomous network digital age', keywords: 'dan whitepaper resource download', category: 'whitepaper', locale: 'en', boost: 0, meta: { resourceType: 'whitepaper' } },
  { id: 'Legal:privacy', type: 'Legal', slug: 'privacy', href: '/legal/privacy', title: 'Privacy Policy', tagline: 'Legal document', description: 'How Alcatel-Lucent Enterprise collects, uses, and protects your personal data.', body: 'gdpr data protection cookies personal information', keywords: 'privacy legal policy terms', locale: 'en', boost: -2 },
  { id: 'Partner:business-partners', type: 'Partner', slug: 'business-partners', href: '/partners/business-partners', title: 'Business Partners', tagline: 'Partner with ALE', description: 'Join the ALE partner ecosystem and grow your business with enterprise solutions.', body: 'channel partner reseller distributor', keywords: 'business partners', locale: 'en', boost: 0 },
]

// ── Test Runner ────────────────────────────────────────────

type TestCase = {
  name: string
  query: string
  expectFirstId?: string
  expectFirstType?: DocType
  expectType?: DocType
  minResults?: number
}

const tests: TestCase[] = [
  // Exact match
  { name: 'Exact: Rainbow', query: 'Rainbow', expectFirstId: 'Platform:rainbow', minResults: 1 },
  { name: 'Exact: OmniSwitch', query: 'OmniSwitch', expectFirstType: 'Product', minResults: 2 },

  // Prefix match
  { name: 'Prefix: Rainb', query: 'Rainb', expectFirstId: 'Platform:rainbow' },
  { name: 'Prefix: Omni', query: 'Omni', minResults: 2 },

  // Typo tolerance (trigram)
  { name: 'Typo: OmniSwich', query: 'OmniSwich', minResults: 1 },
  { name: 'Typo: Rainbo', query: 'Rainbo', expectFirstId: 'Platform:rainbow' },

  // Multi-word
  { name: 'Multi: cloud communications', query: 'cloud communications', minResults: 1 },
  { name: 'Multi: zero trust', query: 'zero trust', expectType: 'Solution', minResults: 1 },

  // Deep content search
  { name: 'Body: zero-touch provisioning', query: 'zero-touch provisioning', minResults: 1 },

  // Industry
  { name: 'Industry: healthcare', query: 'healthcare', expectType: 'Industry', minResults: 1 },
  { name: 'Industry: education', query: 'education', expectType: 'Industry', minResults: 1 },

  // Resources (previously not indexed)
  { name: 'Resource: whitepaper', query: 'whitepaper', expectType: 'Resource', minResults: 1 },

  // Legal (previously not indexed)
  { name: 'Legal: privacy', query: 'privacy', expectType: 'Legal', minResults: 1 },

  // Pinned results
  { name: 'Pinned: contact', query: 'contact', expectFirstId: 'Company:contact' },
  { name: 'Pinned: support', query: 'support', expectFirstId: 'Service:support' },
]

async function runTests() {
  const provider = new InMemorySearchProvider()

  // Index all fixtures
  const byType = new Map<DocType, SearchDocument[]>()
  for (const doc of fixtures) {
    const arr = byType.get(doc.type) || []
    arr.push(doc)
    byType.set(doc.type, arr)
  }
  for (const [type, docs] of byType) {
    await provider.indexByType(type, docs)
  }

  let passed = 0
  let failed = 0

  for (const test of tests) {
    const result = await provider.search({ q: test.query })
    const errors: string[] = []

    if (test.minResults !== undefined && result.total < test.minResults) {
      errors.push(`expected >= ${test.minResults} results, got ${result.total}`)
    }

    if (test.expectFirstId && result.results[0]?.id !== test.expectFirstId) {
      errors.push(`expected first result "${test.expectFirstId}", got "${result.results[0]?.id || 'none'}"`)
    }

    if (test.expectFirstType && result.results[0]?.type !== test.expectFirstType) {
      errors.push(`expected first result type "${test.expectFirstType}", got "${result.results[0]?.type || 'none'}"`)
    }

    if (test.expectType) {
      const hasType = result.results.some(r => r.type === test.expectType)
      if (!hasType) {
        errors.push(`expected at least one result of type "${test.expectType}"`)
      }
    }

    if (errors.length > 0) {
      console.log(`  FAIL  ${test.name}: ${errors.join('; ')}`)
      failed++
    } else {
      console.log(`  PASS  ${test.name}`)
      passed++
    }
  }

  console.log(`\n${passed}/${passed + failed} tests passed`)

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Test runner error:', err)
  process.exit(1)
})
