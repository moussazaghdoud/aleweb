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
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Rainbow", href: "/platform/rainbow" },
      { label: "OmniSwitch", href: "/platform/omniswitch" },
      { label: "Stellar Wi-Fi", href: "/platform/stellar-wifi" },
      { label: "AI Ops", href: "/platform/ai-ops" },
      { label: "All Products", href: "/platform/all-products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About ALE", href: "/company/about" },
      { label: "Innovation", href: "/company/innovation" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Case Studies", href: "/customers/case-studies" },
      { label: "Documentation", href: "/resources/documentation" },
      { label: "Support", href: "/support" },
      { label: "Developers", href: "/developers" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      {/* CTA Band */}
      <div className="bg-ale-deep text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to transform your enterprise?
          </h2>
          <p className="text-white/50 text-lg font-light mb-10 max-w-md mx-auto">
            Get a personalized assessment of how ALE can modernize your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 bg-ale text-white font-semibold rounded-full hover:bg-ale-dark transition-all text-sm">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
                {["Privacy", "Terms", "Cookies"].map((l) => (
                  <Link key={l} href={`/legal/${l.toLowerCase()}`} className="text-xs text-white/30 hover:text-white/60 transition-colors">{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
