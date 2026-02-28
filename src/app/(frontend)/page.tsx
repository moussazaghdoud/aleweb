import { HeroHomepage } from "@/components/heroes/HeroHomepage";
import { QuickNav } from "@/components/sections/QuickNav";
import { AdminEditGlobal } from "@/components/admin/AdminEditGlobal";
import { getHomepage } from "@/lib/payload";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alcatel-Lucent Enterprise | Digital Age Networking & Communications",
  description:
    "ALE delivers enterprise networking, communications, and cloud solutions to 830,000+ customers in 100+ countries. Modernize with OmniSwitch, Rainbow, Stellar Wi-Fi, and more.",
  openGraph: {
    title: "Alcatel-Lucent Enterprise | Digital Age Networking & Communications",
    description:
      "Enterprise networking, communications, and cloud solutions for 830,000+ customers worldwide.",
    type: "website",
    url: "/",
  },
};

export default async function Home() {
  let homepage: Awaited<ReturnType<typeof getHomepage>> | null = null;
  try {
    homepage = await getHomepage();
  } catch {
    // CMS unavailable — use static defaults
  }

  return (
    <>
      <AdminEditGlobal globalSlug="homepage" />
      <HeroHomepage
        heading={homepage?.heroHeading}
        subheading={homepage?.heroSubheading}
        videoUrl={homepage?.heroVideoUrl}
        ctaButtons={homepage?.heroCtaButtons}
      />
      <QuickNav />
    </>
  );
}
