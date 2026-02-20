import Link from "next/link";
import { IconHandshake, IconWrench, IconClipboard, IconCode } from "@/components/primitives/Icons";

const tracks = [
  { Icon: IconHandshake, title: "Business Partners", desc: "Resell, deploy, and support ALE solutions", stat: "3,400+" },
  { Icon: IconWrench, title: "Technology Partners", desc: "Build integrations and joint solutions", stat: "200+" },
  { Icon: IconClipboard, title: "Consultants", desc: "Design enterprise projects with ALE expertise", stat: "50+" },
  { Icon: IconCode, title: "Developers", desc: "Build on Rainbow APIs and extend the platform", stat: "100+" },
];

export function PartnerGrowth() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-ale mb-3 block">Partner Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight mb-5">
              Grow with ALE
            </h2>
            <p className="text-lg text-text-secondary font-light leading-relaxed mb-8 max-w-md">
              Join 3,400+ partners in 50+ countries. Industry-leading technology,
              enablement, and support to accelerate your business.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/partners/become-a-partner" className="inline-flex items-center h-11 px-6 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors">
                Become a Partner
              </Link>
              <Link href="/partners/find-a-partner" className="inline-flex items-center h-11 px-6 border border-light-300 text-text text-sm font-semibold rounded-full hover:border-ale hover:text-ale transition-colors">
                Find a Partner
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {tracks.map((t) => (
              <div key={t.title} className="bg-light-50 border border-light-200 rounded-xl p-5 hover:border-ale-200 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-ale-50 flex items-center justify-center group-hover:bg-ale group-hover:text-white transition-colors">
                    <t.Icon className="w-4 h-4 text-ale group-hover:text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-ale">{t.stat}</span>
                </div>
                <h3 className="text-sm font-bold text-text mb-1 group-hover:text-ale transition-colors">{t.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
