import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogData } from "@/lib/cms";
import { blogVideos } from "@/data/hero-videos";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

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
    alternates: {
      canonical: `/blog/${slug}`,
      languages: { "en": `/blog/${slug}`, "fr": `/fr/blog/${slug}`, "x-default": `/blog/${slug}` },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
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

  // Related posts: same category, max 3
  const related = blogData
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  const readingTime = Math.max(1, Math.ceil(post.content.join(" ").split(/\s+/).length / 200));

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        author={post.author}
        publishedDate={post.date}
        slug={slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      <AdminEditButton collection="blog-posts" documentSlug={slug} />

      {/* Hero */}
      <section className="relative min-h-[400px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={blogVideos[slug] || "https://assets.mixkit.co/videos/918/918-720.mp4"} type="video/mp4" /></video>
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
            <span className="inline-flex h-5 px-2 bg-white/20 text-white text-[10px] font-semibold rounded-full items-center backdrop-blur-sm">
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

      {/* Reading metadata bar */}
      <section className="py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="mx-auto max-w-[900px] px-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-white/60 font-medium">{readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <span className="text-xs text-white/60 font-medium">{post.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="text-xs text-white/60 font-medium">{post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute top-32 right-0 w-[180px] h-[180px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
        <div className="mx-auto max-w-[720px] px-6">
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className={`text-base text-text-secondary leading-relaxed ${i === 0 ? "first-letter:text-4xl first-letter:font-extrabold first-letter:text-text first-letter:float-left first-letter:mr-2 first-letter:leading-none" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-light-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
              Related articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-2xl border border-light-200 overflow-hidden hover:shadow-md hover:border-ale-200 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex h-5 px-2 bg-ale-50 text-ale text-[10px] font-semibold rounded-full items-center">
                        {r.category}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors leading-snug mb-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">{r.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-ale">
                      Read article
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dark gradient CTA */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-ale/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-500/15 rounded-full blur-[80px]" />
        <div className="relative mx-auto max-w-[720px] px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-4">
            Want to learn more?
          </h2>
          <p className="text-sm text-white/50 mb-6">
            Explore our solutions or contact our experts for a personalized assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex items-center h-10 px-6 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all shadow-lg shadow-ale/25"
            >
              Explore Solutions
            </Link>
            <Link
              href="/company/contact"
              className="inline-flex items-center h-10 px-6 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
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
              className="group flex items-center gap-3 max-w-[45%]"
            >
              <div className="w-9 h-9 rounded-full bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                <svg className="w-4 h-4 text-ale group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Previous</div>
                <div className="text-sm font-semibold text-text truncate group-hover:text-ale transition-colors">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex items-center gap-3 max-w-[45%] text-right"
            >
              <div className="min-w-0">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Next</div>
                <div className="text-sm font-semibold text-text truncate group-hover:text-ale transition-colors">{next.title}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-ale-50 flex items-center justify-center shrink-0 group-hover:bg-ale transition-colors">
                <svg className="w-4 h-4 text-ale group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}
