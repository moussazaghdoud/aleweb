import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  typescript: {
    // Next.js 16.2-canary auto-generated route validator references missing routes.js
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.al-enterprise.com",
      },
      {
        protocol: "https",
        hostname: "web-assets.al-enterprise.com",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
      },
    ],
  },
  async redirects() {
    return [
      // ══════════════════════════════════════════════════════════════════
      // LEGACY /en/* → /* wildcard (catch-all for unmapped legacy URLs)
      // Must be LAST — specific rules above take priority
      // ══════════════════════════════════════════════════════════════════

      // ── Solutions: different slugs ─────────────────────────────────
      { source: '/en/solutions/hybrid-workplace', destination: '/solutions/enable-hybrid-work', permanent: true },
      { source: '/en/solutions/iot', destination: '/solutions/iot-networks', permanent: true },
      { source: '/en/solutions/communications-platform-as-a-service-cpaas', destination: '/solutions/cpaas', permanent: true },
      { source: '/en/solutions/data-center', destination: '/solutions/data-center-networking', permanent: true },
      { source: '/en/solutions/video-surveillance', destination: '/solutions/video-surveillance-networking', permanent: true },
      { source: '/en/solutions/sd-wan', destination: '/solutions/sd-wan-sase', permanent: true },
      { source: '/en/solutions/security', destination: '/solutions/network-security', permanent: true },

      // ── Solutions: map to closest new equivalent ───────────────────
      { source: '/en/solutions/cloud-communications', destination: '/solutions/move-to-cloud', permanent: true },
      { source: '/en/solutions/wifi-solutions', destination: '/platform/stellar-wifi', permanent: true },
      { source: '/en/solutions/private-5g-network', destination: '/platform/private-5g', permanent: true },
      { source: '/en/solutions/collaboration-solutions', destination: '/solutions/unified-communications', permanent: true },
      { source: '/en/solutions/e-services', destination: '/solutions/modernize-communications', permanent: true },
      { source: '/en/solutions/connected-solutions-and-devices', destination: '/solutions/connect-everything', permanent: true },
      { source: '/en/solutions/everything-as-a-service-xaas', destination: '/solutions/purple-on-demand', permanent: true },
      { source: '/en/solutions/omnifabric', destination: '/solutions/secure-your-network', permanent: true },
      { source: '/en/solutions/optical-solutions', destination: '/solutions/digital-age-networking', permanent: true },
      { source: '/en/solutions/shortest-path-bridging', destination: '/solutions/digital-age-networking', permanent: true },
      { source: '/en/solutions/business-innovation', destination: '/solutions/digital-age-networking', permanent: true },
      { source: '/en/solutions/distributed-wi-fi-control-architecture', destination: '/platform/stellar-wifi', permanent: true },
      { source: '/en/solutions/hybrid-pol', destination: '/solutions/digital-age-networking', permanent: true },
      { source: '/en/solutions/mission-critical-networks', destination: '/solutions/secure-your-network', permanent: true },
      { source: '/en/solutions/unified-access', destination: '/solutions/digital-age-networking', permanent: true },
      { source: '/en/solutions/digital-dividends', destination: '/solutions/digital-age-communications', permanent: true },
      { source: '/en/solutions/smb', destination: '/industries/smb', permanent: true },
      { source: '/en/solutions/digital-age-networking/ai-ops-offer', destination: '/solutions/optimize-with-ai', permanent: true },
      { source: '/en/solutions/business-continuity/continuity-of-learning', destination: '/solutions/business-continuity', permanent: true },
      { source: '/en/solutions/business-continuity/return-to-business', destination: '/solutions/business-continuity', permanent: true },

      // ── Industries: different slugs ────────────────────────────────
      { source: '/en/industries/energy-and-utilities', destination: '/industries/energy', permanent: true },
      { source: '/en/industries/government/defense-solutions', destination: '/industries/government/defense', permanent: true },
      { source: '/en/industries/government/public-safety-solutions', destination: '/industries/government/public-safety', permanent: true },
      { source: '/en/industries/government/smart-buildings', destination: '/industries/smart-buildings', permanent: true },
      // Missing sub-pages → parent
      { source: '/en/industries/education/intelligent-campus', destination: '/industries/education', permanent: true },
      { source: '/en/industries/education/intelligent-campus/:path*', destination: '/industries/education', permanent: true },
      { source: '/en/industries/education/e-rate', destination: '/industries/education', permanent: true },
      { source: '/en/industries/hospitality/guest-experience', destination: '/industries/hospitality', permanent: true },

      // ── Products: category merges ──────────────────────────────────
      { source: '/en/products/communications-management-security', destination: '/products/management', permanent: true },
      { source: '/en/products/network-management-security', destination: '/products/management', permanent: true },
      { source: '/en/products/location-services', destination: '/products/management', permanent: true },

      // ── Products: comms management → management ────────────────────
      { source: '/en/products/communications-management-security/omnivista-8770-network-management-system', destination: '/products/management/omnivista-8770', permanent: true },
      { source: '/en/products/communications-management-security/unified-management-center', destination: '/products/management/unified-management-center', permanent: true },
      { source: '/en/products/communications-management-security/opentouch-session-border-controller', destination: '/products/management/opentouch-sbc', permanent: true },

      // ── Products: network management → management ──────────────────
      { source: '/en/products/network-management-security/omnivista-network-management-platform', destination: '/products/management/omnivista-network-management', permanent: true },
      { source: '/en/products/network-management-security/fleet-supervision', destination: '/products/management/fleet-supervision', permanent: true },
      { source: '/en/products/network-management-security/omniswitch-milestone-plugin', destination: '/products/management/omniswitch-milestone', permanent: true },
      { source: '/en/products/network-management-security/omnivista-network-advisor', destination: '/products/management/omnivista-network-advisor', permanent: true },
      { source: '/en/products/network-management-security/omnivista-smart-tool', destination: '/products/management/omnivista-smart-tool', permanent: true },
      { source: '/en/products/network-management-security/omnivista-cirrus', destination: '/products/management', permanent: true },
      { source: '/en/products/network-management-security/omnivista-2500-network-management-system', destination: '/products/management', permanent: true },
      { source: '/en/products/network-management-security/clearpass-policy-management-system', destination: '/products/management', permanent: true },

      // ── Products: platforms slug changes ───────────────────────────
      { source: '/en/products/platforms/omnipcx-enterprise-communication-server', destination: '/products/platforms/omnipcx-enterprise', permanent: true },
      { source: '/en/products/platforms/sip-dect-infrastructure', destination: '/products/platforms/sip-dect-base-stations', permanent: true },
      { source: '/en/products/platforms/dect-infrastructure', destination: '/products/platforms/dect-base-stations', permanent: true },
      { source: '/en/products/platforms/opentouch-enterprise-cloud', destination: '/products/platforms/opentouch-enterprise-cloud', permanent: true },

      // ── Products: applications slug changes ────────────────────────
      { source: '/en/products/applications/ip-desktop-softphone', destination: '/products/applications/voip-softphone', permanent: true },
      { source: '/en/products/applications/ale-softphone', destination: '/products/devices/sip-softphone', permanent: true },
      { source: '/en/products/applications/omnipcx-record-suite', destination: '/products/applications/omnipcx-record', permanent: true },
      { source: '/en/products/applications/4059-extended-edition-attendant-console', destination: '/products/applications/4059-attendant-console', permanent: true },
      { source: '/en/products/applications/opentouch-fax-center', destination: '/products/platforms/opentouch-fax-center', permanent: true },

      // ── Products: devices slug changes ─────────────────────────────
      { source: '/en/products/devices/ale-aries-headsets', destination: '/products/devices/aries-headsets', permanent: true },
      { source: '/en/products/devices/business-phones', destination: '/products/devices/ale-deskphones', permanent: true },
      { source: '/en/products/devices/dect-handsets/dect-handsets-reparability', destination: '/products/devices/dect-handsets', permanent: true },

      // ── Products: asset tracking ───────────────────────────────────
      { source: '/en/products/asset-tracking', destination: '/products/management/omniaccess-stellar-asset-tracking', permanent: true },

      // ── Products: WLAN — all Stellar APs (long slugs → short) ─────
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1501', destination: '/products/wlan/stellar-ap1501', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1511', destination: '/products/wlan/stellar-ap1511', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1521', destination: '/products/wlan/stellar-ap1521', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1411', destination: '/products/wlan/stellar-ap1411', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1431', destination: '/products/wlan/stellar-ap1431', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1451', destination: '/products/wlan/stellar-ap1451', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1301', destination: '/products/wlan/stellar-ap1301', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1301h', destination: '/products/wlan/stellar-ap1301h', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1311', destination: '/products/wlan/stellar-ap1311', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1320', destination: '/products/wlan/stellar-ap1320', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1331', destination: '/products/wlan/stellar-ap1331', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1351', destination: '/products/wlan/stellar-ap1351', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1561', destination: '/products/wlan/stellar-ap1561', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1570', destination: '/products/wlan/stellar-ap1570', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1360', destination: '/products/wlan/stellar-ap1360', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1261', destination: '/products/wlan/stellar-ap1261', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-access-point-1230', destination: '/products/wlan', permanent: true },
      // Comparison tools → category landing
      { source: '/en/products/switches/omniswitch-comparison-tool', destination: '/products/switches', permanent: true },
      { source: '/en/products/wlan/omniaccess-stellar-web-comparison-tool', destination: '/products/wlan', permanent: true },
      // User manuals → support
      { source: '/en/products/user-manuals', destination: '/support', permanent: true },
      { source: '/en/products/user-manuals/:path*', destination: '/support', permanent: true },

      // ── Services: different slugs ──────────────────────────────────
      { source: '/en/services/education-services', destination: '/services/training-services', permanent: true },
      { source: '/en/services/professional-services', destination: '/services/professional-managed-services', permanent: true },
      { source: '/en/services/contract-checker', destination: '/support', permanent: true },

      // ── Company: different paths ───────────────────────────────────
      { source: '/en/company/about-us', destination: '/company/about', permanent: true },
      { source: '/en/company/about-us/executive-team', destination: '/company/executive-team', permanent: true },
      { source: '/en/company/about-us/careers', destination: '/company/careers', permanent: true },
      { source: '/en/company/about-us/esg', destination: '/company/esg', permanent: true },
      { source: '/en/company/about-us/awards', destination: '/company/about', permanent: true },
      { source: '/en/company/about-us/history', destination: '/company/about', permanent: true },
      { source: '/en/company/about-us/ebc', destination: '/company/about', permanent: true },
      { source: '/en/company/news', destination: '/company/newsroom', permanent: true },
      { source: '/en/company/news/:path*', destination: '/company/newsroom', permanent: true },
      { source: '/en/company/analyst', destination: '/company/analyst-reports', permanent: true },
      { source: '/en/company/customers', destination: '/customers/case-studies', permanent: true },
      { source: '/en/company/customers/:path*', destination: '/customers/case-studies', permanent: true },
      { source: '/en/company/ale-worldwide-presence', destination: '/company/contact', permanent: true },

      // ── Partners: sub-pages → landing ──────────────────────────────
      { source: '/en/partners/about-our-partners', destination: '/partners', permanent: true },
      { source: '/en/partners/business-partners/become-a-partner', destination: '/partners/business-partners', permanent: true },
      { source: '/en/partners/business-partners/partner-resources', destination: '/partners/business-partners', permanent: true },
      { source: '/en/partners/dspp', destination: '/partners/technology-partners', permanent: true },
      { source: '/en/partners/dspp/:path*', destination: '/partners/technology-partners', permanent: true },
      { source: '/en/partner-locator', destination: '/partners', permanent: true },

      // ── Rainbow section → platform ─────────────────────────────────
      { source: '/en/rainbow', destination: '/platform/rainbow', permanent: true },
      { source: '/en/rainbow/about-rainbow', destination: '/platform/rainbow', permanent: true },
      { source: '/en/rainbow/contact-us', destination: '/company/contact', permanent: true },
      { source: '/en/rainbow/developers', destination: '/developers', permanent: true },
      { source: '/en/rainbow/connectors-and-apps/app-connector', destination: '/products/integration/rainbow-app-connector', permanent: true },
      { source: '/en/rainbow/data-privacy', destination: '/legal/privacy', permanent: true },

      // ── Legal: different slugs ─────────────────────────────────────
      { source: '/en/legal/cookie-policy', destination: '/legal/cookies', permanent: true },
      { source: '/en/legal/terms-of-use', destination: '/legal/terms', permanent: true },
      { source: '/en/legal/trademarks-copyright', destination: '/legal/trademarks', permanent: true },
      { source: '/en/legal/business-associate-privacy-policy', destination: '/legal/privacy', permanent: true },
      { source: '/en/legal/ferpa-policy', destination: '/legal/privacy', permanent: true },

      // ── Standalone pages ───────────────────────────────────────────
      { source: '/en/contact-us', destination: '/company/contact', permanent: true },
      { source: '/en/video-library', destination: '/company/video-library', permanent: true },
      { source: '/en/feedback', destination: '/company/contact', permanent: true },
      { source: '/en/sitelinks', destination: '/', permanent: true },
      { source: '/en/declaration-of-conformity', destination: '/legal/compliance', permanent: true },
      { source: '/en/search', destination: '/', permanent: true },
      { source: '/en/blog/:path*', destination: '/blog', permanent: true },
      { source: '/en/support/security-advisories', destination: '/support', permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // WILDCARD: /en/{section} → /{section} (catch remaining exact matches)
      // These must come AFTER all specific /en/* rules above
      // ══════════════════════════════════════════════════════════════════
      { source: '/en/solutions/:slug', destination: '/solutions/:slug', permanent: true },
      { source: '/en/industries/:slug', destination: '/industries/:slug', permanent: true },
      { source: '/en/industries/:slug/:subslug', destination: '/industries/:slug/:subslug', permanent: true },
      { source: '/en/products/switches/:slug', destination: '/products/switches/:slug', permanent: true },
      { source: '/en/products/wlan/:slug', destination: '/products/wlan/:slug', permanent: true },
      { source: '/en/products/devices/:slug', destination: '/products/devices/:slug', permanent: true },
      { source: '/en/products/applications/:slug', destination: '/products/applications/:slug', permanent: true },
      { source: '/en/products/platforms/:slug', destination: '/products/platforms/:slug', permanent: true },
      { source: '/en/products/integration/:slug', destination: '/products/integration/:slug', permanent: true },
      { source: '/en/products/management/:slug', destination: '/products/management/:slug', permanent: true },
      { source: '/en/products/:slug', destination: '/products/:slug', permanent: true },
      { source: '/en/services/:slug', destination: '/services/:slug', permanent: true },
      { source: '/en/partners/:slug', destination: '/partners/:slug', permanent: true },
      { source: '/en/company/:slug', destination: '/company/:slug', permanent: true },
      { source: '/en/legal/:slug', destination: '/legal/:slug', permanent: true },
      { source: '/en/platform/:slug', destination: '/platform/:slug', permanent: true },

      // Final catch-all: /en → homepage
      { source: '/en', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.cookiebot.com https://*.onetrust.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://web-assets.al-enterprise.com https://www.al-enterprise.com https://assets.mixkit.co",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.onetrust.com https://*.sentry.io https://*.ingest.sentry.io",
              "media-src 'self' https://web-assets.al-enterprise.com https://assets.mixkit.co blob:",
              "frame-src 'self' https://www.googletagmanager.com https://consentcdn.cookiebot.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(withPayload(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.SENTRY_AUTH_TOKEN,
  disableSourceMapUpload: !process.env.SENTRY_AUTH_TOKEN,
});
