# ALE Website — Project Context

## Overview
Alcatel-Lucent Enterprise (ALE) corporate website rebuilt with **Payload CMS v3.77** + **Next.js 16.2.0-canary.56** (Turbopack), deployed on **Railway**.

## Key URLs
- **Production**: https://aleweb-production-b8f6.up.railway.app
- **Admin**: https://aleweb-production-b8f6.up.railway.app/admin
- **Original site**: https://www.al-enterprise.com
- **GitHub**: https://github.com/moussazaghdoud/aleweb
- **Debug**: `/api/chat/rainbow-debug` — Rainbow bridge diagnostic state

## Tech Stack
- Next.js 16.2.0-canary.56 (Turbopack) + Payload CMS v3.77
- PostgreSQL (prod/Railway), SQLite (local dev)
- Tailwind CSS v4 (with `@import "tailwindcss"` and `@theme inline` syntax)
- Docker multi-stage build on Railway, standalone output
- Localization: English + French (with fallback)
- Deploy: `git push origin master:main` triggers Railway build (~2-3 min)

## Architecture

### Collections (19 total)
- **Content**: Pages, Products (54), Solutions (20), Industries (9), Platforms (11), Services (5), BlogPosts (10), CompanyPages, LegalPages, Resources
- **System**: Users, Media (56), ContactSubmissions, PlanLeads
- **Chat**: ChatKnowledgeFiles, ChatSessions, KnowledgeSources, KnowledgeUploads

### Globals (5)
- Navigation, Footer, SiteConfig, Redirects, Homepage

### Blocks (15 types in `src/blocks/`)
Hero, RichText, FeaturesGrid, CTABanner, Stats, CardGrid, ImageText, FAQ, Testimonials, LogoCloud, VideoEmbed, ComparisonTable, Timeline, DownloadSection, TabsContent

### Key Directories
```
src/collections/       — 19 Payload collections
src/globals/           — 5 globals (Navigation, Footer, SiteConfig, Redirects, Homepage)
src/blocks/            — 15 page block types
src/app/(frontend)/    — Public routes + API routes
src/app/(payload)/     — Admin panel routes
src/lib/search/        — Search engine (PostgreSQL FTS + pg_trgm)
src/lib/chat/          — AI chatbot (OpenAI Responses API + RAG)
src/components/chat/   — Chat widget UI (glassmorphism)
src/components/admin/  — Admin dashboard components
src/components/search/ — Search UI (SearchModal, search page)
src/components/heroes/ — Hero components (HeroHomepage, GoalCaptureGlassPanel)
src/collections/PlanLeads.ts — Lead capture from GoalCapture email form
src/app/(frontend)/api/plan/email/ — Email lead submission endpoint
scripts/rainbow-s2s-worker.js — Rainbow SDK worker process (runs outside Next.js)
```

---

## Search Engine (COMPLETE & WORKING)
- **Architecture**: PostgreSQL FTS (`tsvector` + `pg_trgm`) in prod, in-memory fallback for SQLite dev
- **Code**: `src/lib/search/` — types, providers, normalizers, hooks, indexer, analytics, config
- **Config**: `search.config.json` (root) — synonyms, boosts, pinned results
- **API**: `/api/search`, `/api/suggest`, `/api/search/reindex` (auth), `/api/search/analytics` (auth)
- **UI**: SearchModal (Ctrl+K) with autocomplete, `/search` page with tabs/facets/pagination
- **Hooks**: All 10 searchable collections have afterChange/afterDelete sync hooks
- **Reindex**: `npx tsx scripts/reindex.ts` or POST `/api/search/reindex` with Bearer token

---

## AI Chatbot (WORKING)

### Widget Design
- **Glassmorphism chat panel**: `rgba(15,10,30,0.50)` background, `backdrop-filter: blur(24px)`, thin white border, deep shadow
- **Tri-Pillar header gradient**: blue → purple → cyan (`#3b82f6 → #7c3aed → #06b6d4`) matching ALE brand pillars
- **User bubbles**: blue-to-purple gradient; Assistant bubbles: translucent glass; Agent bubbles: green tint
- **System messages**: yellow (`#fbbf24`) for chat events, cyan (`#67e8f9`) for Rainbow room events (names anonymized as "Hugo")
- **Floating bubble**: tri-pillar gradient with backdrop blur, shows on first load (cold-start safe)
- **Cold-start fix**: Widget shows by default; only hides when `config.enabled === false` explicitly
- **Line breaks**: `white-space: pre-wrap` on message bubbles preserves `\n` in bot responses
- **Waiting animation**: Pulsing yellow dots with "Waiting for an agent" text during escalation

### Widget Architecture
Two-component split to avoid hydration crashes:
1. **`ChatWidget.tsx`** — Outer shell, renders bubble button. Uses `next/dynamic` to lazy-load panel.
2. **`ChatPanel.tsx`** — Full chat panel (dynamically imported, `ssr: false`). Contains all chat logic.

### ChatPanel Features
- **Conversation persistence**: On mount, loads message history from server via session API
- **Session reset on reload**: If previous session was escalated/closed, history is shown but a fresh AI session starts (sessionId cleared)
- **Feedback buttons**: "I'm happy" / "Talk to a human" — suppressed on history reload (`feedbackGiven=true`)
- **"Back to AI assistant" button**: Appears during agent wait, resets to fresh AI session
- **Polling**: When escalated, polls `/api/chat/sessions/{id}` every 3s for agent/system messages
- **SSE error handling**: Stream errors show actual error message instead of empty "..." bubble
- **Input bar**: White background with black text, auto-expanding textarea

### Architecture
- **AI**: OpenAI Responses API + `web_search` tool + File Search (vector store RAG)
- **Fallback**: If Responses API fails (500), falls back to Chat Completions API (no web search but always works)
- **Real-time**: SSE (Server-Sent Events) — no WebSocket needed
- **Session storage**: PostgreSQL tables (`chat_sessions` TEXT id, `chat_messages` FK)
- **Agent handoff**: Rainbow S2S bridge (see Rainbow Integration section below)
- **Security**: MIME allowlist (PDF/TXT/MD/DOCX), input sanitization, prompt injection detection (12 regex patterns)
- **Rate limiting**: 10 messages / 60s per IP

### Knowledge Base Management
Admin can manage chatbot knowledge from `/admin/collections/knowledge-sources`:

**URL sources** — Enter a URL + crawl depth (0-2), afterChange hook auto-crawls:
- robots.txt respected (5-min cache per origin, crawl-delay 1s-10s)
- BFS depth traversal with rate limiting between fetches
- Retry with exponential backoff (3 attempts, skips on content unchanged)
- 5-minute overall timeout on depth crawls
- Deduplication: 409 if already crawling

**File sources** — Upload via `KnowledgeUploads` collection (drag-and-drop in admin):
- Accepted: PDF, TXT, Markdown, DOCX (MIME allowlist, 415 for others)
- afterChange hook reads file from disk → uploads to OpenAI vector store
- Auto-updates status to indexed/failed

**Reindex** — POST `/api/chat/knowledge/reindex/[id]` with bearer token

### Knowledge API Routes
```
GET  /api/chat/knowledge              — List all sources
POST /api/chat/knowledge              — Upload file (form-data)
DELETE /api/chat/knowledge             — Remove source by ID
POST /api/chat/knowledge/url           — Add URL source
POST /api/chat/knowledge/reindex/[id]  — Re-index a source
GET  /api/chat/knowledge/health        — Health check (vector store + source counts)
```

### Admin Dashboard
- **KnowledgeDashboard** RSC component in `beforeDashboard` slot
- Shows: vector store health indicator (green/red dot), stats cards (total/indexed/failed/active), sources table with status badges + edit links
- Uses dynamic imports to prevent admin crashes on module errors
- Inline styles (no Tailwind dependency in admin context)

### Logging & Analytics
- **Event constants**: `file_indexed`, `file_deleted`, `url_crawled`, `url_crawl_failed`, `reindex_started/completed/failed`
- **`logChatEvent()`** wired into all knowledge routes + KnowledgeSources hooks
- **`chat_analytics`** PostgreSQL table with event_type, session_id, metadata (JSONB)
- **Injection detection**: logged as `injection_blocked` with IP and matched pattern

### Key Files
```
src/lib/chat/openai.ts      — OpenAI client, vector store, chatWithRAG() with web_search + fallback
src/lib/chat/crawler.ts     — URL crawling, processUrlSource, processUrlSourceWithDepth (BFS)
src/lib/chat/robots.ts      — robots.txt fetcher/parser with 5-min cache
src/lib/chat/store.ts       — PostgreSQL message store (sessions, messages CRUD)
src/lib/chat/analytics.ts   — Event logging with KnowledgeEvents constants
src/lib/chat/rainbow-bridge.ts — Rainbow S2S bridge service (worker management, message relay)
src/lib/chat/rainbow.ts     — Rainbow provider abstraction (delegates to bridge)
src/collections/KnowledgeSources.ts  — Main knowledge collection (URL + file types)
src/collections/KnowledgeUploads.ts  — Upload collection for knowledge files
src/components/admin/KnowledgeDashboard.tsx — Admin dashboard RSC
```

---

## Rainbow Integration (Agent Escalation)

### Architecture
```
Visitor (ChatPanel) ←→ ALE Backend (bridge) ←→ Rainbow Bubble ←→ Agent (Rainbow app)
```

### How It Works
1. Visitor clicks "Talk to a human" → POST `/api/chat/escalate`
2. Bridge spawns worker process (if not running), creates Rainbow bubble
3. Worker creates S2S conversation via direct REST API (gets `conversationDbId` immediately)
4. Agents are invited with auto-accept (`POST /rooms/{roomId}/users` with `status: "accepted"`)
5. Conversation history is sent to the bubble
6. Agent replies in Rainbow → webhook callback → bridge stores as `agent` message
7. ChatPanel polls every 3s and picks up new messages

### Worker Process (`scripts/rainbow-s2s-worker.js`)
- Runs **outside Next.js/Turbopack** as a separate Node.js process
- Uses `rainbow-node-sdk` in S2S mode
- SDK's internal Express server replaced with noop (path-to-regexp v8 incompatibility)
- **SDK events (`rainbow_onmessagereceived`) do NOT fire in S2S mode** — all message delivery depends on Rainbow HTTP webhook callbacks
- On startup: extracts S2S connection ID + auth token, sets presence ONLINE, joins all rooms
- Commands via stdin/stdout IPC (`__RESP__` and `__ASYNC__` prefix protocols)
- Direct REST API calls for: conversation creation, member management, message sending

### Bridge Service (`src/lib/chat/rainbow-bridge.ts`)
- Singleton `RainbowBridgeService` class
- Spawns worker on first escalation, manages lifecycle
- In-memory maps: `sessionId → BridgeMapping`, `bubbleJid/bubbleId/conversationDbId → sessionId`
- **Conversation buffer**: For `/conversation` callbacks arriving before `create_bubble` returns
- **Message buffer**: For messages arriving before conversation ID is mapped (60s TTL)
- **Echo prevention**: Skips `[Visitor]:` prefixed messages and history markers
- **Room events**: "has been invited" stored as `system` role, "has joined/left" filtered out
- Restores mappings from DB on restart (`restoreMappings()`)
- Debug state: `getDebugState()` returns mappings, buffers, last 30 webhook events

### Webhook Routes
```
POST /api/chat/rainbow-webhook           — Root webhook handler
POST /api/chat/rainbow-webhook/[...path] — Catch-all for S2S sub-paths (/message, /conversation, etc.)
GET  /api/chat/rainbow-debug             — Diagnostic endpoint (bridge state + recent webhooks)
```

### Message Format Handling (4 formats)
- **Format A**: Worker-forwarded `{ type: "message", data: { body, roomJid, roomId } }`
- **Format B**: Rainbow S2S callback `{ message: { conversation_id, body, from } }`
- **Format C**: Rainbow event `{ event: "chat/message", data: { content, fromJid } }`
- **Format D**: Flat structure `{ body, conversationId, ... }`

### Known Issues / Status
- **SDK events dead in S2S mode**: `rainbow_onmessagereceived` never fires because noop Express server
- **Agent message delivery depends entirely on Rainbow HTTP callbacks** to webhook URL
- **Per-user conversation IDs**: Rainbow uses different `conversation_id` per user for same bubble — requires `/conversation` callback mapping
- **Race conditions mitigated**: Immediate mapping storage, conversation buffer, message buffer with replay

### Environment Variables
```
RAINBOW_APP_ID=xxx
RAINBOW_APP_SECRET=xxx
RAINBOW_HOST=official              # 'official' or 'sandbox'
RAINBOW_HOST_CALLBACK=https://...  # Callback URL for S2S webhooks
RAINBOW_BOT_LOGIN=bot@company.com
RAINBOW_BOT_PASSWORD=xxx
RAINBOW_SUPPORT_AGENTS=agent1@email,agent2@email  # Comma-separated agent emails
```

---

## Homepage Hero
- **Video background**: Plays once then stops (no loop), playback rate 0.5x, ping-pong reverse at end
- **Bottom fade**: `h-40` gradient from transparent → `black/80` for smooth transition to pillars section
- **GoalCaptureGlassPanel**: Glassmorphism panel with goal input → AI-generated 3-step plan (Challenge, Recommendation, Next Steps)
- **Goal textarea**: White glass style (`bg-white/15 backdrop-blur-md border-white/20`), 5 rows
- **Panel expansion**: Smoothly grows from `max-w-[22rem]` → `max-w-[30rem]` when results arrive (CSS `transition-all duration-500`)
- **Card entrance**: Staggered `animate-fade-up` with 120ms delays per step card
- **Email lead capture**: Inline form slides open via `grid-rows-[0fr]→[1fr]` transition. Leads stored in `plan-leads` collection
- **Compact action bar**: "Email my plan" (compact gradient) + AI CTA (ghost) + "New goal" (text) — all on one row
- **API**: POST `/api/plan/email` — validates email, stores lead in PlanLeads collection
- **Panel reveal**: Entire panel (glass + content) fades in as one unit after 2.2s delay
- **Panel position**: `lg:relative lg:right-16` to center between headline and screen edge
- **Viewport cap**: `max-h-[calc(100vh-6rem)]` prevents overflow
- **Discreet scrollbar**: 4px thin, `rgba(255,255,255,0.12)`, matching chatbot style
- **Content**: Three pillar badges, gradient heading with "AI Operations" highlighted, CTAs

## Three Pillars Section (QuickNav)
- **Background**: Earth-from-space image (`dc-bg4.jpg`) with slow horizontal pan animation (60s cycle, simulating globe rotation), scaled 1.3x to prevent edge visibility
- **Overlay**: Light dark overlay (`bg-gray-950/40`) keeping image visible
- **Top transition**: `-mt-20` overlap with hero + `h-40` gradient from `black/80` → transparent
- **Bottom transition**: `h-7` gradient from transparent → white for seamless blend to white sections
- **Cards**: Glassmorphism style — `bg-white/15 backdrop-blur-xl`, `border-white/20`, white text, colored tags (`bg-{color}-500/20`)
- **Card colors**: Blue (Intelligent Networks), Purple (Cloud-Native Services), Cyan (AI-Powered Operations)
- **Stats bar**: Colored gradient bottom bar per card with key metrics

## Solutions Bar (Sticky)
- **Position**: `sticky top-[72px] z-30`, white background
- **Stuck detection**: IntersectionObserver sentinel — when bar becomes sticky, individual buttons turn `bg-blue-50` with `border-blue-200` and blue text
- **Buttons**: 6 solution categories (Intelligent Networks, Cloud Communications, AI-Powered Operations, Everything as a Service, Connected Infrastructure, Digital Workplace)
- **"All Solutions" button**: Removed

### PlanLeads Collection
- **Slug**: `plan-leads`
- **Fields**: `email` (required), `goal` (textarea), `planJson` (json), `locale`, `status` (new/contacted/converted)
- **Access**: Public create, admin read/update/delete
- **Admin**: `/admin/collections/plan-leads` — view captured leads

---

## Security — Content Security Policy
- **Admin routes** (`/admin/*`): No CSP (Payload admin needs Gravatar, dynamic chunks, etc.)
- **Public routes**: Strict CSP with allowlisted domains (Google Analytics, Cookiebot, ALE assets, Gravatar)
- Configured in `next.config.ts` → `headers()` with two separate route rules

## Database Schema Issues (RECURRING)

### Root Cause
`push: true` in Payload's postgres adapter only runs when `NODE_ENV !== 'production'`.

### Solution
`src/app/(frontend)/api/debug-schema/route.ts` with actions for schema sync, table creation, and diagnostics.

### Critical: After adding new collections
New collections (e.g. PlanLeads) won't have tables in production. Must run:
1. `GET /api/debug-schema?action=schema-diff` — check missing tables
2. `GET /api/debug-schema?action=sync-schema` — create missing tables + enums + FK columns
Without this, the **entire admin panel breaks** (500 Server Components error) because Payload queries all collections on render.

---

## Critical Lessons Learned

1. **`push: true` doesn't work in production** — Must manually create tables or use migrations.
2. **Turbopack hashes dynamic requires** — Cannot load drizzle-kit at runtime in production.
3. **Next.js page caching** — Added `revalidate = 60` for ISR so config changes take effect.
4. **React Rules of Hooks** — Never place `return null` before ANY hook.
5. **Client component imports in Turbopack** — Use `next/dynamic` with `ssr: false` for complex components.
6. **Railway env vars** — Require redeploy/restart to take effect.
7. **Railway deployment** — `git push origin master:main` triggers build. Filesystem is ephemeral.
8. **Payload import map** — `beforeDashboard` expects a single string path, not an array. Import map auto-regenerates on `next build`.
9. **Cold start** — DB may be unavailable on first request after deploy. Guard with `=== false` checks, not falsy checks.
10. **Always commit all files** — Untracked files cause build failures on Railway even if they work locally.
11. **Always sync schema after adding collections** — Run `sync-schema` via debug-schema API after deploying new collections, or admin will 500.
12. **CSP breaks admin** — Strict CSP on all routes blocks Gravatar + admin JS. Admin routes must be exempted from CSP.
13. **Chatbot scrollbar** — Discreet 4px scrollbar via scoped CSS class (`.ale-chat-messages`), matching GoalCapture panel (`.goal-panel-scroll`).
14. **OpenAI `web_search_preview` deprecated** — Use `web_search` tool (not `web_search_preview`) in Responses API. Old name causes 500 errors.
15. **Rainbow SDK S2S mode** — SDK events don't fire when Express server is replaced with noop. Must rely on HTTP webhook callbacks for all message delivery.
16. **Rainbow per-user conversation IDs** — Each user has a different `conversation_id` for the same bubble. Must map via `/conversation` callback.

---

## SiteConfig Chat Fields
Located in `src/globals/SiteConfig.ts` under the `chat` group:
- `enabled` (checkbox, default: false)
- `provider` (select: rainbow/intercom/custom)
- `systemPrompt` (textarea) — Custom system prompt for chatbot
- `openaiModel` (text, default: gpt-4o-mini)
- `position` (select: bottom-right/bottom-left)
- `greeting` (text, localized)
- `escalationEnabled` (checkbox)
- `knowledgeBase.maxFileSize` (number, default: 10MB)
- `knowledgeBase.maxSources` (number, default: 50)
- `knowledgeBase.allowedDomains` (array of domains)
