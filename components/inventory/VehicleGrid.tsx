import type { VehicleSummary } from "@/lib/api";
import { VehicleCard } from "./VehicleCard";
import { cn } from "@/lib/utils";

type VehicleGridProps = {
  vehicles: VehicleSummary[];
  /** Tighter layout for small-lot simple mode */
  compact?: boolean;
  className?: string;
};

export function VehicleGrid({ vehicles, compact = false, className }: VehicleGridProps) {
  if (vehicles.length === 0) return null;

  if (vehicles.length === 1) {
    return (
      <div className={cn("mx-auto w-full max-w-2xl", className)} role="list" aria-label="Vehicle listings">
        <div role="listitem">
          <VehicleCard vehicle={vehicles[0]} prioritizeImage />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        compact
          ? "mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
          : "grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8",
        className
      )}
      role="list"
      aria-label="Vehicle listings"
    >
      {vehicles.map((v, index) => (
        <div key={v.id} role="listitem">
          <VehicleCard vehicle={v} prioritizeImage={index < 3} />
        </div>
      ))}
    </div>
  );
}
