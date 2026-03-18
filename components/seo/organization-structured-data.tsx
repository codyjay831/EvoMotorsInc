import { seoConfig } from "@/lib/seo-config";

/**
 * Organization + AutoDealer JSON-LD for the site. Rendered in root layout.
 */
export function OrganizationStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.organization.name,
    description: seoConfig.defaultDescription,
    url: seoConfig.organization.url,
    slogan: seoConfig.organization.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
