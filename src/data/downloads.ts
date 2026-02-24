/**
 * Download inventory — derived from forensic-extraction/downloads.csv
 * 670 entries, 449 unique PDF URLs across all product/solution/industry pages
 *
 * This is a static index. Each entry maps a page_url to its downloadable assets.
 * Product/solution detail pages use getDownloadsForPage() to filter.
 */

export interface DownloadEntry {
  pageUrl: string;
  fileUrl: string;
  fileName: string;
  anchorText: string;
  documentType: string;
  source: string;
}

// Lazy-loaded from JSON (built from CSV at build time)
// For now, we provide a lookup function against the static data
let _cache: DownloadEntry[] | null = null;

async function loadDownloads(): Promise<DownloadEntry[]> {
  if (_cache) return _cache;
  try {
    // Dynamic import of the compiled JSON
    const mod = await import('./downloads-index.json');
    _cache = mod.default as DownloadEntry[];
    return _cache;
  } catch {
    return [];
  }
}

export async function getDownloadsForPage(pageUrl: string): Promise<DownloadEntry[]> {
  const all = await loadDownloads();
  // Match by page_url suffix (e.g., /en/products/switches/omniswitch-6360)
  return all.filter((d) => d.pageUrl === pageUrl || pageUrl.endsWith(d.pageUrl));
}

export async function getDownloadsForCategory(categorySlug: string): Promise<DownloadEntry[]> {
  const all = await loadDownloads();
  return all.filter((d) => d.pageUrl.includes(`/products/${categorySlug}`));
}

export async function getAllDownloads(): Promise<DownloadEntry[]> {
  return loadDownloads();
}
