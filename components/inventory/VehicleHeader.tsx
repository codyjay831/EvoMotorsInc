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
    <header className={cn("space-y-3 sm:space-y-4", className)}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/inventory" className="no-underline transition-colors hover:text-foreground">
              Inventory
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-foreground" aria-current="page">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </li>
        </ol>
      </nav>
      <div className="flex flex-wrap items-start gap-3">
        <h1 className="min-w-0 flex-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
          {displayName}
        </h1>
        {vehicle.condition && (
          <Badge variant="primary" className="shrink-0">{vehicle.condition}</Badge>
        )}
      </div>
      {(vehicle.stockNumber ?? vehicle.vin) && (
        <p className="text-sm text-muted-foreground">
          {vehicle.stockNumber && <>Stock #{vehicle.stockNumber}</>}
          {vehicle.stockNumber && vehicle.vin && " · "}
          {vehicle.vin && <>VIN {vehicle.vin}</>}
        </p>
      )}
    </header>
  );
}
