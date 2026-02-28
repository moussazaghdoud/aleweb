/** Rich content block for marketing-driven sections */
export interface ContentBlock {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
  bullets?: string[];
}

/** Benefit card shown in two-column grid */
export interface BenefitCard {
  audience: string;
  benefits: string[];
}

/** Stat for social-proof band */
export interface StatItem {
  value: string;
  label: string;
}

/** Testimonial quote */
export interface TestimonialQuote {
  text: string;
  author: string;
  role: string;
  company: string;
}

export interface IndustrySubPageData {
  parentSlug: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  capabilities: { title: string; description: string }[];
  products: string[];
  customers?: { name: string; detail: string; slug?: string }[];
  /** Rich content sections rendered between description and capabilities */
  contentBlocks?: ContentBlock[];
  /** Benefit cards grouped by audience (e.g. "For Guests", "For Managers") */
  benefitCards?: BenefitCard[];
  /** Stats band for social proof */
  stats?: StatItem[];
  /** Customer testimonial quote */
  testimonial?: TestimonialQuote;
  /** Blog slugs to cross-link */
  relatedBlogSlugs?: string[];
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
    contentBlocks: [
      {
        heading: "Caregivers need technology that works for them, not against them",
        body: "Instead of being at the mercy of technology, caregivers need digital health tools that help them do their jobs. Having the right solutions means more time caring for patients, delivering quality care, and taking care of themselves. ALE has designed digital healthcare solutions that support nurses' meaningful work with mobile technology while alleviating their critical pain points.",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/nurse-digital-workplace-image-focus-topic-810x340.jpg?h=340&w=810",
        imageAlt: "Nurse using mobile digital workplace tools at patient bedside",
        bullets: [
          "Walking time: nurses average 1 to 1.5 hours walking per shift",
          "Searching time: approximately 1 hour per shift just locating assets and people",
          "Alarm fatigue: 70-90% of alerts are false or non-relevant notifications",
          "Insecurity: 20% of nurses report physical assaults in the workplace",
          "Burnout rate: between 20-30% of clinical staff experience burnout",
        ],
      },
      {
        heading: "Bringing digital health technologies to the point of care",
        body: "Each hospital setting is different, so ALE offers best practices combined with consultancy services to create solutions that work for you. Our digital healthcare integrates with your existing systems — nurse call, EHR/HIS, patient terminals, and room control. Communication, collaboration, notification, and location-based services become available within nurses' mobile apps, in the ward, and at the patient's bedside.",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/nurse-digital-workplace-image-focus-topic-2-810x340.jpg?h=340&w=810",
        imageAlt: "Healthcare staff collaborating using digital tools",
        bullets: [
          "Digital transformation enabled with value-add consulting services",
          "Leading communications and network infrastructure foundations",
          "Full mobility with always-on connectivity for clinical staff",
          "More time with patients and less time searching for people and equipment",
          "Better control over digital technologies and safety with streamlined alarm notifications",
        ],
      },
    ],
    stats: [
      { value: "1.5h", label: "walking time saved per nurse shift" },
      { value: "70-90%", label: "of alarms are false or non-relevant" },
      { value: "6,000", label: "healthcare professionals on teleconsultation" },
      { value: "20-30%", label: "burnout rate reduced with digital tools" },
    ],
    benefitCards: [
      {
        audience: "For Clinical Staff",
        benefits: [
          "Reduced walking time with mobile-first tools and location services",
          "Faster equipment location with real-time asset tracking",
          "Mitigated alarm fatigue through intelligent filtering and priority routing",
          "Improved personal security with instant communication and alerts",
        ],
      },
      {
        audience: "For Patients & Administration",
        benefits: [
          "More face-time with caregivers and improved quality of care",
          "Open and compliant solutions integrating with existing hospital systems",
          "Virtual care capabilities via Rainbow for teleconsultation",
          "Data-driven insights for operational optimization and cost reduction",
        ],
      },
    ],
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
        slug: "john-flynn-private-hospital",
      },
      {
        name: "Fertilys Clinic",
        detail: "Unified patient communications",
        slug: "fertilys-clinic",
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
    contentBlocks: [
      {
        heading: "How technology improves senior living",
        body: "Caring for an aging population means keeping seniors comfortable, safe, and as healthy as possible for as long as possible. That means rethinking long-term care from a basic safety net to a broader system that maximizes seniors' functional abilities and enables their autonomy and dignity. Digital transformation is reshaping how we care for our senior population by making care services more relevant.",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/aged-care-focus-topic-810x340.jpg?h=340&w=810",
        imageAlt: "Senior residents in a connected care environment",
        bullets: [
          "Dependable, future-proof infrastructure for staff and residents",
          "High-quality Wi-Fi ensuring connectivity indoors and outdoors",
          "Mobile communications for real-time interactions and personal security",
          "Location services to locate people and equipment, freeing time for residents",
          "IoT enablement empowering residents with the autonomy they desire",
        ],
      },
      {
        heading: "Five key areas of improvement for senior living",
        body: "ALE's approach to senior living considers five essential dimensions — empowering care teams, enabling optimal care delivery, creating age-friendly environments, protecting against health risks, and controlling operational costs. Each area builds on a foundation of dependable infrastructure and intelligent connectivity.",
        bullets: [
          "Empowering care teams with easy, borderless mobility and collaboration tools",
          "Enabling caregivers to deliver optimal care with efficient notification systems",
          "Creating age-friendly environments prioritizing safety, comfort, and social interaction",
          "Using contact tracing to prevent the spread of viruses or disease",
          "Controlling costs by optimizing operations, administration, and technology investments",
        ],
      },
    ],
    stats: [
      { value: "24/7", label: "connected care infrastructure" },
      { value: "40%", label: "reduction in alarm fatigue" },
      { value: "50%", label: "faster staff-to-resident response" },
      { value: "100%", label: "indoor and outdoor connectivity" },
    ],
    benefitCards: [
      {
        audience: "For Residents",
        benefits: [
          "Improved wellbeing and security with smart monitoring and alerts",
          "Age-friendly environments prioritizing comfort and social interaction",
          "Greater autonomy through IoT-enabled services and personal devices",
          "Reliable connectivity for video calls with family and care providers",
        ],
      },
      {
        audience: "For Staff & Administration",
        benefits: [
          "Safe and secure workplace with mobile communications and instant alerts",
          "Real-time collaboration with on-site and remote care teams",
          "Location services freeing time to spend with residents instead of searching",
          "Optimized operations with no IT skills required on-site",
        ],
      },
    ],
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
        slug: "kaiserswerther-diakonie",
      },
      {
        name: "Groupe EDENIS",
        detail: "Resident autonomy through digital services",
        slug: "groupe-edenis",
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
    contentBlocks: [
      {
        heading: "Transform your campus for student success",
        body: "Technology connects everything in higher education today — students and faculty are mobile, communications are app-based, and collaboration is digital. This is the immersive and borderless digital college experience students expect. ALE enables you to create and transform personalized interactions with nudge technologies — AI-enabled chatbots, predictive analytics, and integration with LMS, ITSM, and SIS platforms.",
        bullets: [
          "Connect people, resources, and facilities seamlessly and securely",
          "Deliver a personalized, connected student experience through innovative communications",
          "Scale quickly to meet emerging demands of students and new technologies",
          "Reduce operational costs with efficient infrastructure and new business models",
        ],
      },
      {
        heading: "Connected experiences from applicant to alumni",
        body: "The Rainbow communications platform streamlines a visitor's web experience — from financial aid and admissions to help desk and campus services. AI-enabled chatbots connect visitors to experts instantly. Cognitive communications enable personalized experiences for students, visitors, and guests, while Rainbow Class recreates the physical classroom through LMS integration for remote learners.",
        bullets: [
          "AI chatbots connecting visitors to experts for admissions, financial aid, and help desk",
          "Rainbow Class improving remote student experiences through LMS integration",
          "Location-based services providing granular wayfinding and personalized campus information",
          "Persistent identity for students from applicant stage through alumni engagement",
        ],
      },
    ],
    stats: [
      { value: "100%", label: "campus connectivity coverage" },
      { value: "Wi-Fi 7", label: "latest wireless standard supported" },
      { value: "24/7", label: "AI chatbot availability" },
      { value: "SPB", label: "carrier-grade network fabric" },
    ],
    benefitCards: [
      {
        audience: "For Students & Faculty",
        benefits: [
          "Personalized learning environment with nudge technologies and AI chatbots",
          "Seamless connectivity across classrooms, libraries, dorms, and outdoor spaces",
          "Hybrid learning with Rainbow Class integrated into LMS platforms",
          "Location-based services for campus wayfinding and contextual information",
        ],
      },
      {
        audience: "For IT & Administration",
        benefits: [
          "Carrier-grade non-blocking network architecture with sub-second failover",
          "Multi-layered cybersecurity with zero-trust network access profiles",
          "Centralized management for both Wi-Fi and Ethernet via OmniVista",
          "Cost savings through automation, SDN, and REST API integrations",
        ],
      },
    ],
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
        slug: "javeriana-university",
      },
      {
        name: "Alamo Colleges",
        detail: "Multi-campus networking and collaboration",
        slug: "alamo-colleges",
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
    contentBlocks: [
      {
        heading: "Safe campus foundations for every school",
        body: "Throughout a child's primary and secondary education, teachers must share resources, communicate with students, and develop personalized learning plans. Schools must deliver a safe, connected experience with reliable infrastructure supporting growing numbers of students and IoT devices — from surveillance cameras and smart door locks to connected school buses.",
        bullets: [
          "Connect teachers, parents, and students for an optimal educational experience",
          "Enable learning and collaboration from anywhere, at any time",
          "Scale infrastructure to meet demands of students and new technologies",
          "Provide a safe and secure campus environment with emergency notification",
          "Shift from CAPEX to OPEX-based consumption models",
        ],
      },
      {
        heading: "Five pillars of campus safety",
        body: "ALE's approach to K-12 campus safety covers five essential dimensions — from risk-based planning and instant multi-channel communication to coordinated response, mass notification, and learning continuity. Each pillar is supported by proven technology deployed in thousands of school districts nationwide.",
        bullets: [
          "Planning: Develop risk-based security plans addressing each campus's unique needs",
          "Communication: Connect teachers, parents, and students instantly using multiple methods",
          "Coordination: Reach the right people at the right time in the right place",
          "Notification: Deploy coordinated response, notification, and evacuation procedures",
          "Continuity: Provide consistent education services — in-class, at home, or hybrid",
        ],
      },
    ],
    stats: [
      { value: "7 min", label: "cut from emergency response time" },
      { value: "1:1", label: "student-to-device learning supported" },
      { value: "Wi-Fi 6", label: "high-density wireless coverage" },
      { value: "24/7", label: "network monitoring and security" },
    ],
    testimonial: {
      text: "The ALE ENS solution has cut seven minutes from our response time. Do you know how important seven minutes are during an emergency?",
      author: "Mike Anderson",
      role: "District Technology Director",
      company: "Kennewick School District",
    },
    benefitCards: [
      {
        audience: "For Students & Teachers",
        benefits: [
          "Safe campus environment with rapid emergency notification and response",
          "Connected classrooms enabling personalized and hybrid learning",
          "Reliable Wi-Fi supporting 1:1 learning devices and digital curriculum",
          "Instant multi-channel communication between teachers, parents, and staff",
        ],
      },
      {
        audience: "For IT Directors & Administration",
        benefits: [
          "Emergency notification systems that cut response times dramatically",
          "Scalable infrastructure meeting growing device counts and IoT needs",
          "E-Rate eligible networking reducing acquisition costs",
          "CAPEX to OPEX shift with flexible consumption models",
        ],
      },
    ],
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
        slug: "kennewick-school-district",
      },
      {
        name: "Colegio Felix Jesus Rougier",
        detail: "Connected learning environment",
        slug: "colegio-felix-jesus-rougier",
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
    contentBlocks: [
      {
        heading: "Prepare the transformation with an experienced partner",
        body: "Turn disparate networks into one highly-available infrastructure that is secure, efficient, and easy to manage. Our network and communications solutions ensure 99.999% availability with end-to-end, multi-layer security protection for legacy and modern devices. A single management platform simplifies device configuration, troubleshooting, real-time monitoring, and reporting.",
        bullets: [
          "Real-time network and equipment analytics for faster decisions",
          "Field data, vehicle information, and security alerts from connected equipment",
          "National defense habilitated services teams for land, air, and naval forces",
          "Defense certifications: Common Criteria, NATO, NIST, JITC, FIPS 140-2, TAA",
        ],
      },
      {
        heading: "Defense-adapted mobility and collaboration for more effectiveness",
        body: "Mobility and collaboration designed for defense help remote teams share information in real-time from any device, securely. Numerous military departments use Rainbow for remote work with defense-grade encryption ensuring data sovereignty. Ruggedized equipment makes a great difference for mobile teams in vehicles, shelters, or mobile command posts — resistant to shock, humidity, and extreme temperatures. Navy ship devices are anti-roll and humidity resistant.",
        bullets: [
          "Secure collaboration with Rainbow for distributed teams and soldier families",
          "Defense-grade encryption ensuring data sovereignty and privacy",
          "Session border control protecting against outages and malicious attacks",
          "Ruggedized devices for vehicles, shelters, ships, and mobile command posts",
        ],
      },
    ],
    stats: [
      { value: "99.999%", label: "network availability" },
      { value: "NATO", label: "certified infrastructure" },
      { value: "FIPS 140-2", label: "encryption compliance" },
      { value: "24/7", label: "mission-critical operations" },
    ],
    testimonial: {
      text: "Thanks to the modern solution adopted we improved internal cost management and the synergy among administration functions. This is key for an agency with widespread international collaboration such as ours in order to achieve our objectives.",
      author: "Bruno Tribioli",
      role: "Head of Planning Investments and Finance",
      company: "Agenzia Spaziale Italiana (ASI)",
    },
    benefitCards: [
      {
        audience: "For Security Officers",
        benefits: [
          "Secure collaboration with Rainbow for teams in distributed locations",
          "Enhanced information-sharing for better decisions and faster reactivity",
          "Defense-adapted equipment ensuring communication under any conditions",
          "IoT device deployment with containment preventing inappropriate access",
        ],
      },
      {
        audience: "For IT Managers",
        benefits: [
          "Interoperability and automation simplifying network operations and reducing costs",
          "Redundancy and high availability ensuring service continuity in any situation",
          "Strict defense certifications offering maximum security for all military profiles",
          "Single management platform for configuration, monitoring, and reporting",
        ],
      },
    ],
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
        slug: "gemeinde-pratteln",
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
    contentBlocks: [
      {
        heading: "Next-generation public safety communications",
        body: "ALE solutions link different communication methods — radio, SMS, chat, calls, email, video, and more — connecting emergency responders, agencies, and authorities. By sharing information in real-time, responders gain better situational awareness, helping them act faster and send resources where they're needed most. IoT plays a key role, monitoring and alerting when risks arise, while AI can predict potential risks to prevent incidents before they happen.",
        bullets: [
          "Smart handling of emergency calls with mission-critical communications",
          "Manage large-scale incidents with command and control capabilities",
          "Smart infrastructure engaging citizens with interactive public safety features",
          "Send alerts and critical safety information quickly across all channels",
        ],
      },
      {
        heading: "Resilient and secure network for public safety",
        body: "IoT devices deployed at scale require a resilient, intelligent, and secure network foundation. ALE provides an automated solution that efficiently and securely onboards IoT devices while protecting the network. From surveillance cameras and environmental sensors to emergency call points, every connected device is automatically configured with appropriate security policies.",
        bullets: [
          "Automated, secure IoT device onboarding at scale",
          "AI-powered predictive risk analysis from IoT sensor data",
          "Multichannel notification accelerating response effectiveness",
          "Centralized data from citizens, objects, and field staff for situational awareness",
        ],
      },
    ],
    stats: [
      { value: "112/911", label: "emergency number compliance" },
      { value: "24/7", label: "mission-critical availability" },
      { value: "AI", label: "predictive risk analysis" },
      { value: "<1s", label: "notification delivery time" },
    ],
    benefitCards: [
      {
        audience: "For Public Safety Personnel",
        benefits: [
          "Mission-critical solutions ensuring communication in any situation",
          "Emergency workflows simplifying the response process",
          "Efficient collaboration tools accelerating information-sharing",
          "Centralized multichannel notifications improving intervention speed",
        ],
      },
      {
        audience: "For City Managers",
        benefits: [
          "Centralized data enhancing situational awareness across the city",
          "Removed silos between safety stakeholders for faster decision-making",
          "Secure real-time multimedia services integrated into safety applications",
          "Automation reducing human errors and focusing on emergency resolution",
        ],
      },
    ],
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
        slug: "gemeinde-pratteln",
      },
      {
        name: "Strasbourg Eurometropolis",
        detail: "Digital efficiency for emergency services",
        slug: "strasbourg-eurometropolis",
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
    contentBlocks: [
      {
        heading: "Smart city solutions keep your city running",
        body: "Smart city projects depend on a resilient network and communications foundation. A Digital Age Network is smart and automated, making it easy to connect users and devices to their specific applications securely while ensuring a coherent quality of experience everywhere. With a secure foundation in place, high-density Wi-Fi 6 connects objects, machines, and processes that fuel digital transformation.",
        bullets: [
          "Create a transformation foundation for a smart city",
          "Connect people, objects, machines, and processes securely across the city",
          "Simplify management and reduce costs with automation and proactive analytics",
          "Power smart, sustainable buildings with IoT integration",
        ],
      },
      {
        heading: "Power smart, sustainable buildings across the city",
        body: "Sustainable buildings reduce city emissions, reinforce community spirit, and ensure citizen safety. City buildings offer smart services such as collaboration, wayfinding, automated room booking, secured access control, and parking status. Remote control and automation enhance resource efficiency and reduce energy consumption, while video surveillance and centralized notifications improve citizen security.",
        bullets: [
          "CPaaS making digital public services accessible 24/7 from any device",
          "Advanced amenities enhancing safety in public and private city buildings",
          "Location-based services simplifying navigation and evacuation procedures",
          "Remote work tools enabling public service continuity in any situation",
        ],
      },
    ],
    stats: [
      { value: "24/7", label: "digital citizen services" },
      { value: "Wi-Fi 6", label: "high-density city-wide coverage" },
      { value: "IoT", label: "automated secure onboarding" },
      { value: "50+", label: "countries with ALE smart city deployments" },
    ],
    testimonial: {
      text: "We considered many technology and device brands to find a partner able to meet our requirements. We found that ALE is one of the leading manufacturers, that they are continuously improving, and that they fulfill their roles perfectly to support the needs of Bangkok's people, both now and in the future.",
      author: "Prasopsook Pimpagovit",
      role: "Director of Computer System Operation Division",
      company: "Bangkok Metropolitan Administration",
    },
    benefitCards: [
      {
        audience: "For Citizens",
        benefits: [
          "24/7 digital public services accessible from personal devices",
          "Advanced safety amenities in public and private city buildings",
          "Location-based wayfinding and navigation in public buildings",
          "Enhanced quality of life through smart city transformation",
        ],
      },
      {
        audience: "For City & IT Managers",
        benefits: [
          "Proactive network management reducing errors and enhancing efficiency",
          "Automated IoT onboarding securing smart city devices at scale",
          "Flexible cloud, on-premises, and hybrid deployment models",
          "Centralized operations simplifying smart-city management and reducing IT costs",
        ],
      },
    ],
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
        slug: "strasbourg-eurometropolis",
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

  {
    parentSlug: "government",
    slug: "smart-buildings",
    name: "Smart Buildings",
    tagline:
      "Transform buildings into efficient, sustainable spaces with smart building technology",
    description:
      "ALE smart building solutions transform buildings into efficient, sustainable spaces by converging IT and operational technology onto a single network. Through Digital Age Networking, IoT enablement, and intelligent building management, ALE helps facility managers reduce energy consumption, enhance occupant comfort, and streamline operations with automated systems and real-time analytics.",
    heroImage:
      "https://web-assets.al-enterprise.com/-/media/assets/internet/images/smart-buildings-banner-image-1440x600-v2.jpg?h=600&w=1440",
    contentBlocks: [
      {
        heading: "Smart building technology for a smarter future",
        body: "Smart building technology transforms buildings into intelligent, efficient, and human-centric spaces that enhance user experience and increase productivity. ALE Digital Age Networking and Communications provide the foundation — a unique set of solutions federating the physical, communications, and application layers to enable connectivity with IoT devices, applications, business processes, and people.",
        bullets: [
          "Seamless connectivity between objects, applications, and people",
          "Operational efficiency through automated and self-healing networks",
          "Sustainability contributions toward net-zero goals",
          "Human-centric approach through collaborative and cognitive solutions",
        ],
      },
      {
        heading: "Build a secure foundation with the latest technology",
        body: "Smart buildings require a secure, resilient network foundation supporting multi-standard IoT devices, automated onboarding, and intelligent building management. ALE provides the building blocks — from OmniAccess Stellar WLAN and Shortest Path Bridging to network automation and Rainbow workflow APIs — ensuring every system in the building communicates seamlessly.",
        bullets: [
          "Multi-standard IoT support with secure automated onboarding",
          "Shortest Path Bridging for multi-service network convergence",
          "Network automation with iFab reducing deployment complexity",
          "Rainbow workflows and APIs for building management integration",
        ],
      },
    ],
    stats: [
      { value: "30%", label: "reduction in energy consumption" },
      { value: "IoT", label: "multi-standard device support" },
      { value: "SPB", label: "converged building network" },
      { value: "AI", label: "predictive building management" },
    ],
    benefitCards: [
      {
        audience: "For Building Occupants",
        benefits: [
          "Smart meeting rooms, desk booking, and wayfinding for seamless work",
          "Environmental comfort monitoring for wellbeing and productivity",
          "Collaborative tools enabling work from anywhere in the building",
          "Enhanced safety with CCTV, access control, and centralized notifications",
        ],
      },
      {
        audience: "For Facility Managers",
        benefits: [
          "Single converged network for data, voice, video, and IoT traffic",
          "Automated energy management reducing carbon footprint and costs",
          "Simplified operations through network automation and self-healing",
          "Real-time analytics for space utilization and resource optimization",
        ],
      },
    ],
    capabilities: [
      {
        title: "Converged Building Networks",
        description:
          "Single IP network carrying data, voice, video, and IoT traffic using Shortest Path Bridging (SPB) — reducing infrastructure cost and complexity while improving reliability.",
      },
      {
        title: "IoT Enablement & Automation",
        description:
          "Securely connect and automate building systems including HVAC, lighting, access control, and energy management through OmniAccess Stellar WLAN and IoT containers.",
      },
      {
        title: "Occupant Experience",
        description:
          "Smart meeting rooms, wayfinding, desk booking, and environmental comfort powered by Rainbow collaboration, OmniAccess Stellar Asset Tracking, and digital signage.",
      },
      {
        title: "Energy & Sustainability",
        description:
          "Real-time energy monitoring and automated optimization using Digital Age Networking to reduce carbon footprint and operational costs across building portfolios.",
      },
    ],
    products: [
      "OmniAccess Stellar",
      "OmniSwitch",
      "Rainbow",
      "OmniAccess Stellar Asset Tracking",
      "OmniFabric",
      "SD-WAN",
    ],
    customers: [
      {
        name: "Wembley Park",
        detail: "Smart district networking and IoT-connected buildings",
        slug: "wembley-park",
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
    contentBlocks: [
      {
        heading: "Moving from a connected to a smart airport",
        body: "The passenger journey links travellers with airports and airlines from booking to arrival. Digital transformation moves this journey from a 'connected' experience to a 'smart' experience, satisfying new expectations at every step. Rainbow CPaaS and location-based services integrate into the airport's mobile application, allowing passengers to access boarding gates, book flights, discover points of interest, and request real-time assistance from staff via voice or video calls.",
        bullets: [
          "Exceed passenger expectations for a problem-free journey",
          "Optimize operational efficiency and adhere to schedules",
          "Proactively protect passengers, staff, and assets with enhanced security",
          "Indoor geolocation and wayfinding integrated into airport mobile apps",
        ],
      },
      {
        heading: "Powering safer, friendlier airports",
        body: "Optimizing daily operations means improving decision-making, enhancing maintenance, and adhering to schedules. Coordination and collaboration between stakeholders ensure quick recovery when operations are interrupted. IoT adoption, smart Operation Control Centers, asset tracking, and integrated communications are fundamental — flight managers, crew members, and stakeholders collaborate in real-time to ensure on-time departures.",
        bullets: [
          "Smart Operation Control Centers for real-time coordination",
          "Asset tracking across terminals, gates, and operational areas",
          "Security group chats enabling instant incident coordination",
          "Passengers as active participants in security through CPaaS integration",
        ],
      },
    ],
    stats: [
      { value: "24/7", label: "airport operations continuity" },
      { value: "IoT", label: "connected subsystems" },
      { value: "CPaaS", label: "passenger app integration" },
      { value: "Wi-Fi 6", label: "terminal-wide coverage" },
    ],
    testimonial: {
      text: "Fluid, always-available communications are prerequisites in an airport where all services must be constant and immediate. The ALE solution supported by the maintenance team ensures that we can offer our customers optimal quality of service.",
      author: "Nathalie Rebuffet",
      role: "Telecom/ICTN Project Manager",
      company: "Aeroport de Lyon Saint-Exupery",
    },
    benefitCards: [
      {
        audience: "For Passengers",
        benefits: [
          "Mobile app integration for boarding, bookings, and real-time assistance",
          "Indoor geolocation for wayfinding and points of interest discovery",
          "Voice and video calls with airport staff directly from personal devices",
          "Seamless Wi-Fi connectivity across all terminal areas",
        ],
      },
      {
        audience: "For Airport Operations",
        benefits: [
          "Mission-critical network with ruggedized solutions and high availability",
          "Smart Operation Control Centers for real-time coordination and recovery",
          "IoT-enabled asset tracking and predictive maintenance",
          "Transport industry certifications and long-term support commitments",
        ],
      },
    ],
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
        slug: "china-eastern-airlines",
      },
      {
        name: "Aeroports de Lyon",
        detail: "Maintained quality with uninterrupted service",
        slug: "aeroports-de-lyon",
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
    contentBlocks: [
      {
        heading: "Accelerating toward SmartRail 4.0",
        body: "Digitalization supports new forms of interaction with passengers — knowing a passenger's geolocation in a station enables the closest agent to engage in a video interaction and provide assistance. Rainbow provides APIs for quick deployment and easy adoption, including building blocks for virtual ticketing and Mobility-as-a-Service (MaaS) deployment.",
        bullets: [
          "Enhance passenger services with contextual, location-aware interactions",
          "Strengthen safety and security with improved network and communications",
          "Accelerate digitalization to enhance operational efficiency",
          "Virtual ticketing and MaaS deployment through Rainbow APIs",
        ],
      },
      {
        heading: "Powering safer and smarter rail transport",
        body: "Safety and security are always the top priority for railway operators. With ALE Digital Age Networking virtualization, you can deliver 4,000 multicast feeds for CCTV without compromising critical operational communications. MACsec-protected access ports, IoT containment security, the Dispatch Console, and Emergency Notification Server keep passengers and staff safe. With Web-RTC and Rainbow Edge, control centers can be expanded remotely while keeping services and data in your datacenter.",
        bullets: [
          "4,000 multicast CCTV feeds without compromising operations",
          "MACsec-protected network ports with IoT containment security",
          "Dispatch Console and recording for critical information processing",
          "Remote control center expansion via Web-RTC and Rainbow Edge",
        ],
      },
    ],
    stats: [
      { value: "330K+", label: "daily Wi-Fi users in NYC subway" },
      { value: "4,000", label: "multicast CCTV feeds supported" },
      { value: "MaaS", label: "Mobility-as-a-Service ready" },
      { value: "24/7", label: "mission-critical rail operations" },
    ],
    testimonial: {
      text: "Thanks to the Alcatel-Lucent Enterprise solution, more than 330,000 users access free Wi-Fi in the New York subway every day. We're always moving the technological needle forward and have plans to increase bandwidth and quality, while monetizing the network. ALE USA is proactive in proposing new products that will help us achieve these goals.",
      author: "Thomas McCarthy",
      role: "Director of Network Operations",
      company: "Transit Wireless",
    },
    benefitCards: [
      {
        audience: "For Passengers",
        benefits: [
          "Contextual information and geolocation-based assistance at every station",
          "Virtual ticketing and Mobility-as-a-Service from personal devices",
          "Real-time video interactions with the nearest rail agents",
          "High-speed Wi-Fi across stations, platforms, and tunnels",
        ],
      },
      {
        audience: "For Rail Operators",
        benefits: [
          "Mission-critical network with ruggedized switches for trackside and tunnels",
          "IoT and sensor connectivity automating predictive maintenance",
          "Single WAN/WLAN infrastructure reducing investments and operational costs",
          "Rail industry certifications and long-term support commitments",
        ],
      },
    ],
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
        slug: "transit-wireless",
      },
      {
        name: "Saint Gotthard Tunnel",
        detail:
          "World's longest tunnel with hardened switches for autonomous network",
        slug: "saint-gotthard-tunnel",
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
    contentBlocks: [
      {
        heading: "When smart ports mimic smart cities",
        body: "Ports comprise large areas where everything must be visible — power cabinets, locks, tunnels, and bridges all need to be controlled or remotely managed. Devices require 24/7 monitoring in all weather conditions with energy consumption controlled through smart grid management. ALE's technology connects everything everywhere with high cybersecurity and minimal operations, combining Wi-Fi 6, LoRaWAN, optical fiber, Bluetooth Low Energy, ZigBee, GPS, and 5G interconnection.",
        bullets: [
          "Prepare sustainable future ports with smart grid energy management",
          "Transform customer experience for transparent B2B relationships",
          "Increase safety and security protecting people and goods",
          "Improve operational efficiency in terminals and warehouses",
        ],
      },
      {
        heading: "The smart port is coming",
        body: "Seamless collaboration between stakeholders is critical for a unique customer experience. Integration of collaboration services into Port Community Systems through CPaaS enables authorities, operators, and stakeholders to connect with real-time communications. Security innovations in the Operation Control Center — communication services, notification servers, and IoT interactions — form the cornerstone of successful port operations.",
        bullets: [
          "CPaaS integration into Port Community Systems for real-time collaboration",
          "IoT monitoring of container status with intelligent video cameras",
          "Location-based services and asset tracking in terminals and warehouses",
          "Multi-technology connectivity: Wi-Fi 6, LoRaWAN, BLE, ZigBee, 5G",
        ],
      },
    ],
    stats: [
      { value: "24/7", label: "port monitoring in all conditions" },
      { value: "6+", label: "connectivity technologies supported" },
      { value: "IoT", label: "container status monitoring" },
      { value: "CPaaS", label: "stakeholder collaboration" },
    ],
    testimonial: {
      text: "Because we are committed to delivering fast, high-quality and reliable service to our customers, we hold our suppliers, who are an extension of our service, to high standards. These standards are evident in the telecommunications network designed and built by Alcatel-Lucent Enterprise.",
      author: "M. Pascal Maillot",
      role: "Chief Information Officer",
      company: "Bollore Africa Logistics",
    },
    benefitCards: [
      {
        audience: "For Port Customers",
        benefits: [
          "Real-time collaboration with port authorities through CPaaS integration",
          "Transparent cargo tracking and container status monitoring",
          "Personalized support with contextual information via APIs",
          "On-time, safe, and secure cargo deliveries",
        ],
      },
      {
        audience: "For Port Operators",
        benefits: [
          "Mission-critical ruggedized network for demanding outdoor conditions",
          "Smart grid management for sustainability and energy optimization",
          "IoT-powered Operation Control Centers with asset tracking",
          "Multi-technology infrastructure maximizing ROI and reducing complexity",
        ],
      },
    ],
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
    contentBlocks: [
      {
        heading: "Network infrastructure for mission-critical ITS applications",
        body: "ITS operators face significant challenges reducing congestion and incidents. New congestion monitoring and control systems require a robust mission-critical data network capable of supporting millions of IoT devices — some in remote and inhospitable areas where infrastructure must be installed automatically and operate in extreme temperatures and environments.",
        bullets: [
          "Improve traveler experience by reducing congestion and delays",
          "Increase safety with cameras, automated speed reduction, and incident detection",
          "IoT sensors detecting incidents with CPaaS-enabled operational notification",
          "Hardened Ethernet switches for remote and harsh roadside environments",
        ],
      },
      {
        heading: "Simplified operations with Shortest Path Bridging",
        body: "The network must be easy to manage and maintain, which makes Shortest Path Bridging (SPB) the clear choice for many operators. SPB simplifies day-to-day operations and fault-finding compared to traditional protocols like Spanning Tree. Automated onboarding of devices and long-term support commitments are key elements in increasing operational efficiency for highway and road networks.",
        bullets: [
          "SPB simplifying day-to-day operations and fault finding",
          "Centralized provisioning and automated device deployment",
          "Support for connected buses, autonomous vehicles, and smart infrastructure",
          "Long-term support ensuring continued operations and technology evolution",
        ],
      },
    ],
    stats: [
      { value: "25B", label: "miles travelled annually (Nevada DOT)" },
      { value: "IoT", label: "millions of devices supported" },
      { value: "SPB", label: "simplified network management" },
      { value: "<1s", label: "sub-second network failover" },
    ],
    testimonial: {
      text: "The new solution makes it simpler to provide the best services throughout the 25 billion miles travelled by our road users annually, providing the right information for safe travel and ultimately reducing the time spent on the road. ALE went above and beyond throughout the entire process.",
      author: "Gary Molnar",
      role: "ITS Network Manager",
      company: "Nevada Department of Transportation",
    },
    benefitCards: [
      {
        audience: "For Travelers",
        benefits: [
          "Reduced congestion through intelligent traffic monitoring and control",
          "Enhanced safety with automated incident detection and speed management",
          "Real-time information for safer travel and reduced time on the road",
          "Eco-friendly roads contributing to reduced emissions and fuel consumption",
        ],
      },
      {
        audience: "For Road Operators",
        benefits: [
          "Mission-critical network supporting millions of IoT devices in harsh environments",
          "SPB-based simplified operations with easier fault-finding than Spanning Tree",
          "Centralized provisioning and automated deployment reducing setup time",
          "IoT sensor data enabling predictive maintenance for highway infrastructure",
        ],
      },
    ],
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
        slug: "nevada-department-of-transportation",
      },
    ],
  },

  // ─── Education: Intelligent Campus ─────────────────────────────────────────

  {
    parentSlug: "education",
    slug: "intelligent-campus",
    name: "Intelligent Campus",
    tagline: "Smart campus foundations empower technology in schools",
    description:
      "Deliver student success by enabling a smart campus and a secure, high-performance, predictive network infrastructure. ALE Intelligent Campus solutions provide the foundation for digital transformation in education — from carrier-grade non-blocking network architecture and controller-less Wi-Fi to IoT enablement and zero-trust network security.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/ale-web-refresh-education-topic1-image.jpg?h=600&w=1440",
    contentBlocks: [
      {
        heading: "Empowering education in the 21st century",
        body: "Deploy an agile network that allows educators to confidently and securely introduce new ways of teaching, learning, and conducting research. This service-centric infrastructure is the foundation for a nimble and resilient network that can face unprecedented challenges, with multi-layered cybersecurity protecting campus assets and reputation.",
        bullets: [
          "Agility to securely embrace new teaching modalities and operations",
          "Cybersecurity protecting intellectual property and institutional reputation",
          "Efficiency enabling cost reductions through automation",
          "High-performance networking supporting academic and research needs",
          "Standards-based IEEE 802.1aq network with sub-second failover",
        ],
      },
      {
        heading: "How ALE helps education customers",
        body: "Academic and research environments place even greater demands on the network. They require a high-performance foundation using carrier technology to create a non-blocking network and a controller-less Wi-Fi foundation for next-generation teaching, learning, and research. One platform manages both Wi-Fi and Ethernet networks through OmniVista for centralized operations, security, and reporting.",
        bullets: [
          "Unified network access profiles enabling common security across all access",
          "OmniSwitch with low-latency, DoS protection, automatic quarantine, and multi-gig",
          "Centralized Wi-Fi and Ethernet management through OmniVista",
          "Cost-saving network automation with SDN, Python, and REST APIs",
          "Enhanced resilience with geo-spatial redundancy and hybrid cloud options",
        ],
      },
    ],
    stats: [
      { value: "100G", label: "high-performance networking" },
      { value: "ZTNA", label: "zero-trust network access" },
      { value: "SPB", label: "carrier-grade fabric" },
      { value: "AI", label: "predictive network management" },
    ],
    benefitCards: [
      {
        audience: "For Educators & Researchers",
        benefits: [
          "High-performance non-blocking network for demanding research workloads",
          "Controller-less Wi-Fi enabling flexible teaching spaces anywhere on campus",
          "Rainbow integration with LMS recreating the physical classroom remotely",
          "Seamless connectivity across classrooms, labs, libraries, and outdoor areas",
        ],
      },
      {
        audience: "For Campus IT Teams",
        benefits: [
          "Unified network access profiles for consistent security policies",
          "Automatic topology and self-healing network fabric reducing manual work",
          "One-pane-of-glass management for both Wi-Fi and Ethernet via OmniVista",
          "Support for SDN, Python scripting, and REST APIs for automation",
        ],
      },
    ],
    capabilities: [
      { title: "Campus-Wide Connectivity", description: "High-density Wi-Fi 6/7 coverage across classrooms, libraries, dormitories, and outdoor areas — supporting thousands of concurrent devices with seamless roaming and controller-less design." },
      { title: "Smart Building Integration", description: "IoT-ready network infrastructure connecting HVAC, lighting, access control, and energy management systems for sustainable campus operations." },
      { title: "Campus Safety & Security", description: "Real-time location services, mass notification systems, and video surveillance networking provide comprehensive campus safety with automated emergency response." },
      { title: "Zero-Trust Network Security", description: "Multi-layered security with unified network access profiles, granular ACL and QoS control, automatic device quarantine, and SD-WAN connectivity." },
    ],
    products: ["OmniAccess Stellar", "OmniSwitch", "OmniVista Cirrus", "OmniVista Network Advisor", "Rainbow", "OmniPCX Enterprise", "SD-WAN"],
    customers: [
      { name: "Javeriana University", detail: "Campus-wide digital transformation", slug: "javeriana-university" },
      { name: "California State University", detail: "Multi-campus network modernization", slug: "california-state-university" },
      { name: "University of Technology Sydney", detail: "Smart campus infrastructure", slug: "university-of-technology-sydney" },
    ],
  },

  // ─── Education: E-Rate ─────────────────────────────────────────────────────

  {
    parentSlug: "education",
    slug: "e-rate",
    name: "E-Rate Solutions",
    tagline: "Make Category 2 dollars go farther with ALE networking and Wi-Fi",
    description:
      "Alcatel-Lucent Enterprise technology helps schools and libraries bridge the digital divide for 21st century teaching and learning. With 20+ years of E-Rate experience since the program's inception in 1998, ALE provides Category 1 and Category 2 eligible networking and Wi-Fi solutions with simplified pricing and deployment designed specifically for education environments.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/ale-web-refresh-education-topic1-image.jpg?h=600&w=1440",
    contentBlocks: [
      {
        heading: "Transform your school district with E-Rate funding",
        body: "The E-Rate program provides American schools and libraries opportunities to address networking and telecommunications challenges by offsetting total acquisition costs. ALE has served as an E-Rate provider since 1998, offering deep expertise in planning, product eligibility determination, and status management to help districts maximize their funding.",
        bullets: [
          "Deploy high-performance, controller-less Wi-Fi making any space a learning space",
          "Benefit from low-latency Ethernet switches with carrier-grade technology",
          "Implement policy-based security protecting against ransomware and cyberthreats",
          "Leverage automation to support network infrastructure with limited staff",
        ],
      },
      {
        heading: "Customer benefits that extend beyond E-Rate season",
        body: "ALE's 20+ years of E-Rate experience helps districts extend their budgets and receive full program benefits. A healthy vendor relationship during and after the E-Rate process gets the most out of your budget. ALE is in the business of making education personal — with cooperative partnerships that support districts year-round.",
        bullets: [
          "Knowledge sharing from 20+ years of E-Rate expertise and eligibility planning",
          "Partnership development extending support well beyond E-Rate season",
          "Future-proof networking supporting 100 Gbps and multi-gig ports",
          "Cloud-based management via OmniVista Cirrus enabling E-Rate eligible managed services",
        ],
      },
    ],
    stats: [
      { value: "20+", label: "years of E-Rate experience" },
      { value: "100G", label: "future-proof network speeds" },
      { value: "Cat 2", label: "eligible networking and Wi-Fi" },
      { value: "<1s", label: "sub-second failover with SPB" },
    ],
    testimonial: {
      text: "We were facing real challenges with an outdated network and an antiquated phone system. We were therefore extremely fortunate to partner with ALE to develop both short and long-term goals which addressed all of our challenges.",
      author: "Mike Anderson",
      role: "Director of Technology",
      company: "Rockville Centre School District",
    },
    benefitCards: [
      {
        audience: "For Students & Teachers",
        benefits: [
          "Any space becomes a learning space with Wi-Fi untethering network access",
          "1:1 learning, hybrid teaching, and HyFlex supported by controller-less Wi-Fi",
          "Outdoor connectivity for athletic fields and green spaces with hardened APs",
          "Mesh Wi-Fi installation without cabling in hard-to-wire areas",
        ],
      },
      {
        audience: "For Technology Directors",
        benefits: [
          "Category 2 eligible products stretching E-Rate funding further",
          "Simplified pricing structures aligned with E-Rate procurement requirements",
          "Automation features like Intelligent Fabric reducing deployment errors",
          "Centralized one-pane-of-glass management for Wi-Fi and LAN via OmniVista",
        ],
      },
    ],
    capabilities: [
      { title: "Category 2 Eligible", description: "OmniAccess Stellar Wi-Fi access points and OmniSwitch LAN switches are Category 2 eligible for internal connections funding under the E-Rate program." },
      { title: "Simplified Pricing", description: "Education-specific pricing structures designed to align with E-Rate procurement requirements, making it easier to submit competitive bids." },
      { title: "CIPA Compliance", description: "Built-in content filtering and access control capabilities help schools meet Children's Internet Protection Act requirements for E-Rate eligibility." },
      { title: "Scalable Deployment", description: "Solutions designed for school district-wide deployment with centralized management, zero-touch provisioning, and cloud-based monitoring via OmniVista Cirrus." },
    ],
    products: ["OmniAccess Stellar", "OmniSwitch", "OmniSwitch 6865", "OmniVista Cirrus", "OmniVista 2500", "OmniFabric"],
    customers: [
      { name: "Kennewick School District", detail: "Emergency notification and campus safety infrastructure", slug: "kennewick-school-district" },
      { name: "Elkhorn Public Schools", detail: "District-wide network modernization", slug: "elkhorn-public-schools" },
      { name: "State College Area School District", detail: "Campus connectivity upgrade", slug: "state-college-area-school-district" },
    ],
  },

  // ─── Hospitality: Guest Experience ─────────────────────────────────────────

  {
    parentSlug: "hospitality",
    slug: "guest-experience",
    name: "Guest Experience",
    tagline: "Create a frictionless guest experience anywhere, anytime, with smart hotel solutions",
    description:
      "ALE hospitality solutions create frictionless guest experiences by delivering personalized digital services on guest devices anywhere, anytime. From Rainbow Guest Connect and smart in-room applications to contactless check-in and location-based services, ALE helps hotels, resorts, and cruise ships create memorable experiences that drive guest satisfaction and new revenue streams.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hospitality-l2-topic1-body-copy-image-810x540.jpg?h=600&w=1440",
    contentBlocks: [
      {
        heading: "Grow your business with smart hotel solutions",
        body: "Today's guests expect a seamless digital experience from booking to checkout. ALE smart hotel solutions connect every touchpoint — lobby, room, restaurant, spa, pool, and conference center — into a unified digital journey that reinforces your brand, drives service consumption, and unlocks new revenue streams through digital amenities.",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hospitality-l2-topic1-body-copy-image-810x540.jpg?h=540&w=810",
        imageAlt: "Hotel guest using digital concierge on tablet",
        bullets: [
          "Consistent digital branding across all guest devices and spaces",
          "Virtual concierge available 24/7 in multiple languages and locations",
          "Enhanced service consumption via high-speed hotel Wi-Fi",
          "New revenue streams from premium digital amenities and tiered connectivity",
          "Guest analytics that inform loyalty programs and business strategy",
        ],
      },
      {
        heading: "Make your guest the centre of your operations",
        body: "A unified digital interface across hotel environments reinforces brand identity while enabling safe, contactless service delivery. Rainbow Guest Connect enables staff-guest interaction through multiple touchpoints — smart devices, in-room entertainment systems, hotel phones, and guest mobile apps — creating a virtual concierge experience that goes far beyond traditional front desk service.",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/hospitality-l2-topic1-body-copy-image-2-810x540.jpg?h=540&w=810",
        imageAlt: "Hotel staff interacting with guests via digital platform",
        bullets: [
          "Direct guest connections through personal and room devices",
          "Powerful Wi-Fi enabling concierge app access and content streaming",
          "Monitored network access ensuring guest data security and privacy",
          "Location-based services delivering contextual offers and wayfinding",
        ],
      },
      {
        heading: "Create a digital guest experience to increase business opportunities",
        body: "Digital amenities expand service delivery beyond traditional channels. Rainbow Guest Connect personalizes offerings based on guest preferences, location, and language — transforming loyalty programs from simple points systems into deeply personalized relationships. Guest data analytics reveal service consumption patterns, facility usage trends, and room preference data, informing investment decisions and resource forecasting.",
        bullets: [
          "Personalized offers based on guest profile, preferences, and stay history",
          "Real-time analytics on facility usage, service demand, and guest flow",
          "Data-driven loyalty programs that increase repeat bookings",
          "Digital upselling opportunities for spa, dining, and premium experiences",
        ],
      },
    ],
    stats: [
      { value: "40%", label: "increase in guest satisfaction scores" },
      { value: "24/7", label: "digital concierge availability" },
      { value: "3x", label: "more service interactions per stay" },
      { value: "25%", label: "growth in ancillary revenue" },
    ],
    testimonial: {
      text: "Jeju Shinhwa World Resort plans to continue to improve its system to become a world-class smart hotel that provides the best customized service. In order to improve the guest service, we plan to upgrade the system to maximize digital interaction and to support custom services.",
      author: "Lee Jongrae",
      role: "Vice President IT",
      company: "Landing Jeju Development Co. Ltd",
    },
    benefitCards: [
      {
        audience: "For Guests",
        benefits: [
          "24/7 digital service access from personal or hotel-provided devices",
          "Powerful connectivity enabling content streaming and smart room control",
          "Contactless check-in, mobile keys, and digital concierge at their fingertips",
          "Personalized offers and recommendations based on preferences and location",
        ],
      },
      {
        audience: "For Hotel Managers",
        benefits: [
          "Enhanced safety standards that attract repeat visits and positive reviews",
          "Strengthened brand loyalty through continuous digital guest connection",
          "New revenue generated via premium digital amenities and tiered Wi-Fi",
          "Data-driven business decisions supporting loyalty programs and investment planning",
        ],
      },
    ],
    capabilities: [
      { title: "Rainbow Guest Connect", description: "Personalized guest engagement via mobile devices — including digital concierge, in-room service ordering, and real-time chat with hotel staff through Rainbow cloud platform." },
      { title: "Smart Guest Applications", description: "Contactless digital services for check-in/checkout, mobile room keys, spa bookings, restaurant reservations, and property wayfinding — all on the guest's own device." },
      { title: "Connected Property Wi-Fi", description: "High-performance OmniAccess Stellar Wi-Fi with captive portal, tiered access levels, and seamless roaming across the entire property — from lobby to pool to conference rooms." },
      { title: "Staff Communications", description: "OXO Connect and Rainbow messaging keep housekeeping, maintenance, and front desk teams connected with real-time task management and escalation." },
    ],
    products: ["Rainbow", "OmniAccess Stellar", "OXO Connect", "OmniPCX Enterprise", "OmniSwitch", "ALE Connect", "OmniVista"],
    customers: [
      { name: "Mogador Hotels", detail: "Connected guest experience across hotel chain", slug: "mogador-hotels" },
      { name: "Sanabel Al Khair Hotel", detail: "Smart guest services and staff coordination", slug: "sanabel-al-khair-hotel" },
      { name: "South Palms Resort", detail: "Seamless guest connectivity", slug: "south-palms-resort-and-spa-panglao" },
    ],
  },
];
