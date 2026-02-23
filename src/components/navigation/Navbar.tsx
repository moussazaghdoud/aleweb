"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNav, type NavItem } from "@/data/navigation";

/* ================================================================== */
/*  MEGA MENU NAVBAR                                                   */
/*  - Full-width mega dropdowns for main nav items                     */
/*  - Multi-column link grid with descriptions                         */
/*  - Featured section with CTA                                        */
/*  - Smooth enter/exit transitions                                    */
/*  - Keyboard accessible                                              */
/*  - Responsive: collapses to mobile drawer on < lg                   */
/* ================================================================== */

/* ── Pillar color coding for Platform items ── */
const pillarHint: Record<string, string> = {
  Rainbow: "text-purple-500",
  OmniSwitch: "text-blue-500",
  "Stellar Wi-Fi": "text-blue-500",
  "AI Ops": "text-cyan-500",
  "Private 5G": "text-blue-500",
  "OmniPCX Enterprise": "text-purple-500",
  "ALE Connect": "text-purple-500",
};

/* ── Category icons for mega menu headers ── */
function getCategoryIcon(label: string) {
  const icons: Record<string, React.ReactNode> = {
    Industries: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    Solutions: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    Platform: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
      </svg>
    ),
    Services: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a1.5 1.5 0 01-.82-1.34V6.09a1.5 1.5 0 01.82-1.34l5.1-3.06a1.5 1.5 0 011.16 0l5.1 3.06a1.5 1.5 0 01.82 1.34v4.68a1.5 1.5 0 01-.82 1.34l-5.1 3.06a1.5 1.5 0 01-1.16 0z" />
      </svg>
    ),
    Partners: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    Company: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  };
  return icons[label] || null;
}

/* ── Determine column layout based on child count ── */
function getColumnCount(count: number): number {
  if (count <= 5) return 1;
  if (count <= 8) return 2;
  return 3;
}

/* ================================================================== */
/*  MEGA DROPDOWN PANEL                                                */
/* ================================================================== */

function MegaPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const children = item.children || [];
  const cols = getColumnCount(children.length);
  const hasFeatured = !!item.featured;

  // Split children into columns
  const perCol = Math.ceil(children.length / cols);
  const columns: typeof children[] = [];
  for (let i = 0; i < cols; i++) {
    columns.push(children.slice(i * perCol, (i + 1) * perCol));
  }

  return (
    <div className="absolute top-full left-0 right-0 pt-2 z-50">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/8 border border-light-200 overflow-hidden animate-mega-enter">
          <div className="flex">
            {/* ── Link columns ── */}
            <div className={`flex-1 p-6 ${hasFeatured ? "border-r border-light-100" : ""}`}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-light-100">
                <span className="text-ale">{getCategoryIcon(item.label)}</span>
                <span className="text-sm font-bold text-text">{item.label}</span>
              </div>

              <div className={`grid ${cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : "grid-cols-3"} gap-x-8`}>
                {columns.map((col, ci) => (
                  <div key={ci} className="space-y-1">
                    {col.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={onClose}
                        className="group flex items-start gap-3 px-3 py-2.5 -mx-3 rounded-lg hover:bg-ale-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className={`text-[13px] font-semibold text-text group-hover:text-ale transition-colors ${pillarHint[child.label] || ""}`}>
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                              {child.description}
                            </div>
                          )}
                        </div>
                        <svg className="w-3.5 h-3.5 text-text-muted/0 group-hover:text-ale group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Featured section ── */}
            {hasFeatured && item.featured && (
              <div className="w-[280px] shrink-0 p-6 bg-gradient-to-br from-ale-50 to-white">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-ale/60 mb-3">Featured</div>
                <Link href={item.featured.href} onClick={onClose} className="group block">
                  <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-ale-deep to-ale-900 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-ale-300">{getCategoryIcon(item.label)}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ale-deep/60 to-transparent" />
                  </div>
                  <h4 className="text-sm font-bold text-text group-hover:text-ale transition-colors mb-1">
                    {item.featured.title}
                  </h4>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {item.featured.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-ale group-hover:gap-1.5 transition-all">
                    Learn more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN NAVBAR                                                        */
/* ================================================================== */

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const open = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-light-300/60">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="flex h-[60px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={() => { setOpenDropdown(null); setMobileOpen(false); }}>
            <Image
              src="/ale-logo.png"
              alt="Alcatel-Lucent Enterprise"
              width={160}
              height={40}
              className="h-[36px] w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => open(item.label)}
                onMouseLeave={close}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors ${
                    openDropdown === item.label
                      ? "text-ale bg-ale-50"
                      : "text-text-secondary hover:text-text hover:bg-light-50"
                  }`}
                  onFocus={() => open(item.label)}
                >
                  {item.label}
                  {item.children && (
                    <svg className={`w-3 h-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-text-muted hover:text-text transition-colors rounded-lg hover:bg-light-50" aria-label="Search">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              href="/company/contact"
              className="hidden sm:inline-flex items-center h-9 px-5 text-[13px] font-semibold bg-ale text-white rounded-full hover:bg-ale-dark transition-colors"
            >
              Contact Us
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-text rounded-lg hover:bg-light-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mega Menu Panels ── */}
      {openDropdown && (
        <div
          onMouseEnter={() => open(openDropdown)}
          onMouseLeave={close}
        >
          {primaryNav.map((item) =>
            item.children && item.label === openDropdown ? (
              <MegaPanel key={item.label} item={item} onClose={() => setOpenDropdown(null)} />
            ) : null
          )}
        </div>
      )}

      {/* ── Backdrop overlay when mega menu is open ── */}
      {openDropdown && (
        <div
          className="fixed inset-0 top-[60px] bg-black/5 -z-10"
          onClick={() => setOpenDropdown(null)}
        />
      )}

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto">
          <div className="px-6 py-6">
            {primaryNav.map((item) => (
              <MobileSection key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
            <div className="pt-6 mt-4 border-t border-light-200">
              <Link
                href="/company/contact"
                className="flex items-center justify-center h-11 w-full bg-ale text-white font-semibold rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================================================================== */
/*  MOBILE SECTION                                                     */
/* ================================================================== */

function MobileSection({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link href={item.href} className="block py-3 text-[15px] font-medium text-text" onClick={onClose}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-light-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-[15px] font-medium text-text cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="text-ale">{getCategoryIcon(item.label)}</span>
          {item.label}
        </span>
        <svg className={`w-4 h-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-3 pb-3 space-y-0.5">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-3 py-2 rounded-lg text-[14px] text-text-secondary hover:text-ale hover:bg-ale-50 transition-colors"
              onClick={onClose}
            >
              <div className="font-medium">{child.label}</div>
              {child.description && (
                <div className="text-[11px] text-text-muted mt-0.5">{child.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
