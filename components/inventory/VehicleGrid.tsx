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
      <div
        className={cn(
          compact ? "mx-auto w-full max-w-4xl md:mx-0 md:max-w-2xl" : "mx-auto w-full max-w-2xl",
          className
        )}
        role="list"
        aria-label="Vehicle listings"
      >
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
          ? "mx-auto grid w-full max-w-4xl gap-6 sm:grid-cols-2 [&>*:last-child:nth-child(odd)]:sm:col-span-2 [&>*:last-child:nth-child(odd)]:sm:mx-auto [&>*:last-child:nth-child(odd)]:sm:max-w-[calc(50%-0.75rem)]"
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
