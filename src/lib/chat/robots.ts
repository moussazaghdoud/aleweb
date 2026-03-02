/* ------------------------------------------------------------------ */
/*  robots.txt — Fetch, parse, and check URL permission                */
/* ------------------------------------------------------------------ */

interface RobotsRule {
  disallow: string[]
  allow: string[]
  crawlDelay: number | null
}

interface CachedRobots {
  rules: RobotsRule
  fetchedAt: number
}

const CACHE_TTL = 5 * 60_000 // 5 minutes
const robotsCache = new Map<string, CachedRobots>()

/**
 * Parse robots.txt content into rules for our user-agent.
 * Matches '*' or 'ALE-Knowledge-Bot' user-agent blocks.
 */
function parseRobotsTxt(text: string): RobotsRule {
  const lines = text.split('\n').map((l) => l.trim())
  const rules: RobotsRule = { disallow: [], allow: [], crawlDelay: null }

  let inMatchingBlock = false

  for (const line of lines) {
    // Skip comments and blank lines
    if (line.startsWith('#') || line === '') {
      continue
    }

    const lower = line.toLowerCase()

    if (lower.startsWith('user-agent:')) {
      const agent = line.slice('user-agent:'.length).trim()
      inMatchingBlock = agent === '*' || agent.toLowerCase() === 'ale-knowledge-bot'
      continue
    }

    if (!inMatchingBlock) continue

    if (lower.startsWith('disallow:')) {
      const path = line.slice('disallow:'.length).trim()
      if (path) rules.disallow.push(path)
    } else if (lower.startsWith('allow:')) {
      const path = line.slice('allow:'.length).trim()
      if (path) rules.allow.push(path)
    } else if (lower.startsWith('crawl-delay:')) {
      const val = parseFloat(line.slice('crawl-delay:'.length).trim())
      if (!isNaN(val)) {
        // Clamp between 1s and 10s
        rules.crawlDelay = Math.min(10, Math.max(1, val))
      }
    }
  }

  return rules
}

/**
 * Fetch and parse robots.txt for a given base URL.
 * Results are cached in-memory for 5 minutes per origin.
 * Falls back to "allow all" on any error.
 */
export async function fetchRobotsTxt(baseUrl: string): Promise<RobotsRule> {
  const origin = new URL(baseUrl).origin
  const cached = robotsCache.get(origin)
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
    return cached.rules
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10_000)

    const res = await fetch(`${origin}/robots.txt`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ALE-Knowledge-Bot/1.0' },
    })
    clearTimeout(timer)

    if (!res.ok) {
      // No robots.txt or error → allow all
      const rules: RobotsRule = { disallow: [], allow: [], crawlDelay: null }
      robotsCache.set(origin, { rules, fetchedAt: Date.now() })
      return rules
    }

    const text = await res.text()
    const rules = parseRobotsTxt(text)
    robotsCache.set(origin, { rules, fetchedAt: Date.now() })
    return rules
  } catch {
    // Network error → allow all
    const rules: RobotsRule = { disallow: [], allow: [], crawlDelay: null }
    robotsCache.set(origin, { rules, fetchedAt: Date.now() })
    return rules
  }
}

/**
 * Check if a URL's path is allowed by the given robots.txt rules.
 * Allow rules take priority over disallow (matching standard robots.txt semantics).
 */
export function isUrlAllowedByRobots(url: string, rules: RobotsRule): boolean {
  const urlPath = new URL(url).pathname

  // Check allow rules first (more specific overrides)
  for (const pattern of rules.allow) {
    if (urlPath.startsWith(pattern)) return true
  }

  // Check disallow rules
  for (const pattern of rules.disallow) {
    if (urlPath.startsWith(pattern)) return false
  }

  return true
}
