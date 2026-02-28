import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLegalData } from "@/lib/cms";
import { legalVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

export async function generateStaticParams() {
  const legalData = await getLegalData();
  return legalData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const legalData = await getLegalData();
  const { slug } = await params;
  const page = legalData.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return {
    title: page.name,
    description: `${page.name} for Alcatel-Lucent Enterprise`,
    alternates: {
      canonical: `/legal/${slug}`,
      languages: { "en": `/legal/${slug}`, "fr": `/fr/legal/${slug}`, "x-default": `/legal/${slug}` },
    },
  };
}

export default async function LegalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const legalData = await getLegalData();
  const { slug } = await params;
  const page = legalData.find((p) => p.slug === slug);
  if (!page) notFound();

  const currentIdx = legalData.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? legalData[currentIdx - 1] : null;
  const next = currentIdx < legalData.length - 1 ? legalData[currentIdx + 1] : null;

  return (
    <>
      <AdminEditButton collection="legal-pages" documentSlug={slug} />
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={legalVideos[slug] || "https://assets.mixkit.co/videos/241/241-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/legal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-white/70 transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Legal
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {page.name}
          </h1>
          <p className="mt-3 text-sm text-white/40">
            Last updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Contents</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {page.sections.map((sec, i) => (
              <span key={i} className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                {sec.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute top-32 right-0 w-[180px] h-[180px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
        <div className="mx-auto max-w-[900px] px-6">
          <div className="space-y-10">
            {page.sections.map((sec, i) => (
              <div key={sec.title} className="border-l-[3px] border-ale-200 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-ale/40">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="text-lg font-bold text-text">{sec.title}</h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <section className="py-8 bg-white border-t border-light-200">
          <div className="mx-auto max-w-[900px] px-6 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/legal/${prev.slug}`}
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
                href={`/legal/${next.slug}`}
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
