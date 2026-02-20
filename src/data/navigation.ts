export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Healthcare", href: "/industries/healthcare", description: "Connected care & smart hospitals" },
      { label: "Education", href: "/industries/education", description: "Smart campuses & digital learning" },
      { label: "Hospitality", href: "/industries/hospitality", description: "Elevated guest experiences" },
      { label: "Government", href: "/industries/government", description: "Secure sovereign communications" },
      { label: "Transportation", href: "/industries/transportation", description: "Safe, connected mobility" },
      { label: "Energy & Utilities", href: "/industries/energy", description: "Critical infrastructure networks" },
      { label: "Manufacturing", href: "/industries/manufacturing", description: "Industry 4.0 connectivity" },
      { label: "Smart Buildings", href: "/industries/smart-buildings", description: "Intelligent workspaces" },
    ],
    featured: {
      title: "How ALE transforms hospitals",
      description: "40% faster response times at CHU Lyon",
      href: "/customers/case-studies/chu-lyon",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Modernize Communications", href: "/solutions/modernize-communications", description: "UCaaS, CCaaS, cloud telephony" },
      { label: "Secure Your Network", href: "/solutions/secure-your-network", description: "Network fabric, Wi-Fi, zero-trust" },
      { label: "Optimize with AI", href: "/solutions/optimize-with-ai", description: "AI Ops, IoT analytics, automation" },
      { label: "Move to Cloud", href: "/solutions/move-to-cloud", description: "XaaS, migration, hybrid deployment" },
      { label: "Enable Hybrid Work", href: "/solutions/enable-hybrid-work", description: "Collaboration from anywhere" },
      { label: "Connect Everything", href: "/solutions/connect-everything", description: "Private 5G, IoT, asset tracking" },
    ],
    featured: {
      title: "Move to the cloud with XaaS",
      description: "Flexible consumption models for every need",
      href: "/solutions/move-to-cloud",
    },
  },
  {
    label: "Platform",
    href: "/platform",
    children: [
      { label: "Rainbow", href: "/platform/rainbow", description: "Cloud communications platform" },
      { label: "OmniSwitch", href: "/platform/omniswitch", description: "Network switching fabric" },
      { label: "Stellar Wi-Fi", href: "/platform/stellar-wifi", description: "Enterprise wireless" },
      { label: "AI Ops", href: "/platform/ai-ops", description: "AI-driven network intelligence" },
      { label: "Private 5G", href: "/platform/private-5g", description: "Dedicated wireless networks" },
      { label: "All Products", href: "/platform/all-products", description: "Browse the full portfolio" },
    ],
    featured: {
      title: "One platform. Every connection.",
      description: "See how it all works together",
      href: "/platform",
    },
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Become a Partner", href: "/partners/become-a-partner", description: "Grow with ALE" },
      { label: "Find a Partner", href: "/partners/find-a-partner", description: "Locate a certified partner" },
      { label: "Partner Success", href: "/partners/partner-success", description: "Partner stories & results" },
      { label: "Developers", href: "/developers", description: "Build on the ALE platform" },
      { label: "Partner Portal", href: "/partners/portal", description: "Access your portal" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About ALE", href: "/company/about", description: "Our mission & values" },
      { label: "Innovation", href: "/company/innovation", description: "R&D and technology vision" },
      { label: "Newsroom", href: "/company/newsroom", description: "Press releases & media" },
      { label: "Careers", href: "/company/careers", description: "Join our team" },
      { label: "ESG", href: "/company/esg", description: "Sustainability & responsibility" },
      { label: "Contact", href: "/company/contact", description: "Get in touch" },
    ],
  },
];

export const utilityNav = [
  { label: "Resources", href: "/resources" },
  { label: "Support", href: "/support" },
];
