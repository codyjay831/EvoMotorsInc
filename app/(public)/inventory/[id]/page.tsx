import type { Metadata } from "next";
import { Section } from "@/components/layout";
import {
  VehicleGallery,
  VehicleHeader,
  VehiclePricingPanel,
  VehicleHighlights,
  VehicleSpecsSection,
  VehicleDescriptionSection,
  VehicleInquiryCta,
  VehicleUnavailableState,
} from "@/components/inventory";
import { getVehicle } from "@/lib/api";
import { getPriceDisplay } from "@/lib/api/pricing";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";
import { VdpStructuredData } from "@/components/seo/vdp-structured-data";
import type { VehicleDetail } from "@/lib/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

function vdpTitle(v: VehicleDetail): string {
  const parts = [v.year, v.make, v.model];
  if (v.trim) parts.push(v.trim);
  return parts.join(" ");
}

function vdpDescription(v: VehicleDetail): string {
  const title = vdpTitle(v);
  const condition = v.condition ? ` ${v.condition}` : "";
  const priceDisplay = getPriceDisplay(v);
  const price = priceDisplay ? ` ${priceDisplay}` : "";
  const range = v.rangeMiles ? ` ${v.rangeMiles} mi range.` : ".";
  return `${title}${condition}${price}.${range} Browse our EV inventory at ${seoConfig.siteName}.`;
}

function vdpOgImage(v: VehicleDetail): string {
  const src = v.imageUrls?.[0] ?? v.imageUrl;
  if (!src) return ogImageUrl(seoConfig.defaultOgImagePath);
  return src.startsWith("http") ? src : fullUrl(src.startsWith("/") ? src : `/${src}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) {
    return {
      title: "Vehicle not found",
      robots: { index: false, follow: true },
    };
  }
  const title = vdpTitle(vehicle);
  const description = vdpDescription(vehicle);
  const canonicalUrl = fullUrl(`/inventory/${id}`);
  const imageUrl = vdpOgImage(vehicle);
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} | ${seoConfig.siteName}`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${seoConfig.siteName}`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    return (
      <Section spacing="loose">
        <VehicleUnavailableState />
      </Section>
    );
  }

  const imageUrls =
    vehicle.imageUrls?.length
      ? vehicle.imageUrls
      : vehicle.imageUrl
        ? [vehicle.imageUrl]
        : [];

  return (
    <>
      <VdpStructuredData vehicle={vehicle} vehicleId={id} />
      <Section spacing="tight">
        <div className="evo-content-width space-y-8 lg:space-y-10">
          <VehicleHeader vehicle={vehicle} />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2 space-y-6">
              <VehicleGallery
                imageUrls={imageUrls}
                alt={vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />
              <div className="block lg:hidden">
                <VehiclePricingPanel vehicle={vehicle} vehicleId={id} />
              </div>
              <VehicleHighlights vehicle={vehicle} />
            </div>
            <div className="hidden lg:block">
              <VehiclePricingPanel vehicle={vehicle} vehicleId={id} />
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="default">
        <div className="evo-content-width space-y-16">
          <VehicleSpecsSection vehicle={vehicle} />
          <VehicleDescriptionSection vehicle={vehicle} />
        </div>
      </Section>

      <Section spacing="default">
        <VehicleInquiryCta vehicleId={id} />
      </Section>
    </>
  );
}
