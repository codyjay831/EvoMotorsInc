import Link from "next/link";
import Image from "next/image";
import type { VehicleSummary } from "@/lib/api";
import { getPriceDisplay } from "@/lib/api/pricing";
import { SurfaceCard, Badge } from "@/components/website";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type VehicleCardProps = {
  vehicle: VehicleSummary;
  prioritizeImage?: boolean;
  className?: string;
};

function conditionLabel(condition: VehicleSummary["condition"]): string {
  if (!condition) return "—";
  return condition === "certified" ? "Certified" : condition.charAt(0).toUpperCase() + condition.slice(1);
}

export function VehicleCard({ vehicle, prioritizeImage = false, className }: VehicleCardProps) {
  const displayName = vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const imageUrl = vehicle.imageUrl ?? vehicle.imageUrls?.[0];
  const priceDisplay = getPriceDisplay(vehicle);

  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className={cn(
        "group block h-full rounded-xl transition-all duration-200 hover:opacity-95 evo-focus-ring",
        className
      )}
    >
      <SurfaceCard
        variant="glow"
        className="flex h-full flex-col overflow-hidden transition-all duration-200 hover:border-primary/20 hover:shadow-[0_0_28px_-4px_var(--glow-subtle)]"
      >
        <div className="aspect-[16/10] w-full bg-muted/50 relative overflow-hidden rounded-t-xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={displayName}
              fill
              priority={prioritizeImage}
              loading={prioritizeImage ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
            <Badge variant="primary">{conditionLabel(vehicle.condition)}</Badge>
          </div>
        </div>
        <div className="flex h-full flex-col p-4 sm:p-5">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
            {displayName}
          </h3>
          <div className="evo-muted mt-2 leading-relaxed">
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
          <p className="evo-body-sm mt-auto pt-4 font-medium text-primary">
            View details →
          </p>
        </div>
      </SurfaceCard>
    </Link>
  );
}
