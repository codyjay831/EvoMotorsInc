import { seoConfig } from "@/lib/seo-config";

/**
 * Organization + AutoDealer JSON-LD for the site. Rendered in root layout.
 */
export function OrganizationStructuredData() {
  const [addressLocality, addressRegionPostalCode = ""] =
    seoConfig.organization.cityStateZip.split(", ");
  const [addressRegion = "", postalCode = ""] = addressRegionPostalCode.split(" ");

  const json = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.organization.name,
    description: seoConfig.defaultDescription,
    url: seoConfig.organization.url,
    slogan: seoConfig.organization.tagline,
    email: seoConfig.organization.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: seoConfig.organization.addressLine1,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "US",
    },
    identifier: seoConfig.organization.dealerLicenseDisplay,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
