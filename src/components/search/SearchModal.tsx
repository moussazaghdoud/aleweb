"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type SearchResult = {
  title: string;
  description: string;
  href: string;
  type: string;
};

const typeColors: Record<string, string> = {
  Product: "bg-blue-50 text-blue-700",
  Solution: "bg-purple-50 text-purple-700",
  Industry: "bg-green-50 text-green-700",
  Platform: "bg-cyan-50 text-cyan-700",
  Service: "bg-orange-50 text-orange-700",
  Blog: "bg-pink-50 text-pink-700",
  Company: "bg-gray-100 text-gray-700",
  Partner: "bg-amber-50 text-amber-700",
};

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 250);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center border-b border-light-200 px-5">
          <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Search products, solutions, industries..."
            className="flex-1 h-14 px-3 text-base text-text outline-none placeholder:text-text-muted"
          />
          <button
            onClick={onClose}
            className="text-xs font-medium text-text-muted border border-light-200 rounded-md px-2 py-1 hover:bg-light-50"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-sm text-text-muted">Searching...</div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-6 text-center text-sm text-text-muted">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul>
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-light-50 transition-colors border-b border-light-100 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-text truncate">{r.title}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${typeColors[r.type] || "bg-gray-100 text-gray-700"}`}>
                          {r.type}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-1">{r.description}</p>
                    </div>
                    <svg className="w-4 h-4 text-text-muted shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!loading && query.length < 2 && (
            <div className="p-6 text-center text-sm text-text-muted">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
