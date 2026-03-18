import Link from "next/link";
import type { VehicleDetail } from "@/lib/api";
import { Badge } from "@/components/website";
import { cn } from "@/lib/utils";

type VehicleHeaderProps = {
  vehicle: VehicleDetail;
  className?: string;
};

export function VehicleHeader({ vehicle, className }: VehicleHeaderProps) {
  const displayName = vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <header className={cn("space-y-4", className)}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 evo-muted text-sm">
          <li>
            <Link href="/inventory" className="text-muted-foreground no-underline hover:text-foreground transition-colors">
              Inventory
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground font-medium" aria-current="page">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </li>
        </ol>
      </nav>
      <div className="flex flex-wrap items-start gap-3">
        <h1 className="evo-section-heading text-foreground flex-1 min-w-0">
          {displayName}
        </h1>
        {vehicle.condition && (
          <Badge variant="primary" className="shrink-0">{vehicle.condition}</Badge>
        )}
      </div>
      {(vehicle.stockNumber ?? vehicle.vin) && (
        <p className="evo-muted text-sm">
          {vehicle.stockNumber && <>Stock #{vehicle.stockNumber}</>}
          {vehicle.stockNumber && vehicle.vin && " · "}
          {vehicle.vin && <>VIN {vehicle.vin}</>}
        </p>
      )}
    </header>
  );
}
