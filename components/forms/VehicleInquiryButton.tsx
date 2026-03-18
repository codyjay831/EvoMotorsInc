"use client";

import { useState } from "react";
import { VehicleInquiryModal } from "./VehicleInquiryModal";
import { cn } from "@/lib/utils";
import type { VehicleDetail } from "@/lib/api";

const outlineButtonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

type VehicleInquiryButtonProps = {
  vehicleId: string;
  vehicle: VehicleDetail;
  className?: string;
};

export function VehicleInquiryButton({
  vehicleId,
  vehicle,
  className,
}: VehicleInquiryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(outlineButtonClass, className)}
      >
        Ask about this vehicle
      </button>
      <VehicleInquiryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        vehicleId={vehicleId}
        vehicle={{
          displayName: vehicle.displayName,
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          priceDisplay: vehicle.priceDisplay,
        }}
      />
    </>
  );
}
