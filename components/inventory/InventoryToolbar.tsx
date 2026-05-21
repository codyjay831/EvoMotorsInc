"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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
        "rounded-2xl border border-border/70 bg-surface/40 p-4 sm:p-5 lg:p-6",
        className
      )}
      role="search"
      aria-label="Filter inventory"
    >
      <form
        action="/inventory"
        method="get"
        id="inventory-filters"
        className="space-y-5"
      >
        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="sort" value={sort} />

        <div className="space-y-3">
          <label className="block">
            <span className="evo-muted mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
              Search inventory
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                type="search"
                name="search"
                placeholder="Search make or model"
                defaultValue={search}
                className="h-11 w-full rounded-xl border border-border/80 bg-background/75 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Search by make or model"
              />
            </div>
          </label>
          <p className="evo-muted text-xs sm:text-sm">
            Tip: search is the fastest way to narrow the list before using filters.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label>
            <span className="evo-muted mb-1.5 block text-xs font-medium uppercase tracking-wide">Make</span>
            <select
              name="make"
              defaultValue={make}
              className="h-10 w-full rounded-xl border border-border/80 bg-background/75 px-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

          <label>
            <span className="evo-muted mb-1.5 block text-xs font-medium uppercase tracking-wide">Max price</span>
            <select
              name="maxPrice"
              defaultValue={maxPrice}
              className="h-10 w-full rounded-xl border border-border/80 bg-background/75 px-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Maximum price"
            >
              <option value="">Any</option>
              <option value="40000">$40,000</option>
              <option value="60000">$60,000</option>
              <option value="80000">$80,000</option>
              <option value="100000">$100,000</option>
            </select>
          </label>

          <label>
            <span className="evo-muted mb-1.5 block text-xs font-medium uppercase tracking-wide">Min year</span>
            <select
              name="minYear"
              defaultValue={minYear}
              className="h-10 w-full rounded-xl border border-border/80 bg-background/75 px-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <div className="flex items-center gap-2">
            {hasFilters && (
              <Link
                href="/inventory"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border/80 bg-transparent px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-muted/80 evo-focus-ring"
              >
                Reset
              </Link>
            )}
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-transparent bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 evo-focus-ring"
            >
              Apply filters
            </button>
          </div>
          <p className="evo-muted text-xs sm:text-sm">
            Sorting stays active while you refine filters.
          </p>
        </div>
      </form>
    </div>
  );
}
