import type { VehicleSummary } from "@/lib/api";
import { VehicleCard } from "./VehicleCard";
import { cn } from "@/lib/utils";

type VehicleGridProps = {
  vehicles: VehicleSummary[];
  className?: string;
};

export function VehicleGrid({ vehicles, className }: VehicleGridProps) {
  if (vehicles.length === 0) return null;

  if (vehicles.length === 1) {
    return (
      <div className={cn("mx-auto w-full max-w-xl", className)} role="list" aria-label="Vehicle listings">
        <div role="listitem">
          <VehicleCard vehicle={vehicles[0]} prioritizeImage />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3",
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
