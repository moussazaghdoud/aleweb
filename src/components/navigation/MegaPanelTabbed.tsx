"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type MegaNavItem } from "@/data/navigation";
import { MegaGroup } from "@/components/navigation/MegaGroup";
import { MegaFeatured } from "@/components/navigation/MegaFeatured";
import { getCategoryIcon } from "@/components/navigation/mega-icons";

/* ================================================================== */
/*  MegaPanelTabbed — Tabbed mega menu panel (used for Products)       */
/*  Left tab sidebar | Middle scrollable content | Right featured CTA  */
/* ================================================================== */

interface MegaPanelTabbedProps {
  item: MegaNavItem;
  onClose: () => void;
}

export function MegaPanelTabbed({ item, onClose }: MegaPanelTabbedProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = item.tabs ?? [];
  const currentTab = tabs[activeTab];
  const hasFeatured = !!item.featured;

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/8 border border-light-200 overflow-hidden">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-light-100">
        <div className="flex items-center gap-2">
          <span className="text-ale">{getCategoryIcon(item.label)}</span>
          <span className="text-sm font-bold text-text">{item.label}</span>
        </div>
        <Link
          href={item.href}
          onClick={onClose}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-ale hover:text-ale-dark transition-colors"
        >
          View All {item.label}
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* ── Body: tab sidebar + content + featured ── */}
      <div className="flex">
        {/* ── Tab sidebar (left) ── */}
        <div className="w-[200px] shrink-0 border-r border-light-100 py-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab.slug}
              type="button"
              onMouseEnter={() => setActiveTab(idx)}
              onClick={() => setActiveTab(idx)}
              className={`text-[13px] px-4 py-2.5 w-full text-left transition-colors cursor-pointer ${
                idx === activeTab
                  ? "bg-ale-50 text-ale font-semibold border-l-2 border-ale"
                  : "text-text-secondary hover:text-text hover:bg-light-50 border-l-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content area (middle) ── */}
        <div
          className={`flex-1 min-w-0 p-6 ${hasFeatured ? "border-r border-light-100" : ""}`}
        >
          {currentTab && (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                <div
                  className={`grid gap-x-8 gap-y-6 ${
                    currentTab.groups.length <= 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                  }`}
                >
                  {currentTab.groups.map((g) => (
                    <MegaGroup
                      key={g.heading}
                      group={g}
                      onClose={onClose}
                      compact
                    />
                  ))}
                </div>
              </div>

              {/* View All [category] link */}
              {currentTab.viewAllHref && (
                <div className="mt-4 pt-3 border-t border-light-100">
                  <Link
                    href={currentTab.viewAllHref}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-ale hover:text-ale-dark transition-colors"
                  >
                    {currentTab.viewAllLabel ??
                      `View All ${currentTab.label}`}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Featured sidebar (right) ── */}
        {hasFeatured && item.featured && (
          <MegaFeatured
            title={item.featured.title}
            description={item.featured.description}
            href={item.featured.href}
            onClose={onClose}
            icon={getCategoryIcon(item.label)}
          />
        )}
      </div>
    </div>
  );
}
