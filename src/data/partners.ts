export interface PartnerPageData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: { title: string; description: string }[];
  /** Stats for social-proof band */
  stats?: { value: string; label: string }[];
  /** Key benefits as bullet points */
  highlights?: string[];
}

export const partnersData: PartnerPageData[] = [
  {
    slug: "business-partners",
    name: "Business Partners",
    tagline: "Join our global network of 3,400+ partners delivering enterprise solutions",
    description:
      "ALE Business Partners form the backbone of our go-to-market strategy. Through our 360 Partner Experience (360PX) program, partners gain access to world-class training, marketing resources, technical support, and competitive margins. Whether you are a distributor, reseller, service partner, or system integrator, ALE provides the tools and support you need to grow your business and deliver exceptional customer outcomes.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/business-partner-360-header-v3.jpg?h=600&w=1440",
    stats: [
      { value: "3,400+", label: "partners worldwide" },
      { value: "140+", label: "countries" },
      { value: "360PX", label: "partner program" },
      { value: "100%", label: "channel commitment" },
    ],
    highlights: [
      "Tiered partner program with performance rewards and dedicated account management",
      "Co-branded marketing assets, campaign kits, and lead sharing programs",
      "Instructor-led and self-paced certification training",
      "Partner-exclusive technical resources and proof-of-concept lab access",
      "Deal registration protection and competitive margin structures",
    ],
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
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/partners-directory-page-homepage-header-image-495x275.jpg?h=600&w=1440",
    stats: [
      { value: "Global", label: "regional contacts" },
      { value: "EBC", label: "briefing center access" },
      { value: "Early", label: "access to insights" },
      { value: "1:1", label: "expert engagement" },
    ],
    highlights: [
      "Direct access to ALE technical experts and product roadmaps",
      "Invitations to Executive Briefing Center visits and networking events",
      "Early access to market research and analyst reports",
      "Dedicated regional contacts who understand your local market",
      "Competitive analysis resources to strengthen advisory capabilities",
    ],
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
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/partners-directory-page-homepage-header-image-495x275.jpg?h=600&w=1440",
    stats: [
      { value: "REST", label: "standards-based APIs" },
      { value: "IWR", label: "interop validation" },
      { value: "Multi", label: "platform SDKs" },
      { value: "Global", label: "ecosystem reach" },
    ],
    highlights: [
      "Standards-based REST APIs and SDKs for Rainbow, OmniPCX, and OmniVista",
      "Certification labs with remote and on-site testing environments",
      "Pre-built connectors for Microsoft Teams, Salesforce, and ServiceNow",
      "Joint marketing opportunities and customer referrals",
      "Certified solutions listed in ALE partner ecosystem directory",
    ],
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
  {
    slug: "become-a-partner",
    name: "Become a Partner",
    tagline: "Join ALE's global partner ecosystem and grow your business",
    description:
      "Partner with Alcatel-Lucent Enterprise to expand your portfolio, increase revenue, and deliver enterprise-grade networking and communications solutions to your customers. Whether you are a reseller, systems integrator, managed service provider, or technology developer, ALE offers a partner program designed to accelerate your growth with comprehensive training, marketing resources, and technical support.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/business-partner-360-header-v3.jpg?h=600&w=1440",
    stats: [
      { value: "3", label: "partner tracks" },
      { value: "Free", label: "ALE University access" },
      { value: "MDF", label: "marketing funds" },
      { value: "100%", label: "channel model" },
    ],
    highlights: [
      "Choose from Business Partner, Consultants, or DSPP tracks",
      "Competitive margins with tiered discount structures and rebates",
      "Free ALE University access with sales and technical certification",
      "Co-branded campaigns and marketing development funds",
      "Deal registration protection and performance-based rewards",
    ],
    features: [
      { title: "Multiple Partner Tracks", description: "Choose from Business Partner (reseller/SI), Consultants (advisory), or Developer & Solution Partner (DSPP) tracks — each tailored to your business model and go-to-market strategy." },
      { title: "Competitive Margins & Incentives", description: "Tiered discount structures, deal registration protection, rebate programs, and performance-based rewards that grow as your partnership matures." },
      { title: "Training & Certification", description: "Free access to ALE University with instructor-led and self-paced courses. Build certified expertise across networking, communications, and cloud solutions to differentiate your practice." },
      { title: "Marketing & Lead Generation", description: "Co-branded campaigns, marketing development funds, lead sharing, and campaign-in-a-box kits to help you generate pipeline and close deals faster." },
    ],
  },
  {
    slug: "dspp",
    name: "Developer & Solution Partner Program",
    tagline: "Build, certify, and market integrated solutions on the ALE platform",
    description:
      "The ALE Developer and Solution Partner Program (DSPP) enables technology companies to develop certified applications that extend and integrate with ALE solutions. Gain access to APIs, SDKs, development labs, certification testing, and go-to-market support — building a thriving ecosystem of interoperable solutions that deliver greater value to enterprise customers worldwide.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/partners-directory-page-homepage-header-image-495x275.jpg?h=600&w=1440",
    stats: [
      { value: "REST", label: "APIs & SDKs" },
      { value: "IWR", label: "validation reports" },
      { value: "Certified", label: "solution listing" },
      { value: "3,400+", label: "channel partner reach" },
    ],
    highlights: [
      "REST APIs, JavaScript, iOS, and Android SDKs for Rainbow, OmniPCX, and OmniVista",
      "Remote and on-site certification environments with IWR validation",
      "Certified solutions promoted in ALE Technology Partner directory",
      "Joint marketing and visibility to ALE's global customer base",
      "Ongoing compatibility testing with new product releases",
    ],
    features: [
      { title: "APIs & SDKs", description: "Standards-based REST APIs, JavaScript, iOS, and Android SDKs for Rainbow, OmniPCX Enterprise, and OmniVista platforms — with comprehensive documentation and sample code." },
      { title: "Certification Labs", description: "Access to remote and on-site certification environments. Validated solutions earn official ALE certification, are listed in the partner directory, and benefit from joint marketing." },
      { title: "Interoperability Testing", description: "IWR (Interoperability Validation Reports) program ensures your solution works seamlessly with ALE infrastructure and receives ongoing compatibility testing with new releases." },
      { title: "Ecosystem Directory", description: "Certified solutions are promoted in the ALE Technology Partner directory, giving you visibility to ALE's global customer base and 3,400+ channel partners." },
    ],
  },
  {
    slug: "partner-resources",
    name: "Partner Resources",
    tagline: "Tools, training, and support to help you succeed as an ALE partner",
    description:
      "Access the resources you need to grow your ALE business. From technical documentation and sales tools to marketing assets and training programs, our partner portal provides everything required to design, sell, deploy, and support ALE solutions for your customers.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/business-partner-360-header-v3.jpg?h=600&w=1440",
    stats: [
      { value: "Portal", label: "centralized access" },
      { value: "Certs", label: "sales & technical" },
      { value: "Docs", label: "updated per release" },
      { value: "Assets", label: "co-brandable content" },
    ],
    highlights: [
      "Centralized partner portal for deal registration, quoting, and support",
      "ALE University with certification tracks for sales and technical roles",
      "Product documentation and reference architectures for all ALE solutions",
      "Co-brandable collateral, presentations, and video content",
      "Configuration guides and deployment best practices",
    ],
    features: [
      { title: "Partner Portal", description: "Centralized access to deal registration, quoting tools, order management, and support case tracking through the ALE Business Partner Portal." },
      { title: "ALE University", description: "Comprehensive training platform with certification tracks for sales, pre-sales, and technical roles across the full ALE networking and communications portfolio." },
      { title: "Technical Documentation", description: "Product documentation, configuration guides, deployment best practices, and reference architectures for all ALE solutions — updated with each product release." },
      { title: "Marketing Assets", description: "Co-brandable collateral, solution briefs, customer presentations, demo scripts, and video content to support your sales and marketing activities." },
    ],
  },
];
