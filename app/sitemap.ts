import type { MetadataRoute } from "next";
import { articles } from "./lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://myrarescore.com";
  const staticPages = ["", "/tests", "/are-you-rare", "/iq-test", "/morality-test", "/blog", "/press", "/share", "/faq", "/contact", "/privacy", "/terms"];
  const blogPages = articles.map((article) => `/blog/${article.slug}`);
  return [...staticPages, ...blogPages].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
