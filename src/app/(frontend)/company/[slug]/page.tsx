import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyData } from "@/lib/cms";

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
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const companyData = await getCompanyData();
  const { slug } = await params;
  const page = companyData.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-ale-deep via-ale-900 to-ale-dark">
        <div className="mx-auto max-w-[1320px] px-6">
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
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-text-secondary block mb-1.5">First Name</label>
                      <input type="text" className="w-full h-10 px-3 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text-secondary block mb-1.5">Last Name</label>
                      <input type="text" className="w-full h-10 px-3 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary block mb-1.5">Work Email</label>
                    <input type="email" className="w-full h-10 px-3 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary block mb-1.5">Company</label>
                    <input type="text" className="w-full h-10 px-3 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary block mb-1.5">Message</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-light-200 rounded-lg text-sm focus:outline-none focus:border-ale focus:ring-1 focus:ring-ale resize-none" />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </form>
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

      {/* CTA */}
      {page.slug !== "contact" && (
        <section className="py-16 bg-ale-deep">
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
