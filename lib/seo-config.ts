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

const localSeo = {
  primaryCity: "El Sobrante",
  region: "East Bay",
  state: "CA",
  serviceArea: "El Sobrante, Richmond, San Pablo, Pinole, and the greater East Bay",
} as const;

export const seoConfig = {
  siteName: SITE.name,
  defaultTitle: `${SITE.name} | ${SITE.tagline}`,
  titleTemplate: `%s | ${SITE.name}`,
  homeTitle: `EV Dealer in ${localSeo.primaryCity}, ${localSeo.state} | ${SITE.name}`,
  homeDescription: `New and used electric vehicles in ${localSeo.primaryCity} and the ${localSeo.region}. Transparent pricing, EV charging guidance, and expert support at ${SITE.name}.`,
  defaultDescription:
    "Premium electric vehicles at Evo Motors. New and used EVs, transparent pricing, and expert guidance. Browse inventory and find your next electric vehicle.",
  inventoryTitle: `Used & New EVs for Sale | ${localSeo.primaryCity}, ${localSeo.region}`,
  inventoryDescription: `Browse electric vehicles for sale in ${localSeo.primaryCity} and the ${localSeo.region}. Tesla, Rivian, Lucid, and more with transparent pricing.`,
  contactTitle: `Contact ${SITE.name} | ${localSeo.primaryCity} EV Dealer`,
  contactDescription: `Contact ${SITE.name} in ${localSeo.primaryCity}, ${localSeo.state}. Questions about EVs, financing, home charging, or our inventory.`,
  aboutTitle: `About ${SITE.name} | ${localSeo.region} Electric Vehicle Experts`,
  aboutDescription: `Learn about ${SITE.name} — your ${localSeo.region} EV dealer focused on curated inventory, charging guidance, and straightforward buying.`,
  siteUrl: SITE_URL,
  defaultOgImagePath: "/hero/tesla-hero1.webp",
  localSeo,
  social: {},
  organization: {
    name: SITE.name,
    tagline: SITE.tagline,
    url: SITE_URL,
    email: PUBLIC_BUSINESS_INFO.email,
    addressLine1: PUBLIC_BUSINESS_INFO.addressLine1,
    cityStateZip: PUBLIC_BUSINESS_INFO.cityStateZip,
    dealerLicenseDisplay: PUBLIC_BUSINESS_INFO.dealerLicenseDisplay,
    logo: `${SITE_URL}${SITE.logoPath}`,
  },
} as const;

export function fullUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.siteUrl}${p}`;
}

export function ogImageUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${seoConfig.siteUrl}${p}`;
}
