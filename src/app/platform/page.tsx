import Link from "next/link";
import Image from "next/image";
import { platformData } from "@/data/platform";
import {
  IconChat, IconShield, IconAI, IconSignal, IconGlobe,
} from "@/components/primitives/Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rainbow: IconChat,
  omniswitch: IconShield,
  "stellar-wifi": IconSignal,
  "ai-ops": IconAI,
  "private-5g": IconSignal,
  "desk-phones": IconGlobe,
};

const categoryLabels: Record<string, string> = {
  communications: "Communications",
  networking: "Networking",
  management: "Management",
  connectivity: "Connectivity",
};

export const metadata = {
  title: "Platform",
  description: "The ALE technology platform: Rainbow communications, OmniSwitch networking, Stellar Wi-Fi, AI Ops, Private 5G, and enterprise phones.",
};

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-ale-deep via-ale-900 to-ale-dark">
        <div className="mx-auto max-w-[1320px] px-6">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Platform
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            One platform. Every connection.
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Cloud communications, autonomous networking, AI-driven intelligence, and secure connectivity — engineered to work together.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          {/* Featured — Rainbow + OmniSwitch in large cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {platformData.slice(0, 2).map((product) => {
              const Icon = iconMap[product.slug] || IconChat;
              return (
                <Link
                  key={product.slug}
                  href={`/platform/${product.slug}`}
                  className="group relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end"
                >
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative p-7">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ale-300 mb-2 block">
                      {categoryLabels[product.category]}
                    </span>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">{product.name}</h2>
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-3">
                      {product.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.highlights.slice(0, 3).map((h) => (
                        <span key={h.label} className="text-[11px] font-medium text-white/50 bg-white/10 rounded-full px-2.5 py-0.5">
                          {h.stat} {h.label}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ale-200 group-hover:text-white transition-colors">
                      Explore
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Rest — 4 cards in a row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {platformData.slice(2).map((product) => {
              const Icon = iconMap[product.slug] || IconChat;
              return (
                <Link
                  key={product.slug}
                  href={`/platform/${product.slug}`}
                  className="group relative rounded-2xl overflow-hidden min-h-[280px] flex flex-col justify-end"
                >
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ale-300 mb-1.5 block">
                      {categoryLabels[product.category]}
                    </span>
                    <h2 className="text-base font-bold text-white mb-1">{product.name}</h2>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                      {product.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ale-200 group-hover:text-white transition-colors">
                      Explore
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
