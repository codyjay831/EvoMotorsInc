import Link from "next/link";
import { cn } from "@/lib/utils";
import type { InventoryFilters } from "@/lib/api";
import { InventorySortSelect } from "./InventorySortSelect";

type InventoryResultsSummaryProps = {
  total: number;
  page: number;
  limit: number;
  /** Active filters for display (e.g. { make: "Tesla", maxPrice: "60000" }) */
  activeFilters?: Record<string, string>;
  currentSort?: InventoryFilters["sort"] | string;
  searchParams?: Record<string, string | string[] | undefined>;
  className?: string;
};

export function InventoryResultsSummary({
  total,
  page,
  limit,
  activeFilters = {},
  currentSort = "listed_desc",
  searchParams = {},
  className,
}: InventoryResultsSummaryProps) {
  const hasFilters = Object.keys(activeFilters).some((k) => activeFilters[k]);
  const totalPages = total > 0 ? Math.ceil(total / limit) : 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const hasPagination = totalPages > 1;
  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

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
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const buildHref = (
    overrides: Record<string, string | null | undefined> = {}
  ) => {
    const params = new URLSearchParams();
    for (const [key, rawValue] of Object.entries(searchParams)) {
      const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
      if (value != null && value !== "") params.set(key, value);
    }

    for (const [key, value] of Object.entries(overrides)) {
      if (value == null || value === "") params.delete(key);
      else params.set(key, value);
    }

    const query = params.toString();
    return query ? `/inventory?${query}` : "/inventory";
  };
  const activeSortLabel = sortLabels[currentSort] ?? "Newest first";

  return (
    <div
      className={cn(
        "space-y-4 rounded-xl border border-border/80 bg-surface/40 p-4 sm:p-5",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="evo-muted">
          {total === 0 ? (
            "No vehicles found"
          ) : (
            <>
              Showing <span className="font-medium text-foreground">{start}–{end}</span> of{" "}
              <span className="font-medium text-foreground">{total}</span>
            </>
          )}
        </p>

        <InventorySortSelect
          currentSort={currentSort}
          activeFilters={activeFilters}
          sortLabels={sortLabels}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
        {hasFilters ? (
          <>
            <span className="evo-muted text-xs">Active:</span>
            {Object.entries(activeFilters).map(([key, value]) => {
              if (!value) return null;
              const label = filterLabels[key] ?? key;
              let display = value;
              if (key === "maxPrice") display = maxPriceLabels[value] ?? `$${Number(value).toLocaleString()}`;
              return (
                <Link
                  key={key}
                  href={buildHref({ [key]: null, page: null })}
                  className="inline-flex items-center rounded-md border border-border bg-surface/80 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {label}: {display} <span className="ml-1" aria-hidden>×</span>
                </Link>
              );
            })}
            <Link
              href="/inventory"
              className="evo-body-sm text-primary no-underline transition-colors hover:text-primary/90"
            >
              Clear all
            </Link>
          </>
        ) : (
          <p className="evo-muted text-xs sm:text-sm">Sorted by: {activeSortLabel}</p>
        )}
      </div>

      {hasPagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
          <p className="evo-muted text-xs sm:text-sm">
            Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href={buildHref({ page: currentPage > 1 ? String(currentPage - 1) : String(currentPage) })}
              aria-disabled={currentPage <= 1}
              className={cn(
                "inline-flex h-8 items-center rounded-md border border-border px-3 text-xs transition-colors",
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "hover:border-primary/30 hover:bg-muted/70"
              )}
            >
              Prev
            </Link>
            {visiblePages.map((pageNumber) => (
              <Link
                key={pageNumber}
                href={buildHref({ page: String(pageNumber) })}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs transition-colors",
                  pageNumber === currentPage
                    ? "border-primary bg-primary/20 text-foreground"
                    : "border-border hover:border-primary/30 hover:bg-muted/70"
                )}
              >
                {pageNumber}
              </Link>
            ))}
            <Link
              href={buildHref({
                page: currentPage < totalPages ? String(currentPage + 1) : String(currentPage),
              })}
              aria-disabled={currentPage >= totalPages}
              className={cn(
                "inline-flex h-8 items-center rounded-md border border-border px-3 text-xs transition-colors",
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:border-primary/30 hover:bg-muted/70"
              )}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);

  if (currentPage <= 3) return [1, 2, 3, 4, totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
}
