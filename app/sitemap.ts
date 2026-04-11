import type { MetadataRoute } from "next";
import { getInventory } from "@/lib/api";
import { fullUrl } from "@/lib/seo-config";

export const dynamic = "force-dynamic";

/**
 * Sitemap for the public website. Includes static pages and vehicle detail pages
 * from the current data layer (mock or API). Structure is ready for real API-backed generation.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = fullUrl("");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/inventory`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/ev-charging`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/request-vehicle`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  let vdpEntries: MetadataRoute.Sitemap = [];
  try {
    const { vehicles } = await getInventory({ page: 1, limit: 500 });
    vdpEntries = vehicles.map((v) => ({
      url: `${base}/inventory/${v.id}`,
      lastModified: v.listedAt ? new Date(v.listedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Prerender/export (e.g. Firebase App Hosting) often cannot reach Vehiclix; keep static URLs only.
  }

  return [...staticPages, ...vdpEntries];
}
