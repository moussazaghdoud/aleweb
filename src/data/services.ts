export interface ServiceData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: { title: string; description: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "support-services",
    name: "Support Services",
    tagline: "24/7 technical support with remote diagnostics by phone and online",
    description:
      "ALE Support Services ensure maximum uptime and swift issue resolution for your networking and communications infrastructure. With 24/7 access to certified engineers, remote diagnostics, firmware updates, and hardware replacement, you get the peace of mind that comes from knowing expert help is always available.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/services-header-image-1440x600-v2.jpg?h=600&w=1440",
    features: [
      {
        title: "24/7 Technical Assistance",
        description:
          "Round-the-clock access to certified engineers via phone and online portal for rapid troubleshooting and incident resolution across your entire ALE infrastructure.",
      },
      {
        title: "Remote Diagnostics",
        description:
          "Proactive monitoring and remote diagnostic tools enable engineers to identify and resolve issues quickly — often before they impact end users.",
      },
      {
        title: "Software & Firmware Updates",
        description:
          "Stay current with the latest features, security patches, and performance improvements through automatic update delivery and managed upgrade services.",
      },
      {
        title: "Hardware Replacement",
        description:
          "Advance hardware replacement ensures minimal downtime. Defective equipment is shipped immediately with next-business-day or same-day options available.",
      },
    ],
  },
  {
    slug: "training-services",
    name: "Training Services",
    tagline: "Broaden your team's skills with expert-led training and certification programs",
    description:
      "ALE Training Services provide comprehensive education programs for IT professionals, system administrators, and network engineers. From instructor-led courses to self-paced digital learning, our curriculum covers the full ALE portfolio — networking, communications, and cloud platforms — with globally recognized certifications.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/services-header-image-1440x600-v2.jpg?h=600&w=1440",
    features: [
      {
        title: "Instructor-Led Training",
        description:
          "Expert instructors deliver hands-on courses at ALE training centers worldwide, covering networking, communications, and cloud solution deployment and management.",
      },
      {
        title: "Digital Learning Platform",
        description:
          "Access self-paced courses, video tutorials, and interactive labs through our Knowledge Hub learning platform — available anytime, anywhere, on any device.",
      },
      {
        title: "Certification Programs",
        description:
          "Earn globally recognized ALE certifications that validate your expertise in network design, deployment, troubleshooting, and communications platform management.",
      },
      {
        title: "Custom Training Programs",
        description:
          "Tailored training programs designed for your organization's specific technology stack, skill gaps, and operational requirements — delivered on-site or remotely.",
      },
    ],
  },
  {
    slug: "professional-managed-services",
    name: "Professional & Managed Services",
    tagline: "Move your digital transformation from ideas to reality",
    description:
      "ALE Professional and Managed Services provide end-to-end project delivery — from initial assessment and solution design through deployment, migration, and ongoing management. Our experienced consultants and project managers ensure your technology investments deliver maximum business value with minimal disruption.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/support-homepage-header-l2-l3-1440x600.jpg?h=600&w=1440",
    features: [
      {
        title: "Assessment & Design",
        description:
          "Thorough infrastructure assessment and solution architecture design aligned with your business objectives, scalability requirements, and security policies.",
      },
      {
        title: "Deployment & Migration",
        description:
          "Expert-led deployment and migration services ensuring smooth transitions from legacy systems to modern ALE solutions with minimal business disruption.",
      },
      {
        title: "Managed Network Operations",
        description:
          "Outsource day-to-day network and communications management to ALE experts. Monitoring, maintenance, and optimization handled by certified professionals.",
      },
      {
        title: "Lifecycle Management",
        description:
          "Complete lifecycle management from procurement through decommissioning, ensuring your infrastructure evolves with your business needs and technology advancements.",
      },
    ],
  },
  {
    slug: "success-management",
    name: "Success Management",
    tagline: "Best practices and guidance to maximize adoption of new technologies",
    description:
      "ALE Success Management assigns a dedicated Customer Success Manager (CSM) to guide your organization through technology adoption. Your CSM provides best practices, usage analytics, adoption strategies, and executive business reviews to ensure your teams fully leverage ALE solutions for measurable business outcomes.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/services-header-image-1440x600-v2.jpg?h=600&w=1440",
    features: [
      {
        title: "Dedicated Success Manager",
        description:
          "A named CSM serves as your single point of contact for adoption strategy, issue escalation, and alignment between technology capabilities and business objectives.",
      },
      {
        title: "Adoption Analytics & Insights",
        description:
          "Detailed usage analytics dashboards reveal adoption trends, feature utilization rates, and opportunities to drive deeper engagement across your workforce.",
      },
      {
        title: "Executive Business Reviews",
        description:
          "Quarterly reviews with your leadership team to assess ROI, benchmark against peers, and plan technology evolution aligned with your business strategy.",
      },
      {
        title: "Best Practice Playbooks",
        description:
          "Proven change management frameworks and deployment playbooks based on thousands of successful ALE implementations across industries worldwide.",
      },
    ],
  },
  {
    slug: "industry-services",
    name: "Industry Services",
    tagline: "Solutions tailored to meet the unique needs of your industry",
    description:
      "ALE Industry Services deliver specialized expertise for vertical markets including healthcare, education, hospitality, government, and transportation. Our industry consultants understand your unique regulatory, operational, and technology requirements — designing and delivering solutions that address industry-specific challenges.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/services-header-image-1440x600-v2.jpg?h=600&w=1440",
    features: [
      {
        title: "Healthcare Solutions Design",
        description:
          "HIPAA-compliant communications and networking solutions for hospitals, clinics, and senior living — integrating with nurse call, EHR, and clinical workflow systems.",
      },
      {
        title: "Education Campus Design",
        description:
          "Smart campus networking, emergency notification, and learning continuity solutions designed for K-12 districts, universities, and multi-campus institutions.",
      },
      {
        title: "Hospitality Experience Design",
        description:
          "Guest experience solutions including in-room communications, high-density Wi-Fi, staff collaboration, and property management system integration.",
      },
      {
        title: "Government & Transportation",
        description:
          "Mission-critical communications and ruggedized networking for government agencies, defense, public safety, airports, railways, and smart city deployments.",
      },
    ],
  },
];
