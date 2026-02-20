"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/data/navigation";

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-light-300/60">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="flex h-[60px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-ale flex items-center justify-center">
              <span className="text-white font-extrabold text-[10px] tracking-tight">ALE</span>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="text-[13px] font-bold text-text block">Alcatel-Lucent</span>
              <span className="text-[10px] font-semibold text-ale tracking-wider uppercase">Enterprise</span>
            </div>
          </Link>

          {/* Desktop nav — simple links with clean dropdowns */}
          <nav className="hidden lg:flex items-center gap-7">
            {primaryNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-[14px] font-medium py-4 transition-colors ${
                    openDropdown === item.label ? "text-ale" : "text-text-secondary hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1">
                    <div className="bg-white rounded-xl shadow-xl border border-light-200 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-[13px] text-text-secondary hover:text-ale hover:bg-ale-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-text-muted hover:text-text transition-colors" aria-label="Search">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center h-9 px-5 text-[13px] font-semibold bg-ale text-white rounded-full hover:bg-ale-dark transition-colors"
            >
              Contact Us
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-text"
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

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto">
          <div className="px-6 py-6">
            {primaryNav.map((item) => (
              <MobileSection key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
            <div className="pt-6 mt-4 border-t border-light-200">
              <Link
                href="/contact"
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

function MobileSection({ item, onClose }: { item: (typeof primaryNav)[0]; onClose: () => void }) {
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
        {item.label}
        <svg className={`w-4 h-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-3 pb-3">
          {item.children.map((child) => (
            <Link key={child.label} href={child.href} className="block py-2 text-[14px] text-text-secondary hover:text-ale" onClick={onClose}>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
