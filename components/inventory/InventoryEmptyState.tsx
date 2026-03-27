import Link from "next/link";
import { cn } from "@/lib/utils";
import { PUBLIC_BUSINESS_INFO } from "@/lib/public-business-info";

const outlineButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

type InventoryEmptyStateProps = {
  /** true = no results for current filters; false = no inventory at all */
  hasActiveFilters?: boolean;
  className?: string;
};

export function InventoryEmptyState({
  hasActiveFilters = false,
  className,
}: InventoryEmptyStateProps) {
  return (
    <div
      className={cn(
        "evo-content-width evo-content-narrow mx-auto rounded-2xl border border-border bg-surface/40 py-16 px-8 text-center",
        className
      )}
    >
      <h2 className="evo-section-heading text-foreground">
        {hasActiveFilters ? "No matches" : PUBLIC_BUSINESS_INFO.inventoryEmptyHeading}
      </h2>
      <p className="evo-body text-muted-foreground mt-4">
        {hasActiveFilters
          ? "Try adjusting your filters or search to see more vehicles."
          : PUBLIC_BUSINESS_INFO.inventoryEmptyBody}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {hasActiveFilters && (
          <Link href="/inventory" className={outlineButtonClass}>
            Clear filters
          </Link>
        )}
        {hasActiveFilters ? (
          <Link href="/request-vehicle" className={outlineButtonClass}>
            Request a vehicle
          </Link>
        ) : (
          <a
            href={`mailto:${PUBLIC_BUSINESS_INFO.email}`}
            className={outlineButtonClass}
          >
            {PUBLIC_BUSINESS_INFO.email}
          </a>
        )}
      </div>
    </div>
  );
}
