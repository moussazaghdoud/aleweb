"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/cms";

interface BlogClientProps {
  blogData: BlogPost[];
  blogCategories: string[];
}

export default function BlogClient({ blogData, blogCategories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogData
      : blogData.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src="https://assets.mixkit.co/videos/4809/4809-720.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Blog
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light">
            Insights, trends, and expertise from Alcatel-Lucent Enterprise.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-6 bg-white border-b border-light-200 sticky top-[72px] z-30">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 h-8 px-4 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-ale text-white"
                    : "bg-light-100 text-text-secondary hover:bg-light-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          {filtered.length === 0 ? (
            <p className="text-text-muted text-center py-20">No posts in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-light-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex h-5 px-2 bg-ale-50 text-ale text-[10px] font-semibold rounded-full items-center">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-text group-hover:text-ale transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
