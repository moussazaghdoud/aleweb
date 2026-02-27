"use client";

import React from "react";
import { type MegaNavItem } from "@/data/navigation";
import { MegaPanelStandard } from "./MegaPanelStandard";
import { MegaPanelTabbed } from "./MegaPanelTabbed";

/* ================================================================== */
/*  MegaPanel — Router that picks the correct panel variant            */
/* ================================================================== */

interface MegaPanelProps {
  item: MegaNavItem;
  onClose: () => void;
}

export function MegaPanel({ item, onClose }: MegaPanelProps) {
  return (
    <div className="absolute top-full left-0 right-0 pt-2 z-50" role="region" aria-label={`${item.label} menu`}>
      <div className="mx-auto max-w-[1320px] px-6 animate-mega-enter">
        {item.variant === "tabbed" ? (
          <MegaPanelTabbed item={item} onClose={onClose} />
        ) : (
          <MegaPanelStandard item={item} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
