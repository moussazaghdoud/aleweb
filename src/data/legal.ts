export interface LegalPageData {
  slug: string;
  name: string;
  lastUpdated: string;
  sections: { title: string; content: string }[];
}

export const legalData: LegalPageData[] = [
  {
    slug: "privacy",
    name: "Privacy Policy",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Introduction",
        content:
          "Alcatel-Lucent Enterprise (ALE) is committed to handling personal data in a transparent, compliant, and responsible way. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, products, and services.",
      },
      {
        title: "Data We Collect",
        content:
          "We may collect the following categories of personal data: contact information (name, email, phone number, company), technical data (IP address, browser type, device information), usage data (pages visited, features used, interaction patterns), and communication preferences. We collect data when you fill out forms, create accounts, subscribe to newsletters, or interact with our services.",
      },
      {
        title: "How We Use Your Data",
        content:
          "We use your personal data to: respond to your inquiries and provide customer support, deliver products and services you have requested, send relevant marketing communications (with your consent), improve our website and services through analytics, comply with legal obligations and protect our legitimate interests.",
      },
      {
        title: "Legal Basis for Processing",
        content:
          "We process personal data based on: your consent (marketing communications, cookies), contractual necessity (service delivery), legitimate interests (business analytics, security), and legal obligations (regulatory compliance, tax records).",
      },
      {
        title: "Data Sharing & Transfers",
        content:
          "We may share your data with: ALE group companies worldwide, authorized business partners (for service delivery), technology service providers (hosting, analytics), and regulatory authorities (when legally required). International transfers are protected by Standard Contractual Clauses and adequacy decisions.",
      },
      {
        title: "Data Retention",
        content:
          "We retain personal data only as long as necessary for the purposes described in this policy, or as required by applicable law. Contact and account data is retained for the duration of our business relationship plus applicable statutory retention periods.",
      },
      {
        title: "Your Rights",
        content:
          "Under GDPR and applicable privacy laws, you have the right to: access your personal data, rectify inaccurate data, erase your data (right to be forgotten), restrict processing, data portability, object to processing, and withdraw consent. To exercise these rights, contact us at privacy@al-enterprise.com.",
      },
      {
        title: "Security Measures",
        content:
          "ALE implements appropriate technical and organizational security measures to protect personal data against unauthorized access, loss, or misuse. These include encryption, access controls, regular security assessments, and employee training programs.",
      },
    ],
  },
  {
    slug: "terms",
    name: "Terms of Use",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Acceptance of Terms",
        content:
          "By accessing and using the Alcatel-Lucent Enterprise website (al-enterprise.com), you agree to be bound by these Terms of Use. If you do not agree, please do not use this website.",
      },
      {
        title: "Intellectual Property",
        content:
          "All content on this website — including text, graphics, logos, images, software, and documentation — is the property of Alcatel-Lucent Enterprise or its licensors and is protected by international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written permission.",
      },
      {
        title: "Permitted Use",
        content:
          "You may access and use this website for lawful business purposes. You may download and print content for personal, non-commercial reference. Any other use — including systematic downloading, data mining, or redistribution — requires written authorization from ALE.",
      },
      {
        title: "User Submissions",
        content:
          "Any information you submit through this website (contact forms, feedback, inquiries) becomes the property of ALE and may be used for business purposes. Do not submit confidential information through public website forms.",
      },
      {
        title: "Disclaimers",
        content:
          "This website is provided 'as is' without warranties of any kind. ALE does not guarantee the accuracy, completeness, or timeliness of information on this website. Product specifications and availability may change without notice.",
      },
      {
        title: "Limitation of Liability",
        content:
          "ALE shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website. This includes damages for loss of data, business interruption, or any other commercial damages.",
      },
      {
        title: "Governing Law",
        content:
          "These Terms of Use are governed by the laws of France. Any disputes shall be subject to the exclusive jurisdiction of the courts of Paris, France.",
      },
    ],
  },
  {
    slug: "cookies",
    name: "Cookie Policy",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "What Are Cookies",
        content:
          "Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences, understand how you use the site, and provide personalized experiences.",
      },
      {
        title: "Essential Cookies",
        content:
          "These cookies are necessary for the website to function properly. They enable core features like page navigation, secure area access, and form submission. You cannot opt out of essential cookies.",
      },
      {
        title: "Analytics Cookies",
        content:
          "We use analytics cookies to understand how visitors interact with our website. This helps us improve site performance, content relevance, and user experience. Analytics data is collected anonymously and aggregated.",
      },
      {
        title: "Marketing Cookies",
        content:
          "Marketing cookies track your activity across websites to help deliver relevant advertisements. These cookies are set by third-party advertising partners and require your explicit consent.",
      },
      {
        title: "Managing Cookies",
        content:
          "You can manage your cookie preferences through your browser settings or our cookie consent tool. Note that disabling certain cookies may affect website functionality.",
      },
    ],
  },
  {
    slug: "trademarks",
    name: "Trademarks & Copyright",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Trademarks",
        content:
          "Alcatel-Lucent, the Alcatel-Lucent Enterprise logo, OmniSwitch, OmniAccess, OmniVista, OmniPCX, Rainbow, and Stellar are trademarks or registered trademarks of Alcatel-Lucent Enterprise. All other trademarks are the property of their respective owners.",
      },
      {
        title: "Copyright",
        content:
          "All content on this website is copyright Alcatel-Lucent Enterprise. Reproduction or redistribution of content without prior written permission is prohibited. For trademark usage guidelines and licensing inquiries, contact legal@al-enterprise.com.",
      },
      {
        title: "Third-Party Notices",
        content:
          "Certain products and solutions may incorporate third-party software or technologies. Applicable third-party license terms and notices are included in the product documentation.",
      },
    ],
  },
  {
    slug: "code-of-conduct",
    name: "Code of Conduct",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Our Commitment",
        content:
          "Alcatel-Lucent Enterprise is committed to conducting business ethically, responsibly, and in compliance with all applicable laws and regulations. This Code of Conduct establishes the principles and standards that guide the behavior of all employees, officers, directors, and business partners worldwide.",
      },
      {
        title: "Integrity in Business",
        content:
          "We conduct all business dealings with honesty and transparency. We do not tolerate bribery, corruption, or fraudulent practices in any form. All employees must comply with anti-corruption laws including the French Sapin II law, the UK Bribery Act, and the US Foreign Corrupt Practices Act.",
      },
      {
        title: "Fair Competition",
        content:
          "We compete fairly and ethically in all markets. We do not engage in anti-competitive practices including price-fixing, market allocation, bid rigging, or abuse of dominant market position. Employees must comply with all applicable competition and antitrust laws.",
      },
      {
        title: "Respect for People",
        content:
          "We are committed to creating a diverse, inclusive, and respectful workplace. We do not tolerate discrimination, harassment, or retaliation of any kind. We respect the human rights of all individuals in our value chain and comply with labor laws in every country where we operate.",
      },
      {
        title: "Data Protection & Privacy",
        content:
          "We protect the personal data of our employees, customers, and partners in accordance with GDPR and applicable privacy laws. All data processing activities must have a lawful basis, and individuals' rights regarding their personal data are respected.",
      },
      {
        title: "Environmental Responsibility",
        content:
          "We are committed to minimizing our environmental impact through sustainable business practices, energy efficiency, waste reduction, and responsible product lifecycle management. We comply with all environmental regulations and strive to exceed industry standards.",
      },
      {
        title: "Reporting & Whistleblowing",
        content:
          "Employees and business partners are encouraged to report suspected violations of this Code through our confidential ethics helpline or directly to the Ethics & Compliance team. We protect whistleblowers from retaliation and investigate all reports thoroughly and impartially.",
      },
    ],
  },
  {
    slug: "compliance",
    name: "Compliance Program",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Overview",
        content:
          "ALE maintains a comprehensive compliance program designed to prevent, detect, and remediate violations of laws, regulations, and internal policies. Our program is overseen by the Chief Compliance Officer and the Ethics & Compliance Committee, with support from compliance champions across all business units and regions.",
      },
      {
        title: "Anti-Corruption",
        content:
          "Our anti-corruption program includes risk-based due diligence on business partners, mandatory anti-corruption training for all employees, pre-approval processes for gifts, hospitality, and sponsorships, and continuous monitoring of high-risk transactions. We maintain a zero-tolerance policy toward bribery and corruption.",
      },
      {
        title: "Export Controls & Sanctions",
        content:
          "ALE complies with all applicable export control laws and international trade sanctions. Our export compliance program includes automated screening of customers and destinations, classification of products and technologies, and end-user verification procedures.",
      },
      {
        title: "Data Privacy Compliance",
        content:
          "Our data privacy program ensures compliance with GDPR, CCPA, and other applicable privacy regulations. We maintain records of processing activities, conduct data protection impact assessments, and have appointed Data Protection Officers where required by law.",
      },
      {
        title: "Healthcare Compliance (HIPAA)",
        content:
          "For healthcare customers in the United States, ALE solutions are designed to support HIPAA compliance. Our healthcare-focused products and services include Business Associate Agreements, access controls, audit logging, and encryption capabilities required for handling protected health information (PHI).",
      },
      {
        title: "Education Compliance (FERPA)",
        content:
          "For educational institutions in the United States, ALE solutions support FERPA compliance. Our education-focused offerings include appropriate access controls, data security measures, and privacy protections for student education records.",
      },
      {
        title: "Training & Awareness",
        content:
          "All employees receive mandatory annual compliance training covering anti-corruption, data privacy, competition law, export controls, and our Code of Conduct. Specialized training is provided to employees in high-risk roles and regions.",
      },
    ],
  },
  {
    slug: "environmental-policy",
    name: "Environmental Policy",
    lastUpdated: "2026-01-15",
    sections: [
      {
        title: "Environmental Commitment",
        content:
          "Alcatel-Lucent Enterprise is committed to protecting the environment and contributing to sustainable development. We integrate environmental considerations into our business decisions, product design, manufacturing processes, and daily operations. Our environmental management system is certified to ISO 14001.",
      },
      {
        title: "Product Sustainability",
        content:
          "We design products for energy efficiency, longevity, and recyclability. Our products comply with RoHS (Restriction of Hazardous Substances), REACH (Registration, Evaluation, Authorization and Restriction of Chemicals), and WEEE (Waste Electrical and Electronic Equipment) directives. We continuously work to reduce the environmental footprint of our product portfolio.",
      },
      {
        title: "Energy & Carbon Reduction",
        content:
          "We are committed to reducing our energy consumption and carbon emissions across our operations. Our initiatives include transitioning to renewable energy sources, improving building energy efficiency, optimizing logistics and transportation, and promoting virtual meetings to reduce business travel.",
      },
      {
        title: "Circular Economy",
        content:
          "We embrace circular economy principles through product take-back programs, refurbishment and reuse initiatives, responsible recycling of end-of-life equipment, and partnerships with certified recycling providers. We aim to minimize waste and maximize the useful life of our products.",
      },
      {
        title: "Supply Chain Responsibility",
        content:
          "We work with our suppliers to promote environmental responsibility throughout our supply chain. Our supplier requirements include compliance with environmental regulations, conflict minerals reporting, and adherence to our Supplier Code of Conduct.",
      },
      {
        title: "Reporting & Transparency",
        content:
          "We publish annual sustainability reports detailing our environmental performance, goals, and progress. We participate in industry sustainability initiatives and disclose our environmental data through established frameworks including CDP (formerly Carbon Disclosure Project).",
      },
    ],
  },
];
