import Link from "next/link";
import { IconHandshake, IconGlobe, IconClipboard, IconCode, IconSearch } from "@/components/primitives/Icons";
import { landingVideos } from "@/data/hero-videos";

const regions = [
  {
    name: "EMEA",
    subtitle: "Europe, Middle East & Africa",
    countries: ["France (HQ)", "Germany", "UK", "Spain", "Italy", "Netherlands", "Belgium", "UAE", "South Africa", "Saudi Arabia", "Turkey", "Egypt"],
  },
  {
    name: "Americas",
    subtitle: "North & South America",
    countries: ["United States", "Canada", "Mexico", "Brazil", "Colombia", "Argentina"],
  },
  {
    name: "Asia Pacific",
    subtitle: "APAC & Oceania",
    countries: ["China", "India", "Singapore", "Australia", "Japan", "South Korea", "Indonesia", "Malaysia"],
  },
];

const partnerPages = [
  {
    slug: "business-partners",
    name: "Business Partners",
    description: "Join our global network of 3,400+ certified business partners. Access training, certifications, and go-to-market resources to grow your business with ALE solutions.",
    Icon: IconHandshake,
  },
  {
    slug: "consultants",
    name: "Consultants",
    description: "Partner with ALE as a trusted advisor — help your clients design, evaluate, and deploy enterprise networking and communications solutions.",
    Icon: IconGlobe,
  },
  {
    slug: "technology-partners",
    name: "Technology Partners",
    description: "Build on the ALE platform. Integrate your solutions with Rainbow, OmniSwitch, and OmniAccess Stellar to deliver joint value to enterprise customers.",
    Icon: IconClipboard,
  },
];

const stats = [
  { value: "3,400+", label: "Business Partners" },
  { value: "50+", label: "Countries" },
  { value: "100+", label: "Certifications Available" },
  { value: "24/7", label: "Partner Portal Access" },
];

export const metadata = {
  title: "Partners",
  description: "Join the ALE partner ecosystem — 3,400+ partners across 50+ countries delivering enterprise networking and communications.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners | Alcatel-Lucent Enterprise",
    description: "Join the ALE partner ecosystem — 3,400+ partners across 50+ countries delivering enterprise networking and communications.",
    type: "website" as const,
    url: "/partners",
  },
};

export default function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.partners} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Partners
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Grow with the ALE partner ecosystem
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Whether you&apos;re a reseller, system integrator, or technology partner — ALE provides the tools, training, and support to accelerate your success.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-ale-dark">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-extrabold text-white">{s.value}</div>
                <div className="text-[11px] text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner paths */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {partnerPages.map((page) => (
              <Link
                key={page.slug}
                href={`/partners/${page.slug}`}
                className="group p-6 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-ale-50 flex items-center justify-center mb-4 group-hover:bg-ale transition-colors">
                  <page.Icon className="w-5 h-5 text-ale group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-base font-bold text-text group-hover:text-ale transition-colors mb-2">
                  {page.name}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">{page.description}</p>
              </Link>
            ))}
          </div>

          {/* Developer + Portal + Find a Partner links */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/developers"
              className="group flex items-start gap-4 p-6 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                <IconCode className="w-5 h-5 text-ale group-hover:text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text group-hover:text-ale transition-colors">Developers</h2>
                <p className="text-sm text-text-muted mt-1">Build on the ALE platform with Rainbow APIs, SDKs, and CPaaS integrations.</p>
              </div>
            </Link>
            <div className="flex items-start gap-4 p-6 rounded-xl border border-light-200 bg-ale-50/30">
              <div className="w-11 h-11 rounded-lg bg-ale flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-text">Partner Portal</h2>
                <p className="text-sm text-text-muted mt-1">Access your partner dashboard, deal registration, certifications, and marketing resources.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ale mt-2">
                  Sign in to portal
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </div>
            </div>
            <Link
              href="#find-a-partner"
              className="group flex items-start gap-4 p-6 rounded-xl border border-ale-200 bg-ale-50/40 hover:border-ale hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-ale flex items-center justify-center shrink-0 group-hover:bg-ale-dark transition-colors">
                <IconSearch className="w-5 h-5 text-white transition-colors" />
              </div>
              <div>
                <h2 className="text-base font-bold text-ale group-hover:text-ale-dark transition-colors">Find a Partner</h2>
                <p className="text-sm text-text-muted mt-1">Locate ALE partners and offices by region across 50+ countries worldwide.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Find a Partner */}
      <section id="find-a-partner" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-ale/10 flex items-center justify-center">
              <IconGlobe className="w-5 h-5 text-ale" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-ale">Partner Locator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-3">
            Find a Partner Near You
          </h2>
          <p className="text-text-secondary max-w-xl mb-10">
            ALE partners operate in 50+ countries. Select your region to connect with a certified business partner or local ALE office.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <div
                key={region.name}
                className="group rounded-2xl border border-light-200 bg-white p-6 hover:border-ale-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-text">{region.name}</h3>
                  <span className="text-[11px] font-semibold text-ale bg-ale-50 px-2.5 py-1 rounded-full">
                    {region.countries.length} countries
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-4">{region.subtitle}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {region.countries.map((country) => (
                    <span
                      key={country}
                      className="text-[11px] font-medium text-text-secondary bg-gray-100 px-2.5 py-1 rounded-full"
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <Link
                  href="/company/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
                >
                  Contact regional team
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to partner with ALE?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Join 3,400+ partners who trust ALE to deliver enterprise technology worldwide.
          </p>
          <Link
            href="/company/contact"
            className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
