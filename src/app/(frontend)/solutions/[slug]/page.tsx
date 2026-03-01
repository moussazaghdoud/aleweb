import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSolutionsData, getIndustriesData, getCatalogProducts } from "@/lib/cms";
import { DownloadCenter, type DownloadItem } from "@/components/shared/DownloadCenter";
import { FadeIn } from "@/components/shared/FadeIn";
import downloadsIndex from "@/data/downloads-index.json";
import {
  IconChat, IconShield, IconAI, IconCloud, IconGlobe, IconSignal,
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconTransportation, IconEnergy, IconManufacturing, IconSmartBuildings,
} from "@/components/primitives/Icons";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { solutionVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { caseStudiesData } from "@/data/case-studies";
import { solutionCustomers } from "@/data/solution-customers";
import { blogData } from "@/data/blog";
import { solutionBlogCategories } from "@/data/blog-mappings";

/* ── Umbrella solutions → child sub-solutions mapping ── */
const umbrellaSolutions: Record<string, { label: string; slug: string }[]> = {
  "digital-age-communications": [
    { label: "Unified Communications", slug: "unified-communications" },
    { label: "Collaboration Solutions", slug: "collaboration-solutions" },
    { label: "Cloud Communications", slug: "move-to-cloud" },
    { label: "CPaaS", slug: "cpaas" },
    { label: "Hybrid Workplace", slug: "enable-hybrid-work" },
    { label: "Customer Service Apps", slug: "e-services" },
  ],
  "digital-age-networking": [
    { label: "SD-WAN & SASE", slug: "sd-wan-sase" },
    { label: "Network Security", slug: "network-security" },
    { label: "Data Center Networking", slug: "data-center-networking" },
    { label: "Shortest Path Bridging", slug: "shortest-path-bridging" },
    { label: "Enterprise Wi-Fi", slug: "wifi-solutions" },
    { label: "Hybrid POL", slug: "hybrid-pol" },
    { label: "OmniFabric", slug: "omnifabric" },
    { label: "Optical Networking", slug: "optical-solutions" },
    { label: "AI Operations", slug: "optimize-with-ai" },
  ],
  "mission-critical-networks": [
    { label: "Industrial Networks", slug: "industrial-networks" },
    { label: "Private 5G", slug: "private-5g-solution" },
    { label: "Video Surveillance", slug: "video-surveillance-networking" },
    { label: "IoT Networks", slug: "iot-networks" },
    { label: "Asset Tracking", slug: "connect-everything" },
  ],
};

/* ── Illustration images from ALE CDN ── */
const cdn = "https://web-assets.al-enterprise.com/-/media/assets/internet/images";
const solutionImages: Record<string, string> = {
  "modernize-communications": `${cdn}/solutions-dac-focus-topic-810x380.jpg`,
  "secure-your-network": `${cdn}/solutions-security-focus-topic-1-810x340.jpeg`,
  "optimize-with-ai": `${cdn}/solutions-automomous-network-focus-topic-1-810x380.jpg`,
  "move-to-cloud": `${cdn}/converged-everthing-aas-solution-810x340-banner.jpg`,
  "enable-hybrid-work": `${cdn}/hybrid-digital-workplace-v1.jpg`,
  "connect-everything": `${cdn}/iot-focus-topic-v2.jpg`,
  "business-continuity": `${cdn}/solutions-business-continuity-homepage-header-l2-l3-1440x600.jpg`,
  "sd-wan-sase": `${cdn}/solutions-sd-wan-focus-topic-1-810x340.jpeg`,
  "cpaas": `${cdn}/solutions-cpaas-focus-topic-1-v2-810x380.jpg`,
  "unified-communications": `${cdn}/solutions-unified-communications-focus-topic-1-810x380.jpg`,
  "iot-networks": `${cdn}/ale-web-refresh-trends-iot-topic1-image.jpg`,
  "digital-age-communications": `${cdn}/dac-pillars-web-visual-en-810x380.png`,
  "digital-age-networking": `${cdn}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`,
  "network-security": `${cdn}/solutions-security-focus-topic-1-810x340.jpeg`,
  "autonomous-network": `${cdn}/solutions-automomous-network-focus-topic-1-810x380.jpg`,
  "data-center-networking": `${cdn}/solutions-data-center-focus-topic-1-810x340.jpg`,
  "industrial-networks": `${cdn}/industrial-networks-header-image-v1.jpg`,
  "video-surveillance-networking": `${cdn}/network-video-surveillance-focus-topic-web.jpg`,
  "purple-on-demand": `${cdn}/converged-everthing-aas-solution-810x340-banner.jpg`,
  "network-as-a-service": `${cdn}/solutions-naas-focus-topic-1-810x380.jpg`,
  "cloud-communications": `${cdn}/solutions-dac-focus-topic-810x380.jpg`,
  "collaboration-solutions": `${cdn}/solutions-unified-communications-focus-topic-1-810x380.jpg`,
  "communications-security": `${cdn}/solutions-security-focus-topic-1-810x340.jpeg`,
  "private-5g-solution": `${cdn}/industrial-networks-header-image-v1.jpg`,
  "e-services": `${cdn}/solutions-dac-focus-topic-810x380.jpg`,
  "wifi-solutions": `${cdn}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`,
  "mission-critical-networks": `${cdn}/solutions-business-continuity-homepage-header-l2-l3-1440x600.jpg`,
  "shortest-path-bridging": `${cdn}/solutions-automomous-network-focus-topic-1-810x380.jpg`,
  "hybrid-pol": `${cdn}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`,
  "omnifabric": `${cdn}/solutions-security-focus-topic-1-810x340.jpeg`,
  "optical-solutions": `${cdn}/solutions-data-center-focus-topic-1-810x340.jpg`,
  "digital-dividends": `${cdn}/converged-everthing-aas-solution-810x340-banner.jpg`,
  "business-innovation": `${cdn}/solutions-dac-focus-topic-810x380.jpg`,
  "distributed-wifi": `${cdn}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`,
};

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
  "cloud-communications": IconCloud,
  "collaboration-solutions": IconChat,
  "communications-security": IconShield,
  "private-5g-solution": IconSignal,
  "e-services": IconChat,
  "wifi-solutions": IconSignal,
  "mission-critical-networks": IconShield,
  "shortest-path-bridging": IconSignal,
  "hybrid-pol": IconSignal,
  "omnifabric": IconShield,
  "optical-solutions": IconSignal,
  "digital-dividends": IconAI,
  "business-innovation": IconGlobe,
  "distributed-wifi": IconSignal,
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
    alternates: {
      canonical: `/solutions/${slug}`,
      languages: { "en": `/solutions/${slug}`, "fr": `/fr/solutions/${slug}`, "x-default": `/solutions/${slug}` },
    },
    openGraph: {
      title: `${solution.name} | Alcatel-Lucent Enterprise`,
      description: solution.tagline,
    },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solutionsData = await getSolutionsData();
  const industriesData = await getIndustriesData();
  const catalogProducts = await getCatalogProducts();
  const solution = solutionsData.find((s) => s.slug === slug);
  if (!solution) notFound();

  const Icon = solutionIconMap[solution.slug] || IconChat;
  const subSolutions = umbrellaSolutions[slug] || [];
  const relevantIndustries = industriesData.filter((ind) =>
    solution.industries.includes(ind.slug)
  );

  const currentIdx = solutionsData.findIndex((s) => s.slug === slug);
  const prev = currentIdx > 0 ? solutionsData[currentIdx - 1] : null;
  const next = currentIdx < solutionsData.length - 1 ? solutionsData[currentIdx + 1] : null;

  // Match solution product names to catalog entries for linking
  const matchedProducts = solution.products.map((productName) => {
    const match = catalogProducts.find(
      (p) =>
        p.name.toLowerCase() === productName.toLowerCase() ||
        p.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(p.name.split(" ")[0].toLowerCase())
    );
    return { name: productName, match };
  });

  // Downloads for this solution — alias map for renamed slugs
  const solutionSlugAliases: Record<string, string[]> = {
    "sd-wan-sase": ["sd-wan"],
    "data-center-networking": ["data-center"],
    "video-surveillance-networking": ["video-surveillance"],
    "iot-networks": ["iot"],
    "cpaas": ["communications-platform-as-a-service-cpaas"],
    "network-security": ["security"],
    "enable-hybrid-work": ["hybrid-workplace"],
    "move-to-cloud": ["everything-as-a-service-xaas"],
    "connect-everything": ["connected-solutions-and-devices"],
    "private-5g-solution": ["private-5g-network"],
    "modernize-communications": ["unified-communications", "collaboration-solutions", "cloud-communications"],
    "secure-your-network": [],
    "optimize-with-ai": ["autonomous-network"],
    "communications-security": ["security"],
    "distributed-wifi": ["distributed-wi-fi-control-architecture"],
  };
  const slugsToSearch = [slug, ...(solutionSlugAliases[slug] || [])];
  const downloads: DownloadItem[] = (downloadsIndex as any[])
    .filter((d: any) => slugsToSearch.some(s =>
      d.pageUrl === `/en/solutions/${s}` ||
      d.pageUrl.endsWith(`/en/solutions/${s}`) ||
      d.pageUrl.endsWith(`/${s}`)
    ))
    .map((d: any) => ({
      fileUrl: d.fileUrl,
      fileName: d.fileName,
      anchorText: d.anchorText,
      documentType: d.documentType,
    }));

  // Customer references for this solution
  const customerSlugs = solutionCustomers[slug] || [];
  const customerRefs = customerSlugs
    .map((cs) => caseStudiesData.find((c) => c.slug === cs))
    .filter(Boolean);

  // Related blog posts for this solution
  const blogCategories = solutionBlogCategories[slug] || [];
  const relatedPosts = blogData
    .filter((post) => blogCategories.includes(post.category))
    .slice(0, 3);

  return (
    <>
      <AdminEditButton collection="solutions" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={solutionVideos[slug] || "https://assets.mixkit.co/videos/914/914-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/25 to-transparent" />
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
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {solution.name}
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl font-light">{solution.tagline}</p>
        </div>
      </section>

      <Breadcrumbs items={[
        { label: "Solutions", href: "/solutions" },
        { label: solution.name, href: `/solutions/${solution.slug}` },
      ]} />

      {/* Benefits strip */}
      <section className="py-10 bg-ale">
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

      {/* Description + Illustration + Sub-solutions */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {/* Left: description + sub-solution links */}
            <div className="lg:w-1/2 flex flex-col gap-10">
              <FadeIn>
                <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-5">
                  {solution.name}
                </div>
                <p className="text-xl text-text leading-relaxed font-light">{solution.description}</p>
              </FadeIn>

              {subSolutions.length > 0 && (
                <FadeIn delay={100}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                    Explore
                  </h3>
                  <div className="space-y-2">
                    {subSolutions.map((sp) => (
                      <Link
                        key={sp.slug}
                        href={`/solutions/${sp.slug}`}
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
            {solutionImages[slug] && (
              <FadeIn variant="scale-in" delay={150} className="lg:w-1/2 lg:sticky lg:top-24">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={solutionImages[slug]}
                      alt={solution.name}
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

      {/* Capabilities */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Key capabilities
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {solution.capabilities.map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-blue-300">{String(i + 1).padStart(2, "0")}</span>
                  <div className="h-5 w-px bg-blue-200 rounded-full" />
                  <h3 className="text-base font-bold text-blue-900">{cap.title}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{cap.description}</p>
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

      {/* Customer References */}
      {customerRefs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Customer success stories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {customerRefs.map((cs) => (
                <Link
                  key={cs!.slug}
                  href={`/customers/${cs!.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-light-200 bg-white hover:border-ale-200 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-ale-50 flex items-center justify-center shrink-0">
                    <span className="text-ale font-bold text-xs">
                      {cs!.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors truncate">
                      {cs!.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">{cs!.industry}</p>
                  </div>
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
            Ready to {solution.name.toLowerCase().replace("modernize", "modernize your").replace("secure", "secure").replace("optimize", "optimize").replace("move", "move").replace("enable", "enable").replace("connect", "connect")}?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
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
