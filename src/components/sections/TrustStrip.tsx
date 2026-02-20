import { trustStats } from "@/data/homepage";

export function TrustStrip() {
  return (
    <section className="py-16 bg-ale-deep text-white">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-white/50 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="pt-10 border-t border-white/10">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30 mb-8">
            Trusted by leading organizations worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-4">
            {["SNCF", "Accor", "CHU Lyon", "Airbus", "RATP", "Hilton", "Paris La Défense", "Thales"].map((n) => (
              <span key={n} className="text-white/30 text-sm font-semibold tracking-wide hover:text-white/60 transition-opacity">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
