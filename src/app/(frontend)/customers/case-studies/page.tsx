import Link from "next/link";
import { getIndustriesData } from "@/lib/cms";
import {
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
} from "@/components/primitives/Icons";
import { landingVideos } from "@/data/hero-videos";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  healthcare: IconHealthcare,
  education: IconEducation,
  hospitality: IconHospitality,
  government: IconGovernment,
  transportation: IconTransportation,
  energy: IconEnergy,
  manufacturing: IconManufacturing,
  "smart-buildings": IconSmartBuildings,
};

export const metadata = {
  title: "Customer Stories",
  description: "See how organizations worldwide use ALE enterprise technology to transform their operations.",
};

export default async function CaseStudiesPage() {
  const industriesData = await getIndustriesData();

  // Aggregate all customers from industries data
  const allCustomers = industriesData.flatMap((ind) =>
    ind.customers.map((c) => ({ ...c, industry: ind.name, industrySlug: ind.slug }))
  );
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
            Organizations across industries trust ALE to deliver enterprise technology that transforms their operations.
          </p>
        </div>
      </section>

      {/* Customer grid by industry */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          {industriesData.filter((ind) => ind.customers.length > 0).map((ind) => {
            const Icon = iconMap[ind.slug] || IconManufacturing;
            return (
              <div key={ind.slug} className="mb-14 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-ale-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-ale" />
                  </div>
                  <h2 className="text-lg font-extrabold text-text tracking-tight">{ind.name}</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ind.customers.map((cust) => (
                    <div
                      key={cust.name}
                      className="p-5 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-ale-50 flex items-center justify-center shrink-0">
                          <span className="text-ale font-bold text-xs">
                            {cust.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-text">{cust.name}</h3>
                          <p className="text-xs text-text-muted">{cust.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to become our next success story?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Talk to our team about how ALE can help transform your organization.
          </p>
          <Link
            href="/company/contact"
            className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
