import Link from "next/link";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10 evo-focus-ring";

type HomeCtaBandProps = {
  className?: string;
};

export function HomeCtaBand({ className }: HomeCtaBandProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-surface py-12 sm:py-16 px-6 sm:px-8 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.04)]",
        className
      )}
      aria-label="Next steps"
    >
      <div className="evo-content-narrow mx-auto text-center">
        <h2 className="evo-section-heading text-foreground">
          Start your EV journey today
        </h2>
        <p className="evo-body mt-4 text-muted-foreground">
          Browse inventory, get approved, or request the exact vehicle you want.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/inventory" className={glowButtonClass}>
            Browse Inventory
          </Link>
          <Link href="/contact?intent=approval" className={outlineButtonClass}>
            Get Approved
          </Link>
          <Link href="/request-vehicle" className={outlineButtonClass}>
            Request a Vehicle
          </Link>
        </div>
      </div>
    </section>
  );
}
