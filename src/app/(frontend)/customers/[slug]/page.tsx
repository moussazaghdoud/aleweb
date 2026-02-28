import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudiesData } from "@/data/case-studies";
import { landingVideos } from "@/data/hero-videos";

export function generateStaticParams() {
  return caseStudiesData.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudiesData.find((c) => c.slug === slug);
  if (!cs) return { title: "Not Found" };
  return {
    title: `${cs.name} | Customer Success Story`,
    description: cs.tagline,
    alternates: {
      canonical: `/customers/${slug}`,
      languages: { en: `/customers/${slug}`, fr: `/fr/customers/${slug}`, "x-default": `/customers/${slug}` },
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudiesData.find((c) => c.slug === slug);
  if (!cs) notFound();

  const related = caseStudiesData
    .filter((c) => c.industrySlug === cs.industrySlug && c.slug !== cs.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={landingVideos.caseStudies} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 mb-5">
            <Link href="/customers/case-studies" className="hover:text-white transition-colors">
              Customer Stories
            </Link>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span>{cs.industry}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            {cs.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">{cs.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/80">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {cs.country}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/80">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {cs.industry}
            </span>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-extrabold text-text tracking-tight">The Challenge</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-ale-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-ale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl font-extrabold text-text tracking-tight">The Solution</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{cs.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-text tracking-tight">Key Results</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {cs.results.map((result, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-xl bg-white border border-light-200"
              >
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-text">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      {cs.quote && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <svg className="w-10 h-10 text-ale/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-lg sm:text-xl text-text font-medium leading-relaxed italic mb-6">
              &ldquo;{cs.quote.text}&rdquo;
            </blockquote>
            <div>
              <p className="text-sm font-bold text-text">{cs.quote.author}</p>
              <p className="text-xs text-text-muted mt-0.5">{cs.quote.role}</p>
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-xl font-extrabold text-text tracking-tight mb-8">Products & Solutions Used</h2>
          <div className="flex flex-wrap gap-3">
            {cs.products.map((product) => (
              <span
                key={product}
                className="inline-flex items-center h-10 px-5 bg-white border border-light-200 rounded-full text-sm font-semibold text-text hover:border-ale-200 hover:text-ale transition-colors"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-xl font-extrabold text-text tracking-tight mb-8">
              More {cs.industry} success stories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/customers/${r.slug}`}
                  className="group p-5 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-ale-50 flex items-center justify-center shrink-0">
                      <span className="text-ale font-bold text-xs">
                        {r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{r.name}</h3>
                      <p className="text-xs text-text-muted">{r.country}</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2">{r.tagline}</p>
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
            Ready to become our next success story?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Talk to our team about how ALE can help transform your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-white text-ale text-sm font-semibold rounded-full hover:bg-white/90 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/customers/case-studies"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              View All Stories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
