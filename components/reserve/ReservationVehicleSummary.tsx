import Link from "next/link";
import type { VehicleDetail } from "@/lib/api";
import { Zap } from "lucide-react";
import { Badge } from "@/components/website";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ReservationVehicleSummaryProps = {
  vehicle: VehicleDetail;
  vehicleId: string;
  className?: string;
};

export function ReservationVehicleSummary({
  vehicle,
  vehicleId,
  className,
}: ReservationVehicleSummaryProps) {
  const displayName = vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const imageUrl = vehicle.imageUrl ?? vehicle.imageUrls?.[0];

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/60 overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 w-full shrink-0 bg-muted/50 sm:h-auto sm:w-48">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground" aria-hidden>
              <Zap className="size-10 opacity-40" />
            </div>
          )}
          {vehicle.condition && (
            <div className="absolute left-2 top-2">
              <Badge variant="primary">{vehicle.condition}</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
          <p className="evo-eyebrow text-primary">{SITE.name}</p>
          <h2 className="evo-card-title text-foreground mt-1">{displayName}</h2>
          <p className="evo-body text-muted-foreground mt-2">
            {vehicle.priceDisplay ?? "Price on request"}
            {vehicle.mileageDisplay != null && ` · ${vehicle.mileageDisplay}`}
          </p>
          {vehicle.rangeMiles != null && (
            <p className="evo-muted mt-1 flex items-center gap-1.5 text-xs">
              <Zap className="size-3.5 text-primary" aria-hidden />
              {vehicle.rangeMiles} mi range
            </p>
          )}
          <Link
            href={`/inventory/${vehicleId}`}
            className="evo-body-sm mt-3 font-medium text-primary no-underline hover:text-primary/90 transition-colors"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}
