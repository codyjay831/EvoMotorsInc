import Link from "next/link";
import type { Dealer, VehicleSummary } from "@/lib/api";
import { FeaturedVehicleCard } from "./FeaturedVehicleCard";
import { cn } from "@/lib/utils";

type HomeFeaturedVehiclesProps = {
  dealer: Dealer;
  vehicles: VehicleSummary[];
  className?: string;
};

export function HomeFeaturedVehicles({
  dealer,
  vehicles,
  className,
}: HomeFeaturedVehiclesProps) {
  const list = vehicles.slice(0, 6);

  if (list.length === 0) return null;

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
