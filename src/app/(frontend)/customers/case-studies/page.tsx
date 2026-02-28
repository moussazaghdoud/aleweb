import Link from "next/link";
import {
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
} from "@/components/primitives/Icons";
import { landingVideos } from "@/data/hero-videos";
import { caseStudiesData } from "@/data/case-studies";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  healthcare: IconHealthcare,
  education: IconEducation,
  hospitality: IconHospitality,
  government: IconGovernment,
  transportation: IconTransportation,
  energy: IconEnergy,
  manufacturing: IconManufacturing,
  "smart-buildings": IconSmartBuildings,
  smb: IconSmartBuildings,
};

const industryOrder = [
  "healthcare", "education", "hospitality", "government",
  "transportation", "energy", "manufacturing", "smart-buildings", "smb",
];

const industryColors: Record<string, { bg: string; border: string; icon: string }> = {
  healthcare: { bg: "bg-red-50", border: "border-red-100", icon: "text-red-500" },
  education: { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-500" },
  hospitality: { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-500" },
  government: { bg: "bg-purple-50", border: "border-purple-100", icon: "text-purple-500" },
  transportation: { bg: "bg-cyan-50", border: "border-cyan-100", icon: "text-cyan-500" },
  energy: { bg: "bg-green-50", border: "border-green-100", icon: "text-green-500" },
  manufacturing: { bg: "bg-gray-100", border: "border-gray-200", icon: "text-gray-500" },
  "smart-buildings": { bg: "bg-indigo-50", border: "border-indigo-100", icon: "text-indigo-500" },
  smb: { bg: "bg-orange-50", border: "border-orange-100", icon: "text-orange-500" },
};

export const metadata = {
  title: "Customer Stories",
  description: "See how organizations worldwide use ALE enterprise technology to transform their operations.",
};

export default function CaseStudiesPage() {
  const grouped = new Map<string, typeof caseStudiesData>();
  for (const cs of caseStudiesData) {
    const key = cs.industrySlug;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(cs);
  }

  const sortedGroups = [...grouped.entries()].sort(
    ([a], [b]) => (industryOrder.indexOf(a) === -1 ? 99 : industryOrder.indexOf(a)) - (industryOrder.indexOf(b) === -1 ? 99 : industryOrder.indexOf(b))
  );

  const totalIndustries = sortedGroups.length;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.caseStudies} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Customers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Customer success stories
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            {caseStudiesData.length} organizations across industries trust ALE to deliver enterprise technology that transforms their operations.
          </p>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-ale/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/15 rounded-full blur-[80px]" />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: String(caseStudiesData.length), label: "customer stories" },
              { value: String(totalIndustries), label: "industries" },
              { value: String(new Set(caseStudiesData.map((c) => c.country)).size) + "+", label: "countries" },
              { value: "100%", label: "real outcomes" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xl font-extrabold text-white">{s.value}</div>
                <div className="text-[11px] text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer grid by industry */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-20 right-0 w-[200px] h-[200px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          {sortedGroups.map(([industrySlug, cases]) => {
            const Icon = iconMap[industrySlug] || IconManufacturing;
            const industryName = cases[0].industry;
            const colors = industryColors[industrySlug] || industryColors.manufacturing;
            return (
              <div key={industrySlug} className="mb-14 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${colors.icon}`} />
                  </div>
                  <h2 className="text-lg font-extrabold text-text tracking-tight">{industryName}</h2>
                  <span className={`text-xs font-semibold ${colors.icon} ${colors.bg} px-2 py-0.5 rounded-full`}>{cases.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cases.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/customers/${cs.slug}`}
                      className={`group p-5 rounded-2xl border ${colors.border} hover:shadow-md transition-all`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <span className={`${colors.icon} font-bold text-xs`}>
                            {cs.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{cs.name}</h3>
                          <p className="text-xs text-text-muted">{cs.country}</p>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-2">{cs.tagline}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-ale">
                        Read story
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dark gradient CTA */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-ale/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-500/15 rounded-full blur-[80px]" />
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to become our next success story?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8">
            Talk to our team about how ALE can help transform your organization.
          </p>
          <Link
            href="/company/contact"
            className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all shadow-lg shadow-ale/25"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
