import Link from "next/link";
import Image from "next/image";
import { getIndustriesData } from "@/lib/cms";
import {
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
} from "@/components/primitives/Icons";

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
  title: "Industries",
  description: "ALE delivers tailored enterprise technology solutions across healthcare, education, hospitality, government, transportation, energy, manufacturing, and smart buildings.",
};

export default async function IndustriesPage() {
  const industriesData = await getIndustriesData();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image src="https://web-assets.al-enterprise.com/-/media/assets/internet/images/man-holding-a-tablet-image-1440x600.jpg?h=600&w=1440" alt="Industries" fill className="object-cover animate-ken-burns" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Industries
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Technology built for your industry
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Decades of expertise across critical sectors — tailored solutions that understand your workflows, compliance, and growth challenges.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {industriesData.map((industry) => {
              const Icon = iconMap[industry.slug] || IconManufacturing;
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-end"
                >
                  <Image
                    src={industry.heroImage}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-lg font-bold text-white">{industry.name}</h2>
                    </div>
                    <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
                      {industry.tagline}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ale-200 group-hover:text-white transition-colors">
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
