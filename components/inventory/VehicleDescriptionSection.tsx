import type { VehicleDetail } from "@/lib/api";
import { cn } from "@/lib/utils";

type VehicleDescriptionSectionProps = {
  vehicle: VehicleDetail;
  className?: string;
};

export function VehicleDescriptionSection({
  vehicle,
  className,
}: VehicleDescriptionSectionProps) {
  const hasDescription = vehicle.description?.trim();
  const hasFeatures = vehicle.features && vehicle.features.length > 0;
  const hasOptions = vehicle.options && vehicle.options.length > 0;
  const hasNotes = vehicle.notes?.trim();

  if (!hasDescription && !hasFeatures && !hasOptions && !hasNotes) return null;

  return (
    <section className={cn("space-y-8", className)} aria-label="Description and features">
      <h2 className="evo-section-heading text-foreground">Details</h2>

      {hasDescription && (
        <div className="evo-content-narrow">
          <p className="evo-body text-muted-foreground leading-relaxed">
            {vehicle.description}
          </p>
        </div>
      )}

      {hasFeatures && (
        <div>
          <h3 className="evo-card-title text-foreground mb-3">Features</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {vehicle.features!.map((f, i) => (
              <li key={i} className="flex items-start gap-2 evo-body-sm text-muted-foreground">
                <span className="text-primary mt-0.5" aria-hidden>•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasOptions && (
        <div>
          <h3 className="evo-card-title text-foreground mb-3">Options</h3>
          <ul className="flex flex-wrap gap-2">
            {vehicle.options!.map((o, i) => (
              <li
                key={i}
                className="rounded-md border border-border bg-surface/50 px-3 py-1.5 evo-body-sm text-foreground"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasNotes && (
        <div className="rounded-xl border border-border bg-surface/40 p-4">
          <p className="evo-body-sm text-muted-foreground">{vehicle.notes}</p>
        </div>
      )}
    </section>
  );
}
