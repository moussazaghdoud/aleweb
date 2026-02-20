# PHASE B — IMPLEMENTATION PLAN
## ALE Website Redesign — Hybrid C+A: Industry-Led Premium
### "Solution & Industry-Led Growth" architecture + "Premium Enterprise Minimalism" design

---

## DESIGN DIRECTION SUMMARY

**Architecture from C:** Industry-first navigation, outcome-driven storytelling, vertical segmentation, commercial conversion pathways, audience-aware experience.

**Aesthetics from A:** Large typography, generous whitespace, confident minimalism, cinematic photography, fewer-but-stronger sections, premium feel.

**Selective influence from B:** Developer Hub and Platform pages get technical depth — architecture diagrams, API docs, code snippets — wrapped in the A aesthetic.

**Result:** A site that feels like Stripe designed it, but thinks like Salesforce built it.

---
---

# 1. REFINED SITEMAP

---

## 1.1 — Top-Level Architecture

```
al-enterprise.com/
│
├── /                           ← Homepage
│
├── /industries/                ← Industry hub
│   ├── /healthcare/
│   │   ├── /hospitals/
│   │   ├── /senior-living/
│   │   └── /clinics/
│   ├── /education/
│   │   ├── /k-12/
│   │   └── /higher-education/
│   ├── /hospitality/
│   │   ├── /hotels/
│   │   └── /resorts/
│   ├── /government/
│   │   ├── /defense/
│   │   ├── /public-safety/
│   │   └── /administration/
│   ├── /transportation/
│   │   ├── /rail/
│   │   ├── /airports/
│   │   └── /ports/
│   ├── /energy/
│   ├── /manufacturing/
│   └── /smart-buildings/
│
├── /solutions/                 ← Outcome-organized solutions
│   ├── /modernize-communications/
│   │   ├── /unified-communications/
│   │   ├── /contact-center/
│   │   ├── /cloud-telephony/
│   │   └── /messaging-collaboration/
│   ├── /secure-your-network/
│   │   ├── /network-fabric/
│   │   ├── /zero-trust-access/
│   │   ├── /wifi/
│   │   └── /sd-wan/
│   ├── /optimize-with-ai/
│   │   ├── /ai-ops/
│   │   ├── /iot-analytics/
│   │   └── /location-services/
│   ├── /move-to-cloud/
│   │   ├── /xaas/
│   │   ├── /cloud-migration/
│   │   └── /hybrid-deployment/
│   ├── /enable-hybrid-work/
│   │   ├── /anywhere-collaboration/
│   │   ├── /mobility/
│   │   └── /smart-workspace/
│   └── /connect-everything/
│       ├── /private-5g/
│       ├── /iot-connectivity/
│       └── /asset-tracking/
│
├── /platform/                  ← Platform hub (B-influenced)
│   ├── /overview/              ← Platform architecture story
│   ├── /rainbow/               ← UCaaS flagship
│   ├── /omniswitch/            ← Network fabric
│   ├── /stellar-wifi/          ← Wireless
│   ├── /ai-ops/                ← AI engine
│   ├── /private-5g/            ← 5G
│   └── /all-products/          ← Full product catalog
│       ├── /communications/
│       ├── /networking/
│       ├── /phones-devices/
│       └── /management-security/
│
├── /customers/                 ← Customer proof hub
│   ├── /case-studies/
│   │   ├── ?industry=healthcare (filtered views)
│   │   ├── ?industry=education
│   │   └── ...
│   └── /customer-wall/         ← Logo wall + testimonials
│
├── /partners/                  ← Partner ecosystem
│   ├── /become-a-partner/
│   │   ├── /business-partner/
│   │   ├── /technology-partner/
│   │   └── /consultant/
│   ├── /find-a-partner/        ← Partner directory
│   ├── /partner-success/       ← Partner case studies
│   ├── /marketplace/           ← Partner solutions (future)
│   └── /portal/                ← Portal login redirect
│
├── /developers/                ← Developer hub (B-influenced)
│   ├── /getting-started/
│   ├── /api-reference/
│   ├── /sdks/
│   ├── /guides/
│   └── /community/
│
├── /resources/                 ← Content hub
│   ├── /blog/
│   ├── /whitepapers/
│   ├── /webinars/
│   ├── /datasheets/
│   ├── /documentation/
│   └── /product-archive/       ← Legacy products
│       ├── /omnipcx-office/
│       ├── /opentouch-suite/
│       └── .../
│
├── /company/                   ← Corporate
│   ├── /about/
│   ├── /leadership/
│   ├── /innovation/            ← R&D and vision story
│   ├── /newsroom/
│   │   ├── /press-releases/
│   │   └── /media-kit/
│   ├── /careers/
│   ├── /esg/
│   └── /contact/
│
├── /support/                   ← Support hub
│   ├── /contact-support/
│   ├── /knowledge-base/
│   └── /downloads/
│
└── /legal/
    ├── /privacy/
    ├── /terms/
    └── /cookies/
```

## 1.2 — Page Count Estimate

| Section | Pages (approx.) |
|---------|-----------------|
| Homepage | 1 |
| Industries (hub + verticals + sub-verticals) | 25 |
| Solutions (hub + outcome pages + sub-pages) | 20 |
| Platform (hub + product pages) | 12 |
| Customers (hub + case studies) | 30+ |
| Partners (hub + tracks + directory) | 8 |
| Developers (hub + docs) | 10 |
| Resources (hub + blog + content) | Migrated content |
| Company (hub + pages) | 10 |
| Support | 5 |
| Product Archive | Migrated from current |
| **Total new templates needed** | **~25 unique templates** |
| **Total pages at launch** | **~120 new + migrated content** |

---
---

# 2. SIMPLIFIED NAVIGATION

---

## 2.1 — Primary Navigation (Desktop)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [ALE Logo]   Industries   Solutions   Platform   Partners   Company │
│                                                                      │
│                                    [Search 🔍]  [Support]  [Get Started →] │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Rules:**
- **5 primary items** — never more
- **"Get Started"** is always visible as primary CTA (filled button)
- **Search** is always accessible
- **No mega-menus** — dropdowns show max 8-10 items per column, max 2 columns
- **Mobile:** hamburger → full-screen overlay with section accordion

## 2.2 — Dropdown Behavior

Each dropdown is clean, 2-column max, with a featured content slot:

```
┌─ Industries ──────────────────────────────────────┐
│                                                    │
│  VERTICALS              FEATURED                   │
│  Healthcare →           ┌──────────────────┐      │
│  Education →            │ 📖 How ALE       │      │
│  Hospitality →          │ transforms       │      │
│  Government →           │ hospitals         │      │
│  Transportation →       │                  │      │
│  Energy →               │ [Read story →]   │      │
│  Manufacturing →        └──────────────────┘      │
│  Smart Buildings →                                 │
│                                                    │
│  [View all industries →]                           │
└────────────────────────────────────────────────────┘

┌─ Solutions ───────────────────────────────────────┐
│                                                    │
│  BY OUTCOME               FEATURED                 │
│  Modernize Comms →        ┌──────────────────┐    │
│  Secure Your Network →    │ ☁️ Move to the   │    │
│  Optimize with AI →       │ cloud with XaaS  │    │
│  Move to Cloud →          │                  │    │
│  Enable Hybrid Work →     │ [Learn more →]   │    │
│  Connect Everything →     └──────────────────┘    │
│                                                    │
│  [Explore all solutions →]                         │
└────────────────────────────────────────────────────┘

┌─ Platform ────────────────────────────────────────┐
│                                                    │
│  KEY PLATFORMS            EXPLORE                   │
│  Rainbow UCaaS →          All Products →           │
│  OmniSwitch →             Developers →             │
│  Stellar Wi-Fi →          API Reference →          │
│  AI Ops →                                          │
│  Private 5G →             ┌──────────────────┐    │
│                           │ "One platform.   │    │
│  [Platform overview →]    │  Every connection"│    │
│                           └──────────────────┘    │
└────────────────────────────────────────────────────┘
```

## 2.3 — Mobile Navigation

```
[☰ Menu]  →  Full-screen overlay

┌─────────────────────────────┐
│  [✕ Close]                  │
│                             │
│  Industries              ▸  │
│  Solutions               ▸  │
│  Platform                ▸  │
│  Partners                ▸  │
│  Company                 ▸  │
│                             │
│  ─────────────────────────  │
│  Support                    │
│  Resources                  │
│  Developers                 │
│                             │
│  [ Get Started → ]          │
│                             │
│  🔍 Search                  │
└─────────────────────────────┘
```

## 2.4 — Contextual Secondary Navigation

On industry and solution pages, a sticky secondary nav appears below the primary:

```
┌──────────────────────────────────────────────────┐
│  Healthcare:  Overview  Hospitals  Senior Living  │
│               Clinics   Case Studies   Resources  │
└──────────────────────────────────────────────────┘
```

This replaces deep mega-menus with in-context navigation — users drill down only after they've committed to a section.

## 2.5 — Navigation Comparison

| Metric | Current Site | Hybrid C+A |
|--------|-------------|------------|
| Primary nav items | 6 | 5 |
| Links visible in mega-menu | 40-60 | 8-10 per dropdown |
| Clicks to deepest content | 4-5 | 2-3 |
| Mobile nav depth | 3+ accordion levels | 2 levels max |
| Role-based entry points | 0 | Audience selector on key pages |
| Total nav cognitive load | Very high | Low-moderate |

---
---

# 3. DESIGN SYSTEM DEFINITION

---

## 3.1 — Design Tokens

### Color System

```
BRAND CORE
──────────
Primary Purple:     #5B2D8E   (ALE heritage, refined deeper)
Primary Dark:       #3A1B5E   (headings, dark sections)
Primary Light:      #F4EEFB   (backgrounds, cards)

ACCENT — ACTION
──────────
CTA Blue:           #2563EB   (primary buttons, links)
CTA Blue Hover:     #1D4ED8
CTA Blue Light:     #EFF6FF   (badge backgrounds)

NEUTRALS
──────────
Black:              #0F172A   (body text)
Dark Gray:          #334155   (secondary text)
Mid Gray:           #94A3B8   (captions, metadata)
Light Gray:         #F1F5F9   (section backgrounds)
White:              #FFFFFF   (cards, primary background)

SEMANTIC
──────────
Success:            #059669
Warning:            #D97706
Error:              #DC2626
Info:               #0284C7

INDUSTRY ACCENTS (subtle, used in section highlights)
──────────
Healthcare:         #0D9488   (teal)
Education:          #EA580C   (warm orange)
Hospitality:        #CA8A04   (gold)
Government:         #4F46E5   (indigo)
Transportation:     #0369A1   (steel blue)
Energy:             #65A30D   (green)
Manufacturing:      #9333EA   (violet)
Smart Buildings:    #06B6D4   (cyan)
```

### Typography

```
FONT STACK
──────────
Display / Headings:   "Inter Display" or "Satoshi" (geometric, modern, premium)
Body:                 "Inter" (highly legible, widely supported)
Monospace (dev hub):  "JetBrains Mono" or "Fira Code"
Fallback:             system-ui, -apple-system, sans-serif

SCALE (Desktop)
──────────
Display XL:     72px / 76px line-height / -0.02em tracking    ← Hero statements
Display L:      56px / 62px / -0.02em                          ← Section headlines
H1:             40px / 48px / -0.01em                          ← Page titles
H2:             32px / 40px / -0.01em                          ← Section titles
H3:             24px / 32px / 0                                ← Card titles
H4:             20px / 28px / 0                                ← Sub-sections
Body L:         18px / 28px / 0                                ← Primary body
Body:           16px / 24px / 0                                ← Standard body
Body S:         14px / 20px / 0.01em                           ← Captions, metadata
Label:          12px / 16px / 0.05em uppercase                 ← Tags, badges

SCALE (Mobile)
──────────
Display XL:     40px / 44px
Display L:      32px / 38px
H1:             28px / 36px
H2:             24px / 32px
H3:             20px / 28px
Body L:         17px / 26px
Body:           16px / 24px

WEIGHT
──────────
Regular:        400 (body)
Medium:         500 (emphasis, nav)
Semibold:       600 (subheadings, buttons)
Bold:           700 (headings)
```

### Spacing System

```
BASE UNIT: 4px

Scale:
──────
0:    0px
1:    4px       ← tight gaps
2:    8px       ← icon margins
3:    12px      ← inline spacing
4:    16px      ← card padding (small)
5:    20px
6:    24px      ← card padding (standard)
8:    32px      ← section inner spacing
10:   40px
12:   48px      ← between content blocks
16:   64px      ← section padding (standard)
20:   80px      ← section padding (large)
24:   96px      ← section padding (hero)
32:   128px     ← major section separation
40:   160px     ← hero vertical padding
```

### Border Radius

```
None:     0px       ← tables, full-bleed images
Small:    4px       ← badges, tags
Medium:   8px       ← buttons, inputs
Large:    12px      ← cards
XL:       16px      ← feature cards, modals
Full:     9999px    ← pills, avatars
```

### Shadows

```
Subtle:    0 1px 2px rgba(0,0,0,0.05)              ← cards at rest
Small:     0 1px 3px rgba(0,0,0,0.1)               ← hover state
Medium:    0 4px 6px -1px rgba(0,0,0,0.1)           ← elevated cards
Large:     0 10px 15px -3px rgba(0,0,0,0.1)         ← modals, dropdowns
XL:        0 20px 25px -5px rgba(0,0,0,0.1)         ← hero floating elements
```

### Breakpoints

```
Mobile:         < 640px      (sm)
Tablet:         640-1023px   (md)
Desktop:        1024-1279px  (lg)
Wide:           1280-1535px  (xl)
Ultra-wide:     1536px+      (2xl)

Content max-width:  1280px
Reading max-width:  720px (blog, long-form content)
```

## 3.2 — Layout Grid

```
DESKTOP (1280px content width)
──────────
12-column grid
Column width: variable (fluid)
Gutter: 24px (lg), 32px (xl)
Margin: 32px (lg), auto-centered (xl+)

TABLET (640-1023px)
──────────
8-column grid
Gutter: 20px
Margin: 24px

MOBILE (<640px)
──────────
4-column grid
Gutter: 16px
Margin: 16px
```

## 3.3 — Motion & Animation

```
TIMING
──────
Fast:       150ms    ← micro-interactions (hover, toggle)
Normal:     250ms    ← transitions (dropdown, accordion)
Slow:       400ms    ← page-level (section reveals)
Entrance:   600ms    ← scroll-triggered content appearance

EASING
──────
Default:    cubic-bezier(0.4, 0, 0.2, 1)    ← standard ease
Enter:      cubic-bezier(0, 0, 0.2, 1)       ← elements appearing
Exit:       cubic-bezier(0.4, 0, 1, 1)       ← elements disappearing
Spring:     cubic-bezier(0.34, 1.56, 0.64, 1) ← playful bounce (use sparingly)

PRINCIPLES
──────
- Scroll-triggered fade-up for content blocks (subtle, 20px translate)
- No parallax on mobile
- No animation for users with prefers-reduced-motion
- Hero animations: subtle, looping, non-distracting
- Page transitions: crossfade (200ms)
```

## 3.4 — Photography & Imagery Direction

```
STYLE
──────
- Cinematic, real-world enterprise environments
- Warm, natural lighting (no harsh flash / blue-cast corporate)
- People in context: nurses using devices, engineers at consoles,
  teachers with students, hotel staff with guests
- Technology visible but secondary — humans first
- Diverse, global representation
- No: stock handshakes, pointing-at-screens, generic office
- Aspect ratios: 16:9 (heroes), 4:3 (cards), 1:1 (testimonials)

TREATMENT
──────
- Slight desaturation for consistency (-10%)
- Warm color grade (align with ALE brand warmth)
- Overlay gradients: subtle brand purple for hero text readability
- Industry pages: each vertical has a distinct photography palette
  that feels authentic to that environment
```

## 3.5 — Iconography

```
STYLE
──────
- Custom line icon set (2px stroke weight)
- 24x24 base size, scalable to 20/32/48
- Rounded caps, consistent corner radius
- ALE purple or neutral gray depending on context
- Categories needed: ~80 icons
  - Navigation (12): arrow, menu, close, search, etc.
  - Industry (10): hospital, school, hotel, government, etc.
  - Solution (12): cloud, shield, ai-chip, phone, network, etc.
  - Platform (10): server, api, database, wifi, 5g, etc.
  - UI (20): check, info, warning, download, external-link, etc.
  - Social (8): linkedin, twitter, youtube, etc.
  - Misc (8): globe, clock, users, chart, etc.

SOURCE: Custom commission or Phosphor Icons (customized weight)
```

---
---

# 4. COMPONENT SYSTEM

---

## 4.1 — Component Library Architecture

```
components/
├── primitives/           ← Atomic, no business logic
│   ├── Button/
│   ├── Badge/
│   ├── Tag/
│   ├── Icon/
│   ├── Input/
│   ├── Select/
│   ├── Textarea/
│   ├── Toggle/
│   ├── Avatar/
│   ├── Tooltip/
│   └── Spinner/
│
├── layout/               ← Structural components
│   ├── Container/
│   ├── Grid/
│   ├── Stack/
│   ├── Section/
│   ├── Divider/
│   └── Spacer/
│
├── navigation/           ← Nav components
│   ├── Navbar/
│   ├── NavDropdown/
│   ├── MobileMenu/
│   ├── SecondaryNav/
│   ├── Breadcrumbs/
│   ├── Footer/
│   └── SkipLink/
│
├── content/              ← Content display
│   ├── Heading/
│   ├── RichText/
│   ├── StatCard/
│   ├── MetricStrip/
│   ├── TestimonialCard/
│   ├── LogoWall/
│   ├── Timeline/
│   └── AccordionFAQ/
│
├── cards/                ← Card variants
│   ├── IndustryCard/
│   ├── SolutionCard/
│   ├── ProductCard/
│   ├── CaseStudyCard/
│   ├── ResourceCard/
│   ├── PartnerCard/
│   ├── BlogCard/
│   └── ArchiveProductCard/
│
├── heroes/               ← Hero section variants
│   ├── HeroHomepage/
│   ├── HeroIndustry/
│   ├── HeroSolution/
│   ├── HeroProduct/
│   └── HeroSimple/
│
├── sections/             ← Page-level section blocks
│   ├── IndustrySelector/
│   ├── SolutionPathways/
│   ├── PlatformShowcase/
│   ├── OutcomeStories/
│   ├── PartnerGrowth/
│   ├── DeveloperPreview/
│   ├── ResourceHub/
│   ├── CTABanner/
│   ├── TrustStrip/
│   ├── ComparisonTable/
│   └── ROICalculator/
│
├── forms/                ← Form components
│   ├── ContactForm/
│   ├── AssessmentForm/
│   ├── NewsletterSignup/
│   ├── PartnerApplication/
│   └── SearchOverlay/
│
├── media/                ← Media components
│   ├── Image/
│   ├── Video/
│   ├── VideoPlayer/
│   ├── Gallery/
│   └── ArchitectureDiagram/
│
└── utility/              ← Utility components
    ├── SEOHead/
    ├── StructuredData/
    ├── CookieConsent/
    ├── LanguageSwitcher/
    ├── BackToTop/
    └── AnnouncementBar/
```

## 4.2 — Key Component Specifications

### Button

```
VARIANTS:
  Primary:      Filled CTA blue, white text, 600 weight
  Secondary:    Outlined CTA blue, blue text
  Ghost:        Text-only with hover underline
  Dark:         Filled dark (for light backgrounds in dark sections)
  White:        Filled white (for dark sections)

SIZES:
  Small:    h-8,  px-3, text-sm     (tags, inline actions)
  Medium:   h-10, px-5, text-base   (standard)
  Large:    h-12, px-8, text-base   (hero CTAs)
  XL:       h-14, px-10, text-lg    (homepage hero only)

STATES: default, hover, active, focus, disabled, loading

ICONS: optional leading or trailing icon (16px/20px)

RADIUS: medium (8px) by default
```

### IndustryCard

```
VARIANTS:
  Default:    Icon + name + 1-line description + arrow
  Expanded:   Icon + name + description + 3 sub-items + CTA
  Featured:   Background image + overlay + name + metric + CTA

BEHAVIOR:
  Hover: subtle lift (translateY -2px) + shadow increase
  Click: navigates to industry page
  Mobile: stack vertically, full-width

CONTENT MODEL (from CMS):
  - industry_icon: Icon reference
  - industry_name: string
  - industry_slug: string
  - short_description: string (max 120 chars)
  - hero_image: image reference
  - accent_color: color token
  - sub_verticals: array of { name, slug }
  - featured_metric: { number, label, source }
```

### HeroHomepage

```
STRUCTURE:
  ┌─────────────────────────────────────────────┐
  │                                             │
  │  [Label tag: "Enterprise Technology"]       │
  │                                             │
  │  Enterprise technology                      │  ← Display XL
  │  that transforms                            │
  │  [healthcare ▾]                             │  ← Animated industry word
  │                                             │
  │  Short supporting line (max 20 words)       │  ← Body L, muted
  │                                             │
  │  [ Explore Solutions ]  [ Talk to Us ]      │  ← Button L + Button L secondary
  │                                             │
  │                     Background: subtle      │
  │                     animated gradient or     │
  │                     abstract network mesh    │
  └─────────────────────────────────────────────┘

BEHAVIOR:
  - Industry word cycles every 3s with crossfade
  - Clicking the word opens industry quick-nav
  - Responsive: stacks, reduces type scale
  - Min height: 80vh desktop, 60vh mobile
```

### CTABanner

```
VARIANTS:
  Standard:   Heading + subtext + 2 buttons on colored background
  Assessment: Heading + subtext + embedded form (email + industry select)
  Minimal:    Single line + single button (inline)

COLOR OPTIONS: brand purple, dark, white, industry accent

STRUCTURE:
  ┌─────────────────────────────────────────────┐
  │                                             │
  │  Ready to transform your                    │
  │  [industry] operations?                     │
  │                                             │
  │  Get a personalized assessment in           │
  │  10 minutes.                                │
  │                                             │
  │  [ Get Your Assessment ]  [ Contact Us ]    │
  │                                             │
  └─────────────────────────────────────────────┘
```

### OutcomeStories (MetricStrip)

```
STRUCTURE:
  3-column grid, each card:
  ┌──────────────────┐
  │  40%             │  ← Display L, brand color
  │  faster response │  ← H4
  │  times           │
  │                  │
  │  CHU Lyon        │  ← Body S, muted
  │  Healthcare      │  ← Tag
  │                  │
  │  [Read story →]  │  ← Ghost button
  └──────────────────┘

BEHAVIOR:
  - Numbers animate (count-up) on scroll into view
  - Cards have subtle hover elevation
  - Links to full case study
```

---
---

# 5. TECHNICAL STACK

---

## 5.1 — Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        VISITORS                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    CDN / Edge                                │
│              Vercel Edge Network                             │
│         (global PoPs, automatic SSL, DDoS protection)       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 Next.js 15 (App Router)                      │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐    │
│  │   Static   │  │    ISR     │  │  Server Components │    │
│  │ Generation │  │ (on-demand │  │  (dynamic pages)   │    │
│  │ (marketing │  │  revalidate│  │                    │    │
│  │  pages)    │  │  for blog, │  │  Search, filters,  │    │
│  │            │  │  resources)│  │  personalization   │    │
│  └────────────┘  └────────────┘  └────────────────────┘    │
│                                                              │
│  Middleware: i18n routing, redirects, geo-detection          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Headless CMS                                │
│                                                              │
│  PRIMARY: Sanity.io                                          │
│  ├── Structured content models                               │
│  ├── Real-time collaborative editing                         │
│  ├── Localization (built-in i18n)                            │
│  ├── Image pipeline (CDN + transformations)                  │
│  ├── GROQ query language                                     │
│  ├── Portable Text (rich text)                               │
│  ├── Webhook triggers → ISR revalidation                     │
│  └── Preview mode for draft content                          │
│                                                              │
│  ALTERNATIVE: Contentful or Strapi                           │
│  (evaluate during Phase 1 spike)                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supporting Services                         │
│                                                              │
│  Search:        Algolia (instant search, faceted filters)    │
│  Analytics:     Plausible or Fathom (privacy-first)          │
│                 + Google Analytics 4 (enterprise reporting)  │
│  Forms:         Next.js API routes → HubSpot / Salesforce    │
│  A/B Testing:   Vercel Edge Config or LaunchDarkly           │
│  Monitoring:    Vercel Analytics + Sentry (error tracking)   │
│  Image CDN:     Sanity Image Pipeline or Cloudinary          │
│  Video:         YouTube embeds or Mux (self-hosted player)   │
│  PDF Hosting:   Remains on al-enterprise.com (current site)  │
└─────────────────────────────────────────────────────────────┘
```

## 5.2 — Technology Decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 15 (App Router) | SSG + ISR + SSR flexibility. React ecosystem. Vercel-optimized. Industry standard for enterprise marketing sites. |
| **Rendering** | Static-first with ISR | Marketing pages pre-rendered at build. Blog/resources revalidate on publish. Search/filter pages are server-rendered. |
| **Styling** | Tailwind CSS 4 | Utility-first, design-token driven, excellent DX, tree-shakes unused CSS. |
| **Component lib** | Custom (Radix UI primitives) | Radix for accessible primitives (dialog, dropdown, tabs). Custom styled layer on top. No heavy UI framework. |
| **CMS** | Sanity.io | Best-in-class structured content. Built-in i18n. Real-time editing. GROQ is powerful. Free tier generous. Studio is customizable. |
| **Hosting** | Vercel | Native Next.js optimization. Global edge. Preview deployments. Analytics built-in. |
| **Search** | Algolia | Instant search (<50ms). Faceted filtering. Multi-language. Industry standard. |
| **Forms/CRM** | HubSpot or Salesforce | Form submissions route to CRM. Marketing automation. Lead scoring. |
| **Analytics** | GA4 + Plausible | GA4 for enterprise reporting/attribution. Plausible for privacy-first real-time dashboard. |
| **i18n** | next-intl + Sanity i18n | Framework-level routing. CMS-level content translation. URL-based locale (`/en/`, `/fr/`, `/de/`). |
| **Monitoring** | Sentry + Vercel Analytics | Error tracking. Web Vitals monitoring. Real user metrics. |

## 5.3 — Content Model (Sanity CMS)

```
DOCUMENT TYPES:
──────────

page                    ← Generic page (about, contact, legal)
  - title, slug, seo, body, sections[]

industryPage            ← Industry vertical pages
  - title, slug, seo, icon, accentColor
  - heroImage, heroStatement, heroMetric
  - subVerticals[] → industryPage
  - challenges[] { title, description }
  - solutions[] → solutionPage
  - caseStudies[] → caseStudy
  - resources[] → resource
  - ctaBanner

solutionPage            ← Outcome-organized solution pages
  - title, slug, seo, outcomeStatement
  - heroImage, heroMetric
  - problemStatement (richText)
  - capabilities[] { icon, title, description }
  - products[] → productPage
  - industries[] → industryPage
  - caseStudy → caseStudy
  - ctaBanner

productPage             ← Platform/product pages
  - title, slug, seo, productFamily
  - heroImage, tagline
  - features[] { icon, title, description }
  - specifications (richText)
  - integrations[] → productPage
  - deploymentOptions[] { type, description }
  - relatedSolutions[] → solutionPage
  - datasheetPDF (url to al-enterprise.com)
  - status: active | maintenance | endOfSale | endOfLife

caseStudy               ← Customer stories
  - title, slug, seo
  - customer { name, logo, industry }
  - heroImage, videoUrl
  - challenge, solution, outcome (richText)
  - metrics[] { number, label }
  - products[] → productPage
  - industry → industryPage
  - quote { text, author, role }

blogPost                ← Blog articles
  - title, slug, seo, author, publishDate
  - category, tags[], industry
  - heroImage, excerpt
  - body (portableText)
  - relatedPosts[] → blogPost

resource                ← Downloadable resources
  - title, slug, seo, type (whitepaper|webinar|datasheet|guide)
  - heroImage, excerpt
  - industry, solution area
  - downloadUrl (→ al-enterprise.com PDF)
  - gated: boolean
  - body (optional richText summary)

partnerProfile          ← Partner directory entries
  - name, slug, logo, tier
  - description, specializations[]
  - industries[], regions[]
  - contactUrl, partnerSince

archiveProduct          ← Legacy product entries
  - title, slug, seo
  - status: maintenance | endOfSale | endOfLife
  - description, category
  - documentationLinks[] { label, url }
  - downloadLinks[] { label, url }
  - migrationTarget → productPage
  - endOfSaleDate, endOfLifeDate

SINGLETON TYPES:
──────────
siteSettings            ← Global configuration
  - siteName, logo, favicon
  - defaultSEO, socialLinks
  - announcementBar { text, link, active }
  - footerContent

navigation              ← Nav structure
  - primaryNav[] { label, link, children[], featured }
  - utilityNav[] { label, link, icon }
  - footerNav[] { heading, links[] }
```

## 5.4 — Project Structure

```
ale-website/
├── .env.local                  ← Environment variables
├── .env.example                ← Template for team
├── next.config.ts              ← Next.js config (redirects, i18n, images)
├── tailwind.config.ts          ← Design tokens → Tailwind
├── sanity.config.ts            ← Sanity Studio config
├── package.json
├── tsconfig.json
│
├── public/
│   ├── fonts/                  ← Self-hosted Inter, JetBrains Mono
│   ├── icons/                  ← Favicon set, PWA icons
│   └── og/                     ← Default OG images
│
├── src/
│   ├── app/                    ← Next.js App Router
│   │   ├── [locale]/           ← i18n routing
│   │   │   ├── page.tsx                    ← Homepage
│   │   │   ├── layout.tsx                  ← Root layout (nav, footer)
│   │   │   ├── industries/
│   │   │   │   ├── page.tsx                ← Industry hub
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx            ← Industry page
│   │   │   │       └── [subSlug]/page.tsx  ← Sub-vertical
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── platform/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── customers/
│   │   │   │   ├── page.tsx
│   │   │   │   └── case-studies/[slug]/page.tsx
│   │   │   ├── partners/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── become-a-partner/page.tsx
│   │   │   │   └── find-a-partner/page.tsx
│   │   │   ├── developers/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [...slug]/page.tsx
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── blog/[slug]/page.tsx
│   │   │   │   └── product-archive/[slug]/page.tsx
│   │   │   └── company/
│   │   │       └── [...slug]/page.tsx
│   │   │
│   │   ├── api/                ← API routes
│   │   │   ├── revalidate/     ← Sanity webhook → ISR
│   │   │   ├── search/         ← Algolia proxy
│   │   │   ├── contact/        ← Form submissions
│   │   │   └── preview/        ← CMS preview mode
│   │   │
│   │   └── studio/             ← Embedded Sanity Studio
│   │       └── [[...index]]/page.tsx
│   │
│   ├── components/             ← Component library (see §4)
│   │   ├── primitives/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── content/
│   │   ├── cards/
│   │   ├── heroes/
│   │   ├── sections/
│   │   ├── forms/
│   │   ├── media/
│   │   └── utility/
│   │
│   ├── lib/                    ← Shared utilities
│   │   ├── sanity/
│   │   │   ├── client.ts       ← Sanity client config
│   │   │   ├── queries.ts      ← GROQ queries
│   │   │   └── schemas/        ← Sanity schema definitions
│   │   ├── algolia.ts          ← Search client
│   │   ├── analytics.ts        ← Event tracking
│   │   ├── i18n.ts             ← Internationalization config
│   │   └── utils.ts            ← General utilities
│   │
│   ├── styles/
│   │   └── globals.css         ← Tailwind base + custom utilities
│   │
│   └── types/                  ← TypeScript type definitions
│       ├── sanity.ts           ← Generated Sanity types
│       └── index.ts
│
├── sanity/                     ← Sanity Studio schemas (if separate)
│   ├── schemas/
│   └── desk-structure.ts
│
└── scripts/
    ├── generate-redirects.ts   ← Build redirect map
    ├── sync-algolia.ts         ← Index content to Algolia
    └── migrate-content.ts      ← Content migration helpers
```

---
---

# 6. MIGRATION ROADMAP

---

## Phase Overview

```
PHASE 1 — FOUNDATION & HERO PAGES          Weeks 1-8
PHASE 2 — CONTENT EXPANSION & LAUNCH       Weeks 9-16
PHASE 3 — OPTIMIZATION & SCALE             Weeks 17-24+
```

---

## PHASE 1 — Foundation & Hero Pages (Weeks 1-8)

### Week 1-2: Project Setup & Design System

| Task | Deliverable |
|------|-------------|
| Initialize Next.js project + Tailwind + TypeScript | Repo, CI/CD |
| Set up Sanity Studio with initial schemas | CMS accessible |
| Configure Vercel deployment pipeline | Preview + production URLs |
| Implement design tokens in Tailwind config | tokens → CSS |
| Build primitive components (Button, Badge, Input, Icon) | Component library start |
| Set up Storybook for component documentation | Storybook deployed |
| Configure next-intl for i18n routing | /en/, /fr/, /de/ working |

### Week 3-4: Layout & Navigation

| Task | Deliverable |
|------|-------------|
| Build Navbar + NavDropdown + MobileMenu | Full responsive nav |
| Build Footer component | Desktop + mobile footer |
| Build layout shell (Container, Grid, Section) | Page layout system |
| Create Breadcrumbs + SecondaryNav | Contextual navigation |
| Implement search overlay (Algolia integration) | Search functional |
| Build 301 redirect map (first 100 critical paths) | next.config redirects |

### Week 5-6: Homepage + Industry Pages

| Task | Deliverable |
|------|-------------|
| Build HeroHomepage with animated industry word | Hero functional |
| Build IndustrySelector interactive section | Industry chooser |
| Build OutcomeStories / MetricStrip | Proof section |
| Build SolutionPathways section | Outcome navigation |
| Build TrustStrip (logo wall + stats) | Social proof |
| Build CTABanner component | Conversion block |
| Create 3 pilot industry pages (Healthcare, Education, Hospitality) | 3 live verticals |
| Populate Sanity with pilot content | CMS content populated |

### Week 7-8: Solution + Platform Pages

| Task | Deliverable |
|------|-------------|
| Build solution page template | Reusable template |
| Create 3 pilot solution pages | 3 live solutions |
| Build platform overview page | Platform story |
| Build product page template | Reusable template |
| Create Rainbow product page (flagship) | Key product live |
| SEO setup: meta, OG, structured data, sitemap.xml | SEO foundation |
| Performance audit + optimization | Core Web Vitals green |
| Internal review + stakeholder feedback | Approval to proceed |

**Phase 1 Exit Criteria:**
- Homepage live on staging
- 3 industry pages, 3 solution pages, 1 platform page
- Navigation fully functional (desktop + mobile)
- Search working
- CMS content editable by marketing team
- Core Web Vitals passing (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Redirects for top 100 pages configured

---

## PHASE 2 — Content Expansion & Launch (Weeks 9-16)

### Week 9-10: Remaining Industry + Solution Pages

| Task | Deliverable |
|------|-------------|
| Build remaining 5 industry pages | 8/8 verticals live |
| Build sub-vertical pages (hospitals, K-12, hotels, etc.) | ~15 sub-pages |
| Build remaining solution pages | All 6 outcome categories |
| Build solution sub-pages | ~12 more pages |

### Week 11-12: Content Migration & Resources

| Task | Deliverable |
|------|-------------|
| Migrate blog content (last 2 years) | Blog section live |
| Build resource center with filters | Searchable content hub |
| Create product archive section | Legacy products accessible |
| Migrate case studies (top 20) | Customer proof hub live |
| Build case study template | Reusable template |

### Week 13-14: Partners, Developers, Company

| Task | Deliverable |
|------|-------------|
| Build partner hub + track pages | Partner section live |
| Build partner directory (find-a-partner) | Directory searchable |
| Build developer hub (Getting Started, API docs) | Dev section live |
| Build company pages (about, leadership, innovation, contact) | Corporate section live |
| Build newsroom template | Press releases migrated |

### Week 15-16: Launch Preparation

| Task | Deliverable |
|------|-------------|
| Complete 301 redirect map (all pages) | Full redirect coverage |
| QA: cross-browser, cross-device testing | Bug fixes |
| Accessibility audit (WCAG 2.1 AA) | Compliance report |
| Performance optimization (images, fonts, bundles) | All green |
| SEO audit: structured data, sitemaps, hreflang | SEO ready |
| Analytics setup: GA4 + Plausible + event tracking | Tracking live |
| CMS training for marketing team | Team trained |
| Staged launch: internal → beta users → public | **LAUNCH** |

**Phase 2 Exit Criteria:**
- Full site live on production domain
- All redirects active (monitor 404s)
- Analytics tracking confirmed
- CMS operational with trained editors
- Lighthouse scores: Performance 90+, Accessibility 95+, SEO 95+

---

## PHASE 3 — Optimization & Scale (Weeks 17-24+)

| Track | Activities |
|-------|------------|
| **Conversion** | A/B test hero variants, CTA placements, form layouts. Implement progressive profiling. Add ROI calculator. |
| **Content** | Expand case studies. Create industry benchmark reports. Launch webinar series integration. |
| **Personalization** | Implement industry-based content recommendations. Return visitor recognition. Geo-targeted content. |
| **Developer** | Expand API docs. Add interactive playground. Launch community forum. |
| **Partners** | Build partner marketplace. Implement co-branded landing pages. Partner dashboard. |
| **Performance** | Image optimization automation. Edge caching refinement. Bundle size monitoring. |
| **SEO** | Internal linking optimization. Content gap analysis. Programmatic pages for long-tail. |
| **i18n** | Phase French, German, Spanish, Chinese, Arabic translations. RTL support. |
| **Legacy** | Progressive PDF-to-web conversion for high-traffic datasheets. Archive page improvements. |
| **Analytics** | Conversion funnel analysis. Heatmap studies. User journey mapping. |

---
---

# 7. REDIRECT STRATEGY

---

## 7.1 — Redirect Principles

1. **Every existing indexed URL gets a 301** — no orphaned pages
2. **No redirect chains** — every old URL maps directly to its final destination
3. **No redirect loops** — validated programmatically
4. **Preserve query parameters** where relevant (UTM tracking)
5. **Monitor 404s** daily for 90 days post-launch

## 7.2 — Redirect Mapping (Pattern-Based)

```
INDUSTRY PAGES
──────────
/en/industries                       → /en/industries
/en/industries/healthcare            → /en/industries/healthcare
/en/industries/education             → /en/industries/education
/en/industries/hospitality           → /en/industries/hospitality
/en/industries/government            → /en/industries/government
/en/industries/transportation        → /en/industries/transportation
/en/industries/energy                → /en/industries/energy
/en/industries/manufacturing         → /en/industries/manufacturing
/en/industries/smart-buildings       → /en/industries/smart-buildings
(mostly 1:1 — sub-pages may differ)

SOLUTION PAGES
──────────
/en/solutions                                → /en/solutions
/en/solutions/cloud-communications           → /en/solutions/modernize-communications
/en/solutions/unified-communications         → /en/solutions/modernize-communications/unified-communications
/en/solutions/network-management             → /en/solutions/secure-your-network
/en/solutions/digital-age-networking/*       → /en/solutions/secure-your-network/* (mapped individually)
/en/solutions/business-continuity            → /en/solutions/secure-your-network
/en/solutions/iot-*                          → /en/solutions/connect-everything/*

PRODUCT PAGES
──────────
/en/products                                 → /en/platform/all-products
/en/products/rainbow                         → /en/platform/rainbow
/en/products/omniswitch-*                    → /en/platform/omniswitch
/en/products/stellar-*                       → /en/platform/stellar-wifi
/en/products/omnipcx-enterprise              → /en/platform/all-products/communications
/en/products/[legacy-product]                → /en/resources/product-archive/[legacy-product]

PARTNER PAGES
──────────
/en/partners                                 → /en/partners
/en/partners/business-partners               → /en/partners/become-a-partner/business-partner
/en/partners/dspp                            → /en/partners/become-a-partner/technology-partner
/en/partners/consultants                     → /en/partners/become-a-partner/consultant

RESOURCE PAGES
──────────
/en/company/blog/*                           → /en/resources/blog/*
/en/company/news/*                           → /en/company/newsroom/*

COMPANY PAGES
──────────
/en/company                                  → /en/company/about
/en/company/about-us                         → /en/company/about
/en/company/management                       → /en/company/leadership

PDF DOWNLOADS
──────────
No redirects needed — PDFs stay at current al-enterprise.com URLs.
New site links directly to them.

LOCALE PATTERNS
──────────
/fr/*, /de/*, /es/*, /zh/* → mapped identically within locale prefix
```

## 7.3 — Implementation in Next.js

```typescript
// next.config.ts — redirects array (simplified example)
async redirects() {
  return [
    // Pattern-based redirects
    {
      source: '/en/solutions/cloud-communications',
      destination: '/en/solutions/modernize-communications',
      permanent: true,
    },
    {
      source: '/en/products',
      destination: '/en/platform/all-products',
      permanent: true,
    },
    // Wildcard redirects for legacy products
    {
      source: '/en/products/:slug(omnipcx-office|opentouch-suite|...)',
      destination: '/en/resources/product-archive/:slug',
      permanent: true,
    },
    // Full redirect map generated by scripts/generate-redirects.ts
    ...generatedRedirects,
  ];
}
```

## 7.4 — Monitoring Plan

| Tool | Purpose | Frequency |
|------|---------|-----------|
| Google Search Console | 404 errors, crawl issues, index coverage | Daily (first 90 days) |
| Vercel Analytics | 404 page hits, redirect performance | Real-time |
| Custom script | Validate all old URLs resolve correctly | Weekly automated |
| Sentry | Client-side 404 tracking | Continuous |

---
---

# 8. PERFORMANCE OPTIMIZATION PLAN

---

## 8.1 — Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.0s | Static generation, image optimization, font preload, CDN |
| **INP** (Interaction to Next Paint) | < 150ms | Minimal client JS, React Server Components, code splitting |
| **CLS** (Cumulative Layout Shift) | < 0.05 | Explicit image dimensions, font-display: swap, reserved slots |
| **FCP** (First Contentful Paint) | < 1.5s | SSG, edge rendering, critical CSS inline |
| **TTFB** (Time to First Byte) | < 200ms | Vercel Edge, static pages, CDN cache |

## 8.2 — Optimization Strategies

### Images
```
- Format: WebP with AVIF progressive enhancement (Next.js Image handles this)
- Responsive: srcset with 640/768/1024/1280/1536 breakpoints
- Lazy loading: native loading="lazy" for below-fold images
- Priority: LCP image gets priority loading (no lazy)
- Sanity CDN: automatic format conversion, resizing, quality optimization
- Blur placeholder: low-quality image placeholder (LQIP) during load
- Max file sizes: Hero 150KB, cards 50KB, thumbnails 20KB
```

### Fonts
```
- Self-hosted (no Google Fonts external request)
- Subset: Latin + Latin Extended only (reduce file size 60%)
- Format: WOFF2 only (universal support, smallest size)
- Display: font-display: swap (text visible immediately)
- Preload: <link rel="preload"> for primary weights (400, 600, 700)
- Variable font: single file for all weights (Inter supports this)
```

### JavaScript
```
- React Server Components: 70% of components render server-side (zero client JS)
- Client components: only for interactive elements (dropdowns, search, animations)
- Code splitting: automatic via Next.js App Router
- Tree shaking: Tailwind purges unused CSS. No unused JS libraries.
- Bundle budget: < 100KB first-load JS (gzipped)
- Third-party: defer analytics, lazy-load Algolia, no render-blocking scripts
```

### Caching
```
- Static pages: immutable cache (revalidate via ISR webhook)
- API responses: stale-while-revalidate where appropriate
- Sanity content: CDN-cached with tag-based invalidation
- Assets: 1-year cache with content-hash filenames
- Edge caching: Vercel handles automatically for SSG/ISR pages
```

## 8.3 — Performance Monitoring

| Tool | Metric | Alert Threshold |
|------|--------|-----------------|
| Vercel Analytics | Real User Metrics (RUM) | LCP > 3s or CLS > 0.1 |
| Lighthouse CI | Synthetic scores on deploy | Score < 90 blocks deploy |
| Sentry | JS errors, slow transactions | Error rate > 0.1% |
| Custom dashboard | Bundle size trend | > 5% increase per release |

---
---

# 9. SEO & MULTILINGUAL READINESS

---

## 9.1 — SEO Architecture

### URL Structure
```
/{locale}/{section}/{slug}

Examples:
/en/industries/healthcare
/fr/industries/sante
/de/industries/gesundheitswesen
/en/solutions/modernize-communications
/en/platform/rainbow
/en/resources/blog/ai-network-management
```

### Technical SEO Checklist

| Element | Implementation |
|---------|---------------|
| **Title tags** | `{Page Title} | {Section} | Alcatel-Lucent Enterprise` — max 60 chars |
| **Meta description** | Unique per page, outcome-focused, max 155 chars |
| **H1** | One per page, matches primary keyword intent |
| **Canonical URLs** | Self-referencing canonical on every page |
| **XML Sitemap** | Auto-generated, split by section (industries.xml, solutions.xml, etc.) |
| **robots.txt** | Allow all public pages. Disallow /studio, /api, /preview |
| **Structured data** | Organization, BreadcrumbList, Product, Article, FAQ, HowTo |
| **Open Graph** | og:title, og:description, og:image (1200x630), og:url |
| **Twitter Cards** | summary_large_image for all pages |
| **Internal linking** | Automated related content. Cross-link industries ↔ solutions ↔ products |

### Schema.org Implementation

```json
// Organization (homepage)
{
  "@type": "Organization",
  "name": "Alcatel-Lucent Enterprise",
  "url": "https://www.al-enterprise.com",
  "logo": "...",
  "sameAs": ["linkedin", "twitter", "youtube"]
}

// BreadcrumbList (all pages)
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "/en/" },
    { "position": 2, "name": "Industries", "item": "/en/industries/" },
    { "position": 3, "name": "Healthcare", "item": "/en/industries/healthcare/" }
  ]
}

// Product (product pages)
{
  "@type": "Product",
  "name": "Rainbow",
  "description": "...",
  "brand": { "@type": "Brand", "name": "Alcatel-Lucent Enterprise" },
  "category": "Enterprise Communications Platform"
}

// Article (blog posts)
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "...",
  "publisher": { "@type": "Organization", "name": "Alcatel-Lucent Enterprise" }
}
```

## 9.2 — Multilingual Strategy

### Supported Languages (Phased)

| Phase | Languages | Notes |
|-------|-----------|-------|
| Launch | English (en) | Full content |
| Phase 3a | French (fr) | ALE HQ is France-based. High priority. |
| Phase 3b | German (de), Spanish (es) | Key European markets |
| Phase 3c | Chinese (zh), Arabic (ar) | Growth markets. Arabic = RTL support. |
| Future | Portuguese (pt-BR), Japanese (ja) | Based on traffic data |

### i18n Implementation

```
ROUTING: URL-based locale prefix
  /en/industries/healthcare
  /fr/industries/sante
  /de/industries/gesundheitswesen

FRAMEWORK: next-intl
  - Middleware detects locale from URL
  - Fallback to browser Accept-Language → default en
  - No cookie-based locale (SEO-unfriendly)

CMS: Sanity document-level i18n
  - Each document has a _lang field
  - Translations linked via _translationRefs
  - Editorial workflow per language
  - Untranslated content falls back to English with banner:
    "This page is not yet available in [language]. Showing English version."

HREFLANG: Automated via component
  <link rel="alternate" hreflang="en" href="https://www.al-enterprise.com/en/..." />
  <link rel="alternate" hreflang="fr" href="https://www.al-enterprise.com/fr/..." />
  <link rel="alternate" hreflang="x-default" href="https://www.al-enterprise.com/en/..." />

UI STRINGS: JSON message files per locale
  /messages/en.json
  /messages/fr.json
  Managed in repo (not CMS) — buttons, labels, nav items

RTL SUPPORT (Phase 3c):
  - Tailwind RTL plugin (dir="rtl" on html)
  - Logical properties: ms-4 instead of ml-4
  - Mirrored layouts, icons, navigation
  - Tested with Arabic content
```

### Content Translation Workflow

```
1. Content created in English (source of truth)
2. Published to production in English
3. Translation team creates French/German/etc. version in Sanity
4. Each translation goes through editorial review
5. Published when approved — independent of English updates
6. Sanity webhook triggers ISR for translated page
7. If English source is updated, translation flagged as "needs update"
```

---
---

# 10. CONVERSION OPTIMIZATION STRATEGY

---

## 10.1 — Conversion Funnel Architecture

```
AWARENESS                    CONSIDERATION                 DECISION
(Top of funnel)              (Mid funnel)                  (Bottom of funnel)
─────────────                ─────────────                 ─────────────
Blog post                    Solution page                 Contact form
Industry page                Case study                    Assessment tool
Homepage                     Product page                  Demo request
Social/search ad             Webinar                       Pricing inquiry
                             Whitepaper (gated)            Partner referral

CTAs:                        CTAs:                         CTAs:
"Learn more"                 "See how it works"            "Get your assessment"
"Explore solutions"          "Download guide"              "Request demo"
"Read story"                 "Watch webinar"               "Talk to an expert"
                             "Compare options"             "See pricing"
```

## 10.2 — CTA Strategy (Replacing "Contact Sales" Everywhere)

| Page Type | Primary CTA | Secondary CTA | Tertiary CTA |
|-----------|-------------|---------------|--------------|
| **Homepage** | Explore Solutions | Talk to Us | — |
| **Industry page** | Get Your [Industry] Assessment | See Case Studies | Contact |
| **Solution page** | See How It Works (demo) | Download Guide | Talk to Expert |
| **Product page** | Request Demo | See Pricing | Try Free (Rainbow) |
| **Case study** | Get Similar Results | Explore Solution | — |
| **Blog post** | Related Solution (contextual) | Subscribe | — |
| **Partner page** | Calculate Your Opportunity | Apply Now | — |
| **Developer page** | Get API Key | Read Docs | — |

## 10.3 — Lead Capture Points

### Assessment Tool (High-Value Conversion)
```
"Get your personalized technology assessment"

Step 1: Select your industry (Healthcare / Education / ...)
Step 2: Select your challenge (Modernize comms / Secure network / ...)
Step 3: Company size (dropdown)
Step 4: Email + Name

Output: Personalized recommendation page + emailed PDF
Backend: Lead captured in CRM with industry + challenge tags
```

### Progressive Profiling
```
Visit 1: Read blog → Newsletter signup (email only)
Visit 2: Download whitepaper → Name + Company
Visit 3: View pricing → Phone + Role
Visit 4: Request demo → Full qualification

Each touchpoint captures incrementally more data.
CRM builds a composite profile over time.
```

### Micro-Conversions (No Form Required)
```
- Industry page: click "Healthcare" → tracked as interest signal
- Solution page: click "See pricing" → tracked as intent signal
- Product page: watch demo video → tracked as engagement signal
- Resource: download datasheet → tracked (if ungated)
- Search: query terms → tracked as intent data

All feed into analytics/CRM for lead scoring.
```

## 10.4 — A/B Testing Roadmap

| Priority | Test | Hypothesis | Metric |
|----------|------|------------|--------|
| P0 | Hero CTA copy | "Get Started" vs "Explore Solutions" vs "See How" | Click-through rate |
| P0 | Assessment form length | 3-step vs 5-step | Completion rate |
| P1 | Industry page layout | Challenge-first vs metric-first | Time on page, CTA clicks |
| P1 | Case study format | Narrative vs metric-card | CTA clicks |
| P2 | Dark vs light hero | Dark background vs light | Bounce rate |
| P2 | Navigation: 5 items vs 6 | Add "Customers" to primary nav? | Engagement depth |
| P3 | Personalized vs generic hero | Industry-aware returning visitors | Conversion rate |

## 10.5 — Analytics & Measurement Framework

### KPIs by Page Type

| Page Type | Primary KPI | Secondary KPIs |
|-----------|------------|-----------------|
| Homepage | CTA click rate | Bounce rate, scroll depth, industry selection |
| Industry | Assessment starts | Time on page, sub-vertical clicks, case study views |
| Solution | Demo requests | Guide downloads, video plays, product clicks |
| Product | Demo requests | Spec views, pricing clicks, comparison usage |
| Case Study | CTA clicks (next step) | Read completion, video play rate |
| Partner | Applications started | Calculator usage, tier views |
| Developer | API key signups | Docs page views, SDK downloads |
| Resource | Downloads / reads | Gated form completions, engagement depth |

### Event Tracking Schema

```javascript
// Standardized event naming
analytics.track('cta_click', {
  page_type: 'solution',
  page_slug: 'modernize-communications',
  cta_text: 'Request Demo',
  cta_position: 'hero',           // hero | inline | footer | sticky
  industry_context: 'healthcare', // if on industry-filtered page
  locale: 'en',
});

analytics.track('form_submit', {
  form_type: 'assessment',
  step: 3,                        // multi-step form progress
  industry: 'healthcare',
  company_size: '1000-5000',
});

analytics.track('content_engagement', {
  content_type: 'case_study',
  content_slug: 'chu-lyon-healthcare',
  action: 'video_play',           // video_play | pdf_download | scroll_complete
  engagement_time: 45,            // seconds
});
```

---
---

# 11. PARTNER & DEVELOPER FUNNEL IMPROVEMENTS

---

## 11.1 — Partner Funnel Redesign

### Current State → Target State

| Aspect | Current | Target |
|--------|---------|--------|
| Entry point | Buried under nav | Prominent "Partners" in primary nav |
| Value prop | "We enable partners" (vague) | "Grow 30% faster with ALE" (quantified) |
| Program info | Tier descriptions | Revenue opportunity calculator |
| Social proof | None visible | Partner success stories with revenue impact |
| CTA | "Contact Sales" | "Calculate Your Opportunity" → "Apply Now" |
| Onboarding | Manual (email-based) | Self-service application + automated qualification |
| Marketplace | None | Phase 3: Partner solution directory |
| Co-marketing | Not visible | Visible co-branding opportunities + tools |

### Partner Page Flow

```
/partners (Hub)
│
├── "Why partner with ALE?"
│   ├── Revenue opportunity (metrics)
│   ├── Partner success story (featured)
│   └── Key differentiators vs. competing programs
│
├── Partner Tracks (3 cards):
│   ├── Business Partner
│   │   ├── Benefits overview
│   │   ├── Tier comparison (Silver → Gold → Platinum)
│   │   ├── Revenue calculator
│   │   └── [Apply Now →]
│   │
│   ├── Technology Partner
│   │   ├── Integration opportunities
│   │   ├── API access & sandbox
│   │   ├── Marketplace listing
│   │   └── [Start Integrating →]
│   │
│   └── Consultant
│       ├── Certification path
│       ├── Resource access
│       └── [Join Program →]
│
├── Partner Success Stories
│   ├── Filterable by industry, region, tier
│   └── Each with revenue/growth metrics
│
├── Find a Partner (directory)
│   ├── Search by: industry, region, specialization
│   ├── Partner profile cards
│   └── Contact partner directly
│
└── Partner Portal Login
    └── → Redirect to existing portal
```

### Revenue Opportunity Calculator

```
"How much could you earn with ALE?"

Input:
  - Your current business type (reseller / MSP / integrator)
  - Annual revenue range
  - Number of customers
  - Industries you serve

Output:
  - Estimated incremental revenue
  - Recommended partner tier
  - Top 3 solution areas for your market
  - Personalized next steps

CTA: "Apply as a [recommended tier] Partner"
Backend: Lead captured with calculator data for partner team
```

## 11.2 — Developer Funnel Redesign

### Current State → Target State

| Aspect | Current | Target |
|--------|---------|--------|
| Visibility | Hidden under DSPP | "Developers" accessible from Platform nav |
| First impression | Partner program description | Code-first: "Build on ALE" |
| Getting started | None | 5-minute quickstart guide |
| API docs | External / fragmented | Integrated, interactive API reference |
| SDKs | Not visible | SDKs for Python, JavaScript, .NET |
| Sandbox | None | Free sandbox environment for testing |
| Community | None | Developer forum / Discord (Phase 3) |
| Marketplace | None | Submit your integration (Phase 3) |

### Developer Hub Structure

```
/developers (Hub)
│
├── Hero: "Build on the ALE Platform"
│   ├── Code snippet preview (Rainbow API call)
│   └── [Get API Key →] [Read Docs →]
│
├── Getting Started
│   ├── "Your first API call in 5 minutes"
│   ├── Authentication setup
│   ├── Hello World example
│   └── Next steps
│
├── Platform APIs
│   ├── Rainbow API (communications)
│   ├── Network API (OmniSwitch)
│   ├── AI Ops API (analytics)
│   └── Webhooks reference
│
├── SDKs & Tools
│   ├── JavaScript SDK
│   ├── Python SDK
│   ├── .NET SDK
│   └── CLI tools
│
├── Guides & Tutorials
│   ├── "Build a nurse call integration"
│   ├── "Create a custom analytics dashboard"
│   ├── "Automate network provisioning"
│   └── More...
│
├── Community (Phase 3)
│   ├── Forum / Discord
│   ├── Showcase: what developers have built
│   └── Changelog & roadmap
│
└── Become a Technology Partner
    └── → /partners/become-a-partner/technology-partner
```

### Developer Experience Design (B-Influenced)

```
VISUAL TREATMENT:
- Darker background sections (not full dark mode)
- Code blocks with syntax highlighting
- Interactive API explorer (try requests live)
- Terminal-style animations for setup guides
- Monospace typography for technical content

TONE:
- Direct, no marketing fluff
- "Here's the code. Here's what it does."
- Respect developer time
- Show, don't tell

MAINTAINED WITHIN A-AESTHETIC:
- Same whitespace discipline
- Same typography scale (with monospace additions)
- Same card patterns (with code-themed variants)
- Darker sections feel intentional, not disjointed
```

---
---

# 12. SUMMARY & NEXT STEPS

---

## Deliverables in This Document

| # | Section | Status |
|---|---------|--------|
| 1 | Refined Sitemap | Complete |
| 2 | Simplified Navigation | Complete |
| 3 | Design System Definition | Complete |
| 4 | Component System Proposal | Complete |
| 5 | Technical Stack | Complete |
| 6 | Migration Roadmap (3 phases) | Complete |
| 7 | Redirect Strategy | Complete |
| 8 | Performance Optimization Plan | Complete |
| 9 | SEO & Multilingual Readiness | Complete |
| 10 | Conversion Optimization Strategy | Complete |
| 11 | Partner & Developer Funnel Improvements | Complete |

## Immediate Next Steps

### To Proceed to Implementation:

1. **Review & approve** this Phase B plan
2. **Decide CMS**: Confirm Sanity.io or evaluate alternatives (Contentful, Strapi)
3. **Decide hosting**: Confirm Vercel or evaluate alternatives (Netlify, Cloudflare)
4. **Content audit**: Marketing team begins content inventory + prioritization
5. **Photography**: Commission or source industry-specific photography
6. **Begin Phase 1 Week 1**: Project setup, repo initialization, design token implementation

### Questions Requiring Decisions:

| Decision | Options | Impact |
|----------|---------|--------|
| Domain strategy | New subdomain? Same domain with path rewrite? Full domain migration? | SEO, redirects, DNS |
| CMS choice | Sanity (recommended) vs Contentful vs Strapi | Content workflow, cost, DX |
| Hosting | Vercel (recommended) vs Netlify vs Cloudflare Pages | Performance, cost, DX |
| Analytics | GA4 only vs GA4 + Plausible (recommended) | Privacy, compliance, insights |
| CRM integration | HubSpot vs Salesforce | Form handling, lead routing |
| Photography | Custom shoot vs curated stock vs hybrid | Budget, timeline, authenticity |
| Phase 1 pilot industries | Healthcare, Education, Hospitality (recommended) | Content production priority |

---

*Phase B Complete. Ready to begin implementation on your signal.*
