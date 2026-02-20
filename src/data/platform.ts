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
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=1400&q=80",
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
];
