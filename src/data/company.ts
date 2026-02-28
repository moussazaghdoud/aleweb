export interface ExecutiveMember {
  name: string;
  title: string;
  image: string;
  bio?: string;
}

export interface CompanyPageData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  sections: { title: string; content: string }[];
  stats?: { label: string; value: string }[];
  offices?: { city: string; country: string; address: string; phone?: string }[];
  pressReleases?: { title: string; date: string; summary: string }[];
  executives?: ExecutiveMember[];
}

export const companyData: CompanyPageData[] = [
  {
    slug: "about",
    name: "About ALE",
    tagline: "We make everything connect by delivering technology that works for you",
    description:
      "Alcatel-Lucent Enterprise delivers customized technology experiences that help businesses connect people, processes, and customers. With over 100 years of innovation heritage, ALE provides digital-age networking, communications, and cloud solutions with services tailored for business success — available in cloud, on-premises, and hybrid configurations.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/about-us-header-bar-v2.jpg?h=600&w=1440",
    sections: [
      {
        title: "Who We Are",
        content:
          "We are Alcatel-Lucent Enterprise. Our mission is to make everything connect by delivering digital-age networking, communications, and cloud solutions with services tailored for your business success. We serve over one million customers worldwide through a network of 3,400+ business partners, with a presence in more than 50 countries.",
      },
      {
        title: "Our Vision",
        content:
          "We deliver customized technology experiences that our customers need. Our flexible business models serve industries of every size — from small and medium businesses to large enterprises — across education, healthcare, hospitality, government, transportation, and beyond.",
      },
      {
        title: "Our Values",
        content:
          "Our culture is built on three core values. Speed and agility: we focus on simple results that make customers, partners, and employees happy. Customer centricity: we listen, understand, and prioritize customers and partners. Reliability: we build relationships based on accountability and trust.",
      },
      {
        title: "Heritage & Innovation",
        content:
          "With roots in the Alcatel legacy, we carry more than 100 years of innovation in networking and communications. Today we continue to push boundaries with our Rainbow collaboration platform, OmniSwitch networking, OmniAccess Stellar Wi-Fi, OmniPCX Enterprise communications, and Private 5G solutions.",
      },
      {
        title: "Global Reach",
        content:
          "Headquartered in Paris, France, ALE is a global company with a local presence. We operate in more than 50 countries, supported by 3,400+ certified business partners. Our strategic partnership with China Huaxin strengthens our capacity to innovate and deliver at scale.",
      },
      {
        title: "Commitment to ESG",
        content:
          "ALE is committed to Environmental, Social, and Governance frameworks. We are a signatory of the UN Global Compact and embed responsible business practices across our corporate policies — from environmental protection to diversity, ethics, and anti-corruption compliance.",
      },
    ],
    stats: [
      { label: "Customers Worldwide", value: "1,000,000+" },
      { label: "Business Partners", value: "3,400+" },
      { label: "Countries", value: "50+" },
      { label: "Years of Innovation", value: "100+" },
      { label: "Employees", value: "~3,100" },
      { label: "Annual Revenue", value: "~€1.3B" },
    ],
  },
  {
    slug: "innovation",
    name: "Innovation",
    tagline: "Pioneering digital-age technology for more than a century",
    description:
      "Innovation is at the heart of everything we do at ALE. Building on over 100 years of telecommunications heritage, we invest continuously in R&D to develop next-generation networking, communications, and cloud solutions that help businesses transform and thrive in the digital age.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/ebc-header-image-v4.jpg?h=600&w=1440",
    sections: [
      {
        title: "A Legacy of Innovation",
        content:
          "From the early days of telephony to today's cloud-native platforms, ALE's innovation heritage spans more than a century. The Alcatel legacy gave us deep expertise in switching, routing, and enterprise communications that continues to shape our product roadmap and R&D strategy.",
      },
      {
        title: "Rainbow Collaboration Platform",
        content:
          "Rainbow is our flagship cloud communications platform, enabling team collaboration, voice, video, instant messaging, and contact center capabilities. Available as CPaaS (Communications Platform as a Service), Rainbow empowers businesses to embed communications into any workflow and application.",
      },
      {
        title: "Digital Age Networking",
        content:
          "Our OmniSwitch portfolio delivers high-performance, secure LAN switching for enterprise networks. Combined with OmniAccess Stellar WLAN, ALE provides a complete Digital Age Networking solution with autonomous fabric, network analytics, and IoT-ready infrastructure.",
      },
      {
        title: "Private 5G & Wi-Fi 6/7",
        content:
          "ALE is at the forefront of Private 5G deployment for enterprise environments. Paired with our Wi-Fi 6 and Wi-Fi 7 access points, we deliver ultra-low-latency, high-bandwidth connectivity for mission-critical applications in healthcare, manufacturing, and transportation.",
      },
      {
        title: "AI & Automation",
        content:
          "Artificial intelligence and machine learning are integrated across our portfolio — from AIOps-driven network management in OmniVista Cirrus to intelligent call routing and conversational AI in our contact center solutions. We help enterprises automate operations and deliver smarter customer experiences.",
      },
      {
        title: "Executive Briefing Center",
        content:
          "Our Executive Briefing Center provides an immersive, interactive experience where customers and partners can explore ALE solutions in action. Through live demonstrations and hands-on labs, visitors see firsthand how our technology transforms business operations.",
      },
    ],
  },
  {
    slug: "newsroom",
    name: "Newsroom",
    tagline: "Stay up to date with the latest ALE press releases and media announcements",
    description:
      "The ALE newsroom is your source for the latest press releases, media announcements, analyst reports, and company news. Discover how Alcatel-Lucent Enterprise is shaping the future of enterprise networking and communications.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/news-header-image-1440x600.jpg?h=600&w=1440",
    sections: [
      {
        title: "Latest News",
        content:
          "Stay current with ALE's latest product launches, partnership announcements, customer wins, and industry recognitions. Our press releases are available in multiple languages including English, French, German, Spanish, Chinese, Korean, Portuguese, and Italian.",
      },
      {
        title: "Analyst & Market Reports",
        content:
          "Independent analysts and consulting firms regularly evaluate ALE's solutions. Access third-party industry analyst reports, market assessments, and competitive evaluations to understand how our technology stacks up.",
      },
      {
        title: "Awards & Recognition",
        content:
          "ALE has been recognized by leading industry analysts, technology influencers, and channel partners for innovation and excellence across our networking, communications, and cloud portfolio.",
      },
      {
        title: "Media Contact",
        content:
          "For press inquiries, analyst briefings, and media requests, please reach out through our contact form or connect with our communications team. We welcome opportunities to share our vision for the digital-age enterprise.",
      },
    ],
    pressReleases: [
      {
        title: "ALE Advances Rainbow Platform with New AI-Powered Collaboration Features",
        date: "2026-02-10",
        summary:
          "Alcatel-Lucent Enterprise unveils new artificial intelligence capabilities in its Rainbow collaboration platform, enhancing team productivity with smart meeting summaries, real-time transcription, and intelligent workflow automation.",
      },
      {
        title: "ALE Launches Next-Generation OmniSwitch for Campus and Data Center",
        date: "2026-01-22",
        summary:
          "The new OmniSwitch models deliver higher throughput, enhanced security, and AIOps-ready network analytics for modern campus and data center environments.",
      },
      {
        title: "ALE and Strategic Partner Expand Private 5G for Industrial IoT",
        date: "2026-01-08",
        summary:
          "Alcatel-Lucent Enterprise announces expanded Private 5G solutions targeting manufacturing, logistics, and transportation sectors with ultra-reliable low-latency connectivity.",
      },
      {
        title: "ALE Named a Leader in Enterprise Communications by Industry Analysts",
        date: "2025-12-15",
        summary:
          "Leading research firm recognizes ALE for its comprehensive unified communications portfolio, strong partner ecosystem, and commitment to hybrid cloud deployment models.",
      },
      {
        title: "ALE Reports Strong Growth in Cloud Communications Revenue",
        date: "2025-11-20",
        summary:
          "ALE reports double-digit growth in cloud communications subscriptions driven by Rainbow platform adoption across healthcare, education, and government sectors.",
      },
      {
        title: "ALE Expands OmniAccess Stellar Wi-Fi 7 Portfolio",
        date: "2025-10-30",
        summary:
          "New Wi-Fi 7 access points from ALE deliver multi-gigabit speeds with enhanced security for high-density enterprise environments including stadiums, campuses, and hospitals.",
      },
    ],
  },
  {
    slug: "careers",
    name: "Careers",
    tagline: "Join our team and help connect the world with customized communication and networking solutions",
    description:
      "At ALE, we are transforming how businesses buy, deploy, and use networking and communications solutions. We offer worldwide career opportunities across multiple fields and locations, with a friendly working environment, excellent benefits, and a commitment to employee development.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/company-careers-page-homepage-header-l2-l3-1440x600.jpg?h=600&w=1440",
    sections: [
      {
        title: "Why Work at ALE",
        content:
          "ALE offers a global stage with a local feel. With a presence in over 50 countries, you can build an international career while making a meaningful impact. We invest in development programs to expand your skills and provide a friendly working environment with excellent benefits.",
      },
      {
        title: "Our Culture",
        content:
          "Our culture is defined by customer centricity, reliability delivered with speed and agility, and a genuine desire to make the world a better place through corporate responsibility. We connect people, processes, and customers — and that starts with our own teams.",
      },
      {
        title: "Diversity & Inclusion",
        content:
          "ALE is committed to providing equal employment opportunities without discrimination regarding race, ethnicity, gender, sexual orientation, age, or any other factor. We prioritize gender equality, represented by equal opportunities and equal pay through established workplace equity policies.",
      },
      {
        title: "UN Global Compact",
        content:
          "ALE is a member of the UN Global Compact, committing to principles that uphold human rights, fair labor standards, environmental responsibility, and anti-corruption. These values guide how we work, hire, and grow as an organization.",
      },
      {
        title: "Industries We Serve",
        content:
          "Working at ALE means contributing to solutions that transform industries. Our technology serves education, healthcare, hospitality, transportation, government, and more — available in cloud, on-premises, and hybrid configurations.",
      },
      {
        title: "How to Apply",
        content:
          "Browse open positions and apply directly through our careers portal at jobs.al-enterprise.com. We are always looking for talented individuals who share our passion for innovation and customer success.",
      },
    ],
  },
  {
    slug: "esg",
    name: "ESG & Sustainability",
    tagline: "Tech for Good — making the world better through responsible innovation",
    description:
      "ALE is dedicated to responsible business practices embedded in corporate policies that address environmental protection, labor standards, health and safety, anti-corruption, and ethics compliance. Our ESG framework guides everything we do as we work toward ambitious 2030 sustainability targets.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/about-us-csr-page-homepage-header-l2-l3-1440x600-web.jpg?h=600&w=1440",
    sections: [
      {
        title: "ESG: Tech for Good",
        content:
          "In 2023, ALE evolved its Corporate Social Responsibility program into a formal ESG framework under the Global Revenue and Operations Office. Leadership emphasizes that embedding sustainability into all elements of the organization is essential for meaningful and lasting impact.",
      },
      {
        title: "Environmental Sustainability",
        content:
          "ALE pursues ambitious carbon reduction targets as part of its climate change mitigation strategy. Our sustainable product design programs — including the MakCCIng Durable initiative for terminals — embed eco-design principles in manufacturing and operations. We actively monitor and report greenhouse gas emissions.",
      },
      {
        title: "Social Responsibility",
        content:
          "Our social commitments include community enrichment and local engagement, labor rights and workplace standards compliance, diversity and inclusivity programs, and support for sustainable development goals. ALE has been a member of the UN Global Compact since 2019, committed to its Ten Principles.",
      },
      {
        title: "Corporate Governance",
        content:
          "Our Code of Conduct is the cornerstone of business ethics at ALE. We maintain strict compliance with national and local laws, enforce anti-bribery and anti-corruption measures, and ensure accountability and transparency across all operations.",
      },
      {
        title: "2030 Sustainability Targets",
        content:
          "ALE has set ambitious targets for 2030 across all ESG pillars: reducing carbon emissions across our value chain, increasing product recyclability and lifespan, improving workforce diversity metrics, and strengthening governance and ethics frameworks company-wide.",
      },
      {
        title: "Reports & Resources",
        content:
          "ALE publishes an annual ESG White Paper along with sustainability statements for major product lines including Rainbow and our Communications Solutions portfolio. Our GHG emissions reports provide full transparency into our environmental footprint.",
      },
    ],
  },
  {
    slug: "contact",
    name: "Contact Us",
    tagline: "Get in touch with our global team",
    description:
      "Whether you need sales information, technical support, or want to find a local partner, ALE is here to help. Reach out through our contact form, connect via live chat, or visit one of our offices around the world.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/contact-us-pageheader-1200x299.jpg?h=600&w=1440",
    sections: [
      {
        title: "Contact Sales",
        content:
          "Tell us about your business needs and a sales team member will follow up with you shortly. Submit your inquiry through our online contact form with your name, email, company, and phone number.",
      },
      {
        title: "Find a Partner",
        content:
          "ALE works through a global network of 3,400+ certified business partners. Use our partner locator tool to find a local ALE partner who can help you design, deploy, and support your networking and communications solutions.",
      },
      {
        title: "Technical Support",
        content:
          "Existing customers can access technical support resources, user guides, manuals, and security advisories through our support portal. Our teams are available to help resolve issues and keep your infrastructure running smoothly.",
      },
      {
        title: "Live Chat",
        content:
          "Need a quick answer? Use our live chat feature to connect with an ALE representative in real time. Chat is available during business hours and can help with general inquiries, product questions, and partner referrals.",
      },
    ],
    offices: [
      // Headquarters
      { city: "Colombes (Paris)", country: "France", address: "32 Avenue Kléber, 92700 Colombes", phone: "+33 1 55 66 70 00" },
      // Europe
      { city: "Wien", country: "Austria", address: "Saturn Tower, Leonard-Bernstein-Strasse 10, 1220 Wien", phone: "+43 1 26022 0" },
      { city: "Brecht", country: "Belgium", address: "Ringlaan 17 A, 2960 Brecht" },
      { city: "Prague", country: "Czech Republic", address: "Podbradská 206/57, Praha 14, 198 00 Praha 98" },
      { city: "Vantaa", country: "Finland", address: "Teknopolis Center, Teknobulevardi 3-5, 01530 Vantaa" },
      { city: "Illkirch-Graffenstaden", country: "France", address: "260 Rue Léon Foucault, 67400 Illkirch-Graffenstaden", phone: "+33 3 90 67 67 90" },
      { city: "Guipavas (Brest)", country: "France", address: "115-225 rue Antoine de St Exupéry, ZAC Prat Pip, 29806 Guipavas", phone: "+33 2 98 28 50 00" },
      { city: "Kornwestheim", country: "Germany", address: "Stammheimer Str. 10, Haus 6, 70806 Kornwestheim", phone: "+49 7154 803 5500" },
      { city: "Dublin", country: "Ireland", address: "Block 3 Harcourt Center, Harcourt Road, Dublin 2" },
      { city: "Kfar Saba", country: "Israel", address: "5-B Atir Yeda Street, 4464321 Kfar Saba", phone: "+972 72 2456901" },
      { city: "Vimercate", country: "Italy", address: "Via Energy Park 14, 20871 Vimercate (MB)", phone: "+39 0399404301" },
      { city: "Utrecht", country: "Netherlands", address: "Van Deventerlaan 31-51, 3528 AG Utrecht", phone: "+31 30 222 8000" },
      { city: "Oslo", country: "Norway", address: "Brynsveien 3, 0667 Oslo", phone: "+47 2141 9370" },
      { city: "Warsaw", country: "Poland", address: "Plac Trzech Krzyży 10/14, 00-499 Warszawa" },
      { city: "Lisbon", country: "Portugal", address: "Edificio Altejo, Rua 3 da Matinha, Armazén 101, 1950-326 Lisboa", phone: "+351 211 214 920" },
      { city: "Madrid", country: "Spain", address: "Condesa de Venadito 1, 28027 Madrid", phone: "+34 91 268 12 34" },
      { city: "Solna", country: "Sweden", address: "Svetsarvägen 15, 17141 Solna" },
      { city: "Dietikon (Zurich)", country: "Switzerland", address: "Lerzenstrasse 10, 8953 Dietikon", phone: "+41 58 332 20 20" },
      { city: "Geneva", country: "Switzerland", address: "Route de Pré-Bois 14, 1215 Genève" },
      { city: "London", country: "United Kingdom", address: "Hamilton House, Mabledon Place, London WC1H 9BB", phone: "+44 1628 810 777" },
      // Middle East & Africa
      { city: "Algiers", country: "Algeria", address: "Route les oliviers les crêtes N° 14, Ilot 54, Hydra, Alger" },
      { city: "Rabat", country: "Morocco", address: "Zénith Center, angle avenue Annakhil et la Rocade, Hay Riad, 10110 Rabat" },
      { city: "Doha", country: "Qatar", address: "Street 230, Zone 27, Building 36, Al Hitmi Village, Global Business Center", phone: "+974 7798 4030" },
      { city: "Riyadh", country: "Saudi Arabia", address: "Riverwalk Center, Riyadh", phone: "+966 58 176 7775" },
      { city: "Midrand", country: "South Africa", address: "Atrium 44 on Grand Central, CNR K101, Midrand, 1682" },
      { city: "Dubai", country: "United Arab Emirates", address: "The DOME, Office 2305 & 2306, 23rd Floor, Cluster N, Jumeirah Lake Towers", phone: "+971 4 318 8300" },
      // Asia Pacific
      { city: "Rhodes (Sydney)", country: "Australia", address: "204, Level 2, 3 Rider Boulevard, Rhodes NSW 2138", phone: "+61 2 9370 3000" },
      { city: "Shanghai", country: "China", address: "2/F, Building 1, No.60 Naxian Road, Pudong New Area, Shanghai 201210" },
      { city: "Beijing", country: "China", address: "2F, No.14 Dongzhimen Nandajie, Beijing 100052" },
      { city: "Guangzhou", country: "China", address: "3/F, Building 7, No.235 Gaotang Road, Tianhe District, Guangzhou 510640" },
      { city: "Chongqing", country: "China", address: "Room 21-5, Building 3, Greenland Bonded Centre, No.153 Jinyu Avenue", phone: "+86-23-6712 8430" },
      { city: "Wan Chai", country: "Hong Kong", address: "Room 3525, 35/F, Central Plaza, 18 Harbour Road", phone: "+852-9025-3129" },
      { city: "Bangalore", country: "India", address: "Brigade Magnum, Unit No. G01, B Wing, Amruthahalli Village, Bangalore-560092" },
      { city: "Chennai", country: "India", address: "Prince Info city Tower-II, 12th Floor, OMR road, Kandanchavadi, Chennai-600096" },
      { city: "Gurgaon", country: "India", address: "Altrade Business Centre, 3rd Floor, Platina, M.G Road, Sector 28, Gurgaon 122001" },
      { city: "Mumbai", country: "India", address: "DBS Business Centre, Ground Floor, B Wing, Kanakia Wall Street, Chakala, Andheri East", phone: "+91 8067696100" },
      { city: "Jakarta", country: "Indonesia", address: "Menara Palma 8th Floor, Jl. HR Rasuna Said Kav 6, Jakarta Selatan 12950", phone: "+62 21 8064 4800" },
      { city: "Tokyo", country: "Japan", address: "Wakamatsu Bldg 7F, 3-3-6 Nihombashi honmachi, Chuou-ku, Tokyo 1030023", phone: "+81 90 2472 2796" },
      { city: "Petaling Jaya", country: "Malaysia", address: "Level 3, Menara Axis, No 2, Jalan 51A/223, Seksyen 51A, Petaling Jaya 46100", phone: "+603 7682 2275" },
      { city: "Makati City", country: "Philippines", address: "Unit 807 Peninsula Court Building, Paseo De Roxas corner Makati Avenue", phone: "+63 2 328 2100" },
      { city: "Singapore", country: "Singapore", address: "750E Chai Chee Road #05-01/02, ESR Bizpark, Singapore 469005", phone: "+656812 1950" },
      { city: "Seoul", country: "South Korea", address: "31, Gukjegeumyung-ro 8-gil, Yeongdeungpo-gu, Seoul", phone: "+82-2-6123-2000" },
      { city: "Bangkok", country: "Thailand", address: "Office 24014, 24th floor, Chamchuri Square Building, 319 Phayathai Road", phone: "+66 2017 0999" },
      // Americas
      { city: "Buenos Aires", country: "Argentina", address: "7th Floor, Laminar Plaza, Ing Enrique Butty 240, 1106 Buenos Aires" },
      { city: "São Paulo", country: "Brazil", address: "Av. Paulista 1079, 7º and 8º floors, São Paulo SP 01311-200" },
      { city: "Thousand Oaks", country: "Canada", address: "2000 Corporate Center Drive, Thousand Oaks CA 91320", phone: "+1 818-880-3500" },
      { city: "Santiago", country: "Chile", address: "Orinoco Street #90, Building 1, 21st Floor, Las Condes" },
      { city: "Bogotá", country: "Colombia", address: "Calle 95 #14-45, Edificio Nueve 5, piso 8", phone: "+57 1 6510575" },
      { city: "Mexico City", country: "Mexico", address: "Miguel de Cervantes Saavedra 252, Piso 5, Oficina 5035, Granada, 11520" },
      { city: "Thousand Oaks", country: "United States", address: "2000 Corporate Center Drive, Thousand Oaks CA 91320", phone: "+1 818-880-3500" },
    ],
  },
  {
    slug: "events",
    name: "Events & Webinars",
    tagline: "Find out where we will be exhibiting, speaking, or participating in panel discussions",
    description:
      "ALE participates in industry events, trade shows, and webinars worldwide. Join us to see live demonstrations, hear from our experts, and connect with partners and customers who are transforming their businesses with ALE solutions.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/events-pageheader-1200x299.jpg?h=600&w=1440",
    sections: [
      {
        title: "Upcoming Events",
        content:
          "ALE participates in major industry events including Mobile World Congress, Enterprise Connect, GITEX Global, and regional partner conferences. Visit our booth for live product demonstrations and expert consultations.",
      },
      {
        title: "Webinars & Digital Events",
        content:
          "Join our on-demand and live webinar series covering topics from AI Ops and Private 5G to cloud migration strategies and industry-specific solutions. Register for upcoming sessions or watch recordings at your convenience.",
      },
      {
        title: "ALE Connect Partner Conference",
        content:
          "Our annual partner conference brings together business partners, developers, and solution integrators from around the world for training, networking, and product roadmap previews.",
      },
      {
        title: "Executive Briefing Center",
        content:
          "Schedule a visit to our Executive Briefing Center for an immersive, interactive experience. See ALE solutions in action through live demonstrations and hands-on labs tailored to your business needs.",
      },
    ],
  },
  {
    slug: "video-library",
    name: "Video Library",
    tagline: "Watch the latest ALE videos to find a solution for your business",
    description:
      "Explore our collection of product demonstrations, customer testimonials, technical tutorials, and virtual tours. Our video library showcases real-world implementations and expert insights across industries and solutions.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/about-us-header-bar-v2.jpg?h=600&w=1440",
    sections: [
      {
        title: "Product Demonstrations",
        content:
          "See ALE solutions in action with detailed product demonstrations covering Rainbow collaboration, OmniSwitch networking, Stellar Wi-Fi, AI Ops, Private 5G, and our full device portfolio.",
      },
      {
        title: "Customer Testimonials",
        content:
          "Hear directly from customers about how ALE technology has transformed their operations. Video testimonials from healthcare, education, hospitality, government, and transportation organizations.",
      },
      {
        title: "Technical Tutorials",
        content:
          "Step-by-step video tutorials for system administrators and network engineers covering deployment, configuration, troubleshooting, and best practices for the ALE portfolio.",
      },
      {
        title: "Virtual Tours",
        content:
          "Take a virtual tour of our Executive Briefing Center and explore ALE solutions in an immersive 360-degree environment — from anywhere in the world.",
      },
    ],
  },
  {
    slug: "analyst-reports",
    name: "Analyst & Market Reports",
    tagline: "Third-party industry analysis and market research featuring ALE solutions",
    description:
      "Independent analysts and consulting firms regularly evaluate ALE solutions. Access reports from Gartner, IDC, Frost & Sullivan, Forrester, and other leading research firms to understand how ALE technology compares in the market.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/about-us-header-bar-v2.jpg?h=600&w=1440",
    sections: [
      {
        title: "Gartner",
        content:
          "ALE is recognized in Gartner Magic Quadrant and Critical Capabilities assessments for unified communications, contact center, and enterprise networking. Access the latest Gartner evaluations to inform your technology decisions.",
      },
      {
        title: "IDC",
        content:
          "IDC MarketScape reports evaluate ALE's position in enterprise communications and networking markets. Read IDC's assessment of our competitive strengths and market strategy.",
      },
      {
        title: "Frost & Sullivan",
        content:
          "Frost & Sullivan Radar reports recognize ALE for innovation and growth in cloud communications platforms. Learn how ALE compares against global competitors in communications technology.",
      },
      {
        title: "Forrester & Others",
        content:
          "Additional evaluations from Forrester, ABI Research, GlobalData, and other firms cover ALE's wireless LAN, IoT, and enterprise networking solutions with competitive analysis and market positioning.",
      },
    ],
  },
  {
    slug: "history",
    name: "Our History",
    tagline: "Over a century of telecommunications innovation — from the telephone to the cloud",
    description:
      "Alcatel-Lucent Enterprise carries a heritage spanning more than 100 years of innovation in telecommunications and networking. From the early days of the telephone to today's cloud-native platforms, our journey reflects the evolution of enterprise communications itself.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/company-page-history-executive-homepage-header-l2-l3-1440x600-v3.jpg?h=600&w=1440",
    sections: [
      {
        title: "The Early Years (1898–1970s)",
        content:
          "Our roots trace back to the Compagnie Générale d'Electricité (CGE), founded in 1898 in France. Through decades of innovation in telephony and switching technology, CGE's telecommunications division became a driving force in the European telecom industry, developing some of the world's first electronic switching systems.",
      },
      {
        title: "The Alcatel Era (1980s–2006)",
        content:
          "In 1986, CGE's telecom operations were reorganized under the Alcatel brand. Alcatel quickly became a global leader in telecommunications infrastructure, pioneering ISDN, DSL, and fiber optic technologies. The enterprise division developed the groundbreaking OmniPCX communications platform and OmniSwitch networking portfolio.",
      },
      {
        title: "Alcatel-Lucent (2006–2014)",
        content:
          "The merger of Alcatel and Lucent Technologies in 2006 created a global communications powerhouse combining European and American engineering excellence. The enterprise business unit continued to innovate with unified communications, IP telephony, and next-generation networking solutions.",
      },
      {
        title: "ALE is Born (2014–Present)",
        content:
          "In 2014, the enterprise division was established as a standalone company — Alcatel-Lucent Enterprise — in partnership with China Huaxin. This strategic move gave ALE the independence and agility to focus exclusively on enterprise customers, launching the Rainbow cloud platform, OmniAccess Stellar Wi-Fi, and expanding into Private 5G.",
      },
      {
        title: "Looking Forward",
        content:
          "Today, ALE serves over one million customers worldwide through 3,400+ business partners in more than 50 countries. Our mission remains unchanged: to make everything connect by delivering digital-age networking, communications, and cloud solutions with services tailored for business success.",
      },
    ],
    stats: [
      { label: "Founded", value: "1898" },
      { label: "Years of Innovation", value: "125+" },
      { label: "ALE Established", value: "2014" },
      { label: "Customers Worldwide", value: "1,000,000+" },
      { label: "Countries", value: "50+" },
      { label: "Business Partners", value: "3,400+" },
    ],
  },
  {
    slug: "awards",
    name: "Awards & Recognition",
    tagline: "Industry recognition for innovation and excellence",
    description:
      "Alcatel-Lucent Enterprise has been recognized by leading industry analysts, technology publications, and channel organizations for innovation and excellence across our networking, communications, and cloud portfolio.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/about-us-header-bar-v2.jpg?h=600&w=1440",
    sections: [
      {
        title: "Analyst Recognition",
        content:
          "ALE is recognized in Gartner Magic Quadrant evaluations for unified communications and enterprise networking. IDC MarketScape reports position ALE among leaders in cloud communications platforms. Frost & Sullivan has awarded ALE for innovation in European UCaaS and enterprise networking.",
      },
      {
        title: "Industry Awards",
        content:
          "ALE solutions have received awards from UC Today, CRN, Network Computing, and other leading technology publications for product innovation, customer satisfaction, and channel excellence across our portfolio.",
      },
      {
        title: "Channel Partner Awards",
        content:
          "Our 360 Partner Experience program and partner enablement have been recognized by channel organizations worldwide. ALE partners consistently rank among top performers in customer satisfaction and project delivery.",
      },
      {
        title: "Sustainability Recognition",
        content:
          "ALE's ESG commitments and sustainable product design initiatives have earned recognition from environmental and corporate responsibility organizations, including our participation in the UN Global Compact since 2019.",
      },
    ],
  },
  {
    slug: "worldwide-presence",
    name: "Worldwide Presence",
    tagline: "Serving enterprises in 50+ countries through 3,400+ partners",
    description:
      "Alcatel-Lucent Enterprise operates in more than 50 countries worldwide, serving over one million customers through a global network of 3,400+ business partners. Our regional teams provide local expertise, language support, and on-the-ground service delivery — ensuring that wherever your business operates, ALE is there to support you.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/about-us-header-bar-v2.jpg?h=600&w=1440",
    sections: [
      {
        title: "Europe, Middle East & Africa",
        content:
          "Headquartered in Paris, France, ALE has a strong presence across Europe, the Middle East, and Africa. Key offices include Paris (global HQ), Berlin, London, Madrid, Dubai, and Johannesburg. Our EMEA team supports enterprises across healthcare, education, government, hospitality, and transportation with localized solutions and multilingual support.",
      },
      {
        title: "Asia Pacific",
        content:
          "ALE's Asia Pacific operations are anchored by our strategic partnership with China Huaxin. We maintain offices and partner networks across China, India, Singapore, Australia, Japan, and Southeast Asia — delivering enterprise networking and communications solutions tailored to the region's dynamic growth markets.",
      },
      {
        title: "Americas",
        content:
          "Our Americas operations serve enterprises across North America, Latin America, and the Caribbean from offices in the United States, Canada, Mexico, and Brazil. The team supports large-scale deployments in healthcare, education, government, and critical infrastructure sectors with dedicated pre-sales and post-sales expertise.",
      },
      {
        title: "Global Partner Network",
        content:
          "ALE's 3,400+ business partners — including distributors, resellers, systems integrators, and managed service providers — extend our reach to every corner of the globe. Our 360 Partner Experience (360PX) program ensures partners have the training, tools, and support needed to deliver world-class customer outcomes in any market.",
      },
    ],
    stats: [
      { label: "Countries", value: "50+" },
      { label: "Business Partners", value: "3,400+" },
      { label: "Customers Worldwide", value: "1,000,000+" },
      { label: "Headquarters", value: "Paris, France" },
      { label: "Employees", value: "2,300+" },
      { label: "Languages Supported", value: "15+" },
    ],
  },
  {
    slug: "executive-team",
    name: "Executive Team",
    tagline: "Our Executive team has a wealth of experience within Alcatel-Lucent Enterprise and the telecoms industry",
    description:
      "Our Executive team has a wealth of experience within Alcatel-Lucent Enterprise and the telecoms industry. Together, they bring decades of leadership in networking, communications, cloud technology, and enterprise transformation — driving ALE's strategy to deliver digital-age solutions for enterprises worldwide.",
    heroImage: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/company-page-history-executive-homepage-header-l2-l3-1440x600-v3.jpg?h=600&w=1440",
    sections: [],
    executives: [
      {
        name: "Yann Zhang",
        title: "CEO",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/yann-zhang-headshot-web.jpg",
        bio: "As CEO and Board Member of Alcatel-Lucent Enterprise, Yann Zhang provides strategic, financial, and operational leadership, working with the Executive Management Team and Board of Directors. He brings over 29 years of experience in telecommunications and IT with expertise in sales, service, R&D, product management and business division leadership. Previously, he served as Executive Vice President of Enterprise Business at Nokia Shanghai Bell.",
      },
      {
        name: "Sandrine El Khodry",
        title: "EVP, Global Sales and Marketing",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/sandrine-headshot-72dpi.jpg",
        bio: "A senior executive with over three decades of experience in the ICT and telecommunications sectors, Sandrine oversees worldwide strategic growth, transformation and market expansion. Her career includes key roles at Airbus, British Telecom and euNetworks managing complex initiatives and multicultural teams. She is known for driving sustainable growth and leading through change with strategic clarity, market insight, and an empowering leadership style.",
      },
      {
        name: "Stephan Robineau",
        title: "EVP, Product Business Group & President of ALE USA",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/stephan-robineau-150x160-web.jpg",
        bio: "A seasoned international business executive and board member with global leadership experience, Stephan leads the Product Business Group overseeing consolidated talent focused on growth and innovation. Throughout 20+ years in executive networking roles, he has delivered growth and innovation to transform organizations and processes for business-driven automation, simplification and quality.",
      },
      {
        name: "Moussa Zaghdoud",
        title: "EVP, Customer Experience & Services",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/moussa-zaghdoud-150x160-web.jpg",
        bio: "An entrepreneur by nature, passionate about innovation, creativity, and enabling customer success, Moussa leads the CES organisation that designs value-added services and vertical solutions maximizing recurring revenue, renewals and upselling across the customer journey. His expertise spans software development, artificial intelligence, security, big data, data centre operations, business development and customer care.",
      },
      {
        name: "Rasheed Mohamad",
        title: "Global Revenue and Operations Officer",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/rasheed-mohamad-150x160-web.jpg",
        bio: "An expert international executive with global leadership experience in business transformation, Rasheed leads the Global Operations, Business Technology, Quality and ESG teams while maximizing revenue generation. As sponsor of the company's #GoGreen program, he focuses on sustainable technologies and climate protection. He has 25+ years in telecommunications, holding various management positions in project management, R&D, supply chain, IT/IS and business operations.",
      },
      {
        name: "Marc Blecken",
        title: "EVP, Finance",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/marc-blecken-150x160-web.jpg",
        bio: "As EVP of Finance, Marc manages controlling, accounting, treasury, tax, reporting and mergers and acquisitions functions. He brings 20+ years of international finance leadership experience across Germany, France and the United States. He was instrumental in establishing ALE as a standalone company after the Alcatel-Lucent spin-off and has shaped the Finance organization focusing on digital transformation and sustainable growth.",
      },
      {
        name: "Nicolas Brunel",
        title: "EVP, Strategy, People and Transformation Office & President of ALE International",
        image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/nicolas-brunel-150x160-web.jpg",
        bio: "Nicolas supports the CEO and executive management in defining strategy while integrating Transformation, HR and Real Estate functions. As President of ALE International since March 2019, he represents the company legally, manages employee and union relationships, and promotes ALE in France.",
      },
    ],
  },
];
