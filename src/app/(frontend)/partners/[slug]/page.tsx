import { notFound } from "next/navigation";
import Link from "next/link";
import { getPartnersData } from "@/lib/cms";
import { partnerVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

export async function generateStaticParams() {
  const partnersData = await getPartnersData();
  return partnersData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const partnersData = await getPartnersData();
  const { slug } = await params;
  const page = partnersData.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.name} | Partners`,
    description: page.tagline,
    alternates: {
      canonical: `/partners/${slug}`,
      languages: { "en": `/partners/${slug}`, "fr": `/fr/partners/${slug}`, "x-default": `/partners/${slug}` },
    },
  };
}

const capIcons = [
  <svg key="users" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="chart" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  <svg key="academic" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  <svg key="rocket" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
];

const capColors = [
  { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
  { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
];

export default async function PartnerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const partnersData = await getPartnersData();
  const { slug } = await params;
  const page = partnersData.find((p) => p.slug === slug);
  if (!page) notFound();

  const mainPages = partnersData.filter(p => ["business-partners", "consultants", "technology-partners"].includes(p.slug));
  const currentIdx = mainPages.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? mainPages[currentIdx - 1] : null;
  const next = currentIdx < mainPages.length - 1 ? mainPages[currentIdx + 1] : null;

  return (
    <>
      <AdminEditButton collection="partners" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={partnerVideos[slug] || "https://assets.mixkit.co/videos/30012/30012-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 mb-5">
            <Link href="/partners" className="hover:text-white transition-colors">Partners</Link>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            {page.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">{page.tagline}</p>
        </div>
      </section>

      {/* Description + Quick CTA */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <div className="lg:w-2/3">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-5">
                Partner Program
              </div>
              <p className="text-xl text-text leading-relaxed font-light mb-8">{page.description}</p>
              {page.highlights && page.highlights.length > 0 && (
                <ul className="space-y-3.5">
                  {page.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-ale/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-ale/20 transition-colors">
                        <svg className="w-3.5 h-3.5 text-ale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-7 text-white shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-ale flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                </div>
                <h3 className="text-base font-bold mb-2">Ready to partner with ALE?</h3>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">Get in touch to learn about our partner programs and how to get started.</p>
                <Link
                  href="/company/contact"
                  className="inline-flex items-center gap-2 h-11 px-6 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors w-full justify-center"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      {page.stats && page.stats.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute top-0 left-[20%] w-64 h-64 bg-ale/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-[20%] w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
          <div className="relative mx-auto max-w-[1320px] px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {page.stats.map((stat, i) => (
                <div key={stat.label} className="relative group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-xs text-white/50 leading-relaxed uppercase tracking-wider">{stat.label}</div>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full ${i % 2 === 0 ? "bg-ale" : "bg-purple-400"} opacity-60`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-4">
              Program Benefits
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              What you get as a partner
            </h2>
            <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
              Everything you need to succeed with ALE solutions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {page.features.map((feat, i) => {
              const color = capColors[i % capColors.length];
              return (
                <div key={i} className={`group rounded-2xl border ${color.border} bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className="p-7">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${color.light} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {capIcons[i % capIcons.length]}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-base font-bold text-text mb-0.5">{feat.title}</h3>
                        <div className={`w-8 h-0.5 rounded-full ${color.bg} opacity-40`} />
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
            Ready to partner with ALE?
          </h2>
          <p className="text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Contact us to learn more about becoming an ALE partner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 h-12 px-8 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30 hover:-translate-y-0.5"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center h-12 px-8 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              All Partner Programs
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
                href={`/partners/${prev.slug}`}
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
                href={`/partners/${next.slug}`}
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
