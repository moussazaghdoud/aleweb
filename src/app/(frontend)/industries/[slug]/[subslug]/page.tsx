import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getIndustriesData } from "@/lib/cms";
import { industrySubPagesData } from "@/data/industry-subpages";
import { industryVideos, industrySubPageVideos } from "@/data/hero-videos";
import { DownloadCenter, type DownloadItem } from "@/components/shared/DownloadCenter";
import downloadsIndex from "@/data/downloads-index.json";
import { blogData } from "@/data/blog";
import { industryBlogCategories } from "@/data/blog-mappings";

export function generateStaticParams() {
  return industrySubPagesData.map((sp) => ({
    slug: sp.parentSlug,
    subslug: sp.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  return params.then(({ slug, subslug }) => {
    const subPage = industrySubPagesData.find(
      (sp) => sp.parentSlug === slug && sp.slug === subslug
    );
    if (!subPage) return { title: "Not Found" };
    return {
      title: `${subPage.name} | Industries`,
      description: subPage.tagline,
      alternates: {
        canonical: `/industries/${slug}/${subslug}`,
        languages: { "en": `/industries/${slug}/${subslug}`, "fr": `/fr/industries/${slug}/${subslug}`, "x-default": `/industries/${slug}/${subslug}` },
      },
    };
  });
}

/* Capability icon SVGs — rotated by index */
const capIcons = [
  // Shield
  <svg key="shield" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  // Signal
  <svg key="signal" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12.75h.008v.008H12v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  // Cog
  <svg key="cog" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  // Bolt
  <svg key="bolt" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
];

const capColors = [
  { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
  { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
];

export default async function IndustrySubPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = await params;
  const industriesData = await getIndustriesData();
  const parent = industriesData.find((i) => i.slug === slug);
  const subPage = industrySubPagesData.find(
    (sp) => sp.parentSlug === slug && sp.slug === subslug
  );
  if (!parent || !subPage) notFound();

  const siblings = industrySubPagesData.filter((sp) => sp.parentSlug === slug);
  const currentIdx = siblings.findIndex((sp) => sp.slug === subslug);
  const prev = currentIdx > 0 ? siblings[currentIdx - 1] : null;
  const next = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

  // Downloads for this sub-page
  const subPageSlugAliases: Record<string, string[]> = {
    defense: ["defense-solutions"],
  };
  const subSlugs = [subslug, ...(subPageSlugAliases[subslug] || [])];
  const downloads: DownloadItem[] = (downloadsIndex as any[])
    .filter((d: any) =>
      subSlugs.some(
        (s) =>
          d.pageUrl.endsWith(`/en/industries/${slug}/${s}`) ||
          d.pageUrl.includes(`/en/industries/${slug}/${s}/`)
      )
    )
    .map((d: any) => ({
      fileUrl: d.fileUrl,
      fileName: d.fileName,
      anchorText: d.anchorText,
      documentType: d.documentType,
    }));

  // Related blog posts
  const blogCategories = industryBlogCategories[slug] || [];
  const relatedPosts = blogData
    .filter((post) => blogCategories.includes(post.category))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={industrySubPageVideos[`${slug}/${subslug}`] || industryVideos[slug] || "https://assets.mixkit.co/videos/4547/4547-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 mb-5">
            <Link href="/industries" className="hover:text-white transition-colors">
              Industries
            </Link>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/industries/${parent.slug}`} className="hover:text-white transition-colors">
              {parent.name}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            {subPage.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">{subPage.tagline}</p>
        </div>
      </section>

      {/* Description + Quick CTA */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative dot grid */}
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <div className="lg:w-2/3">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-5">
                {parent.name} Solutions
              </div>
              <p className="text-xl text-text leading-relaxed font-light">{subPage.description}</p>
            </div>
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-7 text-white shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-ale flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                </div>
                <h3 className="text-base font-bold mb-2">Ready to get started?</h3>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">Talk to our {parent.name.toLowerCase()} specialists about a tailored solution.</p>
                <Link
                  href="/company/contact"
                  className="inline-flex items-center gap-2 h-11 px-6 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors w-full justify-center"
                >
                  Contact Sales
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Content Blocks */}
      {subPage.contentBlocks && subPage.contentBlocks.length > 0 && (
        <>
          {subPage.contentBlocks.map((block, i) => (
            <section key={i} className={`py-20 relative overflow-hidden ${i % 2 === 0 ? "bg-light-50" : "bg-white"}`}>
              {/* Decorative accent */}
              {i === 0 && <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-ale via-ale/50 to-transparent" />}
              <div className="relative mx-auto max-w-[1320px] px-6">
                <div className={`flex flex-col ${block.image ? "lg:flex-row" : ""} gap-14 items-center`}>
                  {/* Text side */}
                  <div className={block.image ? "lg:w-1/2" : "max-w-3xl"}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-8 h-8 rounded-lg bg-ale flex items-center justify-center text-white text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-ale/20 to-transparent" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-5 leading-tight">
                      {block.heading}
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed mb-7">
                      {block.body}
                    </p>
                    {block.bullets && block.bullets.length > 0 && (
                      <ul className="space-y-3.5">
                        {block.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-3 group">
                            <div className="w-6 h-6 rounded-full bg-ale/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-ale/20 transition-colors">
                              <svg className="w-3.5 h-3.5 text-ale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-text-secondary leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Image side */}
                  {block.image ? (
                    <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:order-last" : "lg:order-first"}`}>
                      <div className="relative">
                        {/* Decorative frame */}
                        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-ale/10 via-transparent to-ale/5 -z-10" />
                        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                          <Image
                            src={block.image}
                            alt={block.imageAlt || block.heading}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Decorative illustration when no image */
                    !block.image && i === 1 && (
                      <div className="hidden lg:block lg:w-5/12">
                        <div className="relative aspect-square max-w-xs mx-auto">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ale/5 to-purple-500/5" />
                          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-ale/10 to-purple-500/10" />
                          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-ale/15 to-purple-500/15 flex items-center justify-center">
                            <svg className="w-16 h-16 text-ale/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {/* Stats Band */}
      {subPage.stats && subPage.stats.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 left-[20%] w-64 h-64 bg-ale/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-[20%] w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
          <div className="relative mx-auto max-w-[1320px] px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {subPage.stats.map((stat, i) => (
                <div key={stat.label} className="relative group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-xs text-white/50 leading-relaxed uppercase tracking-wider">{stat.label}</div>
                    {/* Accent line */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full ${i % 2 === 0 ? "bg-ale" : "bg-purple-400"} opacity-60`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-4">
              Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Purpose-built for {subPage.name.toLowerCase()}
            </h2>
            <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
              Enterprise-grade technology designed for your specific environment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {subPage.capabilities.map((cap, i) => {
              const color = capColors[i % capColors.length];
              return (
                <div key={i} className={`group rounded-2xl border ${color.border} bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className="p-7">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${color.light} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {capIcons[i % capIcons.length]}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-base font-bold text-text mb-0.5">{cap.title}</h3>
                        <div className={`w-8 h-0.5 rounded-full ${color.bg} opacity-40`} />
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {subPage.testimonial && (
        <section className="py-20 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">
              {/* Accent side bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-ale via-ale to-purple-500" />
              <div className="p-10 sm:p-14 pl-12 sm:pl-16">
                <svg className="w-12 h-12 text-ale/15 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <blockquote className="text-lg sm:text-xl font-medium text-text leading-relaxed mb-8 max-w-3xl">
                  &ldquo;{subPage.testimonial.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ale to-ale-dark flex items-center justify-center text-white font-bold text-sm">
                    {subPage.testimonial.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text">{subPage.testimonial.author}</div>
                    <div className="text-xs text-text-muted">{subPage.testimonial.role}</div>
                    <div className="text-xs text-ale font-semibold">{subPage.testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefit Cards */}
      {subPage.benefitCards && subPage.benefitCards.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold uppercase tracking-wider mb-4">
                Benefits
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Value for every stakeholder
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {subPage.benefitCards.map((card, ci) => (
                <div key={card.audience} className="rounded-2xl overflow-hidden shadow-lg">
                  {/* Header */}
                  <div className={`px-7 py-5 ${ci === 0 ? "bg-gradient-to-r from-ale to-ale-dark" : "bg-gradient-to-r from-gray-800 to-gray-900"}`}>
                    <h3 className="text-lg font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                        {ci === 0 ? (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
                        )}
                      </div>
                      {card.audience}
                    </h3>
                  </div>
                  {/* Benefits */}
                  <div className="bg-white p-7">
                    <ul className="space-y-4">
                      {card.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full ${ci === 0 ? "bg-ale/10" : "bg-gray-100"} flex items-center justify-center shrink-0 mt-0.5`}>
                            <svg className={`w-3 h-3 ${ci === 0 ? "text-ale" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-text-secondary leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-20 bg-light-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-4">
                Products
              </div>
              <h2 className="text-2xl font-extrabold text-text tracking-tight">
                Powered by ALE technology
              </h2>
              <p className="mt-2 text-sm text-text-muted">Solutions deployed in {subPage.name.toLowerCase()} environments worldwide.</p>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors">
              All products
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subPage.products.map((product, i) => {
              const color = capColors[i % capColors.length];
              return (
                <div
                  key={product}
                  className={`group flex items-center gap-3 p-5 bg-white rounded-xl border ${color.border} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
                >
                  <div className={`w-10 h-10 rounded-xl ${color.light} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <svg className={`w-5 h-5 ${color.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-text">{product}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customers */}
      {subPage.customers && subPage.customers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold uppercase tracking-wider mb-4">
                Case Studies
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Trusted by industry leaders
              </h2>
              <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
                Organizations transforming with ALE {subPage.name.toLowerCase()} solutions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subPage.customers.map((cust, i) => {
                const color = capColors[i % capColors.length];
                const inner = (
                  <>
                    <div className={`w-14 h-14 rounded-2xl ${color.light} flex items-center justify-center shrink-0`}>
                      <span className={`${color.text} font-bold text-base`}>
                        {cust.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors truncate">{cust.name}</h3>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{cust.detail}</p>
                    </div>
                    {cust.slug && (
                      <div className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center shrink-0 group-hover:bg-ale-50 transition-colors">
                        <svg className="w-4 h-4 text-text-muted group-hover:text-ale group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    )}
                  </>
                );
                return cust.slug ? (
                  <Link
                    key={i}
                    href={`/customers/${cust.slug}`}
                    className="group flex items-center gap-4 p-6 rounded-2xl border border-light-200 bg-white hover:border-ale-200 hover:shadow-lg transition-all duration-300"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-6 rounded-2xl border border-light-200 bg-white"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center h-7 px-3 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-semibold uppercase tracking-wider mb-4">
                  Insights
                </div>
                <h2 className="text-2xl font-extrabold text-text tracking-tight">
                  Related articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
              >
                All articles
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-light-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex h-5 px-2.5 bg-ale-50 text-ale text-[10px] font-semibold rounded-full items-center">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors line-clamp-2 leading-relaxed">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Downloads */}
      <DownloadCenter downloads={downloads} />

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-ale/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-[15%] w-56 h-56 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <div className="inline-flex items-center h-7 px-3 rounded-full bg-white/10 text-white/70 text-[11px] font-semibold uppercase tracking-wider mb-6">
            Get Started
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
            Transform your {subPage.name.toLowerCase()} operations
          </h2>
          <p className="text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Talk to our experts about a solution tailored to your {parent.name.toLowerCase()} environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 h-12 px-8 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30 hover:-translate-y-0.5"
            >
              Contact an Expert
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/industries/${parent.slug}`}
              className="inline-flex items-center h-12 px-8 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              Explore {parent.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      {(prev || next) && (
        <section className="py-6 bg-white border-t border-light-200">
          <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/industries/${slug}/${prev.slug}`}
                className="group flex items-center gap-3 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center group-hover:bg-ale-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                {prev.name}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/industries/${slug}/${next.slug}`}
                className="group flex items-center gap-3 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
              >
                {next.name}
                <div className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center group-hover:bg-ale-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}
    </>
  );
}
