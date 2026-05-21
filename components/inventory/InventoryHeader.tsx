import { cn } from "@/lib/utils";

type InventoryHeaderProps = {
  className?: string;
};

export function InventoryHeader({ className }: InventoryHeaderProps) {
  return (
    <header
      className={cn(
        "evo-content-width flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 bg-surface/35 px-4 py-3 sm:px-5",
        className
      )}
      aria-label="Page header"
    >
      <p className="evo-body-sm font-medium text-foreground">
        Start with search, then narrow by make, budget, and model year.
      </p>
      <p className="evo-muted text-xs sm:text-sm">
        Filters and sort update your results without changing vehicle data.
      </p>
    </header>
  );
}
