import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductCategories, getCatalogProducts, getSolutionsData } from "@/lib/cms";
import { DownloadCenter, type DownloadItem } from "@/components/shared/DownloadCenter";
import { PillarBadge, categoryToPillar } from "@/components/shared/PillarBadge";
import { FadeIn } from "@/components/shared/FadeIn";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import downloadsIndex from "@/data/downloads-index.json";
import { productDetailVideos, productSlugVideos } from "@/data/hero-videos";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

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
  const { category } = await params;
  return {
    title: `${product.name} | Products`,
    description: product.tagline,
    alternates: {
      canonical: `/products/${category}/${slug}`,
      languages: { "en": `/products/${category}/${slug}`, "fr": `/fr/products/${category}/${slug}`, "x-default": `/products/${category}/${slug}` },
    },
    openGraph: {
      title: `${product.name} | Alcatel-Lucent Enterprise`,
      description: product.tagline,
      type: "website",
      ...(product.image && {
        images: [{ url: product.image, alt: product.name }],
      }),
    },
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

  // Pillar badge
  const pillar = categoryToPillar(category);

  // Downloads for this product — alias map for renamed slugs and moved categories
  const productSlugAliases: Record<string, string[]> = {
    // WLAN: stellar-apXXXX → omniaccess-stellar-access-point-XXXX
    "stellar-ap1501": ["omniaccess-stellar-access-point-1501"],
    "stellar-ap1511": ["omniaccess-stellar-access-point-1511"],
    "stellar-ap1521": ["omniaccess-stellar-access-point-1521"],
    "stellar-ap1411": ["omniaccess-stellar-access-point-1411"],
    "stellar-ap1431": ["omniaccess-stellar-access-point-1431"],
    "stellar-ap1451": ["omniaccess-stellar-access-point-1451"],
    "stellar-ap1301": ["omniaccess-stellar-access-point-1301"],
    "stellar-ap1301h": ["omniaccess-stellar-access-point-1301h"],
    "stellar-ap1311": ["omniaccess-stellar-access-point-1311"],
    "stellar-ap1320": ["omniaccess-stellar-access-point-1320"],
    "stellar-ap1331": ["omniaccess-stellar-access-point-1331"],
    "stellar-ap1351": ["omniaccess-stellar-access-point-1351"],
    "stellar-ap1561": ["omniaccess-stellar-access-point-1561"],
    "stellar-ap1570": ["omniaccess-stellar-access-point-1570"],
    "stellar-ap1360": ["omniaccess-stellar-access-point-1360"],
    "stellar-ap1261": ["omniaccess-stellar-access-point-1261"],
    // Devices
    "sip-softphone": ["ip-desktop-softphone"],
    "aries-headsets": ["ale-aries-headsets"],
    // Applications
    "voip-softphone": ["ale-softphone"],
    "omnipcx-record": ["omnipcx-record-suite"],
    // Integration
    "rainbow-app-connector": ["app-connector"],
    // Management (merged categories)
    "omnivista-8770": ["omnivista-8770-network-management-system"],
    "opentouch-sbc": ["opentouch-session-border-controller"],
    "omniswitch-milestone": ["omniswitch-milestone-plugin"],
    "omnivista-network-management": ["omnivista-network-management-platform"],
    // Platforms
    "sip-dect-base-stations": ["sip-dect-infrastructure"],
    "dect-base-stations": ["dect-infrastructure"],
    "omnipcx-enterprise": ["omnipcx-enterprise-communication-server"],
    // Asset tracking (moved from standalone to WLAN)
    "omniaccess-stellar-asset-tracking": ["asset-tracking"],
  };
  const slugsToSearch = [slug, ...(productSlugAliases[slug] || [])];
  const downloads: DownloadItem[] = (downloadsIndex as any[])
    .filter((d: any) => {
      const url = d.pageUrl as string;
      return slugsToSearch.some(s =>
        url === `/en/products/${category}/${s}` ||
        url.endsWith(`/${s}`)
      );
    })
    .map((d: any) => ({
      fileUrl: d.fileUrl,
      fileName: d.fileName,
      anchorText: d.anchorText,
      documentType: d.documentType,
    }));

  // Solutions that reference this product
  const solutionsData = await getSolutionsData();
  const relatedSolutions = solutionsData.filter((s) =>
    s.products.some((p: string) =>
      product.name.toLowerCase().includes(p.toLowerCase()) ||
      p.toLowerCase().includes(product.name.split(" ")[0].toLowerCase())
    )
  );

  // Related products — prefer same subcategory, then same category
  const sameSubcategory = catalogProducts
    .filter((p) => p.category === category && p.slug !== slug && p.subcategory === product.subcategory);
  const sameCategory = catalogProducts
    .filter((p) => p.category === category && p.slug !== slug && p.subcategory !== product.subcategory);
  const relatedProducts = [...sameSubcategory, ...sameCategory].slice(0, 8);

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.tagline}
        image={product.image}
        category={cat?.name}
        slug={slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: cat?.name || category, href: `/products/${category}` },
          { name: product.name, href: `/products/${category}/${slug}` },
        ]}
      />
      <AdminEditButton collection="products" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={productSlugVideos[slug] || productDetailVideos[category] || "https://assets.mixkit.co/videos/23215/23215-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
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
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PillarBadge pillar={pillar} />
            {product.subcategory && (
              <span className="text-xs font-semibold text-ale-300 bg-white/10 rounded-full px-3 py-1">
                {product.subcategory}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="py-10 bg-ale border-t border-white/15">
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

      {/* Description + Image */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className={`flex flex-col ${product.image ? "lg:flex-row lg:items-start lg:gap-16" : ""}`}>
            <FadeIn className="max-w-3xl flex-1">
              <p className="text-lg text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </FadeIn>
            {product.image && (
              <FadeIn variant="scale-in" delay={150} className="mt-10 lg:mt-0 lg:w-[380px] shrink-0">
                <div className="bg-light-50 rounded-2xl border border-light-200 p-8 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-contain max-h-[320px] w-auto"
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Key features
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {product.features.map((feat, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-blue-300">{String(i + 1).padStart(2, "0")}</span>
                  <div className="h-5 w-px bg-blue-200 rounded-full" />
                  <h3 className="text-base font-bold text-blue-900">{feat.title}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Variants */}
      {product.variants && product.variants.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
              Available models
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-light-200">
                    <th className="text-left py-3 pr-6 font-bold text-text whitespace-nowrap">Model</th>
                    <th className="text-left py-3 font-bold text-text">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v) => (
                    <tr key={v.model} className="border-b border-light-100 hover:bg-light-50 transition-colors">
                      <td className="py-3 pr-6 font-semibold text-ale whitespace-nowrap">{v.model}</td>
                      <td className="py-3 text-text-secondary">{v.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Download Center */}
      <DownloadCenter downloads={downloads} />

      {/* Solutions using this product */}
      {relatedSolutions.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
              Solutions using {product.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSolutions.map((sol) => (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center h-10 px-5 bg-white border border-light-200 rounded-full text-sm font-semibold text-text hover:border-ale-200 hover:text-ale transition-colors"
                >
                  {sol.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-8">
              Related products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.category}/${rp.slug}`}
                  className="group rounded-xl border border-light-200 p-5 hover:border-ale-200 hover:shadow-md transition-all"
                >
                  {rp.image && (
                    <div className="bg-light-50 rounded-lg p-3 mb-4 flex items-center justify-center">
                      <Image src={rp.image} alt={rp.name} width={160} height={120} className="object-contain max-h-[100px] w-auto" />
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors mb-1">
                    {rp.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2">{rp.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Interested in {product.name}?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
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
