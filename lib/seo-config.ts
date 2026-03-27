/**
 * Centralized SEO and metadata config for the Evo Motors website.
 * Use for root layout metadata, page metadata, canonicals, and OG images.
 *
 * Expected env:
 * - NEXT_PUBLIC_SITE_URL – Canonical base URL (e.g. https://evomotorsinc.com).
 *   Used for metadataBase, canonicals, sitemap, and OG URLs. Default allows build without env.
 */

import { SITE } from "./site-config";
import { PUBLIC_BUSINESS_INFO } from "./public-business-info";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://evomotorsinc.com";

export const seoConfig = {
  /** Site name for titles and branding. */
  siteName: SITE.name,
  /** Default page title when no override. */
  defaultTitle: `${SITE.name} – ${SITE.tagline}`,
  /** Title template: %s is replaced by the page title. */
  titleTemplate: `%s | ${SITE.name}`,
  /** Default meta description. */
  defaultDescription:
    "Premium electric vehicles at Evo Motors. New and used EVs, transparent pricing, and expert guidance. Browse inventory and find your next electric vehicle.",
  /** Canonical base URL (no trailing slash). */
  siteUrl: SITE_URL,
  /**
   * Default OG image path (from /public). Used when no page-specific image.
   * TODO: Add a real og-default.png (1200x630) for production.
   */
  defaultOgImagePath: "/og-default.png",
  /** Optional social handles for future use. */
  social: {
    // twitterHandle: "@evomotors",
    // facebookAppId: "",
  },
  /** Dealer/business identity for structured data. */
  organization: {
    name: SITE.name,
    tagline: SITE.tagline,
    url: SITE_URL,
    email: PUBLIC_BUSINESS_INFO.email,
    addressLine1: PUBLIC_BUSINESS_INFO.addressLine1,
    cityStateZip: PUBLIC_BUSINESS_INFO.cityStateZip,
    dealerLicenseDisplay: PUBLIC_BUSINESS_INFO.dealerLicenseDisplay,
    // logo: `${SITE_URL}${SITE.logoPath}`,
  },
} as const;

/**
 * Build full URL for a path (canonical, sitemap, etc.).
 */
export function fullUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.siteUrl}${p}`;
}

/**
 * Build full URL for OG image. Pass path from public (e.g. /og-default.png) or absolute URL.
 */
export function ogImageUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${seoConfig.siteUrl}${p}`;
}

