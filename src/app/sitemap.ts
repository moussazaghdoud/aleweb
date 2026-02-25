import { MetadataRoute } from "next";

// Static data imports (fallback)
import { industriesData } from "@/data/industries";
import { industrySubPagesData } from "@/data/industry-subpages";
import { solutionsData } from "@/data/solutions";
import { platformData } from "@/data/platform";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { blogData } from "@/data/blog";
import { legalData } from "@/data/legal";
import { productCategories, catalogProducts } from "@/data/products-catalog";

// CMS data fetchers
import {
  getAllIndustries,
  getAllSolutions,
  getAllPlatforms,
  getAllProducts,
  getAllServices,
  getAllBlogPosts,
  getAllCompanyPages,
  getAllLegalPages,
} from "@/lib/payload";

const BASE_URL = "https://www.al-enterprise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    // Try CMS-sourced data first
    const [industries, solutions, platforms, products, services, blogPosts, companyPages, legalPages] =
      await Promise.all([
        getAllIndustries(),
        getAllSolutions(),
        getAllPlatforms(),
        getAllProducts(),
        getAllServices(),
        getAllBlogPosts(),
        getAllCompanyPages(),
        getAllLegalPages(),
      ]);

    industries.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/industries/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    solutions.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/solutions/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    platforms.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/platform/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    products.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/products/${doc.category}/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });

    services.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/services/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    blogPosts.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/blog/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    });

    companyPages.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/company/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    legalPages.forEach((doc: any) => {
      entries.push({
        url: `${BASE_URL}/legal/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    });
  } catch {
    // Fallback to static data if CMS is unavailable
    industriesData.forEach((ind) => {
      entries.push({
        url: `${BASE_URL}/industries/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    industrySubPagesData.forEach((sp) => {
      entries.push({
        url: `${BASE_URL}/industries/${sp.parentSlug}/${sp.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    solutionsData.forEach((sol) => {
      entries.push({
        url: `${BASE_URL}/solutions/${sol.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    platformData.forEach((prod) => {
      entries.push({
        url: `${BASE_URL}/platform/${prod.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    productCategories.forEach((cat) => {
      entries.push({
        url: `${BASE_URL}/products/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    catalogProducts.forEach((prod) => {
      entries.push({
        url: `${BASE_URL}/products/${prod.category}/${prod.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });

    companyData.forEach((page) => {
      entries.push({
        url: `${BASE_URL}/company/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    servicesData.forEach((svc) => {
      entries.push({
        url: `${BASE_URL}/services/${svc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    blogData.forEach((post) => {
      entries.push({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    });

    legalData.forEach((page) => {
      entries.push({
        url: `${BASE_URL}/legal/${page.slug}`,
        lastModified: new Date(page.lastUpdated),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    });
  }

  return entries;
}
