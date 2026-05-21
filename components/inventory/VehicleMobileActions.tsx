"use client";

import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";
import type { VehicleDetail } from "@/lib/api";
import { VehicleInquiryButton } from "@/components/forms";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";
import { cn } from "@/lib/utils";

const primaryButtonClass =
  "inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 evo-focus-ring";

const secondaryButtonClass =
  "inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface/60 px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-muted/60 evo-focus-ring";

type VehicleMobileActionsProps = {
  vehicle: VehicleDetail;
  vehicleId: string;
  className?: string;
};

export function VehicleMobileActions({
  vehicle,
  vehicleId,
  className,
}: VehicleMobileActionsProps) {
  const vehicleLabel =
    vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const mailSubject = encodeURIComponent(`Inquiry: ${vehicleLabel}`);
  const mailBody = encodeURIComponent(
    `Hi,\n\nI'm interested in the ${vehicleLabel} (Stock/VIN on listing).\n\n`
  );
  const mailtoHref = `mailto:${PUBLIC_BUSINESS_INFO.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className={cn("space-y-3 lg:hidden", className)} aria-label="Contact actions">
      <div className="flex gap-2.5">
        <Link href={`/inventory/${vehicleId}/reserve`} className={primaryButtonClass}>
          Reserve vehicle
        </Link>
        <VehicleInquiryButton
          vehicleId={vehicleId}
          vehicle={vehicle}
          className={cn(secondaryButtonClass, "w-auto min-w-0 flex-1")}
        />
      </div>

      <div className="flex gap-2.5">
        <a href={mailtoHref} className={secondaryButtonClass}>
          <Mail className="size-4 shrink-0" aria-hidden />
          Email
        </a>
        <Link
          href={`/contact?vehicleId=${encodeURIComponent(vehicleId)}`}
          className={secondaryButtonClass}
        >
          <MessageSquare className="size-4 shrink-0" aria-hidden />
          Contact us
        </Link>
      </div>
    </div>
  );
}
