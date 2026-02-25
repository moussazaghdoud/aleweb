"use client";

import React from "react";
import Link from "next/link";
import { type MegaGroup as MegaGroupType } from "@/data/navigation";

/* ================================================================== */
/*  MegaGroup — Group heading + list of links in mega menu             */
/* ================================================================== */

interface MegaGroupProps {
  group: MegaGroupType;
  onClose: () => void;
  compact?: boolean;
}

export function MegaGroup({ group, onClose, compact }: MegaGroupProps) {
  return (
    <div>
      {group.href ? (
        <Link
          href={group.href}
          onClick={onClose}
          className="text-[11px] font-bold uppercase tracking-wider text-ale hover:underline mb-2 block"
        >
          {group.heading}
        </Link>
      ) : (
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2 block">
          {group.heading}
        </span>
      )}

      <ul className="space-y-0.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group/link flex items-center gap-2 px-2 py-1.5 -mx-2 rounded-md text-[13px] text-text-secondary hover:text-ale hover:bg-ale-50 transition-colors min-w-0"
            >
              <span className="font-medium truncate">{link.label}</span>

              {link.badge && (
                <span className="text-[9px] font-bold uppercase bg-ale text-white px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}

              {link.external && (
                <svg
                  className="w-3 h-3 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              )}

              {!compact && link.description && (
                <span className="text-[11px] text-text-muted leading-relaxed ml-auto hidden xl:inline">
                  {link.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
