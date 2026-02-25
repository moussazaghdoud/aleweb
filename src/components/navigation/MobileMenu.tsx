"use client";

import React, { useState } from "react";
import Link from "next/link";
import { primaryNav, type MegaNavItem, type MegaGroup, type MegaTab, type MegaLink } from "@/data/navigation";
import { getCategoryIcon } from "@/components/navigation/mega-icons";

/* ------------------------------------------------------------------ */
/*  Chevron icon                                                       */
/* ------------------------------------------------------------------ */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  External link icon                                                 */
/* ------------------------------------------------------------------ */

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 ml-1 inline-block text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge pill                                                         */
/* ------------------------------------------------------------------ */

function BadgePill({ text }: { text: string }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-ale/10 px-2 py-0.5 text-[11px] font-medium text-ale">
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Level 3 — Single link item                                         */
/* ------------------------------------------------------------------ */

function LinkItem({ link, onClose }: { link: MegaLink; onClose: () => void }) {
  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="block pl-8 py-2 text-[13px] text-text-secondary hover:text-ale transition-colors"
      onClick={onClose}
    >
      {link.label}
      {link.external && <ExternalIcon />}
      {link.badge && <BadgePill text={link.badge} />}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Level 2 — Standard group (heading + links)                         */
/* ------------------------------------------------------------------ */

function StandardGroupItem({
  group,
  isOpen,
  onToggle,
  onClose,
}: {
  group: MegaGroup;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const hasLinks = group.links.length > 0;

  // If the group has no links, render as a plain link (if href exists) or static text
  if (!hasLinks) {
    if (group.href) {
      return (
        <Link
          href={group.href}
          className="flex w-full items-center justify-between py-2.5 pl-4 text-[14px] font-semibold text-text-secondary hover:text-ale transition-colors"
          onClick={onClose}
        >
          {group.heading}
        </Link>
      );
    }
    return (
      <div className="py-2.5 pl-4 text-[14px] font-semibold text-text-secondary">
        {group.heading}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        {group.href && (
          <Link
            href={group.href}
            className="flex-1 py-2.5 pl-4 text-[14px] font-semibold text-text-secondary hover:text-ale transition-colors"
            onClick={onClose}
          >
            {group.heading}
          </Link>
        )}
        <button
          type="button"
          onClick={onToggle}
          className={`flex ${group.href ? "" : "w-full"} items-center ${group.href ? "" : "flex-1"} justify-between py-2.5 ${group.href ? "pr-4" : "pl-4"} text-[14px] font-semibold text-text-secondary`}
          aria-expanded={isOpen}
        >
          {!group.href && <span>{group.heading}</span>}
          <ChevronIcon open={isOpen} />
        </button>
      </div>
      {isOpen && (
        <div>
          {group.links.map((link) => (
            <LinkItem key={link.href} link={link} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Level 2 — Tab item (for tabbed variant)                            */
/* ------------------------------------------------------------------ */

function TabbedGroupItem({
  tab,
  isOpen,
  onToggle,
  onClose,
}: {
  tab: MegaTab;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const hasGroups = tab.groups.length > 0;

  if (!hasGroups) {
    return (
      <Link
        href={tab.href}
        className="flex w-full items-center justify-between py-2.5 pl-4 text-[14px] font-semibold text-text-secondary hover:text-ale transition-colors"
        onClick={onClose}
      >
        {tab.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={tab.href}
          className="flex-1 py-2.5 pl-4 text-[14px] font-semibold text-text-secondary hover:text-ale transition-colors"
          onClick={onClose}
        >
          {tab.label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center py-2.5 pr-4 text-text-secondary"
          aria-expanded={isOpen}
        >
          <ChevronIcon open={isOpen} />
        </button>
      </div>
      {isOpen && (
        <div>
          {tab.groups.map((group) => (
            <div key={group.heading}>
              {group.heading && (
                <div className="pl-6 pt-2 pb-1 text-[12px] font-medium uppercase tracking-wide text-text-secondary/60">
                  {group.heading}
                </div>
              )}
              {group.links.map((link) => (
                <LinkItem key={link.href} link={link} onClose={onClose} />
              ))}
            </div>
          ))}
          {tab.viewAllLabel && tab.viewAllHref && (
            <Link
              href={tab.viewAllHref}
              className="block pl-8 py-2 text-[13px] font-medium text-ale hover:underline"
              onClick={onClose}
            >
              {tab.viewAllLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Level 1 — Top-level nav item                                       */
/* ------------------------------------------------------------------ */

function Level1Item({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: MegaNavItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const [openL2, setOpenL2] = useState<string | null>(null);

  const toggleL2 = (key: string) => {
    setOpenL2((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      {/* Level 1 button */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-[15px] font-medium text-text border-b border-light-100"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {getCategoryIcon(item.label)}
          {item.label}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Level 2 content */}
      {isOpen && (
        <div className="pb-2">
          {item.variant === "standard" && item.groups?.map((group) => (
            <StandardGroupItem
              key={group.heading}
              group={group}
              isOpen={openL2 === group.heading}
              onToggle={() => toggleL2(group.heading)}
              onClose={onClose}
            />
          ))}

          {item.variant === "tabbed" && item.tabs?.map((tab) => (
            <TabbedGroupItem
              key={tab.slug}
              tab={tab}
              isOpen={openL2 === tab.slug}
              onToggle={() => toggleL2(tab.slug)}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  MobileMenu                                                         */
/* ================================================================== */

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [openL1, setOpenL1] = useState<string | null>(null);

  const toggleL1 = (label: string) => {
    setOpenL1((prev) => (prev === label ? null : label));
  };

  return (
    <div className="fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto">
      <nav className="px-6 pt-4 pb-8" aria-label="Mobile navigation">
        {primaryNav.map((item) => (
          <Level1Item
            key={item.label}
            item={item}
            isOpen={openL1 === item.label}
            onToggle={() => toggleL1(item.label)}
            onClose={onClose}
          />
        ))}

        {/* Bottom CTA */}
        <div className="pt-6 mt-4 border-t border-light-200 px-6">
          <Link
            href="/company/contact"
            className="flex items-center justify-center h-11 w-full bg-ale text-white font-semibold rounded-full"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </div>
  );
}
