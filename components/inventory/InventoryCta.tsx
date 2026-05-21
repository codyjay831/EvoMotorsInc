import Link from "next/link";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-transparent bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] focus:outline-none focus:ring-2 focus:ring-ring";
const outlineButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring";

type InventoryCtaProps = {
  className?: string;
};

export function InventoryCta({ className }: InventoryCtaProps) {
  return (
    <section
      className={cn(
        "evo-inventory-panel mx-auto max-w-2xl px-6 py-9 sm:px-8 sm:py-10",
        className
      )}
      aria-label="Next steps"
    >
      <div className="text-center">
        <h2 className="evo-section-heading text-foreground">
          Still looking for the right EV?
        </h2>
        <p className="evo-body mt-3 text-muted-foreground">
          Tell us what you want and we will help source it.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/request-vehicle" className={glowButtonClass}>
            Request a vehicle
          </Link>
          <Link href="/contact" className={outlineButtonClass}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
