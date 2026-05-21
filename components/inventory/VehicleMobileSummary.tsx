import { Zap } from "lucide-react";
import type { VehicleDetail } from "@/lib/api";
import { getPriceDisplay } from "@/lib/api/pricing";
import { cn } from "@/lib/utils";

type VehicleMobileSummaryProps = {
  vehicle: VehicleDetail;
  className?: string;
};

function FactChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-sm text-foreground">
      {children}
    </span>
  );
}

export function VehicleMobileSummary({ vehicle, className }: VehicleMobileSummaryProps) {
  const priceDisplay = getPriceDisplay(vehicle);

  const chips: string[] = [];
  if (vehicle.mileageDisplay) chips.push(vehicle.mileageDisplay);
  else if (vehicle.mileage != null) chips.push(`${vehicle.mileage.toLocaleString()} mi`);
  if (vehicle.drivetrain) chips.push(vehicle.drivetrain);
  if (vehicle.fuelType) chips.push(vehicle.fuelType);
  if (vehicle.transmission) chips.push(vehicle.transmission);
  if (vehicle.exteriorColor) chips.push(vehicle.exteriorColor);
  if (vehicle.interiorColor) chips.push(`${vehicle.interiorColor} interior`);

  return (
    <div className={cn("space-y-3 lg:hidden", className)}>
      {priceDisplay && (
        <p className="text-2xl font-semibold tracking-tight text-foreground">{priceDisplay}</p>
      )}

      {vehicle.rangeMiles != null && (
        <p className="flex items-center gap-1.5 text-base text-muted-foreground">
          <Zap className="size-4 shrink-0 text-primary" aria-hidden />
          {vehicle.rangeMiles} mi range
        </p>
      )}

      {chips.length > 0 && (
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5"
          aria-label="Key vehicle details"
        >
          {chips.map((chip) => (
            <FactChip key={chip}>{chip}</FactChip>
          ))}
        </div>
      )}
    </div>
  );
}
