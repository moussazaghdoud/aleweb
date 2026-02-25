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
  };
}

export default async function LegalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const legalData = await getLegalData();
  const { slug } = await params;
  const page = legalData.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <AdminEditButton collection="legal-pages" documentSlug={slug} />
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={legalVideos[slug] || "https://assets.mixkit.co/videos/241/241-720.mp4"} type="video/mp4" /></video>
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

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="space-y-10">
            {page.sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="text-lg font-bold text-text mb-3">{sec.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
