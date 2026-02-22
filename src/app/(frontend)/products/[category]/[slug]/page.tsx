import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductCategories, getCatalogProducts } from "@/lib/cms";

export async function generateStaticParams() {
  const catalogProducts = await getCatalogProducts();
  return catalogProducts.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const catalogProducts = await getCatalogProducts();
  const product = catalogProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Products`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const productCategories = await getProductCategories();
  const catalogProducts = await getCatalogProducts();
  const product = catalogProducts.find(
    (p) => p.slug === slug && p.category === category
  );
  if (!product) notFound();

  const cat = productCategories.find((c) => c.slug === category);
  const siblings = catalogProducts.filter((p) => p.category === category);
  const currentIdx = siblings.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? siblings[currentIdx - 1] : null;
  const next =
    currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-ale-deep via-ale-900 to-ale-dark">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-5">
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href={`/products/${category}`}
              className="hover:text-white transition-colors"
            >
              {cat?.name}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-2xl font-light leading-relaxed">
            {product.tagline}
          </p>
          {product.subcategory && (
            <span className="mt-4 inline-block text-xs font-semibold text-ale-300 bg-white/10 rounded-full px-3 py-1">
              {product.subcategory}
            </span>
          )}
        </div>
      </section>

      {/* Highlights strip */}
      <section className="py-10 bg-ale-deep border-t border-white/10">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {product.highlights.map((h, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-extrabold text-white">
                  {h.stat}
                </div>
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
            <p className="text-lg text-text-secondary leading-relaxed">
              {product.description}
            </p>
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
                    <span className="text-ale font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-10 bg-white border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/products/${category}/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-text-secondary hover:text-ale transition-colors"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-semibold">{prev.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/products/${category}/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-text-secondary hover:text-ale transition-colors"
            >
              <span className="font-semibold">{next.name}</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale-deep">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Interested in {product.name}?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Talk to a specialist about deployment options, pricing, and how it
            fits your infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Request a Demo
            </Link>
            <Link
              href={`/products/${category}`}
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Back to {cat?.name}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
