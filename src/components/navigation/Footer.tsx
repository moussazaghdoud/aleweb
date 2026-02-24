import Link from "next/link";

const footerLinks = [
  {
    heading: "Solutions",
    links: [
      { label: "Modernize Communications", href: "/solutions/modernize-communications" },
      { label: "Secure Your Network", href: "/solutions/secure-your-network" },
      { label: "Optimize with AI", href: "/solutions/optimize-with-ai" },
      { label: "Move to Cloud", href: "/solutions/move-to-cloud" },
      { label: "Enable Hybrid Work", href: "/solutions/enable-hybrid-work" },
      { label: "Connect Everything", href: "/solutions/connect-everything" },
      { label: "Business Continuity", href: "/solutions/business-continuity" },
      { label: "SD-WAN & SASE", href: "/solutions/sd-wan-sase" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Rainbow", href: "/platform/rainbow" },
      { label: "OmniSwitch", href: "/platform/omniswitch" },
      { label: "Stellar Wi-Fi", href: "/platform/stellar-wifi" },
      { label: "AI Ops", href: "/platform/ai-ops" },
      { label: "Private 5G", href: "/platform/private-5g" },
      { label: "OmniPCX Enterprise", href: "/platform/omnipcx-enterprise" },
      { label: "ALE Connect", href: "/platform/ale-connect" },
      { label: "All Products", href: "/platform" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About ALE", href: "/company/about" },
      { label: "Executive Team", href: "/company/executive-team" },
      { label: "Innovation", href: "/company/innovation" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Careers", href: "/company/careers" },
      { label: "ESG", href: "/company/esg" },
      { label: "Events", href: "/company/events" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/customers/case-studies" },
      { label: "Video Library", href: "/company/video-library" },
      { label: "Analyst Reports", href: "/company/analyst-reports" },
      { label: "Resources", href: "/resources" },
      { label: "Support", href: "/support" },
      { label: "Developers", href: "/developers" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    heading: "Partners",
    links: [
      { label: "Business Partners", href: "/partners/business-partners" },
      { label: "Consultants", href: "/partners/consultants" },
      { label: "Technology Partners", href: "/partners/technology-partners" },
      { label: "Find a Partner", href: "/partners" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      {/* CTA Band */}
      <div className="bg-ale text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to transform your enterprise?
          </h2>
          <p className="text-white/50 text-lg font-light mb-10 max-w-md mx-auto">
            Get a personalized assessment of how ALE can modernize your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/company/contact" className="inline-flex items-center justify-center h-12 px-8 bg-ale text-white font-semibold rounded-full hover:bg-ale-dark transition-all text-sm">
              Get Your Assessment
            </Link>
            <Link href="/company/contact" className="inline-flex items-center justify-center h-12 px-8 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-dark text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {footerLinks.map((g) => (
              <div key={g.heading}>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-4">{g.heading}</h3>
                <ul className="space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-[1320px] px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-ale flex items-center justify-center">
                  <span className="text-white font-extrabold text-[8px]">ALE</span>
                </div>
                <span className="text-xs text-white/30">&copy; {new Date().getFullYear()} Alcatel-Lucent Enterprise</span>
              </div>
              <div className="flex items-center gap-5">
                <Link href="/legal/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
                <Link href="/legal/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</Link>
                <Link href="/legal/cookies" className="text-xs text-white/30 hover:text-white/60 transition-colors">Cookies</Link>
                <Link href="/legal/trademarks" className="text-xs text-white/30 hover:text-white/60 transition-colors">Trademarks</Link>
                <Link href="/legal" className="text-xs text-white/30 hover:text-white/60 transition-colors">Legal</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
