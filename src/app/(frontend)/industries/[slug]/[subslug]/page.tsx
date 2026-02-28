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
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3">
              <p className="text-lg text-text-secondary leading-relaxed">{subPage.description}</p>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-light-50 rounded-2xl p-6 border border-light-200">
                <h3 className="text-sm font-bold text-text mb-3">Ready to get started?</h3>
                <p className="text-xs text-text-muted mb-4 leading-relaxed">Talk to our {parent.name.toLowerCase()} specialists about a tailored solution.</p>
                <Link
                  href="/company/contact"
                  className="inline-flex items-center gap-2 h-10 px-5 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors w-full justify-center"
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

      {/* Rich Content Blocks — alternating layout with images */}
      {subPage.contentBlocks && subPage.contentBlocks.length > 0 && (
        <>
          {subPage.contentBlocks.map((block, i) => (
            <section key={i} className={`py-16 ${i % 2 === 0 ? "bg-light-50" : "bg-white"}`}>
              <div className="mx-auto max-w-[1320px] px-6">
                <div className={`flex flex-col ${block.image ? "lg:flex-row" : ""} gap-12 items-center`}>
                  {/* Text side */}
                  <div className={block.image ? "lg:w-1/2" : "max-w-3xl"}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-5 leading-tight">
                      {block.heading}
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed mb-6">
                      {block.body}
                    </p>
                    {block.bullets && block.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {block.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-ale shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-text-secondary leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Image side */}
                  {block.image && (
                    <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:order-last" : "lg:order-first"}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                        <Image
                          src={block.image}
                          alt={block.imageAlt || block.heading}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {/* Stats Band */}
      {subPage.stats && subPage.stats.length > 0 && (
        <section className="py-12 bg-ale">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className={`grid grid-cols-2 sm:grid-cols-${subPage.stats.length} gap-8`}>
              {subPage.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1 leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Key capabilities
            </h2>
            <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
              Purpose-built technology for {subPage.name.toLowerCase()} environments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {subPage.capabilities.map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-light-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-gradient-to-r from-ale/5 to-ale/10 px-6 py-4 flex items-center gap-3 border-b border-light-100">
                  <span className="w-10 h-10 rounded-xl bg-ale flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-text">{cap.title}</h3>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-text-secondary leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefit Cards — For Guests / For Managers */}
      {subPage.benefitCards && subPage.benefitCards.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Benefits that matter
              </h2>
              <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
                Measurable value for every stakeholder.
              </p>
            </div>
            <div className={`grid sm:grid-cols-${subPage.benefitCards.length} gap-6`}>
              {subPage.benefitCards.map((card) => (
                <div key={card.audience} className="bg-white rounded-2xl border border-light-200 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-ale to-ale-dark px-6 py-4">
                    <h3 className="text-lg font-bold text-white">{card.audience}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {card.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

      {/* Testimonial */}
      {subPage.testimonial && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-10 h-10 text-ale/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <blockquote className="text-lg sm:text-xl font-medium text-text leading-relaxed mb-6 italic">
                &ldquo;{subPage.testimonial.text}&rdquo;
              </blockquote>
              <div>
                <div className="text-sm font-bold text-text">{subPage.testimonial.author}</div>
                <div className="text-xs text-text-muted">{subPage.testimonial.role}, {subPage.testimonial.company}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-3">
            Featured products
          </h2>
          <p className="text-sm text-text-muted mb-8">Solutions powering {subPage.name.toLowerCase()} deployments worldwide.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subPage.products.map((product) => (
              <div
                key={product}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-ale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-text">{product}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customers */}
      {subPage.customers && subPage.customers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Customer success stories
              </h2>
              <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
                See how organizations are transforming with ALE {subPage.name.toLowerCase()} solutions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subPage.customers.map((cust, i) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-ale-50 flex items-center justify-center shrink-0">
                      <span className="text-ale font-bold text-sm">
                        {cust.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{cust.name}</h3>
                      <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{cust.detail}</p>
                    </div>
                    <svg className="w-4 h-4 text-text-muted group-hover:text-ale group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                );
                return cust.slug ? (
                  <Link
                    key={i}
                    href={`/customer-references/${cust.slug}`}
                    className="group flex items-center gap-4 p-5 rounded-xl border border-light-200 bg-white hover:border-ale-200 hover:shadow-md transition-all"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-xl border border-light-200 bg-white"
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
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl font-extrabold text-text tracking-tight">
                  Related insights
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  Expert perspectives on {parent.name.toLowerCase()} technology.
                </p>
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
                  className="group rounded-xl border border-light-200 bg-white overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex h-5 px-2 bg-ale-50 text-ale text-[10px] font-semibold rounded-full items-center">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors line-clamp-2">
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
      <section className="py-20 bg-gradient-to-br from-ale-800 via-ale-700 to-ale relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-ale-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[15%] w-48 h-48 bg-ale-400 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Transform your {subPage.name.toLowerCase()} operations
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
            Talk to our experts about a solution tailored to your {parent.name.toLowerCase()} environment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30"
            >
              Contact an Expert
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/industries/${parent.slug}`}
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Back to {parent.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      {(prev || next) && (
        <section className="py-8 bg-white border-t border-light-200">
          <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/industries/${slug}/${prev.slug}`}
                className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {prev.name}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/industries/${slug}/${next.slug}`}
                className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
              >
                {next.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
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
