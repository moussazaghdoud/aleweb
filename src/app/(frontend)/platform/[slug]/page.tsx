import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlatformData } from "@/lib/cms";
import {
  IconChat, IconShield, IconAI, IconSignal, IconGlobe,
} from "@/components/primitives/Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rainbow: IconChat,
  omniswitch: IconShield,
  "stellar-wifi": IconSignal,
  "ai-ops": IconAI,
  "private-5g": IconSignal,
  "desk-phones": IconGlobe,
};

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
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const platformData = await getPlatformData();
  const { slug } = await params;
  const product = platformData.find((p) => p.slug === slug);
  if (!product) notFound();

  const Icon = iconMap[product.slug] || IconChat;
  const related = platformData.filter((p) => product.relatedProducts.includes(p.slug));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/25 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/platform"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Products
          </Link>
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

      {/* Highlights strip */}
      <section className="py-10 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {product.highlights.map((h, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-extrabold text-white">{h.stat}</div>
                <div className="text-xs text-white/50 mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl">
            <p className="text-lg text-text-secondary leading-relaxed">{product.description}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
            Key features
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {product.features.map((feat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-light-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center shrink-0">
                    <span className="text-ale font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text mb-2">{feat.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
              Works great with
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((rel) => {
                const RelIcon = iconMap[rel.slug] || IconChat;
                return (
                  <Link
                    key={rel.slug}
                    href={`/platform/${rel.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                      <RelIcon className="w-5 h-5 text-ale group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{rel.name}</h3>
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{rel.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Interested in {product.name}?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
            Talk to a specialist about deployment options, pricing, and how it fits your infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Request a Demo
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
