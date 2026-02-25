import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductCategories, getCatalogProducts } from "@/lib/cms";

export async function generateStaticParams() {
  const productCategories = await getProductCategories();
  return productCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const productCategories = await getProductCategories();
  const cat = productCategories.find((c) => c.slug === category);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} | Products`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const productCategories = await getProductCategories();
  const catalogProducts = await getCatalogProducts();
  const cat = productCategories.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = catalogProducts.filter((p) => p.category === category);

  // Group by subcategory
  const subcategories = Array.from(
    new Set(products.map((p) => p.subcategory || "General"))
  );

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src="https://assets.mixkit.co/videos/32989/32989-720.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg
              className="w-3.5 h-3.5"
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
            All Products
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            {cat.name}
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            {cat.description}
          </p>
          <p className="mt-3 text-sm text-white/40">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Products by subcategory */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          {subcategories.map((sub) => {
            const subProducts = products.filter(
              (p) => (p.subcategory || "General") === sub
            );
            return (
              <div key={sub} className="mb-14 last:mb-0">
                <h2 className="text-xl font-extrabold text-text tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-ale rounded-full" />
                  {sub}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {subProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${category}/${product.slug}`}
                      className="group rounded-xl border border-light-200 overflow-hidden hover:border-ale-200 hover:shadow-md transition-all"
                    >
                      {product.image && (
                        <div className="aspect-[4/3] bg-light-50 flex items-center justify-center p-4 border-b border-light-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={320}
                            height={240}
                            className="object-contain max-h-[180px] w-auto group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                      <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors mb-1.5">
                        {product.name}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
                        {product.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.highlights.slice(0, 3).map((h) => (
                          <span
                            key={h.label}
                            className="text-[11px] font-medium text-ale bg-ale-50 rounded-full px-2.5 py-0.5"
                          >
                            {h.stat} {h.label}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ale">
                        View details
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Need help choosing?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
            Our specialists can help you find the right {cat.name.toLowerCase()}{" "}
            for your environment and requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Contact a Specialist
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              All Categories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
