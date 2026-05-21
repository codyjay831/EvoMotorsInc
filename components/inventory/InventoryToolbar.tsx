"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type InventoryToolbarProps = {
  makes: string[];
  className?: string;
};

export function InventoryToolbar({ makes, className }: InventoryToolbarProps) {
  const sp = useSearchParams();
  const search = sp.get("search") ?? "";
  const make = sp.get("make") ?? "";
  const maxPrice = sp.get("maxPrice") ?? "";
  const minYear = sp.get("minYear") ?? "";
  const sort = sp.get("sort") ?? "listed_desc";
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 16 }, (_, index) => currentYear - index);
  const hasFilters = [search, make, maxPrice, minYear].some(Boolean);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/50 p-4 sm:p-5",
        className
      )}
      role="search"
      aria-label="Filter inventory"
    >
      <form
        action="/inventory"
        method="get"
        id="inventory-filters"
        className="space-y-4"
      >
        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="sort" value={sort} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <label className="sm:col-span-2 lg:col-span-1 lg:pr-4 xl:pr-5">
            <span className="evo-muted mb-1.5 block text-xs font-medium">Search</span>
            <input
              type="search"
              name="search"
              placeholder="Make, model..."
              defaultValue={search}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Search by make or model"
            />
          </label>

          <label className="lg:border-l lg:border-border/80 lg:px-4 xl:px-5">
            <span className="evo-muted mb-1.5 block text-xs font-medium">Make</span>
            <select
              name="make"
              defaultValue={make}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Filter by make"
            >
              <option value="">All makes</option>
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="lg:border-l lg:border-border/80 lg:px-4 xl:px-5">
            <span className="evo-muted mb-1.5 block text-xs font-medium">Max price</span>
            <select
              name="maxPrice"
              defaultValue={maxPrice}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Maximum price"
            >
              <option value="">Any</option>
              <option value="40000">$40,000</option>
              <option value="60000">$60,000</option>
              <option value="80000">$80,000</option>
              <option value="100000">$100,000</option>
            </select>
          </label>

          <label className="lg:border-l lg:border-border/80 lg:pl-4 xl:pl-5">
            <span className="evo-muted mb-1.5 block text-xs font-medium">Min year</span>
            <select
              name="minYear"
              defaultValue={minYear}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Minimum year"
            >
              <option value="">Any</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
          <p className="evo-muted text-xs sm:text-sm">
            Apply filters to refresh results.
          </p>
          <div className="flex items-center gap-2">
            {hasFilters && (
              <Link
                href="/inventory"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-muted/80 evo-focus-ring"
              >
                Reset
              </Link>
            )}
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-muted/80 px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted evo-focus-ring"
            >
              Apply filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
