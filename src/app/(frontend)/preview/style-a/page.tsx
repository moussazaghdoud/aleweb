"use client";

import Link from "next/link";
import { useState } from "react";

const pillars = [
  {
    id: "network",
    label: "Intelligent Networks",
    headline: "Software-defined, autonomous, secure",
    description:
      "From campus switches and Wi-Fi 7 to industrial networks and SD-WAN — a unified, AI-managed network fabric that self-heals, auto-segments, and protects.",
    products: ["OmniSwitch (14 models)", "Stellar Wi-Fi (20+ APs)", "Private 5G", "SD-WAN & SASE"],
    stats: [
      { value: "29M+", label: "IoT fingerprints" },
      { value: "1 OS", label: "edge to core" },
    ],
    href: "/solutions/secure-your-network",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "blue",
    accent: "from-blue-500 to-indigo-600",
    tabActive: "bg-blue-500 text-white",
    tabInactive: "text-blue-600 hover:bg-blue-50",
    dotColor: "bg-blue-500",
    statColor: "text-blue-600",
  },
  {
    id: "cloud",
    label: "Cloud-Native Services",
    headline: "UCaaS, CCaaS, CPaaS — everything as a service",
    description:
      "Rainbow cloud communications, OmniPCX Enterprise telephony, ALE Connect contact center, OXO Connect for SMB, and Purple on Demand subscriptions.",
    products: ["Rainbow", "OmniPCX Enterprise", "ALE Connect", "OXO Connect", "Purple on Demand"],
    stats: [
      { value: "3M+", label: "daily users" },
      { value: "99.999%", label: "uptime" },
    ],
    href: "/solutions/move-to-cloud",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    color: "purple",
    accent: "from-purple-500 to-fuchsia-600",
    tabActive: "bg-purple-500 text-white",
    tabInactive: "text-purple-600 hover:bg-purple-50",
    dotColor: "bg-purple-500",
    statColor: "text-purple-600",
  },
  {
    id: "ai",
    label: "AI-Powered Operations",
    headline: "Predictive, automated, intelligent",
    description:
      "AI isn't a product — it's an intelligence layer across the entire platform. From predictive network analytics to IoT fingerprinting and automated threat response.",
    products: ["OmniVista AI Ops", "IoT Analytics", "Threat Detection", "Auto-Healing Networks"],
    stats: [
      { value: "70%", label: "faster resolution" },
      { value: "AI/ML", label: "across the stack" },
    ],
    href: "/solutions/optimize-with-ai",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    color: "cyan",
    accent: "from-cyan-500 to-teal-600",
    tabActive: "bg-cyan-500 text-white",
    tabInactive: "text-cyan-600 hover:bg-cyan-50",
    dotColor: "bg-cyan-500",
    statColor: "text-cyan-600",
  },
];

export default function StylePreviewA() {
  const [active, setActive] = useState(0);
  const p = pillars[active];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Style A — Interactive Tabs</h1>
          <div className="flex gap-3">
            <Link href="/preview/style-b" className="text-xs font-semibold text-purple-600 hover:underline">View B →</Link>
            <Link href="/preview/style-c" className="text-xs font-semibold text-cyan-600 hover:underline">View C →</Link>
          </div>
        </div>
      </div>

      {/* Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-3">One integrated platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Three pillars. One digital infrastructure.
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center gap-2 mb-10">
            {pillars.map((pill, i) => (
              <button
                key={pill.id}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  i === active ? pill.tabActive + " shadow-lg" : pill.tabInactive + " bg-white border border-gray-200"
                }`}
              >
                {pill.icon}
                {pill.label}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left — info */}
              <div className="p-10 lg:p-14">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{p.headline}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-8">{p.description}</p>

                {/* Products */}
                <div className="space-y-2.5 mb-8">
                  {p.products.map((prod) => (
                    <div key={prod} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className={`w-2 h-2 rounded-full ${p.dotColor}`} />
                      {prod}
                    </div>
                  ))}
                </div>

                <Link
                  href={p.href}
                  className={`inline-flex items-center gap-2 h-11 px-6 bg-gradient-to-r ${p.accent} text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity`}
                >
                  Explore {p.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Right — stats highlight */}
              <div className={`bg-gradient-to-br ${p.accent} p-10 lg:p-14 flex flex-col justify-center`}>
                <div className="grid grid-cols-2 gap-8">
                  {p.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2">{s.value}</div>
                      <div className="text-sm text-white/70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
