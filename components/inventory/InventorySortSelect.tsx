"use client";

import type { ChangeEvent } from "react";
import type { InventoryFilters } from "@/lib/api";

type InventorySortSelectProps = {
  currentSort: InventoryFilters["sort"] | string;
  activeFilters?: Record<string, string>;
  sortLabels: Record<string, string>;
};

export function InventorySortSelect({
  currentSort,
  activeFilters = {},
  sortLabels,
}: InventorySortSelectProps) {
  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <form
      action="/inventory"
      method="get"
      className="flex items-center gap-2 sm:justify-end"
    >
      <input type="hidden" name="page" value="1" />
      {Object.entries(activeFilters).map(([key, value]) =>
        value && key !== "sort" ? (
          <input key={key} type="hidden" name={key} value={value} />
        ) : null
      )}
      <label className="evo-muted text-xs font-semibold uppercase tracking-wide text-foreground/75">Sort</label>
      <select
        name="sort"
        defaultValue={currentSort}
        onChange={handleSortChange}
        className="h-10 min-w-44 rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label="Sort listings"
      >
        {Object.entries(sortLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </form>
  );
}
