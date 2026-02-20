import Link from "next/link";
import Image from "next/image";
import { IconAI, IconCloud, IconSignal } from "@/components/primitives/Icons";

const pillars = [
  { label: "AI & Automation", detail: "AI Ops for predictive network management", Icon: IconAI },
  { label: "Cloud-Native Platform", detail: "Rainbow UCaaS — scale without limits", Icon: IconCloud },
  { label: "Private 5G", detail: "Dedicated wireless for mission-critical ops", Icon: IconSignal },
];

export function InnovationSignal() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ale-deep/95 via-ale-900/90 to-ale-dark/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">Innovation</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Built for<br />what&apos;s next
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-8 max-w-md">
              From cloud-native communications to AI-driven network intelligence
              and private 5G — the enterprise infrastructure of tomorrow.
            </p>
            <Link href="/company/innovation" className="inline-flex items-center gap-2 h-12 px-7 bg-white text-ale-deep text-sm font-semibold rounded-full hover:bg-ale-50 transition-all">
              Our technology vision
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-4">
            {pillars.map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/15 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <item.Icon className="w-5 h-5 text-ale-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-white/50">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
