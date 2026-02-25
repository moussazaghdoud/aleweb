"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  IconChat, IconShield, IconAI, IconCloud, IconSignal, IconGlobe,
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconManufacturing, IconEnergy, IconTransportation, IconSmartBuildings,
} from "@/components/primitives/Icons";
import { blogData } from "@/data/blog";

/* ═══════════════════════════════════════════════════════════════════ */
/*  DATA                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

/* ── Three Pillars ── */
const pillars = [
  {
    id: "network" as const,
    label: "Intelligent Networks",
    color: "blue" as const,
    headline: "Software-defined, autonomous, secure",
    description:
      "From campus switches and Wi-Fi 7 to industrial networks and SD-WAN — a unified, AI-managed network fabric that self-heals, auto-segments, and protects.",
    products: ["OmniSwitch (14 models)", "Stellar Wi-Fi (20+ APs)", "Private 5G", "SD-WAN & SASE"],
    stats: [
      { value: "29M+", label: "IoT fingerprints" },
      { value: "1 OS", label: "edge to core" },
    ],
    href: "/solutions/secure-your-network",
  },
  {
    id: "cloud" as const,
    label: "Cloud-Native Services",
    color: "purple" as const,
    headline: "UCaaS, CCaaS, CPaaS — everything as a service",
    description:
      "Rainbow cloud communications, OmniPCX Enterprise telephony, ALE Connect contact center, OXO Connect for SMB, and Purple on Demand subscriptions — deployed your way.",
    products: ["Rainbow", "OmniPCX Enterprise", "ALE Connect", "OXO Connect", "Purple on Demand"],
    stats: [
      { value: "3M+", label: "daily users" },
      { value: "99.999%", label: "uptime" },
    ],
    href: "/solutions/move-to-cloud",
  },
  {
    id: "ai" as const,
    label: "AI-Powered Operations",
    color: "cyan" as const,
    headline: "Predictive, automated, intelligent",
    description:
      "AI isn't a product — it's an intelligence layer across the entire platform. From predictive network analytics to IoT fingerprinting and automated threat response.",
    products: ["OmniVista AI Ops", "IoT Analytics", "Threat Detection", "Auto-Healing Networks"],
    stats: [
      { value: "70%", label: "faster resolution" },
      { value: "AI/ML", label: "across the stack" },
    ],
    href: "/solutions/optimize-with-ai",
  },
];

const pillarColorMap = {
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/50",
    bg: "bg-white/15",
    dot: "bg-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
    stat: "text-blue-400",
    glow: "bg-blue-500/10",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/50",
    bg: "bg-white/15",
    dot: "bg-purple-400",
    badge: "bg-purple-500/20 text-purple-300",
    stat: "text-purple-400",
    glow: "bg-purple-500/10",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    bg: "bg-white/15",
    dot: "bg-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-300",
    stat: "text-cyan-400",
    glow: "bg-cyan-500/10",
  },
};

/* ── Solutions Bar (refined labels) ── */
const solutions = [
  { Icon: IconShield, title: "Intelligent Networks", desc: "OmniSwitch, Stellar, SD-WAN", href: "/solutions/secure-your-network" },
  { Icon: IconChat, title: "Cloud Communications", desc: "Rainbow, OmniPCX, UCaaS", href: "/solutions/modernize-communications" },
  { Icon: IconAI, title: "AI-Powered Operations", desc: "AI Ops, IoT, Analytics", href: "/solutions/optimize-with-ai" },
  { Icon: IconCloud, title: "Everything as a Service", desc: "XaaS, NaaS, subscriptions", href: "/solutions/move-to-cloud" },
  { Icon: IconSignal, title: "Connected Infrastructure", desc: "5G, IoT, Asset Tracking", href: "/solutions/connect-everything" },
  { Icon: IconGlobe, title: "Digital Workplace", desc: "Hybrid work, collaboration", href: "/solutions/enable-hybrid-work" },
];

/* ── Platform Grid ── */
const platformProducts = [
  { name: "OmniSwitch", desc: "Enterprise switching fabric", pillar: "network" as const, href: "/platform/omniswitch", stat: "14+ models" },
  { name: "Rainbow", desc: "Cloud UCaaS & CPaaS", pillar: "cloud" as const, href: "/platform/rainbow", stat: "3M+ users" },
  { name: "OmniVista AI Ops", desc: "AI network intelligence", pillar: "ai" as const, href: "/platform/ai-ops", stat: "ML-powered" },
  { name: "Stellar Wi-Fi", desc: "Wi-Fi 5 to Wi-Fi 7", pillar: "network" as const, href: "/platform/stellar-wifi", stat: "20+ APs" },
  { name: "OmniPCX Enterprise", desc: "Mission-critical telephony", pillar: "cloud" as const, href: "/platform/omnipcx-enterprise", stat: "99.999%" },
  { name: "Private 5G", desc: "Dedicated wireless", pillar: "network" as const, href: "/platform/private-5g", stat: "<10ms" },
  { name: "ALE Connect", desc: "Omnichannel contact center", pillar: "cloud" as const, href: "/platform/ale-connect", stat: "CCaaS" },
  { name: "OXO Connect", desc: "SMB communications", pillar: "cloud" as const, href: "/platform/oxo-connect", stat: "All-in-1" },
  { name: "Phones & Terminals", desc: "Desk, DECT, WLAN, headsets", pillar: "cloud" as const, href: "/platform/desk-phones", stat: "8 ranges" },
];

const platformPillarBadge = {
  network: { label: "Network", class: "bg-blue-500/15 text-blue-400" },
  cloud: { label: "Cloud", class: "bg-purple-500/15 text-purple-400" },
  ai: { label: "AI", class: "bg-cyan-500/15 text-cyan-400" },
};

/* ── SVG icon components for product categories ── */
function IconSwitches({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}
function IconWifi({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  );
}
function IconPhone({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function IconApps({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}
function IconDashboard({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  );
}
function IconLayers({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
    </svg>
  );
}

const productCategories = [
  { name: "Switches", slug: "switches", Icon: IconSwitches, count: "14 models", pillar: "network" as const },
  { name: "Wireless LAN", slug: "wlan", Icon: IconWifi, count: "17 APs", pillar: "network" as const },
  { name: "Phones & Devices", slug: "devices", Icon: IconPhone, count: "10 ranges", pillar: "cloud" as const },
  { name: "Contact Center", slug: "applications", Icon: IconApps, count: "11 products", pillar: "cloud" as const },
  { name: "Platforms", slug: "platforms", Icon: IconLayers, count: "8 platforms", pillar: "cloud" as const },
  { name: "Net Management", slug: "management", Icon: IconDashboard, count: "8 tools", pillar: "ai" as const },
];

const productPillarDot = {
  network: "bg-blue-400",
  cloud: "bg-purple-400",
  ai: "bg-cyan-400",
};

/* ── Industries ── */
const industries = [
  { Icon: IconHealthcare, name: "Healthcare", desc: "Connected care pathways", href: "/industries/healthcare", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/healthcare-header-image-v2.jpg?h=600&w=1440" },
  { Icon: IconEducation, name: "Education", desc: "Smart campus connectivity", href: "/industries/education", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/education-header-image-v2.jpg?h=600&w=1440" },
  { Icon: IconHospitality, name: "Hospitality", desc: "Digital guest experience", href: "/industries/hospitality", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hospitality-header-bar-image-l2-l3.jpg?h=600&w=1440" },
  { Icon: IconGovernment, name: "Government", desc: "Secure public services", href: "/industries/government", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/government-header-image-v2.jpg?h=600&w=1440" },
  { Icon: IconManufacturing, name: "Manufacturing", desc: "Industry 4.0 networks", href: "/industries/manufacturing", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/man-holding-a-tablet-image-1440x600.jpg?h=600&w=1440" },
  { Icon: IconEnergy, name: "Energy & Utilities", desc: "Ruggedized infrastructure", href: "/industries/energy", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/energy-utilities-banner-1440x600.jpg?h=600&w=1440" },
  { Icon: IconTransportation, name: "Transportation", desc: "Smart airports, railways, ports", href: "/industries/transportation", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440" },
  { Icon: IconSmartBuildings, name: "Smart Buildings", desc: "Connected building technology", href: "/industries/smart-buildings", image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/smart-buildings-banner-image-1440x600-v2.jpg?h=600&w=1440" },
];

/* ── Trust stats ── */
const trustStats = [
  { value: "1M+", label: "Enterprise users worldwide" },
  { value: "50+", label: "Countries served" },
  { value: "3,400+", label: "Certified partners" },
  { value: "830K+", label: "Customer locations" },
  { value: "100+", label: "Years of innovation" },
];

const latestPosts = blogData.slice(0, 3);

/* ═══════════════════════════════════════════════════════════════════ */
/*  ANIMATED COUNTER — counts up when scrolled into view              */
/* ═══════════════════════════════════════════════════════════════════ */

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numericMatch = value.match(/^([\d,]+)/);
    if (!numericMatch) return;

    const target = parseInt(numericMatch[1].replace(/,/g, ""), 10);
    const suffix = value.slice(numericMatch[1].length);
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setDisplay(current.toLocaleString() + suffix);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold text-white">{display}</div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCROLL FADE — fades in children when scrolled into view           */
/* ═══════════════════════════════════════════════════════════════════ */

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                    */
/* ═══════════════════════════════════════════════════════════════════ */

export function QuickNav() {
  return (
    <>
      {/* ━━━ 1. THREE PILLARS — The core strategic section ━━━ */}
      <section className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-white relative overflow-hidden">
        {/* Subtle glow blobs */}
        <div className="absolute top-0 left-[15%] w-[400px] h-[300px] bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-[42%] w-[350px] h-[300px] bg-purple-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-[12%] w-[350px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-medium uppercase tracking-widest text-white/50 mb-3">One integrated platform</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Three pillars. One digital infrastructure.
              </h2>
              <p className="mt-4 text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
                ALE unifies intelligent networks, cloud-native services, and AI-powered operations into a single enterprise platform — covering 69&nbsp;products, 38&nbsp;solutions, and 8&nbsp;industries.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const c = pillarColorMap[p.color];
              return (
                <FadeIn key={p.id} delay={i * 150}>
                  <Link
                    href={p.href}
                    className={`group relative block rounded-2xl border ${c.border} ${c.bg} p-7 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg h-full overflow-hidden`}
                  >
                    {/* Bottom darkening gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-2xl pointer-events-none" />
                    {/* Glow effect on hover */}
                    <div className={`absolute -inset-px rounded-2xl ${c.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />

                    {/* Pillar badge */}
                    <span className={`relative inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full ${c.badge} mb-5`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                      {p.label}
                    </span>

                    <h3 className="relative text-lg font-bold text-white mb-2">{p.headline}</h3>
                    <p className="relative text-sm text-white/65 leading-relaxed mb-5">{p.description}</p>

                    {/* Product list */}
                    <div className="relative space-y-1.5 mb-6">
                      {p.products.map((prod) => (
                        <div key={prod} className="flex items-center gap-2 text-xs text-white/55">
                          <span className={`w-1 h-1 rounded-full ${c.dot} opacity-60`} />
                          {prod}
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="relative flex gap-6 pt-5 border-t border-white/10">
                      {p.stats.map((s) => (
                        <div key={s.label}>
                          <div className={`text-lg font-bold ${c.stat}`}>{s.value}</div>
                          <div className="text-[11px] text-white/50">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ 2. SOLUTIONS BAR (sticky) ━━━ */}
      <section className="py-5 bg-white border-b border-light-200 sticky top-[72px] z-30">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-wrap gap-2">
            {solutions.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex items-center gap-2.5 h-10 px-4 rounded-full border border-light-200 hover:border-ale-200 hover:bg-ale-50 transition-all"
              >
                <s.Icon className="w-4 h-4 text-ale" />
                <span className="text-xs font-semibold text-text group-hover:text-ale transition-colors">{s.title}</span>
              </Link>
            ))}
            <Link
              href="/solutions"
              className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-ale-50 text-ale text-xs font-semibold hover:bg-ale-100 transition-colors"
            >
              All Solutions
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 3. PLATFORM SHOWCASE GRID ━━━ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                The ALE platform at a glance
              </h2>
              <p className="mt-3 text-base text-text-secondary max-w-xl mx-auto">
                Every product line. One unified ecosystem covering networking, communications, AI, and endpoints.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformProducts.map((p, i) => {
              const badge = platformPillarBadge[p.pillar];
              return (
                <FadeIn key={p.name} delay={i * 60}>
                  <Link
                    href={p.href}
                    className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-100 shadow-sm p-5 hover:border-ale-200 hover:shadow-md transition-all h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{p.name}</h3>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.class}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-light-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ale">{p.stat}</span>
                      <svg className="w-4 h-4 text-text-muted group-hover:text-ale group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ 4. PRODUCT CATEGORIES (SVG icons, no emojis) ━━━ */}
      <section className="py-16 bg-light-50 border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Explore by product category
              </h2>
              <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
                69 products across switching, wireless, phones, applications, management, and platforms.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {productCategories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 80}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-light-200 hover:border-ale-200 hover:shadow-md transition-all text-center"
                >
                  <div className="relative">
                    <cat.Icon className="w-7 h-7 text-ale group-hover:scale-110 transition-transform" />
                    <span className={`absolute -top-1 -right-2 w-2 h-2 rounded-full ${productPillarDot[cat.pillar]}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{cat.name}</h3>
                    <p className="text-[11px] text-text-muted mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-10 px-6 bg-white border border-ale-200 text-sm font-semibold text-ale rounded-full hover:bg-ale-50 transition-colors"
            >
              View Full Catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 5. INDUSTRIES GRID ━━━ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                  Industries we transform
                </h2>
                <p className="mt-2 text-base text-text-secondary max-w-md">
                  Purpose-built solutions for the sectors that power the world.
                </p>
              </div>
              <Link
                href="/industries"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
              >
                All industries
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <FadeIn key={ind.name} delay={i * 80}>
                <Link
                  href={ind.href}
                  className="group relative rounded-xl overflow-hidden h-52"
                >
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ind.Icon className="w-4 h-4 text-white/80" />
                      <h3 className="text-base font-bold text-white">{ind.name}</h3>
                    </div>
                    <p className="text-xs text-white/70">{ind.desc}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="sm:hidden text-center mt-6">
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale">
              All industries
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 6. TRUST / STATS BAND (animated counters) ━━━ */}
      <section className="py-14 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
            {trustStats.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 7. CUSTOMER TESTIMONIAL ━━━ */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-10 h-10 text-ale-200 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <blockquote className="text-lg sm:text-xl font-medium text-text leading-relaxed mb-6">
                ALE&apos;s network infrastructure has been the backbone of our digital transformation. From zero-touch deployment across 200+ sites to AI-driven network monitoring, we&apos;ve reduced operational complexity by 40% while delivering enterprise-grade connectivity to every corner of our organization.
              </blockquote>
              <div>
                <div className="text-sm font-bold text-text">IT Director</div>
                <div className="text-xs text-text-muted">European Healthcare Group — 200+ facilities</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━━ 8. LATEST INSIGHTS ━━━ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                  Latest insights
                </h2>
                <p className="mt-2 text-base text-text-secondary">
                  Expert perspectives on networking, communications, and digital transformation.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
              >
                All articles
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-light-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex h-5 px-2 bg-ale-50 text-ale text-[10px] font-semibold rounded-full items-center">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="sm:hidden text-center mt-6">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale">
              All articles
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 9. PARTNER ECOSYSTEM ━━━ */}
      <section className="py-16 bg-light-50 border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <FadeIn className="lg:w-1/2">
              <span className="inline-flex h-6 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider items-center mb-4">
                Partner Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight leading-tight mb-4">
                3,400+ partners delivering ALE technology worldwide
              </h2>
              <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-lg">
                Our global network of certified business partners, consultants, and technology partners ensures expert deployment, support, and innovation in over 50 countries.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 h-10 px-5 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors"
                >
                  Explore Partnerships
                </Link>
                <Link
                  href="/partners/business-partners"
                  className="inline-flex items-center gap-2 h-10 px-5 border border-ale-200 text-ale text-sm font-semibold rounded-full hover:bg-ale-50 transition-colors"
                >
                  Become a Partner
                </Link>
              </div>
            </FadeIn>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                { value: "3,400+", label: "Certified Partners", desc: "Across all programs" },
                { value: "50+", label: "Countries", desc: "Global presence" },
                { value: "100+", label: "Certifications", desc: "Available programs" },
                { value: "24/7", label: "Partner Portal", desc: "Resources & support" },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={i * 100}>
                  <div className="p-5 bg-white rounded-xl border border-light-200 text-center">
                    <div className="text-xl font-extrabold text-ale">{s.value}</div>
                    <div className="text-sm font-semibold text-text mt-1">{s.label}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">{s.desc}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 10. FINAL CTA ━━━ */}
      <section className="py-20 bg-gradient-to-br from-ale-800 via-ale-700 to-ale relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-ale-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[15%] w-48 h-48 bg-ale-400 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to transform your enterprise?
            </h2>
            <p className="text-base text-white/75 max-w-lg mx-auto mb-8 leading-relaxed">
              Discover how ALE&apos;s intelligent networks, cloud communications, and AI-driven operations can accelerate your digital transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/company/contact"
                className="inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30"
              >
                Contact Sales
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 h-12 px-7 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                Explore the Platform
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 h-12 px-7 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                Browse Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
