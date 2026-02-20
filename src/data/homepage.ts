export const industries = [
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: "healthcare" as const,
    description: "Connected care for smarter hospitals",
    solutions: ["Patient flow optimization", "Nurse call integration", "Secure clinical communications"],
  },
  {
    name: "Education",
    slug: "education",
    icon: "education" as const,
    description: "Smart campuses for better learning",
    solutions: ["Safe campus", "Digital learning infrastructure", "Campus-wide connectivity"],
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    icon: "hospitality" as const,
    description: "Elevated guest experiences",
    solutions: ["Guest Wi-Fi & connectivity", "Staff communications", "Smart room technology"],
  },
  {
    name: "Government",
    slug: "government",
    icon: "government" as const,
    description: "Secure sovereign communications",
    solutions: ["Sovereign cloud", "Crisis communications", "Secure collaboration"],
  },
  {
    name: "Transportation",
    slug: "transportation",
    icon: "transportation" as const,
    description: "Safe, connected mobility",
    solutions: ["Passenger information", "Operational communications", "Rail & airport connectivity"],
  },
  {
    name: "Energy",
    slug: "energy",
    icon: "energy" as const,
    description: "Critical infrastructure networks",
    solutions: ["SCADA connectivity", "Field worker communications", "Remote site networking"],
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    icon: "manufacturing" as const,
    description: "Industry 4.0 connectivity",
    solutions: ["Industrial networking", "IoT connectivity", "Real-time worker safety"],
  },
  {
    name: "Smart Buildings",
    slug: "smart-buildings",
    icon: "smart-buildings" as const,
    description: "Intelligent workspaces",
    solutions: ["Building automation", "Occupancy analytics", "Unified building networks"],
  },
];

export type IndustryIconName = (typeof industries)[number]["icon"];

export const outcomeStories = [
  {
    metric: "40%",
    label: "faster response times",
    customer: "CHU Lyon",
    industry: "Healthcare",
    href: "/customers/case-studies/chu-lyon",
  },
  {
    metric: "€2.3M",
    label: "saved in network costs",
    customer: "AccorHotels",
    industry: "Hospitality",
    href: "/customers/case-studies/accor",
  },
  {
    metric: "99.99%",
    label: "uptime achieved",
    customer: "SNCF",
    industry: "Transportation",
    href: "/customers/case-studies/sncf",
  },
];

export const solutionPathways = [
  {
    title: "Modernize Communications",
    icon: "chat" as const,
    description: "Cloud-native UC, contact center, and telephony for the modern enterprise.",
    products: ["Rainbow", "OmniPCX", "CCaaS"],
    href: "/solutions/modernize-communications",
  },
  {
    title: "Secure Your Network",
    icon: "shield" as const,
    description: "Zero-trust network fabric with enterprise-grade switching and Wi-Fi.",
    products: ["OmniSwitch", "Stellar Wi-Fi", "SD-WAN"],
    href: "/solutions/secure-your-network",
  },
  {
    title: "Optimize with AI",
    icon: "ai" as const,
    description: "AI-driven network intelligence, IoT analytics, and predictive operations.",
    products: ["AI Ops", "IoT Platform", "Analytics"],
    href: "/solutions/optimize-with-ai",
  },
  {
    title: "Move to Cloud",
    icon: "cloud" as const,
    description: "Flexible consumption models and smooth migration paths to cloud.",
    products: ["XaaS", "Cloud Migration", "Hybrid"],
    href: "/solutions/move-to-cloud",
  },
  {
    title: "Enable Hybrid Work",
    icon: "globe" as const,
    description: "Collaboration tools and smart workspace solutions for distributed teams.",
    products: ["Rainbow", "IP Desktop Phones", "Headsets"],
    href: "/solutions/enable-hybrid-work",
  },
  {
    title: "Connect Everything",
    icon: "signal" as const,
    description: "Private 5G, IoT connectivity, and asset tracking for mission-critical operations.",
    products: ["Private 5G", "IoT", "DECT Handsets"],
    href: "/solutions/connect-everything",
  },
];

export const trustStats = [
  { number: "1M+", label: "users worldwide" },
  { number: "50+", label: "countries" },
  { number: "3,400+", label: "partners" },
  { number: "100+", label: "years of innovation" },
];
