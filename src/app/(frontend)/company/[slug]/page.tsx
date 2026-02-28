import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCompanyData } from "@/lib/cms";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { companyVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateStaticParams() {
  const companyData = await getCompanyData();
  return companyData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const companyData = await getCompanyData();
  const { slug } = await params;
  const page = companyData.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.name} | Company`,
    description: page.tagline,
    alternates: {
      canonical: `/company/${slug}`,
      languages: { "en": `/company/${slug}`, "fr": `/fr/company/${slug}`, "x-default": `/company/${slug}` },
    },
  };
}

const colorSchemes = [
  { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", icon: "text-blue-500", dot: "bg-blue-500" },
  { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-700", icon: "text-purple-500", dot: "bg-purple-500" },
  { bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-700", icon: "text-cyan-500", dot: "bg-cyan-500" },
  { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700", icon: "text-amber-500", dot: "bg-amber-500" },
];

const sectionIcons = [
  "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
  "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
];

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const companyData = await getCompanyData();
  const { slug } = await params;
  const page = companyData.find((p) => p.slug === slug);
  if (!page) notFound();

  const currentIdx = companyData.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? companyData[currentIdx - 1] : null;
  const next = currentIdx < companyData.length - 1 ? companyData[currentIdx + 1] : null;

  return (
    <>
      <AdminEditButton collection="company-pages" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={companyVideos[slug] || "https://assets.mixkit.co/videos/604/604-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/company"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-white/70 transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Company
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            {page.name}
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            {page.tagline}
          </p>
        </div>
      </section>

      <Breadcrumbs items={[
        { label: "Company", href: "/company" },
        { label: page.name, href: `/company/${page.slug}` },
      ]} />

      {/* Stats band (glass-morphism) */}
      {page.stats && (
        <section className="relative py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-ale/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/15 rounded-full blur-[80px]" />
          <div className="relative mx-auto max-w-[1320px] px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {page.stats.map((s) => (
                <div key={s.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">{s.value}</div>
                  <div className="text-[11px] text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description + Sections */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute top-20 right-0 w-[200px] h-[200px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-lg text-text-secondary leading-relaxed">{page.description}</p>
          </div>
          {page.sections.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
              {page.sections.map((sec, i) => {
                const color = colorSchemes[i % colorSchemes.length];
                return (
                  <div key={sec.title} className={`relative rounded-2xl ${color.bg} border ${color.border} p-6 hover:shadow-md transition-shadow`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${color.bg} border ${color.border} flex items-center justify-center shrink-0`}>
                        <svg className={`w-5 h-5 ${color.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={sectionIcons[i % sectionIcons.length]} />
                        </svg>
                      </div>
                      <div>
                        <h2 className={`text-base font-bold ${color.text} mb-2`}>{sec.title}</h2>
                        <p className="text-sm text-text-secondary leading-relaxed">{sec.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Press releases (Newsroom only) */}
      {page.pressReleases && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Latest Press Releases
            </h2>
            <div className="space-y-5">
              {page.pressReleases.map((pr) => (
                <div
                  key={pr.title}
                  className="bg-white rounded-xl border border-light-200 p-6 hover:shadow-md hover:border-ale-200 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-ale-50 text-ale text-[10px] font-semibold">
                      Press Release
                    </span>
                    <span className="text-xs text-text-muted">
                      {new Date(pr.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">{pr.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{pr.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact form + Offices (Contact page only) */}
      {page.slug === "contact" && (
        <>
          <section className="py-16 bg-light-50">
            <div className="mx-auto max-w-[1320px] px-6">
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-light-200 p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-text tracking-tight mb-6">
                  Send us a message
                </h2>
                <ContactForm />
              </div>
            </div>
          </section>

          {page.offices && (
            <section className="py-16 bg-white">
              <div className="mx-auto max-w-[1320px] px-6">
                <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
                  Global offices
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {page.offices.map((office, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-sm transition-all"
                    >
                      <h3 className="text-sm font-bold text-text">{office.city}</h3>
                      <p className="text-xs text-ale font-semibold mt-0.5">{office.country}</p>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">{office.address}</p>
                      {office.phone && (
                        <p className="text-xs text-text-secondary mt-1">{office.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Executive Team */}
      {page.executives && page.executives.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Leadership Team
            </h2>
            <div className="space-y-10">
              {page.executives.map((exec) => (
                <div key={exec.name} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-white rounded-2xl border border-light-200 hover:shadow-md transition-shadow">
                  <div className="shrink-0">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-light-200 border-4 border-white shadow-lg">
                      <Image
                        src={exec.image}
                        alt={exec.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text">{exec.name}</h3>
                    <p className="text-sm font-semibold text-ale mt-0.5">{exec.title}</p>
                    {exec.bio && (
                      <p className="text-sm text-text-secondary leading-relaxed mt-3">{exec.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore Company hub cards (About page only) */}
      {page.slug === "about" && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Explore ALE
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { href: "/company/executive-team", title: "Executive Team", desc: "Meet the leadership team driving ALE forward", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                { href: "/company/history", title: "Our History", desc: "125+ years of telecommunications innovation", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { href: "/company/awards", title: "Awards & Recognition", desc: "Industry recognition for innovation and excellence", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                { href: "/company/careers", title: "Careers", desc: "Join our global team across 50+ countries", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { href: "/company/esg", title: "ESG & Sustainability", desc: "Tech for Good — responsible innovation at ALE", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
                { href: "/company/innovation", title: "Innovation", desc: "Pioneering digital-age technology for the enterprise", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                    <svg className="w-5 h-5 text-ale group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{card.title}</h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dark gradient CTA */}
      {page.slug !== "contact" && (
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-ale/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-500/15 rounded-full blur-[80px]" />
          <div className="relative mx-auto max-w-[1320px] px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              Want to learn more about ALE?
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              Get in touch with our team or explore our solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/company/contact"
                className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all shadow-lg shadow-ale/25"
              >
                Contact Us
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <section className="py-8 bg-white border-t border-light-200">
          <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/company/${prev.slug}`}
                className="group flex items-center gap-3 max-w-[45%]"
              >
                <div className="w-9 h-9 rounded-full bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                  <svg className="w-4 h-4 text-ale group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider">Previous</div>
                  <div className="text-sm font-semibold text-text truncate group-hover:text-ale transition-colors">{prev.name}</div>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/company/${next.slug}`}
                className="group flex items-center gap-3 max-w-[45%] text-right"
              >
                <div className="min-w-0">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider">Next</div>
                  <div className="text-sm font-semibold text-text truncate group-hover:text-ale transition-colors">{next.name}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                  <svg className="w-4 h-4 text-ale group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
    </>
  );
}
