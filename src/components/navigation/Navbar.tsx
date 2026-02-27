"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNav, type MegaNavItem } from "@/data/navigation";
import { MegaPanel } from "./MegaPanel";
import MobileMenu from "./MobileMenu";

/* ================================================================== */
/*  NAVBAR SHELL                                                       */
/*  - Logo, nav links, search, CTA, mobile toggle                     */
/*  - Mega panels delegated to <MegaPanel>                             */
/*  - Mobile drawer delegated to <MobileMenu>                          */
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
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* helper: does this item have a mega panel? */
  const hasMega = (item: MegaNavItem) =>
    (item.groups && item.groups.length > 0) || (item.tabs && item.tabs.length > 0);

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
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {primaryNav.map((item) => {
              const isMega = hasMega(item);
              const isOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => open(item.label)}
                  onMouseLeave={close}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors ${
                      isOpen
                        ? "text-ale bg-ale-50"
                        : "text-text-secondary hover:text-text hover:bg-light-50"
                    }`}
                    onFocus={() => open(item.label)}
                    {...(isMega && {
                      "aria-haspopup": "true" as const,
                      "aria-expanded": isOpen,
                    })}
                  >
                    {item.label}
                    {isMega && (
                      <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
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
              aria-expanded={mobileOpen}
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
            hasMega(item) && item.label === openDropdown ? (
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
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
