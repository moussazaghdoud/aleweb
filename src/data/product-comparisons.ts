/**
 * Product comparison data for switches and WLAN category pages.
 * Extracted from ALE product datasheets and legacy comparison tools.
 */

export interface ComparisonSpec {
  feature: string;
  values: string[];
}

export interface ComparisonData {
  heading: string;
  products: string[];
  productSlugs: string[];
  specs: ComparisonSpec[];
}

export const switchComparison: ComparisonData = {
  heading: "OmniSwitch Comparison",
  products: [
    "OS2260",
    "OS2360",
    "OS6360",
    "OS6560",
    "OS6860",
    "OS6900",
    "OS9900",
  ],
  productSlugs: [
    "omniswitch-2260",
    "omniswitch-2360",
    "omniswitch-6360",
    "omniswitch-6560",
    "omniswitch-6860",
    "omniswitch-6900",
    "omniswitch-9900",
  ],
  specs: [
    {
      feature: "Segment",
      values: ["SMB", "SMB", "Access", "Access", "Campus Core", "Data Center", "Chassis"],
    },
    {
      feature: "Max Ports (GE)",
      values: ["24/48", "24/48", "24/48", "24/48", "24/48", "48/96", "up to 384"],
    },
    {
      feature: "Multi-Gig (2.5/5/10G)",
      values: ["false", "true", "false", "true", "true", "true", "true"],
    },
    {
      feature: "25G/100G Uplinks",
      values: ["false", "false", "false", "false", "true", "true", "true"],
    },
    {
      feature: "PoE Budget (max)",
      values: ["370W", "740W", "920W", "920W", "1440W", "1440W", "N/A"],
    },
    {
      feature: "Stacking",
      values: ["true", "true", "true", "true", "true", "true", "N/A"],
    },
    {
      feature: "SPB Fabric",
      values: ["false", "false", "false", "true", "true", "true", "true"],
    },
    {
      feature: "EVPN-VXLAN",
      values: ["false", "false", "false", "false", "true", "true", "true"],
    },
    {
      feature: "AOS Unified OS",
      values: ["false", "false", "true", "true", "true", "true", "true"],
    },
    {
      feature: "OmniVista Managed",
      values: ["true", "true", "true", "true", "true", "true", "true"],
    },
    {
      feature: "Zero-Touch Provisioning",
      values: ["true", "true", "true", "true", "true", "true", "true"],
    },
    {
      feature: "Macro-Segmentation",
      values: ["false", "false", "true", "true", "true", "true", "true"],
    },
  ],
};

export const wlanComparison: ComparisonData = {
  heading: "Stellar AP Comparison",
  products: [
    "AP1501",
    "AP1511",
    "AP1451",
    "AP1351",
    "AP1331",
    "AP1320",
    "AP1301",
    "AP1561",
    "AP1360",
  ],
  productSlugs: [
    "stellar-ap1501",
    "stellar-ap1511",
    "stellar-ap1451",
    "stellar-ap1351",
    "stellar-ap1331",
    "stellar-ap1320",
    "stellar-ap1301",
    "stellar-ap1561",
    "stellar-ap1360",
  ],
  specs: [
    {
      feature: "Wi-Fi Standard",
      values: ["Wi-Fi 7", "Wi-Fi 7", "Wi-Fi 6E", "Wi-Fi 6", "Wi-Fi 6", "Wi-Fi 6", "Wi-Fi 6", "Wi-Fi 6", "Wi-Fi 6"],
    },
    {
      feature: "Radio Bands",
      values: ["Tri-band", "Tri-band", "Tri-band", "Dual-band", "Dual-band", "Dual-band", "Dual-band", "Dual-band", "Dual-band"],
    },
    {
      feature: "Max Data Rate",
      values: ["18.4 Gbps", "9.3 Gbps", "7.8 Gbps", "3.6 Gbps", "3.0 Gbps", "3.0 Gbps", "1.8 Gbps", "1.8 Gbps", "1.8 Gbps"],
    },
    {
      feature: "Environment",
      values: ["Indoor", "Indoor", "Indoor", "Indoor", "Indoor", "Indoor", "Indoor", "Outdoor", "Outdoor"],
    },
    {
      feature: "Ethernet Uplink",
      values: ["10GbE", "5GbE", "2.5GbE", "2.5GbE", "1GbE", "1GbE", "1GbE", "2.5GbE", "1GbE"],
    },
    {
      feature: "IoT Ready (BLE/Zigbee)",
      values: ["true", "true", "true", "true", "true", "true", "true", "true", "true"],
    },
    {
      feature: "Location Services",
      values: ["true", "true", "true", "true", "false", "false", "false", "true", "false"],
    },
    {
      feature: "PoE Powered",
      values: ["802.3bt", "802.3bt", "802.3at", "802.3at", "802.3at", "802.3at", "802.3af", "802.3bt", "802.3at"],
    },
    {
      feature: "Target Density",
      values: ["Very High", "High", "High", "Medium", "Medium", "Medium", "Standard", "Outdoor", "Outdoor"],
    },
    {
      feature: "WPA3",
      values: ["true", "true", "true", "true", "true", "true", "true", "true", "true"],
    },
  ],
};
