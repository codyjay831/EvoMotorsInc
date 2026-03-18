import { cn } from "@/lib/utils";

type InventoryHeaderProps = {
  className?: string;
};

export function InventoryHeader({ className }: InventoryHeaderProps) {
  return (
    <header
      className={cn(
        "evo-content-width border-b border-border pb-8",
        className
      )}
      aria-label="Page header"
    >
      <p className="evo-eyebrow text-primary">Showroom</p>
      <h1 className="evo-section-heading text-foreground mt-2">
        Inventory
      </h1>
      <p className="evo-body text-muted-foreground mt-4 max-w-xl">
        Browse our electric vehicles. New and pre-owned, with transparent pricing and no pressure.
      </p>
    </header>
  );
}
