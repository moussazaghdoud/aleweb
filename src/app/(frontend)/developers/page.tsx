import Link from "next/link";
import { IconCode, IconChat, IconCloud, IconAI } from "@/components/primitives/Icons";
import { landingVideos } from "@/data/hero-videos";

const apis = [
  {
    name: "Rainbow CPaaS",
    description: "Embed real-time voice, video, messaging, and presence into your applications with Rainbow APIs and SDKs.",
    Icon: IconChat,
    features: ["REST APIs", "WebRTC SDK", "Mobile SDKs", "Webhooks"],
  },
  {
    name: "OmniVista REST API",
    description: "Automate network operations, monitoring, and provisioning through the OmniVista management platform API.",
    Icon: IconCloud,
    features: ["Network provisioning", "Device management", "Analytics", "Alerting"],
  },
  {
    name: "IoT Connector APIs",
    description: "Connect IoT devices and sensors to enterprise workflows with automated onboarding and data processing.",
    Icon: IconAI,
    features: ["Device discovery", "Data streams", "Rule engine", "Automation"],
  },
];

export const metadata = {
  title: "Developers",
  description: "Build on the ALE platform with Rainbow CPaaS APIs, OmniVista REST APIs, and IoT connectors.",
};

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.developers} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Developers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Build on the ALE platform
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            APIs, SDKs, and developer tools to integrate enterprise communications, networking, and IoT into your applications.
          </p>
        </div>
      </section>

      {/* APIs */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {apis.map((api) => (
              <div
                key={api.name}
                className="p-6 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-ale-50 flex items-center justify-center mb-4">
                  <api.Icon className="w-5 h-5 text-ale" />
                </div>
                <h2 className="text-base font-bold text-text mb-2">{api.name}</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{api.description}</p>
                <div className="flex flex-wrap gap-2">
                  {api.features.map((f) => (
                    <span key={f} className="text-[11px] font-medium text-text-muted bg-light-100 rounded-full px-2.5 py-0.5">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting started */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-10">
            Get started
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Create an Account", desc: "Sign up for a free Rainbow developer account to access APIs, documentation, and sandbox environments." },
              { step: "02", title: "Explore the Docs", desc: "Browse API references, quick-start guides, and sample code to accelerate your integration." },
              { step: "03", title: "Build & Deploy", desc: "Develop your integration, test in the sandbox, and deploy to production with full enterprise support." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-gray-100 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-gray-300">{s.step}</span>
                  <div className="h-5 w-px bg-gray-300 rounded-full" />
                  <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to start building?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Join the ALE developer community and start integrating enterprise communications today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Get Developer Access
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
