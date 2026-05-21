import Link from "next/link";
import { cn } from "@/lib/utils";

type InventoryHeroProps = {
  className?: string;
};

const primaryButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-transparent bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-muted/80 evo-focus-ring";

export function InventoryHero({ className }: InventoryHeroProps) {
  return (
    <section
      className={cn(
        "evo-content-width overflow-hidden rounded-2xl border border-border bg-surface/50",
        className
      )}
      aria-label="Inventory overview"
    >
      <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <div>
          <p className="evo-eyebrow text-primary">Inventory</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            EV inventory that is easy to browse.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            New and pre-owned electric vehicles with transparent pricing, clean filters, and fast answers from our team.
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-background/40 p-4 sm:p-5">
          <p className="text-sm font-medium text-foreground">Need help beyond the vehicle?</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We can also help coordinate EV charger installation guidance after purchase.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href="/request-vehicle" className={primaryButtonClass}>
              Request a vehicle
            </Link>
            <Link href="/ev-charging" className={outlineButtonClass}>
              EV charging support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
