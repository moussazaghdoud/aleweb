import Link from "next/link";
import { getResourcesData } from "@/lib/cms";
import { landingVideos } from "@/data/hero-videos";
import { ResourceGrid } from "./ResourceGrid";

export const metadata = {
  title: "Resources",
  description: "Whitepapers, case studies, webinars, guides, and datasheets from Alcatel-Lucent Enterprise.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources | Alcatel-Lucent Enterprise",
    description: "Whitepapers, case studies, webinars, guides, and datasheets from Alcatel-Lucent Enterprise.",
    type: "website" as const,
    url: "/resources",
  },
};

export default async function ResourcesPage() {
  const resourcesData = await getResourcesData();
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.resources} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Resources
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Insights, guides & case studies
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Explore whitepapers, webinars, datasheets, and customer success stories to inform your digital transformation.
          </p>
        </div>
      </section>

      {/* Interactive filters + resource grid (client component) */}
      <ResourceGrid resources={resourcesData} />

      {/* Dark gradient CTA */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-ale/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-500/15 rounded-full blur-[80px]" />
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Need help choosing the right solution?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8">
            Our experts can guide you through the options and recommend the best fit for your organization.
          </p>
          <Link
            href="/company/contact"
            className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all shadow-lg shadow-ale/25"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </>
  );
}
