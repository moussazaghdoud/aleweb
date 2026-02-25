import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServicesData } from "@/lib/cms";
import { serviceVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

export async function generateStaticParams() {
  const servicesData = await getServicesData();
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const servicesData = await getServicesData();
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.name} | Services`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const servicesData = await getServicesData();
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) notFound();

  const currentIdx = servicesData.findIndex((s) => s.slug === slug);
  const prev = currentIdx > 0 ? servicesData[currentIdx - 1] : null;
  const next = currentIdx < servicesData.length - 1 ? servicesData[currentIdx + 1] : null;

  return (
    <>
      <AdminEditButton collection="services" documentSlug={slug} />
      {/* Hero */}
      <section className="relative min-h-[440px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={serviceVideos[slug] || "https://assets.mixkit.co/videos/4603/4603-720.mp4"} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Services
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            {service.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">{service.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl">
            <p className="text-lg text-text-secondary leading-relaxed">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
            What&apos;s included
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {service.features.map((feat, i) => (
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
                    <h3 className="text-base font-bold text-text mb-2">{feat.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Interested in {service.name}?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Contact our team to discuss how we can help your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="py-8 bg-white border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {prev.name}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/services/${next.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors"
            >
              {next.name}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}
