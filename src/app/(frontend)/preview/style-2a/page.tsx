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

const gradients = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  cyan: "from-cyan-500 to-cyan-600",
};

const accents = {
  blue: { badge: "bg-blue-100 text-blue-700", stat: "text-blue-600", statBg: "bg-blue-50 border-blue-100", check: "text-blue-500" },
  purple: { badge: "bg-purple-100 text-purple-700", stat: "text-purple-600", statBg: "bg-purple-50 border-purple-100", check: "text-purple-500" },
  cyan: { badge: "bg-cyan-100 text-cyan-700", stat: "text-cyan-600", statBg: "bg-cyan-50 border-cyan-100", check: "text-cyan-500" },
};

export default function StylePreview2A() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Style 2A — Classic Gradient Banner</h1>
          <div className="flex gap-3">
            <Link href="/preview/style-2b" className="text-xs font-semibold text-purple-600 hover:underline">View 2B →</Link>
            <Link href="/preview/style-2c" className="text-xs font-semibold text-cyan-600 hover:underline">View 2C →</Link>
          </div>
        </div>
      </div>

      {/* Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              const grad = gradients[p.color];
              const a = accents[p.color];
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className="group relative flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
                >
                  {/* Gradient banner */}
                  <div className={`h-2 bg-gradient-to-r ${grad}`} />

                  <div className="flex flex-col flex-1 p-7">
                    {/* Badge */}
                    <span className={`inline-flex items-center self-start gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full ${a.badge} mb-5`}>
                      {p.label}
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{p.headline}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.description}</p>

                    {/* Products as check pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.products.map((prod) => (
                        <span key={prod} className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                          <svg className={`w-3 h-3 ${a.check}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {prod}
                        </span>
                      ))}
                    </div>

                    {/* Stats at bottom */}
                    <div className="mt-auto flex gap-3">
                      {p.stats.map((s) => (
                        <div key={s.label} className={`flex-1 rounded-xl border ${a.statBg} p-3 text-center`}>
                          <div className={`text-lg font-bold ${a.stat}`}>{s.value}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
                        </div>
                      ))}
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
