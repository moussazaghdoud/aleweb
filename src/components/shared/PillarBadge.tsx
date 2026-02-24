export type Pillar = "network" | "cloud" | "ai";

const pillarStyles: Record<Pillar, { bg: string; text: string; dot: string; label: string }> = {
  network: {
    bg: "bg-network/10",
    text: "text-network",
    dot: "bg-network",
    label: "Network",
  },
  cloud: {
    bg: "bg-cloud/10",
    text: "text-cloud",
    dot: "bg-cloud",
    label: "Cloud",
  },
  ai: {
    bg: "bg-ai/10",
    text: "text-ai",
    dot: "bg-ai",
    label: "AI",
  },
};

/** Map product categories to their strategic pillar */
export function categoryToPillar(category: string): Pillar {
  switch (category) {
    case "switches":
    case "wlan":
    case "location-services":
      return "network";
    case "platforms":
    case "devices":
    case "applications":
    case "integration":
    case "comms-management":
      return "cloud";
    case "management":
    case "network-management":
      return "ai";
    default:
      return "cloud";
  }
}

export function PillarBadge({ pillar, size = "sm" }: { pillar: Pillar; size?: "sm" | "md" }) {
  const s = pillarStyles[pillar];
  const sizeClass = size === "md"
    ? "px-3 py-1.5 text-xs"
    : "px-2.5 py-1 text-[11px]";

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClass} font-semibold uppercase tracking-wider rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
