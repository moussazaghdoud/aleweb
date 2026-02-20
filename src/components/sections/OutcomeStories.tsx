import Link from "next/link";
import { outcomeStories } from "@/data/homepage";

export function OutcomeStories() {
  return (
    <section className="py-24 bg-light-50">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ale mb-3 block">Proven Results</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
            Real impact. Measured.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {outcomeStories.map((story) => (
            <Link
              key={story.customer}
              href={story.href}
              className="group bg-white rounded-2xl p-8 border border-light-200 hover:border-ale-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl font-extrabold text-ale mb-2">{story.metric}</div>
              <div className="text-lg font-semibold text-text mb-5">{story.label}</div>
              <div className="flex items-center justify-between pt-5 border-t border-light-200">
                <div>
                  <p className="text-sm font-medium text-text">{story.customer}</p>
                  <p className="text-xs text-text-muted">{story.industry}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-ale-50 flex items-center justify-center group-hover:bg-ale group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-ale group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
