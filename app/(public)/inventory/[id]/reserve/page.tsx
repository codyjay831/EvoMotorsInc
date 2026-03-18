import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout";
import {
  ReservationVehicleSummary,
  ReservationTrustPanel,
  ReserveFlow,
} from "@/components/reserve";
import { getVehicle } from "@/lib/api";
import { fullUrl, seoConfig, ogImageUrl } from "@/lib/seo-config";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  const title = vehicle
    ? `Reserve: ${vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}`
    : "Reserve vehicle";
  return {
    title,
    description: "Reserve this vehicle with your details. We'll contact you shortly to confirm.",
    alternates: { canonical: fullUrl(`/inventory/${id}/reserve`) },
    robots: vehicle ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${title} | ${seoConfig.siteName}`,
      description: "Reserve this vehicle. We'll contact you to confirm.",
      url: fullUrl(`/inventory/${id}/reserve`),
      images: [{ url: ogImageUrl(seoConfig.defaultOgImagePath), width: 1200, height: 630, alt: seoConfig.siteName }],
    },
  };
}

const backLinkClass =
  "evo-body-sm text-muted-foreground no-underline hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1.5 evo-focus-ring rounded-sm";

export default async function ReservePage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    return (
      <Section spacing="loose">
        <div className="evo-content-width evo-content-narrow mx-auto text-center">
          <h1 className="evo-section-heading text-foreground">Vehicle not found</h1>
          <p className="evo-body text-muted-foreground mt-4">
            This vehicle may no longer be available. Browse our inventory or contact us.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/inventory" className={backLinkClass}>
              ← Browse inventory
            </Link>
            <Link href="/contact" className={backLinkClass}>
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="default">
      <div className="evo-content-width max-w-2xl mx-auto space-y-8">
        <Link href={`/inventory/${id}`} className={backLinkClass}>
          ← Back to vehicle
        </Link>

        <header>
          <h1 className="evo-section-heading text-foreground mt-2">Reserve this vehicle</h1>
          <p className="evo-body text-muted-foreground mt-2">
            Hold it with your details. We&apos;ll contact you shortly to confirm.
          </p>
        </header>

        <ReservationVehicleSummary vehicle={vehicle} vehicleId={id} />

        <ReservationTrustPanel />

        <ReserveFlow vehicleId={id} />
      </div>
    </Section>
  );
}
