import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogData } from "@/lib/cms";

export async function generateStaticParams() {
  const blogData = await getBlogData();
  return blogData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogData = await getBlogData();
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogData = await getBlogData();
  const post = blogData.find((p) => p.slug === slug);
  if (!post) notFound();

  const currentIdx = blogData.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? blogData[currentIdx - 1] : null;
  const next = currentIdx < blogData.length - 1 ? blogData[currentIdx + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 w-full pb-14 pt-40">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-5 px-2 bg-white/20 text-white text-[10px] font-semibold rounded-full items-center">
              {post.category}
            </span>
            <span className="text-[10px] text-white/50">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-white/50">By {post.author}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[720px] px-6">
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base text-text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Related / CTA */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <h2 className="text-xl font-extrabold text-text mb-4">
            Want to learn more?
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Explore our solutions or contact our experts for a personalized assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex items-center h-10 px-6 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Explore Solutions
            </Link>
            <Link
              href="/company/contact"
              className="inline-flex items-center h-10 px-6 border border-light-200 text-text text-sm font-semibold rounded-full hover:bg-light-100 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="py-8 bg-white border-t border-light-200">
        <div className="mx-auto max-w-[900px] px-6 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors max-w-[45%]"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-ale transition-colors max-w-[45%] text-right"
            >
              <span className="truncate">{next.title}</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
