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
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { industryVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { blogData } from "@/data/blog";
import { industryBlogCategories } from "@/data/blog-mappings";

/* ── Illustration images — high-quality Unsplash (free license) ── */
const industryImages: Record<string, string> = {
  healthcare: "https://images.unsplash.com/photo-1584451049700-ec9b394f3805?w=1200&q=80&fit=crop",
  education: "https://plus.unsplash.com/premium_photo-1764691435961-ecb3a0a5d311?w=1200&q=80&fit=crop",
  hospitality: "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?w=1200&q=80&fit=crop",
  government: "https://images.unsplash.com/photo-1761002066333-1cc80a4471c3?w=1200&q=80&fit=crop",
  transportation: "https://images.unsplash.com/photo-1769662457308-12b10fec55af?w=1200&q=80&fit=crop",
  energy: "https://images.unsplash.com/photo-1762381157076-4872b31961e0?w=1200&q=80&fit=crop",
  manufacturing: "https://plus.unsplash.com/premium_photo-1681822941472-1e4c1a310046?w=1200&q=80&fit=crop",
  "smart-buildings": "https://images.unsplash.com/photo-1760246964044-1384f71665b9?w=1200&q=80&fit=crop",
  smb: "https://plus.unsplash.com/premium_photo-1661301063537-a5170c871aec?w=1200&q=80&fit=crop",
};

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
    alternates: {
      canonical: `/industries/${slug}`,
      languages: { "en": `/industries/${slug}`, "fr": `/fr/industries/${slug}`, "x-default": `/industries/${slug}` },
    },
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
  const industrySlugAliases: Record<string, string[]> = {
    energy: ["energy-and-utilities"],
  };
  const slugsToSearch = [slug, ...(industrySlugAliases[slug] || [])];
  const downloads: DownloadItem[] = (downloadsIndex as any[])
    .filter((d: any) =>
      slugsToSearch.some(
        (s) =>
          d.pageUrl === `/en/industries/${s}` ||
          d.pageUrl.endsWith(`/en/industries/${s}`)
      )
    )
    .map((d: any) => ({
      fileUrl: d.fileUrl,
      fileName: d.fileName,
      anchorText: d.anchorText,
      documentType: d.documentType,
    }));

  // Related blog posts for this industry
  const blogCategories = industryBlogCategories[slug] || [];
  const relatedPosts = blogData
    .filter((post) => blogCategories.includes(post.category))
    .slice(0, 3);

  return (
    <>
      <AdminEditButton collection="industries" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={industryVideos[slug] || "https://assets.mixkit.co/videos/4547/4547-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/25 to-transparent" />
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
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {industry.name}
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-xl font-light">{industry.tagline}</p>
        </div>
      </section>

      <Breadcrumbs items={[
        { label: "Industries", href: "/industries" },
        { label: industry.name, href: `/industries/${industry.slug}` },
      ]} />

      {/* Description + Illustration + Sub-pages */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative dot grid */}
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {/* Left: description + sub-pages */}
            <div className="lg:w-1/2 flex flex-col gap-10">
              <FadeIn>
                <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-5">
                  {industry.name} Solutions
                </div>
                <p className="text-xl text-text leading-relaxed font-light">{industry.description}</p>
              </FadeIn>

              {industry.subPages && industry.subPages.length > 0 && (
                <FadeIn delay={100}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                    Explore
                  </h3>
                  <div className="space-y-2">
                    {industry.subPages.map((sp) => (
                      <Link
                        key={sp.slug}
                        href={`/industries/${industry.slug}/${sp.slug}`}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-light-200 hover:border-ale-200 hover:bg-ale-50/50 transition-all group"
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
                </FadeIn>
              )}
            </div>

            {/* Right: illustration image */}
            {industryImages[slug] && (
              <FadeIn variant="scale-in" delay={150} className="lg:w-1/2 lg:sticky lg:top-24">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={industryImages[slug]}
                      alt={industry.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 660px"
                    />
                  </div>
                </div>
              </FadeIn>
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
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-blue-300">{String(i + 1).padStart(2, "0")}</span>
                  <div className="h-5 w-px bg-blue-200 rounded-full" />
                  <h3 className="text-base font-bold text-blue-900">{sol.title}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{sol.description}</p>
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
              {industry.customers.map((cust, i) => {
                const inner = (
                  <>
                    <div className="w-10 h-10 rounded-full bg-ale-50 flex items-center justify-center shrink-0">
                      <span className="text-ale font-bold text-xs">
                        {cust.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{cust.name}</h3>
                      <p className="text-xs text-text-muted mt-0.5">{cust.detail}</p>
                    </div>
                  </>
                );
                return cust.slug ? (
                  <Link
                    key={i}
                    href={`/customers/${cust.slug}`}
                    className="group flex items-center gap-4 p-5 rounded-xl border border-light-200 bg-white hover:border-ale-200 hover:shadow-sm transition-all"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-xl border border-light-200"
                  >
                    {inner}
                  </div>
                );
              })}
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

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-extrabold text-text tracking-tight">
                Related articles
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
              >
                View all articles
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-light-200 overflow-hidden hover:border-ale-200 hover:shadow-md transition-all"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-ale bg-ale-50 rounded-full px-2.5 py-0.5">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to transform your {industry.name.toLowerCase()} operations?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
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
