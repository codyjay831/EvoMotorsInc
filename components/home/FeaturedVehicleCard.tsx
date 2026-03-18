"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { VehicleSummary } from "@/lib/api";
import { Badge } from "@/components/website";
import { cn } from "@/lib/utils";

const STAGGER_MS = 100;

const PLACEHOLDER_IMAGE = "/placeholder-vehicle.svg";

function getVehicleImageUrl(v: VehicleSummary): string {
  return v.imageUrl ?? (v.imageUrls && v.imageUrls[0]) ?? PLACEHOLDER_IMAGE;
}

function conditionLabel(condition: VehicleSummary["condition"]): string {
  if (!condition) return "—";
  return condition === "certified" ? "Certified" : condition.charAt(0).toUpperCase() + condition.slice(1);
}

type FeaturedVehicleCardProps = {
  vehicle: VehicleSummary;
  index: number;
};

export function FeaturedVehicleCard({ vehicle, index }: FeaturedVehicleCardProps) {
  const imageUrl = getVehicleImageUrl(vehicle);
  const name = vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index * STAGGER_MS) / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Link
        href={`/inventory?highlight=${vehicle.id}`}
        className={cn(
          "group block h-full rounded-2xl overflow-hidden",
          "bg-card border border-white/[0.06]",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4),0_1px_0_0_rgb(255_255_255_/_0.03)]",
          "transition-all duration-[350ms] ease-out",
          "hover:translate-y-[-6px] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5),0_1px_0_0_rgb(255_255_255_/_0.05)]",
          "evo-focus-ring"
        )}
      >
        {/* Image block: dominant visual */}
        <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-muted/30">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.03]"
          />
          {/* Dark gradient overlay for readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.85) 100%)",
            }}
          />
          {/* Top row: badge + range */}
          <div className="absolute inset-0 flex justify-between items-start p-4 sm:p-5">
            <Badge variant="primary" className="shrink-0 text-[10px] uppercase tracking-widest">
              {conditionLabel(vehicle.condition)}
            </Badge>
            {vehicle.rangeMiles != null && (
              <span className="text-xs text-white/70 font-medium tabular-nums">
                {vehicle.rangeMiles} mi
              </span>
            )}
          </div>
        </div>

        {/* Content: name + price/mileage */}
        <div className="px-5 sm:px-6 py-5 sm:py-6">
          <h3 className="text-xl font-semibold tracking-tight text-foreground leading-tight">
            {name}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {vehicle.priceDisplay ?? "Price on request"}
            {vehicle.mileageDisplay != null && ` · ${vehicle.mileageDisplay}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
