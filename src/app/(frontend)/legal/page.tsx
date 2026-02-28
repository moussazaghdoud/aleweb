import Link from "next/link";
import { getLegalData } from "@/lib/cms";
import { landingVideos } from "@/data/hero-videos";

const docIcons: Record<string, string> = {
  "privacy-policy": "M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  "terms-of-use": "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  "cookie-policy": "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.871V6.75m-3.75 0H12m-3.75 0a48.354 48.354 0 00-7.864.993m17.25-1.151A48.87 48.87 0 0012 5.25m-8.114 1.743a3 3 0 014.5 3.213M16.614 6.993a3 3 0 014.5 3.213",
};

const colorSchemes = [
  { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-500", hover: "hover:border-blue-200" },
  { bg: "bg-purple-50", border: "border-purple-100", icon: "text-purple-500", hover: "hover:border-purple-200" },
  { bg: "bg-cyan-50", border: "border-cyan-100", icon: "text-cyan-500", hover: "hover:border-cyan-200" },
  { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-500", hover: "hover:border-amber-200" },
];

export const metadata = {
  title: "Legal",
  description: "Legal information, privacy policy, terms of use, and cookie policy for Alcatel-Lucent Enterprise.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "Legal | Alcatel-Lucent Enterprise",
    description: "Legal information, privacy policy, terms of use, and cookie policy for Alcatel-Lucent Enterprise.",
    type: "website" as const,
    url: "/legal",
  },
};

export default async function LegalPage() {
  const legalData = await getLegalData();
  return (
    <>
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.legal} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Legal
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light">
            Legal information, policies, and compliance resources for Alcatel-Lucent Enterprise.
          </p>
        </div>
      </section>

      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-20 right-0 w-[200px] h-[200px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {legalData.map((page, i) => {
              const color = colorSchemes[i % colorSchemes.length];
              const iconPath = docIcons[page.slug] || docIcons["terms-of-use"];
              return (
                <Link
                  key={page.slug}
                  href={`/legal/${page.slug}`}
                  className={`group p-6 rounded-2xl border ${color.border} ${color.hover} hover:shadow-md transition-all`}
                >
                  <div className={`w-11 h-11 rounded-xl ${color.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <svg className={`w-5 h-5 ${color.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-text group-hover:text-ale transition-colors mb-2">
                    {page.name}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {page.sections[0].content.slice(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-text-muted">
                      Last updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <svg className="w-4 h-4 text-text-muted group-hover:text-ale group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
