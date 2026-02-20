export interface Resource {
  slug: string;
  title: string;
  type: "whitepaper" | "case-study" | "webinar" | "guide" | "datasheet";
  industry?: string;
  solution?: string;
  summary: string;
  date: string;
}

export const resourcesData: Resource[] = [
  {
    slug: "digital-age-networking-whitepaper",
    title: "Digital Age Networking: Building Autonomous Enterprise Networks",
    type: "whitepaper",
    solution: "secure-your-network",
    summary: "Explore how AI-driven, autonomous networking transforms enterprise infrastructure with zero-touch provisioning, IoT segmentation, and predictive analytics.",
    date: "2026-01-15",
  },
  {
    slug: "rainbow-cloud-communications-guide",
    title: "Rainbow Cloud Communications: Deployment & Migration Guide",
    type: "guide",
    solution: "modernize-communications",
    summary: "Step-by-step guide for migrating from on-premises telephony to Rainbow cloud communications, covering hybrid deployments and CPaaS integration.",
    date: "2026-01-08",
  },
  {
    slug: "healthcare-connected-care-whitepaper",
    title: "Connected Care: Optimizing Patient Pathways with Enterprise Technology",
    type: "whitepaper",
    industry: "healthcare",
    summary: "How hospitals and healthcare systems use ALE networking and communications to improve patient outcomes, reduce response times, and streamline clinical operations.",
    date: "2025-12-20",
  },
  {
    slug: "private-5g-manufacturing-datasheet",
    title: "Private 5G for Manufacturing: Technical Specifications & Use Cases",
    type: "datasheet",
    industry: "manufacturing",
    solution: "connect-everything",
    summary: "Technical overview of ALE Private 5G deployment for industrial IoT, AGV coordination, and real-time quality control on the factory floor.",
    date: "2025-12-10",
  },
  {
    slug: "education-smart-campus-case-study",
    title: "Javeriana University: Campus-Wide Digital Transformation",
    type: "case-study",
    industry: "education",
    summary: "How Javeriana University deployed ALE solutions to connect 35,000 students across multiple campuses with secure, high-performance networking and collaboration.",
    date: "2025-11-28",
  },
  {
    slug: "ai-ops-network-advisor-webinar",
    title: "AI Ops in Action: Predictive Network Management with OmniVista Network Advisor",
    type: "webinar",
    solution: "optimize-with-ai",
    summary: "On-demand webinar demonstrating how AI and ML reduce network downtime, accelerate troubleshooting, and provide proactive security threat detection.",
    date: "2025-11-15",
  },
  {
    slug: "hospitality-guest-experience-case-study",
    title: "Okada Manila Resort: Converged Network for Gaming & Hospitality",
    type: "case-study",
    industry: "hospitality",
    summary: "How Okada Manila deployed a converged ALE network to deliver seamless guest Wi-Fi, staff communications, and security across a world-class integrated resort.",
    date: "2025-11-01",
  },
  {
    slug: "xaas-cloud-migration-guide",
    title: "Everything as a Service: Your Path to Cloud Communications & Networking",
    type: "guide",
    solution: "move-to-cloud",
    summary: "Comprehensive guide to ALE's XaaS portfolio — UCaaS, CCaaS, NaaS, and CPaaS — with ROI analysis, deployment options, and migration planning.",
    date: "2025-10-20",
  },
  {
    slug: "government-crisis-communications-whitepaper",
    title: "Crisis Communications for Government: Emergency Preparedness & Public Safety",
    type: "whitepaper",
    industry: "government",
    summary: "How municipalities and government agencies use ALE Visual Notification Assistant and unified communications for emergency management and citizen safety.",
    date: "2025-10-05",
  },
  {
    slug: "wifi7-enterprise-wireless-datasheet",
    title: "OmniAccess Stellar Wi-Fi 7: Enterprise Wireless Access Points",
    type: "datasheet",
    solution: "secure-your-network",
    summary: "Technical specifications, deployment guidance, and performance benchmarks for ALE's latest Wi-Fi 7 (802.11be) access points across indoor and outdoor models.",
    date: "2025-09-18",
  },
  {
    slug: "hybrid-work-collaboration-webinar",
    title: "Enabling Hybrid Work: Enterprise Collaboration Without Compromise",
    type: "webinar",
    solution: "enable-hybrid-work",
    summary: "On-demand webinar exploring how Rainbow, smart desk phones, and secure remote access enable seamless hybrid work with full feature parity.",
    date: "2025-09-05",
  },
  {
    slug: "transportation-rail-case-study",
    title: "Saint Gotthard Tunnel: Mission-Critical Communications for Rail",
    type: "case-study",
    industry: "transportation",
    summary: "How the world's longest rail tunnel relies on ALE communications for mission-critical operations, emergency coordination, and passenger safety.",
    date: "2025-08-22",
  },
];

export const typeLabels: Record<Resource["type"], string> = {
  whitepaper: "Whitepaper",
  "case-study": "Case Study",
  webinar: "Webinar",
  guide: "Guide",
  datasheet: "Datasheet",
};
