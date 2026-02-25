"use client";

/**
 * HeroVideo — Looping background video for hero banners.
 * Renders a muted autoplay video that covers the parent container.
 * Falls back gracefully: if the video fails to load the gradient overlay
 * still provides a usable background.
 */
export function HeroVideo({ src }: { src: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Themed video URLs from Mixkit (free, no attribution required) */
export const heroVideos = {
  network: "https://assets.mixkit.co/videos/32989/32989-720.mp4",
  business: "https://assets.mixkit.co/videos/4809/4809-720.mp4",
  dataCenter: "https://assets.mixkit.co/videos/23282/23282-720.mp4",
  healthcare: "https://assets.mixkit.co/videos/48385/48385-720.mp4",
  city: "https://assets.mixkit.co/videos/49845/49845-720.mp4",
  teamwork: "https://assets.mixkit.co/videos/46755/46755-720.mp4",
  code: "https://assets.mixkit.co/videos/9757/9757-720.mp4",
  support: "https://assets.mixkit.co/videos/22987/22987-720.mp4",
} as const;
