import { seoConfig } from "@/lib/seo-config";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";

/**
 * Organization + AutoDealer JSON-LD for the site. Rendered in root layout.
 */
export function OrganizationStructuredData() {
  const [addressLocality, addressRegionPostalCode = ""] =
    seoConfig.organization.cityStateZip.split(", ");
  const [addressRegion = "", postalCode = ""] = addressRegionPostalCode.split(" ");

  const openingHoursSpecification = PUBLIC_BUSINESS_INFO.hours.flatMap((slot) =>
    slot.days.map((dayOfWeek) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    }))
  );

  const json = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.organization.name,
    description: seoConfig.defaultDescription,
    url: seoConfig.organization.url,
    slogan: seoConfig.organization.tagline,
    email: seoConfig.organization.email,
    ...(PUBLIC_BUSINESS_INFO.phone && { telephone: PUBLIC_BUSINESS_INFO.phone }),
    logo: seoConfig.organization.logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: seoConfig.organization.addressLine1,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: PUBLIC_BUSINESS_INFO.geo.latitude,
      longitude: PUBLIC_BUSINESS_INFO.geo.longitude,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${seoConfig.localSeo.region}, ${seoConfig.localSeo.state}`,
    },
    openingHoursSpecification,
    identifier: seoConfig.organization.dealerLicenseDisplay,
    ...(PUBLIC_BUSINESS_INFO.googleBusinessProfileUrl && {
      sameAs: [PUBLIC_BUSINESS_INFO.googleBusinessProfileUrl],
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
