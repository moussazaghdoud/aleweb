"use client";

import { useState, useRef, useEffect } from "react";

const locales = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Fran\u00e7ais" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored && locales.some((l) => l.code === stored)) {
      setCurrent(stored);
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(code: string) {
    setCurrent(code);
    localStorage.setItem("locale", code);
    setOpen(false);

    // Update the HTML lang attribute
    document.documentElement.lang = code;

    // In a full i18n setup, this would navigate to the localized URL
    // For now, just store the preference — content falls back to English
  }

  const active = locales.find((l) => l.code === current) || locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-text-muted hover:text-text rounded-md hover:bg-light-50 transition-colors"
        aria-label="Change language"
        aria-expanded={open}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        {active.label}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-light-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => switchLocale(locale.code)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                locale.code === current
                  ? "text-ale font-semibold bg-ale-50"
                  : "text-text-secondary hover:bg-light-50 hover:text-text"
              }`}
            >
              <span className="font-semibold mr-2">{locale.label}</span>
              {locale.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
