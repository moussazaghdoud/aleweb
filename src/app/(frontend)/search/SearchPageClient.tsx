"use client";

import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SearchResult = {
  title: string;
  description: string;
  tagline: string;
  href: string;
  type: string;
  category?: string;
  score: number;
  highlights?: {
    title?: string;
    description?: string;
  };
  meta?: {
    author?: string;
    resourceType?: string;
    date?: string;
  };
};

type FacetCounts = {
  type: Record<string, number>;
  category: Record<string, number>;
  industry: Record<string, number>;
};

type SearchData = {
  results: SearchResult[];
  facets: FacetCounts;
  total: number;
  page: number;
  totalPages: number;
  query: string;
  suggestions?: string[];
  queryTime: number;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const typeConfig: Record<string, { color: string; bg: string; icon: string }> = {
  Product:  { color: "text-blue-700",   bg: "bg-blue-50",   icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  Solution: { color: "text-purple-700", bg: "bg-purple-50", icon: "M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  Platform: { color: "text-cyan-700",   bg: "bg-cyan-50",   icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
  Industry: { color: "text-green-700",  bg: "bg-green-50",  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  Service:  { color: "text-orange-700", bg: "bg-orange-50", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  Blog:     { color: "text-pink-700",   bg: "bg-pink-50",   icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  Company:  { color: "text-gray-700",   bg: "bg-gray-100",  icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  Partner:  { color: "text-amber-700",  bg: "bg-amber-50",  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  Resource: { color: "text-teal-700",   bg: "bg-teal-50",   icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  Legal:    { color: "text-slate-600",  bg: "bg-slate-100", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
};

const typeLabels: Record<string, string> = {
  Product: "Products", Solution: "Solutions", Platform: "Platforms",
  Industry: "Industries", Service: "Services", Blog: "Articles",
  Company: "Company", Partner: "Partners", Resource: "Resources", Legal: "Legal",
};

const typeOrder = ["Product", "Solution", "Platform", "Industry", "Service", "Blog", "Company", "Partner", "Resource", "Legal"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SearchPageClient({
  initialParams,
}: {
  initialParams: { q?: string; type?: string; category?: string; page?: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialParams.q || "");
  const [activeType, setActiveType] = useState(initialParams.type || "");
  const [data, setData] = useState<SearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPage = parseInt(initialParams.page || "1");

  const fetchResults = useCallback(async (q: string, type: string, page: number) => {
    if (q.length < 2) { setData(null); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams({ q, format: "flat", limit: "15", page: String(page) });
      if (type) params.set("type", type);
      const res = await fetch(`/api/search?${params}`);
      const json: SearchData = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount and when URL params change
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "";
    const page = searchParams.get("page") || "1";
    setQuery(q);
    setActiveType(type);
    if (q.length >= 2) fetchResults(q, type, parseInt(page));
  }, [searchParams, fetchResults]);

  function handleSearch(q: string) {
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (activeType) params.set("type", activeType);
      router.push(`/search?${params}`);
    }, 400);
  }

  function setType(type: string) {
    setActiveType(type);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type) params.set("type", type);
    router.push(`/search?${params}`);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (activeType) params.set("type", activeType);
    params.set("page", String(page));
    router.push(`/search?${params}`);
  }

  // Active tab facets
  const typeFacets = data?.facets?.type || {};
  const activeTabs = typeOrder.filter(t => (typeFacets[t] || 0) > 0 || t === activeType);
  const totalResults = data?.total || 0;

  return (
    <div className="min-h-screen bg-light-50">
      {/* Search header */}
      <div className="bg-white border-b border-light-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl font-bold text-text mb-4">Search</h1>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products, solutions, industries, resources..."
              className="w-full h-12 pl-12 pr-4 text-base text-text bg-light-50 border border-light-200 rounded-xl outline-none focus:border-ale focus:ring-2 focus:ring-ale/20 transition-all"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Type tabs */}
        {data && totalResults > 0 && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex gap-1 overflow-x-auto pb-px -mb-px">
              <button
                onClick={() => setType("")}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  !activeType
                    ? "border-ale text-ale"
                    : "border-transparent text-text-muted hover:text-text"
                }`}
              >
                All ({totalResults})
              </button>
              {activeTabs.map((type) => {
                const count = typeFacets[type] || 0;
                const isActive = activeType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setType(isActive ? "" : type)}
                    className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      isActive
                        ? "border-ale text-ale"
                        : "border-transparent text-text-muted hover:text-text"
                    }`}
                  >
                    {typeLabels[type] || type} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16">
            <div className="w-5 h-5 border-2 border-ale/30 border-t-ale rounded-full animate-spin" />
            <span className="text-text-muted">Searching...</span>
          </div>
        )}

        {/* "Did you mean" */}
        {!loading && data?.suggestions && data.suggestions.length > 0 && totalResults === 0 && (
          <div className="mb-6 p-4 bg-white rounded-xl border border-light-200">
            <p className="text-sm text-text-muted">
              Did you mean:{" "}
              {data.suggestions.map((term, i) => (
                <Fragment key={term}>
                  {i > 0 && ", "}
                  <button
                    onClick={() => handleSearch(term)}
                    className="text-ale font-medium hover:underline"
                  >
                    {term}
                  </button>
                </Fragment>
              ))}
              ?
            </p>
          </div>
        )}

        {/* No results */}
        {!loading && data && totalResults === 0 && (!data.suggestions || data.suggestions.length === 0) && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-light-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-text">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-sm text-text-muted mt-2">Try different keywords or check for typos</p>
          </div>
        )}

        {/* Results list */}
        {!loading && data && totalResults > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-muted">
                {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{data.query}&rdquo;
                <span className="ml-2 text-xs opacity-60">({data.queryTime}ms)</span>
              </p>
            </div>

            <div className="space-y-3">
              {data.results.map((r) => {
                const cfg = typeConfig[r.type];
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="block bg-white rounded-xl border border-light-200 p-4 sm:p-5 hover:border-ale/30 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Type icon */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cfg?.bg || "bg-gray-100"} ${cfg?.color || "text-gray-700"} group-hover:scale-105 transition-transform`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={cfg?.icon || ""} />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-base font-semibold text-text group-hover:text-ale transition-colors truncate"
                            dangerouslySetInnerHTML={{ __html: r.highlights?.title || r.title }}
                          />
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${cfg?.bg || "bg-gray-100"} ${cfg?.color || "text-gray-700"}`}>
                            {r.type}
                          </span>
                        </div>
                        <p
                          className="text-sm text-text-muted line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: r.highlights?.description || r.description }}
                        />
                        {/* Meta */}
                        <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                          {r.meta?.author && <span>By {r.meta.author}</span>}
                          {r.meta?.date && <span>{r.meta.date}</span>}
                          {r.category && (
                            <span className="px-1.5 py-0.5 bg-light-100 rounded text-[10px]">
                              {r.category}
                            </span>
                          )}
                          <span className="text-light-300">{r.href}</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg className="w-5 h-5 text-light-300 group-hover:text-ale shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-3 py-2 text-sm font-medium text-text-muted border border-light-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(data.totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                        p === currentPage
                          ? "bg-ale text-white"
                          : "text-text-muted border border-light-200 hover:bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= data.totalPages}
                  className="px-3 py-2 text-sm font-medium text-text-muted border border-light-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty state — no query */}
        {!loading && !data && query.length < 2 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-light-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg font-semibold text-text">Start searching</p>
            <p className="text-sm text-text-muted mt-2">
              Enter at least 2 characters to search across products, solutions, industries, and more.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
