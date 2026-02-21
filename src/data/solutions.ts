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
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80",
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
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
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
    tagline: "Empower your organization with intelligent, cloud-ready communications for the digital age",
    description:
      "Digital age communications combine unified communications, cloud collaboration, and CPaaS capabilities to transform how organizations connect with employees, customers, and partners. ALE delivers a complete communications portfolio — from enterprise telephony and contact center to team collaboration and embedded communications — all with flexible deployment options spanning public cloud, private cloud, and on-premises.",
    heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80",
    capabilities: [
      { title: "Cloud-Native UCaaS", description: "Rainbow delivers enterprise-grade voice, video, messaging, and conferencing from the cloud with GDPR compliance and data sovereignty guarantees." },
      { title: "Omnichannel Contact Center", description: "ALE Connect CCaaS handles customer interactions across email, chat, social media, and telephone in a unified agent experience." },
      { title: "Embedded Communications", description: "Rainbow CPaaS APIs and SDKs embed real-time communications into business applications, enabling automated workflows and IoT integration." },
      { title: "Flexible Deployment", description: "Choose public cloud, private cloud with Rainbow Edge, or on-premises deployment — with easy migration paths between models." },
    ],
    products: ["Rainbow", "OmniPCX Enterprise", "ALE Connect", "OXO Connect", "Rainbow CPaaS"],
    benefits: [
      { stat: "Cloud", label: "ready with flexible deployment" },
      { stat: "GDPR", label: "compliant communications" },
      { stat: "CPaaS", label: "embed comms in any app" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "manufacturing", "smart-buildings"],
  },
  {
    slug: "digital-age-networking",
    name: "Digital Age Networking",
    tagline: "Build an autonomous, self-healing network that adapts to your business needs",
    description:
      "Digital age networking delivers an intelligent, automated network infrastructure that reduces complexity, enhances security, and adapts to evolving business requirements. With a unified operating system across the entire switching portfolio, AI-driven analytics, and automated IoT onboarding, ALE networks are designed for the demands of modern enterprise environments.",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
    capabilities: [
      { title: "Unified Network Fabric", description: "A single hardened operating system from edge to core with Shortest Path Bridging creates an automated, self-forming network fabric." },
      { title: "AI-Driven Operations", description: "OmniVista Network Advisor uses AI/ML to anticipate issues, automate remediation, and optimize network performance proactively." },
      { title: "IoT-Ready Infrastructure", description: "Automatic device discovery from a 29M+ device database with virtual segmentation and continuous behavior monitoring." },
      { title: "Cloud Management", description: "OmniVista Cirrus provides centralized cloud-based management across all network infrastructure with real-time analytics." },
    ],
    products: ["OmniSwitch", "OmniAccess Stellar", "OmniVista Cirrus", "OmniVista Network Advisor"],
    benefits: [
      { stat: "1 OS", label: "unified across all switches" },
      { stat: "AI/ML", label: "proactive network operations" },
      { stat: "29M+", label: "IoT device fingerprints" },
    ],
    industries: ["healthcare", "education", "hospitality", "government", "transportation", "energy", "manufacturing", "smart-buildings"],
  },
  {
    slug: "network-security",
    name: "Network Security",
    tagline: "Protect your infrastructure with zero-trust architecture, micro-segmentation, and automated threat response",
    description:
      "ALE network security solutions provide multi-layered protection through zero-trust architecture, automated IoT containment, and intelligent threat detection. Built into the network fabric itself, security is not an add-on but a fundamental design principle — from automatic device fingerprinting and policy application to real-time behavior monitoring and automated quarantine.",
    heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
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
];
