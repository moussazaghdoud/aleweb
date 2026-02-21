export interface PartnerPageData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: { title: string; description: string }[];
}

export const partnersData: PartnerPageData[] = [
  {
    slug: "business-partners",
    name: "Business Partners",
    tagline: "Join our global network of 3,400+ partners delivering enterprise solutions",
    description:
      "ALE Business Partners form the backbone of our go-to-market strategy. Through our 360 Partner Experience (360PX) program, partners gain access to world-class training, marketing resources, technical support, and competitive margins. Whether you are a distributor, reseller, service partner, or system integrator, ALE provides the tools and support you need to grow your business and deliver exceptional customer outcomes.",
    heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
    features: [
      {
        title: "360 Partner Experience (360PX)",
        description: "Comprehensive partner program with tiered benefits, performance rewards, and dedicated account management. Earn recognition through expertise and customer success.",
      },
      {
        title: "Training & Certification",
        description: "Access instructor-led courses, self-paced digital learning, and certification programs that build your team's expertise across the ALE portfolio.",
      },
      {
        title: "Marketing & Sales Tools",
        description: "Co-branded marketing assets, campaign-in-a-box kits, deal registration, and lead sharing programs to help you generate and close business.",
      },
      {
        title: "Technical Support & Resources",
        description: "Partner-exclusive technical resources, pre-sales support, proof-of-concept lab access, and dedicated partner help desk for project support.",
      },
    ],
  },
  {
    slug: "consultants",
    name: "Consultants Program",
    tagline: "Expand your advisory expertise with the ALE Consultants Program",
    description:
      "The ALE Consultants Program is designed for technology consultants who advise enterprises on networking, communications, and digital transformation strategies. As a member, you gain access to dedicated regional contacts, exclusive events, industry insights, and the technical knowledge assets needed to confidently recommend ALE solutions to your clients.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
    features: [
      {
        title: "Expert Knowledge Access",
        description: "Direct access to ALE technical experts, product roadmaps, and competitive analysis to strengthen your advisory capabilities and client recommendations.",
      },
      {
        title: "Exclusive Events & Briefings",
        description: "Invitations to technology briefings, Executive Briefing Center visits, and networking events with ALE leadership and fellow consultants.",
      },
      {
        title: "Industry Insights",
        description: "Early access to market research, analyst reports, and industry trend analysis to keep your consulting practice at the forefront of enterprise technology.",
      },
      {
        title: "Regional Support",
        description: "Dedicated regional contacts who understand your local market and can provide timely support for client opportunities and technical inquiries.",
      },
    ],
  },
  {
    slug: "technology-partners",
    name: "Developer & Solution Partners",
    tagline: "Build certified, interoperable applications on the ALE platform",
    description:
      "The Developer and Solution Partner Program (DSPP) enables technology companies to develop certified, interoperable applications that extend ALE solutions. Partners gain access to standards-based APIs, technical documentation, development labs, certification testing, and promotional support — creating a thriving ecosystem of integrated solutions for enterprise customers.",
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80",
    features: [
      {
        title: "APIs & Development Resources",
        description: "Standards-based REST APIs, SDKs, technical documentation, and sample code for integrating with Rainbow, OmniPCX, and OmniVista platforms.",
      },
      {
        title: "Certification & Testing",
        description: "Access to certification labs and testing environments. Validated solutions receive official ALE certification and are listed in our partner ecosystem directory.",
      },
      {
        title: "Go-to-Market Support",
        description: "Joint marketing opportunities, solution briefs, customer referrals, and promotional support to help you reach ALE's global customer base.",
      },
      {
        title: "Ecosystem Integration",
        description: "Pre-built connectors for Microsoft Teams, Salesforce, ServiceNow, and other enterprise platforms. Rainbow App Connector simplifies CRM and business application integration.",
      },
    ],
  },
];
