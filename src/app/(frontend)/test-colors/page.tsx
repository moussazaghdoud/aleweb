import Image from "next/image";

const heroImg = "https://web-assets.al-enterprise.com/-/media/assets/internet/images/omnipcx-enterprise-communication-server-header-image-v2.jpg?h=600&w=1440";
const stats = [{ s: "99.999%", l: "uptime" }, { s: "100+", l: "countries" }, { s: "300K", l: "users" }, { s: "Defense", l: "grade" }];
const iconSvg = <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>;

export default function TestColorsPage() {
  return (
    <div className="pt-[60px]">
      <div className="bg-white py-10 text-center border-b border-light-200">
        <h1 className="text-3xl font-extrabold text-text">Color Scheme Comparison</h1>
        <p className="text-text-secondary mt-2">Scroll to compare all 4 options — each has navbar, hero with photo, stats, buttons, and cards</p>
      </div>

      {/* ═══════ OPTION A — ALE Blue + White ═══════ */}
      <section className="border-b-4 border-blue-500">
        <div className="bg-blue-50 py-4 px-6 text-center">
          <span className="text-sm font-extrabold text-blue-700 uppercase tracking-widest">Option A — ALE Blue + White</span>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-[1320px] px-6 flex h-[56px] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><span className="text-white text-xs font-bold">ALE</span></div>
              <span className="font-bold text-gray-900 text-sm">Alcatel-Lucent Enterprise</span>
            </div>
            <div className="flex items-center gap-6">
              {["Industries","Solutions","Platform","Services"].map(l => <span key={l} className={`text-sm font-medium ${l==="Platform"?"text-blue-600":"text-gray-600"}`}>{l}</span>)}
              <button className="h-9 px-5 bg-blue-600 text-white text-xs font-semibold rounded-full">Contact Us</button>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] flex items-end overflow-hidden">
          <Image src={heroImg} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-blue-900/10" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-10 pt-24">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/25 backdrop-blur flex items-center justify-center text-blue-300">{iconSvg}</div>
              <h2 className="text-3xl font-extrabold text-white">OmniPCX Enterprise</h2>
            </div>
            <p className="text-base text-blue-100/70 max-w-xl">Enterprise communication server for mission-critical unified communications</p>
          </div>
        </div>
        <div className="py-8 bg-slate-900">
          <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-4 gap-6">
            {stats.map((item,i) => <div key={i} className="text-center"><div className="text-xl font-extrabold text-white">{item.s}</div><div className="text-xs text-slate-400 mt-1">{item.l}</div></div>)}
          </div>
        </div>
        <div className="py-10 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="h-11 px-7 bg-blue-600 text-white text-sm font-semibold rounded-full">Request a Demo</button>
              <button className="h-11 px-7 bg-white border-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-full">View Products</button>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-50 text-blue-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Cloud</span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {["Carrier-Grade Reliability","Unified Communications"].map((t,i) => (
                <div key={i} className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3"><span className="text-blue-600 font-bold text-sm">{String(i+1).padStart(2,"0")}</span></div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t}</h3>
                  <p className="text-xs text-gray-500">99.999% availability with redundant architecture</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OPTION B — Dark Navy + Teal ═══════ */}
      <section className="border-b-4 border-teal-500">
        <div className="bg-teal-50 py-4 px-6 text-center">
          <span className="text-sm font-extrabold text-teal-700 uppercase tracking-widest">Option B — Dark Navy + Teal</span>
        </div>
        <div className="bg-slate-950 border-b border-slate-800">
          <div className="mx-auto max-w-[1320px] px-6 flex h-[56px] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center"><span className="text-white text-xs font-bold">ALE</span></div>
              <span className="font-bold text-white text-sm">Alcatel-Lucent Enterprise</span>
            </div>
            <div className="flex items-center gap-6">
              {["Industries","Solutions","Platform","Services"].map(l => <span key={l} className={`text-sm font-medium ${l==="Platform"?"text-teal-400":"text-slate-400"}`}>{l}</span>)}
              <button className="h-9 px-5 bg-teal-500 text-white text-xs font-semibold rounded-full">Contact Us</button>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] flex items-end overflow-hidden">
          <Image src={heroImg} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/20" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-10 pt-24">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 backdrop-blur flex items-center justify-center text-teal-400">{iconSvg}</div>
              <h2 className="text-3xl font-extrabold text-white">OmniPCX Enterprise</h2>
            </div>
            <p className="text-base text-teal-100/60 max-w-xl">Enterprise communication server for mission-critical unified communications</p>
          </div>
        </div>
        <div className="py-8 bg-slate-950 border-t border-teal-500/10">
          <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-4 gap-6">
            {stats.map((item,i) => <div key={i} className="text-center"><div className="text-xl font-extrabold text-teal-400">{item.s}</div><div className="text-xs text-slate-500 mt-1">{item.l}</div></div>)}
          </div>
        </div>
        <div className="py-10 bg-slate-950">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="h-11 px-7 bg-teal-500 text-white text-sm font-semibold rounded-full">Request a Demo</button>
              <button className="h-11 px-7 border-2 border-teal-500 text-teal-400 text-sm font-semibold rounded-full">View Products</button>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-teal-500/10 text-teal-400"><span className="w-1.5 h-1.5 rounded-full bg-teal-400" />Cloud</span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {["Carrier-Grade Reliability","Unified Communications"].map((t,i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-800 bg-slate-900 hover:border-teal-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3"><span className="text-teal-400 font-bold text-sm">{String(i+1).padStart(2,"0")}</span></div>
                  <h3 className="text-sm font-bold text-white mb-1">{t}</h3>
                  <p className="text-xs text-slate-400">99.999% availability with redundant architecture</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OPTION C — Purple Heavy (current) ═══════ */}
      <section className="border-b-4 border-purple-500">
        <div className="bg-purple-50 py-4 px-6 text-center">
          <span className="text-sm font-extrabold text-purple-700 uppercase tracking-widest">Option C — Purple Heavy (current site)</span>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-[1320px] px-6 flex h-[56px] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center"><span className="text-white text-xs font-bold">ALE</span></div>
              <span className="font-bold text-gray-900 text-sm">Alcatel-Lucent Enterprise</span>
            </div>
            <div className="flex items-center gap-6">
              {["Industries","Solutions","Platform","Services"].map(l => <span key={l} className={`text-sm font-medium ${l==="Platform"?"text-purple-700":"text-gray-600"}`}>{l}</span>)}
              <button className="h-9 px-5 bg-purple-700 text-white text-xs font-semibold rounded-full">Contact Us</button>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] flex items-end overflow-hidden">
          <Image src={heroImg} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/50 to-purple-900/20" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-10 pt-24">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/20 backdrop-blur flex items-center justify-center text-purple-300">{iconSvg}</div>
              <h2 className="text-3xl font-extrabold text-white">OmniPCX Enterprise</h2>
            </div>
            <p className="text-base text-purple-100/60 max-w-xl">Enterprise communication server for mission-critical unified communications</p>
          </div>
        </div>
        <div className="py-8 bg-purple-950">
          <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-4 gap-6">
            {stats.map((item,i) => <div key={i} className="text-center"><div className="text-xl font-extrabold text-white">{item.s}</div><div className="text-xs text-purple-300/50 mt-1">{item.l}</div></div>)}
          </div>
        </div>
        <div className="py-10 bg-white">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="h-11 px-7 bg-purple-700 text-white text-sm font-semibold rounded-full">Request a Demo</button>
              <button className="h-11 px-7 bg-white border-2 border-purple-700 text-purple-700 text-sm font-semibold rounded-full">View Products</button>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-purple-50 text-purple-700"><span className="w-1.5 h-1.5 rounded-full bg-purple-600" />Cloud</span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {["Carrier-Grade Reliability","Unified Communications"].map((t,i) => (
                <div key={i} className="p-5 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center mb-3"><span className="text-purple-700 font-bold text-sm">{String(i+1).padStart(2,"0")}</span></div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t}</h3>
                  <p className="text-xs text-gray-500">99.999% availability with redundant architecture</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OPTION D — Purple Light & Airy ═══════ */}
      <section className="border-b-4 border-violet-400">
        <div className="bg-violet-50 py-4 px-6 text-center">
          <span className="text-sm font-extrabold text-violet-600 uppercase tracking-widest">Option D — Purple Light & Airy (recommended)</span>
        </div>
        <div className="bg-white border-b border-violet-100">
          <div className="mx-auto max-w-[1320px] px-6 flex h-[56px] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center"><span className="text-white text-xs font-bold">ALE</span></div>
              <span className="font-bold text-gray-900 text-sm">Alcatel-Lucent Enterprise</span>
            </div>
            <div className="flex items-center gap-6">
              {["Industries","Solutions","Platform","Services"].map(l => <span key={l} className={`text-sm font-medium ${l==="Platform"?"text-violet-600":"text-gray-500"}`}>{l}</span>)}
              <button className="h-9 px-5 bg-violet-600 text-white text-xs font-semibold rounded-full">Contact Us</button>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] flex items-end overflow-hidden">
          <Image src={heroImg} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/25 to-violet-900/5" />
          <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-10 pt-24">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white">{iconSvg}</div>
              <h2 className="text-3xl font-extrabold text-white">OmniPCX Enterprise</h2>
            </div>
            <p className="text-base text-white/75 max-w-xl">Enterprise communication server for mission-critical unified communications</p>
          </div>
        </div>
        <div className="py-7 bg-violet-600">
          <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-4 gap-6">
            {stats.map((item,i) => <div key={i} className="text-center"><div className="text-xl font-extrabold text-white">{item.s}</div><div className="text-xs text-violet-200 mt-1">{item.l}</div></div>)}
          </div>
        </div>
        <div className="py-10 bg-gray-50">
          <div className="mx-auto max-w-[1320px] px-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="h-11 px-7 bg-violet-600 text-white text-sm font-semibold rounded-full">Request a Demo</button>
              <button className="h-11 px-7 bg-white border border-violet-200 text-violet-700 text-sm font-semibold rounded-full">View Products</button>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-violet-100 text-violet-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Cloud</span>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {["Carrier-Grade Reliability","Unified Communications"].map((t,i) => (
                <div key={i} className="p-5 rounded-xl border border-gray-200 bg-white hover:border-violet-300 hover:shadow-sm transition-all">
                  <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center mb-3"><span className="text-violet-600 font-bold text-sm">{String(i+1).padStart(2,"0")}</span></div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t}</h3>
                  <p className="text-xs text-gray-500">99.999% availability with redundant architecture</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
