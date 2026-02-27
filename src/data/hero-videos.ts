/**
 * Central hero video mapping — every page gets its own unique video.
 * All videos are free stock from Mixkit (no attribution required).
 * Pattern: https://assets.mixkit.co/videos/{ID}/{ID}-720.mp4
 */

const v = (id: number) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

// ── Landing pages ────────────────────────────────────────────
export const landingVideos = {
  home: v(26917),
  solutions: v(914),
  industries: v(4547),
  platform: v(23282),
  products: v(4705),
  productCategory: v(23215),
  services: v(4603),
  partners: v(30012),
  company: v(604),
  blog: v(918),
  resources: v(21589),
  developers: v(1728),
  support: v(4658),
  legal: v(241),
  caseStudies: v(13192),
} as const;

// ── Solutions ────────────────────────────────────────────────
export const solutionVideos: Record<string, string> = {
  "modernize-communications": v(14040),
  "secure-your-network": v(5728),
  "optimize-with-ai": v(26778),
  "move-to-cloud": v(30565),
  "enable-hybrid-work": v(4830),
  "connect-everything": v(26770),
  "business-continuity": v(47050),
  "sd-wan-sase": v(31590),
  cpaas: v(14142),
  "unified-communications": v(46635),
  "iot-networks": v(47051),
  "digital-age-communications": v(26774),
  "digital-age-networking": v(7890),
  "network-security": v(22972),
  "autonomous-network": v(19653),
  "data-center-networking": v(20822),
  "industrial-networks": v(23696),
  "video-surveillance-networking": v(48922),
  "purple-on-demand": v(46631),
  "network-as-a-service": v(23219),
};

// ── Industries ───────────────────────────────────────────────
export const industryVideos: Record<string, string> = {
  healthcare: v(4779),
  education: v(4519),
  hospitality: v(34613),
  government: v(40677),
  transportation: v(28000),
  energy: v(47181),
  manufacturing: v(47257),
  "smart-buildings": v(49845),
  smb: v(48713),
};

// ── Industry Sub-pages ──────────────────────────────────────
export const industrySubPageVideos: Record<string, string> = {
  // Healthcare
  "healthcare/digital-health": v(40739),
  "healthcare/senior-living": v(38757),
  // Education
  "education/higher-education": v(4531),
  "education/k-12": v(27984),
  // Government
  "government/defense": v(44925),
  "government/public-safety": v(1580),
  "government/connected-cities": v(23312),
  // Transportation
  "transportation/air": v(23697),
  "transportation/rail": v(4455),
  "transportation/ports": v(31094),
  "transportation/its": v(3976),
};

// ── Platform ─────────────────────────────────────────────────
export const platformVideos: Record<string, string> = {
  rainbow: v(31536),
  omniswitch: v(47048),
  "stellar-wifi": v(41654),
  "ai-ops": v(19630),
  "private-5g": v(248),
  "desk-phones": v(4807),
  "omnipcx-enterprise": v(10448),
  "oxo-connect": v(51123),
  "ale-connect": v(46679),
  omnivista: v(31510),
  "asset-tracking": v(23551),
};

// ── Services ─────────────────────────────────────────────────
export const serviceVideos: Record<string, string> = {
  "support-services": v(35954),
  "training-services": v(23550),
  "professional-managed-services": v(42648),
  "success-management": v(23695),
  "industry-services": v(4834),
};

// ── Partners ─────────────────────────────────────────────────
export const partnerVideos: Record<string, string> = {
  "business-partners": v(46497),
  consultants: v(4788),
  "technology-partners": v(41644),
};

// ── Company ──────────────────────────────────────────────────
export const companyVideos: Record<string, string> = {
  about: v(30468),
  innovation: v(4773),
  newsroom: v(23169),
  careers: v(5660),
  esg: v(4881),
  contact: v(232),
  events: v(36817),
  "video-library": v(44071),
  "analyst-reports": v(42664),
  "executive-team": v(46677),
};

// ── Blog ─────────────────────────────────────────────────────
export const blogVideos: Record<string, string> = {
  "infrastructure-tested-by-fire": v(23159),
  "ai-ops-transforming-network-management": v(41656),
  "rainbow-platform-ai-collaboration": v(22760),
  "private-5g-manufacturing-revolution": v(14631),
  "healthcare-digital-transformation-2026": v(46365),
  "smart-campus-education-connectivity": v(4531),
  "hospitality-guest-experience-technology": v(21817),
  "esg-technology-sustainability": v(4645),
  "sd-wan-sase-enterprise-connectivity": v(34838),
  "government-smart-city-networks": v(23312),
};

// ── Product categories (for /products/[category] landing) ────
export const productCategoryVideos: Record<string, string> = {
  switches: v(23216),
  wlan: v(144),
  devices: v(4938),
  applications: v(46442),
  integration: v(23281),
  management: v(23007),
  platforms: v(23161),
};

// ── Product detail (for /products/[category]/[slug]) ─────────
export const productDetailVideos: Record<string, string> = {
  switches: v(23380),
  wlan: v(22966),
  devices: v(22033),
  applications: v(14785),
  integration: v(23028),
  management: v(22997),
  platforms: v(23010),
};

// ── Legal ────────────────────────────────────────────────────
export const legalVideos: Record<string, string> = {
  privacy: v(47323),
  terms: v(4713),
  cookies: v(221),
  trademarks: v(4723),
  "code-of-conduct": v(5499),
  compliance: v(22961),
  "environmental-policy": v(2213),
};
