import Link from "next/link";
import type { VehicleDetail } from "@/lib/api";
import { Zap } from "lucide-react";
import { VehicleInquiryButton } from "@/components/forms";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

type VehiclePricingPanelProps = {
  vehicle: VehicleDetail;
  vehicleId: string;
  className?: string;
};

import type { VehicleDetail } from "@/lib/api";
import { getPriceDisplay } from "@/lib/api/pricing";
import { Zap } from "lucide-react";
import { VehicleInquiryButton } from "@/components/forms";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

type VehiclePricingPanelProps = {
  vehicle: VehicleDetail;
  vehicleId: string;
  className?: string;
};

export function VehiclePricingPanel({
  vehicle,
  vehicleId,
  className,
}: VehiclePricingPanelProps) {
  const priceDisplay = getPriceDisplay(vehicle);
  const mileage = vehicle.mileageDisplay ?? "—";
  const range = vehicle.rangeMiles;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/60 p-6 space-y-6",
        "lg:sticky lg:top-24 lg:self-start",
        className
      )}
    >
      <div className="space-y-3">
        {priceDisplay && (
          <p className="evo-display text-2xl sm:text-3xl text-foreground tracking-tight">
            {priceDisplay}
          </p>
        )}
        <div className="evo-body text-muted-foreground space-y-1">
          <p>{mileage}</p>
          {range != null && (
            <p className="flex items-center gap-1.5">
              <Zap className="size-4 text-primary shrink-0" aria-hidden />
              {range} mi range
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link href={`/inventory/${vehicleId}/reserve`} className={glowButtonClass}>
          Reserve vehicle
        </Link>
        <VehicleInquiryButton vehicleId={vehicleId} vehicle={vehicle} />
      </div>

      <p className="evo-muted text-xs">
        Reserve to hold this vehicle while you decide. No obligation. Questions? We’re here to help.
      </p>
    </div>
  );
}
