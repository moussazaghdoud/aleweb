export interface IndustrySubPageData {
  parentSlug: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  capabilities: { title: string; description: string }[];
  products: string[];
  customers?: { name: string; detail: string }[];
}

export const industrySubPagesData: IndustrySubPageData[] = [
  // ─── Healthcare ────────────────────────────────────────────────────────────────

  {
    parentSlug: "healthcare",
    slug: "digital-health",
    name: "Digital Health",
    tagline: "Improve patient care with digital health technology",
    description:
      "ALE digital healthcare solutions enable caregivers to focus on patient care rather than technology challenges. By integrating with existing hospital systems — nurse call, EHR/HIS, patient terminals, and room control — ALE delivers communication, collaboration, notification, and location services through mobile applications at the bedside and throughout the ward. The result is reduced walking time for nurses, faster equipment location, fewer false alarms, and more time dedicated to meaningful patient interactions.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/healthcare-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Nurse Digital Workplace",
        description:
          "Address critical pain points including excessive walking time (1-1.5 hours per shift), equipment search time (approximately 1 hour daily), alarm fatigue from 70-90% false or non-relevant alerts, and workplace security concerns with mobile-first clinical tools.",
      },
      {
        title: "Mobile Care Delivery",
        description:
          "Provide full mobility with always-on connectivity enabling real-time communication and collaboration, reducing time spent searching for personnel and medical equipment while improving patient interaction quality.",
      },
      {
        title: "Alarm Management & Notification",
        description:
          "Streamline notification systems to combat alarm fatigue, reducing unnecessary alerts and enabling clinical staff to distinguish critical from non-critical signals through intelligent filtering and priority routing.",
      },
      {
        title: "Connected Medical Devices",
        description:
          "Secure, high-performance wired and wireless infrastructure for Internet of Medical Things (IoMT) device management, ensuring reliable connectivity for patient monitors, infusion pumps, and mobile diagnostic equipment.",
      },
    ],
    products: [
      "Rainbow",
      "OmniAccess Stellar",
      "OmniPCX Enterprise",
      "DECT Handsets",
      "OmniVista",
    ],
    customers: [
      {
        name: "John Flynn Private Hospital",
        detail: "Digital workplace for clinical staff",
      },
      {
        name: "Fertilys Clinic",
        detail: "Unified patient communications",
      },
      {
        name: "Kingsway Hospitals",
        detail: "Mobile care delivery platform",
      },
      {
        name: "Cantabrian Health Service",
        detail: "Regional healthcare network modernization",
      },
    ],
  },
  {
    parentSlug: "healthcare",
    slug: "senior-living",
    name: "Senior Living",
    tagline: "Improving senior living with technology",
    description:
      "Caring for seniors requires moving beyond basic safety to maximize functional abilities while enabling autonomy and dignity. ALE reshapes senior care delivery through digital transformation, making services more relevant with dependable infrastructure, connectivity, and collaboration tools that benefit residents, clinicians, and caregivers. From assisted living facilities to nursing homes, ALE solutions connect staff in real-time, locate people and equipment instantly, and empower residents with the autonomy they desire.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/healthcare-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Dependable Infrastructure",
        description:
          "Future-proof infrastructure delivering the communications and networks staff require to efficiently meet residents' needs and facilitate their daily tasks, with high availability and resilience built in.",
      },
      {
        title: "Wireless Connectivity & Mobility",
        description:
          "High-quality Wi-Fi systems ensuring caregivers and residents stay connected both indoors and outdoors, with DECT mobile communications enabling real-time interactions and enhanced personal security.",
      },
      {
        title: "Team Collaboration & Location Services",
        description:
          "Efficient collaboration enabling caregivers to connect in real-time with teams on-site and remotely, combined with location services to help locate people and equipment, freeing staff time for resident care.",
      },
      {
        title: "IoT-Enabled Resident Autonomy",
        description:
          "Smart notifications that reinforce safety while reducing alarm fatigue through streamlined workflows, paired with IoT tools empowering residents with the desired level of autonomy and independence.",
      },
    ],
    products: [
      "Rainbow",
      "OmniAccess Stellar",
      "OmniPCX Enterprise",
      "DECT Handsets",
      "Smart DeskPhones",
    ],
    customers: [
      {
        name: "Kaiserswerther Diakonie",
        detail: "Senior living connectivity and collaboration",
      },
      {
        name: "Groupe EDENIS",
        detail: "Resident autonomy through digital services",
      },
      {
        name: "ACT Health",
        detail: "Aged care communications modernization",
      },
    ],
  },

  // ─── Education ─────────────────────────────────────────────────────────────────

  {
    parentSlug: "education",
    slug: "higher-education",
    name: "Higher Education",
    tagline: "Student centered learning is personalized learning",
    description:
      "ALE empowers universities and colleges to deliver the immersive, borderless digital experience students expect. Through cognitive communications and pervasive connectivity, institutions can support students' entire journeys — from applicants to alumni — enhancing success, retention, and enrollment. Nudge technologies such as AI-enabled chatbots, virtual assistants, and cognitive communications drive personalized learning, while seamless integration with LMS, ITSM, and SIS platforms creates friction-free campus environments.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/education-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Smart Campus Networking",
        description:
          "Secure, high-performance, predictive network infrastructure with carrier-grade non-blocking architecture, low-latency design, controller-less Wi-Fi, and Shortest Path Bridging for agile campus operations.",
      },
      {
        title: "Student-Centric Services",
        description:
          "AI-enabled chatbots, predictive analytics, and location-based services with geo-fencing that deliver personalized direction, campus information, and streamlined web experiences for admissions, financial aid, and help desk.",
      },
      {
        title: "Connected Learning Environments",
        description:
          "LMS integration through Rainbow enabling remote classroom recreation, virtual collaboration spaces, and hybrid learning continuity so students can learn from anywhere at any time.",
      },
      {
        title: "Campus Cybersecurity",
        description:
          "Multi-layered security with unified network access profiles, granular ACL and QoS control, time-of-day restrictions, location-based policies, automatic device quarantine, and DoS protection.",
      },
    ],
    products: [
      "Rainbow",
      "OmniPCX Enterprise",
      "OmniSwitch",
      "OmniAccess Stellar",
      "OmniVista",
    ],
    customers: [
      {
        name: "Javeriana University",
        detail: "Campus-wide digital transformation",
      },
      {
        name: "Alamo Colleges",
        detail: "Multi-campus networking and collaboration",
      },
      {
        name: "Morgan State University",
        detail: "Connected campus experience for HBCU",
      },
    ],
  },
  {
    parentSlug: "education",
    slug: "k-12",
    name: "K-12",
    tagline: "Student success starts with a safe campus",
    description:
      "ALE helps school districts create safe, connected learning environments where teachers can share resources, communicate with students, and develop personalized learning plans. With growing device counts and evolving security requirements, K-12 institutions need intelligent campus solutions combining emergency notification, unified communications, and crisis management infrastructure. ALE integrates awareness, coordination, collaboration, and notification capabilities to reduce response times and ensure continuity of learning whether in-class, remote, or hybrid.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/education-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Safe & Secure Campus",
        description:
          "Risk-based security plans with emergency notification systems, coordinated response procedures, and evacuation management that have cut response times by seven minutes in deployed districts.",
      },
      {
        title: "Connected Classrooms",
        description:
          "Connect teachers, parents, and students instantly using multiple messaging methods, enabling learning from anywhere at any time with infrastructure that scales for new technologies and growing device counts.",
      },
      {
        title: "Crisis Communication & Coordination",
        description:
          "Reach appropriate personnel at the right time in the right location, integrate and monitor IoT devices and safety systems, and deploy coordinated notification across the entire campus community.",
      },
      {
        title: "Learning Continuity",
        description:
          "Provide consistent quality education services whether in-class, remote, or hybrid, with secure remote communications and plug-and-play virtual classroom solutions that shift from capital to operational expenditure.",
      },
    ],
    products: [
      "Rainbow",
      "Visual Notification Assistant",
      "OmniPCX Enterprise",
      "OmniAccess Stellar",
      "OmniVista",
    ],
    customers: [
      {
        name: "Kennewick School District",
        detail: "Emergency response time reduced by 7 minutes",
      },
      {
        name: "Colegio Felix Jesus Rougier",
        detail: "Connected learning environment",
      },
    ],
  },

  // ─── Government ────────────────────────────────────────────────────────────────

  {
    parentSlug: "government",
    slug: "defense",
    name: "Defense",
    tagline:
      "Enhance collaboration and simplify operations with advanced military communications and network technology",
    description:
      "ALE provides resilient, secure Digital Age Networking and Communications for the defense sector. Solutions support modern warfare requirements including Multi-Domain Operations (MDO), enabling information sharing, interconnected operations, and real-time coordination. Available on-premises, in the cloud, or hybrid, ALE defense solutions deliver 99.999% availability with end-to-end multi-layer protection, real-time field analytics, and ruggedized equipment resistant to shock, humidity, and extreme temperatures — including navy-specific devices with anti-roll features.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/government-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Smart Base",
        description:
          "Transform military bases and offices into intelligent infrastructures that enhance working and living experiences with secure, encrypted communications and automated network management.",
      },
      {
        title: "Field Operations",
        description:
          "Support warfare operations with on-board Internet of Medical Things (IoMT), mission-critical communications equipment designed for harsh field conditions, and ruggedized devices for extreme environments.",
      },
      {
        title: "Crisis Management & Command",
        description:
          "Command and control capabilities enabling cross-functional coordination during emergencies with real-time analytics from field data, vehicle information, and security alerts for faster decision-making.",
      },
      {
        title: "Defense-Grade Security",
        description:
          "Certified to Common Criteria, NATO, NIST, JITC, FIPS 140-2, and TAA standards with SIP perimeter defense, encrypted collaboration, and hardened industrial switches for classified environments.",
      },
    ],
    products: [
      "OmniPCX Enterprise",
      "Rainbow",
      "OmniSwitch",
      "DECT Handsets",
      "Dispatch Console",
    ],
    customers: [
      {
        name: "Gemeinde Pratteln",
        detail: "Flexible communication and real-time crisis management",
      },
      {
        name: "Seine-Saint-Denis Council",
        detail: "Modernized telephony with reduced operating costs",
      },
    ],
  },
  {
    parentSlug: "government",
    slug: "public-safety",
    name: "Public Safety",
    tagline:
      "Boost emergency response and protect communities with public safety solutions",
    description:
      "Modern technologies — intelligent networks, IoT data, and AI — enable organizations to protect people and manage emergencies more effectively. ALE public safety solutions improve collaboration and situational awareness to support quicker decision-making among first responders. By integrating multiple channels including radio, SMS, chat, calls, email, and video, ALE connects responders, agencies, and authorities through real-time information sharing with resilient, secure network infrastructure.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/government-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Emergency Number Handling",
        description:
          "Smart handling of emergency calls with mission-critical communications and flexible system integration for 112/911 compliance, ensuring every call is routed and responded to with minimal delay.",
      },
      {
        title: "Crisis Management",
        description:
          "Large-scale incident management featuring command and control (C2) capabilities with real-time cross-departmental collaboration, enabling coordinated multi-agency response to critical events.",
      },
      {
        title: "Hazard Prevention & Alert",
        description:
          "Smart infrastructure for community safety with citizen engagement through interactive features and rapid alert distribution for critical information, enabling proactive hazard identification and response.",
      },
      {
        title: "Resilient & Secure Networks",
        description:
          "IoT monitoring and AI-powered predictive risk analysis integrated into automated, secure device onboarding systems, providing the always-on foundation that public safety operations demand.",
      },
    ],
    products: [
      "Visual Notification Assistant",
      "Dispatch Console",
      "OmniAccess Stellar",
      "DECT Handsets",
      "Rainbow",
    ],
    customers: [
      {
        name: "Gemeinde Pratteln",
        detail: "Flexible communication and crisis management",
      },
      {
        name: "Strasbourg Eurometropolis",
        detail: "Digital efficiency for emergency services",
      },
      {
        name: "Hidalgo State Government",
        detail: "Centralized public safety communications",
      },
    ],
  },
  {
    parentSlug: "government",
    slug: "connected-cities",
    name: "Connected Cities",
    tagline:
      "Transform citizen lives and promote sustainable communities through connected city solutions",
    description:
      "ALE enables cities to deliver secure, resilient connectivity infrastructure that connects people, devices, machines, and processes. The platform supports high-density Wi-Fi 6 deployment, IoT enablement, automated network management, and smart building services. By reducing complexity, automating operations, and enabling sustainable growth through a Digital Age Network foundation, ALE helps municipalities deliver 24/7 digital citizen services while managing vast numbers of connected urban devices securely.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/government-header-image-v2.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Resilient Network Foundation",
        description:
          "Automated, self-building networks that intelligently route users and devices to applications while maintaining security and consistent quality of experience across urban environments.",
      },
      {
        title: "IoT Enablement & Security",
        description:
          "Securely onboard vast numbers of connected city devices automatically with centralized access control policies and IoT containers that simplify cybersecurity management at scale.",
      },
      {
        title: "Smart Building Integration",
        description:
          "Enable sustainable buildings with collaboration tools, wayfinding, automated room booking, access control, parking status, video surveillance, and centralized notifications for enhanced citizen safety.",
      },
      {
        title: "Digital Citizen Services",
        description:
          "Deliver 24/7 public services via Communications Platform as a Service (CPaaS) accessible from websites or personal devices, enhancing accessibility and convenience for all citizens.",
      },
    ],
    products: [
      "Rainbow",
      "OmniAccess Stellar",
      "OmniSwitch",
      "OmniVista",
      "IP Desktop Phones",
    ],
    customers: [
      {
        name: "Strasbourg Eurometropolis",
        detail: "Communications system upgrade for digital efficiency",
      },
      {
        name: "Bangkok Metropolitan Administration",
        detail: "Continuous improvement and reliability for city services",
      },
      {
        name: "Hidalgo State Government",
        detail: "Centralized data and communications infrastructure",
      },
    ],
  },

  // ─── Transportation ────────────────────────────────────────────────────────────

  {
    parentSlug: "transportation",
    slug: "air",
    name: "Airports",
    tagline:
      "Enable smart services for passengers and staff with connected airport technology",
    description:
      "ALE provides the Air Transportation Industry (ATI) with smart airport solutions connecting subsystems including IT networks, voice communications, and cloud services. The offering spans design through implementation, incorporating indoor geolocation technology, IoT communications, and cloud workflows to support new interactions between people and business processes. ALE smart airports exceed passenger expectations, optimize operational efficiency, and proactively protect passengers, staff, and assets.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Passenger Experience",
        description:
          "Mobile app integration enabling boarding gate access, flight booking, points of interest discovery, and real-time assistance requests via voice or video calls for a problem-free journey.",
      },
      {
        title: "Operational Optimization",
        description:
          "Coordination tools including IoT adoption, smart Operation Control Centers, asset tracking, and communications integrated into business processes for on-time departures and schedule adherence.",
      },
      {
        title: "Safety & Security",
        description:
          "CPaaS and IoT ecosystem infrastructure enabling incident detection, stakeholder coordination, and passenger engagement in security processes with Visual Notification Assistant integration.",
      },
      {
        title: "Airport Network Infrastructure",
        description:
          "High-performance switching and wireless infrastructure with OmniSwitch core networking and OmniAccess Stellar Wi-Fi 6 providing seamless connectivity across terminals, gates, and operational areas.",
      },
    ],
    products: [
      "Rainbow",
      "OmniSwitch",
      "OmniAccess Stellar",
      "Dispatch Console",
      "Visual Notification Assistant",
      "OmniVista",
    ],
    customers: [
      {
        name: "China Eastern Airlines",
        detail: "Cost savings with new telephony solutions",
      },
      {
        name: "Aeroports de Lyon",
        detail: "Maintained quality with uninterrupted service",
      },
      {
        name: "Civil Aviation Authority Uganda",
        detail: "Upgraded with IP telephony and WLAN",
      },
    ],
  },
  {
    parentSlug: "transportation",
    slug: "rail",
    name: "Railways",
    tagline:
      "Secure and innovative services for passengers and employees through digital rail transformation",
    description:
      "Railway operators are modernizing through IP connectivity, IoT, Bluetooth Low Energy, and cloud multimedia. ALE accelerates the industry toward SmartRail 4.0 by enabling multimodal transport services for connected passengers across light-rail to high-speed rail operations. From enhanced passenger services and real-time safety systems to predictive maintenance and unified WAN/WLAN infrastructure, ALE connects every aspect of modern rail operations.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Enhanced Passenger Services",
        description:
          "Optimized railway experiences through contextual information, geolocation-based assistance, video interactions with agents, virtual ticketing, and Mobility-as-a-Service (MaaS) deployment via Rainbow cloud platform APIs.",
      },
      {
        title: "Safety & Security",
        description:
          "Support for 4,000 multicast CCTV feeds without compromising operational communications, MACsec-protected access ports, IoT containment, Dispatch Console with recording, and emergency notification for crisis management.",
      },
      {
        title: "Operational Efficiency",
        description:
          "IoT and sensor connectivity enabling automated processes, improved maintenance team visibility, timely incident response through CPaaS, and unified WAN/WLAN infrastructure reducing investments and operational costs.",
      },
      {
        title: "Mission-Critical Rail Networks",
        description:
          "Hardened OmniSwitch switches for trackside and tunnel deployment, industrial-grade wireless access points, and resilient network fabric ensuring continuous operations in the harshest rail environments.",
      },
    ],
    products: [
      "OmniSwitch",
      "OmniAccess Stellar",
      "Rainbow",
      "Dispatch Console",
      "Visual Notification Assistant",
      "DECT Handsets",
    ],
    customers: [
      {
        name: "New York Subway",
        detail:
          "330,000+ daily free Wi-Fi users with Transit Wireless partnership",
      },
      {
        name: "Saint Gotthard Tunnel",
        detail:
          "World's longest tunnel with hardened switches for autonomous network",
      },
    ],
  },
  {
    parentSlug: "transportation",
    slug: "ports",
    name: "Ports",
    tagline:
      "Innovative services and applications enabling smart ports for customers and staff",
    description:
      "ALE addresses seaport operational challenges through digital transformation, connecting subsystems via IT networks, voice communications, cloud solutions, and professional services. Technology components including indoor geolocation, IoT communication, and cloud workflows enable interaction between people, business processes, and IoT devices. From terminal automation and cargo tracking to stakeholder collaboration and operations control, ALE transforms connected ports into truly smart ports.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Port Automation",
        description:
          "Transform customer experience for transparent business relationships, increase safety and security for people and goods, and improve operational efficiency in terminals and warehouses through connected-to-smart port evolution.",
      },
      {
        title: "Smart Port Infrastructure",
        description:
          "24/7 monitoring across large areas using Wi-Fi 6, LoRaWAN, optical fiber, Bluetooth Low Energy, GPS, and cellular interconnection for power cabinets, locks, tunnels, and bridges with smart grid energy management.",
      },
      {
        title: "Stakeholder Collaboration & Security",
        description:
          "Integration of collaboration services into Port Community Systems via CPaaS enabling real-time communications, with Operation Control Center enhancements, notification servers, and intelligent video cameras.",
      },
      {
        title: "Operations Optimization",
        description:
          "IoT adoption with smart Operation Control Centers leveraging location-based services, asset tracking, integrated communications, emergency management, and efficient call dispatch for warehouse and terminal operations.",
      },
    ],
    products: [
      "OmniSwitch",
      "OmniAccess Stellar",
      "OmniPCX Enterprise",
      "Rainbow",
      "Dispatch Console",
      "Visual Notification Assistant",
      "DECT Handsets",
    ],
    customers: [
      {
        name: "Bollore Africa Logistics",
        detail:
          "Autonomous network with user-friendly telephony and infrastructure improvements",
      },
      {
        name: "Movis International",
        detail: "Global trade transport network with data center cost savings",
      },
    ],
  },
  {
    parentSlug: "transportation",
    slug: "its",
    name: "ITS",
    tagline:
      "Smart city transportation solutions ensuring safer travel, reduced congestion, and optimized infrastructure",
    description:
      "Road operators are leveraging digital technology to create safer, greener transportation networks. ALE provides IoT-ready network infrastructure enabling road operators to optimize next-generation Intelligent Transportation Systems that deliver safer, less congested, and eco-friendly roadways. From congestion monitoring and automated speed reduction to predictive incident detection and centralized provisioning, ALE ITS solutions support millions of IoT devices across mission-critical road networks.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/transportation-header-1440-600-v3.jpg?h=600&w=1440",
    capabilities: [
      {
        title: "Congestion Management & Monitoring",
        description:
          "Implement congestion monitoring and control systems across highway networks, reducing congestion to increase safety and security for travelers with real-time traffic data and automated responses.",
      },
      {
        title: "Safety & Incident Detection",
        description:
          "Deploy cameras to detect accidents and incidents, automated speed reduction systems connected via IP, CPaaS-enabled incident notification, and sensors monitoring speed variations, temperature, and mechanical defects.",
      },
      {
        title: "Mission-Critical Road Networks",
        description:
          "Hardened Ethernet switches for remote and harsh roadside environments, industrial switches for mission-critical applications, and core switching for centralized data processing supporting millions of IoT devices.",
      },
      {
        title: "Automated Operations",
        description:
          "Centralized provisioning and automated device deployment with Shortest Path Bridging (SPB), simplified day-to-day operations, automated onboarding, and long-term support capabilities reducing operational burden.",
      },
    ],
    products: [
      "OmniSwitch",
      "OmniAccess Stellar",
      "Rainbow",
      "Dispatch Console",
      "Visual Notification Assistant",
    ],
    customers: [
      {
        name: "Nevada Department of Transportation",
        detail:
          "Autonomous network infrastructure supporting IoT deployment and highway safety",
      },
    ],
  },
];
