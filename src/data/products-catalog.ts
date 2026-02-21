export interface CatalogProduct {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  subcategory?: string;
  features: { title: string; description: string }[];
  highlights: { stat: string; label: string }[];
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
}

export const productCategories: ProductCategory[] = [
  { slug: "switches", name: "Network Switches", description: "Enterprise LAN switching from access edge to core data center" },
  { slug: "wlan", name: "Wireless LAN", description: "OmniAccess Stellar indoor and outdoor access points" },
  { slug: "devices", name: "Phones & Devices", description: "Desk phones, softphones, handsets, and headsets" },
  { slug: "applications", name: "Contact Center & Applications", description: "Contact center, dispatch, recording, and attendant solutions" },
  { slug: "integration", name: "Ecosystem Integration", description: "Microsoft Teams, CRM connectors, and open APIs" },
  { slug: "management", name: "Communications & Network Management", description: "Management platforms, security, and administration tools" },
  { slug: "platforms", name: "Communication Platforms", description: "DECT and SIP-DECT base station infrastructure" },
];

export const catalogProducts: CatalogProduct[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // SWITCHES — Access Edge
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "omniswitch-6360",
    name: "OmniSwitch 6360",
    tagline: "Stackable Gigabit Ethernet LAN switch for campus and branch access",
    description: "The OmniSwitch 6360 is a cost-effective, stackable GigE access switch offering IoT device security, smart analytics, and simplified network management. Designed for enterprise campus and branch deployments, it provides advanced Layer 2+ features, PoE support, and zero-touch provisioning in a compact form factor.",
    category: "switches",
    subcategory: "Access Edge",
    features: [
      { title: "Stackable Architecture", description: "Stack up to 8 units with virtual chassis technology for simplified management and resilience across campus access networks." },
      { title: "IoT Device Security", description: "Automatic IoT device fingerprinting and policy application with macro/micro segmentation to isolate IoT traffic from corporate data." },
      { title: "PoE Support", description: "Up to 30W PoE+ (802.3at) per port for powering access points, IP phones, cameras, and IoT sensors without separate power infrastructure." },
      { title: "Zero-Touch Provisioning", description: "Automated deployment with centralized configuration through OmniVista, reducing installation time and eliminating manual switch-by-switch setup." },
    ],
    highlights: [
      { stat: "1 GigE", label: "access ports" },
      { stat: "8-unit", label: "stacking" },
      { stat: "PoE+", label: "30W per port" },
      { stat: "AOS", label: "unified OS" },
    ],
  },
  {
    slug: "omniswitch-6560",
    name: "OmniSwitch 6560(E)",
    tagline: "Multi-gigabit stackable switch optimized for Wi-Fi 6 and Wi-Fi 6E environments",
    description: "The OmniSwitch 6560(E) delivers multi-gigabit uplinks and access ports to support bandwidth-intensive Wi-Fi 6/6E access points. With smart analytics, IoT containment, and high-density PoE, it provides the ideal aggregation and access layer for modern campus networks.",
    category: "switches",
    subcategory: "Access Edge",
    features: [
      { title: "Multi-Gigabit Ports", description: "2.5G and 5G access ports with 10G uplinks designed to eliminate bottlenecks for high-throughput Wi-Fi 6 and Wi-Fi 6E access points." },
      { title: "Smart Analytics", description: "Built-in network analytics provide real-time visibility into device behavior, traffic patterns, and application performance for proactive management." },
      { title: "High-Density PoE", description: "Up to 60W PoE++ (802.3bt) per port supporting next-generation access points, cameras, and digital signage with a single cable." },
      { title: "IoT Containment", description: "Virtual segmentation isolates IoT device types into secure containers, preventing lateral movement while maintaining full connectivity for each device class." },
    ],
    highlights: [
      { stat: "mGig", label: "2.5G/5G ports" },
      { stat: "PoE++", label: "60W per port" },
      { stat: "10G", label: "uplinks" },
      { stat: "Wi-Fi 6E", label: "optimized" },
    ],
  },
  {
    slug: "omniswitch-6570m",
    name: "OmniSwitch 6570M",
    tagline: "Compact modular multi-gigabit switch for flexible campus deployments",
    description: "The OmniSwitch 6570M combines modular flexibility with multi-gigabit performance in a compact 1U form factor. Offering configurable port modules, it adapts to diverse campus requirements from fiber uplinks to high-density copper, with full AOS feature parity.",
    category: "switches",
    subcategory: "Access Edge",
    features: [
      { title: "Modular Design", description: "Configurable modules allow customization with copper, fiber, and multi-gigabit port combinations to match specific deployment requirements." },
      { title: "Compact 1U Form Factor", description: "Space-efficient design delivers enterprise-grade switching in constrained environments like wiring closets and retail locations." },
      { title: "Full AOS Feature Set", description: "Complete Alcatel-Lucent Operating System with SPB, IoT containment, zero-touch provisioning, and unified management through OmniVista." },
      { title: "Energy Efficient", description: "Dynamic power management with IEEE 802.3az Energy Efficient Ethernet support reduces operational costs and environmental impact." },
    ],
    highlights: [
      { stat: "1U", label: "compact form factor" },
      { stat: "Modular", label: "configurable ports" },
      { stat: "mGig", label: "multi-gigabit ready" },
      { stat: "SPB", label: "fabric support" },
    ],
  },
  {
    slug: "omniswitch-6860",
    name: "OmniSwitch 6860(E/N)",
    tagline: "High-performance stackable switch for campus core and distribution",
    description: "The OmniSwitch 6860 delivers wire-rate 10G/25G performance for campus core and distribution deployments. With advanced routing, SPB fabric support, and high-availability features, it bridges the gap between access switching and data center connectivity.",
    category: "switches",
    subcategory: "Access Edge",
    features: [
      { title: "10G/25G Performance", description: "Wire-rate 10GbE and 25GbE ports with non-blocking architecture for demanding campus backbone and distribution layer deployments." },
      { title: "SPB Fabric", description: "Shortest Path Bridging creates an automated, self-forming network fabric that simplifies operations and provides MPLS-like services without the complexity." },
      { title: "High Availability", description: "Virtual chassis stacking, redundant power supplies, and sub-second failover ensure continuous network availability for mission-critical environments." },
      { title: "Advanced Routing", description: "Full Layer 3 routing with OSPF, BGP, VRF, and multicast support for complex enterprise network topologies." },
    ],
    highlights: [
      { stat: "25G", label: "port speeds" },
      { stat: "SPB", label: "network fabric" },
      { stat: "L3", label: "full routing" },
      { stat: "HA", label: "high availability" },
    ],
  },
  {
    slug: "omniswitch-6870",
    name: "OmniSwitch 6870",
    tagline: "Versatile aggregation switch for campus backbone and metro Ethernet",
    description: "The OmniSwitch 6870 is a versatile 1G/10G aggregation switch for campus backbone, metro Ethernet, and service provider edge deployments. It combines carrier-grade reliability with enterprise features including full SPB fabric and advanced QoS.",
    category: "switches",
    subcategory: "Access Edge",
    features: [
      { title: "Campus Aggregation", description: "High-density 10G SFP+ ports aggregate traffic from multiple access switches with wire-rate forwarding and deep packet buffering." },
      { title: "Metro Ethernet Ready", description: "Carrier-grade Ethernet features including MEF-certified services, VPLS, and service assurance for metro and service provider deployments." },
      { title: "QoS & Traffic Management", description: "8 hardware queues per port with strict priority, weighted fair queuing, and traffic shaping for guaranteed application performance." },
      { title: "Resilient Design", description: "Redundant hot-swappable power supplies and fan modules with ISSU (In-Service Software Upgrade) for zero-downtime maintenance." },
    ],
    highlights: [
      { stat: "10G", label: "aggregation" },
      { stat: "MEF", label: "certified" },
      { stat: "ISSU", label: "zero-downtime" },
      { stat: "QoS", label: "8 queues/port" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SWITCHES — Core & Data Center
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "omniswitch-6900",
    name: "OmniSwitch 6900",
    tagline: "High-performance core switch for campus and data center networks",
    description: "The OmniSwitch 6900 delivers non-blocking, wire-rate performance at 10G/25G/40G/100G speeds for campus core and data center environments. With SPB-based network virtualization, advanced analytics, and carrier-grade reliability, it provides the foundation for modern enterprise networks.",
    category: "switches",
    subcategory: "Core & Data Center",
    features: [
      { title: "100G Core Performance", description: "Non-blocking architecture with 10G/25G/40G/100G interfaces delivering wire-rate forwarding for the most demanding campus core and data center workloads." },
      { title: "SPB Network Virtualization", description: "Shortest Path Bridging creates automated, self-healing network fabrics with built-in multi-tenancy, eliminating complex MPLS configurations." },
      { title: "Data Center Optimized", description: "Low-latency cut-through switching, VXLAN support, and DCB features (PFC, ETS) for converged storage and compute networking." },
      { title: "Advanced Analytics", description: "Deep packet inspection and sFlow-based analytics provide granular traffic visibility for capacity planning and security monitoring." },
    ],
    highlights: [
      { stat: "100G", label: "port speeds" },
      { stat: "Non-blocking", label: "architecture" },
      { stat: "VXLAN", label: "overlay support" },
      { stat: "SPB", label: "auto-fabric" },
    ],
  },
  {
    slug: "omniswitch-6920",
    name: "OmniSwitch 6920",
    tagline: "AI/HPC-optimized data center switch with ultra-low latency",
    description: "The OmniSwitch 6920 is purpose-built for AI/ML workloads and high-performance computing environments requiring deterministic, ultra-low-latency networking. With 25G/100G density and advanced congestion management, it supports the most demanding data center applications.",
    category: "switches",
    subcategory: "Core & Data Center",
    features: [
      { title: "Ultra-Low Latency", description: "Sub-microsecond latency with cut-through switching optimized for AI training clusters, HPC interconnects, and real-time financial trading applications." },
      { title: "25G/100G Density", description: "High-density 25GbE server connections and 100GbE spine links in a compact form factor, maximizing compute connectivity per rack unit." },
      { title: "Advanced Congestion Management", description: "RDMA over Converged Ethernet (RoCE), Priority Flow Control, and ECN support ensure lossless fabric performance for storage and GPU interconnects." },
      { title: "Telemetry & Automation", description: "Streaming telemetry, REST APIs, and gNMI/gRPC interfaces enable deep integration with data center orchestration and monitoring platforms." },
    ],
    highlights: [
      { stat: "<1μs", label: "latency" },
      { stat: "100G", label: "spine links" },
      { stat: "RoCE", label: "lossless fabric" },
      { stat: "AI/HPC", label: "optimized" },
    ],
  },
  {
    slug: "omniswitch-9900",
    name: "OmniSwitch 9900",
    tagline: "Modular chassis switch for mission-critical campus core and data center",
    description: "The OmniSwitch 9900 is a modular chassis platform delivering maximum scalability, redundancy, and performance for the largest enterprise campus and data center deployments. With hot-swappable line cards, redundant everything, and terabit-class throughput, it anchors mission-critical network infrastructures.",
    category: "switches",
    subcategory: "Core & Data Center",
    features: [
      { title: "Modular Chassis", description: "Scalable chassis architecture with hot-swappable line cards supporting mix-and-match 10G/25G/40G/100G port configurations for maximum flexibility." },
      { title: "Terabit Throughput", description: "Non-blocking switching fabric with terabit-class capacity handles the most demanding traffic loads from thousands of connected devices and services." },
      { title: "Redundant Everything", description: "Dual supervisors, redundant power supplies and fans, hitless failover, and ISSU ensure continuous operation for 99.999% uptime requirements." },
      { title: "Service-Rich Platform", description: "Full L2/L3 routing, SPB fabric, EVPN/VXLAN, policy-based routing, and advanced security features in a single, unified platform." },
    ],
    highlights: [
      { stat: "Tbps", label: "switching capacity" },
      { stat: "Modular", label: "chassis design" },
      { stat: "99.999%", label: "availability" },
      { stat: "ISSU", label: "hitless upgrades" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SWITCHES — Industrial & Hardened
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "omniswitch-6465",
    name: "OmniSwitch 6465",
    tagline: "Compact hardened switch for industrial and harsh environments",
    description: "The OmniSwitch 6465 is a fan-less, DIN rail-mountable hardened switch designed for extreme temperatures, vibration, and harsh industrial environments. It brings full AOS enterprise features to manufacturing floors, outdoor cabinets, transportation infrastructure, and utility substations.",
    category: "switches",
    subcategory: "Industrial",
    features: [
      { title: "Fan-Less Hardened Design", description: "No moving parts with extended temperature range (-40°C to +75°C), DIN rail mounting, and IP30-rated enclosure for harsh industrial environments." },
      { title: "Industrial PoE", description: "PoE/PoE+ support powers industrial sensors, cameras, and access points in environments where separate power infrastructure is impractical." },
      { title: "Precision Timing", description: "IEEE 1588v2 PTP support provides microsecond-accurate time synchronization for industrial automation, SCADA, and smart grid applications." },
      { title: "Full Enterprise Features", description: "Complete AOS feature set including SPB fabric, IoT containment, zero-touch provisioning — the same enterprise capabilities as campus switches." },
    ],
    highlights: [
      { stat: "-40°C", label: "to +75°C range" },
      { stat: "Fan-less", label: "no moving parts" },
      { stat: "DIN rail", label: "industrial mount" },
      { stat: "PTP", label: "precision timing" },
    ],
  },
  {
    slug: "omniswitch-6465t",
    name: "OmniSwitch 6465T",
    tagline: "Extended temperature hardened switch with enhanced industrial connectivity",
    description: "The OmniSwitch 6465T extends the 6465 platform with additional industrial connectivity options including M12 connectors and enhanced ESD protection. Purpose-built for the most demanding environments including trackside rail, tunnel, and outdoor utility deployments.",
    category: "switches",
    subcategory: "Industrial",
    features: [
      { title: "M12 Connectors", description: "Industrial M12 circular connectors provide vibration-proof, IP67-rated connections for rolling stock, tunnel infrastructure, and mobile equipment." },
      { title: "Extended Temperature", description: "Operating range from -40°C to +75°C with conformal-coated boards for protection against dust, moisture, and corrosive atmospheres." },
      { title: "Enhanced ESD Protection", description: "Hardened Ethernet ports with enhanced electrostatic discharge protection for environments with high electromagnetic interference." },
      { title: "Transportation Certified", description: "EN 50155 railway compliance and EN 50121 EMC certification for trackside, tunnel, and on-board rail vehicle deployments." },
    ],
    highlights: [
      { stat: "M12", label: "connectors" },
      { stat: "IP67", label: "rated ports" },
      { stat: "EN 50155", label: "rail certified" },
      { stat: "Hardened", label: "extreme environments" },
    ],
  },
  {
    slug: "omniswitch-6575",
    name: "OmniSwitch 6575",
    tagline: "High-performance industrial switch with 10G uplinks for OT convergence",
    description: "The OmniSwitch 6575 brings 10G performance to industrial environments, enabling IT/OT convergence with high-bandwidth uplinks for connecting industrial networks to enterprise infrastructure. Fan-less design with extended temperature range for harsh conditions.",
    category: "switches",
    subcategory: "Industrial",
    features: [
      { title: "10G Industrial Uplinks", description: "SFP+ 10G uplinks bridge the gap between industrial OT networks and enterprise IT infrastructure for converged operations." },
      { title: "IT/OT Convergence", description: "Enterprise-grade security with IoT containment enables safe integration of industrial control systems with corporate networks." },
      { title: "Fan-Less & Hardened", description: "Silent, maintenance-free operation in temperature extremes with DIN rail mounting for industrial cabinet installation." },
      { title: "Industrial Protocols", description: "Support for industrial Ethernet protocols and PROFINET alongside standard enterprise networking features." },
    ],
    highlights: [
      { stat: "10G", label: "industrial uplinks" },
      { stat: "IT/OT", label: "convergence" },
      { stat: "Fan-less", label: "silent operation" },
      { stat: "PROFINET", label: "industrial ready" },
    ],
  },
  {
    slug: "omniswitch-6865",
    name: "OmniSwitch 6865",
    tagline: "Ruggedized outdoor switch for extreme environments and critical infrastructure",
    description: "The OmniSwitch 6865 is designed for outdoor and extreme-environment deployments where standard networking equipment cannot survive. IP67-rated and hardened for the harshest conditions, it provides enterprise networking in roadside cabinets, outdoor utility sites, and military field deployments.",
    category: "switches",
    subcategory: "Industrial",
    features: [
      { title: "IP67 Ruggedized", description: "Fully sealed enclosure rated IP67 for deployment in outdoor environments exposed to rain, dust, extreme temperatures, and physical impact." },
      { title: "Wide Temperature Range", description: "Operating from -40°C to +74°C without fans or moving parts, ensuring reliable operation in desert, arctic, and tropical climates." },
      { title: "Fiber & Copper Flexibility", description: "Mix of SFP fiber and copper Ethernet ports with M12 connectors for flexible connectivity in outdoor and industrial settings." },
      { title: "Mission-Critical Reliability", description: "Hardened components and conformal coating provide years of maintenance-free operation in critical infrastructure deployments." },
    ],
    highlights: [
      { stat: "IP67", label: "sealed enclosure" },
      { stat: "-40°C", label: "to +74°C" },
      { stat: "Outdoor", label: "deployment ready" },
      { stat: "Fiber+Cu", label: "flexible ports" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SWITCHES — Smart Managed Edge
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "omniswitch-2260",
    name: "OmniSwitch 2260",
    tagline: "Cost-effective smart managed switch for small sites and branches",
    description: "The OmniSwitch 2260 provides enterprise-grade smart managed switching at an entry-level price point. Ideal for small offices, retail locations, and branch deployments where basic managed switching with PoE, VLANs, and QoS is needed without the complexity of full enterprise platforms.",
    category: "switches",
    subcategory: "Smart Managed",
    features: [
      { title: "Smart Managed Features", description: "VLANs, QoS, static routing, IGMP snooping, and port security — essential managed switch features in a simplified management interface." },
      { title: "PoE Support", description: "PoE/PoE+ ports for powering IP phones, access points, and cameras with automatic power budget management." },
      { title: "Cloud Management", description: "OmniVista Cirrus cloud management enables remote monitoring and configuration of distributed branch switches from anywhere." },
      { title: "Quiet Operation", description: "Fan-less models available for noise-sensitive environments like small offices, classrooms, and retail spaces." },
    ],
    highlights: [
      { stat: "Smart", label: "managed switching" },
      { stat: "PoE+", label: "device power" },
      { stat: "Cloud", label: "managed option" },
      { stat: "Fan-less", label: "quiet models" },
    ],
  },
  {
    slug: "omniswitch-2360",
    name: "OmniSwitch 2360",
    tagline: "Enhanced smart managed switch with advanced features for growing networks",
    description: "The OmniSwitch 2360 extends the smart managed portfolio with enhanced features including multi-gigabit ports, higher PoE budgets, and advanced security. It bridges the gap between basic managed switches and full enterprise platforms for mid-market deployments.",
    category: "switches",
    subcategory: "Smart Managed",
    features: [
      { title: "Multi-Gigabit Options", description: "2.5G and 5G port options support bandwidth-hungry Wi-Fi 6 access points without requiring a full infrastructure upgrade." },
      { title: "Enhanced Security", description: "802.1X authentication, MAC-based access control, and DHCP snooping provide enterprise-grade security appropriate for mid-market networks." },
      { title: "Higher PoE Budget", description: "Increased per-port and total PoE budget supports more powered devices per switch, reducing the need for additional power sourcing equipment." },
      { title: "Stackable", description: "Virtual stacking capability simplifies management of multiple switches as a single logical unit for growing network deployments." },
    ],
    highlights: [
      { stat: "mGig", label: "multi-gigabit" },
      { stat: "802.1X", label: "security" },
      { stat: "Stackable", label: "virtual chassis" },
      { stat: "Enhanced", label: "PoE budget" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WIRELESS LAN — Wi-Fi 7 Indoor
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "stellar-ap1501",
    name: "OmniAccess Stellar AP1501",
    tagline: "Cost-efficient Wi-Fi 7 access point for standard enterprise environments",
    description: "The AP1501 brings Wi-Fi 7 (802.11be) performance at an entry-level price point. Designed for standard office environments and light-density deployments, it delivers next-generation wireless with multi-link operation and improved efficiency.",
    category: "wlan",
    subcategory: "Wi-Fi 7 Indoor",
    features: [
      { title: "Wi-Fi 7 (802.11be)", description: "Next-generation wireless standard with 4096-QAM modulation, multi-link operation, and improved spectral efficiency for better performance." },
      { title: "Dual-Band Operation", description: "Simultaneous 2.4 GHz and 5 GHz operation with smart band steering for optimal client distribution and performance." },
      { title: "Entry-Level Pricing", description: "Cost-efficient Wi-Fi 7 brings next-generation performance to standard enterprise deployments without premium pricing." },
      { title: "Cloud or On-Premises Management", description: "Managed through OmniVista Cirrus cloud or on-premises OmniVista for flexible deployment options." },
    ],
    highlights: [
      { stat: "Wi-Fi 7", label: "802.11be" },
      { stat: "Dual-band", label: "2.4G + 5G" },
      { stat: "Entry", label: "cost-efficient" },
      { stat: "MLO", label: "multi-link" },
    ],
  },
  {
    slug: "stellar-ap1511",
    name: "OmniAccess Stellar AP1511",
    tagline: "Mid-range Wi-Fi 7 access point with unrivalled performance",
    description: "The AP1511 delivers mid-range Wi-Fi 7 performance with tri-band operation including 6 GHz spectrum support. Ideal for medium-density enterprise environments, it provides the bandwidth and low latency needed for modern workplace applications.",
    category: "wlan",
    subcategory: "Wi-Fi 7 Indoor",
    features: [
      { title: "Tri-Band Wi-Fi 7", description: "Simultaneous 2.4 GHz, 5 GHz, and 6 GHz operation with 320 MHz channels for maximum throughput and capacity." },
      { title: "Multi-Link Operation", description: "MLO enables devices to simultaneously use multiple bands, improving reliability, reducing latency, and increasing aggregate throughput." },
      { title: "High-Density Support", description: "Advanced MU-MIMO and OFDMA support more concurrent clients with consistent per-user performance in open offices and meeting areas." },
      { title: "Intelligent RF Management", description: "AI-driven radio resource management automatically optimizes channel selection, power levels, and band steering." },
    ],
    highlights: [
      { stat: "Wi-Fi 7", label: "tri-band" },
      { stat: "6 GHz", label: "spectrum" },
      { stat: "320 MHz", label: "channels" },
      { stat: "MU-MIMO", label: "high density" },
    ],
  },
  {
    slug: "stellar-ap1521",
    name: "OmniAccess Stellar AP1521",
    tagline: "Premium Wi-Fi 7 access point for the most demanding environments",
    description: "The AP1521 is ALE's flagship Wi-Fi 7 access point, delivering maximum performance for the most demanding enterprise environments. With quad-radio architecture, ultra-high-density support, and dedicated security scanning radio, it sets the standard for enterprise wireless.",
    category: "wlan",
    subcategory: "Wi-Fi 7 Indoor",
    features: [
      { title: "Quad-Radio Architecture", description: "Dedicated radios for 2.4G, 5G, 6G bands plus a fourth radio for security scanning, BLE location, and IoT services — simultaneously." },
      { title: "Maximum Throughput", description: "Aggregate throughput exceeding 10 Gbps with 320 MHz channels, 4096-QAM, and 16 spatial streams for ultra-high-performance wireless." },
      { title: "Ultra-High Density", description: "Purpose-built for auditoriums, stadiums, convention centers, and trading floors where hundreds of devices compete for bandwidth." },
      { title: "Integrated IoT Gateway", description: "Built-in BLE and Zigbee radios enable IoT services including asset tracking, wayfinding, and environmental monitoring without additional hardware." },
    ],
    highlights: [
      { stat: "10+ Gbps", label: "aggregate throughput" },
      { stat: "Quad-radio", label: "architecture" },
      { stat: "IoT", label: "integrated gateway" },
      { stat: "Premium", label: "flagship model" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WIRELESS LAN — Wi-Fi 6E Indoor
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "stellar-ap1411",
    name: "OmniAccess Stellar AP1411",
    tagline: "Entry-level Wi-Fi 6E access point with 6 GHz band support",
    description: "The AP1411 provides cost-effective access to the 6 GHz spectrum with Wi-Fi 6E (802.11ax) technology. Designed for standard enterprise deployments transitioning to 6 GHz, it delivers improved performance with wider channels and less interference.",
    category: "wlan",
    subcategory: "Wi-Fi 6E Indoor",
    features: [
      { title: "6 GHz Band Access", description: "Tri-band operation with 6 GHz spectrum provides cleaner, less congested channels for improved wireless performance and lower latency." },
      { title: "Wi-Fi 6E Standard", description: "802.11ax with 160 MHz channels, OFDMA, and MU-MIMO for efficient spectrum usage in multi-device environments." },
      { title: "Cost-Effective 6 GHz", description: "Entry-level pricing makes 6 GHz spectrum accessible for organizations beginning their Wi-Fi 6E migration." },
      { title: "Seamless Integration", description: "Fully compatible with existing OmniAccess Stellar infrastructure and OmniVista management for phased deployments." },
    ],
    highlights: [
      { stat: "Wi-Fi 6E", label: "802.11ax" },
      { stat: "6 GHz", label: "tri-band" },
      { stat: "160 MHz", label: "channels" },
      { stat: "Entry", label: "cost-effective" },
    ],
  },
  {
    slug: "stellar-ap1431",
    name: "OmniAccess Stellar AP1431",
    tagline: "Mid-range Wi-Fi 6E access point for medium-density deployments",
    description: "The AP1431 delivers balanced Wi-Fi 6E performance for medium-density enterprise environments. With enhanced MU-MIMO and higher client capacity, it serves open offices, classrooms, and healthcare facilities where consistent wireless quality is essential.",
    category: "wlan",
    subcategory: "Wi-Fi 6E Indoor",
    features: [
      { title: "Enhanced MU-MIMO", description: "8x8 MU-MIMO on the 5 GHz band with 4x4 on 6 GHz delivers high capacity for environments with many simultaneous users." },
      { title: "Medium-Density Optimized", description: "Balanced throughput and client capacity tuned for 30-50 concurrent device environments like open offices and classrooms." },
      { title: "BLE & IoT Ready", description: "Integrated Bluetooth Low Energy radio supports location services and IoT applications without additional access point hardware." },
      { title: "Smart Antenna", description: "Beam-forming technology focuses signal energy toward connected clients, improving range and signal quality." },
    ],
    highlights: [
      { stat: "8x8", label: "MU-MIMO" },
      { stat: "Wi-Fi 6E", label: "tri-band" },
      { stat: "BLE", label: "integrated" },
      { stat: "Medium", label: "density optimized" },
    ],
  },
  {
    slug: "stellar-ap1451",
    name: "OmniAccess Stellar AP1451",
    tagline: "High-performance Wi-Fi 6E for high-density venues and auditoriums",
    description: "The AP1451 is purpose-built for ultra-high-density environments where hundreds of devices demand simultaneous connectivity. Stadiums, lecture halls, and conference centers benefit from its advanced radio architecture and high client capacity.",
    category: "wlan",
    subcategory: "Wi-Fi 6E Indoor",
    features: [
      { title: "Ultra-High Density", description: "Advanced radio architecture and optimized firmware support 200+ concurrent clients per access point in lecture halls and conference venues." },
      { title: "Dedicated Scanning Radio", description: "Fourth radio dedicated to WIDS/WIPS security scanning and spectrum analysis without impacting client-serving performance." },
      { title: "Maximum Throughput", description: "Highest throughput in the Wi-Fi 6E portfolio with 160 MHz channels across all bands and maximum spatial streams." },
      { title: "Heat Map & Analytics", description: "Real-time RF heat mapping and per-client analytics enable continuous optimization of high-density wireless environments." },
    ],
    highlights: [
      { stat: "200+", label: "clients per AP" },
      { stat: "4 radios", label: "dedicated scanning" },
      { stat: "160 MHz", label: "all bands" },
      { stat: "High", label: "density flagship" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WIRELESS LAN — Wi-Fi 6 Indoor
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "stellar-ap1301",
    name: "OmniAccess Stellar AP1301",
    tagline: "Entry-level Wi-Fi 6 access point for cost-sensitive deployments",
    description: "The AP1301 provides essential Wi-Fi 6 performance at an entry-level price point. Perfect for small offices, hotel rooms, and retail locations where reliable wireless is needed without high-density requirements.",
    category: "wlan",
    subcategory: "Wi-Fi 6 Indoor",
    features: [
      { title: "Wi-Fi 6 Standard", description: "802.11ax with OFDMA and MU-MIMO for improved multi-device performance versus Wi-Fi 5, at entry-level pricing." },
      { title: "Compact Design", description: "Small form factor with plenum-rated enclosure for discreet ceiling or wall mounting in hospitality and retail environments." },
      { title: "Integrated BLE", description: "Bluetooth Low Energy radio for location services, asset tracking, and IoT applications without additional hardware." },
      { title: "Simple Deployment", description: "Zero-touch provisioning and cloud management reduce deployment time and IT overhead for distributed locations." },
    ],
    highlights: [{ stat: "Wi-Fi 6", label: "802.11ax" }, { stat: "Entry", label: "level" }, { stat: "BLE", label: "integrated" }, { stat: "Compact", label: "form factor" }],
  },
  {
    slug: "stellar-ap1301h",
    name: "OmniAccess Stellar AP1301H",
    tagline: "Wall-plate Wi-Fi 6 access point designed for hospitality and MDU",
    description: "The AP1301H is a wall-plate form factor Wi-Fi 6 access point designed for hotel rooms, student dormitories, and multi-dwelling units. It replaces standard wall outlets, providing in-room wireless and wired connectivity in a single elegant unit.",
    category: "wlan",
    subcategory: "Wi-Fi 6 Indoor",
    features: [
      { title: "Wall-Plate Design", description: "Replaces standard wall outlets with integrated Wi-Fi and Ethernet ports, eliminating the need for ceiling-mounted access points in individual rooms." },
      { title: "In-Room Connectivity", description: "Dedicated in-room coverage with isolated SSID per room for privacy, plus Ethernet ports for wired devices like smart TVs and VoIP phones." },
      { title: "Hospitality Optimized", description: "Purpose-built for hotels with captive portal integration, bandwidth management per guest, and property management system compatibility." },
      { title: "Aesthetic Design", description: "Clean, modern aesthetic that blends with room decor — no visible antennas or industrial appearance." },
    ],
    highlights: [{ stat: "Wall-plate", label: "form factor" }, { stat: "In-room", label: "coverage" }, { stat: "Hotel", label: "optimized" }, { stat: "Ethernet", label: "ports included" }],
  },
  {
    slug: "stellar-ap1311",
    name: "OmniAccess Stellar AP1311",
    tagline: "Standard Wi-Fi 6 access point for general enterprise deployments",
    description: "The AP1311 delivers solid Wi-Fi 6 performance for general enterprise environments. With dual-band operation, good client density support, and competitive pricing, it covers the widest range of enterprise wireless use cases.",
    category: "wlan",
    subcategory: "Wi-Fi 6 Indoor",
    features: [
      { title: "Balanced Performance", description: "2x2 MU-MIMO on both bands provides good per-client throughput balanced against total deployment cost for standard offices." },
      { title: "OFDMA Efficiency", description: "Orthogonal Frequency-Division Multiple Access serves multiple clients simultaneously, improving efficiency in moderate-density environments." },
      { title: "BSS Coloring", description: "Wi-Fi 6 BSS Coloring reduces co-channel interference in dense AP deployments, improving overall network performance." },
      { title: "Cloud or On-Prem", description: "Full management flexibility with OmniVista Cirrus cloud or on-premises OmniVista for diverse IT operational models." },
    ],
    highlights: [{ stat: "Wi-Fi 6", label: "dual-band" }, { stat: "2x2", label: "MU-MIMO" }, { stat: "OFDMA", label: "efficiency" }, { stat: "Standard", label: "enterprise" }],
  },
  {
    slug: "stellar-ap1320",
    name: "OmniAccess Stellar AP1320 Series",
    tagline: "Versatile Wi-Fi 6 access point family for diverse enterprise needs",
    description: "The AP1320 Series offers a range of Wi-Fi 6 configurations to match specific deployment requirements. From basic connectivity to enhanced performance models, the series provides flexible options for campus, branch, and retail environments.",
    category: "wlan",
    subcategory: "Wi-Fi 6 Indoor",
    features: [
      { title: "Multiple Configurations", description: "Series includes models with different radio configurations and antenna options to match specific environment and density requirements." },
      { title: "External Antenna Option", description: "Models with external antenna connectors enable custom antenna solutions for specialized coverage patterns and directional deployments." },
      { title: "Enhanced PoE", description: "Support for 802.3at PoE+ ensures reliable power delivery for full-featured operation including all radios and USB accessories." },
      { title: "Universal Mounting", description: "Flexible mounting options including ceiling, wall, and T-bar grid with included mounting hardware for rapid installation." },
    ],
    highlights: [{ stat: "Wi-Fi 6", label: "flexible series" }, { stat: "Multiple", label: "configurations" }, { stat: "External", label: "antenna option" }, { stat: "PoE+", label: "powered" }],
  },
  {
    slug: "stellar-ap1331",
    name: "OmniAccess Stellar AP1331",
    tagline: "Mid-range Wi-Fi 6 access point with enhanced performance",
    description: "The AP1331 delivers mid-range Wi-Fi 6 performance with 4x4 MU-MIMO for enhanced throughput and client capacity. Suitable for medium-density environments requiring more performance than entry-level models.",
    category: "wlan",
    subcategory: "Wi-Fi 6 Indoor",
    features: [
      { title: "4x4 MU-MIMO", description: "Four spatial streams on the 5 GHz band deliver higher throughput and better performance for bandwidth-intensive applications." },
      { title: "Smart Steering", description: "Intelligent band steering and client balancing optimize per-client performance by distributing devices across available radios." },
      { title: "Enhanced Security", description: "WPA3-Enterprise, Enhanced Open, and WIDS/WIPS provide comprehensive wireless security for enterprise environments." },
      { title: "Robust Build", description: "Enterprise-grade construction with plenum-rated enclosure and dual-band internal antennas for reliable long-term deployment." },
    ],
    highlights: [{ stat: "4x4", label: "MU-MIMO" }, { stat: "WPA3", label: "security" }, { stat: "Mid-range", label: "performance" }, { stat: "Wi-Fi 6", label: "802.11ax" }],
  },
  {
    slug: "stellar-ap1351",
    name: "OmniAccess Stellar AP1351",
    tagline: "High-performance Wi-Fi 6 access point for demanding enterprise environments",
    description: "The AP1351 is the top-tier Wi-Fi 6 indoor access point, delivering maximum 802.11ax performance with 8x8 MU-MIMO, dedicated scanning radio, and the highest client density support in the Wi-Fi 6 portfolio.",
    category: "wlan",
    subcategory: "Wi-Fi 6 Indoor",
    features: [
      { title: "8x8 MU-MIMO", description: "Eight spatial streams on the 5 GHz band deliver the highest throughput available in Wi-Fi 6, supporting the most demanding wireless environments." },
      { title: "Dedicated Scanning", description: "Third radio dedicated to WIDS/WIPS security scanning and spectrum analysis without impacting client-serving radios." },
      { title: "IoT Gateway", description: "Integrated BLE 5.0 and Zigbee support enables IoT services directly from the access point without additional hardware deployment." },
      { title: "High Density", description: "Advanced airtime fairness, band steering, and OFDMA scheduling support 100+ concurrent clients per access point." },
    ],
    highlights: [{ stat: "8x8", label: "MU-MIMO" }, { stat: "3 radios", label: "dedicated scan" }, { stat: "BLE 5.0", label: "IoT ready" }, { stat: "100+", label: "clients/AP" }],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WIRELESS LAN — Outdoor
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "stellar-ap1561",
    name: "OmniAccess Stellar AP1561",
    tagline: "Outdoor Wi-Fi 7 access point for extreme environments",
    description: "The AP1561 brings Wi-Fi 7 performance to outdoor deployments. IP67-rated and built to withstand extreme weather, it provides high-speed wireless connectivity for stadiums, campuses, parks, and industrial outdoor areas.",
    category: "wlan",
    subcategory: "Outdoor",
    features: [
      { title: "Outdoor Wi-Fi 7", description: "802.11be wireless in an IP67-rated enclosure delivers next-generation outdoor wireless for the most demanding environments." },
      { title: "Extreme Weather Rated", description: "Operating from -40°C to +65°C with protection against rain, snow, dust, and UV exposure for year-round outdoor deployment." },
      { title: "Directional Antennas", description: "Internal directional antennas provide focused coverage patterns for stadiums, courtyards, and point-to-point backhaul scenarios." },
      { title: "PoE Powered", description: "802.3bt PoE++ powered for single-cable deployment, eliminating the need for local power sources in outdoor locations." },
    ],
    highlights: [{ stat: "Wi-Fi 7", label: "outdoor" }, { stat: "IP67", label: "rated" }, { stat: "-40°C", label: "to +65°C" }, { stat: "PoE++", label: "powered" }],
  },
  {
    slug: "stellar-ap1570",
    name: "OmniAccess Stellar AP1570 Series",
    tagline: "High-performance outdoor Wi-Fi 6 access point series",
    description: "The AP1570 Series delivers enterprise-grade Wi-Fi 6 performance in ruggedized outdoor enclosures. With multiple models for different coverage requirements, it serves campus courtyards, warehouse yards, and public outdoor spaces.",
    category: "wlan",
    subcategory: "Outdoor",
    features: [
      { title: "Ruggedized Outdoor Design", description: "IP67-rated enclosures with extended operating temperature range for reliable outdoor deployment in all weather conditions." },
      { title: "Multiple Antenna Options", description: "Internal omnidirectional and external antenna connector models for flexible coverage patterns including 360° and directional deployments." },
      { title: "Mesh Networking", description: "Built-in mesh capability enables wireless backhaul between outdoor access points, extending coverage without running cable to every location." },
      { title: "High-Power Radios", description: "Enhanced transmit power for extended range coverage in large outdoor areas, reducing the number of access points required." },
    ],
    highlights: [{ stat: "Wi-Fi 6", label: "outdoor" }, { stat: "IP67", label: "ruggedized" }, { stat: "Mesh", label: "wireless backhaul" }, { stat: "High power", label: "extended range" }],
  },
  {
    slug: "stellar-ap1360",
    name: "OmniAccess Stellar AP1360 Series",
    tagline: "Versatile outdoor Wi-Fi 6 access point for diverse environments",
    description: "The AP1360 Series provides cost-effective outdoor Wi-Fi 6 coverage for courtyards, parking areas, outdoor dining, and building perimeters. Multiple models offer flexibility in antenna configuration and deployment options.",
    category: "wlan",
    subcategory: "Outdoor",
    features: [
      { title: "Cost-Effective Outdoor", description: "Enterprise-grade outdoor wireless at a price point suitable for broad campus-wide deployment covering secondary outdoor areas." },
      { title: "Dual-Band Wi-Fi 6", description: "Simultaneous 2.4 GHz and 5 GHz operation with MU-MIMO and OFDMA for reliable outdoor multi-device connectivity." },
      { title: "Surge Protection", description: "Built-in lightning and surge protection safeguards the access point and connected network infrastructure from electrical events." },
      { title: "Flexible Mounting", description: "Pole, wall, and ceiling mount options with adjustable brackets for optimal antenna orientation in any outdoor installation." },
    ],
    highlights: [{ stat: "Wi-Fi 6", label: "dual-band" }, { stat: "Outdoor", label: "versatile" }, { stat: "Surge", label: "protected" }, { stat: "Flexible", label: "mounting" }],
  },
  {
    slug: "stellar-ap1261",
    name: "OmniAccess Stellar AP1261",
    tagline: "Economy outdoor access point for basic outdoor wireless coverage",
    description: "The AP1261 provides basic outdoor wireless coverage at an economy price point. Suitable for extending enterprise wireless to outdoor areas where basic connectivity is needed without high-performance requirements.",
    category: "wlan",
    subcategory: "Outdoor",
    features: [
      { title: "Economy Outdoor", description: "Most cost-effective outdoor access point in the Stellar portfolio for budget-conscious deployments and basic outdoor coverage." },
      { title: "Weather Resistant", description: "IP66-rated enclosure protects against rain and dust for reliable operation in standard outdoor environments." },
      { title: "Easy Installation", description: "Simple pole or wall mounting with integrated power-over-Ethernet for quick, single-cable deployment." },
      { title: "Central Management", description: "Full OmniVista management integration ensures consistent policies and monitoring across indoor and outdoor access points." },
    ],
    highlights: [{ stat: "Economy", label: "entry price" }, { stat: "IP66", label: "weather rated" }, { stat: "PoE", label: "single cable" }, { stat: "Managed", label: "OmniVista" }],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PHONES & DEVICES
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "ale-deskphones",
    name: "ALE DeskPhones",
    tagline: "Enterprise desk phones with rich communication features and elegant design",
    description: "ALE DeskPhones deliver premium enterprise telephony with high-definition audio, color displays, and intuitive interfaces. Compatible with OmniPCX Enterprise and Rainbow Hub, they serve as the primary communication tool for office workers, receptionists, and executives.",
    category: "devices",
    features: [
      { title: "HD Audio Quality", description: "Wideband audio with acoustic echo cancellation and noise reduction for crystal-clear conversations in any office environment." },
      { title: "Color Display", description: "Intuitive color screens with customizable softkeys, directory access, and visual voicemail for efficient call management." },
      { title: "Rainbow Integration", description: "Native Rainbow Hub integration adds presence, instant messaging, and collaboration features directly from the desk phone interface." },
      { title: "Bluetooth & USB", description: "Bluetooth for wireless headsets and USB port for wired headsets, providing flexible audio options for every user preference." },
    ],
    highlights: [{ stat: "HD", label: "wideband audio" }, { stat: "Color", label: "display" }, { stat: "BT + USB", label: "headset support" }, { stat: "Rainbow", label: "integrated" }],
  },
  {
    slug: "ale-sip-deskphones",
    name: "ALE SIP DeskPhones",
    tagline: "Open SIP desk phones compatible with any standards-based platform",
    description: "ALE SIP DeskPhones are standards-based SIP terminals compatible with Rainbow Hub and any open SIP server. They deliver enterprise-grade voice quality and features with the flexibility of open standards, eliminating vendor lock-in.",
    category: "devices",
    features: [
      { title: "Open SIP Standard", description: "Full SIP compliance ensures compatibility with Rainbow Hub, third-party SIP servers, and hosted VoIP services without proprietary dependencies." },
      { title: "Enterprise Features", description: "Multi-line support, transfer, conferencing, call parking, BLF keys, and programmable softkeys for professional call handling." },
      { title: "PoE Powered", description: "IEEE 802.3af PoE support for single-cable installation — power and data over one Ethernet cable, simplifying deployment." },
      { title: "Provisionable at Scale", description: "Auto-provisioning and centralized configuration management for mass deployment across multi-site organizations." },
    ],
    highlights: [{ stat: "Open SIP", label: "standard" }, { stat: "Multi-line", label: "support" }, { stat: "PoE", label: "powered" }, { stat: "Auto", label: "provisioning" }],
  },
  {
    slug: "smart-deskphones",
    name: "Smart DeskPhones",
    tagline: "Next-generation desk phones with HD video and touchscreen interface",
    description: "ALE Smart DeskPhones represent the future of desktop communications, combining HD video calling, touchscreen interfaces, and smart device features in an innovative desk phone form factor. They deliver immersive collaboration experiences rivaling dedicated video conferencing equipment.",
    category: "devices",
    features: [
      { title: "HD Video Calling", description: "Built-in HD camera and display enable face-to-face video conversations directly from the desk phone without a separate video conferencing device." },
      { title: "Touchscreen Interface", description: "Large, intuitive touchscreen with smartphone-like interaction for contacts, call history, settings, and application access." },
      { title: "Smart Device Features", description: "Android-based platform enables applications, web browsing, and integration with enterprise systems beyond traditional telephony." },
      { title: "Premium Audio", description: "Full-duplex speakerphone with advanced DSP, acoustic echo cancellation, and noise suppression for professional audio quality." },
    ],
    highlights: [{ stat: "HD Video", label: "built-in camera" }, { stat: "Touch", label: "screen interface" }, { stat: "Smart", label: "Android-based" }, { stat: "Premium", label: "audio quality" }],
  },
  {
    slug: "sip-softphone",
    name: "IP Desktop Softphone",
    tagline: "Full-featured softphone application bringing desk phone functionality to any PC",
    description: "The IP Desktop Softphone transforms any PC or laptop into a full-featured enterprise phone. With all the capabilities of a hardware desk phone in a software application, it enables remote workers and mobile employees to stay connected with enterprise telephony from anywhere.",
    category: "devices",
    features: [
      { title: "Full Desk Phone Features", description: "Transfer, conferencing, hold, call recording, speed dials, and programmable keys — every hardware desk phone feature in software." },
      { title: "UC Integration", description: "Presence, instant messaging, and click-to-dial integration with Rainbow and enterprise directories for efficient communications." },
      { title: "Remote Worker Ready", description: "VPN-compatible for secure remote access to enterprise telephony, enabling full feature parity between office and home workers." },
      { title: "Multi-Platform", description: "Available for Windows and macOS with consistent user experience across platforms and automatic provisioning from the PBX." },
    ],
    highlights: [{ stat: "Software", label: "phone" }, { stat: "Full", label: "UC features" }, { stat: "Remote", label: "worker ready" }, { stat: "Multi", label: "platform" }],
  },
  {
    slug: "pimphony",
    name: "PIMphony",
    tagline: "Unified communications client for OmniPCX Enterprise",
    description: "PIMphony is a desktop unified communications client that integrates telephony, presence, and instant messaging with Microsoft Outlook and enterprise directories. It provides click-to-call, visual voicemail, and call control directly from the desktop.",
    category: "devices",
    features: [
      { title: "Outlook Integration", description: "Deep integration with Microsoft Outlook for click-to-dial from contacts, calendar-based presence, and automatic call journaling." },
      { title: "Visual Call Control", description: "Manage calls visually with drag-and-drop transfer, one-click conferencing, and graphical call history with recording playback." },
      { title: "Presence & IM", description: "Real-time presence status and instant messaging for quick team communication without switching between separate applications." },
      { title: "Directory Access", description: "Unified search across corporate LDAP directories, personal contacts, and call history for fast number lookup and dialing." },
    ],
    highlights: [{ stat: "Outlook", label: "integrated" }, { stat: "Visual", label: "call control" }, { stat: "Presence", label: "& messaging" }, { stat: "LDAP", label: "directory" }],
  },
  {
    slug: "dect-handsets",
    name: "DECT Handsets",
    tagline: "Professional wireless handsets for enterprise mobility",
    description: "ALE DECT handsets provide wireless voice mobility across enterprise campuses, warehouses, and healthcare facilities. From basic models for general use to ruggedized units for industrial environments, the range covers every wireless mobility requirement.",
    category: "devices",
    features: [
      { title: "Campus-Wide Mobility", description: "Seamless roaming across DECT base station cells with automatic handover for uninterrupted calls while moving throughout facilities." },
      { title: "Range of Models", description: "From compact basic handsets to ruggedized, dust/water-resistant models with barcode scanners for warehouse and industrial use." },
      { title: "Long Battery Life", description: "Extended talk and standby times with quick-charge capability for demanding shift-work environments in healthcare and logistics." },
      { title: "Alarm & Messaging", description: "Built-in alarm button, text messaging, and push-to-talk capabilities for safety-critical and team communication scenarios." },
    ],
    highlights: [{ stat: "DECT", label: "wireless" }, { stat: "Roaming", label: "campus-wide" }, { stat: "Ruggedized", label: "options" }, { stat: "Alarm", label: "safety button" }],
  },
  {
    slug: "sip-dect-handsets",
    name: "SIP-DECT Handsets",
    tagline: "Standards-based DECT handsets with open SIP connectivity",
    description: "SIP-DECT handsets combine the mobility of DECT wireless with the flexibility of open SIP standards. Compatible with any SIP-based communication platform, they provide wireless voice mobility without proprietary infrastructure dependencies.",
    category: "devices",
    features: [
      { title: "Open SIP Standard", description: "SIP-based DECT connectivity works with Rainbow Hub, OmniPCX Enterprise, and third-party SIP platforms for maximum deployment flexibility." },
      { title: "HD Voice", description: "Wideband audio (G.722) for crystal-clear voice quality over DECT wireless, matching the audio quality of wired desk phones." },
      { title: "Bluetooth Audio", description: "Bluetooth support for wireless headsets enables hands-free operation for workers who need mobility with both hands available." },
      { title: "Central Management", description: "Fleet-wide management through SIP-DECT management system for firmware updates, configuration, and monitoring across all handsets." },
    ],
    highlights: [{ stat: "SIP", label: "DECT standard" }, { stat: "HD", label: "wideband voice" }, { stat: "Bluetooth", label: "headset support" }, { stat: "Fleet", label: "managed" }],
  },
  {
    slug: "wlan-handsets",
    name: "WLAN Handsets",
    tagline: "Wi-Fi voice handsets leveraging existing wireless LAN infrastructure",
    description: "ALE WLAN handsets provide wireless voice mobility over existing Wi-Fi infrastructure, eliminating the need for separate DECT base stations. Ideal for organizations that have already deployed OmniAccess Stellar Wi-Fi and want to add wireless voice without additional infrastructure.",
    category: "devices",
    features: [
      { title: "Wi-Fi Voice", description: "Enterprise voice over Wi-Fi using existing OmniAccess Stellar infrastructure — no additional DECT base stations required." },
      { title: "Seamless Roaming", description: "802.11r fast roaming ensures uninterrupted calls while moving between access points across campus and building environments." },
      { title: "Ruggedized Design", description: "Built for healthcare, manufacturing, and warehouse environments with dust/water resistance and drop-proof construction." },
      { title: "Push-to-Talk", description: "Walkie-talkie-style push-to-talk functionality for team communications in hospitality, retail, and logistics environments." },
    ],
    highlights: [{ stat: "Wi-Fi", label: "voice" }, { stat: "No DECT", label: "infrastructure needed" }, { stat: "Ruggedized", label: "durable" }, { stat: "PTT", label: "push-to-talk" }],
  },
  {
    slug: "aries-headsets",
    name: "Aries Series Headsets",
    tagline: "Professional headsets designed for enterprise UC and contact center environments",
    description: "The Aries Series headsets deliver professional audio quality for enterprise unified communications and contact center environments. With active noise cancellation, all-day comfort, and multi-device connectivity, they optimize the audio experience for every business communication.",
    category: "devices",
    features: [
      { title: "Active Noise Cancellation", description: "Advanced ANC blocks background noise for clear conversations in open offices, contact centers, and noisy environments." },
      { title: "All-Day Comfort", description: "Lightweight design with cushioned ear pads and adjustable headband for comfortable wear during extended shifts and long call sessions." },
      { title: "Multi-Device Connectivity", description: "Simultaneous Bluetooth and USB connection allows switching between desk phone, PC, and mobile phone seamlessly." },
      { title: "UC Platform Certified", description: "Certified for Rainbow, Microsoft Teams, and other UC platforms with dedicated call control buttons for native integration." },
    ],
    highlights: [{ stat: "ANC", label: "noise cancellation" }, { stat: "BT + USB", label: "multi-device" }, { stat: "All-day", label: "comfort" }, { stat: "UC", label: "certified" }],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CONTACT CENTER & APPLICATIONS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "dispatch-console",
    name: "Dispatch Console",
    tagline: "Centralized dispatch and emergency communication management",
    description: "The Dispatch Console provides centralized call handling, dispatch coordination, and emergency communication management for transportation, public safety, and large campus environments. Operators can manage multiple calls, broadcast announcements, and coordinate emergency response from a single interface.",
    category: "applications",
    features: [
      { title: "Multi-Call Management", description: "Handle multiple simultaneous calls with visual call queue, priority routing, and one-click transfer for efficient dispatch operations." },
      { title: "Emergency Broadcasting", description: "Mass notification and public address integration for emergency announcements across zones, buildings, or entire campuses." },
      { title: "Recording & Logging", description: "Automatic call recording with timestamp and operator ID logging for compliance, training, and incident review purposes." },
      { title: "Integration APIs", description: "Integration with SCADA, building management, and security systems for coordinated response to alarms and operational events." },
    ],
    highlights: [{ stat: "Multi-call", label: "management" }, { stat: "Emergency", label: "broadcast" }, { stat: "Recording", label: "& logging" }, { stat: "SCADA", label: "integration" }],
  },
  {
    slug: "voip-softphone",
    name: "VoIP Softphone for Business",
    tagline: "Professional VoIP softphone application for enterprise communications",
    description: "The VoIP Softphone for Business delivers full enterprise telephony capabilities through a software application on PC, Mac, or mobile devices. It provides seamless integration with OmniPCX Enterprise for remote and mobile workers.",
    category: "applications",
    features: [
      { title: "Enterprise Telephony", description: "Full PBX feature set including transfer, conferencing, call forwarding, voicemail, and BLF in a software interface." },
      { title: "Video Calling", description: "Point-to-point video calls with HD quality for face-to-face communication from any location with internet connectivity." },
      { title: "Directory Integration", description: "Access corporate LDAP directories and personal contacts with search, favorites, and recent calls for fast dialing." },
      { title: "Encryption", description: "SRTP voice encryption and TLS signaling protection ensure secure communications over public and private networks." },
    ],
    highlights: [{ stat: "Full PBX", label: "features" }, { stat: "Video", label: "HD calling" }, { stat: "Encrypted", label: "SRTP/TLS" }, { stat: "Mobile", label: "& desktop" }],
  },
  {
    slug: "omnipcx-record",
    name: "OmniPCX RECORD Suite",
    tagline: "Enterprise call recording and compliance solution",
    description: "OmniPCX RECORD Suite provides comprehensive call recording, quality monitoring, and compliance management for enterprises. It records voice interactions across multiple channels for regulatory compliance, dispute resolution, training, and quality assurance purposes.",
    category: "applications",
    features: [
      { title: "Multi-Channel Recording", description: "Record calls across OmniPCX Enterprise, SIP trunks, and contact center channels with automatic and on-demand recording options." },
      { title: "Compliance Management", description: "PCI-DSS pause/resume, MiFID II compliance, GDPR-ready data management, and configurable retention policies for regulatory requirements." },
      { title: "Quality Monitoring", description: "Screen recording, agent scoring, and quality evaluation tools for contact center supervisors to improve customer service quality." },
      { title: "Search & Playback", description: "Advanced search with date, time, number, agent, and metadata filters with instant playback and secure export capabilities." },
    ],
    highlights: [{ stat: "Recording", label: "multi-channel" }, { stat: "PCI-DSS", label: "compliant" }, { stat: "QM", label: "quality monitoring" }, { stat: "Search", label: "& playback" }],
  },
  {
    slug: "visual-automated-attendant",
    name: "Visual Automated Attendant",
    tagline: "Intelligent automated call handling and routing for enterprises",
    description: "The Visual Automated Attendant provides intelligent call routing, auto-attendant, and IVR services for enterprises. With visual flow design, multi-language support, and integration with corporate directories, it ensures every caller reaches the right person or department efficiently.",
    category: "applications",
    features: [
      { title: "Visual Flow Design", description: "Drag-and-drop call flow designer enables business users to create and modify call routing rules without IT or programming expertise." },
      { title: "Multi-Language IVR", description: "Automated greetings and menus in multiple languages with text-to-speech and professional voice recording support." },
      { title: "Directory Integration", description: "Callers can search by name or department with dial-by-name functionality connected to corporate LDAP directories." },
      { title: "Time-Based Routing", description: "Automatic routing changes based on business hours, holidays, and special schedules with overflow and failover rules." },
    ],
    highlights: [{ stat: "Visual", label: "flow design" }, { stat: "Multi-lang", label: "IVR" }, { stat: "Dial-by", label: "name" }, { stat: "Time-based", label: "routing" }],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ECOSYSTEM INTEGRATION
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "microsoft-teams-integration",
    name: "Microsoft Teams Integration",
    tagline: "Connect ALE enterprise telephony with Microsoft Teams",
    description: "ALE's Microsoft Teams integration brings enterprise-grade telephony to the Teams environment. Users make and receive calls through their ALE phone system directly within the Teams interface, combining the collaboration power of Teams with the reliability and features of OmniPCX Enterprise.",
    category: "integration",
    features: [
      { title: "Direct Routing", description: "SIP-based direct routing connects OmniPCX Enterprise to Microsoft Teams, enabling PSTN calling and enterprise telephony within the Teams client." },
      { title: "Native Teams Experience", description: "Users make and receive calls through the familiar Teams interface — no separate applications or desktop clients required." },
      { title: "Enterprise Features Preserved", description: "Advanced PBX features including hunt groups, call queues, IVR, and recording remain available through the Teams-connected phone system." },
      { title: "Hybrid Flexibility", description: "Support mixed environments where some users are on Teams and others use traditional desk phones, all on the same phone system." },
    ],
    highlights: [{ stat: "Teams", label: "native calling" }, { stat: "SIP", label: "direct routing" }, { stat: "PBX", label: "features preserved" }, { stat: "Hybrid", label: "flexible" }],
  },
  {
    slug: "rainbow-app-connector",
    name: "Rainbow App Connector",
    tagline: "Connect Rainbow communications with CRM and business applications",
    description: "Rainbow App Connector integrates Rainbow communications capabilities with popular CRM and business applications including Salesforce, Microsoft Dynamics, and ServiceNow. It enables click-to-call, screen pop, and automatic activity logging directly within business workflows.",
    category: "integration",
    features: [
      { title: "CRM Integration", description: "Native connectors for Salesforce, Microsoft Dynamics 365, and other leading CRM platforms with click-to-call and automatic contact lookup." },
      { title: "Screen Pop", description: "Incoming calls automatically display caller information and history from CRM records, enabling personalized customer interactions." },
      { title: "Activity Logging", description: "Call details, duration, and notes are automatically logged as activities in the CRM, eliminating manual data entry." },
      { title: "Customizable Workflows", description: "Configurable triggers and actions enable custom integrations with any web-based application through webhooks and REST APIs." },
    ],
    highlights: [{ stat: "CRM", label: "integration" }, { stat: "Screen pop", label: "caller info" }, { stat: "Auto-log", label: "activities" }, { stat: "REST API", label: "customizable" }],
  },
  {
    slug: "omnipcx-open-gateway",
    name: "OmniPCX Open Gateway",
    tagline: "Open API gateway for third-party integration with OmniPCX Enterprise",
    description: "OmniPCX Open Gateway exposes OmniPCX Enterprise telephony capabilities through standard APIs, enabling third-party applications to control calls, access presence information, and integrate with enterprise communications programmatically.",
    category: "integration",
    features: [
      { title: "Telephony APIs", description: "REST and SOAP APIs for call control, directory access, voicemail management, and presence — enabling custom application integration." },
      { title: "Event Notifications", description: "Real-time webhook notifications for call events, presence changes, and system alerts for event-driven application architectures." },
      { title: "CTI Integration", description: "Computer-Telephony Integration for contact center screen pop, predictive dialing, and agent state management." },
      { title: "Standards-Based", description: "OASIS, SIP, and REST standards ensure interoperability with a wide ecosystem of enterprise applications and platforms." },
    ],
    highlights: [{ stat: "REST", label: "& SOAP APIs" }, { stat: "CTI", label: "integration" }, { stat: "Webhooks", label: "real-time events" }, { stat: "Standards", label: "based" }],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // COMMUNICATIONS & NETWORK MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "omnivista-8770",
    name: "OmniVista 8770",
    tagline: "Unified communications management system for OmniPCX Enterprise",
    description: "OmniVista 8770 is the comprehensive management platform for ALE communications infrastructure. It provides centralized management of OmniPCX Enterprise systems, user provisioning, performance monitoring, and fault management across multi-site deployments.",
    category: "management",
    features: [
      { title: "Centralized Management", description: "Single platform manages multiple OmniPCX Enterprise nodes across geographies with consolidated monitoring, configuration, and reporting." },
      { title: "User Provisioning", description: "Web-based user management with bulk provisioning, template-based configuration, and self-service portal for common user operations." },
      { title: "Performance Monitoring", description: "Real-time monitoring of trunk utilization, call quality metrics, system health, and capacity planning dashboards." },
      { title: "Fault Management", description: "Automated alarm collection, correlation, and escalation with customizable notification rules and trouble ticketing integration." },
    ],
    highlights: [{ stat: "Multi-site", label: "management" }, { stat: "Bulk", label: "provisioning" }, { stat: "Real-time", label: "monitoring" }, { stat: "Alarm", label: "management" }],
  },
  {
    slug: "unified-management-center",
    name: "Unified Management Center",
    tagline: "Centralized management for ALE communications portfolio",
    description: "Unified Management Center provides a single management interface for the complete ALE communications portfolio including OmniPCX Enterprise, OXO Connect, and Rainbow. It simplifies multi-system management with unified monitoring and configuration.",
    category: "management",
    features: [
      { title: "Unified Interface", description: "Single web-based interface manages OmniPCX Enterprise, OXO Connect, and hybrid environments with consistent workflows across platforms." },
      { title: "Dashboard Views", description: "Customizable dashboards with real-time system status, call statistics, and KPI tracking for operations teams and management." },
      { title: "Configuration Backup", description: "Automated configuration backup and restore with version control and scheduled backup policies for disaster recovery." },
      { title: "Multi-Tenant", description: "Multi-tenant architecture supports managed service providers and large enterprises with separate administrative domains." },
    ],
    highlights: [{ stat: "Unified", label: "management" }, { stat: "Multi-platform", label: "support" }, { stat: "Backup", label: "& restore" }, { stat: "Multi-tenant", label: "capable" }],
  },
  {
    slug: "opentouch-sbc",
    name: "OpenTouch Session Border Controller",
    tagline: "Enterprise session border controller for secure SIP communications",
    description: "The OpenTouch Session Border Controller protects enterprise communications infrastructure at the network edge. It provides SIP security, NAT traversal, protocol normalization, and quality of service for secure voice and video communications across network boundaries.",
    category: "management",
    features: [
      { title: "SIP Security", description: "Protection against SIP-based attacks including toll fraud, DoS, malformed packets, and unauthorized access at the network perimeter." },
      { title: "NAT Traversal", description: "Reliable SIP and media traversal across NAT boundaries for remote workers, branch offices, and SIP trunk connections." },
      { title: "Protocol Normalization", description: "SIP interworking between different vendor implementations ensures compatibility with SIP trunk providers and third-party systems." },
      { title: "QoS & Media Management", description: "Traffic classification, prioritization, and media anchoring ensure consistent voice and video quality across WAN links." },
    ],
    highlights: [{ stat: "SBC", label: "perimeter security" }, { stat: "NAT", label: "traversal" }, { stat: "SIP", label: "interworking" }, { stat: "QoS", label: "media quality" }],
  },
  {
    slug: "fleet-supervision",
    name: "Fleet Supervision",
    tagline: "Device fleet management for ALE phones and terminals",
    description: "Fleet Supervision enables centralized management of ALE phone fleets across enterprise deployments. IT administrators can remotely monitor, configure, update firmware, and troubleshoot thousands of desk phones and wireless handsets from a single management console.",
    category: "management",
    features: [
      { title: "Fleet Monitoring", description: "Real-time visibility into the status, firmware version, and health of every phone and terminal deployed across the enterprise." },
      { title: "Remote Configuration", description: "Push configuration changes, speed dials, and settings to individual phones or groups without physical access to each device." },
      { title: "Firmware Management", description: "Schedule and deploy firmware updates across the fleet with staged rollouts, rollback capability, and compliance reporting." },
      { title: "Troubleshooting", description: "Remote diagnostic tools including call quality metrics, network connectivity tests, and log collection for rapid issue resolution." },
    ],
    highlights: [{ stat: "Fleet", label: "management" }, { stat: "Remote", label: "configuration" }, { stat: "Firmware", label: "updates" }, { stat: "Diagnostics", label: "remote" }],
  },
  {
    slug: "omniswitch-milestone",
    name: "OmniSwitch Milestone Plugin",
    tagline: "Video surveillance network integration for OmniSwitch infrastructure",
    description: "The OmniSwitch Milestone Plugin integrates ALE network switches with Milestone XProtect video management software. It provides network-aware video surveillance with automatic camera discovery, PoE management, and network health monitoring directly within the Milestone interface.",
    category: "management",
    features: [
      { title: "Camera Auto-Discovery", description: "Automatically discovers IP cameras connected to OmniSwitch ports with LLDP-based identification and network topology mapping." },
      { title: "PoE Management", description: "Monitor and manage PoE power delivery to cameras directly from the Milestone interface, including remote power cycling for troubleshooting." },
      { title: "Network Health", description: "Real-time switch port status, bandwidth utilization, and network health indicators displayed alongside video surveillance feeds." },
      { title: "Unified Management", description: "Security operators manage both video and network infrastructure from a single Milestone XProtect console, reducing tool sprawl." },
    ],
    highlights: [{ stat: "Milestone", label: "integrated" }, { stat: "Auto-discover", label: "cameras" }, { stat: "PoE", label: "management" }, { stat: "Unified", label: "console" }],
  },
  {
    slug: "omnivista-smart-tool",
    name: "OmniVista Smart Tool",
    tagline: "Network administration utility for OmniSwitch configuration and troubleshooting",
    description: "OmniVista Smart Tool is a lightweight network administration utility for configuring, monitoring, and troubleshooting individual OmniSwitch devices. It provides a simplified interface for common administrative tasks without requiring the full OmniVista management platform.",
    category: "management",
    features: [
      { title: "Quick Configuration", description: "Simplified wizards for common switch configuration tasks including VLANs, ports, PoE settings, and access control lists." },
      { title: "Real-Time Monitoring", description: "Live port statistics, traffic counters, and system resource monitoring for immediate visibility into switch operations." },
      { title: "Troubleshooting Tools", description: "Built-in cable diagnostics, port mirroring setup, ping, traceroute, and packet capture for rapid network troubleshooting." },
      { title: "Lightweight Deployment", description: "No server required — runs directly on a technician's laptop with web browser for on-site switch management and commissioning." },
    ],
    highlights: [{ stat: "Lightweight", label: "no server needed" }, { stat: "Wizards", label: "simplified config" }, { stat: "Diagnostics", label: "cable & port" }, { stat: "Portable", label: "laptop-based" }],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // COMMUNICATION PLATFORMS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "sip-dect-base-stations",
    name: "SIP-DECT Base Stations",
    tagline: "Standards-based DECT infrastructure for enterprise wireless voice",
    description: "ALE SIP-DECT base stations provide wireless voice infrastructure using open SIP standards. Compatible with any SIP-based communication platform, they deliver enterprise DECT mobility without proprietary dependencies — supporting seamless roaming across large campus deployments.",
    category: "platforms",
    features: [
      { title: "Open SIP Standard", description: "SIP-based DECT infrastructure compatible with Rainbow Hub, OmniPCX Enterprise, and third-party SIP platforms." },
      { title: "Seamless Roaming", description: "Multi-cell architecture with automatic handover enables uninterrupted calls while roaming across large campus environments." },
      { title: "High Density", description: "Each base station supports multiple simultaneous calls with configurable capacity to match deployment requirements." },
      { title: "PoE Powered", description: "IEEE 802.3af PoE support for single-cable deployment, simplifying installation across ceiling-mounted locations." },
    ],
    highlights: [{ stat: "SIP", label: "DECT standard" }, { stat: "Roaming", label: "multi-cell" }, { stat: "PoE", label: "powered" }, { stat: "Open", label: "standards" }],
  },
  {
    slug: "dect-base-stations",
    name: "DECT Base Stations",
    tagline: "Enterprise DECT base station infrastructure for OmniPCX environments",
    description: "ALE DECT base stations provide wireless voice mobility infrastructure for OmniPCX Enterprise deployments. They deliver campus-wide DECT coverage with seamless handover, supporting the full range of ALE DECT handsets for enterprise mobility.",
    category: "platforms",
    features: [
      { title: "OmniPCX Integration", description: "Native integration with OmniPCX Enterprise for full PBX feature access from DECT handsets including transfer, conferencing, and messaging." },
      { title: "Campus Coverage", description: "Multi-cell architecture covers entire buildings and campuses with automatic frequency planning and interference avoidance." },
      { title: "Redundant Architecture", description: "Controller redundancy and base station resilience ensure continuous wireless service even during component failures." },
      { title: "Location Services", description: "Cell-based location provides zone-level positioning for emergency location, asset tracking, and presence-aware services." },
    ],
    highlights: [{ stat: "OmniPCX", label: "native" }, { stat: "Campus", label: "coverage" }, { stat: "Redundant", label: "architecture" }, { stat: "Location", label: "services" }],
  },
];
