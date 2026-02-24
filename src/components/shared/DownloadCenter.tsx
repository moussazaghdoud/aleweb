"use client";

import { useState, useMemo } from "react";

export interface DownloadItem {
  fileUrl: string;
  fileName: string;
  anchorText: string;
  documentType: string;
}

const TYPE_LABELS: Record<string, string> = {
  datasheet: "Datasheet",
  brochure: "Brochure",
  flyer: "Flyer",
  whitepaper: "Whitepaper",
  "solution-sheet": "Solution Sheet",
  ebook: "eBook",
  infographic: "Infographic",
  "user-guide": "User Guide",
  "user-manual": "User Manual",
  "product-matrix": "Product Matrix",
  "app-note": "App Note",
  "application-note": "App Note",
  report: "Report",
  "tech-brief": "Tech Brief",
  faq: "FAQ",
  document: "Document",
};

const TYPE_ICONS: Record<string, string> = {
  datasheet: "M3 4h18v16H3V4zm2 2v12h14V6H5zm3 3h8v1H8V9zm0 3h8v1H8v-1zm0 3h5v1H8v-1z",
  brochure: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  whitepaper: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  ebook: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  default: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
};

function getFileIcon(type: string) {
  const path = TYPE_ICONS[type] || TYPE_ICONS.default;
  return (
    <svg className="w-5 h-5 text-ale shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function resolveUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `https://www.al-enterprise.com${url}`;
}

export function DownloadCenter({ downloads, title }: { downloads: DownloadItem[]; title?: string }) {
  const [activeType, setActiveType] = useState("all");

  const types = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const d of downloads) {
      const t = d.documentType || "document";
      counts[t] = (counts[t] || 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count, label: TYPE_LABELS[type] || type }));
  }, [downloads]);

  const filtered = activeType === "all"
    ? downloads
    : downloads.filter((d) => d.documentType === activeType);

  if (downloads.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-light-200">
      <div className="mx-auto max-w-[1320px] px-6">
        <h2 className="text-2xl font-extrabold text-text tracking-tight mb-2">
          {title || "Resources & Downloads"}
        </h2>
        <p className="text-sm text-text-muted mb-8">
          {downloads.length} resource{downloads.length !== 1 ? "s" : ""} available
        </p>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => setActiveType("all")}
            className={`shrink-0 h-8 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              activeType === "all"
                ? "bg-ale text-white"
                : "bg-light-100 text-text-secondary hover:bg-light-200"
            }`}
          >
            All ({downloads.length})
          </button>
          {types.map(({ type, count, label }) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`shrink-0 h-8 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeType === type
                  ? "bg-ale text-white"
                  : "bg-light-100 text-text-secondary hover:bg-light-200"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Download rows */}
        <div className="space-y-2">
          {filtered.map((dl, i) => (
            <a
              key={`${dl.fileUrl}-${i}`}
              href={resolveUrl(dl.fileUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border border-light-200 hover:border-ale-200 hover:bg-ale-50/30 transition-all"
            >
              {getFileIcon(dl.documentType)}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-text group-hover:text-ale transition-colors truncate">
                  {dl.anchorText || dl.fileName}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-medium text-ale bg-ale-50 rounded-full px-2 py-0.5">
                    {TYPE_LABELS[dl.documentType] || dl.documentType}
                  </span>
                  <span className="text-[11px] text-text-muted truncate">{dl.fileName}</span>
                </div>
              </div>
              <div className="shrink-0">
                <svg className="w-5 h-5 text-text-muted group-hover:text-ale group-hover:translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
