import type { VehicleDetail } from "@/lib/api";
import { fullUrl, seoConfig } from "@/lib/seo-config";

type Props = {
  vehicle: VehicleDetail;
  vehicleId: string;
};

/**
 * Vehicle + BreadcrumbList JSON-LD for VDP. Rendered only when vehicle exists.
 */
export function VdpStructuredData({ vehicle, vehicleId }: Props) {
  const name =
    vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`;
  const vdpUrl = fullUrl(`/inventory/${vehicleId}`);
  const image =
    vehicle.imageUrls?.[0] ?? vehicle.imageUrl;
  const imageUrl = image?.startsWith("http") ? image : image ? fullUrl(image.startsWith("/") ? image : `/${image}`) : undefined;

  const vehicleJson = {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${vdpUrl}#vehicle`,
    name,
    description: vehicle.description ?? `${vehicle.year} ${vehicle.make} ${vehicle.model} at ${seoConfig.siteName}.`,
    url: vdpUrl,
    ...(imageUrl && { image: imageUrl }),
    vehicleIdentificationNumber: vehicle.vin ?? undefined,
    vehicleModelDate: vehicle.year,
    brand: { "@type": "Brand", name: vehicle.make },
    vehicleConfiguration: vehicle.trim ?? undefined,
    mileageFromOdometer: vehicle.mileage
      ? { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "SMI" }
      : undefined,
    vehicleCondition: vehicle.condition === "new" ? "https://schema.org/NewCondition" : vehicle.condition === "used" ? "https://schema.org/UsedCondition" : undefined,
    offers: vehicle.price
      ? { "@type": "Offer", price: vehicle.price, priceCurrency: "USD" }
      : undefined,
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: fullUrl("/") },
      { "@type": "ListItem", position: 2, name: "Inventory", item: fullUrl("/inventory") },
      { "@type": "ListItem", position: 3, name, item: vdpUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
    </>
  );
}
