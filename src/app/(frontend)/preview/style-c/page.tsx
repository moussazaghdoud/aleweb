import Link from "next/link";

const pillars = [
  {
    id: "network",
    label: "Intelligent Networks",
    headline: "Software-defined, autonomous, secure",
    description:
      "From campus switches and Wi-Fi 7 to industrial networks and SD-WAN — a unified, AI-managed network fabric that self-heals, auto-segments, and protects.",
    products: ["OmniSwitch (14 models)", "Stellar Wi-Fi (20+ APs)", "Private 5G", "SD-WAN & SASE"],
    stats: [
      { value: "29M+", label: "IoT fingerprints" },
      { value: "1 OS", label: "edge to core" },
    ],
    href: "/solutions/secure-your-network",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
    iconColor: "text-blue-400",
    statColor: "text-blue-400",
    ringColor: "ring-blue-100",
    hoverRing: "hover:ring-blue-200",
  },
  {
    id: "cloud",
    label: "Cloud-Native Services",
    headline: "UCaaS, CCaaS, CPaaS — everything as a service",
    description:
      "Rainbow cloud communications, OmniPCX Enterprise telephony, ALE Connect contact center, OXO Connect for SMB, and Purple on Demand subscriptions.",
    products: ["Rainbow", "OmniPCX Enterprise", "ALE Connect", "OXO Connect", "Purple on Demand"],
    stats: [
      { value: "3M+", label: "daily users" },
      { value: "99.999%", label: "uptime" },
    ],
    href: "/solutions/move-to-cloud",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    gradient: "from-purple-500 to-fuchsia-600",
    iconColor: "text-purple-400",
    statColor: "text-purple-400",
    ringColor: "ring-purple-100",
    hoverRing: "hover:ring-purple-200",
  },
  {
    id: "ai",
    label: "AI-Powered Operations",
    headline: "Predictive, automated, intelligent",
    description:
      "AI isn't a product — it's an intelligence layer across the entire platform. From predictive network analytics to IoT fingerprinting and automated threat response.",
    products: ["OmniVista AI Ops", "IoT Analytics", "Threat Detection", "Auto-Healing Networks"],
    stats: [
      { value: "70%", label: "faster resolution" },
      { value: "AI/ML", label: "across the stack" },
    ],
    href: "/solutions/optimize-with-ai",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-600",
    iconColor: "text-cyan-400",
    statColor: "text-cyan-400",
    ringColor: "ring-cyan-100",
    hoverRing: "hover:ring-cyan-200",
  },
];

export default function StylePreviewC() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Style C — Icon-Led Minimal Cards</h1>
          <div className="flex gap-3">
            <Link href="/preview/style-a" className="text-xs font-semibold text-blue-600 hover:underline">← View A</Link>
            <Link href="/preview/style-b" className="text-xs font-semibold text-purple-600 hover:underline">← View B</Link>
          </div>
        </div>
      </div>

      {/* Section — same dark bg as homepage */}
      <section className="py-20 bg-gradient-to-b from-gray-800 via-gray-700 to-white relative overflow-hidden">
        {/* Subtle glow blobs */}
        <div className="absolute top-0 left-[15%] w-[400px] h-[300px] bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-[42%] w-[350px] h-[300px] bg-purple-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-[12%] w-[350px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-white/50 mb-3">One integrated platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Three pillars. One digital infrastructure.
            </h2>
            <p className="mt-4 text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              ALE unifies intelligent networks, cloud-native services, and AI-powered operations into a single enterprise platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className={`group text-center p-8 rounded-3xl bg-white/10 backdrop-blur-sm ring-1 ring-white/10 hover:bg-white/15 hover:ring-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Large icon */}
                <div className={`${p.iconColor} mx-auto mb-6 w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {p.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{p.label}</h3>
                <p className="text-sm font-medium text-white/50 mb-4">{p.headline}</p>
                <p className="text-sm text-white/60 leading-relaxed mb-6">{p.description}</p>

                {/* Stats row */}
                <div className="flex justify-center gap-8 py-4 border-t border-white/10">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <div className={`text-2xl font-extrabold ${p.statColor}`}>{s.value}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${p.iconColor} group-hover:gap-3 transition-all`}>
                    Explore
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
