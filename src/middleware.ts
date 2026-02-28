import { NextRequest, NextResponse } from 'next/server'

/* ================================================================== */
/*  Legacy redirect map: /en/old-path → /new-path                     */
/*  These are static 301s from the ALE legacy site migration.         */
/*  Ad-hoc redirects can still be managed in CMS → Redirects global.  */
/* ================================================================== */

const legacyRedirects: Record<string, string> = {
  // ── Solutions (different slugs) ──
  '/en/solutions/hybrid-workplace': '/solutions/enable-hybrid-work',
  '/en/solutions/iot': '/solutions/iot-networks',
  '/en/solutions/communications-platform-as-a-service-cpaas': '/solutions/cpaas',
  '/en/solutions/data-center': '/solutions/data-center-networking',
  '/en/solutions/video-surveillance': '/solutions/video-surveillance-networking',
  '/en/solutions/sd-wan': '/solutions/sd-wan-sase',
  '/en/solutions/security': '/solutions/network-security',
  '/en/solutions/cloud-communications': '/solutions/move-to-cloud',
  '/en/solutions/wifi-solutions': '/solutions/wifi-solutions',
  '/en/solutions/private-5g-network': '/platform/private-5g',
  '/en/solutions/smb': '/industries/smb',
  '/en/solutions/digital-age-networking/ai-ops-offer': '/solutions/optimize-with-ai',
  // Solutions with exact slug match (strip /en/ prefix only)
  '/en/solutions/digital-age-communications': '/solutions/digital-age-communications',
  '/en/solutions/digital-age-networking': '/solutions/digital-age-networking',
  '/en/solutions/autonomous-network': '/solutions/autonomous-network',
  '/en/solutions/industrial-networks': '/solutions/industrial-networks',
  '/en/solutions/unified-communications': '/solutions/unified-communications',
  '/en/solutions/purple-on-demand': '/solutions/purple-on-demand',
  '/en/solutions/network-as-a-service': '/solutions/network-as-a-service',
  '/en/solutions/business-continuity': '/solutions/business-continuity',
  '/en/solutions/network-security': '/solutions/network-security',

  // ── Industries ──
  '/en/industries/energy-and-utilities': '/industries/energy',
  '/en/industries/government/defense-solutions': '/industries/government/defense',
  '/en/industries/government/public-safety-solutions': '/industries/government/public-safety',
  '/en/industries/government/smart-buildings': '/industries/smart-buildings',

  // ── Company ──
  '/en/company/about-us': '/company/about',
  '/en/company/about-us/executive-team': '/company/executive-team',
  '/en/company/about-us/careers': '/company/careers',
  '/en/company/about-us/esg': '/company/esg',
  '/en/company/news': '/company/newsroom',
  '/en/company/analyst': '/company/analyst-reports',
  '/en/company/customers': '/customers/case-studies',
  '/en/company/ale-worldwide-presence': '/company/contact',
  '/en/company/news/media-resources': '/company/newsroom',
  '/en/company/news/media-resources/logos': '/company/newsroom',

  // ── Services ──
  '/en/services/education-services': '/services/training-services',
  '/en/services/professional-services': '/services/professional-managed-services',

  // ── Products: Stellar APs (16 access points) ──
  '/en/products/wlan/omniaccess-stellar-access-point-1501': '/products/wlan/stellar-ap1501',
  '/en/products/wlan/omniaccess-stellar-access-point-1511': '/products/wlan/stellar-ap1511',
  '/en/products/wlan/omniaccess-stellar-access-point-1521': '/products/wlan/stellar-ap1521',
  '/en/products/wlan/omniaccess-stellar-access-point-1411': '/products/wlan/stellar-ap1411',
  '/en/products/wlan/omniaccess-stellar-access-point-1431': '/products/wlan/stellar-ap1431',
  '/en/products/wlan/omniaccess-stellar-access-point-1451': '/products/wlan/stellar-ap1451',
  '/en/products/wlan/omniaccess-stellar-access-point-1301': '/products/wlan/stellar-ap1301',
  '/en/products/wlan/omniaccess-stellar-access-point-1301h': '/products/wlan/stellar-ap1301h',
  '/en/products/wlan/omniaccess-stellar-access-point-1311': '/products/wlan/stellar-ap1311',
  '/en/products/wlan/omniaccess-stellar-access-point-1320': '/products/wlan/stellar-ap1320',
  '/en/products/wlan/omniaccess-stellar-access-point-1331': '/products/wlan/stellar-ap1331',
  '/en/products/wlan/omniaccess-stellar-access-point-1351': '/products/wlan/stellar-ap1351',
  '/en/products/wlan/omniaccess-stellar-access-point-1561': '/products/wlan/stellar-ap1561',
  '/en/products/wlan/omniaccess-stellar-access-point-1570': '/products/wlan/stellar-ap1570',
  '/en/products/wlan/omniaccess-stellar-access-point-1360': '/products/wlan/stellar-ap1360',
  '/en/products/wlan/omniaccess-stellar-access-point-1261': '/products/wlan/stellar-ap1261',

  // ── Products: other slug changes ──
  '/en/products/devices/ale-aries-headsets': '/products/devices/aries-headsets',
  '/en/products/platforms/omnipcx-enterprise-communication-server': '/products/platforms/omnipcx-enterprise',
  '/en/products/platforms/sip-dect-infrastructure': '/products/platforms/sip-dect-base-stations',
  '/en/products/platforms/dect-infrastructure': '/products/platforms/dect-base-stations',
  '/en/products/applications/ip-desktop-softphone': '/products/applications/voip-softphone',
  '/en/products/applications/ale-softphone': '/products/devices/sip-softphone',
  '/en/products/applications/omnipcx-record-suite': '/products/applications/omnipcx-record',
  '/en/products/communications-management-security/omnivista-8770-network-management-system': '/products/management/omnivista-8770',
  '/en/products/communications-management-security/unified-management-center': '/products/management/unified-management-center',
  '/en/products/communications-management-security/opentouch-session-border-controller': '/products/management/opentouch-sbc',
  '/en/products/network-management-security/omnivista-network-management-platform': '/products/management/omnivista-network-management',
  '/en/products/network-management-security/fleet-supervision': '/products/management/fleet-supervision',
  '/en/products/network-management-security/omniswitch-milestone-plugin': '/products/management/omniswitch-milestone',
  '/en/products/network-management-security/omnivista-network-advisor': '/products/management/omnivista-network-advisor',
  '/en/products/network-management-security/omnivista-smart-tool': '/products/management/omnivista-smart-tool',

  // ── Product categories ──
  '/en/products/communications-management-security': '/products/management',
  '/en/products/network-management-security': '/products/management',
  '/en/products/location-services': '/products/wlan',
  '/en/products/asset-tracking': '/products/wlan',
  '/en/products/user-manuals': '/support',
  '/en/products/platforms/omnipcx-open-gateway': '/products/integration/omnipcx-open-gateway',
  '/en/products/switches/omniswitch-comparison-tool': '/products/switches',
  '/en/products/switches/switch-comparison-tool': '/products/switches',
  '/en/products/wlan/omniaccess-stellar-web-comparison-tool': '/products/wlan',
  '/en/products/wlan/access-point-comparison-tool': '/products/wlan',
  '/en/products/wlan/omniaccess-stellar-access-point-1230': '/products/wlan',

  // ── Rainbow ──
  '/en/rainbow': '/platform/rainbow',
  '/en/rainbow/about-rainbow': '/platform/rainbow',
  '/en/rainbow/contact-us': '/company/contact',
  '/en/rainbow/developers': '/developers',
  '/en/rainbow/connectors-and-apps/app-connector': '/products/integration/rainbow-app-connector',
  '/en/rainbow/data-privacy': '/legal/privacy',

  // ── Legal ──
  '/en/legal/cookie-policy': '/legal/cookies',
  '/en/legal/terms-of-use': '/legal/terms',
  '/en/legal/trademarks-copyright': '/legal/trademarks',

  // ── Missing solution redirects ──
  '/en/solutions/e-services': '/solutions/e-services',
  '/en/solutions/omnifabric': '/solutions/omnifabric',
  '/en/solutions/mission-critical-networks': '/solutions/mission-critical-networks',
  '/en/solutions/shortest-path-bridging': '/solutions/shortest-path-bridging',
  '/en/solutions/hybrid-pol': '/solutions/hybrid-pol',
  '/en/solutions/optical-solutions': '/solutions/optical-solutions',
  '/en/solutions/digital-dividends': '/solutions/digital-dividends',
  '/en/solutions/business-innovation': '/solutions/business-innovation',
  '/en/solutions/distributed-wi-fi-control-architecture': '/solutions/distributed-wifi',
  '/en/solutions/business-continuity/continuity-of-learning': '/solutions/business-continuity',
  '/en/solutions/business-continuity/return-to-business': '/solutions/business-continuity',
  '/en/solutions/unified-access': '/solutions/secure-your-network',

  // ── Missing company redirects ──
  '/en/company/about-us/awards': '/company/awards',
  '/en/company/about-us/ebc': '/company/innovation',
  '/en/company/about-us/history': '/company/history',

  // ── Missing partner redirects ──
  '/en/partners/about-our-partners': '/partners',
  '/en/partners/business-partners/become-a-partner': '/partners/business-partners',
  '/en/partners/business-partners/partner-resources': '/partners/business-partners',
  '/en/partners/dspp': '/partners/technology-partners',
  '/en/partners/dspp/become-a-partner': '/partners/technology-partners',
  '/en/partners/dspp/resources': '/partners/technology-partners',
  '/en/partners/dspp/iwr': '/partners/technology-partners',

  // ── Standalone pages ──
  '/en/contact-us': '/company/contact',
  '/en/video-library': '/company/video-library',
  '/en/partner-locator': '/partners',
}

/* ── CMS-managed redirects (fetched from Payload Redirects global) ── */

type RedirectRule = {
  source: string
  destination: string
  type: '301' | '302'
  active: boolean
}

let cachedRules: RedirectRule[] | null = null
let cacheTime = 0
const CACHE_TTL = 60_000 // 1 minute

async function getRedirectRules(): Promise<RedirectRule[]> {
  if (cachedRules && Date.now() - cacheTime < CACHE_TTL) return cachedRules

  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/globals/redirects`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    })
    if (!res.ok) return cachedRules || []
    const data = await res.json()
    cachedRules = (data?.rules || []).filter((r: RedirectRule) => r.active)
    cacheTime = Date.now()
    return cachedRules!
  } catch {
    return cachedRules || []
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Check hardcoded legacy redirects (exact match)
  const legacyDest = legacyRedirects[pathname]
  if (legacyDest) {
    return NextResponse.redirect(new URL(legacyDest, request.url), 301)
  }

  // 2. Strip /en/ prefix — catch-all for any legacy URL not in the map
  if (pathname.startsWith('/en/')) {
    const stripped = pathname.replace(/^\/en/, '')
    return NextResponse.redirect(new URL(stripped || '/', request.url), 301)
  }

  // 3. Check CMS-managed redirects
  const rules = await getRedirectRules()
  const match = rules.find((r) => r.source === pathname)

  if (match) {
    const destination = match.destination.startsWith('http')
      ? match.destination
      : new URL(match.destination, request.url).toString()

    return NextResponse.redirect(destination, {
      status: match.type === '302' ? 302 : 301,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next (Next.js internals)
     * - api (API routes — handled separately)
     * - admin (Payload admin)
     * - static files (images, fonts, etc.)
     */
    '/((?!_next|api|admin|favicon\\.ico|media|.*\\..*).*)',
  ],
}
