export interface IndustryData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  solutions: { title: string; description: string }[];
  customers: { name: string; detail: string }[];
  products: string[];
  subPages?: { label: string; slug: string }[];
}

export const industriesData: IndustryData[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Optimizing the care pathway for better outcomes",
    description:
      "ALE enables healthcare providers to deliver connected digital experiences through simplified, efficient, and secure communications that help clinicians collaborate and optimize patient care pathways — from admission through discharge.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/healthcare-header-image-v2.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Patient Experience",
        description:
          "Quality welcome and admission via secure Wi-Fi, room phones, self-navigation, and post-discharge engagement via Rainbow platform.",
      },
      {
        title: "Clinical Operations",
        description:
          "Mobile WLAN connectivity for staff, asset tracking to reduce equipment search time, unified communications across departments.",
      },
      {
        title: "Digital Health Infrastructure",
        description:
          "Digital Age Network architecture with secure, high-performance wired and wireless infrastructure for IoMT device management.",
      },
      {
        title: "Senior Living Technology",
        description:
          "Connectivity and communications tailored for aging care facilities, nursing homes, and assisted living environments.",
      },
    ],
    customers: [
      { name: "Korea University Medicine", detail: "Unified clinical communications" },
      { name: "Istituto Ortopedico Rizzoli", detail: "Hospital network modernization" },
      { name: "Kaiserswerther Diakonie", detail: "Senior living connectivity" },
      { name: "Mayotte Hospital", detail: "Secure patient communications" },
      { name: "AZ Rivierenland Hospital", detail: "Integrated care pathways" },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "OmniSwitch 6900", "OmniAccess Stellar", "OmniVista Cirrus"],
    subPages: [
      { label: "Digital Health", slug: "digital-health" },
      { label: "Senior Living", slug: "senior-living" },
    ],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Empowering student success through innovative learning experiences",
    description:
      "ALE helps schools and universities succeed by enabling student-centered learning, managing secure high-performance network infrastructure, providing crisis coordination tools, and ensuring learning continuity with secure remote communications.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/education-header-image-v2.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Student Centered Learning",
        description:
          "Support for the complete education journey from applicant to alumni through personalized learning environments and connected experiences.",
      },
      {
        title: "Smart Campus",
        description:
          "Flexible, high-performance, secure network built on reliable LAN and WLAN with network analytics for predictive infrastructure.",
      },
      {
        title: "Safe Campus",
        description:
          "Campus resiliency through reliable communications ensuring safety via swift community messaging during crises.",
      },
      {
        title: "Education Continuity",
        description:
          "Remote networking and communications enabling secure, plug-and-play virtual classroom solutions for hybrid learning.",
      },
    ],
    customers: [
      { name: "Javeriana University", detail: "Campus-wide digital transformation" },
      { name: "Alamo Colleges", detail: "Multi-campus networking" },
      { name: "Colegio Felix Jesus Rougier", detail: "Connected learning environment" },
      { name: "Kennewick School District", detail: "Safe campus communications" },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "Visual Notification Assistant", "OmniAccess Stellar"],
    subPages: [
      { label: "Higher Education", slug: "higher-education" },
      { label: "K-12", slug: "k-12" },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    tagline: "Empowering staff to deliver enhanced guest experiences",
    description:
      "ALE helps hotels, cruise ships, and restaurants create safe, mobile, and unique guest experiences through efficient team communications, cloud-based network management, and digital amenities that blend technology with human service.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hospitality-header-bar-image-l2-l3.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Guest Experience",
        description:
          "Contactless digital services on guest devices for personalized engagement, 24/7 eConcierge, and new revenue streams through digital amenities.",
      },
      {
        title: "Staff Communications",
        description:
          "Adapted collaboration tools enabling better coordination between front desk, housekeeping, maintenance, and management teams.",
      },
      {
        title: "Digital Age Networking",
        description:
          "Secure, robust networks providing high-speed Wi-Fi, IoT connectivity, automatic cloud management, and guest insights.",
      },
      {
        title: "Operational Intelligence",
        description:
          "Deep industry expertise from thousands of hospitality projects, with powerful analytics for service optimization and diversification.",
      },
    ],
    customers: [
      { name: "Okada Manila Resort", detail: "Converged network for gaming & hospitality" },
      { name: "South Palms Resort", detail: "Seamless guest experiences" },
      { name: "Cordish Gaming LIVE!", detail: "Security and service improvements" },
      { name: "Little National Hotel", detail: "In-room experience modernization" },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "Smart DeskPhones", "OmniAccess Stellar AP1230", "Visual Automated Attendant"],
  },
  {
    slug: "government",
    name: "Government",
    tagline: "Optimizing government efficiency and public safety",
    description:
      "ALE helps municipalities and government agencies provide connected digital services for citizens, sustainable smart cities, emergency preparedness for public safety, and mission-critical defense operations.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/government-header-image-v2.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Connected Cities",
        description:
          "Sustainable urban living through IoT devices, automation, and smart infrastructure connecting citizens to digital services 24/7.",
      },
      {
        title: "Public Safety",
        description:
          "Centralized notifications, AI-powered analysis, real-time crisis coordination, and 112/911 compliance for emergency management.",
      },
      {
        title: "Defense Solutions",
        description:
          "Mission-critical encrypted communications with defense-certified, ruggedized equipment for field and office operations.",
      },
      {
        title: "Digital Government Services",
        description:
          "GDPR-compliant digital workplaces with collaboration tools, simplified service delivery, and scalable high-availability networks.",
      },
    ],
    customers: [
      { name: "Gemeinde Pratteln", detail: "Flexible crisis management" },
      { name: "Seine-Saint-Denis Council", detail: "Cost reduction through digital" },
      { name: "Strasbourg Eurometropolis", detail: "Digital efficiency programs" },
      { name: "Hidalgo State Government", detail: "Centralized communications" },
    ],
    products: ["OmniPCX Enterprise", "Rainbow", "Visual Notification Assistant", "Dispatch Console", "OmniSwitch"],
    subPages: [
      { label: "Defense", slug: "defense" },
      { label: "Public Safety", slug: "public-safety" },
      { label: "Connected Cities", slug: "connected-cities" },
    ],
  },
  {
    slug: "transportation",
    name: "Transportation",
    tagline: "Connecting rail, air, ports and logistics for smarter mobility",
    description:
      "ALE connects transportation subsystems to enable superior passenger experiences, increase safety and security for passengers, staff and assets, and improve operational efficiency across rail, aviation, ports, and logistics.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Smart Airports",
        description:
          "Baggage handling systems, predictive maintenance, operations control centers, and emergency communications for airport operations.",
      },
      {
        title: "Smart Railways",
        description:
          "Safe and secure rail operations with integrated communications, passenger information systems, and dispatch coordination.",
      },
      {
        title: "Intelligent Transport Systems",
        description:
          "Travel optimization through connected infrastructure, real-time data, and AI-driven traffic management.",
      },
      {
        title: "Smart Ports & Logistics",
        description:
          "Connected vessel and cargo operations with logistics integration, IoT tracking, and automated workflows.",
      },
    ],
    customers: [
      { name: "Saint Gotthard Tunnel", detail: "Mission-critical tunnel communications" },
      { name: "Future Mobility Park", detail: "Autonomous mobility infrastructure" },
      { name: "Kanton Aargau", detail: "Network security and availability" },
      { name: "Liverpool City Region", detail: "Mission-critical IoT deployment" },
    ],
    products: ["OmniPCX Enterprise", "OmniSwitch 6465", "DECT Base Stations", "OmniAccess Stellar", "Dispatch Console"],
    subPages: [
      { label: "Airports", slug: "air" },
      { label: "Railways", slug: "rail" },
      { label: "Ports", slug: "ports" },
      { label: "ITS", slug: "its" },
    ],
  },
  {
    slug: "energy",
    name: "Energy & Utilities",
    tagline: "Reliable networks for critical energy infrastructure",
    description:
      "ALE provides secure, resilient communications and networking for energy producers, distributors, and utility companies operating in mission-critical environments — from power plants and substations to remote field operations.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/energy-utilities-banner-1440x600.jpg?h=600&w=1440",
    solutions: [
      {
        title: "SCADA & OT Connectivity",
        description:
          "Industrial-grade networking connecting operational technology systems with secure, segmented network architectures.",
      },
      {
        title: "Field Worker Communications",
        description:
          "DECT and mobile communications for field teams working in remote substations, plants, and distribution sites.",
      },
      {
        title: "Remote Site Networking",
        description:
          "Ruggedized networking equipment and SD-WAN for connecting distributed energy assets across wide geographies.",
      },
      {
        title: "Safety & Compliance",
        description:
          "Emergency notification systems, recording solutions, and compliance tools for regulatory requirements.",
      },
    ],
    customers: [
      { name: "Major European Utility", detail: "Wide-area network modernization" },
      { name: "Regional Power Authority", detail: "Substation connectivity upgrade" },
    ],
    products: ["OmniSwitch 6465", "OmniPCX Enterprise", "DECT Handsets", "OmniAccess Stellar", "OmniVista 2500"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Secure, seamless technology for connected manufacturing",
    description:
      "Modern manufacturing requires connected, secure, intelligent operations. ALE securely connects people, machines, objects and processes for real-time, data-driven production that drives faster decisions and increased agility.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/man-holding-a-tablet-image-1440x600.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Autonomous Production",
        description:
          "Industrial IoT integration for smarter control, faster throughput, lower costs, and improved worker safety on the factory floor.",
      },
      {
        title: "Supply Chain Optimization",
        description:
          "Efficient collaboration, AI-driven processes, and real-time asset tracking to shorten lead times and improve logistics.",
      },
      {
        title: "Connected Warehouses",
        description:
          "Secure operations with real-time visibility, location tracking, and faster fulfillment through automated workflows.",
      },
      {
        title: "Industrial Network Security",
        description:
          "Zero-trust network access, Private 5G, OmniFabric network fabric, and end-to-end encryption with a single hardened OS.",
      },
    ],
    customers: [
      { name: "C. Josef LAMY GmbH", detail: "Unified communications deployment" },
      { name: "Polytype AG", detail: "Industrial infrastructure modernization" },
      { name: "Brohl Wellpappe", detail: "Network resilience for production" },
      { name: "ALS Labelling Solutions", detail: "Field communications" },
    ],
    products: ["OmniSwitch 6465", "OmniPCX Enterprise", "Private 5G", "DECT Handsets", "OmniAccess Stellar"],
  },
  {
    slug: "smart-buildings",
    name: "Smart Buildings",
    tagline: "Intelligent networks for modern workspaces",
    description:
      "ALE transforms buildings into smart, connected environments that optimize energy consumption, enhance occupant comfort, and streamline facility management through unified networking, IoT integration, and AI-driven building analytics.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/smart-buildings-banner-image-1440x600-v2.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Building Automation",
        description:
          "IoT-connected HVAC, lighting, and access systems unified on a single converged network for centralized control.",
      },
      {
        title: "Occupancy Analytics",
        description:
          "Location-based services and sensors providing real-time space utilization data for optimized workplace planning.",
      },
      {
        title: "Unified Building Networks",
        description:
          "Single converged IP network carrying data, voice, video, and IoT — reducing infrastructure cost and complexity.",
      },
      {
        title: "Workplace Experience",
        description:
          "Smart meeting rooms, wayfinding, desk booking, and environmental comfort powered by integrated communications and IoT.",
      },
    ],
    customers: [
      { name: "Paris La Défense", detail: "Smart district networking" },
      { name: "Major Corporate HQ", detail: "Intelligent building transformation" },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "IoT Location Services", "Rainbow"],
  },
  {
    slug: "smb",
    name: "Small & Medium Business",
    tagline: "Enterprise-grade technology scaled for SMBs",
    description:
      "Small and medium businesses need enterprise-grade communications and networking to compete effectively, but without the complexity and cost of large-scale deployments. ALE offers purpose-built solutions that deliver powerful collaboration, reliable connectivity, and professional customer service — all designed for simplicity, affordability, and rapid deployment.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/smb-image-headerbanner-1200x299.jpg?h=600&w=1440",
    solutions: [
      {
        title: "Unified Communications",
        description:
          "OXO Connect delivers enterprise telephony features scaled for SMBs, with Rainbow collaboration built in for chat, video, and file sharing.",
      },
      {
        title: "Professional Customer Service",
        description:
          "Omnichannel contact center capabilities enable small teams to deliver big-company customer experiences across phone, email, chat, and social media.",
      },
      {
        title: "Reliable Networking",
        description:
          "OmniSwitch smart managed switches and OmniAccess Stellar Wi-Fi provide robust, secure connectivity that grows with your business.",
      },
      {
        title: "Cloud-First Deployment",
        description:
          "Purple on Demand and Rainbow cloud services eliminate upfront infrastructure costs with subscription-based, pay-as-you-grow models.",
      },
    ],
    customers: [
      { name: "Regional Law Firm", detail: "Unified communications for 50 employees" },
      { name: "Boutique Hotel Group", detail: "Guest Wi-Fi and staff collaboration" },
      { name: "Medical Practice", detail: "HIPAA-compliant communications" },
    ],
    products: ["OXO Connect", "Rainbow", "OmniSwitch 2360", "OmniAccess Stellar", "Purple on Demand"],
  },
];
