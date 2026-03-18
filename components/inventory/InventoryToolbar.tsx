"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { InventoryFilters } from "@/lib/api";

const SORT_OPTIONS: { value: InventoryFilters["sort"]; label: string }[] = [
  { value: "listed_desc", label: "Newest first" },
  { value: "year_desc", label: "Year (newest)" },
  { value: "price_asc", label: "Price (low to high)" },
  { value: "price_desc", label: "Price (high to low)" },
  { value: "mileage_asc", label: "Mileage (lowest)" },
];

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

  return (
    <div
      className={cn(
        "evo-content-width rounded-xl border border-border bg-surface/50 p-4 sm:p-5",
        className
      )}
      role="search"
      aria-label="Filter inventory"
    >
      <form
        action="/inventory"
        method="get"
        id="inventory-filters"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
      >
        <label className="sm:col-span-2 lg:col-span-1">
          <span className="evo-muted block text-xs font-medium mb-1.5">Search</span>
          <input
            type="search"
            name="search"
            placeholder="Make, model..."
            defaultValue={search}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Search by make or model"
          />
        </label>
        <label>
          <span className="evo-muted block text-xs font-medium mb-1.5">Make</span>
          <select
            name="make"
            defaultValue={make}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
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
        <label>
          <span className="evo-muted block text-xs font-medium mb-1.5">Max price</span>
          <select
            name="maxPrice"
            defaultValue={maxPrice}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
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
        <label>
          <span className="evo-muted block text-xs font-medium mb-1.5">Min year</span>
          <select
            name="minYear"
            defaultValue={minYear}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Minimum year"
          >
            <option value="">Any</option>
            {[2025, 2024, 2023, 2022, 2021].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="lg:col-span-1">
          <span className="evo-muted block text-xs font-medium mb-1.5">Sort</span>
          <select
            name="sort"
            defaultValue={sort}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Sort by"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2 lg:col-span-5 flex justify-end">
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-muted/80 px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted evo-focus-ring"
          >
            Apply filters
          </button>
        </div>
      </form>
    </div>
  );
}
