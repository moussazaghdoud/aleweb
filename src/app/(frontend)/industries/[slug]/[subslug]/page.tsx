import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getIndustriesData } from "@/lib/cms";
import { industrySubPagesData } from "@/data/industry-subpages";
import { industryVideos } from "@/data/hero-videos";

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

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={industryVideos[slug] || "https://assets.mixkit.co/videos/4547/4547-720.mp4"} type="video/mp4" /></video>
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

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl">
            <p className="text-lg text-text-secondary leading-relaxed">{subPage.description}</p>
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
            {subPage.capabilities.map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-gray-100 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <div className="h-5 w-px bg-gray-300 rounded-full" />
                  <h3 className="text-base font-bold text-gray-900">{cap.title}</h3>
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
          <div className="flex flex-wrap gap-3">
            {subPage.products.map((product) => (
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

      {/* Customers */}
      {subPage.customers && subPage.customers.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Customer success stories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subPage.customers.map((cust, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-xl border border-light-200 bg-white"
                >
                  <div className="w-10 h-10 rounded-full bg-ale-50 flex items-center justify-center shrink-0">
                    <span className="text-ale font-bold text-xs">
                      {cust.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
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

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Transform your {subPage.name.toLowerCase()} operations
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Talk to our experts about a solution tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Contact an Expert
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
