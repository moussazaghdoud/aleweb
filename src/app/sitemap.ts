import { MetadataRoute } from "next";
import { industriesData } from "@/data/industries";
import { industrySubPagesData } from "@/data/industry-subpages";
import { solutionsData } from "@/data/solutions";
import { platformData } from "@/data/platform";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { blogData } from "@/data/blog";
import { legalData } from "@/data/legal";
import { productCategories, catalogProducts } from "@/data/products-catalog";

const BASE_URL = "https://www.al-enterprise.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/industries",
    "/solutions",
    "/platform",
    "/products",
    "/partners",
    "/company",
    "/services",
    "/blog",
    "/resources",
    "/support",
    "/developers",
    "/customers/case-studies",
    "/legal",
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Industries
  industriesData.forEach((ind) => {
    entries.push({
      url: `${BASE_URL}/industries/${ind.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Industry sub-pages
  industrySubPagesData.forEach((sp) => {
    entries.push({
      url: `${BASE_URL}/industries/${sp.parentSlug}/${sp.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Solutions
  solutionsData.forEach((sol) => {
    entries.push({
      url: `${BASE_URL}/solutions/${sol.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Platform/Products (flagship)
  platformData.forEach((prod) => {
    entries.push({
      url: `${BASE_URL}/platform/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Product catalog categories
  productCategories.forEach((cat) => {
    entries.push({
      url: `${BASE_URL}/products/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Product catalog individual products
  catalogProducts.forEach((prod) => {
    entries.push({
      url: `${BASE_URL}/products/${prod.category}/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // Company
  companyData.forEach((page) => {
    entries.push({
      url: `${BASE_URL}/company/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Services
  servicesData.forEach((svc) => {
    entries.push({
      url: `${BASE_URL}/services/${svc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Blog
  blogData.forEach((post) => {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  // Legal
  legalData.forEach((page) => {
    entries.push({
      url: `${BASE_URL}/legal/${page.slug}`,
      lastModified: new Date(page.lastUpdated),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  });

  return entries;
}
