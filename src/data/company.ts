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
}

export const companyData: CompanyPageData[] = [
  {
    slug: "about",
    name: "About ALE",
    tagline: "We make everything connect by delivering technology that works for you",
    description:
      "Alcatel-Lucent Enterprise delivers customized technology experiences that help businesses connect people, processes, and customers. With over 100 years of innovation heritage, ALE provides digital-age networking, communications, and cloud solutions with services tailored for business success — available in cloud, on-premises, and hybrid configurations.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1400&q=80",
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
    heroImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80",
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
];
