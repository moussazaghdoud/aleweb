import Link from "next/link";
import { IconChat, IconShield, IconAI, IconCloud, IconGlobe, IconSignal } from "@/components/primitives/Icons";
import {
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconManufacturing, IconEnergy,
} from "@/components/primitives/Icons";

const pillars = [
  { Icon: IconChat, title: "Communications", desc: "Rainbow, OmniPCX, UCaaS", href: "/solutions/modernize-communications" },
  { Icon: IconShield, title: "Networking", desc: "OmniSwitch, Wi-Fi, SD-WAN", href: "/solutions/secure-your-network" },
  { Icon: IconAI, title: "AI & Automation", desc: "AI Ops, IoT, Analytics", href: "/solutions/optimize-with-ai" },
  { Icon: IconCloud, title: "Cloud & XaaS", desc: "Migration, hybrid, as-a-service", href: "/solutions/move-to-cloud" },
  { Icon: IconSignal, title: "Private 5G & IoT", desc: "Connectivity for critical ops", href: "/solutions/connect-everything" },
  { Icon: IconGlobe, title: "Hybrid Work", desc: "Collaboration from anywhere", href: "/solutions/enable-hybrid-work" },
];

const industries = [
  { Icon: IconHealthcare, label: "Healthcare", href: "/industries/healthcare" },
  { Icon: IconEducation, label: "Education", href: "/industries/education" },
  { Icon: IconHospitality, label: "Hospitality", href: "/industries/hospitality" },
  { Icon: IconGovernment, label: "Government", href: "/industries/government" },
  { Icon: IconManufacturing, label: "Manufacturing", href: "/industries/manufacturing" },
  { Icon: IconEnergy, label: "Energy", href: "/industries/energy" },
];

const stats = [
  { number: "1M+", label: "users" },
  { number: "50+", label: "countries" },
  { number: "3,400+", label: "partners" },
];

export function QuickNav() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">

        {/* Solutions grid */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-text tracking-tight">Solutions</h2>
            <Link href="/solutions" className="text-sm font-semibold text-ale hover:text-ale-dark transition-colors inline-flex items-center gap-1">
              View all
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex items-start gap-4 p-5 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                  <p.Icon className="w-5 h-5 text-ale group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{p.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Industries strip */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-text tracking-tight">Industries</h2>
            <Link href="/industries" className="text-sm font-semibold text-ale hover:text-ale-dark transition-colors inline-flex items-center gap-1">
              View all
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.label}
                href={ind.href}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-xl hover:bg-ale-50 transition-colors text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-light-100 flex items-center justify-center group-hover:bg-ale transition-colors">
                  <ind.Icon className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-semibold text-text-secondary group-hover:text-ale transition-colors">{ind.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats + CTA compact row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-light-200">
          <div className="flex items-center gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-ale">{s.number}</div>
                <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/customers/case-studies" className="inline-flex items-center h-10 px-5 text-sm font-semibold text-ale border border-ale-200 rounded-full hover:bg-ale-50 transition-colors">
              Customer Stories
            </Link>
            <Link href="/partners" className="inline-flex items-center h-10 px-5 text-sm font-semibold text-ale border border-ale-200 rounded-full hover:bg-ale-50 transition-colors">
              Partners
            </Link>
            <Link href="/company/contact" className="inline-flex items-center h-10 px-5 text-sm font-semibold bg-ale text-white rounded-full hover:bg-ale-dark transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
