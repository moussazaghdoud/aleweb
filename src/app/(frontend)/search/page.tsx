import type { Metadata } from "next";
import { SearchPageClient } from "./SearchPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q || "";
  return {
    title: q ? `Search: ${q} | ALE` : "Search | Alcatel-Lucent Enterprise",
    description: q
      ? `Search results for "${q}" across ALE products, solutions, and more.`
      : "Search across all Alcatel-Lucent Enterprise products, solutions, industries, and resources.",
    robots: { index: false },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  return <SearchPageClient initialParams={params} />;
}
