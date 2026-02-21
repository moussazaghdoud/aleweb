import { getBlogData } from "@/lib/cms";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog",
  description:
    "Insights, trends, and expertise from Alcatel-Lucent Enterprise — covering networking, communications, AI, cloud, and digital transformation.",
};

const blogCategories = [
  "All",
  "Digital Age Communications",
  "Digital Age Networking",
  "Artificial Intelligence",
  "Healthcare",
  "Education",
  "Hospitality",
  "Government",
  "Transportation",
  "ESG",
  "Product",
  "Rainbow",
];

export default async function BlogPage() {
  const blogData = await getBlogData();
  return <BlogClient blogData={blogData} blogCategories={blogCategories} />;
}
