import type { MetadataRoute } from "next";
import { fullUrl } from "@/lib/seo-config";

/**
 * robots.txt for the public website. Allows indexing of public pages and points to sitemap.
 * Preview/QA routes are disallowed so they are not indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth-preview", "/data-preview", "/brand-preview"],
      },
    ],
    sitemap: fullUrl("/sitemap.xml"),
  };
}
