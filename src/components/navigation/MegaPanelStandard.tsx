"use client";

import React from "react";
import Link from "next/link";
import { type MegaNavItem, type MegaGroup as MegaGroupType } from "@/data/navigation";
import { MegaGroup } from "@/components/navigation/MegaGroup";
import { MegaFeatured } from "@/components/navigation/MegaFeatured";
import { getCategoryIcon } from "@/components/navigation/mega-icons";

/* ================================================================== */
/*  MegaPanelStandard — grouped-columns mega menu for                  */
/*  Industries, Solutions, Partners, Company                           */
/* ================================================================== */

interface MegaPanelStandardProps {
  item: MegaNavItem;
  onClose: () => void;
}

/**
 * Distribute groups into `colCount` columns, balancing total items per column.
 * Each group's "weight" is 1 (heading) + number of links.
 */
function distributeGroups(
  groups: MegaGroupType[],
  colCount: number,
): MegaGroupType[][] {
  // Initialize columns
  const columns: MegaGroupType[][] = Array.from({ length: colCount }, () => []);
  const columnWeights: number[] = new Array(colCount).fill(0);

  for (const group of groups) {
    const weight = 1 + group.links.length; // heading + links
    // Find the lightest column
    let minIdx = 0;
    for (let i = 1; i < colCount; i++) {
      if (columnWeights[i] < columnWeights[minIdx]) {
        minIdx = i;
      }
    }
    columns[minIdx].push(group);
    columnWeights[minIdx] += weight;
  }

  // Filter out empty columns (in case we have fewer groups than columns)
  return columns.filter((col) => col.length > 0);
}

export function MegaPanelStandard({ item, onClose }: MegaPanelStandardProps) {
  const groups = item.groups ?? [];
  const featured = item.featured;

  // Count total items to decide column count
  const totalItems = groups.reduce(
    (sum, g) => sum + 1 + g.links.length, // 1 for heading
    0,
  );
  const colCount = totalItems <= 10 ? 2 : totalItems <= 20 ? 3 : 4;
  const columns = distributeGroups(groups, colCount);

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/8 border border-light-200 overflow-hidden">
      <div className="flex">
        {/* ── Link columns ──────────────────────────────────────────── */}
        <div className="flex-1 p-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-text">
              <span className="text-ale">{getCategoryIcon(item.label)}</span>
              <h3 className="text-sm font-bold">{item.label}</h3>
            </div>
            <Link
              href={item.href}
              onClick={onClose}
              className="text-[11px] font-semibold text-ale hover:underline"
            >
              View All {item.label} &rarr;
            </Link>
          </div>

          {/* Groups grid */}
          <div
            className="grid gap-x-8 gap-y-6"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((colGroups, colIdx) => (
              <div key={colIdx} className="space-y-5">
                {colGroups.map((g) => (
                  <MegaGroup key={g.heading} group={g} onClose={onClose} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured sidebar ──────────────────────────────────────── */}
        {featured && (
          <div className="border-l border-light-200">
            <MegaFeatured
              title={featured.title}
              description={featured.description}
              href={featured.href}
              onClose={onClose}
              icon={getCategoryIcon(item.label)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
