import Link from "next/link";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] focus:outline-none focus:ring-2 focus:ring-ring";
const outlineButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/80 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring";

type InventoryCtaProps = {
  className?: string;
};

export function InventoryCta({ className }: InventoryCtaProps) {
  return (
    <section
      className={cn(
        "evo-content-width rounded-2xl border border-border bg-surface/60 py-10 sm:py-12 px-6 sm:px-8",
        className
      )}
      aria-label="Next steps"
    >
      <div className="evo-content-narrow mx-auto text-center">
        <h2 className="evo-section-heading text-foreground">
          Don’t see what you want?
        </h2>
        <p className="evo-body text-muted-foreground mt-3">
          Request a specific vehicle or get in touch. We are here to help.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
