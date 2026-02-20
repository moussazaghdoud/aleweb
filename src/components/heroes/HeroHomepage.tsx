"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const words = ["healthcare", "education", "hospitality", "government", "transportation", "manufacturing"];

export function HeroHomepage() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Full-width animated background — brighter network globe */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover animate-kenburns"
          priority
        />
        {/* Lighter overlays — keep the brightness */}
        <div className="absolute inset-0 bg-gradient-to-r from-ale-deep/60 via-ale-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-ale-deep/20" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-ale-300/30 rounded-full animate-float-1" />
          <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float-2" />
          <div className="absolute bottom-[30%] left-[40%] w-2.5 h-2.5 bg-white/15 rounded-full animate-float-3" />
          <div className="absolute top-[60%] right-[35%] w-1 h-1 bg-ale-300/25 rounded-full animate-float-1" />
          <div className="absolute top-[15%] right-[45%] w-2 h-2 bg-white/10 rounded-full animate-float-2" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight drop-shadow-lg">
            Enterprise technology
            <br />
            that transforms{" "}
            <span className={`inline-block text-ale-200 transition-all duration-400 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              {words[index]}
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-md leading-relaxed font-light drop-shadow">
            Cloud communications, AI-driven networking, and secure infrastructure
            for the industries that power the world.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/solutions" className="inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30">
              Explore Solutions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/platform" className="inline-flex items-center gap-2 h-12 px-7 bg-white/15 backdrop-blur border border-white/25 text-white text-sm font-semibold rounded-full hover:bg-white/25 transition-all">
              Discover the Platform
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
