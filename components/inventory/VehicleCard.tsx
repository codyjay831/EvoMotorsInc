import Link from "next/link";
import type { VehicleSummary } from "@/lib/api";
import { getPriceDisplay } from "@/lib/api/pricing";
import { SurfaceCard, Badge } from "@/components/website";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type VehicleCardProps = {
  vehicle: VehicleSummary;
  className?: string;
};

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const displayName = vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const imageUrl = vehicle.imageUrl ?? vehicle.imageUrls?.[0];
  const priceDisplay = getPriceDisplay(vehicle);

  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className={cn(
        "group block rounded-xl transition-all duration-200 hover:opacity-95 evo-focus-ring",
        className
      )}
    >
      <SurfaceCard
        variant="glow"
        className="h-full overflow-hidden transition-all duration-200 hover:border-primary/20 hover:shadow-[0_0_28px_-4px_var(--glow-subtle)]"
      >
        <div className="aspect-[16/10] w-full bg-muted/50 relative overflow-hidden rounded-t-xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-muted-foreground"
              aria-hidden
            >
              <Zap className="size-12 opacity-40" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge variant="primary">{vehicle.condition ?? "—"}</Badge>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="evo-card-title text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          <div className="evo-muted mt-2">
            {priceDisplay ? (
              <p>
                {priceDisplay}
                {vehicle.mileageDisplay != null && ` · ${vehicle.mileageDisplay}`}
              </p>
            ) : (
              <p>{vehicle.mileageDisplay ?? "—"}</p>
            )}
          </div>
          {vehicle.rangeMiles != null && (
            <p className="evo-muted mt-1 flex items-center gap-1.5 text-xs">
              <Zap className="size-3.5 text-primary" aria-hidden />
              {vehicle.rangeMiles} mi range
            </p>
          )}
          <p className="evo-body-sm mt-3 font-medium text-primary">
            View details →
          </p>
        </div>
      </SurfaceCard>
    </Link>
  );
}
