import Link from "next/link";
import Image from "next/image";
import { getLegalData } from "@/lib/cms";

export const metadata = {
  title: "Legal",
  description: "Legal information, privacy policy, terms of use, and cookie policy for Alcatel-Lucent Enterprise.",
};

export default async function LegalPage() {
  const legalData = await getLegalData();
  return (
    <>
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image src="https://web-assets.al-enterprise.com/-/media/assets/internet/images/company-page-history-executive-homepage-header-l2-l3-1440x600-v3.jpg?h=600&w=1440" alt="Legal" fill className="object-cover animate-ken-burns" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 w-full pb-14 pt-40">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Legal
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl font-light">
            Legal information, policies, and compliance resources for Alcatel-Lucent Enterprise.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {legalData.map((page) => (
              <Link
                key={page.slug}
                href={`/legal/${page.slug}`}
                className="group p-6 rounded-xl border border-light-200 hover:border-ale-200 hover:shadow-md transition-all"
              >
                <h2 className="text-lg font-bold text-text group-hover:text-ale transition-colors mb-2">
                  {page.name}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {page.sections[0].content.slice(0, 150)}...
                </p>
                <p className="text-xs text-text-muted mt-3">
                  Last updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
