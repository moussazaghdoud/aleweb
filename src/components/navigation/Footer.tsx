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
      { label: "SD-WAN & SASE", href: "/solutions/sd-wan-sase" },
      { label: "Enterprise Wi-Fi", href: "/solutions/wifi-solutions" },
      { label: "Mission Critical Networks", href: "/solutions/mission-critical-networks" },
      { label: "All Solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "OmniSwitch", href: "/platform/omniswitch" },
      { label: "Stellar Wi-Fi", href: "/platform/stellar-wifi" },
      { label: "Rainbow", href: "/platform/rainbow" },
      { label: "OmniPCX Enterprise", href: "/platform/omnipcx-enterprise" },
      { label: "ALE Connect", href: "/platform/ale-connect" },
      { label: "OmniVista AI Ops", href: "/platform/ai-ops" },
      { label: "Private 5G", href: "/platform/private-5g" },
      { label: "OXO Connect", href: "/platform/oxo-connect" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Education", href: "/industries/education" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Government", href: "/industries/government" },
      { label: "Transportation", href: "/industries/transportation" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Energy & Utilities", href: "/industries/energy" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About ALE", href: "/company/about" },
      { label: "Executive Team", href: "/company/executive-team" },
      { label: "History", href: "/company/history" },
      { label: "Awards", href: "/company/awards" },
      { label: "Innovation", href: "/company/innovation" },
      { label: "Careers", href: "/company/careers" },
      { label: "ESG", href: "/company/esg" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/customers/case-studies" },
      { label: "Services", href: "/services" },
      { label: "Video Library", href: "/company/video-library" },
      { label: "Partners", href: "/partners" },
      { label: "Support", href: "/support" },
      { label: "Events", href: "/company/events" },
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
                <span className="text-xs text-white/50">&copy; {new Date().getFullYear()} Alcatel-Lucent Enterprise</span>
              </div>
              <div className="flex items-center gap-5">
                <Link href="/legal/privacy" className="text-xs text-white/50 hover:text-white/70 transition-colors">Privacy</Link>
                <Link href="/legal/terms" className="text-xs text-white/50 hover:text-white/70 transition-colors">Terms</Link>
                <Link href="/legal/cookies" className="text-xs text-white/50 hover:text-white/70 transition-colors">Cookies</Link>
                <Link href="/legal/trademarks" className="text-xs text-white/50 hover:text-white/70 transition-colors">Trademarks</Link>
                <Link href="/legal" className="text-xs text-white/50 hover:text-white/70 transition-colors">Legal</Link>
                <span className="w-px h-3 bg-white/10" />
                <a href="https://www.linkedin.com/company/alcatel-lucent-enterprise/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white/70 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://twitter.com/ALaboratories" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-white/40 hover:text-white/70 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://www.youtube.com/user/oaboratories" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/40 hover:text-white/70 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
