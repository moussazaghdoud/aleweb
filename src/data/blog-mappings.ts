/**
 * Maps solution and industry slugs to blog categories for cross-linking.
 * Used to show "Related articles" on solution and industry pages.
 */

/** Map solution slugs to blog categories */
export const solutionBlogCategories: Record<string, string[]> = {
  "modernize-communications": ["Digital Age Communications", "Rainbow"],
  "secure-your-network": ["Digital Age Networking"],
  "optimize-with-ai": ["Artificial Intelligence", "Digital Age Networking"],
  "move-to-cloud": ["Digital Age Communications", "Rainbow"],
  "enable-hybrid-work": ["Digital Age Communications", "Rainbow"],
  "connect-everything": ["Digital Age Networking", "Artificial Intelligence"],
  "business-continuity": ["Digital Age Communications", "Digital Age Networking"],
  "sd-wan-sase": ["Digital Age Networking"],
  "cpaas": ["Digital Age Communications", "Rainbow"],
  "unified-communications": ["Digital Age Communications", "Rainbow"],
  "iot-networks": ["Digital Age Networking", "Artificial Intelligence"],
  "digital-age-communications": ["Digital Age Communications"],
  "digital-age-networking": ["Digital Age Networking"],
  "network-security": ["Digital Age Networking"],
  "autonomous-network": ["Artificial Intelligence", "Digital Age Networking"],
  "data-center-networking": ["Digital Age Networking"],
  "industrial-networks": ["Digital Age Networking"],
  "video-surveillance-networking": ["Digital Age Networking"],
  "purple-on-demand": ["Digital Age Communications"],
  "network-as-a-service": ["Digital Age Communications"],
  "cloud-communications": ["Digital Age Communications", "Rainbow"],
  "collaboration-solutions": ["Digital Age Communications", "Rainbow"],
  "communications-security": ["Digital Age Networking"],
  "private-5g-solution": ["Digital Age Networking"],
  "e-services": ["Digital Age Communications"],
  "wifi-solutions": ["Digital Age Networking"],
  "mission-critical-networks": ["Digital Age Networking"],
  "shortest-path-bridging": ["Digital Age Networking"],
  "hybrid-pol": ["Digital Age Networking"],
  "omnifabric": ["Digital Age Networking"],
  "optical-solutions": ["Digital Age Networking"],
  "digital-dividends": ["Digital Age Communications", "Digital Age Networking"],
  "business-innovation": ["Digital Age Networking", "Artificial Intelligence"],
  "distributed-wifi": ["Digital Age Networking"],
};

/** Map industry slugs to blog categories */
export const industryBlogCategories: Record<string, string[]> = {
  healthcare: ["Healthcare"],
  education: ["Education"],
  hospitality: ["Hospitality"],
  government: ["Government"],
  transportation: ["Transportation"],
  energy: ["Digital Age Networking"],
  manufacturing: ["Digital Age Networking"],
  smb: ["Digital Age Communications"],
};
