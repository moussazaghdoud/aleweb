import Link from "next/link";
import { wlanComparison } from "@/data/product-comparisons";

export const metadata = {
  title: "Stellar AP Comparison Tool | Products",
  description:
    "Compare specifications across the Stellar AP portfolio. Side-by-side feature comparison for Wi-Fi 7, Wi-Fi 6E, and Wi-Fi 6 access points.",
  alternates: {
    canonical: "/products/wlan/comparison",
    languages: {
      en: "/products/wlan/comparison",
      fr: "/fr/products/wlan/comparison",
      "x-default": "/products/wlan/comparison",
    },
  },
};

export default function WlanComparisonPage() {
  const comparison = wlanComparison;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[340px] flex items-end overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-ale-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(75,0,130,0.15),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <Link
            href="/products/wlan"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to WLAN
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Stellar AP Comparison Tool
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light leading-relaxed">
            Compare key specifications side by side across the Stellar access
            point portfolio to find the right AP for your deployment.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-light-50">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="text-2xl font-extrabold text-text tracking-tight mb-2">
            {comparison.heading}
          </h2>
          <p className="text-sm text-text-muted mb-8">
            Compare key specifications across the WLAN portfolio
          </p>
          <div className="overflow-x-auto rounded-2xl border border-light-200 bg-white">
            <table className="w-full border-collapse text-sm min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-light-200 bg-light-50">
                  <th className="text-left py-4 px-5 font-semibold text-text sticky left-0 bg-light-50 z-10 min-w-[160px]">
                    Feature
                  </th>
                  {comparison.products.map((name, i) => (
                    <th
                      key={name}
                      className="text-center py-4 px-3 font-semibold text-text min-w-[100px]"
                    >
                      <Link
                        href={`/products/wlan/${comparison.productSlugs[i]}`}
                        className="text-ale hover:text-ale-dark transition-colors"
                      >
                        {name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.specs.map((spec) => (
                  <tr
                    key={spec.feature}
                    className="border-b border-light-100 hover:bg-light-50/50"
                  >
                    <td className="py-3 px-5 font-medium text-text sticky left-0 bg-white z-10">
                      {spec.feature}
                    </td>
                    {spec.values.map((val, i) => (
                      <td
                        key={i}
                        className="py-3 px-3 text-center text-text-secondary"
                      >
                        {val === "true" ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        ) : val === "false" ? (
                          <span className="text-light-300">&mdash;</span>
                        ) : (
                          <span className="text-xs font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Back link + CTA */}
      <section className="py-16 bg-ale">
        <div className="mx-auto max-w-[1320px] px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Need help choosing?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
            Our specialists can help you find the right access point for your
            environment and requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/company/contact"
              className="inline-flex items-center h-12 px-7 bg-ale text-white text-sm font-semibold rounded-full hover:bg-ale-dark transition-all"
            >
              Contact a Specialist
            </Link>
            <Link
              href="/products/wlan"
              className="inline-flex items-center h-12 px-7 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Back to WLAN
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
