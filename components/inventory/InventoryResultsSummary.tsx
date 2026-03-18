import Link from "next/link";
import { cn } from "@/lib/utils";

type InventoryResultsSummaryProps = {
  total: number;
  page: number;
  limit: number;
  /** Active filters for display (e.g. { make: "Tesla", maxPrice: "60000" }) */
  activeFilters?: Record<string, string>;
  className?: string;
};

export function InventoryResultsSummary({
  total,
  page,
  limit,
  activeFilters = {},
  className,
}: InventoryResultsSummaryProps) {
  const hasFilters = Object.keys(activeFilters).some((k) => activeFilters[k]);
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const filterLabels: Record<string, string> = {
    search: "Search",
    make: "Make",
    maxPrice: "Max price",
    minYear: "Min year",
    sort: "Sort",
  };
  const sortLabels: Record<string, string> = {
    listed_desc: "Newest first",
    year_desc: "Year (newest)",
    price_asc: "Price (low to high)",
    price_desc: "Price (high to low)",
    mileage_asc: "Mileage (lowest)",
  };
  const maxPriceLabels: Record<string, string> = {
    "40000": "$40,000",
    "60000": "$60,000",
    "80000": "$80,000",
    "100000": "$100,000",
  };

  return (
    <div
      className={cn(
        "evo-content-width flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="evo-muted">
        {total === 0 ? (
          "No vehicles found"
        ) : (
          <>
            Showing <span className="text-foreground font-medium">{start}–{end}</span> of{" "}
            <span className="text-foreground font-medium">{total}</span>
          </>
        )}
      </p>
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="evo-muted text-xs">Active:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value) return null;
            const label = filterLabels[key] ?? key;
            let display = value;
            if (key === "maxPrice") display = maxPriceLabels[value] ?? `$${Number(value).toLocaleString()}`;
            else if (key === "sort") display = sortLabels[value] ?? value;
            return (
              <span
                key={key}
                className="inline-flex items-center rounded-md border border-border bg-surface/80 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {label}: {display}
              </span>
            );
          })}
          <Link
            href="/inventory"
            className="evo-body-sm text-primary no-underline transition-colors hover:text-primary/90"
          >
            Clear all
          </Link>
        </div>
      )}
    </div>
  );
}
