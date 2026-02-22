# QA AUDIT REPORT: ALE Website Migration

**Date:** 2026-02-21
**Legacy site:** https://www.al-enterprise.com/en/
**New site:** https://aleweb-production-b8f6.up.railway.app/
**Auditor:** Automated QA (Claude)
**Stack:** Next.js 16.1.6 / React 19 / Tailwind CSS 4 / Railway

---

## A) EXECUTIVE SUMMARY

### Overall Migration Health: CONDITIONAL PASS

The new site is architecturally sound with 146 valid pages, clean information architecture, and complete user journeys. However, 4 broken links, zero security headers, zero OpenGraph/Twitter meta, missing canonical tags, and stock-only imagery prevent an unconditional pass.

### Top 10 Issues by Severity and Business Impact

| # | Severity | Issue | Business Impact |
|---|----------|-------|----------------|
| 1 | **CRITICAL** | `/contact` returns 404 (linked from EVERY page) | **Breaks primary conversion path site-wide** |
| 2 | **CRITICAL** | 3 partner sub-pages return 404 | Breaks partner journey on `/partners` page |
| 3 | **CRITICAL** | Zero OpenGraph / Twitter Card meta on all pages | No social sharing previews on LinkedIn/Facebook/Twitter |
| 4 | **CRITICAL** | No canonical tags on any page | Duplicate content risk across staging + production domains |
| 5 | **CRITICAL** | Blog page has duplicate homepage title/description | SEO penalty; `"use client"` blocks metadata export |
| 6 | **HIGH** | Zero security headers (HSTS, CSP, X-Frame-Options, etc.) | Security vulnerability; fails enterprise compliance |
| 7 | **HIGH** | All imagery is stock photography (Unsplash) | Reduces brand credibility; same photos reused across pages |
| 8 | **HIGH** | No dropdown menus in navigation | Extra clicks vs legacy; UX regression for power users |
| 9 | **HIGH** | Rainbow product missing pricing/free trial CTA | Major conversion gap for ALE's flagship freemium product |
| 10 | **MEDIUM** | `/products` not in main navigation | 54 product pages only reachable via footer/platform link |

---

## B) COVERAGE & PARITY REPORT

### URL Inventory Summary

| Metric | Legacy Site | New Site |
|--------|------------|---------|
| Total discoverable URLs | 243 (nav) / 700+ (sitemap) | 146 valid pages |
| Sitemap entries | 700+ (all languages) | 158 (English only) |
| Products | 80 URLs | 65 URLs (11 platform + 54 catalog) |
| Solutions | 37 URLs | 20 URLs |
| Industries | 25 URLs | 20 URLs (9 industries + 11 sub-pages) |
| Blog | 200+ articles | 10 articles |
| Company | 20 URLs | 10 URLs |
| Partners | 13 URLs | 4 URLs (hub + 3 programs) |
| Services | 7 URLs | 6 URLs |
| Legal | 9 URLs | 8 URLs (hub + 7 pages) |
| Support/Contact | 5 URLs | 2 URLs |
| Customer Stories | 100+ in sitemap | 1 URL (hub only) |
| Resources/PDFs | 30 PDF links | 0 PDF links |

### Coverage Metrics

| Metric | Value |
|--------|-------|
| Pages migrated (structural) | ~60% of legacy navigation pages |
| Pages missing | ~40% (mainly blog archive, customer stories, granular product variants) |
| Pages intentionally excluded | Blog archive (200+), customer stories (100+), multilingual (5 languages) |
| Redirects configured | 0 (no 301 redirect mapping exists yet) |

### Coverage by Category

| Category | Legacy Count | New Count | Coverage | Notes |
|----------|-------------|-----------|----------|-------|
| **Commercial (Solutions)** | 37 | 20 | 54% | New site uses outcome-based grouping (improvement) |
| **Commercial (Products)** | 80 | 65 | 81% | Good coverage; missing some niche variants |
| **Commercial (Industries)** | 25 | 20 | 80% | SMB added; sub-pages implemented |
| **Partners** | 13 | 4 | 31% | Missing partner locator, DSPP, resources |
| **Developers** | 1 | 1 | 100% | Hub page exists |
| **Resources/PDFs** | 30+ | 0 | 0% | Phase 1: PDFs stay on legacy (by design) |
| **Company/About** | 20 | 10 | 50% | Missing: Awards, History, EBC pages |
| **Support/Contact** | 5 | 2 | 40% | Missing support portal links |
| **Legal** | 9 | 8 | 89% | Good coverage; added compliance pages |
| **Blog/News** | 200+ | 10 | 5% | Only seed content; archive not migrated |
| **Customer Stories** | 100+ | 1 | 1% | Only hub page; no individual stories |

### Key Missing Pages (Not Yet Migrated)

**Products (15 missing):**
- Individual phone model pages (8x, 8xx8 series, etc.)
- Specific Rainbow sub-pages (Rainbow Office, Rainbow Edge, Rainbow CRM)
- OpenTouch Multimedia Services
- OmniTouch Fax Server

**Solutions (17 missing):**
- SPB (Shortest Path Bridging)
- OmniFabric
- Hybrid POL (Passive Optical LAN)
- Optical Solutions
- Unified Access
- Mission Critical Networks
- Customer Service Apps
- Connected Solutions
- Collaboration Solutions

**Company (10 missing):**
- Awards & Recognition
- History / Timeline
- Executive Briefing Center
- Individual executive bios
- Analyst & Market Reports (detail pages)
- Video Library (detail pages)

**Blog/News (190+ missing):**
- Full blog archive not migrated (only 10 seed posts)
- News/press release archive

**Customer Stories (99+ missing):**
- Individual case study pages not migrated

---

## C) NAVIGATION & UX AUDIT

### Top Navigation

| Item | New Site | Legacy Site | Delta |
|------|---------|------------|-------|
| Industries | Link (no dropdown) | Mega-menu with 8 verticals | Regression |
| Solutions | Link (no dropdown) | Mega-menu with sub-sections | Regression |
| Platform | Link (no dropdown) | Products mega-menu | Regression |
| Services | Link (no dropdown) | Mega-menu | Regression |
| Partners | Link (no dropdown) | Mega-menu | Regression |
| Company | Link (no dropdown) | Mega-menu | Regression |
| Products | NOT IN NAV | In legacy nav | **Missing** |
| Resources | NOT IN NAV | In legacy nav | **Missing** |
| Search | Icon present | Full search | Uncertain if functional |
| Contact Us | CTA button (**BROKEN - 404**) | Working contact form | **BROKEN** |

### Footer
- **New site:** 5 columns (Solutions, Platform, Company, Resources, Partners) + legal links
- **Legacy site:** Similar structure + social media links
- **Verdict:** PASS (comprehensive and well-organized). Missing: social media icons.

### User Journey Validation

| Journey | Status | Issues |
|---------|--------|--------|
| Customer: Home > Solutions > Detail > CTA | **PASS** | Complete, no dead ends |
| Customer: Home > Platform > Product > CTA | **PASS** | Complete, no dead ends |
| Customer: Home > Industries > Industry > CTA | **PASS** | Complete, no dead ends |
| Partner: Home > Partners > Program > CTA | **PARTIAL** | 3 broken links on /partners page |
| Contact: Any page > Contact Us | **FAIL** | `/contact` returns 404 |

### Dead Ends & Issues

| Issue | Severity | Location |
|-------|----------|----------|
| `/contact` 404 | CRITICAL | All pages (header CTA) |
| `/partners/become-a-partner` 404 | HIGH | /partners page |
| `/partners/find-a-partner` 404 | HIGH | /partners page |
| `/partners/partner-success` 404 | HIGH | /partners page |
| Product name pills not clickable | MEDIUM | Solution & industry detail pages |
| Support page cards not clickable | MEDIUM | /support page |

---

## D) FUNCTIONAL QA

### Internal Link Health

| Metric | Value |
|--------|-------|
| Total internal links discovered | 150 |
| Links returning 200 | 146 (97.3%) |
| Links returning 404 | 4 (2.7%) |

### Broken Links

| Broken URL | HTTP Status | Source Page(s) | Fix |
|------------|-------------|----------------|-----|
| `/contact` | 404 | ALL pages (nav) | Change href to `/company/contact` |
| `/partners/become-a-partner` | 404 | `/partners` | Create page or fix link |
| `/partners/find-a-partner` | 404 | `/partners` | Create page or fix link |
| `/partners/partner-success` | 404 | `/partners` | Create page or fix link |

### External Links
- Only 3 external domains referenced (Google Fonts preconnect/stylesheet)
- Zero outbound content links — no external link issues

### Forms & CTAs
- "Contact Us" button exists on every page but links to broken `/contact`
- "Request a Demo" CTA on product pages — no backend form (link goes to `/company/contact`)
- No client-side form validation issues found in HTML

### 404 Page
- **Status:** Returns proper 404 HTTP status
- **Content:** Well-designed with "Go to Homepage", "Contact Us" links, quick links to Solutions/Products/Industries/Support
- **Robots:** Has `<meta name="robots" content="noindex"/>` — correct
- **Verdict:** PASS

### Console Errors
- Cannot test JS console in this audit mode — recommend manual check

---

## E) LEGACY PDF / ASSET COMPLIANCE

### PDF/Asset Inventory

| Metric | Value |
|--------|-------|
| PDFs on legacy site | 30 documents found |
| PDFs referenced on new site | 0 |
| PDFs hosted on new domain | 0 |
| Download links on new site | 0 |

**Verdict:** COMPLIANT with Phase 1 constraint (PDFs remain on legacy). However, the new site has **zero links to any downloadable assets**. While not a violation, this represents a significant content gap — enterprise buyers expect datasheets, brochures, and whitepapers.

**Recommendation:** Add "Download Datasheet" CTAs on product pages that link to legacy URLs (e.g., `https://www.al-enterprise.com/-/media/assets/internet/documents/...`).

---

## F) SEO & INDEXING READINESS

### Per-Page SEO Summary (14 pages audited)

| Check | Pass | Fail | Notes |
|-------|------|------|-------|
| Title tag | 13/14 | 1/14 | Blog page duplicates homepage title |
| Meta description | 10/14 | 4/14 | Blog duplicate + 3 too short + 1 too long |
| H1 (exactly 1) | 14/14 | 0/14 | Perfect |
| H2 structure | 14/14 | 0/14 | Well structured |
| Canonical tag | 0/14 | 14/14 | **MISSING ON ALL PAGES** |
| OpenGraph meta | 0/14 | 14/14 | **MISSING ON ALL PAGES** |
| Twitter Card meta | 0/14 | 14/14 | **MISSING ON ALL PAGES** |
| Robots meta | 0/14 | — | Defaults to index,follow (acceptable) |
| JSON-LD structured data | 0/14 | 14/14 | No structured data on any page |

### Sitemap & Robots

| Check | Status | Details |
|-------|--------|---------|
| sitemap.xml exists | PASS | 158 URLs, well-formed XML |
| sitemap.xml duplicates | PASS | None found |
| sitemap.xml priorities | PASS | Properly tiered (1.0 > 0.8 > 0.7 > 0.5 > 0.3) |
| robots.txt exists | PASS | Allows all, disallows /api/ and /_next/ |
| robots.txt sitemap ref | PASS | Points to canonical domain |
| Missing from sitemap | WARN | 3 partner pages valid but not in sitemap |

### Internal Linking Depth

| Destination | Clicks from Homepage | Status |
|-------------|---------------------|--------|
| Solution detail | 1 click | PASS |
| Legal page | 1 click (footer) | PASS |
| Service page | 1 click (nav) | PASS |
| Blog post | 2 clicks | PASS |
| Specific product (OmniSwitch 6360) | 3 clicks | PASS (borderline) |

### Redirect Strategy (for production cutover)

No 301 redirect mapping exists yet. When `www.al-enterprise.com` points to the new site, the following redirect rules are recommended:

```
/en/ → /
/en/solutions/* → /solutions/*
/en/products/* → /products/* (with slug mapping)
/en/industries/* → /industries/*
/en/company/* → /company/*
/en/partners/* → /partners/*
/en/legal/* → /legal/*
/en/blog/* → /blog/*
/en/services/* → /services/*
```

---

## G) PERFORMANCE & ACCESSIBILITY AUDIT

### Performance Observations

| Check | Finding | Status |
|-------|---------|--------|
| Cache headers | `s-maxage=31536000` (1 year CDN cache) | PASS |
| Next.js ISR | `X-Nextjs-Cache: HIT` confirmed | PASS |
| Pre-rendering | `X-Nextjs-Prerender: 1` confirmed | PASS |
| Homepage TTFB | 0.98s | WARN — slightly high |
| Font loading | Preconnect hints present | PASS |
| Image optimization | Next.js `<Image>` with sizes attributes | PASS |
| Image format | All from Unsplash (WebP/AVIF via CDN) | PASS |
| JS bundle | Not measured (requires browser) | MANUAL CHECK NEEDED |

### Accessibility Observations

| Check | Finding | Status |
|-------|---------|--------|
| `lang="en"` on HTML | Present | PASS |
| H1-H6 hierarchy | Proper on all pages | PASS |
| Image alt text | Present on all images | PASS |
| Keyboard navigation | Not testable via curl | MANUAL CHECK NEEDED |
| Color contrast | Not testable via curl | MANUAL CHECK NEEDED |
| ARIA labels | Search button has `aria-label="Search"` | PARTIAL |
| Focus states | Not testable via curl | MANUAL CHECK NEEDED |

### Manual Verification Checklist

- [ ] Run Lighthouse on Home, Solutions, Products, Partners, Blog (5 pages)
- [ ] Check keyboard-only navigation (Tab through all interactive elements)
- [ ] Verify color contrast ratios (text on colored backgrounds)
- [ ] Test screen reader compatibility (VoiceOver/NVDA)
- [ ] Measure JS bundle size and identify unused JavaScript
- [ ] Check Core Web Vitals in Chrome DevTools (LCP, CLS, INP)

---

## H) CROSS-DEVICE & CROSS-BROWSER SANITY

### Observations from HTML/CSS Analysis

| Check | Finding | Status |
|-------|---------|--------|
| Viewport meta | `width=device-width, initial-scale=1` | PASS |
| Responsive classes | Tailwind responsive prefixes throughout (`sm:`, `md:`, `lg:`) | PASS |
| Mobile menu | Hamburger menu with `lg:hidden` | PASS |
| Grid layouts | Responsive grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) | PASS |
| Image sizing | `sizes` attribute on all Next.js images | PASS |
| Max-width container | `max-w-[1320px]` consistent | PASS |

### Manual Verification Checklist

- [ ] Test at 375px (iPhone SE) — check hero text overflow, card stacking
- [ ] Test at 768px (iPad) — check grid transitions
- [ ] Test at 1024px (iPad landscape) — check nav behavior
- [ ] Test at 1440px (desktop) — check max-width container
- [ ] Test on Chrome, Firefox, Safari (WebKit)
- [ ] Verify sticky header behavior on scroll
- [ ] Check touch targets (min 44x44px) on mobile

---

## I) SECURITY / HEADERS QUICK CHECK

### Security Headers (tested on 4 pages)

| Header | Expected | Found | Status |
|--------|----------|-------|--------|
| HTTPS | Yes | Yes (Railway enforces) | PASS |
| Strict-Transport-Security (HSTS) | `max-age=31536000` | NOT PRESENT | **FAIL** |
| X-Frame-Options | `DENY` or `SAMEORIGIN` | NOT PRESENT | **FAIL** |
| X-Content-Type-Options | `nosniff` | NOT PRESENT | **FAIL** |
| Content-Security-Policy | Custom policy | NOT PRESENT | **FAIL** |
| Referrer-Policy | `strict-origin-when-cross-origin` | NOT PRESENT | **FAIL** |
| Permissions-Policy | Restrictive | NOT PRESENT | **FAIL** |
| X-XSS-Protection | `1; mode=block` | NOT PRESENT | **FAIL** |
| X-Powered-By | Should not be present | `Next.js` **(LEAKS)** | **FAIL** |
| Mixed Content | None | None found | PASS |
| Sensitive Data in HTML | None | None found | PASS |

**Score: 1/8 security headers present (HTTPS only via Railway).**

### Recommended Fix

Add to `next.config.ts`:
```typescript
{
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    }];
  },
}
```

---

## PRIORITY ACTION PLAN

### P0 — Fix Before ANY Traffic (Critical)

1. **Fix `/contact` 404** — Change header CTA href from `/contact` to `/company/contact`
2. **Fix 3 partner page 404s** — Create missing pages or remove broken links
3. **Add canonical tags** — Set `metadataBase` in root layout
4. **Add OpenGraph + Twitter meta** — In root layout metadata
5. **Fix blog page metadata** — Extract metadata to server component wrapper

### P1 — Fix Before Production Launch (High)

6. **Add security headers** — via `next.config.ts` headers()
7. **Remove X-Powered-By** — Set `poweredByHeader: false`
8. **Replace stock photos** — At minimum product pages and homepage
9. **Add dropdown navigation** — Mega-menus matching legacy site pattern
10. **Add Rainbow pricing/free trial** — Critical conversion path

### P2 — Fix After Launch (Medium)

11. Add "Products" to main navigation
12. Add JSON-LD structured data (Organization, Product, BreadcrumbList)
13. Make product name pills clickable links
14. Fix support page card links
15. Add social media links to footer
16. Add PDF/datasheet download links (linking to legacy CDN)
17. Lengthen short meta descriptions (3 pages)
18. Add customer logos/trust signals to homepage

### P3 — Future Enhancements (Low)

19. Add full breadcrumb trails (Home > Section > Page)
20. Migrate blog archive from legacy
21. Migrate customer stories from legacy
22. Add multilingual support
23. Remove duplicate footer CTA bands
24. Add explicit `robots` meta tag per page

---

*Report generated 2026-02-21. 4 automated audit agents ran in parallel covering: site crawl & link checking, legacy site inventory, SEO & security headers, content quality & UX.*
