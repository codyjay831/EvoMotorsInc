import type { VehicleSummary } from "@/lib/api";
import { VehicleCard } from "./VehicleCard";
import { cn } from "@/lib/utils";

type VehicleGridProps = {
  vehicles: VehicleSummary[];
  className?: string;
};

export function VehicleGrid({ vehicles, className }: VehicleGridProps) {
  if (vehicles.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      role="list"
      aria-label="Vehicle listings"
    >
      {vehicles.map((v) => (
        <div key={v.id} role="listitem">
          <VehicleCard vehicle={v} />
        </div>
      ))}
    </div>
  );
}
