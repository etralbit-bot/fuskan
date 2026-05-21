import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getCategories, getProducts } from "@/lib/sanityData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const staticPaths: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/catalogue`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/oem-private-label`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/start-order`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/return-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPaths: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPaths: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPaths, ...categoryPaths, ...productPaths];
}
