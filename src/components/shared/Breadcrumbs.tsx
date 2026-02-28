import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <BreadcrumbJsonLd items={allItems.map((i) => ({ name: i.label, href: i.href }))} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-6 pt-4 pb-0">
        <ol className="flex items-center gap-1.5 text-[11px] text-text-muted">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              {i < allItems.length - 1 ? (
                <Link href={item.href} className="hover:text-text transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-text font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
