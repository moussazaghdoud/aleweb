"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { landingVideos } from "@/data/hero-videos";
import { GoalCaptureGlassPanel } from "./GoalCaptureGlassPanel";

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

const defaultHeading = "Intelligent Networks.\nSecure Cloud Communications.\nAI\u2011Driven Solutions for Every Industry.";
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

  const speed = 0.5;
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = speed;

    // Ping-pong: reverse direction at each end
    const onEnded = () => {
      directionRef.current = -1;
      // Play backward by stepping with requestAnimationFrame
      const stepBack = () => {
        if (!v || v.paused || directionRef.current !== -1) return;
        v.currentTime = Math.max(0, v.currentTime - (speed / 60));
        if (v.currentTime <= 0.05) {
          directionRef.current = 1;
          v.currentTime = 0;
          v.play();
          return;
        }
        requestAnimationFrame(stepBack);
      };
      v.pause();
      requestAnimationFrame(stepBack);
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  // Pause video when user starts typing in GoalCapture or ChatPanel
  useEffect(() => {
    const pause = () => {
      const v = videoRef.current;
      if (!v) return;
      directionRef.current = 0; // stop ping-pong too
      if (!v.paused) v.pause();
    };
    window.addEventListener("hero-video-pause", pause);
    return () => window.removeEventListener("hero-video-pause", pause);
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
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={resolvedVideoUrl} type="video/mp4" />
      </video>

      {/* ── Dark overlay for contrast ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* ── Content — two-column on desktop ── */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* ── Left column: headline + CTAs ── */}
          <div className="max-w-2xl">
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
              className={`text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-white leading-[1.1] tracking-tight transition-all duration-700 delay-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {headingText.includes('\n') ? (
                headingText.split('\n').map((line, i, arr) => {
                  const aiMatch = line.match(/^(AI[\u2011\u2010-]Driven)\s*(.*)$/);
                  return (
                    <span key={i}>
                      {aiMatch ? (
                        <>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                            {aiMatch[1]}
                          </span>
                          {aiMatch[2] && <span className="text-white/90">{' '}{aiMatch[2]}</span>}
                        </>
                      ) : (
                        line
                      )}
                      {i < arr.length - 1 && <br />}
                    </span>
                  );
                })
              ) : (
                headingText
              )}
            </h1>

            {/* Subheading */}
            <p
              className={`mt-6 text-lg sm:text-xl text-white/75 max-w-xl leading-relaxed font-light transition-all duration-700 delay-700 ${
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

          {/* ── Right column: Goal Capture Glass Panel ── */}
          <div
            className={`flex justify-center lg:justify-start transition-all duration-800 ease-out delay-[1300ms] ${
              visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]"
            }`}
          >
            <GoalCaptureGlassPanel />
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
