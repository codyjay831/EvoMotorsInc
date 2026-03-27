import type { Metadata } from "next";
import { Section, PageHeader, DevPreviewBanner, SiteContainer } from "@/components/layout";
import { SectionHeading, SurfaceCard, Badge } from "@/components/website";
import {
  getDealer,
  getFeaturedVehicles,
  getInventory,
  getVehicle,
  useMockData,
} from "@/lib/api";

export const metadata: Metadata = {
  title: "Data preview",
  robots: { index: false, follow: false },
};

export default async function DataPreviewPage() {
  const [dealer, featured, inventory, vehicleDetail] = await Promise.all([
    getDealer(),
    getFeaturedVehicles(4),
    getInventory({ limit: 6 }),
    getVehicle("v1"),
  ]);

  return (
    <>
      <DevPreviewBanner />
      <SiteContainer>
      <Section>
      <div className="space-y-16">
        <header>
          <PageHeader
            title="Data preview"
            description="Inspection of API layer and types. Uses fallback data mode when NEXT_PUBLIC_VEHICLIX_API_URL is unset."
          />
          <p className="evo-muted mt-2">
            Mode: {useMockData ? "Fallback data mode" : "Live API"}
          </p>
        </header>

        {/* Dealer */}
        <section className="space-y-4">
          <SectionHeading eyebrow="Dealer">Dealer</SectionHeading>
          <SurfaceCard variant="default" className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="evo-muted text-xs">name</p>
                <p className="evo-card-title text-foreground">{dealer.name}</p>
              </div>
              <div>
                <p className="evo-muted text-xs">slug</p>
                <p className="evo-body text-foreground">{dealer.slug}</p>
              </div>
              {dealer.branding?.tagline && (
                <div className="sm:col-span-2">
                  <p className="evo-muted text-xs">branding.tagline</p>
                  <p className="evo-body text-foreground">{dealer.branding.tagline}</p>
                </div>
              )}
              {dealer.homepage && (
                <div className="sm:col-span-2 space-y-2">
                  <p className="evo-muted text-xs">homepage</p>
                  <ul className="evo-body-sm text-foreground list-disc list-inside">
                    <li>heroHeadline: {dealer.homepage.heroHeadline ?? "—"}</li>
                    <li>heroSubheadline: {dealer.homepage.heroSubheadline ?? "—"}</li>
                    <li>featuredSectionTitle: {dealer.homepage.featuredSectionTitle ?? "—"}</li>
                  </ul>
                </div>
              )}
            </div>
          </SurfaceCard>
        </section>

        {/* Featured vehicles */}
        <section className="space-y-4">
          <SectionHeading eyebrow="Featured">Featured vehicles</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <SurfaceCard key={v.id} variant="glow" className="p-4">
                <Badge variant="primary" className="mb-2">{v.condition ?? "—"}</Badge>
                <p className="evo-card-title text-foreground">{v.displayName ?? `${v.year} ${v.make} ${v.model}`}</p>
                <p className="evo-muted mt-1">{v.priceDisplay ?? "—"} · {v.mileageDisplay ?? "—"}</p>
                {v.rangeMiles != null && (
                  <p className="evo-muted text-xs mt-1">Range: {v.rangeMiles} mi</p>
                )}
              </SurfaceCard>
            ))}
          </div>
        </section>

        {/* Inventory list */}
        <section className="space-y-4">
          <SectionHeading eyebrow="Inventory">Inventory (first page)</SectionHeading>
          <p className="evo-muted">Total: {inventory.total} · Page {inventory.page}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inventory.vehicles.map((v) => (
              <SurfaceCard key={v.id} variant="muted" className="p-4">
                <p className="evo-card-title text-foreground">{v.displayName ?? `${v.year} ${v.make} ${v.model}`}</p>
                <p className="evo-muted mt-1">{v.stockNumber ?? v.id} · {v.priceDisplay ?? "—"}</p>
              </SurfaceCard>
            ))}
          </div>
        </section>

        {/* One vehicle detail (VDP) */}
        <section className="space-y-4">
          <SectionHeading eyebrow="Vehicle detail (VDP)">Single vehicle</SectionHeading>
          {vehicleDetail ? (
            <SurfaceCard variant="default" className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="evo-card-title text-foreground">{vehicleDetail.displayName ?? `${vehicleDetail.year} ${vehicleDetail.make} ${vehicleDetail.model}`}</p>
                  <p className="evo-muted">{vehicleDetail.stockNumber} · VIN: {vehicleDetail.vin ?? "—"}</p>
                </div>
                <p className="evo-body text-muted-foreground">{vehicleDetail.description ?? "—"}</p>
                {vehicleDetail.features && vehicleDetail.features.length > 0 && (
                  <div>
                    <p className="evo-muted text-xs mb-2">Features</p>
                    <ul className="evo-body-sm text-foreground list-disc list-inside">
                      {vehicleDetail.features.slice(0, 5).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  <p className="evo-muted text-xs">Range</p>
                  <p className="evo-body text-foreground">{vehicleDetail.rangeMiles != null ? `${vehicleDetail.rangeMiles} mi` : "—"}</p>
                  <p className="evo-muted text-xs">Battery</p>
                  <p className="evo-body text-foreground">{vehicleDetail.battery ?? "—"}</p>
                </div>
              </div>
            </SurfaceCard>
          ) : (
            <p className="evo-muted">No vehicle found for id v1.</p>
          )}
        </section>
      </div>
    </Section>
    </SiteContainer>
    </>
  );
}
