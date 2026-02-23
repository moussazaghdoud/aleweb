export interface ProductData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: { title: string; description: string }[];
  highlights: { stat: string; label: string }[];
  relatedProducts: string[];
  category: "communications" | "networking" | "management" | "connectivity";
}

export const platformData: ProductData[] = [
  /* ------------------------------------------------------------------ */
  /*  Rainbow — Cloud Communications Platform                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "rainbow",
    name: "Rainbow",
    tagline: "Secure cloud communications for the digital enterprise",
    description:
      "Rainbow is ALE's enterprise-grade cloud communication and collaboration platform. It enables organizations to accelerate digital transformation, keep employees connected and motivated, and deliver superior customer experiences. With flexible deployment options — on-premises, hybrid, private, or full cloud — Rainbow adapts to diverse business requirements while maintaining the highest levels of security and compliance.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/top-web-banner-rainbow-1440x660.jpg?h=600&w=1440",
    features: [
      {
        title: "Audio & Video Conferencing",
        description:
          "Host meetings with up to 120 participants and 12 simultaneous video streams. Screen sharing, file sharing, and real-time collaboration keep teams productive from anywhere.",
      },
      {
        title: "CPaaS Integration Hub",
        description:
          "Embed real-time communications into business applications through APIs and SDKs. Connectors for Microsoft Teams, Salesforce, and hundreds of other tools enable seamless workflows.",
      },
      {
        title: "AI-Powered Intelligence",
        description:
          "Machine learning capabilities provide decision-support alerts, smart recommendations, and predictive analytics to help teams work smarter and respond faster.",
      },
      {
        title: "Enterprise-Grade Security",
        description:
          "ISO 27001 certified with full GDPR and CCPA compliance. European sovereign certifications include ACN (Italy), C5 (Germany), ENS (Spain), CSPN and HDS (France).",
      },
    ],
    highlights: [
      { stat: "120", label: "participants per conference" },
      { stat: "ISO 27001", label: "certified security" },
      { stat: "6", label: "European certifications" },
      { stat: "Multi-device", label: "desktop, web, mobile" },
    ],
    relatedProducts: ["omniswitch", "stellar-wifi", "desk-phones"],
    category: "communications",
  },

  /* ------------------------------------------------------------------ */
  /*  OmniSwitch — Network Switching                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "omniswitch",
    name: "OmniSwitch",
    tagline:
      "Resilient, high-performance switching for campus, data center, and edge",
    description:
      "The OmniSwitch portfolio delivers enterprise-grade Ethernet switching across every deployment scenario — from access edge and campus aggregation to core data center and harsh industrial environments. With zero-touch provisioning, advanced PoE, and OmniFabric architecture, OmniSwitch simplifies operations while delivering wire-rate, non-blocking performance at speeds up to 100 GigE.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/product-switches-homepage-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    features: [
      {
        title: "Data Center & Core (OS 6900/6920/9900)",
        description:
          "Low-latency, wire-rate switching with 10/25/40/100 GigE interfaces. The modular OS 9900 chassis and AI/HPC-optimized OS 6920 scale from campus core to demanding data center fabrics.",
      },
      {
        title: "Access & Campus Edge (OS 6360/6560E/6860/6870)",
        description:
          "Stackable Gigabit and multi-gigabit switches with zero-touch provisioning, IoT device security, smart analytics, and optimization for Wi-Fi 6/6E/7 environments.",
      },
      {
        title: "Industrial & Hardened (OS 6465/6575/6865)",
        description:
          "Fan-less, DIN rail-mount switches built for extreme temperatures and harsh environments. Advanced PoE, precision timing, and secure automation for mission-critical industrial networks.",
      },
      {
        title: "Smart Managed Edge (OS 2260/2360)",
        description:
          "Cost-effective, cloud-enabled managed switches with static routing, Quality of Service, and wire-rate performance — ideal for smaller sites and branch offices.",
      },
    ],
    highlights: [
      { stat: "100 GigE", label: "maximum port speed" },
      { stat: "14+", label: "switch models" },
      { stat: "Zero-touch", label: "provisioning" },
      { stat: "IP67", label: "industrial ratings" },
    ],
    relatedProducts: ["stellar-wifi", "ai-ops", "private-5g"],
    category: "networking",
  },

  /* ------------------------------------------------------------------ */
  /*  Stellar Wi-Fi — Enterprise Wireless                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "stellar-wifi",
    name: "OmniAccess Stellar Wi-Fi",
    tagline: "Enterprise wireless from Wi-Fi 5 to Wi-Fi 7 — indoor and outdoor",
    description:
      "The OmniAccess Stellar access point portfolio provides high-performance wireless connectivity across every enterprise environment. From entry-level Wi-Fi 6 to cutting-edge Wi-Fi 7 (802.11be), Stellar APs deliver reliability, low latency, and high density coverage for offices, warehouses, campuses, and harsh outdoor deployments — all managed through a single pane of glass.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/ale-wlan-office-homepage-header-495x275.jpg?h=600&w=1440",
    features: [
      {
        title: "Wi-Fi 7 Access Points (AP1501/1511/1521)",
        description:
          "Next-generation 802.11be performance with ultra-low latency and multi-link operation. From cost-efficient entry-level to unrivalled mid-range performance for the most demanding environments.",
      },
      {
        title: "Wi-Fi 6E High-Density (AP1411/1431/1451)",
        description:
          "6 GHz spectrum support for faster speeds, wider channels, and lower latency. Purpose-built models for high client density environments like auditoriums, stadiums, and lecture halls.",
      },
      {
        title: "Outdoor & Ruggedized (AP1561/1570/1360)",
        description:
          "IP67-rated access points engineered to thrive in harsh weather, extreme temperatures, and industrial outdoor settings. Wi-Fi 7 and Wi-Fi 6 options for every deployment.",
      },
      {
        title: "Hospitality & Specialty (AP1301H/1320)",
        description:
          "Purpose-designed form factors for in-room hotel deployments, retail spaces, and specialty venues where aesthetics and coverage density matter.",
      },
    ],
    highlights: [
      { stat: "Wi-Fi 7", label: "latest standard supported" },
      { stat: "20+", label: "access point models" },
      { stat: "IP67", label: "outdoor ruggedization" },
      { stat: "6 GHz", label: "tri-band spectrum" },
    ],
    relatedProducts: ["omniswitch", "ai-ops", "private-5g"],
    category: "networking",
  },

  /* ------------------------------------------------------------------ */
  /*  AI Ops — OmniVista Network Advisor                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-ops",
    name: "OmniVista Network Advisor — AI Ops",
    tagline:
      "AI-powered network intelligence that anticipates and resolves issues before users notice",
    description:
      "OmniVista Network Advisor is an autonomous, AI-driven companion that minimizes network downtime and enhances Quality of Experience. Through integrated AI and machine learning, it monitors the entire network — ALE infrastructure and third-party equipment alike — to anticipate problems, accelerate troubleshooting, and benchmark performance. Real-time alerts via Rainbow and Microsoft Teams keep IT teams informed instantly.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/blogs-future-of-business-part-1-header-l2-l3-web.jpg?h=600&w=1440",
    features: [
      {
        title: "Proactive Issue Detection",
        description:
          "AI and ML algorithms detect network anomalies instantaneously, capturing essential diagnostic data at the moment of occurrence and proposing remediation steps before users are impacted.",
      },
      {
        title: "Security Threat Acceleration",
        description:
          "Configuration auditing and behavior change detection identify security threats faster. Historical analysis and real-time pattern matching reduce mean time to resolution for security incidents.",
      },
      {
        title: "Performance Benchmarking & Insights",
        description:
          "Continuous network performance benchmarking delivers actionable insights on capacity planning, provisioning errors, and network evolution trends through periodic health reports.",
      },
      {
        title: "Unified Platform Integration",
        description:
          "Native integration with Rainbow CPaaS and Microsoft Teams delivers real-time alerts and orchestration. Supports ALE OmniSwitch, OmniAccess Stellar, and any syslog-capable third-party device.",
      },
    ],
    highlights: [
      { stat: "AI/ML", label: "powered analytics" },
      { stat: "Real-time", label: "alerting & reports" },
      { stat: "3rd-party", label: "device support" },
      { stat: "Zero-day", label: "anomaly detection" },
    ],
    relatedProducts: ["omniswitch", "stellar-wifi", "rainbow"],
    category: "management",
  },

  /* ------------------------------------------------------------------ */
  /*  Private 5G — Dedicated Wireless Networks                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "private-5g",
    name: "Private 5G",
    tagline:
      "Secure, low-latency LTE/5G connectivity for business-critical operations",
    description:
      "ALE's Private 5G solution delivers dedicated, interference-free wireless connectivity for environments where traditional Wi-Fi falls short. Purpose-built for manufacturing floors, logistics hubs, and outdoor industrial sites, it provides deterministic connectivity with SIM-based Zero Trust authentication. Combined with ALE's LAN and WLAN portfolio, Private 5G enables true end-to-end enterprise connectivity.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/industrial-networks-header-image-v1.jpg?h=600&w=1440",
    features: [
      {
        title: "Deterministic Low-Latency Connectivity",
        description:
          "Sub-10ms latency and up to 1 Gbps throughput enable real-time responsiveness for robotics, AGVs, assembly equipment, and digital twin systems in mission-critical environments.",
      },
      {
        title: "Interference-Free Spectrum",
        description:
          "Dedicated licensed or shared spectrum eliminates wireless congestion and co-channel interference, delivering predictable, reliable network behavior across vast coverage areas.",
      },
      {
        title: "Zero Trust SIM-Based Security",
        description:
          "SIM-based authentication integrated with Zero Trust Network Access (ZTNA) ensures only authorized devices connect. End-to-end encryption secures data across the entire wireless path.",
      },
      {
        title: "Plug-and-Play Deployment",
        description:
          "Multi-mode LTE/5G access points with fast deployment significantly reduce time-to-value compared to traditional Distributed Antenna Systems, covering both indoor and outdoor environments.",
      },
    ],
    highlights: [
      { stat: "<10 ms", label: "network latency" },
      { stat: "1 Gbps", label: "peak throughput" },
      { stat: "ZTNA", label: "zero trust security" },
      { stat: "LTE + 5G", label: "multi-mode support" },
    ],
    relatedProducts: ["omniswitch", "stellar-wifi", "ai-ops"],
    category: "connectivity",
  },

  /* ------------------------------------------------------------------ */
  /*  Desk Phones & Terminals                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "desk-phones",
    name: "IP Desktop Phones & Terminals",
    tagline:
      "Innovative desk phones delivering rich communications in sleek designs for hybrid work",
    description:
      "ALE's comprehensive portfolio of desk phones, softphones, and wireless handsets provides enterprise-grade communications for every workspace. From HD video-enabled Smart DeskPhones to ruggedized DECT and WLAN handsets for frontline workers, the range connects seamlessly with Rainbow Hub, OmniPCX, and open SIP infrastructure to meet the demands of modern hybrid work environments.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/phone-directory-pageheader-1200x299.jpg?h=600&w=1440",
    features: [
      {
        title: "Smart DeskPhones",
        description:
          "High-end IP desk phones with immersive HD video, market-leading telephony features, and intuitive touchscreen interfaces — delivering premium communication at an affordable price point.",
      },
      {
        title: "SIP DeskPhones",
        description:
          "Enterprise-grade SIP terminals compatible with Rainbow Hub and any open SIP server. Designed for reliability, crystal-clear audio, and seamless integration with UC platforms.",
      },
      {
        title: "DECT & WLAN Handsets",
        description:
          "Wireless mobility solutions for frontline and field workers. SIP-DECT and WLAN handsets leverage existing infrastructure to deliver voice communications with full campus coverage.",
      },
      {
        title: "Softphones & Headsets",
        description:
          "VoIP softphone applications bring full desk phone functionality to any laptop or mobile device. The Aries Series headsets deliver professional audio for contact centers and UC environments.",
      },
    ],
    highlights: [
      { stat: "HD Video", label: "smart desk phones" },
      { stat: "Open SIP", label: "standards-based" },
      { stat: "DECT + WLAN", label: "wireless options" },
      { stat: "Aries Series", label: "professional headsets" },
    ],
    relatedProducts: ["rainbow", "omniswitch", "stellar-wifi"],
    category: "communications",
  },

  /* ------------------------------------------------------------------ */
  /*  OmniPCX Enterprise — Communication Server                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "omnipcx-enterprise",
    name: "OmniPCX Enterprise",
    tagline: "Enterprise communication server for mission-critical unified communications",
    description:
      "OmniPCX Enterprise is ALE's flagship communication server, delivering carrier-grade unified communications for large enterprises and mission-critical environments. Deployed in over 100 countries, OmniPCX Enterprise provides voice, video, messaging, and collaboration services with 99.999% availability — available on-premises, in the cloud, or as a hybrid deployment.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/product-communication-platforms-homepage-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    features: [
      {
        title: "Carrier-Grade Reliability",
        description: "99.999% availability with redundant architecture, automatic failover, and hot standby capabilities designed for mission-critical enterprise and government environments.",
      },
      {
        title: "Unified Communications",
        description: "Integrated voice, video, messaging, conferencing, and presence in a single platform. Native integration with Rainbow for cloud collaboration and mobility.",
      },
      {
        title: "Flexible Deployment",
        description: "Deploy on-premises, in private cloud, or hybrid. Supports virtualized environments with VMware and Hyper-V. Purple on Demand subscription model available.",
      },
      {
        title: "Defense & Government Certified",
        description: "Common Criteria, NATO, NIST, JITC, and FIPS 140-2 certifications. SIP perimeter defense and encrypted communications for classified environments.",
      },
    ],
    highlights: [
      { stat: "99.999%", label: "uptime availability" },
      { stat: "100+", label: "countries deployed" },
      { stat: "300K", label: "users per system" },
      { stat: "Defense", label: "grade certifications" },
    ],
    relatedProducts: ["rainbow", "desk-phones", "omniswitch"],
    category: "communications",
  },

  /* ------------------------------------------------------------------ */
  /*  OXO Connect — SMB Communication Server                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "oxo-connect",
    name: "OXO Connect",
    tagline: "All-in-one communication server designed for small and medium businesses",
    description:
      "OXO Connect is a powerful yet simple communication server purpose-built for SMBs. It combines enterprise-grade telephony, unified communications, and contact center capabilities in a single compact platform. With built-in Rainbow integration, OXO Connect gives small businesses access to the same collaboration tools used by large enterprises — at a fraction of the cost and complexity.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/product-communication-platforms-homepage-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    features: [
      {
        title: "All-in-One Platform",
        description: "Voice, messaging, mobility, and basic contact center in a single box. No additional servers required — reducing infrastructure costs and management complexity.",
      },
      {
        title: "Rainbow Integration",
        description: "Built-in Rainbow collaboration extends OXO Connect with cloud-based team messaging, video conferencing, file sharing, and mobile app access for employees on the go.",
      },
      {
        title: "Scalable Growth",
        description: "Start small and grow without replacing your system. OXO Connect scales from 10 to 300 users with simple license upgrades and modular expansion.",
      },
      {
        title: "Easy Management",
        description: "Web-based administration interface with intuitive wizards and auto-configuration. Remote management capabilities reduce the need for on-site IT expertise.",
      },
    ],
    highlights: [
      { stat: "300", label: "maximum users" },
      { stat: "All-in-1", label: "voice, UC, CC" },
      { stat: "Simple", label: "web management" },
      { stat: "SMB", label: "purpose-built" },
    ],
    relatedProducts: ["rainbow", "desk-phones", "stellar-wifi"],
    category: "communications",
  },

  /* ------------------------------------------------------------------ */
  /*  ALE Connect — Contact Center                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "ale-connect",
    name: "ALE Connect",
    tagline: "Omnichannel contact center solution for superior customer experiences",
    description:
      "ALE Connect is a comprehensive omnichannel contact center solution that enables organizations to deliver exceptional customer experiences across voice, email, chat, social media, and messaging channels. Available as cloud (CCaaS) or on-premises deployment, ALE Connect provides intelligent routing, real-time supervision, and detailed analytics to optimize agent productivity and customer satisfaction.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/product-communication-platforms-homepage-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    features: [
      {
        title: "Omnichannel Engagement",
        description: "Handle customer interactions across voice, email, web chat, social media, and messaging from a single unified agent desktop — ensuring consistent service quality.",
      },
      {
        title: "Intelligent Routing",
        description: "Skills-based routing, priority queuing, and AI-assisted distribution ensure every customer reaches the right agent at the right time for first-contact resolution.",
      },
      {
        title: "Real-Time Analytics",
        description: "Live dashboards, historical reporting, and conversation analytics provide actionable insights into agent performance, customer satisfaction, and contact center efficiency.",
      },
      {
        title: "Cloud or On-Premises",
        description: "Deploy as CCaaS in the cloud or on-premises for full control. Hybrid models support gradual cloud migration while maintaining existing infrastructure investments.",
      },
    ],
    highlights: [
      { stat: "Omnichannel", label: "voice, chat, email, social" },
      { stat: "AI", label: "assisted routing" },
      { stat: "CCaaS", label: "cloud deployment" },
      { stat: "Real-time", label: "analytics & reporting" },
    ],
    relatedProducts: ["rainbow", "omnipcx-enterprise", "desk-phones"],
    category: "communications",
  },

  /* ------------------------------------------------------------------ */
  /*  OmniVista Network Management                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "omnivista",
    name: "OmniVista Network Management",
    tagline: "Unified network management platform for ALE infrastructure",
    description:
      "OmniVista Network Management Platform provides comprehensive visibility, control, and automation for your entire ALE network infrastructure. From device discovery and configuration management to security policy enforcement and performance monitoring, OmniVista simplifies day-to-day network operations while ensuring compliance and optimal performance.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/product-network-homepage-header-l2-l3.jpg?h=600&w=1440",
    features: [
      {
        title: "Unified Dashboard",
        description: "Single pane of glass for managing switches, access points, and communications infrastructure. Real-time topology maps, device inventory, and health monitoring.",
      },
      {
        title: "Automated Provisioning",
        description: "Zero-touch provisioning with template-based configuration deployment. Bulk updates, scheduled maintenance windows, and rollback capabilities reduce manual effort.",
      },
      {
        title: "Security & Compliance",
        description: "BYOD and IoT device profiling with automatic policy application. Guest network management, access control lists, and compliance reporting.",
      },
      {
        title: "Cloud & On-Premises Options",
        description: "OmniVista Cirrus cloud management for distributed sites. On-premises OmniVista 2500 for organizations requiring local control. Both options with REST API integration.",
      },
    ],
    highlights: [
      { stat: "Single", label: "pane of glass" },
      { stat: "Zero-touch", label: "provisioning" },
      { stat: "IoT", label: "device profiling" },
      { stat: "REST API", label: "integration" },
    ],
    relatedProducts: ["omniswitch", "stellar-wifi", "ai-ops"],
    category: "management",
  },

  /* ------------------------------------------------------------------ */
  /*  Stellar Asset Tracking                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "asset-tracking",
    name: "OmniAccess Stellar Asset Tracking",
    tagline: "Real-time location and asset tracking for enterprise environments",
    description:
      "OmniAccess Stellar Asset Tracking provides real-time visibility into the location and status of equipment, people, and inventory across your facility. Using Bluetooth Low Energy (BLE) beacons and the Stellar Wi-Fi infrastructure, the solution delivers accurate indoor positioning without additional overlay networks — reducing search time, improving asset utilization, and enhancing workplace safety.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/header-banner-solutions-iot-1440x600-v2.jpg?h=600&w=1440",
    features: [
      {
        title: "Real-Time Location",
        description: "Track assets, people, and equipment in real time using BLE beacons integrated with OmniAccess Stellar access points. No separate location infrastructure required.",
      },
      {
        title: "Healthcare Applications",
        description: "Locate medical equipment, track patient flow, enable nurse call integration, and support staff safety with location-aware alerting and geofencing.",
      },
      {
        title: "Warehouse & Logistics",
        description: "Improve warehouse efficiency with real-time inventory location, automated zone monitoring, and movement analytics for optimization.",
      },
      {
        title: "Workplace Analytics",
        description: "Understand space utilization, occupancy patterns, and traffic flow to optimize workplace design, enhance safety compliance, and reduce real estate costs.",
      },
    ],
    highlights: [
      { stat: "BLE", label: "beacon technology" },
      { stat: "Real-time", label: "location tracking" },
      { stat: "No overlay", label: "uses existing Wi-Fi" },
      { stat: "Analytics", label: "space utilization" },
    ],
    relatedProducts: ["stellar-wifi", "omnivista", "ai-ops"],
    category: "connectivity",
  },
];
