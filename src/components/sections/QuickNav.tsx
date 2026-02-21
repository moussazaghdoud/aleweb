import Link from "next/link";
import Image from "next/image";
import {
  IconChat, IconShield, IconAI, IconCloud, IconSignal, IconGlobe,
  IconHealthcare, IconEducation, IconHospitality, IconGovernment,
  IconManufacturing, IconEnergy,
} from "@/components/primitives/Icons";
import { blogData } from "@/data/blog";

/* ───────────────────── data ───────────────────── */

const showcases = [
  {
    label: "Communications",
    title: "Cloud communications built for the AI era",
    description:
      "Rainbow delivers enterprise-grade voice, video, messaging, and conferencing — with GDPR compliance and data sovereignty guarantees. From UCaaS to CPaaS, connect every conversation across every channel.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&q=80",
    href: "/solutions/modernize-communications",
    stats: [
      { value: "3M+", label: "daily users" },
      { value: "100+", label: "countries" },
    ],
  },
  {
    label: "Networking",
    title: "Autonomous networks that secure and simplify",
    description:
      "A single hardened OS from edge to core, AI-driven analytics, and automated IoT onboarding — OmniSwitch and OmniAccess Stellar create self-healing network fabrics that reduce complexity and eliminate threats.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80",
    href: "/solutions/secure-your-network",
    stats: [
      { value: "29M+", label: "IoT fingerprints" },
      { value: "1 OS", label: "edge to core" },
    ],
  },
  {
    label: "AI & Automation",
    title: "AI Ops that prevent problems before they happen",
    description:
      "OmniVista Network Advisor uses machine learning to anticipate issues, automate remediation, and deliver real-time insights — transforming reactive IT into proactive, intelligent operations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&q=80",
    href: "/solutions/optimize-with-ai",
    stats: [
      { value: "70%", label: "faster resolution" },
      { value: "AI/ML", label: "powered" },
    ],
  },
];

const productCategories = [
  { name: "Switches", slug: "switches", icon: "🔀", count: "14 models" },
  { name: "Wireless LAN", slug: "wlan", icon: "📡", count: "16 models" },
  { name: "Phones & Devices", slug: "devices", icon: "📞", count: "8 models" },
  { name: "Applications", slug: "applications", icon: "💬", count: "5 products" },
  { name: "Management", slug: "management", icon: "📊", count: "4 tools" },
  { name: "Platforms", slug: "platforms", icon: "☁️", count: "3 platforms" },
];

const solutions = [
  { Icon: IconChat, title: "Communications", desc: "Rainbow, OmniPCX, UCaaS", href: "/solutions/modernize-communications" },
  { Icon: IconShield, title: "Networking", desc: "OmniSwitch, Wi-Fi, SD-WAN", href: "/solutions/secure-your-network" },
  { Icon: IconAI, title: "AI & Automation", desc: "AI Ops, IoT, Analytics", href: "/solutions/optimize-with-ai" },
  { Icon: IconCloud, title: "Cloud & XaaS", desc: "Migration, hybrid, as-a-service", href: "/solutions/move-to-cloud" },
  { Icon: IconSignal, title: "Private 5G & IoT", desc: "Connectivity for critical ops", href: "/solutions/connect-everything" },
  { Icon: IconGlobe, title: "Hybrid Work", desc: "Collaboration from anywhere", href: "/solutions/enable-hybrid-work" },
];

const industries = [
  { Icon: IconHealthcare, name: "Healthcare", desc: "Connected care pathways", href: "/industries/healthcare", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
  { Icon: IconEducation, name: "Education", desc: "Smart campus connectivity", href: "/industries/education", image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&q=80" },
  { Icon: IconHospitality, name: "Hospitality", desc: "Digital guest experience", href: "/industries/hospitality", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
  { Icon: IconGovernment, name: "Government", desc: "Secure public services", href: "/industries/government", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80" },
  { Icon: IconManufacturing, name: "Manufacturing", desc: "Industry 4.0 networks", href: "/industries/manufacturing", image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80" },
  { Icon: IconEnergy, name: "Energy & Utilities", desc: "Ruggedized infrastructure", href: "/industries/energy", image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80" },
];

const trustStats = [
  { value: "1M+", label: "Enterprise users worldwide" },
  { value: "50+", label: "Countries served" },
  { value: "3,400+", label: "Certified partners" },
  { value: "830K+", label: "Customer locations" },
  { value: "100+", label: "Years of innovation" },
];

const latestPosts = blogData.slice(0, 3);

/* ───────────────────── component ───────────────────── */

export function QuickNav() {
  return (
    <>
      {/* ─── 1. Quick Solutions Bar ─── */}
      <section className="py-6 bg-white border-b border-light-200 sticky top-[72px] z-30">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
            {solutions.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group shrink-0 flex items-center gap-2.5 h-10 px-4 rounded-full border border-light-200 hover:border-ale-200 hover:bg-ale-50 transition-all"
              >
                <s.Icon className="w-4 h-4 text-ale" />
                <span className="text-xs font-semibold text-text group-hover:text-ale transition-colors">{s.title}</span>
              </Link>
            ))}
            <Link
              href="/solutions"
              className="shrink-0 flex items-center gap-1.5 h-10 px-4 rounded-full bg-ale-50 text-ale text-xs font-semibold hover:bg-ale-100 transition-colors"
            >
              All Solutions
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. Showcase Blocks (Alternating Image + Text) ─── */}
      <section className="bg-white">
        {showcases.map((item, i) => (
          <div key={item.label} className={`py-16 lg:py-24 ${i > 0 ? "border-t border-light-200" : ""}`}>
            <div className="mx-auto max-w-[1320px] px-6">
              <div className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ale-deep/30 to-transparent" />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2">
                  <span className="inline-flex h-6 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider items-center mb-4">
                    {item.label}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight leading-tight mb-4">
                    {item.title}
                  </h2>
                  <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-lg">
                    {item.description}
                  </p>

                  {/* Mini stats */}
                  <div className="flex gap-8 mb-6">
                    {item.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-xl font-extrabold text-ale">{s.value}</div>
                        <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ale hover:text-ale-dark transition-colors group"
                  >
                    Learn more
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── 3. Product Categories ─── */}
      <section className="py-16 bg-light-50 border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Explore our product portfolio
            </h2>
            <p className="mt-3 text-base text-text-secondary max-w-lg mx-auto">
              From switches and wireless APs to cloud platforms and smart devices — everything you need for a complete enterprise network.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {productCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-light-200 hover:border-ale-200 hover:shadow-md transition-all text-center"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-text group-hover:text-ale transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-text-muted mt-0.5">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-10 px-6 bg-white border border-ale-200 text-sm font-semibold text-ale rounded-full hover:bg-ale-50 transition-colors"
            >
              View Full Catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. Industries Grid ─── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Industries we transform
              </h2>
              <p className="mt-2 text-base text-text-secondary max-w-md">
                Purpose-built solutions for the sectors that power the world.
              </p>
            </div>
            <Link
              href="/industries"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
            >
              All industries
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="group relative rounded-xl overflow-hidden h-56"
              >
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ale-deep/80 via-ale-deep/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ind.Icon className="w-4 h-4 text-white/80" />
                    <h3 className="text-base font-bold text-white">{ind.name}</h3>
                  </div>
                  <p className="text-xs text-white/70">{ind.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="sm:hidden text-center mt-6">
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale"
            >
              All industries
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. Trust / Stats Band ─── */}
      <section className="py-14 bg-ale-deep">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
            {trustStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Customer Testimonial ─── */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-10 h-10 text-ale-200 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <blockquote className="text-lg sm:text-xl font-medium text-text leading-relaxed mb-6">
              ALE&apos;s network infrastructure has been the backbone of our digital transformation. From zero-touch deployment across 200+ sites to AI-driven network monitoring, we&apos;ve reduced operational complexity by 40% while delivering enterprise-grade connectivity to every corner of our organization.
            </blockquote>
            <div>
              <div className="text-sm font-bold text-text">IT Director</div>
              <div className="text-xs text-text-muted">European Healthcare Group — 200+ facilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Latest Insights ─── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Latest insights
              </h2>
              <p className="mt-2 text-base text-text-secondary">
                Expert perspectives on networking, communications, and digital transformation.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ale hover:text-ale-dark transition-colors"
            >
              All articles
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-light-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex h-5 px-2 bg-ale-50 text-ale text-[10px] font-semibold rounded-full items-center">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text group-hover:text-ale transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="sm:hidden text-center mt-6">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ale">
              All articles
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. Partner Ecosystem ─── */}
      <section className="py-16 bg-light-50 border-t border-light-200">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-1/2">
              <span className="inline-flex h-6 px-3 rounded-full bg-ale-50 text-ale text-[11px] font-semibold uppercase tracking-wider items-center mb-4">
                Partner Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight leading-tight mb-4">
                3,400+ partners delivering ALE technology worldwide
              </h2>
              <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-lg">
                Our global network of certified business partners, consultants, and technology partners ensures expert deployment, support, and innovation in over 50 countries.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 h-10 px-5 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-colors"
                >
                  Explore Partnerships
                </Link>
                <Link
                  href="/partners/business-partners"
                  className="inline-flex items-center gap-2 h-10 px-5 border border-ale-200 text-ale text-sm font-semibold rounded-full hover:bg-ale-50 transition-colors"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                { value: "3,400+", label: "Certified Partners", desc: "Across all programs" },
                { value: "50+", label: "Countries", desc: "Global presence" },
                { value: "100+", label: "Certifications", desc: "Available programs" },
                { value: "24/7", label: "Partner Portal", desc: "Resources & support" },
              ].map((s) => (
                <div key={s.label} className="p-5 bg-white rounded-xl border border-light-200 text-center">
                  <div className="text-xl font-extrabold text-ale">{s.value}</div>
                  <div className="text-sm font-semibold text-text mt-1">{s.label}</div>
                  <div className="text-[11px] text-text-muted mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Final CTA ─── */}
      <section className="py-20 bg-gradient-to-br from-ale-deep via-ale-900 to-ale-dark relative overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-ale-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[15%] w-48 h-48 bg-ale-400 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to transform your enterprise?
          </h2>
          <p className="text-base text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
            Discover how ALE&apos;s cloud communications, autonomous networking, and AI-driven operations can accelerate your digital transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all hover:shadow-lg hover:shadow-ale/30"
            >
              Contact Sales
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 h-12 px-7 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Explore the Platform
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-12 px-7 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
