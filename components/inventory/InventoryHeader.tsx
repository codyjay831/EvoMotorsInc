import { cn } from "@/lib/utils";

type InventoryHeaderProps = {
  className?: string;
};

export function InventoryHeader({ className }: InventoryHeaderProps) {
  return (
    <header
      className={cn(
        "evo-content-width border-b border-border/80 pb-5 sm:pb-6",
        className
      )}
      aria-label="Page header"
    >
      <p className="evo-eyebrow text-primary">Search inventory</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Refine by make, budget, and model year to quickly get to vehicles that match what you actually want.
      </p>
    </header>
  );
}
