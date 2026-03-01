# Search Engine Documentation

## Architecture

The ALE search engine uses **PostgreSQL full-text search** (`tsvector` + `pg_trgm`) in production and an **in-memory provider** for local development with SQLite.

### Key Components

```
search.config.json          ← Synonyms, boosts, pinned results (edit without code)
src/lib/search/
├── types.ts                ← SearchDocument, SearchProvider interface
├── index.ts                ← Provider factory (picks postgres vs in-memory)
├── config.ts               ← Loads search.config.json
├── normalizers.ts          ← Transforms CMS data → SearchDocument
├── hook-adapters.ts        ← Bridges raw Payload docs → normalizer input
├── hooks.ts                ← afterChange/afterDelete hook factories
├── indexer.ts              ← reindexAll() / reindexType()
├── analytics.ts            ← Query logging + metrics
└── providers/
    ├── postgres.ts         ← Production: tsvector + pg_trgm
    └── in-memory.ts        ← Development fallback
```

### Data Flow

```
CMS Save → Payload afterChange hook → hook-adapter → normalizer → provider.upsert()
User types → /api/suggest (150ms) → provider.suggest() → autocomplete
User searches → /api/search (300ms) → provider.search() → grouped results
```

## Setup

### Local Development

```bash
npm run dev
# Search auto-indexes on first query if index is empty
# Uses InMemorySearchProvider with SQLite
```

### Production (Railway)

Search tables are created automatically on first request. To manually trigger a full reindex:

```bash
curl -X POST https://your-app.up.railway.app/api/search/reindex \
  -H "Authorization: Bearer $PAYLOAD_SECRET" \
  -H "Content-Type: application/json"
```

Or reindex a specific collection:

```bash
curl -X POST https://your-app.up.railway.app/api/search/reindex \
  -H "Authorization: Bearer $PAYLOAD_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"type": "Product"}'
```

### CLI Reindex

```bash
npx tsx scripts/reindex.ts          # All collections
npx tsx scripts/reindex.ts Product  # Just products
```

## API Endpoints

### `GET /api/search?q=...`

Full-text search with grouped results.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | required | Search query (min 2 chars) |
| `type` | string | all | Filter by type (Product,Solution,...) |
| `category` | string | all | Filter by category |
| `industry` | string | all | Filter by industry |
| `locale` | string | en | Language |
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Results per page (max 50) |
| `format` | string | grouped | `grouped` (modal) or `flat` (search page) |

### `GET /api/suggest?q=...`

Autocomplete suggestions (max 8 results).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | required | Query prefix (min 2 chars) |
| `locale` | string | en | Language |

### `POST /api/search/reindex`

Trigger reindex. Requires `Authorization: Bearer {PAYLOAD_SECRET}`.

Body: `{}` for all, or `{"type": "Product"}` for specific type.

### `GET /api/search/analytics?days=7`

Search analytics metrics. Requires `Authorization: Bearer {PAYLOAD_SECRET}`.

## Tuning Search Relevance

### Synonyms

Edit `search.config.json` → `synonyms`:

```json
{
  "synonyms": {
    "UC": ["unified communications", "collaboration"],
    "WLAN": ["wireless", "wifi", "access point"]
  }
}
```

When a user searches "UC", the engine also searches for "unified communications" and "collaboration".

### Boost Rules

Edit `search.config.json` → `boosts`:

```json
{
  "boosts": {
    "Platform:rainbow": 5,
    "Product:omniswitch-6860": 3
  }
}
```

The ID format is `{Type}:{slug}`. Boost values range from -10 to 10.

### Pinned Results

Edit `search.config.json` → `pinnedResults`:

```json
{
  "pinnedResults": [
    { "query": "contact", "ids": ["Company:contact"] },
    { "query": "support", "ids": ["Service:support"] }
  ]
}
```

Pinned results always appear first for exact query matches.

### Field Weights (PostgreSQL)

The tsvector uses PostgreSQL's A/B/C/D weight system:
- **A (highest)**: title
- **B**: tagline
- **C**: description
- **D (lowest)**: body + keywords

To change weights, modify the `GENERATED ALWAYS AS` clause in `providers/postgres.ts`.

## Debugging Relevance

### Check what's indexed

```sql
SELECT id, title, type, boost FROM search_documents ORDER BY type, title;
```

### Test a query's scoring

```sql
SELECT id, title, type,
  ts_rank_cd(search_vector, plainto_tsquery('english', 'rainbow'), 4) AS rank,
  similarity(title, 'rainbow') AS trgm
FROM search_documents
WHERE search_vector @@ plainto_tsquery('english', 'rainbow')
   OR similarity(title, 'rainbow') > 0.25
ORDER BY rank DESC;
```

### Check analytics

```sql
SELECT query, count(*), avg(result_count)
FROM search_analytics
WHERE created_at > now() - interval '7 days'
GROUP BY query ORDER BY count DESC;
```

### Zero-result queries

```sql
SELECT query, count(*)
FROM search_analytics
WHERE zero_results = true
  AND created_at > now() - interval '7 days'
GROUP BY query ORDER BY count DESC;
```

## Indexed Collections

| Type | Collection | Count | Fields Searched |
|------|-----------|-------|----------------|
| Product | products | ~54 | name, tagline, description, features, highlights, variants |
| Solution | solutions | ~20 | name, tagline, description, capabilities, products |
| Platform | platforms | ~11 | name, tagline, description, features, highlights |
| Industry | industries | ~9 | name, tagline, description, solutions, customers |
| Service | services | ~5 | name, tagline, description, features |
| Blog | blog-posts | ~10 | title, excerpt, content |
| Company | company-pages | varies | title, tagline, description, sections, press releases |
| Partner | partners | varies | name, tagline, description, features |
| Resource | resources | varies | title, description, solution, industry |
| Legal | legal-pages | varies | title, sections |

## Tests

```bash
# Golden query tests (no DB required)
npx tsx src/lib/search/__tests__/golden.test.ts

# Performance benchmarks
npx tsx src/lib/search/__tests__/performance.test.ts
```

## Rate Limiting

- 30 requests per 10 seconds per IP address
- Returns HTTP 429 when exceeded
- Purges stale entries every 5 minutes
