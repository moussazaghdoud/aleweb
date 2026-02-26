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
    gradient: "from-blue-600 via-blue-500 to-indigo-500",
    iconBg: "bg-white/20",
    tag: "bg-blue-50 text-blue-700 border-blue-200",
    stat: "text-blue-600",
    statBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    arrow: "text-blue-500 group-hover:text-blue-600",
  },
  purple: {
    gradient: "from-purple-600 via-purple-500 to-fuchsia-500",
    iconBg: "bg-white/20",
    tag: "bg-purple-50 text-purple-700 border-purple-200",
    stat: "text-purple-600",
    statBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
    arrow: "text-purple-500 group-hover:text-purple-600",
  },
  cyan: {
    gradient: "from-cyan-600 via-cyan-500 to-teal-500",
    iconBg: "bg-white/20",
    tag: "bg-cyan-50 text-cyan-700 border-cyan-200",
    stat: "text-cyan-600",
    statBg: "bg-gradient-to-br from-cyan-50 to-teal-50",
    arrow: "text-cyan-500 group-hover:text-cyan-600",
  },
};

const pillarIcons = {
  network: (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  cloud: (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  ai: (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

export default function StylePreview2B() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Style 2B — Tall Gradient Header + Icon</h1>
          <div className="flex gap-3">
            <Link href="/preview/style-2a" className="text-xs font-semibold text-blue-600 hover:underline">← View 2A</Link>
            <Link href="/preview/style-2c" className="text-xs font-semibold text-cyan-600 hover:underline">View 2C →</Link>
          </div>
        </div>
      </div>

      {/* Section */}
      <section className="py-20 bg-gray-50/50">
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
            {pillars.map((p) => {
              const c = colorConfig[p.color];
              const icon = pillarIcons[p.id as keyof typeof pillarIcons];
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className="group relative flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Tall gradient header with icon */}
                  <div className={`relative bg-gradient-to-br ${c.gradient} px-7 pt-7 pb-10`}>
                    <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center mb-4`}>
                      {icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{p.label}</h3>
                    <p className="text-sm text-white/75 mt-1">{p.headline}</p>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-7 -mt-4">
                    {/* Overlapping stat cards */}
                    <div className="flex gap-3 mb-6">
                      {p.stats.map((s) => (
                        <div key={s.label} className={`flex-1 rounded-xl ${c.statBg} shadow-sm p-3 text-center`}>
                          <div className={`text-lg font-extrabold ${c.stat}`}>{s.value}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.description}</p>

                    {/* Product tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.products.map((prod) => (
                        <span key={prod} className={`text-[11px] font-medium border rounded-full px-2.5 py-0.5 ${c.tag}`}>
                          {prod}
                        </span>
                      ))}
                    </div>

                    {/* Explore link */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.arrow} transition-colors`}>
                        Explore
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
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
