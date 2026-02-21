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
      { label: "Small & Medium Business", href: "/industries/smb", description: "Enterprise tech for SMBs" },
    ],
    featured: {
      title: "How ALE transforms hospitals",
      description: "40% faster response times at CHU Lyon",
      href: "/customers/case-studies",
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
      { label: "Business Continuity", href: "/solutions/business-continuity", description: "Resilience for any disruption" },
      { label: "SD-WAN & SASE", href: "/solutions/sd-wan-sase", description: "Smart WAN with cloud security" },
      { label: "Network Security", href: "/solutions/network-security", description: "Zero-trust & segmentation" },
      { label: "All Solutions", href: "/solutions", description: "Browse all solutions" },
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
      { label: "OmniPCX Enterprise", href: "/platform/omnipcx-enterprise", description: "Enterprise comm server" },
      { label: "ALE Connect", href: "/platform/ale-connect", description: "Omnichannel contact center" },
      { label: "Full Product Catalog", href: "/products", description: "Browse all products by category" },
    ],
    featured: {
      title: "One platform. Every connection.",
      description: "See how it all works together",
      href: "/platform",
    },
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Support Services", href: "/services/support-services", description: "24/7 technical support" },
      { label: "Training Services", href: "/services/training-services", description: "Certification & learning" },
      { label: "Professional Services", href: "/services/professional-managed-services", description: "Deployment & managed ops" },
      { label: "Success Management", href: "/services/success-management", description: "Adoption & best practices" },
      { label: "Industry Services", href: "/services/industry-services", description: "Vertical expertise" },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Business Partners", href: "/partners/business-partners", description: "Join our partner network" },
      { label: "Consultants", href: "/partners/consultants", description: "Advisory program" },
      { label: "Technology Partners", href: "/partners/technology-partners", description: "Build on ALE platform" },
      { label: "Developers", href: "/developers", description: "APIs & SDKs" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About ALE", href: "/company/about", description: "Our mission & values" },
      { label: "Executive Team", href: "/company/executive-team", description: "Leadership team" },
      { label: "Innovation", href: "/company/innovation", description: "R&D and technology vision" },
      { label: "Newsroom", href: "/company/newsroom", description: "Press releases & media" },
      { label: "Blog", href: "/blog", description: "Insights & expertise" },
      { label: "Events", href: "/company/events", description: "Events & webinars" },
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
