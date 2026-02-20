import Link from "next/link";
import Image from "next/image";
import { solutionsData } from "@/data/solutions";
import {
  IconChat, IconShield, IconAI, IconCloud, IconGlobe, IconSignal,
} from "@/components/primitives/Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "modernize-communications": IconChat,
  "secure-your-network": IconShield,
  "optimize-with-ai": IconAI,
  "move-to-cloud": IconCloud,
  "enable-hybrid-work": IconGlobe,
  "connect-everything": IconSignal,
};

export const metadata = {
  title: "Solutions",
  description: "ALE enterprise solutions: cloud communications, secure networking, AI operations, hybrid work, IoT connectivity, and everything as a service.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-ale-deep via-ale-900 to-ale-dark">
        <div className="mx-auto max-w-[1320px] px-6">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Enterprise technology that drives results
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            From modernizing communications to securing your network — outcome-driven solutions for every digital transformation goal.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionsData.map((solution) => {
              const Icon = iconMap[solution.slug] || IconChat;
              return (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group relative rounded-2xl overflow-hidden min-h-[380px] flex flex-col justify-end"
                >
                  <Image
                    src={solution.heroImage}
                    alt={solution.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-lg font-bold text-white">{solution.name}</h2>
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-4">
                      {solution.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {solution.products.slice(0, 3).map((product) => (
                        <span
                          key={product}
                          className="text-[11px] font-medium text-white/50 bg-white/10 rounded-full px-2.5 py-0.5"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ale-200 group-hover:text-white transition-colors">
                      Learn more
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
