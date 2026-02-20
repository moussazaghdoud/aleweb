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
];
