import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCompanyData } from "@/lib/cms";
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

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const companyData = await getCompanyData();
  const { slug } = await params;
  const page = companyData.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <AdminEditButton collection="company-pages" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={companyVideos[slug] || "https://assets.mixkit.co/videos/604/604-720.mp4"} type="video/mp4" /></video>
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

      {/* Stats bar (About page only) */}
      {page.stats && (
        <section className="py-10 bg-ale-dark">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
              {page.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-extrabold text-white">{s.value}</div>
                  <div className="text-[11px] text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description + Sections */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-lg text-text-secondary leading-relaxed">{page.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {page.sections.map((sec) => (
              <div key={sec.title} className="border-l-[3px] border-ale-200 pl-5">
                <h2 className="text-base font-bold text-text mb-2">{sec.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
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
                  className="bg-white rounded-xl border border-light-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-xs text-text-muted mb-2">
                    {new Date(pr.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">{pr.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{pr.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact form placeholder + Offices (Contact page only) */}
      {page.slug === "contact" && (
        <>
          {/* Contact form */}
          <section className="py-16 bg-light-50">
            <div className="mx-auto max-w-[1320px] px-6">
              <div className="max-w-xl mx-auto bg-white rounded-2xl border border-light-200 p-8">
                <h2 className="text-xl font-extrabold text-text tracking-tight mb-6">
                  Send us a message
                </h2>
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Offices */}
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
                      className="p-4 rounded-xl border border-light-200 hover:border-ale-200 transition-colors"
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

      {/* Executive Team (Executive Team page only) */}
      {page.executives && page.executives.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Leadership Team
            </h2>
            <div className="space-y-10">
              {page.executives.map((exec) => (
                <div key={exec.name} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-white rounded-2xl border border-light-200">
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

      {/* CTA */}
      {page.slug !== "contact" && (
        <section className="py-16 bg-ale">
          <div className="mx-auto max-w-[1320px] px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              Want to learn more about ALE?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Get in touch with our team or explore our solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/company/contact"
                className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
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
    </>
  );
}
