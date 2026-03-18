import Link from "next/link";
import { cn } from "@/lib/utils";

const outlineButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

type VehicleUnavailableStateProps = {
  className?: string;
};

export function VehicleUnavailableState({ className }: VehicleUnavailableStateProps) {
  return (
    <div
      className={cn(
        "evo-content-width evo-content-narrow mx-auto rounded-2xl border border-border bg-surface/40 py-16 px-8 text-center",
        className
      )}
    >
      <h1 className="evo-section-heading text-foreground">
        Vehicle no longer available
      </h1>
      <p className="evo-body text-muted-foreground mt-4">
        This vehicle may have been sold or removed. Browse our current inventory or request a vehicle and we’ll help you find the right fit.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/inventory" className={outlineButtonClass}>
          Back to inventory
        </Link>
        <Link href="/request-vehicle" className={outlineButtonClass}>
          Request a vehicle
        </Link>
      </div>
    </div>
  );
}
