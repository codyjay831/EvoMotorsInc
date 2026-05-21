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
  const secondaryDetail = vehicle.mileageDisplay ?? (vehicle.rangeMiles != null ? `${vehicle.rangeMiles} mi range` : "Contact for details");

  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className={cn(
        "group block h-full rounded-2xl transition-all duration-300 evo-focus-ring",
        className
      )}
    >
      <SurfaceCard
        variant="glow"
        className="flex h-full flex-col overflow-hidden border-border/75 bg-surface/70 transition-all duration-300 hover:border-white/15 hover:shadow-[0_0_34px_-8px_var(--glow-subtle)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-muted/50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={displayName}
              fill
              priority={prioritizeImage}
              loading={prioritizeImage ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground"
              aria-hidden
            >
              <Zap className="size-12 opacity-40" />
              <p className="text-xs uppercase tracking-wide">Photo coming soon</p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute top-2 left-2">
            <Badge variant="primary">{conditionLabel(vehicle.condition)}</Badge>
          </div>
        </div>
        <div className="flex h-full flex-col p-4 sm:p-5">
          <h3 className="evo-card-title text-foreground transition-colors group-hover:text-primary">
            {displayName}
          </h3>
          <p className="mt-2 text-xl font-semibold tracking-tight tabular-nums text-foreground">
            {priceDisplay ?? "Call for price"}
          </p>
          <p className="evo-muted mt-1 leading-relaxed">{secondaryDetail}</p>
          {vehicle.rangeMiles != null && vehicle.mileageDisplay != null && (
            <p className="evo-muted mt-1 flex items-center gap-1.5 text-xs">
              <Zap className="size-3.5 text-primary" aria-hidden />
              {vehicle.rangeMiles} mi range
            </p>
          )}
          <p className="evo-body-sm mt-auto pt-4 font-semibold text-primary">
            View details →
          </p>
        </div>
      </SurfaceCard>
    </Link>
  );
}
