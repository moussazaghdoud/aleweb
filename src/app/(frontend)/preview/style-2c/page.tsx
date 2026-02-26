import Link from "next/link";

const pillars = [
  {
    id: "network",
    label: "Intelligent Networks",
    color: "blue" as const,
    headline: "Software-defined, autonomous, secure",
    description:
      "From campus switches and Wi-Fi 7 to industrial networks and SD-WAN — a unified, AI-managed network fabric that self-heals, auto-segments, and protects.",
    products: ["OmniSwitch (14 models)", "Stellar Wi-Fi (20+ APs)", "Private 5G", "SD-WAN & SASE"],
    stats: [
      { value: "29M+", label: "IoT fingerprints" },
      { value: "1 OS", label: "edge to core" },
    ],
    href: "/solutions/secure-your-network",
  },
  {
    id: "cloud",
    label: "Cloud-Native Services",
    color: "purple" as const,
    headline: "UCaaS, CCaaS, CPaaS — everything as a service",
    description:
      "Rainbow cloud communications, OmniPCX Enterprise telephony, ALE Connect contact center, OXO Connect for SMB, and Purple on Demand subscriptions.",
    products: ["Rainbow", "OmniPCX Enterprise", "ALE Connect", "OXO Connect", "Purple on Demand"],
    stats: [
      { value: "3M+", label: "daily users" },
      { value: "99.999%", label: "uptime" },
    ],
    href: "/solutions/move-to-cloud",
  },
  {
    id: "ai",
    label: "AI-Powered Operations",
    color: "cyan" as const,
    headline: "Predictive, automated, intelligent",
    description:
      "AI isn't a product — it's an intelligence layer across the entire platform. From predictive network analytics to IoT fingerprinting and automated threat response.",
    products: ["OmniVista AI Ops", "IoT Analytics", "Threat Detection", "Auto-Healing Networks"],
    stats: [
      { value: "70%", label: "faster resolution" },
      { value: "AI/ML", label: "across the stack" },
    ],
    href: "/solutions/optimize-with-ai",
  },
];

const colorConfig = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-100 hover:border-blue-300",
    dot: "bg-blue-500",
    numberBg: "bg-blue-500",
    tag: "bg-white text-blue-700",
    stat: "text-blue-600",
    statLabel: "text-blue-400",
    barBg: "bg-blue-500",
    cta: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-50/50",
    border: "border-purple-100 hover:border-purple-300",
    dot: "bg-purple-500",
    numberBg: "bg-purple-500",
    tag: "bg-white text-purple-700",
    stat: "text-purple-600",
    statLabel: "text-purple-400",
    barBg: "bg-purple-500",
    cta: "bg-purple-500 hover:bg-purple-600 text-white",
  },
  cyan: {
    gradient: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50/50",
    border: "border-cyan-100 hover:border-cyan-300",
    dot: "bg-cyan-500",
    numberBg: "bg-cyan-500",
    tag: "bg-white text-cyan-700",
    stat: "text-cyan-600",
    statLabel: "text-cyan-400",
    barBg: "bg-cyan-500",
    cta: "bg-cyan-500 hover:bg-cyan-600 text-white",
  },
};

export default function StylePreview2C() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Style 2C — Tinted Card + Colored Bottom Bar</h1>
          <div className="flex gap-3">
            <Link href="/preview/style-2a" className="text-xs font-semibold text-blue-600 hover:underline">← View 2A</Link>
            <Link href="/preview/style-2b" className="text-xs font-semibold text-purple-600 hover:underline">← View 2B</Link>
          </div>
        </div>
      </div>

      {/* Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-3">One integrated platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Three pillars. One digital infrastructure.
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              ALE unifies intelligent networks, cloud-native services, and AI-powered operations into a single enterprise platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {pillars.map((p, idx) => {
              const c = colorConfig[p.color];
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className={`group relative flex flex-col rounded-2xl ${c.bg} border ${c.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden`}
                >
                  {/* Top section with number + label */}
                  <div className="p-7 pb-0">
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`w-8 h-8 rounded-lg ${c.numberBg} flex items-center justify-center text-white text-sm font-bold`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">{p.label}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{p.headline}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.description}</p>

                    {/* Products as white tag chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.products.map((prod) => (
                        <span key={prod} className={`text-[11px] font-semibold rounded-lg px-3 py-1.5 shadow-sm ${c.tag}`}>
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom bar with stats */}
                  <div className={`mt-auto bg-gradient-to-r ${c.gradient} px-7 py-5`}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-8">
                        {p.stats.map((s) => (
                          <div key={s.label}>
                            <div className="text-xl font-extrabold text-white">{s.value}</div>
                            <div className="text-[11px] text-white/70">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
