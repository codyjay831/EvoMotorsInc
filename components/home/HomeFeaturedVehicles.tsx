import Link from "next/link";
import type { VehicleSummary } from "@/lib/api";
import { FeaturedVehicleCard } from "./FeaturedVehicleCard";
import { cn } from "@/lib/utils";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";

type HomeFeaturedVehiclesProps = {
  vehicles: VehicleSummary[];
  className?: string;
};

export function HomeFeaturedVehicles({
  vehicles,
  className,
}: HomeFeaturedVehiclesProps) {
  const list = vehicles.slice(0, 6);

  if (list.length === 0) {
    return (
      <section
        id="inventory"
        className={cn(
          "evo-content-width relative rounded-2xl sm:rounded-3xl",
          "py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-10",
          "bg-[linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#0a0a0a_50%,rgba(6,6,6,0.98)_100%)]",
          className
        )}
        aria-label="Inventory"
      >
        <div className="evo-content-narrow mx-auto rounded-2xl border border-border bg-surface/40 py-12 px-6 text-center">
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
    <section
      id="inventory"
      className={cn(
        "evo-content-width relative rounded-2xl sm:rounded-3xl",
        "py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-10",
        "bg-[linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#0a0a0a_50%,rgba(6,6,6,0.98)_100%)]",
        className
      )}
      aria-label="Available vehicles"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-14">
        <div>
          <h2 className="evo-section-heading text-foreground">Available now</h2>
          <p className="evo-body-sm text-muted-foreground mt-2">
            Hand-picked EVs ready to drive today.
          </p>
        </div>
        <Link
          href="/inventory"
          className="evo-body-sm font-medium text-primary no-underline transition-colors duration-200 hover:text-primary/90 shrink-0 evo-focus-ring rounded-sm"
        >
          View all inventory →
        </Link>
      </div>

      <div className="grid gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v, i) => (
          <FeaturedVehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </section>
  );
}
