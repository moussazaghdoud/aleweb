import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlatformData } from "@/lib/cms";
import {
  IconChat, IconShield, IconAI, IconSignal, IconGlobe,
} from "@/components/primitives/Icons";
import { platformVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

/* ── Illustration images from ALE CDN ── */
const cdn = "https://web-assets.al-enterprise.com/-/media/assets/internet/images";
const platformImages: Record<string, string> = {
  rainbow: `${cdn}/multidevicerainbow.jpg`,
  omniswitch: `${cdn}/solutions-digital-age-networking-focus-topic-1-810x340.jpg`,
  "stellar-wifi": `${cdn}/ale-wlan-office-homepage-header-495x275.jpg`,
  "ai-ops": `${cdn}/omnivista-network-advisor-image-v6.jpg`,
  "private-5g": `${cdn}/industrial-networks-header-image-v1.jpg`,
  "desk-phones": `${cdn}/ale-deskphones-header-image-1440x600-72dpi-v5.jpg`,
  "omnipcx-enterprise": `${cdn}/oxe-purple-480x480-v2.png`,
  "oxo-connect": `${cdn}/oxo-connect-evolution-f-480x480-product-showcase.png`,
  "ale-connect": `${cdn}/ale-connect-thumbnail-480-480.png`,
  omnivista: `${cdn}/omnivista-cirrus-3screens-480x480.png`,
  "asset-tracking": `${cdn}/solutions-asset-tracking-focus-topic-1-810x340.jpeg`,
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rainbow: IconChat,
  omniswitch: IconShield,
  "stellar-wifi": IconSignal,
  "ai-ops": IconAI,
  "private-5g": IconSignal,
  "desk-phones": IconGlobe,
};

const capColors = [
  { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
  { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
];

const capIcons = [
  <svg key="shield" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="signal" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12.75h.008v.008H12v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  <svg key="cog" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="bolt" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
];

export async function generateStaticParams() {
  const platformData = await getPlatformData();
  return platformData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const platformData = await getPlatformData();
  const { slug } = await params;
  const product = platformData.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Platform`,
    description: product.tagline,
    alternates: {
      canonical: `/platform/${slug}`,
      languages: { "en": `/platform/${slug}`, "fr": `/fr/platform/${slug}`, "x-default": `/platform/${slug}` },
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const platformData = await getPlatformData();
  const { slug } = await params;
  const product = platformData.find((p) => p.slug === slug);
  if (!product) notFound();

  const Icon = iconMap[product.slug] || IconChat;
  const related = platformData.filter((p) => product.relatedProducts.includes(p.slug));

  const currentIdx = platformData.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? platformData[currentIdx - 1] : null;
  const next = currentIdx < platformData.length - 1 ? platformData[currentIdx + 1] : null;

  return (
    <>
      <AdminEditButton collection="platforms" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={platformVideos[slug] || "https://assets.mixkit.co/videos/7887/7887-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 mb-5">
            <Link href="/platform" className="hover:text-white transition-colors">Platform</Link>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl font-light">{product.tagline}</p>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-[20%] w-64 h-64 bg-ale/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-[20%] w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {product.highlights.map((h, i) => (
              <div key={i} className="relative group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">{h.stat}</div>
                  <div className="text-xs text-white/50 leading-relaxed uppercase tracking-wider">{h.label}</div>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full ${i % 2 === 0 ? "bg-ale" : "bg-purple-400"} opacity-60`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Illustration */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-5">
                Overview
              </div>
              <p className="text-xl text-text leading-relaxed font-light">{product.description}</p>
            </div>
            {platformImages[slug] && (
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-ale/10 via-transparent to-ale/5 -z-10" />
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10]">
                    <Image
                      src={platformImages[slug]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-light-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center h-7 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider mb-4">
              Key Features
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Built for enterprise performance
            </h2>
            <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
              Enterprise-grade capabilities powering your digital transformation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {product.features.map((feat, i) => {
              const color = capColors[i % capColors.length];
              return (
                <div key={i} className={`group rounded-2xl border ${color.border} bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className="p-7">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${color.light} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {capIcons[i % capIcons.length]}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-base font-bold text-text mb-0.5">{feat.title}</h3>
                        <div className={`w-8 h-0.5 rounded-full ${color.bg} opacity-40`} />
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative mx-auto max-w-[1320px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center h-7 px-3 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold uppercase tracking-wider mb-4">
                  Ecosystem
                </div>
                <h2 className="text-2xl font-extrabold text-text tracking-tight">
                  Works great with
                </h2>
                <p className="mt-2 text-sm text-text-muted">Extend your deployment with complementary ALE products.</p>
              </div>
              <Link href="/platform" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors">
                All products
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel, i) => {
                const RelIcon = iconMap[rel.slug] || IconChat;
                const color = capColors[i % capColors.length];
                return (
                  <Link
                    key={rel.slug}
                    href={`/platform/${rel.slug}`}
                    className={`group flex items-start gap-4 p-6 rounded-2xl border ${color.border} bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${color.light} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <RelIcon className={`w-5 h-5 ${color.text}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors">{rel.name}</h3>
                      <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">{rel.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-ale/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-[15%] w-56 h-56 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <div className="inline-flex items-center h-7 px-3 rounded-full bg-white/10 text-white/70 text-[11px] font-semibold uppercase tracking-wider mb-6">
            Get Started
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
            Interested in {product.name}?
          </h2>
          <p className="text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Talk to a specialist about deployment options, pricing, and how it fits your infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 h-12 px-8 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30 hover:-translate-y-0.5"
            >
              Request a Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center h-12 px-8 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      {(prev || next) && (
        <section className="py-6 bg-white border-t border-light-200">
          <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/platform/${prev.slug}`}
                className="group flex items-center gap-3 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center group-hover:bg-ale-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                {prev.name}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/platform/${next.slug}`}
                className="group flex items-center gap-3 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
              >
                {next.name}
                <div className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center group-hover:bg-ale-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}
    </>
  );
}
