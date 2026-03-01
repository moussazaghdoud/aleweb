"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SearchResult = {
  title: string;
  description: string;
  href: string;
  type: string;
  score: number;
};

type GroupedResults = Record<string, SearchResult[]>;

type SuggestItem = {
  title: string;
  href: string;
  type: string;
};

type FacetCounts = {
  type: Record<string, number>;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const typeConfig: Record<string, { color: string; icon: string }> = {
  Product:  { color: "bg-blue-50 text-blue-700",     icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  Solution: { color: "bg-purple-50 text-purple-700",  icon: "M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  Platform: { color: "bg-cyan-50 text-cyan-700",     icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
  Industry: { color: "bg-green-50 text-green-700",   icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  Service:  { color: "bg-orange-50 text-orange-700", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  Blog:     { color: "bg-pink-50 text-pink-700",     icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  Company:  { color: "bg-gray-100 text-gray-700",    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  Partner:  { color: "bg-amber-50 text-amber-700",   icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  Resource: { color: "bg-teal-50 text-teal-700",     icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  Legal:    { color: "bg-slate-100 text-slate-600",  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
};

const typeLabels: Record<string, string> = {
  Product: "Products",
  Solution: "Solutions",
  Platform: "Platforms",
  Industry: "Industries",
  Service: "Services",
  Blog: "Articles",
  Company: "Company",
  Partner: "Partners",
  Resource: "Resources",
  Legal: "Legal",
};

const quickLinks = [
  { title: "Rainbow", href: "/platform/rainbow", type: "Platform" },
  { title: "OmniSwitch", href: "/products/switches/omniswitch-6860", type: "Product" },
  { title: "Stellar Wi-Fi", href: "/platform/stellar-wifi", type: "Platform" },
  { title: "Contact Sales", href: "/company/contact", type: "Company" },
  { title: "Support", href: "/support", type: "Service" },
  { title: "Case Studies", href: "/customers/case-studies", type: "Company" },
  { title: "Partner Portal", href: "/partners", type: "Partner" },
  { title: "Careers", href: "/company/careers", type: "Company" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query || query.length < 2) return <>{text}</>;
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length >= 2);
  if (terms.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        terms.some((t) => part.toLowerCase() === t) ? (
          <mark key={i} className="bg-ale-100 text-ale-dark rounded-sm px-0.5 font-semibold">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function flattenGroups(groups: GroupedResults): SearchResult[] {
  const order = ["Product", "Solution", "Platform", "Industry", "Service", "Blog", "Company", "Partner", "Resource", "Legal"];
  const flat: SearchResult[] = [];
  for (const type of order) {
    if (groups[type]) flat.push(...groups[type]);
  }
  return flat;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [grouped, setGrouped] = useState<GroupedResults>({});
  const [facets, setFacets] = useState<FacetCounts>({ type: {} });
  const [suggestions, setSuggestions] = useState<SuggestItem[]>([]);
  const [didYouMean, setDidYouMean] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [mode, setMode] = useState<"suggest" | "results" | "idle">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const flat = flattenGroups(grouped);
  const hasResults = flat.length > 0;
  const showQuickLinks = query.length < 2 && !loading && mode === "idle";
  const showSuggestions = mode === "suggest" && suggestions.length > 0 && !hasResults;

  // Focus input on open, reset on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setGrouped({});
      setFacets({ type: {} });
      setSuggestions([]);
      setDidYouMean([]);
      setActiveIdx(-1);
      setMode("idle");
    }
  }, [isOpen]);

  // Autocomplete suggest
  const suggest = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return; }
    try {
      const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      if (!hasResults) setMode("suggest");
    } catch {
      setSuggestions([]);
    }
  }, [hasResults]);

  // Full search
  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setGrouped({});
      setFacets({ type: {} });
      setDidYouMean([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setGrouped(data.results || {});
      setFacets(data.facets || { type: {} });
      setDidYouMean(data.suggestions || []);
      setActiveIdx(-1);
      setMode("results");
    } catch {
      setGrouped({});
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    setActiveIdx(-1);

    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    if (suggestDebounce.current) clearTimeout(suggestDebounce.current);

    if (value.length < 2) {
      setMode("idle");
      setGrouped({});
      setSuggestions([]);
      setDidYouMean([]);
      return;
    }

    // Show suggestions fast (150ms), full search slower (300ms)
    suggestDebounce.current = setTimeout(() => suggest(value), 150);
    searchDebounce.current = setTimeout(() => search(value), 300);
  }

  function handleDidYouMean(term: string) {
    setQuery(term);
    search(term);
  }

  // Navigate to full search page
  function goToSearchPage() {
    if (query.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    // Determine navigable items
    let items: { href: string }[];
    if (hasResults) items = flat;
    else if (showSuggestions) items = suggestions;
    else if (showQuickLinks) items = quickLinks;
    else items = [];

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && activeIdx < items.length) {
        router.push(items[activeIdx].href);
        onClose();
      } else {
        goToSearchPage();
      }
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!isOpen) return null;

  let globalIdx = -1;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] sm:pt-[12vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-light-200 px-5">
          <svg className="w-5 h-5 text-ale shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Search products, solutions, industries..."
            className="flex-1 h-14 text-base text-text outline-none placeholder:text-text-muted bg-transparent"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setGrouped({}); setSuggestions([]); setDidYouMean([]); setActiveIdx(-1); setMode("idle"); inputRef.current?.focus(); }}
              className="text-text-muted hover:text-text transition-colors p-1"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center text-[11px] font-medium text-text-muted border border-light-200 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto overscroll-contain">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 p-8">
              <div className="w-4 h-4 border-2 border-ale/30 border-t-ale rounded-full animate-spin" />
              <span className="text-sm text-text-muted">Searching...</span>
            </div>
          )}

          {/* "Did you mean" suggestions */}
          {!loading && query.length >= 2 && !hasResults && didYouMean.length > 0 && (
            <div className="px-5 pt-4 pb-2">
              <p className="text-sm text-text-muted">
                Did you mean:{" "}
                {didYouMean.map((term, i) => (
                  <Fragment key={term}>
                    {i > 0 && ", "}
                    <button
                      onClick={() => handleDidYouMean(term)}
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
          {!loading && query.length >= 2 && !hasResults && !showSuggestions && didYouMean.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-text">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-text-muted mt-1">Try a different search term</p>
            </div>
          )}

          {/* Autocomplete suggestions (shown before full results load) */}
          {!loading && showSuggestions && (
            <div className="py-2">
              <div className="px-5 pt-3 pb-1.5 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Suggestions
                </span>
                <div className="flex-1 h-px bg-light-100" />
              </div>
              {suggestions.map((s, i) => {
                const isActive = i === activeIdx;
                const cfg = typeConfig[s.type];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    data-idx={i}
                    onClick={(e) => { e.preventDefault(); router.push(s.href); onClose(); }}
                    className={`flex items-center gap-3 px-5 py-2.5 transition-colors cursor-pointer ${
                      isActive ? "bg-ale-50" : "hover:bg-light-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-ale text-white" : "bg-light-100 text-text-muted"
                    } transition-colors`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cfg?.icon || ""} />
                      </svg>
                    </div>
                    <span className={`text-sm font-medium flex-1 ${isActive ? "text-ale" : "text-text"}`}>
                      <Highlight text={s.title} query={query} />
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cfg?.color || "bg-gray-100 text-gray-700"}`}>
                      {s.type}
                    </span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Grouped results */}
          {!loading && hasResults && (
            <div className="py-2">
              {Object.entries(grouped).map(([type, items]) => {
                const count = facets.type[type] || items.length;
                return (
                  <div key={type}>
                    {/* Group header with facet count */}
                    <div className="px-5 pt-3 pb-1.5 flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeConfig[type]?.color || "bg-gray-100 text-gray-700"}`}>
                        {typeLabels[type] || type}
                        {count > items.length && (
                          <span className="ml-1 opacity-70">({count})</span>
                        )}
                      </span>
                      <div className="flex-1 h-px bg-light-100" />
                    </div>

                    {/* Items */}
                    {items.map((r) => {
                      globalIdx++;
                      const idx = globalIdx;
                      const isActive = idx === activeIdx;
                      return (
                        <a
                          key={r.href}
                          href={r.href}
                          data-idx={idx}
                          onClick={(e) => { e.preventDefault(); router.push(r.href); onClose(); }}
                          className={`flex items-center gap-3 px-5 py-2.5 transition-colors cursor-pointer ${
                            isActive ? "bg-ale-50" : "hover:bg-light-50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive ? "bg-ale text-white" : "bg-light-100 text-text-muted"
                          } transition-colors`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={typeConfig[type]?.icon || ""} />
                            </svg>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold truncate ${isActive ? "text-ale" : "text-text"}`}>
                              <Highlight text={r.title} query={query} />
                            </div>
                            <p className="text-xs text-text-muted line-clamp-1">
                              <Highlight text={r.description} query={query} />
                            </p>
                          </div>

                          <svg className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-ale" : "text-light-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                );
              })}

              {/* "View all results" link */}
              {query.length >= 2 && (
                <button
                  onClick={goToSearchPage}
                  className="w-full px-5 py-3 text-sm font-medium text-ale hover:bg-ale-50 transition-colors text-center border-t border-light-100 mt-1"
                >
                  View all results for &ldquo;{query}&rdquo; &rarr;
                </button>
              )}
            </div>
          )}

          {/* Quick links (empty state) */}
          {showQuickLinks && (
            <div className="py-2">
              <div className="px-5 pt-3 pb-1.5 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Quick links
                </span>
                <div className="flex-1 h-px bg-light-100" />
              </div>
              {quickLinks.map((link, i) => {
                const isActive = i === activeIdx;
                const cfg = typeConfig[link.type];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    data-idx={i}
                    onClick={(e) => { e.preventDefault(); router.push(link.href); onClose(); }}
                    className={`flex items-center gap-3 px-5 py-2.5 transition-colors cursor-pointer ${
                      isActive ? "bg-ale-50" : "hover:bg-light-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-ale text-white" : "bg-light-100 text-text-muted"
                    } transition-colors`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cfg?.icon || ""} />
                      </svg>
                    </div>
                    <span className={`text-sm font-medium ${isActive ? "text-ale" : "text-text"}`}>
                      {link.title}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ml-auto ${cfg?.color || "bg-gray-100 text-gray-700"}`}>
                      {link.type}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-light-200 px-5 py-2.5 flex items-center gap-4 text-[11px] text-text-muted">
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center w-5 h-5 border border-light-200 rounded text-[10px]">↑</kbd>
            <kbd className="inline-flex items-center justify-center w-5 h-5 border border-light-200 rounded text-[10px]">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 border border-light-200 rounded text-[10px]">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 border border-light-200 rounded text-[10px]">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
