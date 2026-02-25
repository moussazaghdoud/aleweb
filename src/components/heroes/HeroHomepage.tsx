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

type CtaButton = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  id?: string;
};

type Props = {
  heading?: string | null;
  subheading?: string | null;
  videoUrl?: string | null;
  ctaButtons?: CtaButton[] | null;
};

const defaultHeading = "Intelligent Networks.\nCloud Services. AI\u00a0Operations.\nOne Platform.";
const defaultSubheading =
  "From OmniSwitch infrastructure and Stellar\u00a0Wi-Fi to Rainbow cloud\u00a0communications and AI\u2011driven operations\u00a0— ALE\u00a0connects, secures, and automates the enterprises that power the\u00a0world.";
const defaultCtas: CtaButton[] = [
  { label: "Explore the Platform", href: "/platform", variant: "primary" },
  { label: "Browse Products", href: "/products", variant: "secondary" },
];

export function HeroHomepage({ heading, subheading, videoUrl, ctaButtons }: Props) {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  const resolvedVideoUrl = videoUrl || landingVideos.home;
  const resolvedCtas = ctaButtons?.length ? ctaButtons : defaultCtas;

  // Parse heading into lines for the gradient effect on last part
  const headingText = heading || defaultHeading;
  const subheadingText = subheading || defaultSubheading;

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
        <source src={resolvedVideoUrl} type="video/mp4" />
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
            {headingText.includes('\n') ? (
              headingText.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="text-white/90">{line}</span>
                  ) : i === 1 ? (
                    <>
                      {line.replace(/AI\s*Operations\.?/, '')}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                        AI&nbsp;Operations.
                      </span>
                    </>
                  ) : (
                    line
                  )}
                  {i < arr.length - 1 && <br />}
                </span>
              ))
            ) : (
              headingText
            )}
          </h1>

          {/* Subheading */}
          <p
            className={`mt-6 text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed font-light transition-all duration-700 delay-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {subheadingText}
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-[900ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {resolvedCtas.map((cta, i) =>
              cta.variant === 'secondary' ? (
                <Link
                  key={cta.id ?? i}
                  href={cta.href}
                  className="inline-flex items-center gap-2 h-13 px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  {cta.label}
                </Link>
              ) : (
                <Link
                  key={cta.id ?? i}
                  href={cta.href}
                  className="group inline-flex items-center gap-2 h-13 px-8 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all duration-300 hover:shadow-lg hover:shadow-ale/30"
                >
                  {cta.label}
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
              ),
            )}
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
