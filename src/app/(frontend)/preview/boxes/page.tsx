import Link from "next/link";

const capabilities = [
  { title: "Auto-Fabric", description: "SPB-based fabric automatically discovers topology, assigns addresses, and creates optimal forwarding paths — no manual VLAN configuration required." },
  { title: "Zero-Touch Provisioning", description: "New switches and access points automatically download configuration and firmware upon connection, eliminating truck rolls." },
  { title: "Predictive Analytics", description: "AI/ML engines analyze network behavior patterns to predict and prevent issues before they impact users or applications." },
  { title: "Self-Healing", description: "Automated failover, dynamic rerouting, and sub-second recovery ensure continuous network availability without manual intervention." },
];

export default function BoxesPreview() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="mx-auto max-w-[1320px] flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-900">Capability Boxes — 8 Style Options</h1>
          <Link href="/" className="text-xs font-semibold text-gray-400 hover:text-gray-600">← Home</Link>
        </div>
      </div>

      {/* ─── OPTION A: Subtle left border + gray number ─── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option A</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Thin left accent + muted number</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 border-l-[3px] border-l-gray-300 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-gray-200 leading-none mt-0.5 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{cap.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPTION B: Clean white, bottom line accent ─── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option B</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Minimal card + subtle bottom accent</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs font-bold text-gray-300 tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">{cap.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPTION C: Icon-style dot + monochrome ─── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option C</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Dark number circle + clean card</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{cap.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPTION D: Large watermark number + horizontal divider ─── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option D</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Large watermark number + divider</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group relative bg-gray-50 rounded-2xl p-7 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                {/* Watermark number */}
                <span className="absolute top-3 right-5 text-6xl font-black text-gray-100 group-hover:text-gray-200 transition-colors select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{cap.title}</h3>
                  <div className="w-8 h-0.5 bg-gray-300 rounded-full mb-3" />
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ─── OPTION E: Top number bar, no color ─── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option E</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Top gray bar with number + title inside</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-gray-100 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <div className="h-5 w-px bg-gray-300 rounded-full" />
                  <h3 className="text-base font-bold text-gray-900">{cap.title}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPTION F: Outlined card, top-left number ─── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option F</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Dashed outline + floating number badge</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div key={i} className="group relative border border-dashed border-gray-200 rounded-2xl p-6 pt-8 hover:border-gray-400 hover:shadow-sm transition-all duration-300">
                <span className="absolute -top-3.5 left-5 bg-white px-3 text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPTION G: Card with top thin line + stacked layout ─── */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option G</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Top thin line + vertical layout</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="h-1 bg-gray-200" />
                <div className="p-6">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-bold text-gray-900 mt-2 mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPTION H: Side number stripe + elevated card ─── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option H</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Side number stripe + shadow card</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <div key={i} className="flex rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-14 bg-gray-900 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-white -rotate-90 whitespace-nowrap">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
