"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ================================================================== */
/*  CANVAS NETWORK — living, mouse-reactive particle network           */
/*  Three color-coded clusters (Network / Cloud / AI) with:            */
/*  - Drifting nodes with organic movement                             */
/*  - Dynamic connection lines between nearby nodes                    */
/*  - Bright data-packets traveling along connections                   */
/*  - Mouse proximity interaction (nodes attracted/repelled)           */
/*  - Depth layers (foreground + background) for parallax feel         */
/*  Pure Canvas API + requestAnimationFrame. Zero libraries.           */
/* ================================================================== */

/* Pillar colors — rgba tuples for canvas */
const COLORS = {
  network: { r: 59, g: 130, b: 246 },  // blue
  cloud:   { r: 147, g: 112, b: 219 }, // purple
  ai:      { r: 6, g: 182, b: 212 },   // cyan
};

type Cluster = "network" | "cloud" | "ai";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  cluster: Cluster;
  depth: number; // 0.4–1 (background to foreground)
  angle: number; // for orbital drift
  orbitSpeed: number;
  orbitRadius: number;
}

interface Packet {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  cluster: Cluster;
}

function createNodes(w: number, h: number): Node[] {
  const nodes: Node[] = [];
  const isMobile = w < 768;

  // Cluster centers — responsive positioning
  const clusters: { cluster: Cluster; cx: number; cy: number; count: number; spread: number }[] = isMobile
    ? [
        { cluster: "network", cx: w * 0.2, cy: h * 0.35, count: 12, spread: Math.min(w, h) * 0.18 },
        { cluster: "cloud",   cx: w * 0.5, cy: h * 0.25, count: 12, spread: Math.min(w, h) * 0.18 },
        { cluster: "ai",      cx: w * 0.8, cy: h * 0.35, count: 12, spread: Math.min(w, h) * 0.18 },
      ]
    : [
        { cluster: "network", cx: w * 0.22, cy: h * 0.48, count: 20, spread: Math.min(w, h) * 0.16 },
        { cluster: "cloud",   cx: w * 0.52, cy: h * 0.42, count: 18, spread: Math.min(w, h) * 0.15 },
        { cluster: "ai",      cx: w * 0.80, cy: h * 0.45, count: 18, spread: Math.min(w, h) * 0.15 },
      ];

  for (const c of clusters) {
    for (let i = 0; i < c.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * c.spread;
      const x = c.cx + Math.cos(angle) * dist;
      const y = c.cy + Math.sin(angle) * dist;
      const depth = 0.4 + Math.random() * 0.6;
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: (1.2 + Math.random() * 2.5) * depth,
        cluster: c.cluster,
        depth,
        angle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.0003 + Math.random() * 0.0008,
        orbitRadius: 8 + Math.random() * 25,
      });
    }
  }

  // Scatter ambient particles across the full canvas
  const ambientCount = isMobile ? 15 : 30;
  const clusterKeys: Cluster[] = ["network", "cloud", "ai"];
  for (let i = 0; i < ambientCount; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const depth = 0.2 + Math.random() * 0.4;
    nodes.push({
      x, y, baseX: x, baseY: y,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: (0.8 + Math.random() * 1.2) * depth,
      cluster: clusterKeys[i % 3],
      depth,
      angle: Math.random() * Math.PI * 2,
      orbitSpeed: 0.0002 + Math.random() * 0.0004,
      orbitRadius: 15 + Math.random() * 40,
    });
  }

  return nodes;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const connectionDistance = useRef(120);
  const mouseRadius = useRef(150);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sizeRef.current = { w, h };
    connectionDistance.current = Math.min(w, h) * 0.14;
    mouseRadius.current = Math.min(w, h) * 0.18;
    nodesRef.current = createNodes(w, h);
    packetsRef.current = [];
  }, []);

  useEffect(() => {
    init();

    const onResize = () => { init(); };
    window.addEventListener("resize", onResize);

    const onMouse = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);

    // Touch support
    const onTouch = (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    };
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, [init]);

  /* ── Animation loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastPacketSpawn = 0;

    function animate(time: number) {
      const { w, h } = sizeRef.current;
      if (!w || !h) { animRef.current = requestAnimationFrame(animate); return; }

      ctx!.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const connDist = connectionDistance.current;
      const mRadius = mouseRadius.current;

      /* ── Update nodes ── */
      for (const n of nodes) {
        // Orbital drift around base position
        n.angle += n.orbitSpeed;
        const targetX = n.baseX + Math.cos(n.angle) * n.orbitRadius;
        const targetY = n.baseY + Math.sin(n.angle * 0.7) * n.orbitRadius * 0.6;

        // Soft spring back toward orbit position
        n.vx += (targetX - n.x) * 0.008;
        n.vy += (targetY - n.y) * 0.008;

        // Mouse interaction — gentle attraction within radius
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mRadius && dist > 1) {
          const force = ((mRadius - dist) / mRadius) * 0.015 * n.depth;
          n.vx += dx / dist * force;
          n.vy += dy / dist * force;
        }

        // Damping
        n.vx *= 0.96;
        n.vy *= 0.96;

        n.x += n.vx;
        n.y += n.vy;

        // Soft bounds
        if (n.x < -20) n.vx += 0.1;
        if (n.x > w + 20) n.vx -= 0.1;
        if (n.y < -20) n.vy += 0.1;
        if (n.y > h + 20) n.vy -= 0.1;
      }

      /* ── Draw connections ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connDist) {
            const opacity = (1 - dist / connDist) * 0.35 * Math.min(a.depth, b.depth);
            const col = COLORS[a.cluster];
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${col.r},${col.g},${col.b},${opacity})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      /* ── Spawn data packets ── */
      if (time - lastPacketSpawn > 400 && packetsRef.current.length < 12) {
        lastPacketSpawn = time;
        // Pick two nearby nodes from any cluster
        const i = Math.floor(Math.random() * nodes.length);
        for (let attempt = 0; attempt < 10; attempt++) {
          const j = Math.floor(Math.random() * nodes.length);
          if (i === j) continue;
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (Math.sqrt(dx * dx + dy * dy) < connDist * 1.3) {
            packetsRef.current.push({
              fromIdx: i, toIdx: j,
              progress: 0,
              speed: 0.008 + Math.random() * 0.012,
              cluster: a.cluster,
            });
            break;
          }
        }
      }

      /* ── Draw & update packets ── */
      const packets = packetsRef.current;
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) { packets.splice(p, 1); continue; }
        const a = nodes[pkt.fromIdx], b = nodes[pkt.toIdx];
        const px = a.x + (b.x - a.x) * pkt.progress;
        const py = a.y + (b.y - a.y) * pkt.progress;
        const col = COLORS[pkt.cluster];
        // Glow
        ctx!.beginPath();
        ctx!.arc(px, py, 6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col.r},${col.g},${col.b},0.15)`;
        ctx!.fill();
        // Core
        ctx!.beginPath();
        ctx!.arc(px, py, 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col.r},${col.g},${col.b},0.9)`;
        ctx!.fill();
      }

      /* ── Draw nodes ── */
      for (const n of nodes) {
        const col = COLORS[n.cluster];
        // Outer glow
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.04 * n.depth})`;
        ctx!.fill();
        // Core
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.6 * n.depth})`;
        ctx!.fill();
      }

      /* ── Cluster core pulses ── */
      const isMobile = w < 768;
      const clusterCenters: { cluster: Cluster; cx: number; cy: number }[] = isMobile
        ? [
            { cluster: "network", cx: w * 0.2, cy: h * 0.35 },
            { cluster: "cloud",   cx: w * 0.5, cy: h * 0.25 },
            { cluster: "ai",      cx: w * 0.8, cy: h * 0.35 },
          ]
        : [
            { cluster: "network", cx: w * 0.22, cy: h * 0.48 },
            { cluster: "cloud",   cx: w * 0.52, cy: h * 0.42 },
            { cluster: "ai",      cx: w * 0.80, cy: h * 0.45 },
          ];

      for (let i = 0; i < clusterCenters.length; i++) {
        const cc = clusterCenters[i];
        const col = COLORS[cc.cluster];
        const pulse = 0.3 + 0.2 * Math.sin(time * 0.001 + i * 2.1);
        // Large soft glow
        const grad = ctx!.createRadialGradient(cc.cx, cc.cy, 0, cc.cx, cc.cy, connDist * 0.8);
        grad.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${pulse * 0.12})`);
        grad.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx!.beginPath();
        ctx!.arc(cc.cx, cc.cy, connDist * 0.8, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Pillar indicator badges                                            */
/* ------------------------------------------------------------------ */

const pillars = [
  { label: "Intelligent Networks", color: "bg-blue-500/20 text-blue-300 border-blue-400/30" },
  { label: "Cloud Services", color: "bg-purple-500/20 text-purple-300 border-purple-400/30" },
  { label: "AI Operations", color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" },
];

/* ------------------------------------------------------------------ */
/*  Main hero component                                                */
/* ------------------------------------------------------------------ */

export function HeroHomepage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1f] via-ale-deep to-[#0d1b2a]" />

        {/* Subtle radial glows behind each cluster area */}
        <div className="absolute top-[35%] left-[15%] w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[120px]" />
        <div className="absolute top-[28%] left-[45%] w-[350px] h-[350px] bg-purple-500/6 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[8%] w-[350px] h-[350px] bg-cyan-500/6 rounded-full blur-[120px]" />

        {/* Living network canvas */}
        <NetworkCanvas />

        {/* Top gradient for navbar blending */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0f0a1f]/80 to-transparent" />
        {/* Bottom gradient for section transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

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
            className={`mt-6 text-lg sm:text-xl text-white/65 max-w-2xl leading-relaxed font-light transition-all duration-700 delay-700 ${
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
