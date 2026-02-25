import { HeroHomepage } from "@/components/heroes/HeroHomepage";
import { QuickNav } from "@/components/sections/QuickNav";
import { AdminEditGlobal } from "@/components/admin/AdminEditGlobal";
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
