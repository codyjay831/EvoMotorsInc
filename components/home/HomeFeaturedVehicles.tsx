import Link from "next/link";
import type { VehicleSummary } from "@/lib/api";
import { FeaturedVehicleCard } from "./FeaturedVehicleCard";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { cn } from "@/lib/utils";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";

type HomeFeaturedVehiclesProps = {
  vehicles: VehicleSummary[];
  className?: string;
  loadError?: boolean;
};

const INVENTORY_PANEL =
  "evo-home-section evo-home-panel py-10 sm:py-12 lg:py-14 px-6 sm:px-8";

function getInventoryGridClass(count: number): string {
  if (count === 1) return "grid grid-cols-1 gap-6 max-w-lg mx-auto";
  if (count === 2) return "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 max-w-4xl mx-auto";
  return "grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8";
}

export function HomeFeaturedVehicles({
  vehicles,
  className,
  loadError = false,
}: HomeFeaturedVehiclesProps) {
  const list = vehicles.slice(0, 6);

  if (loadError) {
    return (
      <section
        id="inventory"
        className={cn(INVENTORY_PANEL, className)}
        aria-label="Inventory unavailable"
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-muted/30 py-12 px-6 text-center">
          <h2 className="evo-section-heading text-foreground">Inventory temporarily unavailable</h2>
          <p className="evo-body text-muted-foreground mt-4">
            We couldn&apos;t load vehicles right now. Please try again in a moment or contact us directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground evo-focus-ring"
            >
              Refresh page
            </Link>
            <a
              href={`mailto:${PUBLIC_BUSINESS_INFO.email}`}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/80 evo-focus-ring"
            >
              Email {PUBLIC_BUSINESS_INFO.contactName}
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (list.length === 0) {
    return (
      <section id="inventory" className={cn(INVENTORY_PANEL, className)} aria-label="Inventory">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-muted/30 py-12 px-6 text-center">
          <h2 className="evo-section-heading text-foreground">{PUBLIC_BUSINESS_INFO.inventoryEmptyHeading}</h2>
          <p className="evo-body text-muted-foreground mt-4">{PUBLIC_BUSINESS_INFO.inventoryEmptyBody}</p>
          <a
            href={`mailto:${PUBLIC_BUSINESS_INFO.email}`}
            className="inline-flex mt-8 h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring"
          >
            {PUBLIC_BUSINESS_INFO.email}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="inventory" className={cn(INVENTORY_PANEL, className)} aria-label="Available vehicles">
      <HomeSectionHeader
        eyebrow="Curated inventory"
        title={list.length === 1 ? "1 EV available now" : `${list.length} EVs available now`}
        description="Hand-picked used EVs available now. Small inventory, selected intentionally for quality and daily usability."
        action={
          <Link
            href="/inventory"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background/50 px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/25 hover:bg-background evo-focus-ring shrink-0"
          >
            View full inventory →
          </Link>
        }
      />

      <div className={getInventoryGridClass(list.length)}>
        {list.map((v, i) => (
          <FeaturedVehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </section>
  );
}
