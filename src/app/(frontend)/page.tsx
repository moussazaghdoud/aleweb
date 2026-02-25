import { HeroHomepage } from "@/components/heroes/HeroHomepage";
import { QuickNav } from "@/components/sections/QuickNav";
import { getHomepage } from "@/lib/payload";

export default async function Home() {
  let homepage: Awaited<ReturnType<typeof getHomepage>> | null = null;
  try {
    homepage = await getHomepage();
  } catch {
    // CMS unavailable — use static defaults
  }

  return (
    <>
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
