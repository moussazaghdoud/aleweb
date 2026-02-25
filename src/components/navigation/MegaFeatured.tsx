"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/* ================================================================== */
/*  MegaFeatured — Featured CTA card in mega menu sidebar              */
/* ================================================================== */

interface MegaFeaturedProps {
  title: string;
  description: string;
  href: string;
  onClose: () => void;
  icon?: React.ReactNode;
  image?: string;
}

export function MegaFeatured({ title, description, href, onClose, icon, image }: MegaFeaturedProps) {
  return (
    <div className="w-[280px] shrink-0 p-6 bg-gradient-to-br from-ale-50 to-white">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ale/60 mb-3">
        Featured
      </div>
      <Link href={href} onClick={onClose} className="group block">
        <div className="aspect-[16/10] rounded-lg mb-3 overflow-hidden relative">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="280px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ale-800 to-ale-700 flex items-center justify-center">
              <span className="text-ale-300">{icon}</span>
            </div>
          )}
        </div>
        <h4 className="text-sm font-bold text-text group-hover:text-ale transition-colors mb-1">
          {title}
        </h4>
        <p className="text-[11px] text-text-muted leading-relaxed">
          {description}
        </p>
        <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-ale group-hover:gap-1.5 transition-all">
          Learn more
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
