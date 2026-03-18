import type { VehicleDetail } from "@/lib/api";
import { cn } from "@/lib/utils";

type VehicleSpecsSectionProps = {
  vehicle: VehicleDetail;
  className?: string;
};

function SpecBlock({
  title,
  entries,
}: {
  title: string;
  entries: { label: string; value: string | number }[];
}) {
  if (entries.length === 0) return null;
  return (
    <div>
      <h3 className="evo-eyebrow text-foreground/80 mb-3">{title}</h3>
      <dl className="space-y-2">
        {entries.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 py-1.5 border-b border-border/50 last:border-0">
            <dt className="evo-muted text-sm">{label}</dt>
            <dd className="evo-body-sm text-foreground text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function VehicleSpecsSection({ vehicle, className }: VehicleSpecsSectionProps) {
  const core: { label: string; value: string | number }[] = [];
  if (vehicle.year) core.push({ label: "Year", value: vehicle.year });
  if (vehicle.make) core.push({ label: "Make", value: vehicle.make });
  if (vehicle.model) core.push({ label: "Model", value: vehicle.model });
  if (vehicle.trim) core.push({ label: "Trim", value: vehicle.trim });
  if (vehicle.condition) core.push({ label: "Condition", value: vehicle.condition });
  if (vehicle.mileage != null) core.push({ label: "Mileage", value: vehicle.mileageDisplay ?? `${vehicle.mileage.toLocaleString()} mi` });
  if (vehicle.exteriorColor) core.push({ label: "Exterior", value: vehicle.exteriorColor });
  if (vehicle.interiorColor) core.push({ label: "Interior", value: vehicle.interiorColor });

  const ev: { label: string; value: string | number }[] = [];
  if (vehicle.drivetrain) ev.push({ label: "Drivetrain", value: vehicle.drivetrain });
  if (vehicle.transmission) ev.push({ label: "Transmission", value: vehicle.transmission });
  if (vehicle.engine) ev.push({ label: "Engine", value: vehicle.engine });
  if (vehicle.battery) ev.push({ label: "Battery", value: vehicle.battery });
  if (vehicle.rangeMiles != null) ev.push({ label: "Range", value: `${vehicle.rangeMiles} mi` });
  if (vehicle.fuelType) ev.push({ label: "Fuel type", value: vehicle.fuelType });

  const hasCore = core.length > 0;
  const hasEv = ev.length > 0;
  if (!hasCore && !hasEv) return null;

  return (
    <section className={cn("space-y-8", className)} aria-label="Detailed specifications">
      <h2 className="evo-section-heading text-foreground">Specifications</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {hasCore && <SpecBlock title="Vehicle" entries={core} />}
        {hasEv && <SpecBlock title="Performance & battery" entries={ev} />}
      </div>
    </section>
  );
}
