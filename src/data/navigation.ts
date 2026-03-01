import { catalogProducts, productCategories } from "./products-catalog";

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface MegaLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  badge?: string;
}

export interface MegaGroup {
  heading: string;
  href?: string;
  links: MegaLink[];
}

export interface MegaTab {
  label: string;
  slug: string;
  href: string;
  groups: MegaGroup[];
  viewAllLabel?: string;
  viewAllHref?: string;
}

export interface MegaNavItem {
  label: string;
  href: string;
  variant: "standard" | "tabbed";
  groups?: MegaGroup[];
  tabs?: MegaTab[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
}

// ---------------------------------------------------------------------------
// Products — auto-generated tabs from products-catalog
// ---------------------------------------------------------------------------

function buildProductTabs(): MegaTab[] {
  return productCategories.map((cat) => {
    const products = catalogProducts.filter((p) => p.category === cat.slug);
    const subcats = [...new Set(products.map((p) => p.subcategory || "General"))];
    return {
      label: cat.name,
      slug: cat.slug,
      href: `/products/${cat.slug}`,
      groups: subcats.map((sub) => ({
        heading: sub,
        links: products
          .filter((p) => (p.subcategory || "General") === sub)
          .map((p) => ({ label: p.name, href: `/products/${cat.slug}/${p.slug}` })),
      })),
      viewAllLabel: `View All ${cat.name}`,
      viewAllHref: `/products/${cat.slug}`,
    };
  });
}

// ---------------------------------------------------------------------------
// Primary navigation
// ---------------------------------------------------------------------------

export const primaryNav: MegaNavItem[] = [
  // ── Industries ──────────────────────────────────────────────────────────
  {
    label: "Industries",
    href: "/industries",
    variant: "standard",
    groups: [
      {
        heading: "Healthcare",
        href: "/industries/healthcare",
        links: [
          { label: "Digital Health", href: "/industries/healthcare/digital-health" },
          { label: "Senior Living", href: "/industries/healthcare/senior-living" },
        ],
      },
      {
        heading: "Education",
        href: "/industries/education",
        links: [
          { label: "Higher Education", href: "/industries/education/higher-education" },
          { label: "K-12", href: "/industries/education/k-12" },
          { label: "Intelligent Campus", href: "/industries/education/intelligent-campus" },
          { label: "E-Rate", href: "/industries/education/e-rate" },
        ],
      },
      {
        heading: "Government",
        href: "/industries/government",
        links: [
          { label: "Defense", href: "/industries/government/defense" },
          { label: "Public Safety", href: "/industries/government/public-safety" },
          { label: "Connected Cities", href: "/industries/government/connected-cities" },
          { label: "Smart Buildings", href: "/industries/government/smart-buildings" },
        ],
      },
      {
        heading: "Transportation",
        href: "/industries/transportation",
        links: [
          { label: "Airports", href: "/industries/transportation/air" },
          { label: "Railways", href: "/industries/transportation/rail" },
          { label: "Ports", href: "/industries/transportation/ports" },
          { label: "ITS", href: "/industries/transportation/its" },
        ],
      },
      {
        heading: "Hospitality",
        href: "/industries/hospitality",
        links: [
          { label: "Guest Experience", href: "/industries/hospitality/guest-experience" },
        ],
      },
      {
        heading: "Energy & Utilities",
        href: "/industries/energy",
        links: [],
      },
      {
        heading: "Manufacturing",
        href: "/industries/manufacturing",
        links: [],
      },
      {
        heading: "Small & Medium Business",
        href: "/industries/smb",
        links: [],
      },
    ],
    featured: {
      title: "How ALE transforms hospitals",
      description: "40% faster response times",
      href: "/customers/case-studies",
      image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/healthcare-header-image-v2.jpg",
    },
  },

  // ── Solutions (Services folded in) ──────────────────────────────────────
  {
    label: "Solutions",
    href: "/solutions",
    variant: "standard",
    groups: [
      {
        heading: "Digital Age Communications",
        href: "/solutions/digital-age-communications",
        links: [
          { label: "Unified Communications", href: "/solutions/unified-communications" },
          { label: "Collaboration Solutions", href: "/solutions/collaboration-solutions" },
          { label: "Cloud Communications", href: "/solutions/move-to-cloud" },
          { label: "CPaaS", href: "/solutions/cpaas" },
          { label: "Hybrid Workplace", href: "/solutions/enable-hybrid-work" },
          { label: "Customer Service Apps", href: "/solutions/e-services" },
        ],
      },
      {
        heading: "Digital Age Networking",
        href: "/solutions/digital-age-networking",
        links: [
          { label: "SD-WAN & SASE", href: "/solutions/sd-wan-sase" },
          { label: "Network Security", href: "/solutions/network-security" },
          { label: "Data Center", href: "/solutions/data-center-networking" },
          { label: "Mission Critical Networks", href: "/solutions/mission-critical-networks" },
          { label: "Shortest Path Bridging", href: "/solutions/shortest-path-bridging" },
          { label: "Enterprise Wi-Fi", href: "/solutions/wifi-solutions" },
          { label: "Hybrid POL", href: "/solutions/hybrid-pol" },
          { label: "OmniFabric", href: "/solutions/omnifabric" },
          { label: "Optical Networking", href: "/solutions/optical-solutions" },
          { label: "Industrial Networks", href: "/solutions/industrial-networks" },
          { label: "IoT Networks", href: "/solutions/iot-networks" },
          { label: "Private 5G", href: "/solutions/private-5g-solution" },
          { label: "AI Operations", href: "/solutions/optimize-with-ai" },
        ],
      },
      {
        heading: "Business Innovation",
        href: "/solutions/business-innovation",
        links: [
          { label: "Asset Tracking", href: "/solutions/connect-everything" },
          { label: "Network as a Service", href: "/solutions/network-as-a-service" },
          { label: "Video Surveillance", href: "/solutions/video-surveillance-networking" },
        ],
      },
      {
        heading: "Business Continuity",
        href: "/solutions/business-continuity",
        links: [],
      },
      {
        heading: "Services",
        href: "/services",
        links: [
          { label: "Support Services", href: "/services/support-services" },
          { label: "Training", href: "/services/training-services" },
          { label: "Professional & Managed", href: "/services/professional-managed-services" },
          { label: "Success Management", href: "/services/success-management" },
          { label: "Industry Services", href: "/services/industry-services" },
        ],
      },
    ],
    featured: {
      title: "Move to the cloud with XaaS",
      description: "Flexible consumption models for every need",
      href: "/solutions/move-to-cloud",
      image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/solutions-dac-focus-topic-810x380.jpg",
    },
  },

  // ── Products (tabbed) ───────────────────────────────────────────────────
  {
    label: "Products",
    href: "/products",
    variant: "tabbed",
    tabs: buildProductTabs(),
    featured: {
      title: "OmniSwitch Comparison Tool",
      description: "Compare switches side-by-side",
      href: "/products/switches",
      image: "https://web-assets.al-enterprise.com/-/media/assets/internet/images/omniswitch-6860e-p48-left-4c-480x480-product-showcase.png",
    },
  },

  // ── Partners ────────────────────────────────────────────────────────────
  {
    label: "Partners",
    href: "/partners",
    variant: "standard",
    groups: [
      {
        heading: "Business Partners",
        href: "/partners/business-partners",
        links: [
          { label: "Become a Partner", href: "/partners/business-partners" },
          { label: "Find a Partner", href: "/partners#find-a-partner" },
          { label: "Partner Resources", href: "https://myportal.al-enterprise.com/s/", external: true },
          { label: "MyPortal Login", href: "https://myportal.al-enterprise.com/s/", external: true },
        ],
      },
      {
        heading: "Consultants",
        href: "/partners/consultants",
        links: [
          { label: "MyPortal Login", href: "https://myportal.al-enterprise.com/a6f5I0000008TJ8QAM", external: true },
        ],
      },
      {
        heading: "Technology Partners",
        href: "/partners/technology-partners",
        links: [
          { label: "Developers & APIs", href: "/developers" },
        ],
      },
    ],
  },

  // ── Company ─────────────────────────────────────────────────────────────
  {
    label: "Company",
    href: "/company",
    variant: "standard",
    groups: [
      {
        heading: "About Us",
        href: "/company/about",
        links: [
          { label: "Executive Team", href: "/company/executive-team" },
          { label: "Innovation", href: "/company/innovation" },
          { label: "Careers", href: "/company/careers" },
          { label: "ESG", href: "/company/esg" },
          { label: "History", href: "/company/history" },
          { label: "Awards", href: "/company/awards" },
          { label: "Office Locations", href: "/company/worldwide-presence" },
        ],
      },
      {
        heading: "Resources",
        href: "/resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Newsroom", href: "/company/newsroom" },
          { label: "Events", href: "/company/events" },
          { label: "Video Library", href: "/company/video-library" },
          { label: "Analyst Reports", href: "/company/analyst-reports" },
          { label: "Customer References", href: "/customers/case-studies" },
          { label: "Contact", href: "/company/contact" },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Utility navigation
// ---------------------------------------------------------------------------

export const utilityNav = [
  { label: "Resources", href: "/resources" },
  { label: "Support", href: "/support" },
];

// ---------------------------------------------------------------------------
// Backward compatibility aliases
// ---------------------------------------------------------------------------

export type NavItem = MegaNavItem;
export type NavChild = MegaLink;
