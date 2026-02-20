import Link from "next/link";
import Image from "next/image";
import { solutionPathways } from "@/data/homepage";
import { IconChat, IconShield, IconAI, IconCloud, IconGlobe, IconSignal } from "@/components/primitives/Icons";

const solutionImages: Record<string, string> = {
  "Modernize Communications": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
  "Secure Your Network": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  "Optimize with AI": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  "Move to Cloud": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  "Enable Hybrid Work": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  "Connect Everything": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  chat: IconChat,
  shield: IconShield,
  ai: IconAI,
  cloud: IconCloud,
  globe: IconGlobe,
  signal: IconSignal,
};

export function SolutionPathways() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-ale mb-3 block">Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
              What do you need to achieve?
            </h2>
          </div>
          <Link href="/solutions" className="text-sm font-semibold text-ale hover:text-ale-dark transition-colors inline-flex items-center gap-1">
            All solutions
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutionPathways.map((p) => {
            const Icon = iconMap[p.icon];
            return (
              <Link key={p.title} href={p.href} className="group relative rounded-2xl overflow-hidden min-h-[300px] flex flex-col justify-end">
                <Image src={solutionImages[p.title]} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-all" />
                <div className="relative p-6">
                  <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-2">{p.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale-300 group-hover:text-white transition-colors">
                    Discover
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
  );
}
