"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { industries } from "@/data/homepage";
import type { IndustryIconName } from "@/data/homepage";
import {
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
} from "@/components/primitives/Icons";

const iconMap: Record<IndustryIconName, React.ComponentType<{ className?: string }>> = {
  healthcare: IconHealthcare,
  education: IconEducation,
  hospitality: IconHospitality,
  government: IconGovernment,
  transportation: IconTransportation,
  energy: IconEnergy,
  manufacturing: IconManufacturing,
  "smart-buildings": IconSmartBuildings,
};

const industryImages: Record<string, string> = {
  healthcare: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/healthcare-header-image-v2.jpg?h=600&w=1440",
  education: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/education-header-image-v2.jpg?h=600&w=1440",
  hospitality: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hospitality-header-bar-image-l2-l3.jpg?h=600&w=1440",
  government: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/government-header-image-v2.jpg?h=600&w=1440",
  transportation: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440",
  energy: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/energy-utilities-banner-1440x600.jpg?h=600&w=1440",
  manufacturing: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/man-holding-a-tablet-image-1440x600.jpg?h=600&w=1440",
  "smart-buildings": "https://web-assets.al-enterprise.com/-/media/assets/internet/images/smart-buildings-banner-image-1440x600-v2.jpg?h=600&w=1440",
};

export function IndustrySelector() {
  const [selected, setSelected] = useState(0);
  const current = industries[selected];
  const CurrentIcon = iconMap[current.icon];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="max-w-xl mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale mb-3 block">Industries</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            Solutions built for your industry
          </h2>
          <p className="mt-4 text-text-secondary text-lg font-light">
            Technology that understands your vertical.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left tabs */}
          <div className="lg:col-span-2 space-y-1">
            {industries.map((industry, i) => {
              const Icon = iconMap[industry.icon];
              return (
                <button
                  key={industry.slug}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all cursor-pointer group flex items-center gap-3 ${
                    selected === i
                      ? "bg-ale-50 border-l-[3px] border-ale"
                      : "hover:bg-light-100 border-l-[3px] border-transparent"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selected === i ? "bg-ale text-white" : "bg-light-100 text-text-muted group-hover:bg-ale-50 group-hover:text-ale"
                  } transition-colors`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-[14px] font-semibold transition-colors ${selected === i ? "text-ale" : "text-text group-hover:text-text"}`}>
                      {industry.name}
                    </h3>
                    <p className="text-[12px] text-text-muted mt-0.5">{industry.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right image card */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[420px]">
            <Image src={industryImages[current.slug]} alt={current.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
                  <CurrentIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{current.name}</h3>
              </div>
              <ul className="space-y-2 mb-5">
                {current.solutions.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-ale-300 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={`/industries/${current.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-ale-200 transition-colors">
                Explore {current.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
