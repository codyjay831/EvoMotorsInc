import type { VehicleDetail } from "@/lib/api";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type VehicleHighlightsProps = {
  vehicle: VehicleDetail;
  className?: string;
};

function SpecRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
      <span className="evo-muted text-sm shrink-0">{label}</span>
      <span className="evo-body-sm text-foreground text-right">{value}</span>
    </div>
  );
}

export function VehicleHighlights({ vehicle, className }: VehicleHighlightsProps) {
  const items: { label: string; value: string | number }[] = [];
  if (vehicle.drivetrain) items.push({ label: "Drivetrain", value: vehicle.drivetrain });
  if (vehicle.rangeMiles != null) items.push({ label: "Range", value: `${vehicle.rangeMiles} mi` });
  if (vehicle.transmission) items.push({ label: "Transmission", value: vehicle.transmission });
  if (vehicle.engine) items.push({ label: "Engine", value: vehicle.engine });
  if (vehicle.battery) items.push({ label: "Battery", value: vehicle.battery });
  if (vehicle.exteriorColor) items.push({ label: "Exterior", value: vehicle.exteriorColor });
  if (vehicle.interiorColor) items.push({ label: "Interior", value: vehicle.interiorColor });
  if (vehicle.mileage != null) items.push({ label: "Mileage", value: vehicle.mileageDisplay ?? `${vehicle.mileage.toLocaleString()} mi` });
  if (vehicle.condition) items.push({ label: "Condition", value: vehicle.condition });
  if (vehicle.fuelType) items.push({ label: "Fuel type", value: vehicle.fuelType });

  if (items.length === 0) return null;

  return (
    <section className={cn("space-y-4", className)} aria-label="Quick specs">
      <h2 className="evo-card-title text-foreground flex items-center gap-2">
        <Zap className="size-5 text-primary" aria-hidden />
        Highlights
      </h2>
      <div className="rounded-xl border border-border bg-surface/40 p-4">
        {items.map(({ label, value }) => (
          <SpecRow key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
}
