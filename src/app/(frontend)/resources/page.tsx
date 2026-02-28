import Link from "next/link";
import { getResourcesData } from "@/lib/cms";
import { typeLabels } from "@/data/resources";
import { landingVideos } from "@/data/hero-videos";

const typeColors: Record<string, { badge: string; border: string; icon: string }> = {
  whitepaper: { badge: "bg-blue-50 text-blue-700", border: "border-blue-100 hover:border-blue-200", icon: "text-blue-500" },
  "case-study": { badge: "bg-green-50 text-green-700", border: "border-green-100 hover:border-green-200", icon: "text-green-500" },
  webinar: { badge: "bg-orange-50 text-orange-700", border: "border-orange-100 hover:border-orange-200", icon: "text-orange-500" },
  guide: { badge: "bg-ale-50 text-ale", border: "border-ale-100 hover:border-ale-200", icon: "text-ale" },
  datasheet: { badge: "bg-gray-100 text-gray-700", border: "border-gray-200 hover:border-gray-300", icon: "text-gray-500" },
};

const typeIcons: Record<string, string> = {
  whitepaper: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  "case-study": "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  webinar: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5",
  guide: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  datasheet: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
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
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.resources} type="video/mp4" /></video>
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

      {/* Filter tags */}
      <section className="py-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeLabels).map(([key, label]) => {
              const color = typeColors[key] || typeColors.datasheet;
              return (
                <span
                  key={key}
                  className="inline-flex items-center h-8 px-4 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/70 backdrop-blur-sm"
                >
                  {label}
                  <span className="ml-1.5 text-[10px] text-white/40">
                    ({resourcesData.filter((r) => r.type === key).length})
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources list */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute top-20 right-0 w-[200px] h-[200px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resourcesData.map((resource) => {
              const color = typeColors[resource.type] || typeColors.datasheet;
              const iconPath = typeIcons[resource.type] || typeIcons.datasheet;
              return (
                <div
                  key={resource.slug}
                  className={`bg-white rounded-2xl border ${color.border} p-6 hover:shadow-md transition-all flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-[10px] font-semibold ${color.badge}`}>
                      {typeLabels[resource.type]}
                    </span>
                    <span className="text-[11px] text-text-muted">
                      {new Date(resource.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text mb-2 leading-snug">{resource.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">{resource.summary}</p>
                  <div className="mt-4 pt-4 border-t border-light-200 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ale cursor-pointer hover:text-ale-dark transition-colors">
                      Download
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </span>
                    <svg className={`w-4 h-4 ${color.icon} opacity-30`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
