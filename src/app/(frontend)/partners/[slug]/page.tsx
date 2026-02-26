import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPartnersData } from "@/lib/cms";
import { partnerVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

export async function generateStaticParams() {
  const partnersData = await getPartnersData();
  return partnersData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const partnersData = await getPartnersData();
  const { slug } = await params;
  const page = partnersData.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.name} | Partners`,
    description: page.tagline,
  };
}

export default async function PartnerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const partnersData = await getPartnersData();
  const { slug } = await params;
  const page = partnersData.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <AdminEditButton collection="partners" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={partnerVideos[slug] || "https://assets.mixkit.co/videos/30012/30012-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Partners
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            {page.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">{page.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl">
            <p className="text-lg text-text-secondary leading-relaxed">{page.description}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
            Program benefits
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {page.features.map((feat, i) => {
              const accents = [
                { num: "text-blue-500", topBg: "bg-blue-50", bar: "bg-blue-500" },
                { num: "text-purple-500", topBg: "bg-purple-50", bar: "bg-purple-500" },
                { num: "text-cyan-500", topBg: "bg-cyan-50", bar: "bg-cyan-500" },
                { num: "text-amber-500", topBg: "bg-amber-50", bar: "bg-amber-500" },
              ];
              const a = accents[i % accents.length];
              return (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`${a.topBg} px-6 py-4 flex items-center gap-3`}>
                    <span className={`text-2xl font-extrabold ${a.num} opacity-70`}>{String(i + 1).padStart(2, "0")}</span>
                    <div className={`h-5 w-0.5 ${a.bar} opacity-30 rounded-full`} />
                    <h3 className="text-base font-bold text-text">{feat.title}</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
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
            Contact us to learn more about becoming an ALE partner.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Get in Touch
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              All Partner Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
