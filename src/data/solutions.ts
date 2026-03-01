export interface SolutionData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  capabilities: { title: string; description: string }[];
  products: string[];
  benefits: { stat: string; label: string }[];
  industries: string[];
}

export const solutionsData: SolutionData[] = [
  {
    slug: "modernize-communications",
    name: "Modernize Communications",
    tagline:
      "Empower your workforce with cloud-native communications that connect every conversation, channel, and customer touchpoint",
    description:
      "Our innovative communications portfolio allows organizations of all sizes to choose the best options for their digital transformation. From unified communications as a service to omnichannel contact centers, ALE delivers cloud-based communications and collaboration solutions that support remote work, conferencing, IoT, AI, and enhanced customer experiences — all with GDPR compliance, ISO 27001 certification, and data sovereignty guarantees not subject to the Cloud Act or Patriot Act.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/team-co-working-open-space-rainbow-web-page-header-1785x725.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Unified Communications as a Service",
        description:
          "Facilitate instant communications and collaboration among employees with enterprise-grade voice, video, messaging, and conferencing through Rainbow — supporting seamless work from any location on any device.",
      },
      {
        title: "Omnichannel Contact Center",
        description:
          "Reduce customer service complexity through streamlined and adaptable interactions via ALE Connect CCaaS — handling email, chat, social media, and telephone in a single unified agent experience.",
      },
      {
        title: "Enterprise Telephony",
        description:
          "Proven communications platforms for organizations of all sizes — OmniPCX Enterprise for large enterprises and OXO Connect for SMBs — with flexible subscription models including Purple on Demand.",
      },
      {
        title: "Communications Platform as a Service",
        description:
          "Embed real-time communications into existing business applications and processes with Rainbow CPaaS — enabling IoT workflow integration, automated alerts, and vertical solutions like Rainbow Classroom.",
      },
    ],
    products: [
      "Rainbow",
      "OmniPCX Enterprise",
      "ALE Connect",
      "OXO Connect",
      "Smart DeskPhones",
      "DECT Handsets",
      "IP Desktop Softphone",
    ],
    benefits: [
      { stat: "3M+", label: "users rely on ALE communications daily" },
      { stat: "100+", label: "countries with deployed solutions" },
      { stat: "GDPR", label: "compliant with ISO 27001 certification" },
    ],
    industries: [
      "healthcare",
      "education",
      "hospitality",
      "government",
      "transportation",
      "energy",
      "manufacturing",
      "smart-buildings",
    ],
  },
  {
    slug: "secure-your-network",
    name: "Secure Your Network",
    tagline:
      "Build a resilient, automated network foundation that securely connects people, applications, and IoT devices at scale",
    description:
      "Digital age technologies take organizations into the new digital era with a network foundation that delivers the services needed to grow your business. ALE's autonomous networking solutions integrate mobility, data analytics, cloud, and IoT innovations into operations — with automation as the key to reducing workloads, boosting efficiency, and minimizing human error. A streamlined portfolio with a unified OS across edge-to-core infrastructure provides flexible deployment for office, outdoor, and industrial environments.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/security-header-image-1400-600-v4.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Autonomous Network Fabric",
        description:
          "AI-powered and automated networks that securely connect people, processes, applications, and objects — automatically adapting to demand with a single hardened operating system from edge to core.",
      },
      {
        title: "Zero-Trust IoT Segmentation",
        description:
          "Automated device onboarding with virtual segmentation that isolates services into separate network containers, ensuring dedicated segments for proper function and security while minimizing compromise risk.",
      },
      {
        title: "Enterprise Wi-Fi & Switching",
        description:
          "OmniSwitch and OmniAccess Stellar deliver a streamlined portfolio with unified OS across edge-to-core infrastructure — supporting campus, branch, data center, and industrial environments.",
      },
      {
        title: "Cloud & On-Premises Management",
        description:
          "OmniVista Cirrus cloud-based management and OmniVista Network Management Platform provide flexible deployment options with real-time monitoring, analytics, and alarm triggers.",
      },
    ],
    products: [
      "OmniSwitch",
      "OmniAccess Stellar",
      "OmniVista Cirrus",
      "OmniVista Network Management Platform",
      "OmniFabric",
      "SD-WAN",
    ],
    benefits: [
      { stat: "1", label: "unified OS across the entire switching portfolio" },
      { stat: "29M+", label: "device database for automatic IoT identification" },
      { stat: "Zero Trust", label: "architecture with built-in macro/micro segmentation" },
    ],
    industries: [
      "healthcare",
      "education",
      "hospitality",
      "government",
      "transportation",
      "energy",
      "manufacturing",
      "smart-buildings",
    ],
  },
  {
    slug: "optimize-with-ai",
    name: "Optimize with AI",
    tagline:
      "Harness AI-driven intelligence to anticipate network issues, automate operations, and transform IoT data into actionable insights",
    description:
      "OmniVista Network Advisor is an autonomous platform leveraging artificial intelligence and machine learning to minimize network downtime and enhance Quality of Experience. The system anticipates and resolves network problems proactively — sometimes before end users even detect issues. Combined with real-time IoT analytics and workflow automation, ALE's AI Ops solutions transform raw sensor data into actionable business intelligence that drives smarter decisions across your entire operation.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/blogs-future-of-business-part-1-header-l2-l3-web.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Predictive Network Intelligence",
        description:
          "AI and ML continuously capture network data to identify issues instantaneously, propose remediation actions, and anticipate problems before they impact users — with automatic data capture at the moment of occurrence.",
      },
      {
        title: "IoT Analytics & Automation",
        description:
          "Access a 29+ million device database for automatic identification, continuous behavior monitoring of connected objects, and automatic disconnection of faulty devices with admin notification.",
      },
      {
        title: "Workflow Orchestration",
        description:
          "Integration with notification servers and CPaaS platforms to transform sensor data into actionable user responses — automating business processes and enabling new digital revenue streams.",
      },
      {
        title: "Security Threat Detection",
        description:
          "Accelerated security threat detection and mitigation through AI-driven analysis, network performance benchmarking, provisioning error alerts, and periodic comprehensive health reports.",
      },
    ],
    products: [
      "OmniVista Network Advisor",
      "OmniVista Cirrus",
      "OmniVista 2500",
      "Rainbow CPaaS",
      "OmniAccess Stellar",
    ],
    benefits: [
      { stat: "AI/ML", label: "powered proactive issue resolution" },
      { stat: "Real-time", label: "monitoring across entire network infrastructure" },
      { stat: "29M+", label: "device profiles for automatic IoT classification" },
    ],
    industries: [
      "healthcare",
      "education",
      "hospitality",
      "government",
      "transportation",
      "energy",
      "manufacturing",
      "smart-buildings",
    ],
  },
  {
    slug: "move-to-cloud",
    name: "Move to Cloud",
    tagline:
      "Improve your competitiveness with Everything as a Service — flexible subscription models for communications, collaboration, and networking",
    description:
      "ALE's XaaS solutions provide subscription-based services enabling organizations to shift from traditional upfront purchases to flexible, pay-as-you-go models. Whether you need UCaaS, CCaaS, NaaS, or CPaaS, our portfolio delivers greater budget control, enhanced business agility, and the ability to quickly adjust services based on evolving needs — with secure deployment options spanning public cloud, private cloud, and on-premises hybrid environments. Rainbow Edge provides a private cloud option with local data center hosting for organizations requiring data sovereignty.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/converged-everthing-aas-solution-1140x600-banner.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "UCaaS & CCaaS",
        description:
          "Facilitate instant communications and collaboration among employees with unified communications, and reduce customer service complexity through streamlined omnichannel contact center interactions.",
      },
      {
        title: "Network as a Service",
        description:
          "Enhance connectivity for campus, branch office, remote worker, and data center environments with subscription-based access to switches, Wi-Fi, SD-WAN, and lifecycle services — all at predictable monthly costs.",
      },
      {
        title: "Hybrid & Private Cloud",
        description:
          "Rainbow Edge offers on-premises private cloud with flexible architecture, supporting local data centers or standalone deployments — all GDPR compliant, ISO 27001 and HDS healthcare certified.",
      },
      {
        title: "Consumption-Based Billing",
        description:
          "Shift from CapEx to OpEx with price stability throughout subscription terms, automatic license adjustments for scalability, and business metric-based billing options for industry-specific needs.",
      },
    ],
    products: [
      "Rainbow",
      "Rainbow Edge",
      "Purple on Demand",
      "OmniVista Cirrus",
      "ALE Connect",
      "OmniAccess Stellar",
    ],
    benefits: [
      { stat: "OpEx", label: "model with predictable monthly costs" },
      { stat: "4-in-1", label: "XaaS: UCaaS, CCaaS, NaaS, and CPaaS" },
      { stat: "80%", label: "of workers prefer flexible work models (McKinsey)" },
    ],
    industries: [
      "healthcare",
      "education",
      "hospitality",
      "government",
      "transportation",
      "energy",
      "manufacturing",
      "smart-buildings",
    ],
  },
  {
    slug: "enable-hybrid-work",
    name: "Enable Hybrid Work",
    tagline:
      "Engage your employees and deliver superior customer experience with a hybrid work environment built on enterprise-grade communications",
    description:
      "The hybrid work model combining in-office, remote, and mobile work is here to stay. Organizations implementing flexible communications technologies gain competitive advantage by keeping employees connected and empowered to deliver customer excellence. ALE provides enterprise-grade solutions with security, resilience, and mobility — from cloud collaboration with Rainbow to intelligent desk phones and softphones — enabling efficient, universal solutions that leverage existing investments for fast benefits and reduced risk.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hybrid-workplace-header-l2-3-1440x280-72dpi.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Cloud Collaboration",
        description:
          "Rainbow team collaboration platform delivers chat, file exchange, audio and video calls, screen sharing, and conferencing — keeping distributed teams connected regardless of location or device.",
      },
      {
        title: "Smart Devices & Softphones",
        description:
          "Digital-age desk phones and IP Desktop Softphone provide full enterprise telephony from any workspace — with intuitive interfaces designed for on-site and remote use alike.",
      },
      {
        title: "Omnichannel Customer Service",
        description:
          "ALE Connect CCaaS empowers remote agents with omnichannel customer service across email, chat, social media, and telephone — maintaining consistent service levels from any location.",
      },
      {
        title: "Secure Remote Access",
        description:
          "OmniAccess Stellar access points extend secure corporate network access to remote workers, enabling connectivity to non-cloud-based applications and databases with enterprise-grade security.",
      },
    ],
    products: [
      "Rainbow",
      "OmniPCX Enterprise",
      "OXO Connect",
      "ALE Connect",
      "ALE DeskPhones",
      "IP Desktop Softphone",
      "OmniAccess Stellar AP1201H",
    ],
    benefits: [
      { stat: "3M+", label: "daily users on ALE communications platforms" },
      { stat: "Any", label: "device, any location, any time" },
      { stat: "100%", label: "feature parity between office and remote" },
    ],
    industries: [
      "healthcare",
      "education",
      "hospitality",
      "government",
      "manufacturing",
      "smart-buildings",
    ],
  },
  {
    slug: "connect-everything",
    name: "Connect Everything",
    tagline:
      "Support extensive IoT use with secure connectivity through a Zero Trust Network — from Private 5G to asset tracking at scale",
    description:
      "ALE supports billions of connected devices across industries with automated, secure device onboarding and network integration through a Zero Trust architecture. From automatic device discovery and classification using a 29+ million device database, to virtual segmentation that isolates services into separate network containers, to continuous real-time behavior monitoring — ALE's IoT and connectivity solutions transform how organizations connect people, places, and things to drive operational intelligence and sustainability.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/header-banner-solutions-iot-1440x600-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "IoT Device Discovery & Classification",
        description:
          "Automatic identification from a 29+ million device database with instant provisioning and policy application — connecting any device securely without manual configuration.",
      },
      {
        title: "Private 5G & DECT",
        description:
          "Low-latency LTE and 5G connectivity for mission-critical operations alongside enterprise DECT for voice and messaging in industrial, logistics, and campus environments.",
      },
      {
        title: "Asset Tracking & Location Services",
        description:
          "OmniAccess Stellar Asset Tracking provides real-time visibility into the location and status of equipment, people, and inventory across your entire facility.",
      },
      {
        title: "Continuous Security Monitoring",
        description:
          "Real-time behavior monitoring of connected objects with automatic disconnection of faulty devices and admin notification — ensuring network integrity at all times.",
      },
    ],
    products: [
      "Private 5G",
      "OmniAccess Stellar",
      "OmniAccess Stellar Asset Tracking",
      "DECT Handsets",
      "DECT Base Stations",
      "OmniVista Cirrus",
      "Rainbow CPaaS",
    ],
    benefits: [
      { stat: "29M+", label: "device profiles in automatic identification database" },
      { stat: "Zero Trust", label: "network architecture with virtual segmentation" },
      { stat: "Real-time", label: "continuous monitoring and automated response" },
    ],
    industries: [
      "healthcare",
      "education",
      "hospitality",
      "government",
      "transportation",
      "energy",
      "manufacturing",
      "smart-buildings",
    ],
  },
  {
    slug: "business-continuity",
    name: "Business Continuity",
    tagline: "Achieve operational continuity while building toward your future with proven, efficient, and secure solutions",
    description:
      "Business disruptions — from natural disasters to pandemics — demand organizations maintain operations, protect employees, and serve customers without interruption. ALE business continuity solutions provide resilient communications, secure remote access, and rapid deployment capabilities that keep your business running through any crisis.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-business-continuity-homepage-header-l2-l3-1440x600.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Remote Work Enablement",
        description: "Rapidly deploy secure communications for remote workers with Rainbow cloud collaboration, IP Desktop Softphone, and OmniAccess Stellar remote access points.",
      },
      {
        title: "Crisis Communications",
        description: "Visual Notification Assistant and Dispatch Console provide mass notification, emergency coordination, and multi-channel crisis communication capabilities.",
      },
      {
        title: "Network Resilience",
        description: "Redundant network architecture with Shortest Path Bridging, automatic failover, and self-healing fabric ensures network availability during infrastructure disruption.",
      },
      {
        title: "Education Continuity",
        description: "Enable remote and hybrid learning with Rainbow Classroom, secure VPN access for students and staff, and virtual classroom solutions that maintain education quality.",
      },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "Visual Notification Assistant", "OmniAccess Stellar", "IP Desktop Softphone", "OmniSwitch"],
    benefits: [
      { stat: "99.999%", label: "platform availability" },
      { stat: "Minutes", label: "time to deploy remote access" },
      { stat: "Any crisis", label: "stay operational through disruption" },
    ],
    industries: ["healthcare", "education", "government", "transportation", "energy", "manufacturing"],
  },
  {
    slug: "sd-wan-sase",
    name: "SD-WAN & SASE",
    tagline: "Combine smart networking and advanced security into a single solution for fast, safe, seamless access",
    description:
      "ALE SD-WAN and SASE solutions simplify how distributed enterprises connect branch offices, remote workers, and cloud applications. By combining intelligent traffic routing with cloud-delivered security, organizations get faster application performance, simplified operations, and comprehensive threat protection — all at lower cost than traditional MPLS-based WAN architectures.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-unified-access-homepage-header-l2-l3-1440x600.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Intelligent Traffic Routing",
        description: "Policy-based routing prioritizes business-critical applications across multiple WAN links — MPLS, broadband, LTE/5G — ensuring optimal performance and cost efficiency.",
      },
      {
        title: "Cloud-Delivered Security",
        description: "SASE integration provides firewall-as-a-service, secure web gateway, and zero trust network access for consistent security regardless of user location.",
      },
      {
        title: "Centralized Orchestration",
        description: "Deploy, monitor, and manage hundreds of branch sites from a single management plane with automated configuration, zero-touch provisioning, and real-time analytics.",
      },
      {
        title: "Multi-Cloud Connectivity",
        description: "Direct cloud on-ramps for AWS, Azure, and Google Cloud with optimized routing, reducing latency for SaaS and cloud-native applications.",
      },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "SD-WAN", "OmniFabric"],
    benefits: [
      { stat: "50%", label: "reduction in WAN costs vs MPLS" },
      { stat: "Zero Trust", label: "security architecture" },
      { stat: "Single", label: "management plane for all sites" },
    ],
    industries: ["healthcare", "education", "government", "manufacturing", "energy", "smart-buildings"],
  },
  {
    slug: "cpaas",
    name: "CPaaS",
    tagline: "Embed real-time communications into business applications and processes with Communications Platform as a Service",
    description:
      "Rainbow CPaaS (Communications Platform as a Service) enables organizations to embed real-time communications — voice, video, messaging, and presence — directly into business applications through APIs and SDKs. From automated notifications and IoT workflow integration to AI-powered chatbots and vertical solutions, CPaaS transforms how businesses interact with customers, employees, and connected devices.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/team-co-working-open-space-rainbow-web-page-header-1785x725.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "APIs & SDKs",
        description: "REST APIs, JavaScript, iOS, and Android SDKs enable developers to embed Rainbow communications into any application — from CRM to ERP to custom vertical solutions.",
      },
      {
        title: "IoT Workflow Integration",
        description: "Connect IoT sensors and devices to business workflows with automated notifications, escalation chains, and real-time data visualization through Rainbow channels.",
      },
      {
        title: "AI Chatbots & Automation",
        description: "Build intelligent chatbots and virtual assistants that handle routine inquiries, route complex requests, and provide 24/7 customer engagement across digital channels.",
      },
      {
        title: "Vertical Solutions",
        description: "Pre-built CPaaS solutions for education (Rainbow Classroom), healthcare (patient engagement), hospitality (guest services), and government (citizen services).",
      },
    ],
    products: ["Rainbow CPaaS", "Rainbow", "OmniPCX Enterprise", "ALE Connect"],
    benefits: [
      { stat: "REST API", label: "standard developer experience" },
      { stat: "Multi-platform", label: "web, iOS, Android SDKs" },
      { stat: "Vertical", label: "pre-built industry solutions" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "transportation", "manufacturing", "smart-buildings"],
  },
  {
    slug: "unified-communications",
    name: "Unified Communications",
    tagline: "Connect offices from anywhere with secure, reliable unified communications solutions",
    description:
      "ALE's unified communications solutions bring together voice, video, messaging, conferencing, and presence into seamless experiences that keep employees productive regardless of location. From enterprise-grade telephony with OmniPCX Enterprise to cloud collaboration with Rainbow, ALE provides the full spectrum of UC capabilities with flexible deployment options and industry-leading security certifications.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-collaboration-solutions-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Enterprise Telephony",
        description: "Carrier-grade voice communications with OmniPCX Enterprise for large organizations and OXO Connect for SMBs — both with Rainbow integration for modern collaboration.",
      },
      {
        title: "Video & Conferencing",
        description: "HD video meetings with up to 120 participants, screen sharing, recording, and virtual meeting rooms through Rainbow — accessible from any device, anywhere.",
      },
      {
        title: "Team Messaging",
        description: "Persistent team channels, file sharing, and real-time messaging with Rainbow. Integration with Microsoft Teams, Salesforce, and hundreds of business applications.",
      },
      {
        title: "Mobility & Softphones",
        description: "Full UC experience on mobile devices with Rainbow mobile app and IP Desktop Softphone. DECT and WLAN handsets for frontline workers requiring wireless mobility.",
      },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "OXO Connect", "Smart DeskPhones", "DECT Handsets", "IP Desktop Softphone"],
    benefits: [
      { stat: "3M+", label: "daily users on ALE platforms" },
      { stat: "GDPR", label: "compliant with data sovereignty" },
      { stat: "Hybrid", label: "cloud, on-premises, or both" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "iot-networks",
    name: "IoT Networks",
    tagline: "Support extensive IoT use with secure connectivity through a Zero Trust Network",
    description:
      "ALE IoT networking solutions provide the secure, scalable infrastructure needed to connect billions of devices across enterprise environments. From automatic device discovery and classification to virtual segmentation and continuous monitoring, ALE ensures every IoT device is securely onboarded, properly isolated, and continuously monitored — all through an automated Zero Trust architecture.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/header-banner-solutions-iot-1440x600-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Automatic Device Discovery",
        description: "29+ million device database enables automatic identification and classification of IoT devices upon connection, with instant policy application and network segmentation.",
      },
      {
        title: "Virtual Segmentation",
        description: "IoT Containment isolates device types into separate virtual network segments, preventing lateral movement and limiting blast radius in case of compromise.",
      },
      {
        title: "Continuous Monitoring",
        description: "Real-time behavior monitoring detects anomalies, automatically quarantines compromised devices, and notifies administrators — maintaining network integrity at all times.",
      },
      {
        title: "Multi-Protocol Support",
        description: "Wi-Fi, Bluetooth Low Energy, LoRaWAN, and cellular connectivity through a unified network fabric supporting diverse IoT protocols and use cases.",
      },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "Private 5G", "Rainbow CPaaS"],
    benefits: [
      { stat: "29M+", label: "device fingerprint database" },
      { stat: "Zero Trust", label: "automated IoT security" },
      { stat: "Real-time", label: "behavior monitoring" },
    ],
    industries: ["healthcare", "education", "government", "transportation", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "digital-age-communications",
    name: "Digital Age Communications",
    tagline: "Our innovative communications portfolio allows organizations of all sizes to choose the best options for their business",
    description:
      "Alcatel-Lucent Enterprise Digital Age Communications enables organizations to address rapid workplace changes through cloud-based solutions. More than 3 million users per day experience the power of ALE communications — from unified voice and video to omnichannel contact center and embedded CPaaS. Whether supporting remote work, collaboration from anywhere, or accelerating digital transformation, ALE delivers a complete portfolio with flexible deployment across public cloud, private cloud, and on-premises — all GDPR-compliant and ISO 27001 certified.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/team-co-working-open-space-rainbow-web-page-header-1785x725.jpg?h=600&w=1440",
    capabilities: [
      { title: "Digital Workplace", description: "Address new working methods with cloud-based collaboration tools that empower employees to work productively from anywhere, on any device." },
      { title: "Connect Everything", description: "Integrate people, applications, and objects through a unified communications platform that breaks down silos and enables seamless workflows." },
      { title: "Any Cloud", description: "Choose public cloud, private cloud with Rainbow Edge, or on-premises deployment — with easy migration paths between models and no vendor lock-in." },
      { title: "Omnichannel Engagement", description: "ALE Connect CCaaS handles customer interactions across email, chat, social media, and telephone in a unified agent experience." },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "ALE Connect", "OXO Connect", "Rainbow CPaaS", "Smart DeskPhones"],
    benefits: [
      { stat: "3M+", label: "users per day" },
      { stat: "GDPR", label: "compliant & ISO 27001" },
      { stat: "Any Cloud", label: "flexible deployment" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "manufacturing", "smart-buildings"],
  },
  {
    slug: "digital-age-networking",
    name: "Digital Age Networking",
    tagline: "Elevate your organization with a network foundation that delivers the services needed to grow your business",
    description:
      "Digital age technologies take organizations into the new digital era with a network foundation built on three pillars: an autonomous network that automatically and securely connects people, processes, applications, and objects; IoT integration with secure onboarding using segmentation to minimize compromise risk; and business innovation through workflow automation enabling new digital business processes and revenue streams. With a single hardened OS from edge to core, AI-driven analytics, and a streamlined portfolio deployable across office, outdoor, and industrial environments, ALE networks are designed for the demands of modern enterprise environments.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-digital-age-networking-homepage-header-l2-l3-1440x600.jpg?h=600&w=1440",
    capabilities: [
      { title: "Autonomous Network", description: "Automatically and securely connects people, processes, applications, and objects with a self-forming SPB fabric and zero-touch provisioning." },
      { title: "Secure IoT Integration", description: "Automatic device discovery from a 29M+ device database with virtual segmentation, continuous behavior monitoring, and automated containment." },
      { title: "AI-Driven Operations", description: "OmniVista Network Advisor uses AI/ML to anticipate issues, automate remediation, and optimize network performance proactively." },
      { title: "Cloud Management", description: "OmniVista Cirrus provides centralized cloud-based management across all network infrastructure with real-time analytics and deployment flexibility." },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "OmniVista Network Advisor", "OmniAccess Stellar Asset Tracking"],
    benefits: [
      { stat: "1 OS", label: "edge to core" },
      { stat: "29M+", label: "IoT device fingerprints" },
      { stat: "3 Pillars", label: "autonomous, IoT, innovation" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "transportation", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "network-security",
    name: "Network Security",
    tagline: "Protect your infrastructure with zero-trust architecture, micro-segmentation, and automated threat response",
    description:
      "ALE network security solutions provide multi-layered protection through zero-trust architecture, automated IoT containment, and intelligent threat detection. Built into the network fabric itself, security is not an add-on but a fundamental design principle — from automatic device fingerprinting and policy application to real-time behavior monitoring and automated quarantine.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/security-header-image-1400-600-v4.jpg?h=600&w=1440",
    capabilities: [
      { title: "Zero-Trust Architecture", description: "Every device and user is authenticated and authorized before accessing network resources, with continuous verification throughout the session." },
      { title: "Micro-Segmentation", description: "IoT Containment isolates device types into separate virtual segments, preventing lateral movement and limiting blast radius." },
      { title: "Automated Threat Response", description: "Real-time behavior monitoring detects anomalies and automatically quarantines compromised devices with admin notification." },
      { title: "MACsec Encryption", description: "256-bit MACsec encryption across the switching portfolio protects data in transit at Layer 2 without performance impact." },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "OpenTouch SBC"],
    benefits: [
      { stat: "Zero Trust", label: "built into the fabric" },
      { stat: "Auto", label: "quarantine on anomaly" },
      { stat: "MACsec", label: "256-bit encryption" },
    ],
    industries: ["healthcare", "government", "education", "energy", "manufacturing", "transportation"],
  },
  {
    slug: "autonomous-network",
    name: "Autonomous Network",
    tagline: "Self-configuring, self-healing networks that reduce operational complexity",
    description:
      "ALE autonomous networking solutions leverage AI, automation, and intelligent fabric technologies to create networks that configure, monitor, and repair themselves with minimal human intervention. From zero-touch provisioning to predictive analytics and automated remediation, autonomous networking reduces operational burden while improving reliability and performance.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/blogs-future-of-business-part-1-header-l2-l3-web.jpg?h=600&w=1440",
    capabilities: [
      { title: "Auto-Fabric", description: "SPB-based fabric automatically discovers topology, assigns addresses, and creates optimal forwarding paths — no manual VLAN configuration required." },
      { title: "Zero-Touch Provisioning", description: "New switches and access points automatically download configuration and firmware upon connection, eliminating truck rolls." },
      { title: "Predictive Analytics", description: "AI/ML engines analyze network behavior patterns to predict and prevent issues before they impact users or applications." },
      { title: "Self-Healing", description: "Automated failover, dynamic rerouting, and sub-second recovery ensure continuous network availability without manual intervention." },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Network Advisor", "OmniVista Cirrus"],
    benefits: [
      { stat: "Zero Touch", label: "automatic deployment" },
      { stat: "Self-healing", label: "sub-second recovery" },
      { stat: "AI/ML", label: "predictive operations" },
    ],
    industries: ["healthcare", "education", "government", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "data-center-networking",
    name: "Data Center Networking",
    tagline: "High-performance, low-latency switching for modern data center and AI/HPC workloads",
    description:
      "ALE data center networking solutions deliver the high-density, low-latency, lossless fabric required for modern data center environments including AI/ML training clusters, high-performance computing, and virtualized infrastructure. With 100G/400G switching, VXLAN overlay, and RoCE support, ALE provides the foundation for next-generation data centers.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-digital-age-networking-homepage-header-l2-l3-1440x600.jpg?h=600&w=1440",
    capabilities: [
      { title: "Ultra-Low Latency", description: "Sub-microsecond cut-through switching optimized for AI training clusters, financial trading, and HPC interconnects." },
      { title: "Lossless Fabric", description: "RoCEv2 with Priority Flow Control and ECN ensures zero packet loss for storage and GPU interconnects." },
      { title: "Network Virtualization", description: "VXLAN and SPB-M provide flexible overlay networks with multi-tenancy for cloud and virtualized environments." },
      { title: "Automation & Telemetry", description: "Streaming telemetry, REST APIs, and gNMI/gRPC enable deep integration with data center orchestration platforms." },
    ],
    products: ["OmniSwitch 6900", "OmniSwitch 6920", "OmniSwitch 9900", "OmniVista Cirrus"],
    benefits: [
      { stat: "<1μs", label: "switching latency" },
      { stat: "400G", label: "port speeds" },
      { stat: "Lossless", label: "RoCE fabric" },
    ],
    industries: ["government", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "industrial-networks",
    name: "Industrial Networks",
    tagline: "Ruggedized networking for harsh environments and mission-critical OT infrastructure",
    description:
      "ALE industrial networking solutions bring enterprise-grade features to the most demanding environments. Fan-less, hardened switches with extended temperature ranges, DIN rail mounting, and industrial certifications provide reliable connectivity for manufacturing floors, transportation infrastructure, utility substations, and outdoor deployments — with full IT/OT convergence capabilities.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/industrial-networks-header-image-v1.jpg?h=600&w=1440",
    capabilities: [
      { title: "Hardened Design", description: "Fan-less operation from -40°C to +75°C with IP67 options, DIN rail mounting, and M12 connectors for extreme environments." },
      { title: "IT/OT Convergence", description: "Enterprise security and IoT containment applied to industrial control systems, SCADA, and operational technology networks." },
      { title: "Precision Timing", description: "IEEE 1588v2 PTP provides microsecond-accurate time synchronization for industrial automation and smart grid applications." },
      { title: "Transportation Certified", description: "EN 50155 railway compliance and EN 50121 EMC certification for trackside, tunnel, and on-board deployments." },
    ],
    products: ["OmniSwitch 6465", "OmniSwitch 6465T", "OmniSwitch 6575", "OmniSwitch 6865"],
    benefits: [
      { stat: "-40°C", label: "to +75°C operation" },
      { stat: "Fan-less", label: "zero maintenance" },
      { stat: "EN 50155", label: "rail certified" },
    ],
    industries: ["transportation", "energy", "manufacturing"],
  },
  {
    slug: "video-surveillance-networking",
    name: "Video Surveillance Networking",
    tagline: "Purpose-built network infrastructure for reliable, high-bandwidth video surveillance",
    description:
      "ALE video surveillance networking solutions provide the reliable, high-bandwidth infrastructure required for enterprise-scale IP video surveillance deployments. With high-density PoE for powering cameras, guaranteed bandwidth for video streams, and deep integration with Milestone XProtect VMS, ALE delivers a unified surveillance and network management experience.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/security-header-image-1400-600-v4.jpg?h=600&w=1440",
    capabilities: [
      { title: "High-Density PoE", description: "Up to 95W per port powers PTZ cameras, fixed cameras, and analytics appliances without separate power infrastructure." },
      { title: "Guaranteed Bandwidth", description: "QoS policies ensure video streams receive consistent bandwidth even during peak network usage periods." },
      { title: "Milestone Integration", description: "OmniSwitch Milestone Plugin provides camera auto-discovery, PoE management, and network health monitoring within Milestone XProtect." },
      { title: "Outdoor Ready", description: "Hardened OmniSwitch models provide ruggedized outdoor switching for campus perimeter and parking area camera networks." },
    ],
    products: ["OmniSwitch 6860", "OmniSwitch 6865", "OmniSwitch Milestone Plugin", "OmniVista Cirrus"],
    benefits: [
      { stat: "95W", label: "PoE per port" },
      { stat: "Milestone", label: "VMS integrated" },
      { stat: "Outdoor", label: "hardened options" },
    ],
    industries: ["government", "transportation", "education", "smart-buildings"],
  },
  {
    slug: "purple-on-demand",
    name: "Purple on Demand",
    tagline: "Subscription-based enterprise communications — consume what you need, when you need it",
    description:
      "Purple on Demand is ALE's subscription-based communications offering that enables organizations to consume OmniPCX Enterprise and Rainbow capabilities on a flexible, pay-as-you-go basis. Shift from capital expenditure to operational expenditure with predictable monthly costs, automatic updates, and the ability to scale users up or down as business needs evolve.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/converged-everthing-aas-solution-1140x600-banner.jpg?h=600&w=1440",
    capabilities: [
      { title: "Subscription Model", description: "Consume enterprise telephony and collaboration as a monthly service — no upfront hardware or license purchases required." },
      { title: "Flexible Scaling", description: "Add or remove user licenses as your workforce changes. Pay only for what you use with no over-provisioning." },
      { title: "Automatic Updates", description: "Software updates and new features are included in the subscription, keeping your communications platform current." },
      { title: "Hybrid Deployment", description: "Available for on-premises OmniPCX Enterprise, cloud Rainbow, or hybrid configurations combining both." },
    ],
    products: ["OmniPCX Enterprise", "Rainbow", "OXO Connect"],
    benefits: [
      { stat: "OpEx", label: "subscription pricing" },
      { stat: "Flex", label: "scale up or down" },
      { stat: "Always", label: "current with updates" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "manufacturing", "smart-buildings"],
  },
  {
    slug: "network-as-a-service",
    name: "Network as a Service",
    tagline: "Deliver latest network technologies with maximum agility, scalability, and flexibility through NaaS",
    description:
      "ALE Network as a Service (NaaS) enables organizations to consume enterprise networking infrastructure on a subscription basis. Instead of large upfront capital investments, NaaS delivers switches, access points, and lifecycle services at predictable monthly costs — with the flexibility to scale up or down as business needs evolve.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/converged-everthing-aas-solution-1140x600-banner.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Subscription Networking",
        description: "Consume OmniSwitch, Stellar Wi-Fi, and network management as a monthly service — shifting from CapEx to OpEx with predictable, budget-friendly costs.",
      },
      {
        title: "Lifecycle Services Included",
        description: "Hardware, software updates, technical support, and equipment refresh cycles are all included in the subscription — eliminating surprise maintenance costs.",
      },
      {
        title: "Scalable On-Demand",
        description: "Add or remove networking capacity as your business grows or changes. No over-provisioning, no stranded assets — pay only for what you use.",
      },
      {
        title: "Cloud-Managed",
        description: "OmniVista Cirrus cloud management provides centralized visibility and control across all NaaS-delivered infrastructure, with analytics and reporting included.",
      },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "SD-WAN"],
    benefits: [
      { stat: "OpEx", label: "subscription-based model" },
      { stat: "Lifecycle", label: "full services included" },
      { stat: "Flex", label: "scale up or down anytime" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "manufacturing", "smart-buildings"],
  },
  {
    slug: "cloud-communications",
    name: "Cloud Communications",
    tagline: "Transform your enterprise communications with secure, sovereign cloud solutions",
    description:
      "ALE cloud communications solutions deliver enterprise-grade voice, video, messaging, and contact center capabilities from the cloud — with full GDPR compliance, ISO 27001 certification, and data sovereignty guarantees. Whether you choose public cloud with Rainbow, private cloud with Rainbow Edge, or hybrid configurations, ALE provides the flexibility to migrate at your own pace while maintaining the security and reliability your organization requires.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/converged-everthing-aas-solution-1140x600-banner.jpg?h=600&w=1440",
    capabilities: [
      { title: "Rainbow Cloud Platform", description: "Enterprise UCaaS with team collaboration, HD video conferencing, instant messaging, file sharing, and presence — all delivered from secure European data centers." },
      { title: "Cloud Contact Center", description: "ALE Connect CCaaS provides omnichannel customer engagement across voice, email, chat, social media, and messaging with cloud-native scalability." },
      { title: "Private Cloud Option", description: "Rainbow Edge enables private cloud deployment with local data center hosting, giving organizations full control over data residency and compliance requirements." },
      { title: "Migration Services", description: "Phased migration paths from on-premises OmniPCX Enterprise to cloud Rainbow — protecting existing investments while progressively adopting cloud benefits." },
    ],
    products: ["Rainbow", "Rainbow Edge", "ALE Connect", "OmniPCX Enterprise", "Purple on Demand"],
    benefits: [
      { stat: "GDPR", label: "compliant with data sovereignty" },
      { stat: "99.999%", label: "platform availability" },
      { stat: "Hybrid", label: "cloud, on-prem, or both" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "collaboration-solutions",
    name: "Rainbow Collaboration Solutions",
    tagline: "The right borderless collaboration solutions help companies unfold their teams' full potential anytime, anywhere",
    description:
      "Borderless collaboration solutions enable companies to leverage communications from network to cloud. When systems communicate clearly, users do too. ALE offers end-to-end collaboration solutions with flexibility in deployment models — on-premises, hybrid, or cloud — bringing together voice, video, messaging, file sharing, and conferencing into a seamless experience. Rainbow delivers enterprise-grade collaboration with integrations into Microsoft Teams, Salesforce, and hundreds of business applications, while maintaining European data sovereignty and GDPR compliance.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-collaboration-solutions-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    capabilities: [
      { title: "Remote Communication", description: "Route office numbers to home or mobile devices, maintain customer and supplier interactions, single-click call transfers, high-quality video meetings, screen and file sharing — all with strict data confidentiality." },
      { title: "Business Telephony Integration", description: "Always-on collaboration features with full phone capacities. Office phones function as assistants with stable audio quality and elegant designs that complement modern workspaces." },
      { title: "Rainbow Classroom & Alert", description: "Industry-specific solutions: Rainbow Classroom provides a virtual classroom experience integrated into Learning Management Systems. Rainbow Alert delivers instant emergency notifications with receipt acknowledgment for healthcare and critical environments." },
      { title: "Rainbow Room & Workflow", description: "Rainbow Room brings a business meeting experience to Smart TVs. Rainbow Workflow connects devices and converts data to action. SaaS Connectors integrate seamlessly into existing infrastructure." },
      { title: "Data Sovereignty & Security", description: "Cybersecurity as a key priority, built with strict compliance standards. Rainbow Edge offers an on-premises private cloud option with flexible regional and country data center selection for full data sovereignty." },
      { title: "Microsoft Teams Integration", description: "Integrate your existing applications and telephony systems with Microsoft Teams for a seamless experience, combining the best of ALE's enterprise telephony with Microsoft's collaboration platform." },
    ],
    products: ["Rainbow", "Rainbow Edge", "Rainbow CPaaS", "OmniPCX Enterprise", "ALE Connect", "Smart DeskPhones", "OmniVista Cirrus", "OpenTouch Fax Center"],
    benefits: [
      { stat: "120", label: "participants per video meeting" },
      { stat: "300+", label: "app integrations available" },
      { stat: "Any device", label: "desktop, mobile, browser" },
      { stat: "Hybrid", label: "cloud, on-prem, or both" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "manufacturing", "smart-buildings"],
  },
  {
    slug: "communications-security",
    name: "Communications Security",
    tagline: "Protect your enterprise communications with end-to-end encryption and sovereign data hosting",
    description:
      "ALE communications security solutions provide comprehensive protection for enterprise voice, video, and messaging. From TLS/SRTP encryption on all calls to session border controllers that protect against SIP-based attacks, to GDPR-compliant data hosting outside the reach of the Cloud Act — ALE ensures your communications remain confidential, compliant, and resilient against modern threats.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/security-header-image-1400-600-v4.jpg?h=600&w=1440",
    capabilities: [
      { title: "End-to-End Encryption", description: "TLS 1.3 and SRTP encryption on all voice and video communications. Rainbow provides encrypted messaging and file sharing with keys managed in European data centers." },
      { title: "Session Border Control", description: "OpenTouch SBC protects SIP trunks and UC infrastructure against toll fraud, denial of service, and protocol-based attacks at the network perimeter." },
      { title: "Data Sovereignty", description: "Communications data hosted in European data centers, GDPR compliant and ISO 27001 certified — not subject to the US Cloud Act or Patriot Act." },
      { title: "Identity & Access Management", description: "Multi-factor authentication, role-based access control, and SSO integration for all communications platforms — ensuring only authorized users access sensitive resources." },
    ],
    products: ["Rainbow", "OpenTouch SBC", "OmniPCX Enterprise", "OmniVista 8770"],
    benefits: [
      { stat: "TLS 1.3", label: "encryption on all communications" },
      { stat: "ISO 27001", label: "certified infrastructure" },
      { stat: "GDPR", label: "compliant data hosting" },
    ],
    industries: ["healthcare", "government", "education", "energy", "manufacturing", "transportation"],
  },
  {
    slug: "private-5g-solution",
    name: "Private 5G Networks",
    tagline: "Deploy dedicated cellular connectivity for mission-critical enterprise operations",
    description:
      "ALE Private 5G solutions provide dedicated, high-performance cellular connectivity for enterprise environments where Wi-Fi alone cannot meet requirements. With ultra-low latency, massive device density, and guaranteed bandwidth, Private 5G enables mission-critical applications in manufacturing, logistics, healthcare, and transportation — all managed through familiar ALE network management tools.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/industrial-networks-header-image-v1.jpg?h=600&w=1440",
    capabilities: [
      { title: "Ultra-Low Latency", description: "Sub-10ms round-trip latency enables real-time control of robots, AGVs, and automated systems on manufacturing floors and in logistics operations." },
      { title: "Massive Device Density", description: "Support thousands of connected devices per cell — sensors, cameras, handhelds, and machines — without the interference issues of shared spectrum." },
      { title: "Dedicated Spectrum", description: "Operate on licensed or shared spectrum (CBRS) with no interference from neighboring networks, ensuring consistent performance for critical applications." },
      { title: "Unified Management", description: "Manage Private 5G alongside Wi-Fi and wired infrastructure through OmniVista, providing a single pane of glass for your entire network." },
    ],
    products: ["Private 5G", "OmniAccess Stellar", "OmniVista Cirrus", "OmniSwitch"],
    benefits: [
      { stat: "<10ms", label: "ultra-low latency" },
      { stat: "1000s", label: "of devices per cell" },
      { stat: "Dedicated", label: "spectrum, no interference" },
    ],
    industries: ["manufacturing", "transportation", "healthcare", "energy", "government"],
  },
  {
    slug: "e-services",
    name: "Customer Service Applications",
    tagline:
      "Applications for customer welcome, contact center and communications for successful customer interactions",
    description:
      "ALE's customer service solutions enable organizations to streamline interactions through automated welcome services, contact center capabilities, and real-time collaboration tools. These applications support multi-channel engagement across phones, softphones, websites, and social networks while accommodating remote and hybrid work environments — delivering the flexibility service teams need to manage customer interactions from anywhere.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/e-services-banner-901x339.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Automated Customer Welcome",
        description:
          "Visual Automated Attendant is a centralized application that routes calls through interactive menus without the intervention of a receptionist, reducing wait times and improving first-contact resolution.",
      },
      {
        title: "Omnichannel Contact Center",
        description:
          "Manage web chat, social networks, email, and telephone interactions from a single platform with ALE Connect — delivering consistent customer experiences across every channel.",
      },
      {
        title: "Remote & Hybrid Flexibility",
        description:
          "Enable customer service teams to manage interactions from anywhere using phones or softphones, ensuring business continuity regardless of work location or staffing model.",
      },
      {
        title: "Collaborative Problem-Solving",
        description:
          "Teams access customer data during calls, share screens, and use chat features to improve first-call resolution rates through real-time collaboration with Rainbow.",
      },
    ],
    products: [
      "Visual Automated Attendant",
      "ALE Connect",
      "OmniPCX RECORD Suite",
      "IP Desktop Softphone",
      "Rainbow",
      "OmniPCX Enterprise",
    ],
    benefits: [
      { stat: "24/7", label: "automated customer welcome" },
      { stat: "Omni", label: "channel engagement platform" },
      { stat: "100%", label: "remote-ready service delivery" },
    ],
    industries: ["hospitality", "government", "healthcare", "transportation", "manufacturing"],
  },
  {
    slug: "wifi-solutions",
    name: "Enterprise Wi-Fi Solutions",
    tagline:
      "Enhance your mobile and IoT connectivity with enterprise Wi-Fi solutions that are smarter, resilient and highly secure",
    description:
      "The OmniAccess Stellar WLAN solution uses Wi-Fi 5, Wi-Fi 6/6E, and Wi-Fi 7 technologies with a distributed intelligence architecture designed to simplify deployment and management while improving network performance. Without a central controller, Stellar delivers superior availability, resilience, and scalability — with smart analytics, IoT containment, and automated secure connectivity at a lower total cost of ownership.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/wifi-solutions-banner-901x339.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Quick Deployment & Management",
        description:
          "Flexible deployment options with unified management across equipment, users, devices, and applications accessible from a single dashboard — on-premises or cloud via OmniVista Cirrus.",
      },
      {
        title: "Performance & Scalability",
        description:
          "Distributed control architecture without a central controller, offering superior availability, resilience, and scalability with optimal user experience across Wi-Fi 5/6/6E/7.",
      },
      {
        title: "Security & Automation",
        description:
          "Latest technologies including IoT containment, micro-segmentation, and automated secure connectivity for users, devices, and IoT objects with zero-trust network access.",
      },
      {
        title: "Smart Analytics",
        description:
          "Wi-Fi Quality of Experience metrics, behavioral analytics, and location services enabling proactive troubleshooting and data-driven network optimization.",
      },
    ],
    products: [
      "OmniAccess Stellar AP1451",
      "OmniAccess Stellar AP1360",
      "OmniAccess Stellar AP1351",
      "OmniAccess Stellar AP1331",
      "OmniAccess Stellar AP1320",
      "OmniAccess Stellar AP1301",
      "OmniVista Cirrus",
    ],
    benefits: [
      { stat: "Wi-Fi 7", label: "ready with latest Stellar APs" },
      { stat: "No", label: "central controller required" },
      { stat: "Lower", label: "TCO vs. controller-based Wi-Fi" },
    ],
    industries: ["education", "healthcare", "hospitality", "government", "manufacturing", "transportation"],
  },
  {
    slug: "mission-critical-networks",
    name: "Mission Critical Networks",
    tagline:
      "Optimized, resilient, reliable, highly secure and scalable infrastructure for uninterrupted operations",
    description:
      "Organizations requiring uninterrupted operations — particularly in transportation, healthcare, and smart cities — need multi-layered network resilience. ALE mission critical networks address network segmentation, multi-service convergence, deterministic QoS, high availability, security, synchronization, and simplified management through Shortest Path Bridging (SPB) with sub-100ms convergence and IP/MPLS with sub-50ms convergence.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/mission-critical-networks-901x339.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "High Network Efficiency",
        description:
          "Service convergence capabilities and assured application performance with deterministic QoS — delivering multiple services over a single, optimized infrastructure.",
      },
      {
        title: "Network Resilience",
        description:
          "Non-blocking architecture with sub-100ms convergence (SPB) or sub-50ms (MPLS), ensuring high network availability and uninterrupted operations for critical workloads.",
      },
      {
        title: "Security & Segmentation",
        description:
          "Layer 2 network segmentation limiting human error risks with secured multi-tenant architecture that isolates services without complex overlay configurations.",
      },
      {
        title: "Operational Excellence",
        description:
          "Optimized network design with multiservice integration, flexible end-to-end synchronization, and unified management platform for increased operational speed.",
      },
    ],
    products: [
      "OmniSwitch 9900",
      "OmniSwitch 6900",
      "OmniSwitch 6865",
      "OmniSwitch 6860",
      "OmniVista Network Management",
    ],
    benefits: [
      { stat: "<100ms", label: "SPB convergence time" },
      { stat: "<50ms", label: "MPLS convergence time" },
      { stat: "Zero", label: "blocking links in SPB fabric" },
    ],
    industries: ["transportation", "healthcare", "government", "energy", "manufacturing"],
  },
  {
    slug: "shortest-path-bridging",
    name: "Shortest Path Bridging (SPB)",
    tagline:
      "MPLS-like VPN services that are significantly simpler to deploy and maintain with a lower total cost of ownership",
    description:
      "Shortest Path Bridging delivers traffic on the shortest available path and enables network virtualization in carrier-grade networks and data centers. Unlike MPLS which requires multiple protocols, SPB relies on a single protocol — IS-IS (Intermediate System to Intermediate System). Alcatel-Lucent Enterprise's Intelligent Fabric (iFab) adds automation for network provisioning, device attachment, and service instantiation, resulting in high-end services at a significantly reduced total cost of ownership.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/spb-banner-1440x600.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Scalable Multi-Path Fabric",
        description:
          "Fast-converging multi-path fabric with multi-tenancy support, IEEE 802.1aq and RFC 6329 standardization ensuring multi-vendor compatibility and future-proof investment.",
      },
      {
        title: "Dynamic Service Instantiation",
        description:
          "Edge-only provisioning with automatic configuration reduces human error and accelerates service deployment — no core changes needed when adding new services.",
      },
      {
        title: "Micro-Segmentation",
        description:
          "Non-IP core capabilities and loop-free topology without blocking links — providing native network segmentation that simplifies security architecture.",
      },
      {
        title: "Cloud-Ready Data Center",
        description:
          "Cloud-ready data center transformation with efficient load sharing across all physical connections, sub-second convergence, and reduced time for VM management tasks.",
      },
    ],
    products: [
      "OmniSwitch 9900",
      "OmniSwitch 6900",
      "OmniSwitch 6865",
      "OmniVista Network Management",
    ],
    benefits: [
      { stat: "1", label: "protocol (IS-IS) vs multiple for MPLS" },
      { stat: "Edge", label: "only provisioning, no core changes" },
      { stat: "802.1aq", label: "IEEE standardized" },
    ],
    industries: ["education", "government", "transportation", "healthcare", "energy"],
  },
  {
    slug: "hybrid-pol",
    name: "Hybrid Passive Optical LAN",
    tagline:
      "A mix of Passive Optical LAN and Ethernet LAN for large premises with better network performance and security",
    description:
      "The Hybrid POL solution combines Passive Optical LAN and Ethernet LAN technologies for medium to high user density networks across large premises spanning multiple buildings and long distances. It leverages a single fiber link to deliver enterprise services with high bandwidth and low latency, connecting core and access layers through Nokia POL infrastructure — eliminating dedicated telecom closets and reducing infrastructure costs.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hybrid-pol-banner-1440x600.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Networking Services",
        description:
          "Full Layer 2 services, HPOE, and security features with optional redundant uplinks — delivering enterprise-grade connectivity over a passive optical infrastructure.",
      },
      {
        title: "Unified Network Management",
        description:
          "Unified management for both POL and Ethernet LAN components through a powerful, user-friendly management system — eliminating operational silos between fiber and copper.",
      },
      {
        title: "Infrastructure Cost Reduction",
        description:
          "Eliminates dedicated telecom closets and cooling systems per floor, reduces the distribution switching layer, and lowers overall infrastructure costs significantly.",
      },
      {
        title: "Future-Proof Fiber Connectivity",
        description:
          "Extended distance connectivity with cabling reduction, space savings, and power consumption optimization — providing a single vendor end-to-end solution with flexible, scalable design.",
      },
    ],
    products: [
      "OmniSwitch 6900",
      "OmniSwitch 6860",
      "Nokia ONT Terminals",
      "Nokia Altiplano Access Controller",
    ],
    benefits: [
      { stat: "Zero", label: "telecom closets needed per floor" },
      { stat: "Single", label: "fiber link for all services" },
      { stat: "Lower", label: "OPEX vs. traditional Ethernet LAN" },
    ],
    industries: ["education", "healthcare", "government", "hospitality"],
  },
  {
    slug: "omnifabric",
    name: "OmniFabric Network Fabric",
    tagline:
      "Multi-technology network fabric ensuring end-to-end security in a Zero Trust architecture with automated segmentation",
    description:
      "OmniFabric delivers a unified platform supporting SPB, MPLS, and EVPN protocols within a single operating system. The solution provides advanced automation capabilities that reduce operational complexity while incorporating built-in cybersecurity features like micro-segmentation and AI-powered analytics at no additional cost. It addresses requirements across healthcare, education, smart buildings, and critical infrastructure with IT/OT convergence across indoor and harsh outdoor environments.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/security-header-image-1400-600-v4.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Multi-Technology Integration",
        description:
          "Supports SPB, MPLS, and EVPN within one operating system — preventing vendor lock-in while maintaining the flexibility to choose the best technology for each deployment scenario.",
      },
      {
        title: "Enhanced Cybersecurity",
        description:
          "Protects data integrity through Zero Trust network support and automatic micro-segmentation. Devices are detected, classified, and isolated in virtual segments without increasing attack exposure.",
      },
      {
        title: "IT/OT Convergence",
        description:
          "Enables operational technology integration across indoor and harsh outdoor environments — connecting industrial systems to enterprise IT with secure, segmented network architecture.",
      },
      {
        title: "Simplified Operations",
        description:
          "Unified management through OmniVista with single-pane-of-glass visibility, augmented by AI analytics. Transparent pricing with integrated security features and no hidden fees.",
      },
    ],
    products: [
      "OmniSwitch 9900",
      "OmniSwitch 6900",
      "OmniSwitch 6860",
      "OmniSwitch 6865",
      "OmniAccess Stellar",
      "OmniVista Network Management",
    ],
    benefits: [
      { stat: "3", label: "protocols in one OS (SPB, MPLS, EVPN)" },
      { stat: "Zero Trust", label: "built-in network architecture" },
      { stat: "IT+OT", label: "convergence in a single fabric" },
    ],
    industries: ["healthcare", "education", "government", "energy", "manufacturing", "transportation"],
  },
  {
    slug: "optical-solutions",
    name: "Optical Networking",
    tagline:
      "High-capacity data transport with secure optical networking for data center interconnect and enterprise WANs",
    description:
      "Organizations require robust optical networks to transport high-capacity data between data centers. High-capacity transport is necessary for reliable transmission of high-bandwidth applications and IoT devices. The OmniSwitch family provides scalable, power-efficient solutions for enterprise WANs connecting headquarters to branch offices — with AES-256 encryption, modular architecture, and network failure protection.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-digital-age-networking-focus-topic-1-810x340.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Data Center Interconnect",
        description:
          "Link data centers for business continuity, disaster recovery, and remote analytics computing — using leased dark fiber or dedicated service provider connectivity.",
      },
      {
        title: "Enterprise WAN Connectivity",
        description:
          "Aggregate and transport multiple applications onto higher-rate optical links across headquarters, branch offices, and remote sites using compact 1RU chassis.",
      },
      {
        title: "Built-in Security",
        description:
          "AES-256 encryption on both client and line-side, modular architecture for efficiency, and network failure protection for resilience.",
      },
      {
        title: "Simplified Management",
        description:
          "Intuitive web-based configuration interface with low power consumption, AC/DC power support, and plug-and-play deployment capabilities.",
      },
    ],
    products: [
      "OmniSwitch 6900",
      "OmniSwitch 9900",
      "OmniVista Network Management",
    ],
    benefits: [
      { stat: "AES-256", label: "encryption on all links" },
      { stat: "1RU", label: "compact chassis form factor" },
      { stat: "DCI", label: "data center interconnect ready" },
    ],
    industries: ["government", "healthcare", "transportation", "energy"],
  },
  {
    slug: "digital-dividends",
    name: "Digital Dividends",
    tagline:
      "Technology investment in communications and networking that creates tangible business outcomes",
    description:
      "Organizations face budget constraints, cyberthreats, and sustainability concerns. Strategic technology investments in communications and secure network infrastructure can help address these challenges through improved operational excellence, customer experience, and employee experience — delivering measurable business results and a strong return on investment.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-dac-focus-topic-810x380.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Operational Excellence",
        description:
          "IT simplification and automation that cut costs through workflow automation, AI, and cloud optimization — including cybersecurity strategies and budget predictability via as-a-Service models.",
      },
      {
        title: "Customer Experience",
        description:
          "Resource optimization balancing self-service and agent support, quick response and first-call resolution, and multi-generational engagement preference management.",
      },
      {
        title: "Employee Experience",
        description:
          "State-of-the-art digital workplace with cloud collaboration tools, empowered workforce with appropriate apps and anywhere access across hybrid work environments.",
      },
      {
        title: "Sustainability",
        description:
          "Energy consumption reduction through efficient infrastructure, sustainable product design, and cloud-first deployment models that minimize environmental impact.",
      },
    ],
    products: [
      "ALE Connect",
      "Rainbow",
      "OmniPCX Enterprise",
      "OmniVista Cirrus",
      "Smart DeskPhones",
      "Visual Automated Attendant",
    ],
    benefits: [
      { stat: "3x", label: "pillars of digital value" },
      { stat: "Cloud", label: "first, pay-as-you-grow" },
      { stat: "ROI", label: "measurable business outcomes" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "manufacturing"],
  },
  {
    slug: "business-innovation",
    name: "Business Innovation",
    tagline:
      "Increase productivity and revenues by leveraging new technologies to automate business processes",
    description:
      "Technology innovations including IoT, location services, and collaboration platforms are at the forefront of business process automation. OmniAccess Stellar Location Services generates revenues, increases safety, and reduces operational and asset-related costs with real-time and historical location data in indoor facilities — enabling workflow optimization, reduced search time, asset loss prevention, and contact tracing. Integration with Rainbow enables automation of repetitive tasks through triggers, rules, and actions, while cloud-based management-as-a-service reduces IT burden and provides a financial alternative to traditional CAPEX models.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/ale-web-refresh-trends-iot-topic1-image.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Location Services & Asset Tracking",
        description:
          "OmniAccess Stellar Asset Tracking provides real-time and historical location data of users or objects in indoor facilities — enabling hotspot identification, contact tracing, and reduced equipment search time.",
      },
      {
        title: "Workflow Automation",
        description:
          "Integrate geolocation data with Rainbow collaboration tools to automate simple or repetitive tasks — developing digital business processes triggered by rules and actions.",
      },
      {
        title: "Cloud-Based Management",
        description:
          "Management-as-a-service reduces IT burden with operational cost savings. Cloud-based digital strategy allows operators to be more agile, bring new services online quickly, and create new revenue streams.",
      },
      {
        title: "Streamlined Portfolio",
        description:
          "Single OS across edge-to-core infrastructure with unified LAN, WLAN, and branch security management — flexible deployment across office, outdoor, and industrial environments with on-premises or cloud management.",
      },
    ],
    products: [
      "Rainbow",
      "OmniVista 2500",
      "OmniAccess Stellar Asset Tracking",
      "OmniSwitch",
      "OmniAccess Stellar",
    ],
    benefits: [
      { stat: "Real-time", label: "location & asset tracking" },
      { stat: "Automated", label: "workflow triggers & actions" },
      { stat: "Cloud", label: "management-as-a-service" },
    ],
    industries: ["healthcare", "hospitality", "education", "manufacturing", "transportation"],
  },
  {
    slug: "distributed-wifi",
    name: "Distributed Wi-Fi Architecture",
    tagline:
      "Distributed intelligence Wi-Fi architecture providing highly available, scalable, and easy to manage wireless networks",
    description:
      "The distributed Wi-Fi control architecture employs smart access points managed as a unified system or cluster, handling control and forwarding in a distributed, coordinated manner without requiring a centralized controller. The architecture virtualizes the controller function across access points with coordinated intelligence — delivering enterprise-grade WPA3 security, lower total cost of ownership, and superior scalability independent of deployment size.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/wifi-solutions-banner-901x339.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Enterprise-Grade Security",
        description:
          "WPA3 security standard with advanced algorithms and 192-bit encryption suites, plus Enhanced Open standard support for public spaces using Opportunistic Wireless Encryption.",
      },
      {
        title: "Unified Management",
        description:
          "OmniVista provides secure plug-and-play deployment, integrated policy authentication, built-in Deep Packet Inspection, and real-time application monitoring for large-scale environments.",
      },
      {
        title: "Cost & Performance",
        description:
          "Lower CAPEX by eliminating central controllers and licensing costs; lower OPEX through reduced equipment and IT management overhead; increased resiliency through distributed control.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Eliminates traffic bottlenecks and latency with superior scalability independent of deployment size — three deployment modes available via a single software version.",
      },
    ],
    products: [
      "OmniAccess Stellar AP1451",
      "OmniAccess Stellar AP1320",
      "OmniAccess Stellar AP1301",
      "OmniVista Network Management",
    ],
    benefits: [
      { stat: "WPA3", label: "enterprise-grade security" },
      { stat: "No", label: "central controller needed" },
      { stat: "3", label: "deployment modes, one software" },
    ],
    industries: ["education", "healthcare", "hospitality", "government"],
  },
];
