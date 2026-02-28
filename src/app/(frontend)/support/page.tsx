import Link from "next/link";
import { landingVideos } from "@/data/hero-videos";

const colorSchemes = [
  { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-500", hover: "hover:border-blue-200" },
  { bg: "bg-purple-50", border: "border-purple-100", icon: "text-purple-500", hover: "hover:border-purple-200" },
  { bg: "bg-cyan-50", border: "border-cyan-100", icon: "text-cyan-500", hover: "hover:border-cyan-200" },
  { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-500", hover: "hover:border-amber-200" },
  { bg: "bg-green-50", border: "border-green-100", icon: "text-green-500", hover: "hover:border-green-200" },
  { bg: "bg-rose-50", border: "border-rose-100", icon: "text-rose-500", hover: "hover:border-rose-200" },
];

const supportLinks = [
  {
    title: "Technical Support Portal",
    description: "Access product documentation, user guides, software downloads, and open support tickets for your ALE products.",
    href: "https://businessportal.al-enterprise.com/",
    icon: "M11.42 15.17l-5.1-3.06A1.5 1.5 0 004.5 13.5v4.586a1.5 1.5 0 00.612 1.21l4.383 3.237a1.5 1.5 0 001.81.053l5.175-3.806a1.5 1.5 0 00.612-1.21V13.5a1.5 1.5 0 00-1.82-1.465l-4.85 1.135zM20.25 7.5l-8.25 4.857",
  },
  {
    title: "Security Advisories",
    description: "Stay informed about security vulnerabilities, patches, and best practices for securing your ALE infrastructure.",
    href: "https://www.al-enterprise.com/en-na/security-advisories",
    icon: "M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Product Manuals & Guides",
    description: "Download installation guides, configuration manuals, and quick-start documentation for OmniSwitch, Stellar, Rainbow, and more.",
    href: "https://www.al-enterprise.com/en-na/documentation",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    title: "Software Downloads",
    description: "Access the latest firmware, software updates, and release notes for your ALE networking and communications products.",
    href: "https://businessportal.al-enterprise.com/",
    icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  },
  {
    title: "Training & Certification",
    description: "Enroll in ALE training programs and earn certifications across networking, communications, and cloud solutions.",
    href: "https://www.al-enterprise.com/en-na/training",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  },
  {
    title: "Community & Forums",
    description: "Connect with ALE experts and peers to share knowledge, ask questions, and find solutions to common challenges.",
    href: "https://myportal.al-enterprise.com/",
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
  },
];

export const metadata = {
  title: "Support",
  description: "ALE technical support, documentation, software downloads, training, and security advisories.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Support | Alcatel-Lucent Enterprise",
    description: "ALE technical support, documentation, software downloads, training, and security advisories.",
    type: "website" as const,
    url: "/support",
  },
};

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"><source src={landingVideos.support} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale-300 mb-3 block">
            Support
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            We&apos;re here to help
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Access documentation, downloads, training, and technical support to keep your ALE infrastructure running at its best.
          </p>
        </div>
      </section>

      {/* Support links */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-20 right-0 w-[200px] h-[200px] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportLinks.map((link, i) => {
              const color = colorSchemes[i % colorSchemes.length];
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-6 rounded-2xl border ${color.border} ${color.hover} hover:shadow-md transition-all`}
                >
                  <div className={`w-11 h-11 rounded-xl ${color.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <svg className={`w-5 h-5 ${color.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors mb-2">
                    {link.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{link.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick help CTA */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-ale/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-500/15 rounded-full blur-[80px]" />
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Can&apos;t find what you need?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8">
            Our support team is available to help resolve your issue quickly.
          </p>
          <Link
            href="/company/contact"
            className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all shadow-lg shadow-ale/25"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}
