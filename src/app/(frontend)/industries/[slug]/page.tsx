import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getIndustriesData, getSolutionsData, getCatalogProducts } from "@/lib/cms";
import { DownloadCenter, type DownloadItem } from "@/components/shared/DownloadCenter";
import { FadeIn } from "@/components/shared/FadeIn";
import downloadsIndex from "@/data/downloads-index.json";
import {
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
  IconSMB,
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
  smb: IconSMB,
};

// Generate static paths for all industries
export async function generateStaticParams() {
  const industriesData = await getIndustriesData();
  return industriesData.map((industry) => ({ slug: industry.slug }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industriesData = await getIndustriesData();
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.name} Solutions`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industriesData = await getIndustriesData();
  const solutionsData = await getSolutionsData();
  const catalogProducts = await getCatalogProducts();
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) notFound();

  const Icon = iconMap[industry.slug] || IconManufacturing;

  // Find prev/next industries for navigation
  const currentIdx = industriesData.findIndex((i) => i.slug === slug);
  const prev = currentIdx > 0 ? industriesData[currentIdx - 1] : null;
  const next = currentIdx < industriesData.length - 1 ? industriesData[currentIdx + 1] : null;

  // Solutions that target this industry
  const relatedSolutions = solutionsData.filter((s) =>
    s.industries.includes(industry.slug)
  );

  // Match industry product names to catalog entries for linking
  const matchedProducts = industry.products.map((productName) => {
    const match = catalogProducts.find(
      (p) =>
        p.name.toLowerCase() === productName.toLowerCase() ||
        p.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(p.name.split(" ")[0].toLowerCase())
    );
    return { name: productName, match };
  });

  // Downloads for this industry
  const pageUrlSuffix = `/en/industries/${slug}`;
  const downloads: DownloadItem[] = (downloadsIndex as any[])
    .filter((d: any) => d.pageUrl === pageUrlSuffix || d.pageUrl.endsWith(`/${slug}`))
    .map((d: any) => ({
      fileUrl: d.fileUrl,
      fileName: d.fileName,
      anchorText: d.anchorText,
      documentType: d.documentType,
    }));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <Image
          src={industry.heroImage}
          alt={industry.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Industries
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {industry.name}
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-xl font-light">{industry.tagline}</p>
        </div>
      </section>

      {/* Description + Sub-pages */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <FadeIn className="lg:col-span-2">
              <p className="text-lg text-text-secondary leading-relaxed">{industry.description}</p>
            </FadeIn>
            {industry.subPages && industry.subPages.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                  Explore
                </h3>
                <div className="space-y-2">
                  {industry.subPages.map((sp) => (
                    <Link
                      key={sp.slug}
                      href={`/industries/${industry.slug}/${sp.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-light-200 hover:border-ale-200 hover:bg-ale-50 transition-all group"
                    >
                      <span className="text-sm font-semibold text-text group-hover:text-ale transition-colors">
                        {sp.label}
                      </span>
                      <svg className="w-4 h-4 text-text-muted group-hover:text-ale transition-all group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
            Solutions for {industry.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {industry.solutions.map((sol, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-light-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center shrink-0">
                    <span className="text-ale font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text mb-2">{sol.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{sol.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customers */}
      {industry.customers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Trusted by leaders in {industry.name.toLowerCase()}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {industry.customers.map((cust, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-xl border border-light-200"
                >
                  <div className="w-10 h-10 rounded-full bg-ale-50 flex items-center justify-center shrink-0">
                    <span className="text-ale font-bold text-xs">
                      {cust.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">{cust.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{cust.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
            Featured products
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedProducts.map(({ name, match }) =>
              match ? (
                <Link
                  key={name}
                  href={`/products/${match.category}/${match.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-light-200 bg-white hover:border-ale-200 hover:shadow-md transition-all"
                >
                  {match.image && (
                    <div className="w-14 h-14 rounded-lg bg-light-50 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image src={match.image} alt={match.name} width={56} height={56} className="object-contain" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors truncate">
                      {match.name}
                    </h3>
                    <p className="text-xs text-text-muted truncate">{match.tagline}</p>
                  </div>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-ale shrink-0 ml-auto transition-all group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span
                  key={name}
                  className="flex items-center gap-4 p-4 rounded-xl border border-light-200 bg-white text-sm font-semibold text-text"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      {relatedSolutions.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
              Solutions for {industry.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedSolutions.map((sol) => (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="group p-5 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors mb-2">
                    {sol.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2">{sol.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Download Center */}
      <DownloadCenter downloads={downloads} />

      {/* CTA */}
      <section className="py-16 bg-ale-deep">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to transform your {industry.name.toLowerCase()} operations?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Talk to our {industry.name.toLowerCase()} experts about a solution tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Contact an Expert
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

      {/* Prev/Next navigation */}
      <section className="py-8 bg-white border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/industries/${prev.slug}`}
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
              href={`/industries/${next.slug}`}
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
