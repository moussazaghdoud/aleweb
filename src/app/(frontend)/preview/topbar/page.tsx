import Link from "next/link";

const capabilities = [
  { title: "Auto-Fabric", description: "SPB-based fabric automatically discovers topology, assigns addresses, and creates optimal forwarding paths — no manual VLAN configuration required." },
  { title: "Zero-Touch Provisioning", description: "New switches and access points automatically download configuration and firmware upon connection, eliminating truck rolls." },
  { title: "Predictive Analytics", description: "AI/ML engines analyze network behavior patterns to predict and prevent issues before they impact users or applications." },
  { title: "Self-Healing", description: "Automated failover, dynamic rerouting, and sub-second recovery ensure continuous network availability without manual intervention." },
];

const options = [
  {
    id: "1",
    label: "Soft Slate",
    bar: "bg-slate-200",
    num: "text-slate-400",
    divider: "bg-slate-300",
    title: "text-slate-800",
  },
  {
    id: "2",
    label: "Warm Beige",
    bar: "bg-amber-50",
    num: "text-amber-300",
    divider: "bg-amber-200",
    title: "text-amber-900",
  },
  {
    id: "3",
    label: "Cool Blue Tint",
    bar: "bg-blue-50",
    num: "text-blue-300",
    divider: "bg-blue-200",
    title: "text-blue-900",
  },
  {
    id: "4",
    label: "Dark Charcoal",
    bar: "bg-gray-800",
    num: "text-gray-500",
    divider: "bg-gray-600",
    title: "text-white",
  },
  {
    id: "5",
    label: "Muted Sage Green",
    bar: "bg-emerald-50",
    num: "text-emerald-300",
    divider: "bg-emerald-200",
    title: "text-emerald-900",
  },
  {
    id: "6",
    label: "Light Lavender",
    bar: "bg-violet-50",
    num: "text-violet-300",
    divider: "bg-violet-200",
    title: "text-violet-900",
  },
  {
    id: "7",
    label: "ALE Brand Purple",
    bar: "bg-[#501D8A]/10",
    num: "text-[#501D8A]/30",
    divider: "bg-[#501D8A]/20",
    title: "text-[#501D8A]",
  },
  {
    id: "8",
    label: "Pearl White",
    bar: "bg-gray-50 border-b border-gray-100",
    num: "text-gray-300",
    divider: "bg-gray-200",
    title: "text-gray-800",
  },
  {
    id: "9",
    label: "Midnight Navy",
    bar: "bg-slate-900",
    num: "text-slate-500",
    divider: "bg-slate-600",
    title: "text-white",
  },
  {
    id: "10",
    label: "Blush Pink",
    bar: "bg-rose-50",
    num: "text-rose-300",
    divider: "bg-rose-200",
    title: "text-rose-900",
  },
];

export default function TopBarPreview() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Top Bar Colors — 10 Options</h1>
          <Link href="/" className="text-xs font-semibold text-gray-400 hover:text-gray-600">← Home</Link>
        </div>
      </div>

      {options.map((opt, idx) => (
        <section key={opt.id} className={`py-14 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option {opt.id}</span>
              <h2 className="text-lg font-bold text-gray-900 mt-1">{opt.label}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {capabilities.map((cap, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`${opt.bar} px-6 py-4 flex items-center gap-3`}>
                    <span className={`text-2xl font-extrabold ${opt.num}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div className={`h-5 w-px ${opt.divider} rounded-full`} />
                    <h3 className={`text-base font-bold ${opt.title}`}>{cap.title}</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
