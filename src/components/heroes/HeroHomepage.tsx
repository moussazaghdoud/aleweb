"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { landingVideos } from "@/data/hero-videos";

/* ── Pillar indicator badges ── */
const pillars = [
  { label: "Intelligent Networks", color: "bg-blue-500/20 text-blue-300 border-blue-400/30" },
  { label: "Cloud Services", color: "bg-purple-500/20 text-purple-300 border-purple-400/30" },
  { label: "AI Operations", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" },
];

export function HeroHomepage() {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={landingVideos.home} type="video/mp4" />
      </video>

      {/* ── Dark overlay for contrast — left-to-right gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full">
        <div className="max-w-3xl">
          {/* Pillar badges */}
          <div
            className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {pillars.map((p) => (
              <span
                key={p.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide uppercase border rounded-full ${p.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                {p.label}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white leading-[1.08] tracking-tight transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Intelligent Networks.
            <br />
            Cloud Services.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              AI&nbsp;Operations.
            </span>
            <br />
            <span className="text-white/90">One Platform.</span>
          </h1>

          {/* Subheading */}
          <p
            className={`mt-6 text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed font-light transition-all duration-700 delay-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            From OmniSwitch infrastructure and Stellar&nbsp;Wi-Fi to Rainbow
            cloud&nbsp;communications and AI&#8209;driven operations&nbsp;—
            ALE&nbsp;connects, secures, and automates the enterprises that power
            the&nbsp;world.
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-[900ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/platform"
              className="group inline-flex items-center gap-2 h-13 px-8 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all duration-300 hover:shadow-lg hover:shadow-ale/30"
            >
              Explore the Platform
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-13 px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
