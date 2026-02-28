export interface CaseStudy {
  slug: string;
  name: string;
  industry: string;
  industrySlug: string;
  country: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: { text: string; author: string; role: string };
  products: string[];
}

export const caseStudiesData: CaseStudy[] = [
  // ─── Healthcare ──────────────────────────────────────────────────────────────

  {
    slug: "korea-university-medicine",
    name: "Korea University Medicine",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "South Korea",
    tagline: "University modernizes its network infrastructure for smarter care",
    challenge:
      "Extensive wireless coverage gaps impeding staff productivity across three hospital campuses (Anam, Ansan, Guro). Aging systems unable to support modern wireless speeds or advanced medical devices. Network saturation from IoT and connected healthcare equipment with inadequate wireless intrusion prevention.",
    solution:
      "OmniAccess Stellar WLAN and switching infrastructure across three hospital campuses with dedicated WIPS solution. Integration with existing HPE Aruba equipment and BIN Solutions' IDEN platform for real-time locating systems (RTLS).",
    results: [
      "~20% productivity increase through reliable wireless",
      "Data transmission speeds improved >50% for critical PACS systems",
      "Controller-less design reduced deployment costs by ~50%",
      "Automated patient monitoring decreased nursing workload",
    ],
    quote: {
      text: "The superior performance of the new network has significantly improved our operational efficiency and enabled deployment of advanced medical technologies previously constrained by network limitations.",
      author: "Yoon Ju Sung",
      role: "Head of Digital Transformation, Medical Intelligence & Data Hub",
    },
    products: ["OmniAccess Stellar AP1320", "OmniSwitch 6900V48", "OmniSwitch 6560P48Z16", "OmniVista 2500"],
  },
  {
    slug: "istituto-ortopedico-rizzoli",
    name: "Istituto Ortopedico Rizzoli",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "Italy",
    tagline: "Hospital improves efficiency of communications, mobile network and patient care",
    challenge:
      "Outdated analog communication systems limiting flexibility. Growing demand for remote work. Need for streamlined appointment and waiting list management during COVID-19.",
    solution:
      "Migration from analog to VoIP-based digital communications with OmniPCX Enterprise Communication Server, Rainbow unified communications platform and softphones, Ellysse platform for AI chatbots and virtual assistants, and OmniVista 8770 network management.",
    results: [
      "Simplified, flexible internal communications",
      "Network redundancy ensuring reliability",
      "Reduced telephony maintenance costs",
      "Faster, more accurate patient responses with AI chatbots",
      "Streamlined booking and reduced wait times",
    ],
    quote: {
      text: "Thanks to digital transformation, with Alcatel-Lucent Enterprise we improved communication reliability, simplified mobile working, and made patient care more efficient.",
      author: "Luca Lolli",
      role: "Technical Assistant, Istituto Ortopedico Rizzoli",
    },
    products: ["OmniPCX Enterprise", "ALE DeskPhones", "WLAN Handsets", "Rainbow", "OmniVista 8770"],
  },
  {
    slug: "john-flynn-private-hospital",
    name: "John Flynn Private Hospital",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "Australia",
    tagline: "Hospital invests in technology to improve patient care and support",
    challenge:
      "Improve alarm code management and emergency notifications. Reduce nurse response times. Consolidate technology from multiple vendors into a unified system.",
    solution:
      "Bespoke alarm and notification system using IQ Messenger integrated with existing OmniPCX Enterprise infrastructure, Premium DeskPhones, DECT handsets, and OmniVista 8770 network management.",
    results: [
      "Mission-critical telephony with digital alarms",
      "Consolidated technology from single vendor",
      "Faster nurse response times",
      "Improved patient care and safety",
    ],
    products: ["OmniPCX Enterprise", "Premium DeskPhones 8068s/8019s", "DECT 8262", "OmniVista 8770"],
  },
  {
    slug: "fertilys-clinic",
    name: "Fertilys Clinic",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "Canada",
    tagline: "Stable, reliable telephony provides quality patient experience",
    challenge:
      "Call loss issues with outdated phone system causing patient dissatisfaction. Needed unified system across two locations with reliable call routing.",
    solution:
      "OmniPCX Enterprise with DeskPhones and Visual Automated Attendant across both sites, providing seamless call routing and zero lost calls.",
    results: [
      "100% staff reachability, zero lost calls",
      "Improved reputation attracting new patients",
      "Unified communications across two locations",
    ],
    quote: {
      text: "I now have peace of mind to focus on quality service and improving our practices.",
      author: "Sebastien Temoin",
      role: "VP of Strategy, Fertilys Clinic",
    },
    products: ["OmniPCX Enterprise", "DeskPhones", "Visual Automated Attendant", "OmniVista 8770"],
  },
  {
    slug: "kaiserswerther-diakonie",
    name: "Kaiserswerther Diakonie",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "Germany",
    tagline: "Implementing a sustainable communications solution for efficiency and stability",
    challenge:
      "Managing communications for complex critical operations across multiple healthcare facilities, educational institutions, and social services with ~3,000 employees. Required robust, scalable telephony with high availability.",
    solution:
      "OmniPCX Enterprise Communication Server supporting 4,000+ connected users, ALE DeskPhones and DECT Handsets, OmniVista 8770 Network Management System. Partnered with cosmotel IT.",
    results: [
      "Robust telephony with high availability",
      "Flexible server scalability",
      "Excellent price-to-performance ratio",
      "Investment protection through continuous updates",
    ],
    quote: {
      text: "In Alcatel-Lucent Enterprise, we have found a reliable partner that shares ideas for improving our processes, making valuable contributions to our continuous optimization.",
      author: "Axel Fahl",
      role: "Deputy Head of Communications Engineering",
    },
    products: ["OmniPCX Enterprise", "ALE DeskPhones", "DECT Handsets", "OmniVista 8770"],
  },
  {
    slug: "groupe-edenis",
    name: "Groupe EDENIS",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "France",
    tagline: "Next-generation Wi-Fi connectivity modernizes senior care across 16 sites",
    challenge:
      "Severely limited Wi-Fi connectivity across 24 establishments unable to support growing digital resource consumption. Needed a single, centralized, reliable network while maintaining data privacy compliance.",
    solution:
      "Deployed across 16 sites: 600 Wi-Fi terminals and 60 switches including OmniSwitch 6360 POE switches, OmniAccess Stellar AP1301 access points, and OmniVista Cirrus network management. Partner: NXO France.",
    results: [
      "Secure, high-quality Wi-Fi across 16 sites",
      "Homogeneous infrastructure with centralized supervision",
      "Minimal internal resource requirements for deployment",
      "Significant IT team time savings",
    ],
    quote: {
      text: "We can look to the future with confidence, with a clear operational mode and technology.",
      author: "Frederic Rousseau",
      role: "Director of Operations, EDENIS Group",
    },
    products: ["OmniSwitch 6360 POE", "OmniAccess Stellar AP1301", "OmniVista Cirrus"],
  },
  {
    slug: "aster-dm-healthcare",
    name: "Aster DM Healthcare",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "United Arab Emirates",
    tagline: "Modern network foundation delivering 24/7 medical data access",
    challenge:
      "Establish robust network for new multi-specialty hospital enabling 24/7 access to medical data across multiple facilities.",
    solution:
      "Converged voice, LAN, WLAN, and network management systems with OmniSwitch 6900, OmniAccess Stellar WLAN, OmniVista management, OmniPCX Enterprise, and Rainbow collaboration.",
    results: [
      "Reliable EMR access across all facilities",
      "Enhanced clinician collaboration",
      "Seamless cross-site communication via Rainbow",
    ],
    quote: {
      text: "We appreciate the level of engagement and exceptional post-deployment support we receive.",
      author: "Dr. Sherbaz Bichu",
      role: "CEO, Aster DM Healthcare",
    },
    products: ["OmniSwitch 6900", "OmniAccess Stellar WLAN", "OmniVista 2500", "OmniPCX Enterprise", "Rainbow"],
  },
  {
    slug: "emirates-specialty-hospital",
    name: "Emirates Specialty Hospital",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "United Arab Emirates",
    tagline: "Multi-specialty hospital leverages converged network for state-of-the-art facilities",
    challenge:
      "Solid network foundation for 205,000 sq ft facility with 24/7 connectivity requirement and tight implementation timeline.",
    solution:
      "Converged data and communications network with ubiquitous WiFi coverage using OmniSwitch 6900/6860, OmniAccess, OmniVista 8770, and OmniPCX Enterprise.",
    results: [
      "24/7 connectivity across entire facility",
      "Simplified management with single platform",
      "3-year maintenance support with lifetime warranty",
    ],
    quote: {
      text: "Our cutting-edge medical technology is supported by the powerful converged ALE network.",
      author: "Ala Atari",
      role: "MD & CEO, Emirates Specialty Hospital",
    },
    products: ["OmniSwitch 6900", "OmniSwitch 6860", "OmniAccess 4450", "OmniVista 8770", "OmniPCX Enterprise"],
  },
  {
    slug: "asst-lodi",
    name: "ASST Lodi",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "Italy",
    tagline: "Secure, high-performance network enables healthcare innovation across four hospitals",
    challenge:
      "Network vulnerabilities exposed during pandemic. Needed enhanced bandwidth and security across four hospitals serving 200,000 residents.",
    solution:
      "Rainbow cloud communications, backbone switches with ring infrastructure and SPB protocol, OmniSwitch 6900 and 6860 deployment with OmniAccess Stellar wireless.",
    results: [
      "Eliminated service interruptions",
      "Increased speeds from 1GbE to 10-100 GbE",
      "Enabled remote collaboration during pandemic",
    ],
    quote: {
      text: "Our primary goal was to increase the efficiency of our geographical network.",
      author: "Flavio Cassinari",
      role: "CIO, ASST Lodi",
    },
    products: ["Rainbow", "OmniSwitch 6900", "OmniSwitch 6860", "OmniAccess Stellar AP1411"],
  },
  {
    slug: "wehi",
    name: "WEHI (Walter and Eliza Hall Institute)",
    industry: "Healthcare",
    industrySlug: "healthcare",
    country: "Australia",
    tagline: "Hybrid communications solution delivers remote working from anywhere",
    challenge:
      "Integrate new site with desk sharing, support Mac-dominant environment (95%), mission-critical telephony with cloud collaboration.",
    solution:
      "Microsoft Teams Connector with Rainbow platform integrated with OmniPCX Enterprise, providing one-number experience across all devices.",
    results: [
      "Cost-effective hybrid solution",
      "Minimal training required",
      "One-number experience across all devices",
    ],
    quote: {
      text: "ALE is a vendor with great solutions... we value their support.",
      author: "Michael Carolan",
      role: "CIO, WEHI",
    },
    products: ["OmniPCX Enterprise", "Rainbow", "Microsoft Teams Connector", "ALE 300 Handsets"],
  },

  // ─── Education ───────────────────────────────────────────────────────────────

  {
    slug: "javeriana-university",
    name: "Pontificia Universidad Javeriana",
    industry: "Education",
    industrySlug: "education",
    country: "Colombia",
    tagline: "Building a resilient and scalable network to improve user experience",
    challenge:
      "Managing thousands of BYOD devices without compromising performance or security. Supporting streaming, e-learning, and cloud-based tools with high-density connectivity. Real-time monitoring needs and cybersecurity for sensitive academic data.",
    solution:
      "LAN Core, LAN Access, and WLAN solutions with OmniVista Network Advisor for AI-driven autonomous network management with 24/7 monitoring, threat identification, and automated remediation. Integration with Rainbow CPaaS and Microsoft Teams.",
    results: [
      "Accelerated detection and mitigation of security threats",
      "Simplified troubleshooting with real-time alerts",
      "Competitive cost-to-performance ratio",
      "Eliminated costly network interruptions",
    ],
    quote: {
      text: "The solution has transformed how Javeriana University monitors its infrastructure... it integrates with Rainbow CPaaS and Microsoft Teams so alerts reach IT teams via smartphone.",
      author: "IT Network Manager",
      role: "Pontificia Universidad Javeriana",
    },
    products: ["OmniSwitch", "OmniAccess Stellar APs", "OmniVista Network Advisor"],
  },
  {
    slug: "alamo-colleges",
    name: "Alamo Colleges",
    industry: "Education",
    industrySlug: "education",
    country: "United States",
    tagline: "Investing in technology for community benefit across five campuses",
    challenge:
      "Implementing robust safety and security across multiple campuses. Bridging technology gaps among diverse users. Enabling mobile work for 65,000+ students and 7,000 staff.",
    solution:
      "OmniSwitch with OmniAccess Stellar wireless APs across all campuses including parking lots (Park and Learn initiative), OmniPCX Enterprise phone system, Visual Notification Assistant for emergency response, and Rainbow for messaging and crisis alerts.",
    results: [
      "Redundant, reliable network with complete Wi-Fi coverage",
      "Advanced emergency response with location-enabled 911",
      "Reduced recurring service costs",
      "Growing eSports adoption supported",
    ],
    quote: {
      text: "The Alcatel-Lucent Enterprise products are reliable and just work. What I like best about the partnership is they're always there for us.",
      author: "Christopher Delgado",
      role: "Sr Manager of Network Operations, Alamo Colleges",
    },
    products: ["OmniSwitch", "OmniAccess Stellar AP", "OmniPCX Enterprise", "VNA", "Rainbow", "OmniVista"],
  },
  {
    slug: "kennewick-school-district",
    name: "Kennewick School District",
    industry: "Education",
    industrySlug: "education",
    country: "United States",
    tagline: "Enhancing student success and safety through robust network infrastructure",
    challenge:
      "Required robust network to support thousands of devices, 1:1 device initiatives, CTE labs, digital learning platforms, integrated campus safety, strong cybersecurity, and automated emergency notifications across 30 schools.",
    solution:
      "OmniSwitch 6860N and 6900 switches with 100G links connecting data centers and schools, Visual Notification Assistant (VNA) for emergency alerts, ALE-300 DeskPhones, and OmniVista 2500 Network Management.",
    results: [
      "High-performance backbone with fast, reliable connectivity",
      "Ultra-fast data center links with 100G",
      "Coordinated emergency alerts integrated with IP phones",
      "E-Rate program leveraged for timely upgrades",
    ],
    quote: {
      text: "Wherever technology goes, we're going to need to have a robust network to support it and Alcatel-Lucent Enterprise has been the backbone for that for many years.",
      author: "Eric Veach",
      role: "Executive Director of IT, Kennewick School District",
    },
    products: ["OmniSwitch 6860N", "OmniSwitch 6900", "VNA", "ALE-300 DeskPhones", "OmniVista 2500"],
  },
  {
    slug: "colegio-felix-jesus-rougier",
    name: "Colegio Felix de Jesus Rougier",
    industry: "Education",
    industrySlug: "education",
    country: "Mexico",
    tagline: "Connected learning environment across four locations",
    challenge:
      "Fragmented network administration across four locations. Insufficient internet coverage and unstable connectivity. Need for security, access control, and content filtering.",
    solution:
      "OmniSwitch 6360 and 6860E switches, OmniAccess Stellar AP1311/AP1361/AP1362 wireless APs, and OmniVista Cirrus network management with centralized administration and segmented networks.",
    results: [
      "Expanded internet range with improved signal distribution",
      "Enhanced and stabilized connectivity across all locations",
      "Segmented networks for improved security",
      "Superior cost-benefit ratio vs competitors",
    ],
    quote: {
      text: "As educators, our goal is to maintain warmth and connection in our teaching while leveraging technology to stay connected with students.",
      author: "M. Franci Alejandra Sandoval",
      role: "General Director, Colegio Felix de Jesus Rougier",
    },
    products: ["OmniSwitch 6360", "OmniSwitch 6860E", "OmniAccess Stellar AP1311/AP1361", "OmniVista Cirrus"],
  },
  {
    slug: "california-state-university",
    name: "California State University",
    industry: "Education",
    industrySlug: "education",
    country: "United States",
    tagline: "Strategic network transformation delivering $100M+ savings",
    challenge:
      "Standardize on single vendor across 20+ campuses for 500,000 users. Enhance security and support Graduation Initiative 2025.",
    solution:
      "Standardized ALE networking with centralized management and cloud acceleration across all CSU campuses using OmniSwitch 6900/6860 and OmniVista 2500.",
    results: [
      "Over $100M saved across the system",
      "250% more wireless APs deployed",
      "Cloud migration for disaster recovery",
    ],
    quote: {
      text: "The long-term investment has returned more benefit than the initial $100M in savings.",
      author: "Michel Davidoff",
      role: "CSU Chancellor's Office",
    },
    products: ["OmniSwitch 6900", "OmniSwitch 6860", "OmniVista 2500"],
  },
  {
    slug: "university-of-technology-sydney",
    name: "University of Technology Sydney",
    industry: "Education",
    industrySlug: "education",
    country: "Australia",
    tagline: "Simplified Wi-Fi access and resilient network across campus",
    challenge:
      "Managing rapid campus expansion with fragmented network technologies across faculties and high costs for 35,000+ students.",
    solution:
      "SPB infrastructure with OmniSwitch and OmniAccess wireless across 10+ buildings, providing simplified guest access and resilient networking.",
    results: [
      "Guest access setup reduced from hours to minutes",
      "20% price advantage over competitors",
      "Cross-building outages eliminated",
    ],
    quote: {
      text: "Guest networking can be set up in a couple of minutes with no testing required.",
      author: "Graham Redwood",
      role: "Network Manager, UTS",
    },
    products: ["OmniSwitch 6900", "OmniSwitch 6860", "OmniAccess APs", "OmniVista 2500"],
  },
  {
    slug: "singapore-university-of-technology-and-design",
    name: "Singapore University of Technology and Design",
    industry: "Education",
    industrySlug: "education",
    country: "Singapore",
    tagline: "Intelligent campus infrastructure enabling personalized learning",
    challenge:
      "Secure, reliable communications independent of location or device with seamless digital content delivery.",
    solution:
      "Virtual chassis architecture with ClientMatch and AppRF technologies using OmniAccess Mobility Conductor and OmniAccess WLAN Controllers.",
    results: [
      "Live upgrades without downtime",
      "Hitless failover for continuous connectivity",
      "WPA3 encryption for enhanced security",
      "Reduced licensing costs",
    ],
    quote: {
      text: "High performance, reliable Wi-Fi and integrated security... helps us deliver this.",
      author: "Ang Lek Han",
      role: "Director of IT, SUTD",
    },
    products: ["OmniAccess Mobility Conductor", "OmniAccess WLAN Controllers", "OmniAccess AP535/AP505H", "OmniSwitch 6900"],
  },
  {
    slug: "elkhorn-public-schools",
    name: "Elkhorn Public Schools",
    industry: "Education",
    industrySlug: "education",
    country: "United States",
    tagline: "Unifying a school district with advanced telephony features",
    challenge:
      "6%+ annual enrollment growth with 17 standalone phone systems, no cross-building calling, and no classroom phones for security.",
    solution:
      "Centralized VoIP telephony system with OmniPCX Enterprise replacing fragmented infrastructure, connecting all buildings.",
    results: [
      "All buildings connected on single system",
      "Simplified maintenance and management",
      "Phones in every classroom for improved security",
    ],
    quote: {
      text: "The Alcatel-Lucent Enterprise system provided the most cost-effective solution.",
      author: "Ryan Lindquist",
      role: "Director of Business Support, Elkhorn Public Schools",
    },
    products: ["OmniPCX Enterprise", "OmniVista 2500", "IP Touch 4018/4028/4038"],
  },
  {
    slug: "state-university-of-mato-grosso",
    name: "State University of Mato Grosso (Unemat)",
    industry: "Education",
    industrySlug: "education",
    country: "Brazil",
    tagline: "Modernized campus network optimizes academic environment",
    challenge:
      "Connectivity failures and outdated equipment across 13 campuses and 34 pedagogical centers serving 19,000 students.",
    solution:
      "224 OmniSwitch 6360 switches deployed as part of R$12M modernization program.",
    results: [
      "Reliable network across all campuses",
      "Best cost/benefit ratio among competitors",
      "Improved institutional brand perception",
    ],
    quote: {
      text: "Providing access to information is essential.",
      author: "Dhyego Brandao",
      role: "IT Director, Unemat",
    },
    products: ["OmniSwitch 6360"],
  },
  {
    slug: "ceeteps",
    name: "CEETEPS (Centro Paula Souza)",
    industry: "Education",
    industrySlug: "education",
    country: "Brazil",
    tagline: "Smart, secure and high-performance network for 290,000 students",
    challenge:
      "Modernize network across 223 technical schools and 73 colleges serving 290,000 students.",
    solution:
      "Upgraded architecture with OmniPCX Enterprise, OmniSwitch 6900/6960E/6860E, OmniAccess Stellar, and OmniVista centralized management with SPB protocol.",
    results: [
      "Improved performance across all institutions",
      "Unified authentication and centralized management",
      "SPB protocol enabling simplified routing",
    ],
    quote: {
      text: "Alcatel-Lucent Enterprise's solutions have proven to be great allies in our daily lives.",
      author: "Ruben Pimenta",
      role: "IT Director, CEETEPS",
    },
    products: ["OmniPCX Enterprise", "OmniSwitch 6900/6960E/6860E", "OmniAccess Stellar", "OmniVista"],
  },
  {
    slug: "university-of-johannesburg",
    name: "University of Johannesburg",
    industry: "Education",
    industrySlug: "education",
    country: "South Africa",
    tagline: "Secure, mobile, interactive e-learning across multiple campuses",
    challenge:
      "24/7/365 uptime across 4 campuses for 49,000 students, secure WiFi including outdoor areas and student quarters.",
    solution:
      "Business telephony, mobile campus networking, and data center infrastructure with OmniSwitch, OmniAccess WLAN, and OpenTouch.",
    results: [
      "Cost-effective vs competitors",
      "Centralized management across all campuses",
      "Enhanced customer experience for students",
    ],
    quote: {
      text: "It's the value for money and the return on investment.",
      author: "Francois Mynhardt",
      role: "Network Manager, University of Johannesburg",
    },
    products: ["OmniSwitch 6450/6900", "OmniAccess WLAN APs", "OpenTouch Business"],
  },
  {
    slug: "criswell-college",
    name: "Criswell College",
    industry: "Education",
    industrySlug: "education",
    country: "United States",
    tagline: "Zero hardware failures with ALE Stellar WLAN",
    challenge:
      "Thick walls (concrete/terra cotta) causing connectivity issues. Consumer-grade APs failing every 6-8 months. Need to support 2,000+ convention users.",
    solution:
      "OmniAccess Stellar wireless network deployed campus-wide with partner Skyhelm.",
    results: [
      "Zero hardware failures since 2017",
      "Zero connectivity gaps across campus",
      "Zero outages during conventions",
    ],
    quote: {
      text: "The new Stellar Wi-Fi system works, it provides solid coverage and doesn't require constant attention.",
      author: "Rob Merryman",
      role: "Network Manager, Criswell College",
    },
    products: ["OmniAccess Stellar 1221", "OmniVista 2500"],
  },
  {
    slug: "state-college-area-school-district",
    name: "State College Area School District",
    industry: "Education",
    industrySlug: "education",
    country: "United States",
    tagline: "Autonomous network enables educational excellence with BYOD and IPTV",
    challenge:
      "Outdated infrastructure unable to handle BYOD. 1:1 device ratio needed with inter-campus IPTV across 12 campuses.",
    solution:
      "1G LAN/10G aggregation with widespread wireless and IP video services across all campuses using OmniSwitch and OmniAccess.",
    results: [
      "Ubiquitous wireless access across all campuses",
      "Full video-on-demand capabilities",
      "Remote maintenance filing and management",
    ],
    quote: {
      text: "Alcatel-Lucent Enterprise has been central for us in achieving educational excellence.",
      author: "Nick Zepp",
      role: "Senior IT Manager, State College Area School District",
    },
    products: ["OmniSwitch 6900/6450", "OmniVista 2500", "OmniAccess WLAN Controllers/APs"],
  },

  // ─── Hospitality ─────────────────────────────────────────────────────────────

  {
    slug: "south-palms-resort-and-spa-panglao",
    name: "South Palms Resort & Spa Panglao",
    industry: "Hospitality",
    industrySlug: "hospitality",
    country: "Philippines",
    tagline: "Luxury resort delivers seamless guest experiences on expansive grounds",
    challenge:
      "6-hectare property required network architecture supporting high data demands across guest services and back-of-house operations. Needed scalable, reliable, cost-effective solution minimizing Total Cost of Ownership.",
    solution:
      "Hybrid Passive Optical LAN (HPOL) technology with OmniAccess Stellar Wi-Fi, OmniSwitch 6360, and fiber optic backbone. Partners: Pertlink and NERA.",
    results: [
      "Reduced TCO versus traditional LAN",
      "Theoretical throughput up to 9.6 Gbps",
      "75% reduced latency",
      "WPA3 encryption for guest security",
    ],
    quote: {
      text: "Combined with ALE's Wi-Fi infrastructure, we've created an outstanding connected guest experience.",
      author: "Terence Ronson",
      role: "Founder and Managing Director, Pertlink",
    },
    products: ["OmniSwitch 6360", "OmniAccess Stellar AP1301H-RW/AP1311-RW/AP1360"],
  },
  {
    slug: "cordish-live",
    name: "Cordish Gaming LIVE! Casino and Hotel",
    industry: "Hospitality",
    industrySlug: "hospitality",
    country: "United States",
    tagline: "Seamless technology integration enhances guest and staff experience",
    challenge:
      "Supporting secure gaming systems, enterprise applications, and guest services under stringent regulatory requirements. Required comprehensive management with robust cybersecurity.",
    solution:
      "OmniSwitch 6360/6860/6900 Ethernet switches, OmniVista 2500 with UPAM, OmniAccess Stellar AP1301 and AP1321 wireless APs, and Autonomous Network with segmented environment.",
    results: [
      "Centralized network monitoring and device management",
      "Dynamic device identification eliminating physical lockdowns",
      "Segmented network containing cybersecurity threats",
      "Greater value/affordability vs previous vendor",
    ],
    quote: {
      text: "Alcatel-Lucent Enterprise's ability to come in and understand our use cases before they give a solution is what differentiates them.",
      author: "Frank Bonini",
      role: "SVP/CIO, Cordish Gaming",
    },
    products: ["OmniSwitch 6360/6860/6900", "OmniVista 2500 with UPAM", "OmniAccess Stellar AP1301/AP1321"],
  },
  {
    slug: "okada-manila-resort",
    name: "Okada Manila Resort",
    industry: "Hospitality",
    industrySlug: "hospitality",
    country: "Philippines",
    tagline: "Converged network connects 20,000 guests across integrated resort",
    challenge:
      "Handle 20,000 guest devices at peak while maintaining security for gaming, hotel, and retail across the country's largest integrated resort.",
    solution:
      "Autonomous Network with converged infrastructure using OmniSwitch 6450 and OmniSwitch 6900 with redundancy at all levels.",
    results: [
      "Complete network visibility across entire resort",
      "Doubled daily footfall plans",
      "Seamless device onboarding for guests",
    ],
    quote: {
      text: "We hope to work with the ALE team going forward to expand Okada Manila.",
      author: "Dries Scott",
      role: "CTO, Okada Manila Resort",
    },
    products: ["OmniSwitch 6450", "OmniSwitch 6900"],
  },
  {
    slug: "mogador-hotels",
    name: "Mogador Hotels",
    industry: "Hospitality",
    industrySlug: "hospitality",
    country: "Morocco",
    tagline: "Unified communications enhancing guest experience across 5-star hotel portfolio",
    challenge:
      "Equip 11 hotels across 5 Moroccan cities with telecommunications and WiFi.",
    solution:
      "Unified communications platform with OmniAccess wireless, OmniSwitch networking, and OmniPCX Enterprise across all properties.",
    results: [
      "Scalable capacity across 11 properties",
      "Reduced operating costs",
      "Enhanced employee mobility and guest service",
    ],
    quote: {
      text: "ALE has a thorough understanding of our business sector.",
      author: "Khaoula Abdellaoui",
      role: "Director of Finance, Mogador Hotels",
    },
    products: ["OmniAccess AP93H", "OmniSwitch 6250/6850E", "OmniPCX Enterprise"],
  },
  {
    slug: "sanabel-al-khair-hotel",
    name: "Sanabel Al Khair Hotel",
    industry: "Hospitality",
    industrySlug: "hospitality",
    country: "Saudi Arabia",
    tagline: "Converged networking for 25-floor luxury hotel with 800 rooms",
    challenge:
      "Future-proof, resilient, scalable, redundant infrastructure for new 5-star hotel near Mecca.",
    solution:
      "Converged voice/data/WLAN infrastructure with OmniPCX Enterprise, OmniSwitch 6900/6450, OmniAccess Stellar, OmniVista 8770, and centralized management.",
    results: [
      "Real-time network visibility",
      "Simplified management with single platform",
      "Lower TCO with lifetime hardware warranty",
    ],
    quote: {
      text: "We are glad to offer our guests top-of-the-line connectivity and services.",
      author: "Salim Al Sahafy",
      role: "BU Manager, Sanabel Al Khair Hotel",
    },
    products: ["OmniPCX Enterprise", "OmniSwitch 6900/6450", "OmniAccess Stellar AP1101H", "OmniVista 8770"],
  },

  // ─── Government ──────────────────────────────────────────────────────────────

  {
    slug: "gemeinde-pratteln",
    name: "Gemeinde Pratteln",
    industry: "Government",
    industrySlug: "government",
    country: "Switzerland",
    tagline: "Local municipality enables flexible communication and real-time crisis management",
    challenge:
      "Needed modern communications infrastructure for expanding workforce and new administrative building. Required flexible communications for temporary offices, mobile work, and remote employees for ~17,000 residents.",
    solution:
      "OmniPCX Enterprise Communication Server Purple, Rainbow unified communication platform, MobiCall alerting and crisis management system, DECT mobile communications, and hybrid on-premises and cloud services. Partner: UMB.",
    results: [
      "Seamless hybrid and remote work",
      "Real-time alerting and evacuation coordination",
      "Investment protection with operational cost security",
      "High availability through hybrid architecture",
    ],
    quote: {
      text: "UMB delivered an impressive all-in-one package with solutions from Alcatel-Lucent Enterprise and NewVoice International. The implementation dream team far exceeded our expectations.",
      author: "Patrick Zeller",
      role: "ICT System Engineer, Municipality of Pratteln",
    },
    products: ["OmniPCX Enterprise Purple", "Rainbow", "MobiCall", "DECT Infrastructure"],
  },
  {
    slug: "cd-seine-saint-denis",
    name: "Departmental Council of Seine-Saint-Denis",
    industry: "Government",
    industrySlug: "government",
    country: "France",
    tagline: "Modernizes telephony and reduces operating costs by 80%",
    challenge:
      "Aging, fragmented telephony: central system managing ~3,000 employees, remaining 4,000 across local PBXs at 400+ sites including 130 middle schools. Hardware obsolescence and high maintenance costs.",
    solution:
      "Decade-long master plan modernization with OmniPCX Enterprise platform. Gradual migration across 400+ sites from traditional telephony to unified ToIP infrastructure. Partner: Hexatel.",
    results: [
      "Operating costs reduced by 80%",
      "Middle school allocation reduced from 800,000 to 150,000 EUR annually",
      "Unified ToIP infrastructure",
      "Consolidated cabling and streamlined maintenance",
    ],
    quote: {
      text: "At the time, the annual allocation for middle schools was around 800,000 euros. We brought it down to 150,000 euros. That represents a very significant economic gain.",
      author: "Thierry Caucheteur",
      role: "Head of Infrastructure Engineering Department",
    },
    products: ["OmniPCX Enterprise", "ALE DeskPhones"],
  },
  {
    slug: "strasbourg-eurometropolis",
    name: "Strasbourg Eurometropolis",
    industry: "Government",
    industrySlug: "government",
    country: "France",
    tagline: "Digital efficiency for 33 municipalities and 6,700 employees",
    challenge:
      "Modernize communications for 6,700 agents across 33 municipalities. Enable remote work and rapid deployment for emergency services.",
    solution:
      "Rainbow integrated with existing OmniPCX Enterprise systems. Deployed on Citrix servers with Microsoft Teams presence synchronization and BYOD support. Partner: ECS Resadia.",
    results: [
      "50% cost reduction compared to competitors",
      "Sovereign, secure communications",
      "Full mobility and teleworking capabilities",
      "No infrastructure changes required",
    ],
    quote: {
      text: "We chose Rainbow first and foremost for budgetary reasons... also important to choose a sovereign, local and modern solution.",
      author: "Didier Guyon",
      role: "Head of Information Systems and Infrastructure Department",
    },
    products: ["OmniPCX Enterprise", "Rainbow Business", "ALE DeskPhones", "DECT Handsets"],
  },
  {
    slug: "hidalgo-state-government",
    name: "Hidalgo State Government",
    industry: "Government",
    industrySlug: "government",
    country: "Mexico",
    tagline: "Centralized data and communications modernizing public administration",
    challenge:
      "Outdated equipment causing communication inefficiencies across 300 offices serving 3+ million citizens. Fragmented network with minimal departmental integration, high maintenance costs, and security vulnerabilities.",
    solution:
      "OmniSwitch 6465/6560/6860/6900/9900, OmniAccess Stellar, OmniVista 2500, Rainbow, OmniPCX Enterprise, and IP phones with centralized management and multi-layered security.",
    results: [
      "Minimized service interruptions",
      "20% telephony cost savings through voice-data integration",
      "15% staffing cost optimization via centralized administration",
      "Enhanced inter-departmental communication",
    ],
    quote: {
      text: "The ALE solution has transformed the daily work experience for our employees with greater mobility, security, and reliability.",
      author: "Edwin Mellado Garcia",
      role: "Director General of Government Innovation, Hidalgo State Executive Office",
    },
    products: ["OmniSwitch 6465/6560/6860/6900/9900", "OmniAccess Stellar", "OmniVista 2500", "Rainbow", "OmniPCX Enterprise"],
  },
  {
    slug: "bourgogne-franche-comte",
    name: "Bourgogne Franche-Comté Regional Council",
    industry: "Government",
    industrySlug: "government",
    country: "France",
    tagline: "Rainbow ensures ease of use and data sovereignty in hybrid work",
    challenge:
      "Unified solution for remote telephony, video conferencing, and virtual collaboration with data sovereignty requirements for 1,200 employees.",
    solution:
      "Rainbow platform in hybrid mode connecting cloud collaboration with existing ALE telephony infrastructure.",
    results: [
      "Enabled remote work for 1,200 employees",
      "Full data sovereignty with French hosting",
      "Low learning curve for rapid adoption",
    ],
    quote: {
      text: "We are confident the future will move us toward softphones for all employees.",
      author: "Laurent Coste",
      role: "Head of User Relations",
    },
    products: ["Rainbow"],
  },
  {
    slug: "prefeitura-de-fortaleza",
    name: "Prefeitura de Fortaleza",
    industry: "Government",
    industrySlug: "government",
    country: "Brazil",
    tagline: "Modern network infrastructure enabling efficient municipal services for 2.6 million citizens",
    challenge:
      "Upgrade data network after investing in 300+ km of fiber optic. Support IoT and CCTV for public safety.",
    solution:
      "OmniSwitch deployment with OmniVista 2500 and SPB technology via partner Lettel.",
    results: [
      "10x improvement in network speed",
      "Solution delivered 60% under estimated budget",
      "Enhanced public safety with CCTV integration",
    ],
    quote: {
      text: "With ALE's help, we're making Fortaleza an even better place to live and work.",
      author: "Alcides Guerra",
      role: "Corporate Management Coordinator",
    },
    products: ["OmniSwitch 6350/6450/6860/6900", "OmniVista 2500"],
  },
  {
    slug: "us-department-of-defense",
    name: "US Department of Defense",
    industry: "Government",
    industrySlug: "government",
    country: "United States",
    tagline: "Modernized solution provides mission-critical communications for US military",
    challenge:
      "Increasing network capacity demands. Switches not sufficiently hardened for extreme military conditions.",
    solution:
      "OmniSwitch 6865 ruggedized Ethernet switch for harsh environments with passive cooling and TAA/defense certification.",
    results: [
      "4x capacity of previous equipment",
      "Completed within 6 months",
      "TAA/defense certification achieved",
      "Fan-less design reduced acoustic footprint",
    ],
    quote: {
      text: "The OmniSwitch 6865 is designed to operate without a fan, which reduced the acoustic footprint.",
      author: "Steven Kleinpeter",
      role: "Director of Federal Sales, ALE",
    },
    products: ["OmniSwitch 6865"],
  },

  // ─── Transportation ──────────────────────────────────────────────────────────

  {
    slug: "transit-wireless",
    name: "Transit Wireless (New York Subway)",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "United States",
    tagline: "330,000+ daily free Wi-Fi users across 276 subway stations",
    challenge:
      "Network switches needed to manage intense traffic density in harsh underground subway environments. Temperatures inside protective enclosures reached 70 degrees Celsius. The solution had to integrate with existing multi-vendor infrastructure.",
    solution:
      "Implemented OmniSwitch 6855 with fan-less, passive cooling design and 10Gig uplinks across 276 stations in 4 boroughs. All station traffic flows through these switches.",
    results: [
      "Over 330,000 daily users access free Wi-Fi",
      "Passive cooling ensures reliability in extreme temperatures",
      "Open standards enable multi-vendor compatibility",
      "Revenue opportunities through Wi-Fi partners and advertisers",
    ],
    quote: {
      text: "Thanks to the Alcatel-Lucent Enterprise solution, more than 330,000 users access free Wi-Fi in the New York subway every day.",
      author: "Thomas McCarthy",
      role: "Director of Network Operations, Transit Wireless",
    },
    products: ["OmniSwitch 6855"],
  },
  {
    slug: "saint-gotthard-tunnel",
    name: "Saint Gotthard Tunnel (Transtec Gotthard)",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "Switzerland",
    tagline: "World's longest tunnel with autonomous network powering 70,000 data points",
    challenge:
      "The 152-kilometer tunnel required a web of IoT devices to manage passenger and vehicle safety 24/7. Extreme environment with temperatures exceeding 40 degrees Celsius and humidity above 70%. Network disruption could impact safety across 168 cross passages.",
    solution:
      "Approximately 1,000 OmniSwitch 6855 industrial-grade hardened switches deployed with passive cooling mechanisms, creating a resilient network connecting all 70,000 data points.",
    results: [
      "8 years of uninterrupted network operation",
      "Powers door monitoring, sensors, cameras, ventilation, drainage, and control systems",
      "Safely transports 9,000 passengers daily",
      "Reduced maintenance and equipment costs",
    ],
    quote: {
      text: "This tunnel is designed to last for 100 years. I am sure the Alcatel-Lucent Enterprise colleagues will manage it successfully.",
      author: "Peter Huber",
      role: "Project Leader, Transtec Gotthard",
    },
    products: ["OmniSwitch 6855"],
  },
  {
    slug: "schweizerische-bundesbahnen",
    name: "SBB (Swiss Federal Railways)",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "Switzerland",
    tagline: "Smart infrastructure supports dynamic lockers at railway stations",
    challenge:
      "Modernize network for dynamic lockers with remote control, monitoring, and cashless payment systems across railway stations.",
    solution:
      "OmniSwitch 6465 Compact Hardened Switches connected to central SBB data center for real-time monitoring and management.",
    results: [
      "Real-time monitoring of all locker systems",
      "QR code access and cashless payment",
      "Immediate failure detection and response",
    ],
    quote: {
      text: "With the smart ALE infrastructure, we can see what is going on in real time at any moment.",
      author: "Catherine Schweizer",
      role: "Product Manager, SBB",
    },
    products: ["OmniSwitch 6465"],
  },
  {
    slug: "liverpool-city-region-combined-authority",
    name: "Liverpool City Region Combined Authority",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "United Kingdom",
    tagline: "IoT-ready network infrastructure improving traveller experience for 1.6 million people",
    challenge:
      "Aging, obsolete network unable to deploy mission-critical IoT including CCTV, traffic management, fire/smoke detection, and SCADA in road tunnels. Required continuous service availability for operational control, emergency systems, ticketing, and traveler information.",
    solution:
      "18+ month partnership to design comprehensive network using OmniPCX Enterprise, OmniSwitch 6900/6450/6865/6860E, OmniVista 2500 NMaaS, and SPB architecture supporting ship-to-shore communications and smart ticketing.",
    results: [
      "Simplified operations with enterprise and ruggedized equipment",
      "High ROI and reduced TCO within budget",
      "Improved traveler experience with smart ticketing",
    ],
    quote: {
      text: "A flexible, resilient and reliable network infrastructure is critical to ensuring that the Liverpool City Region can run its services efficiently, on a 24-hour basis, 365 days a year.",
      author: "Ian Hawkins",
      role: "Head of IT, Liverpool City Region Combined Authority",
    },
    products: ["OmniPCX Enterprise", "OmniSwitch 6900/6450/6865/6860E", "OmniVista 2500"],
  },
  {
    slug: "nevada-department-of-transportation",
    name: "Nevada Department of Transportation",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "United States",
    tagline: "Building intelligent highway infrastructure for safer Nevada roads",
    challenge:
      "Harden data network for harsh Nevada climate. Support IoT across 5,400 miles of highways and 1,000+ bridges.",
    solution:
      "Hardened OmniSwitch switches with SPB technology for scalable IoT infrastructure enabling connected vehicle technology and remote management.",
    results: [
      "Foundation for next-gen connected vehicle technology",
      "Remote management freeing field personnel",
      "Scalable IoT infrastructure across state highways",
    ],
    quote: {
      text: "ALE went above and beyond throughout the entire process.",
      author: "Gary Molnar",
      role: "ITS Network Manager, NDOT",
    },
    products: ["OmniSwitch 6865", "OmniSwitch 6860E", "OmniSwitch 6900"],
  },
  {
    slug: "china-eastern-airlines",
    name: "China Eastern Airlines",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "China",
    tagline: "Enhanced global call center reduces communication costs by 50%",
    challenge:
      "Upgrade legacy telephony and reduce global communication costs amid rapid passenger growth.",
    solution:
      "Voice and call center platform with OmniPCX Enterprise, OmniTouch 8600 unified communicator, IP Touch phones, and OmniVista 4760 management.",
    results: [
      "50% reduction in international communication costs",
      "Improved customer service satisfaction",
      "Streamlined global call center operations",
    ],
    quote: {
      text: "This system saves on communication costs.",
      author: "Yan Zhenhong",
      role: "GM IT Solutions, China Eastern Airlines",
    },
    products: ["OmniPCX Enterprise", "OmniTouch 8600", "IP Touch 4028/4038/4068", "OmniVista 4760"],
  },
  {
    slug: "aeroports-de-lyon",
    name: "Aéroports de Lyon",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "France",
    tagline: "Optimal customer service through centralized, secure infrastructure",
    challenge:
      "Continuous service without interruption during installation. Manage growing communication volumes for 9.6M passengers annually.",
    solution:
      "Centralized, redundant OmniPCX Enterprise with 24/7 maintenance by SYBORD, ensuring uninterrupted communications.",
    results: [
      "Simplified administration and reduced operating costs",
      "Uninterrupted communications during migration",
      "Handles 9.6M annual passengers",
    ],
    quote: {
      text: "Fluid, always-available communications are prerequisites in an airport.",
      author: "Nathalie Rebuffet",
      role: "Telecom Project Manager, Aéroports de Lyon",
    },
    products: ["OmniPCX Enterprise", "8001 DeskPhone"],
  },
  {
    slug: "sao-paulo-international-airport",
    name: "São Paulo International Airport (GRU)",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "Brazil",
    tagline: "Unified IP voice infrastructure improves airport operations",
    challenge:
      "Increase voice capacity, upgrade to IP-based services, and enable anywhere-access for airport operations.",
    solution:
      "Comprehensive IP voice infrastructure with unified communications using OmniPCX Enterprise and OmniAccess WLAN.",
    results: [
      "All-IP network across entire airport",
      "Projected 20% annual maintenance cost reduction",
      "Scalable solution for future growth",
    ],
    quote: {
      text: "ALE understands multiple stakeholder requirements and addresses them cost-effectively.",
      author: "Luiz Eduardo Ritzmann",
      role: "CIO, GRU Airport",
    },
    products: ["OmniPCX Enterprise", "OmniAccess WLAN APs", "8 Series IP Touch Phones"],
  },
  {
    slug: "future-mobility-park",
    name: "Future Mobility Park",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "Netherlands",
    tagline: "Zero-tolerance network for autonomous vehicle testing",
    challenge:
      "Zero tolerance for downtime to safely test autonomous vehicles. Simulate real-world scenarios with secure data transmission between control centers and autonomous systems.",
    solution:
      "Multiple OmniSwitch models (6360/6465/6465T/6865), OmniAccess Stellar AP1311, SD-WAN via Versa, Network-as-a-Service subscription, Zero Trust Network security, and IoT containment separating Lidar sensors, traffic lights, and control room.",
    results: [
      "Automatic reconfiguration in under 50 milliseconds",
      "Industrial-grade security for mission-critical applications",
      "Cloud management eliminates need for on-site IT",
    ],
    quote: {
      text: "Alcatel-Lucent Enterprise's solutions ensure that we have a secure, redundant and reliable network infrastructure so that no data is lost in live communication.",
      author: "Lucien Linders",
      role: "CEO, Future Mobility Park",
    },
    products: ["OmniSwitch 6360/6465/6865", "OmniAccess Stellar AP1311", "OmniVista Cirrus"],
  },
  {
    slug: "kanton-aargau",
    name: "Canton of Aargau",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "Switzerland",
    tagline: "Enhanced road network security across 1,200 km of cantonal roads",
    challenge:
      "Enhance network security, availability, and management across distributed road infrastructure. Replace aging Spanning Tree Protocol.",
    solution:
      "Replaced STP with Shortest Path Bridging (SPB). Consolidated to ALE switches with unified firmware and OmniVista 2500 network management.",
    results: [
      "Parallel path activation maximizes bandwidth",
      "Centralized management with automation",
      "High availability through redundancy",
      "Standardized deployment simplifies sourcing",
    ],
    products: ["OmniSwitch 6560/6860/6900/6465/6865", "OmniAccess Wireless APs", "OmniVista 2500"],
  },
  {
    slug: "zibatra-logistik",
    name: "Zibatra Logistik AG",
    industry: "Transportation",
    industrySlug: "transportation",
    country: "Switzerland",
    tagline: "Reliable WLAN coverage across 27,000 sqm warehouse",
    challenge:
      "End-of-life WLAN infrastructure. Needed reliable, cost-effective wireless coverage across 27,000 sqm warehouse spanning five floors. Implementation during active shift operations.",
    solution:
      "OmniAccess Stellar Access Points with external sector antennas directing signals through aisles. LAN switches with centralized management. Migration completed within half a working day. Partner: AEK Build Tec AG.",
    results: [
      "Optimal signal coverage via sector antennas",
      "Unified LAN/WLAN management",
      "Reduced access points needed, lowering costs",
      "Zero warehouse downtime during migration",
    ],
    quote: {
      text: "Our new WLAN is reliably available throughout the warehouse with high performance. This prevents idling and increases productivity.",
      author: "Stefan Gachter",
      role: "Managing Director, Zibatra Logistik AG",
    },
    products: ["OmniSwitch 6860/6350/6450", "OmniAccess Stellar AP1221/AP1222", "OmniVista 2500"],
  },

  // ─── Energy & Utilities ──────────────────────────────────────────────────────

  {
    slug: "gelsenwasser",
    name: "Gelsenwasser AG",
    industry: "Energy & Utilities",
    industrySlug: "energy",
    country: "Germany",
    tagline: "SPB helps utility company comply with critical infrastructure regulations",
    challenge:
      "Critical infrastructure provider (water, gas, electricity, wastewater) facing strict security and regulatory compliance. Required service isolation, redundant data traffic routes, and IoT scalability.",
    solution:
      "Shortest Path Bridging (SPB) with unified Layer 2 and 3 VPN technology. Secure service separation in isolated containers with rapid deployment through edge-only provisioning.",
    results: [
      "Secure service separation in isolated containers",
      "Flexible, rapid service deployment",
      "Full compliance with critical infrastructure standards",
      "Reduced IT training requirements",
    ],
    quote: {
      text: "Alcatel-Lucent Enterprise technologies enhance the security and flexibility of our network, reduce configuration complexity and help us fully comply with regulatory requirements.",
      author: "Klaus Dellhofen",
      role: "Group Leader of Network Technology & Cybersecurity, Gelsenwasser AG",
    },
    products: ["OmniSwitch 6860E", "OmniSwitch 6900"],
  },
  {
    slug: "dilo",
    name: "DILO Armaturen und Anlagen GmbH",
    industry: "Energy & Utilities",
    industrySlug: "energy",
    country: "Germany",
    tagline: "Modern communications with nearly 100% DECT/WLAN coverage",
    challenge:
      "Previous ICT provider discontinued business telephony. Legacy system required complete replacement with scalable, future-proof IP telephony infrastructure.",
    solution:
      "OmniPCX Enterprise Communication Server with company-wide IP telephony, optimized DECT/WLAN coverage, automated hotline, and CTI software integration. Partner: provoicecom.",
    results: [
      "Nearly 100% DECT and WLAN coverage achieved",
      "Automated hotline for customer contact",
      "Flexible maintenance supporting internal IT",
      "Employees reachable from office, home, or mobile",
    ],
    quote: {
      text: "Their advice was excellent and the whole project went quickly and smoothly. They did not sell us anything unnecessary.",
      author: "Peter Haag",
      role: "IT Director, DILO",
    },
    products: ["OmniPCX Enterprise", "OmniAccess Stellar APs", "OmniVista 8770", "ALE-400 Smart DeskPhones"],
  },
  {
    slug: "energy-one",
    name: "Energy One",
    industry: "Energy & Utilities",
    industrySlug: "energy",
    country: "Australia",
    tagline: "Simplified cross-site management for Unified Communications rollout",
    challenge:
      "Network review ahead of UC rollout revealed connectivity issues. User authentication challenges, WiFi guest access limitations, and inconsistent experience across Sydney and Melbourne sites.",
    solution:
      "OmniSwitch 6350, OmniAccess Stellar AP1222, OmniVista 2500, PALM (ProActive Lifecycle Management), and Mobile Campus solution. Partner: Nexon.",
    results: [
      "Simplified cross-site management",
      "Cloud-based PALM ensures current firmware",
      "High-bandwidth network supported UC rollout",
      "Self-service guest portal eliminates IT involvement",
    ],
    quote: {
      text: "ALE made it an easy decision to adopt the new Stellar solution. They were enthusiastic throughout the process.",
      author: "Anastasia Columbus",
      role: "General Manager Operations, Energy One",
    },
    products: ["OmniSwitch 6350", "OmniAccess Stellar AP1222", "OmniVista 2500"],
  },
  {
    slug: "seeg",
    name: "SEEG (Société d'Énergie et d'Eau du Gabon)",
    industry: "Energy & Utilities",
    industrySlug: "energy",
    country: "Gabon",
    tagline: "National telephony modernization across 18 sites with centralized call center",
    challenge:
      "Replace obsolete telephony systems across 18 sites nationwide. Reduce inter-site communication costs. Establish a national call center for customer service.",
    solution:
      "OmniPCX Enterprise Communication Server and OmniPCX Office across all sites with centralized maintenance platform and IP telephony.",
    results: [
      "Homogenized equipment across all sites",
      "Drastically reduced inter-site communications costs",
      "Improved customer accessibility via centralized call center",
    ],
    quote: {
      text: "The telephony solution enables SEEG to support our teams across the country to offer better customer service and generate savings.",
      author: "Franck Lionel Manembe",
      role: "Head of Telephony Service, SEEG",
    },
    products: ["OmniPCX Enterprise", "OmniPCX Office", "8 Series IP Touch Phones"],
  },
  {
    slug: "smc-electric",
    name: "SMC Electric Supply",
    industry: "Energy & Utilities",
    industrySlug: "energy",
    country: "United States",
    tagline: "Unified VoIP system connects 14 locations on one server",
    challenge:
      "Each of 14 locations operated independent phone systems with different providers. Expensive inter-site calls. No wireless infrastructure for warehouse floors.",
    solution:
      "Single VoIP phone system connecting all 14 locations through one server with WiFi APs deployed across all sites and WLAN handsets for warehouse operations.",
    results: [
      "Consolidated all locations on one unified system",
      "Eliminated long-distance calling costs",
      "Significantly reduced customer drop-off rates",
      "Streamlined warehouse operations with mobile devices",
    ],
    quote: {
      text: "We now have all our locations running on one single system which has simplified things immensely for us.",
      author: "Charles Givens",
      role: "Applications Manager, SMC Electric",
    },
    products: ["OmniSwitch 6450/6900", "OmniAccess Wireless APs", "OmniTouch 8118/8128 WLAN Handsets"],
  },

  // ─── Manufacturing ───────────────────────────────────────────────────────────

  {
    slug: "oechsler-ag",
    name: "Oechsler AG",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    country: "Germany",
    tagline: "Legacy modernization enabling centralized management across global operations",
    challenge:
      "Heterogeneous platforms with no centralized management. Insufficient bandwidth and lack of redundancy across global manufacturing sites.",
    solution:
      "Modern network with centralized management and two fully redundant data centers using OmniSwitch 6850E/6900, OmniVista 2500, and OmniAccess WLAN.",
    results: [
      "Manages 1,000+ PCs and 1,500 users globally",
      "Failover within 3 seconds",
      "Backup times reduced by 50%",
    ],
    quote: {
      text: "We created a completely new, modern foundation for our entire data and voice communications.",
      author: "Thomas Ehnes",
      role: "Head of IT, Oechsler AG",
    },
    products: ["OmniSwitch 6850E/6900", "OmniVista 2500", "OmniAccess WLAN APs"],
  },
  {
    slug: "csf-inox",
    name: "CSF Inox SPA",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    country: "Italy",
    tagline: "Cloud-based platform achieves 50% time reduction in communications",
    challenge:
      "Replace aging PBX, optimize telephony, and enable unified cloud communications with ERP integration.",
    solution:
      "Rainbow Essential cloud communications with OmniPCX Enterprise and Rainbow API Hub for ERP integration, creating a 'CSF Assistant' virtual assistant.",
    results: [
      "Processing times halved",
      "Virtual assistant created via Rainbow API Hub",
      "Scalable to new sites and future growth",
    ],
    quote: {
      text: "Times have been halved and efficiency has increased.",
      author: "Massimo Mappa",
      role: "Network Administrator, CSF Inox",
    },
    products: ["Rainbow Essential", "OmniPCX Enterprise", "IP DeskPhones"],
  },

  // ─── Services / Technology ───────────────────────────────────────────────────

  {
    slug: "asmodee",
    name: "Asmodee GmbH",
    industry: "Technology",
    industrySlug: "smb",
    country: "Germany",
    tagline: "Game publisher makes the switch to 100% cloud-based communications",
    challenge:
      "After successfully using Rainbow Hybrid during the pandemic, the company sought to migrate to complete cloud solution with minimal end devices.",
    solution:
      "Rainbow Hub cloud-based unified communications with BlueVoice SIP trunk connecting to public telephone network. Partner: T.D.F. Kommunikation.",
    results: [
      "GDPR-compliant with German server hosting",
      "Flat-rate per workstation with monthly adjustments",
      "Reduced maintenance costs",
      "Unified telephony, messaging, and conferencing",
    ],
    quote: {
      text: "Migrating to the cloud has strengthened our digital competitiveness, creating a modern, secure and cost-efficient communications infrastructure.",
      author: "Martin Kaufmann",
      role: "Team Leader IT Infrastructure, Asmodee GmbH",
    },
    products: ["Rainbow Hub", "BlueVoice SIP trunk"],
  },
  {
    slug: "pt-cendikia-global-solusi",
    name: "PT Cendikia Global Solusi (CGS)",
    industry: "Technology",
    industrySlug: "smb",
    country: "Indonesia",
    tagline: "Transforming network performance with near-zero downtime",
    challenge:
      "Complex legacy network with multiple technologies. Aging infrastructure with scalability limitations and single points of failure across 5,000+ km of fiber in 30 provinces.",
    solution:
      "Shortest Path Bridging (SPB) on OmniSwitch 6900X48 for simplified management and greater cost-effectiveness.",
    results: [
      "Near-zero downtime with sub-second network convergence",
      "Seamless multi-vendor protocol interoperability",
      "Operational cost reduction of up to 15%",
      "Support for 100G bandwidth upgrades without additional hardware",
    ],
    quote: {
      text: "ALE's solution has been transformative for our efficiency and bottom line, helping us reduce costs by up to 15%.",
      author: "Aripin",
      role: "CEO, CGS",
    },
    products: ["OmniSwitch 6900X48"],
  },

  // ─── Smart City / Real Estate ────────────────────────────────────────────────

  {
    slug: "wembley-park",
    name: "Wembley Park (Quintain)",
    industry: "Smart Buildings",
    industrySlug: "smart-buildings",
    country: "United Kingdom",
    tagline: "Smart city technology for next-generation living in 85-acre development",
    challenge:
      "Gigabit-speed internet to 7,000+ homes across 85-acre mixed-use development plus outdoor connectivity.",
    solution:
      "Nokia Optical LAN integrated with ALE OmniSwitch and fiber optic network by Velocity1, providing passive topology reducing power, cooling, and maintenance.",
    results: [
      "Passive topology reducing power and cooling needs",
      "Distances up to 20km without active nodes",
      "Gigabit-speed internet to 7,000+ homes",
    ],
    quote: {
      text: "We are deploying infrastructure in the largest urban regeneration project in the UK.",
      author: "James Canty",
      role: "CTO, Velocity1",
    },
    products: ["OmniSwitch 6900", "OmniSwitch 6450", "OmniSwitch 6465"],
  },
];
