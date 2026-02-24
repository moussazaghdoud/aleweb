import Link from "next/link";
import { getResourcesData } from "@/lib/cms";
import { typeLabels } from "@/data/resources";

const typeColors: Record<string, string> = {
  whitepaper: "bg-blue-50 text-blue-700",
  "case-study": "bg-green-50 text-green-700",
  webinar: "bg-orange-50 text-orange-700",
  guide: "bg-ale-50 text-ale",
  datasheet: "bg-gray-100 text-gray-700",
};

export const metadata = {
  title: "Resources",
  description: "Whitepapers, case studies, webinars, guides, and datasheets from Alcatel-Lucent Enterprise.",
};

export default async function ResourcesPage() {
  const resourcesData = await getResourcesData();
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-ale-800 via-ale-700 to-ale">
        <div className="mx-auto max-w-[1320px] px-6">
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

      {/* Filter tags */}
      <section className="py-6 bg-white border-b border-light-200">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeLabels).map(([key, label]) => (
              <span
                key={key}
                className={`inline-flex items-center h-8 px-4 rounded-full text-xs font-semibold ${typeColors[key]}`}
              >
                {label}
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({resourcesData.filter((r) => r.type === key).length})
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Resources list */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resourcesData.map((resource) => (
              <div
                key={resource.slug}
                className="bg-white rounded-xl border border-light-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-[10px] font-semibold ${typeColors[resource.type]}`}>
                    {typeLabels[resource.type]}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {new Date(resource.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </span>
                </div>
                <h3 className="text-base font-bold text-text mb-2 leading-snug">{resource.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">{resource.summary}</p>
                <div className="mt-4 pt-4 border-t border-light-200">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ale cursor-pointer hover:text-ale-dark transition-colors">
                    Download
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Need help choosing the right solution?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Our experts can guide you through the options and recommend the best fit for your organization.
          </p>
          <Link
            href="/company/contact"
            className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </>
  );
}
