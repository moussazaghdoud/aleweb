import Link from "next/link";
import Image from "next/image";
import { IconChat, IconShield, IconAI, IconCloud, IconSignal } from "@/components/primitives/Icons";

const platforms = [
  {
    name: "Rainbow",
    category: "Cloud Communications",
    description: "Unified communications, messaging, and video — cloud-native, scalable, secure.",
    href: "/platform/rainbow",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    Icon: IconChat,
  },
  {
    name: "OmniPCX Enterprise",
    category: "Communications Server",
    description: "Enterprise-grade telephony platform for large-scale voice, mobility, and unified communications.",
    href: "/platform/omnipcx",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    Icon: IconSignal,
  },
  {
    name: "OmniSwitch",
    category: "Network Fabric",
    description: "Enterprise switching from edge to data center with autonomous networking intelligence.",
    href: "/platform/omniswitch",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    Icon: IconShield,
  },
  {
    name: "IP Desktop Phones & Terminals",
    category: "Endpoints & Devices",
    description: "Desk phones, DECT handsets, conference devices, and headsets for every workspace.",
    href: "/platform/terminals",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80",
    Icon: IconCloud,
  },
  {
    name: "AI Ops",
    category: "Network Intelligence",
    description: "AI-driven analytics, predictive operations, and automated troubleshooting.",
    href: "/platform/ai-ops",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    Icon: IconAI,
  },
];

export function PlatformShowcase() {
  return (
    <section className="py-24 bg-light-50">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid lg:grid-cols-2 gap-6 mb-14 items-end">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-ale mb-3 block">Platform</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
              One platform.<br />Every connection.
            </h2>
          </div>
          <p className="text-text-secondary font-light leading-relaxed lg:text-right">
            Communications, networking, and intelligence — designed to work together.
            <br />
            <Link href="/platform" className="text-ale font-semibold hover:text-ale-dark transition-colors inline-flex items-center gap-1 mt-2">
              Platform overview
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </p>
        </div>

        {/* Top row: 2 large cards */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {platforms.slice(0, 2).map((p) => (
            <Link key={p.name} href={p.href} className="group bg-white rounded-2xl overflow-hidden border border-light-200 hover:border-ale-200 hover:shadow-lg transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-ale-50 flex items-center justify-center">
                    <p.Icon className="w-4 h-4 text-ale" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ale">{p.category}</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-ale transition-colors">{p.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{p.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row: 3 cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {platforms.slice(2).map((p) => (
            <Link key={p.name} href={p.href} className="group bg-white rounded-2xl overflow-hidden border border-light-200 hover:border-ale-200 hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-ale-50 flex items-center justify-center">
                    <p.Icon className="w-3.5 h-3.5 text-ale" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ale">{p.category}</span>
                </div>
                <h3 className="text-base font-bold text-text mb-1.5 group-hover:text-ale transition-colors">{p.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-3">{p.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-ale">
                  Learn more
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
