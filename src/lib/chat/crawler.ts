/* ------------------------------------------------------------------ */
/*  URL Crawler — fetch, extract text, upload to OpenAI vector store  */
/* ------------------------------------------------------------------ */

import * as cheerio from 'cheerio'
import { createHash } from 'crypto'
import { uploadFileToVectorStore, deleteFileFromVectorStore } from './openai'
import { fetchRobotsTxt, isUrlAllowedByRobots } from './robots'

export interface CrawlResult {
  title: string
  text: string
  contentHash: string
  byteSize: number
  childUrls: string[]
}

export interface ProcessUrlResult {
  fileId: string
  vectorStoreId: string
  contentHash: string
  byteSize: number
  title: string
}

export interface DepthCrawlResult {
  pages: Array<{ url: string; fileId: string; title: string; byteSize: number }>
  totalBytes: number
  pagesIndexed: number
  pagesFailed: number
  pagesSkipped: number
}

export class ContentUnchangedError extends Error {
  constructor(url: string) {
    super(`Content unchanged: ${url}`)
    this.name = 'CONTENT_UNCHANGED'
  }
}

interface CrawlOptions {
  timeout?: number
  maxChildUrls?: number
  allowedDomains?: string[]
}

const STRIP_SELECTORS = [
  'script', 'style', 'noscript', 'iframe', 'svg',
  'nav', 'footer', 'header', '.cookie-banner', '.ad',
  '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
]

/** Sleep for the given number of milliseconds. */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry wrapper with exponential backoff.
 * Skips retry on CONTENT_UNCHANGED errors.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000,
): Promise<T> {
  let lastError: Error | undefined
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err: any) {
      if (err?.name === 'CONTENT_UNCHANGED') throw err
      lastError = err
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1)
        console.warn(`[Crawler] Attempt ${attempt}/${maxAttempts} failed, retrying in ${delay}ms:`, err.message)
        await sleep(delay)
      }
    }
  }
  throw lastError
}

/**
 * Fetch a URL, extract readable text, compute SHA-256, discover child links.
 */
export async function crawlUrl(
  url: string,
  options: CrawlOptions = {},
): Promise<CrawlResult> {
  const { timeout = 30_000, maxChildUrls = 20, allowedDomains = [] } = options

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  let html: string
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ALE-Knowledge-Bot/1.0 (compatible; +https://al-enterprise.com)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      throw new Error(`Unsupported content type: ${contentType}`)
    }

    html = await response.text()
  } finally {
    clearTimeout(timer)
  }

  const $ = cheerio.load(html)

  // Strip non-content elements
  for (const sel of STRIP_SELECTORS) {
    $(sel).remove()
  }

  // Extract title
  const title = $('title').first().text().trim() ||
    $('h1').first().text().trim() ||
    new URL(url).hostname

  // Prefer main/article content, fall back to body
  let contentEl = $('main').first()
  if (contentEl.length === 0) contentEl = $('article').first()
  if (contentEl.length === 0) contentEl = $('body').first()

  // Get text, collapse whitespace
  const text = contentEl.text()
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Compute hash
  const contentHash = createHash('sha256').update(text).digest('hex')
  const byteSize = Buffer.byteLength(text, 'utf-8')

  // Discover child URLs
  const baseUrl = new URL(url)
  const childUrls: string[] = []
  const seen = new Set<string>()

  $('a[href]').each((_, el) => {
    if (childUrls.length >= maxChildUrls) return false
    const href = $(el).attr('href')
    if (!href) return

    try {
      const resolved = new URL(href, url)
      // Only http(s), skip fragments/mailto/tel
      if (!resolved.protocol.startsWith('http')) return
      resolved.hash = ''

      const normalized = resolved.toString()
      if (seen.has(normalized)) return
      seen.add(normalized)

      // Filter by allowed domains if specified
      if (allowedDomains.length > 0) {
        const matches = allowedDomains.some(
          (d) => resolved.hostname === d || resolved.hostname.endsWith(`.${d}`),
        )
        if (!matches) return
      } else {
        // Default: same domain only
        if (resolved.hostname !== baseUrl.hostname) return
      }

      childUrls.push(normalized)
    } catch {
      // Invalid URL — skip
    }
  })

  return { title, text, contentHash, byteSize, childUrls }
}

/**
 * Full pipeline: crawl URL → format as structured text → upload to OpenAI vector store.
 * Optionally deletes an existing file first (for re-indexing).
 * If existingChecksum is provided, throws ContentUnchangedError when content hasn't changed.
 */
export async function processUrlSource(
  url: string,
  existingFileId?: string,
  options: CrawlOptions = {},
  existingChecksum?: string,
): Promise<ProcessUrlResult> {
  // Delete old file if re-indexing
  if (existingFileId) {
    try {
      await deleteFileFromVectorStore(existingFileId)
    } catch (err: any) {
      console.warn('[Crawler] Failed to delete old file:', err.message)
    }
  }

  const result = await crawlUrl(url, options)

  // Change detection: skip upload if content hash matches
  if (existingChecksum && result.contentHash === existingChecksum) {
    throw new ContentUnchangedError(url)
  }

  // Format as structured text with metadata header for better RAG retrieval
  const formattedContent = [
    `Source: ${url}`,
    `Title: ${result.title}`,
    `Crawled: ${new Date().toISOString()}`,
    '---',
    '',
    result.text,
  ].join('\n')

  const buffer = Buffer.from(formattedContent, 'utf-8')
  const filename = `web-${new URL(url).hostname}-${Date.now()}.txt`

  const uploaded = await uploadFileToVectorStore(buffer, filename)

  return {
    fileId: uploaded.fileId,
    vectorStoreId: uploaded.vectorStoreId,
    contentHash: result.contentHash,
    byteSize: result.byteSize,
    title: result.title,
  }
}

/**
 * BFS depth crawl: crawl a root URL and follow child links up to `crawlDepth` levels.
 * Checks robots.txt once per origin, rate limits between fetches.
 * Each page is uploaded as a separate file to the OpenAI vector store.
 * Aborts after 5 minutes overall.
 */
export async function processUrlSourceWithDepth(
  rootUrl: string,
  crawlDepth: number,
  options: CrawlOptions = {},
  onPageIndexed?: (url: string, result: ProcessUrlResult | null, error?: string) => void,
): Promise<DepthCrawlResult> {
  const OVERALL_TIMEOUT = 5 * 60_000 // 5 minutes
  const startTime = Date.now()

  const result: DepthCrawlResult = {
    pages: [],
    totalBytes: 0,
    pagesIndexed: 0,
    pagesFailed: 0,
    pagesSkipped: 0,
  }

  // BFS queue: [url, depth]
  const queue: Array<[string, number]> = [[rootUrl, 0]]
  const visited = new Set<string>([rootUrl])

  // Fetch robots.txt for the root origin
  const robotsRules = await fetchRobotsTxt(rootUrl)
  const rateDelay = robotsRules.crawlDelay ? robotsRules.crawlDelay * 1000 : 1000

  let isFirstPage = true

  while (queue.length > 0) {
    // Check overall timeout
    if (Date.now() - startTime > OVERALL_TIMEOUT) {
      console.warn(`[Crawler] Depth crawl aborted: 5-minute timeout reached for ${rootUrl}`)
      break
    }

    const [currentUrl, depth] = queue.shift()!

    // Check robots.txt permission
    if (!isUrlAllowedByRobots(currentUrl, robotsRules)) {
      console.log(`[Crawler] Skipped (robots.txt): ${currentUrl}`)
      result.pagesSkipped++
      onPageIndexed?.(currentUrl, null, 'Blocked by robots.txt')
      continue
    }

    // Rate limit between page fetches (skip delay for first page)
    if (!isFirstPage) {
      await sleep(rateDelay)
    }
    isFirstPage = false

    try {
      const pageResult = await withRetry(
        () => processUrlSource(currentUrl, undefined, options),
      )

      result.pages.push({
        url: currentUrl,
        fileId: pageResult.fileId,
        title: pageResult.title,
        byteSize: pageResult.byteSize,
      })
      result.totalBytes += pageResult.byteSize
      result.pagesIndexed++

      console.log(`[Crawler] Indexed (depth ${depth}): ${currentUrl} → ${pageResult.fileId}`)
      onPageIndexed?.(currentUrl, pageResult)

      // If we haven't reached max depth, crawl child URLs found on this page
      if (depth < crawlDepth) {
        const crawlResult = await crawlUrl(currentUrl, options)
        for (const childUrl of crawlResult.childUrls) {
          if (!visited.has(childUrl)) {
            visited.add(childUrl)
            queue.push([childUrl, depth + 1])
          }
        }
      }
    } catch (err: any) {
      if (err?.name === 'CONTENT_UNCHANGED') {
        result.pagesSkipped++
        console.log(`[Crawler] Skipped (unchanged): ${currentUrl}`)
        onPageIndexed?.(currentUrl, null, 'Content unchanged')
      } else {
        result.pagesFailed++
        console.error(`[Crawler] Failed (depth ${depth}): ${currentUrl}:`, err.message)
        onPageIndexed?.(currentUrl, null, err.message)
      }
    }
  }

  return result
}
