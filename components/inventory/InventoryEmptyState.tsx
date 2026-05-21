import Link from "next/link";
import { cn } from "@/lib/utils";

const outlineButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";
const primaryButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-transparent bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 evo-focus-ring";

type InventoryEmptyStateProps = {
  /** true = no results for current filters; false = no inventory at all */
  hasActiveFilters?: boolean;
  className?: string;
};

/** Empty results for full browse mode — simple mode handles empty states in the hero panel. */
export function InventoryEmptyState({
  hasActiveFilters = false,
  className,
}: InventoryEmptyStateProps) {
  return (
    <div className={cn("evo-content-width", className)}>
      <div className="evo-inventory-panel relative mx-auto max-w-2xl text-center">
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          aria-hidden
        />
        <h2 className="evo-section-heading text-foreground">
          {hasActiveFilters ? "No vehicles match those filters" : "Nothing available right now"}
        </h2>
        <p className="evo-body mx-auto mt-4 max-w-md text-muted-foreground">
          {hasActiveFilters
            ? "Clear filters to see everything we have, or tell us what you are looking for."
            : "Check back soon or reach out — we can help find the right electric vehicle for you."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {hasActiveFilters && (
            <Link href="/inventory" className={outlineButtonClass}>
              View all vehicles
            </Link>
          )}
          <Link href="/request-vehicle" className={primaryButtonClass}>
            Request a vehicle
          </Link>
          <Link href="/contact" className={outlineButtonClass}>
            Contact Evo Motors
          </Link>
          <Link href="/ev-charging" className={outlineButtonClass}>
            EV charging support
          </Link>
        </div>
      </div>
    </div>
  );
}
