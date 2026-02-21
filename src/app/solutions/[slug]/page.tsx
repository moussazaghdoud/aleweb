import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSolutionsData, getIndustriesData } from "@/lib/cms";
import {
  IconChat, IconShield, IconAI, IconCloud, IconGlobe, IconSignal,
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
} from "@/components/primitives/Icons";

const solutionIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "modernize-communications": IconChat,
  "secure-your-network": IconShield,
  "optimize-with-ai": IconAI,
  "move-to-cloud": IconCloud,
  "enable-hybrid-work": IconGlobe,
  "connect-everything": IconSignal,
  "business-continuity": IconShield,
  "sd-wan-sase": IconSignal,
  "cpaas": IconChat,
  "unified-communications": IconChat,
  "iot-networks": IconSignal,
  "network-as-a-service": IconCloud,
  "digital-age-communications": IconChat,
  "digital-age-networking": IconSignal,
  "network-security": IconShield,
  "autonomous-network": IconAI,
  "data-center-networking": IconSignal,
  "industrial-networks": IconShield,
  "video-surveillance-networking": IconGlobe,
  "purple-on-demand": IconCloud,
};

const industryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  healthcare: IconHealthcare,
  education: IconEducation,
  hospitality: IconHospitality,
  government: IconGovernment,
  transportation: IconTransportation,
  energy: IconEnergy,
  manufacturing: IconManufacturing,
  "smart-buildings": IconSmartBuildings,
};

export async function generateStaticParams() {
  const solutionsData = await getSolutionsData();
  return solutionsData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solutionsData = await getSolutionsData();
  const solution = solutionsData.find((s) => s.slug === slug);
  if (!solution) return { title: "Solution Not Found" };
  return {
    title: `${solution.name} | Solutions`,
    description: solution.tagline,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solutionsData = await getSolutionsData();
  const industriesData = await getIndustriesData();
  const solution = solutionsData.find((s) => s.slug === slug);
  if (!solution) notFound();

  const Icon = solutionIconMap[solution.slug] || IconChat;
  const relevantIndustries = industriesData.filter((ind) =>
    solution.industries.includes(ind.slug)
  );

  const currentIdx = solutionsData.findIndex((s) => s.slug === slug);
  const prev = currentIdx > 0 ? solutionsData[currentIdx - 1] : null;
  const next = currentIdx < solutionsData.length - 1 ? solutionsData[currentIdx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <Image
          src={solution.heroImage}
          alt={solution.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Solutions
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {solution.name}
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl font-light">{solution.tagline}</p>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-10 bg-ale-deep">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-3 gap-6">
            {solution.benefits.map((b, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-white">{b.stat}</div>
                <div className="text-xs text-white/50 mt-1">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl">
            <p className="text-lg text-text-secondary leading-relaxed">{solution.description}</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
            Key capabilities
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {solution.capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-light-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center shrink-0">
                    <span className="text-ale font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text mb-2">{cap.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
            Featured products
          </h2>
          <div className="flex flex-wrap gap-3">
            {solution.products.map((product) => (
              <span
                key={product}
                className="inline-flex items-center h-10 px-5 bg-white border border-light-200 rounded-full text-sm font-semibold text-text hover:border-ale-200 hover:text-ale transition-colors cursor-pointer"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant industries */}
      {relevantIndustries.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
              Industries we serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relevantIndustries.slice(0, 8).map((ind) => {
                const IndIcon = industryIconMap[ind.slug] || IconManufacturing;
                return (
                  <Link
                    key={ind.slug}
                    href={`/industries/${ind.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-light-200 hover:border-ale-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-light-100 flex items-center justify-center group-hover:bg-ale transition-colors shrink-0">
                      <IndIcon className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-text group-hover:text-ale transition-colors">
                      {ind.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-ale-deep">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to {solution.name.toLowerCase().replace("modernize", "modernize your").replace("secure", "secure").replace("optimize", "optimize").replace("move", "move").replace("enable", "enable").replace("connect", "connect")}?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Talk to our experts about the right solution for your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Contact Sales
            </Link>
            <Link
              href="/customers/case-studies"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="py-8 bg-white border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/solutions/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {prev.name}
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/solutions/${next.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
            >
              {next.name}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  );
}
