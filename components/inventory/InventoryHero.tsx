import Link from "next/link";
import { cn } from "@/lib/utils";

type InventoryHeroProps = {
  simpleMode?: boolean;
  hasResults?: boolean;
  hasActiveFilters?: boolean;
  vehicleCount?: number;
  className?: string;
};

const primaryButtonClass =
  "inline-flex h-10 items-center justify-center rounded-xl border border-transparent bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-10 items-center justify-center rounded-xl border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-muted/80 evo-focus-ring";
const ghostLinkClass =
  "text-sm font-medium text-primary transition-colors hover:text-primary/85 evo-focus-ring rounded-sm";

function PanelGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      aria-hidden
    />
  );
}

function SimplePanelHero({
  hasResults,
  hasActiveFilters,
  vehicleCount,
  className,
}: Omit<InventoryHeroProps, "simpleMode">) {
  const isEmpty = !hasResults;

  return (
    <section
      className={cn("evo-content-width", className)}
      aria-label="Inventory overview"
    >
      <div className="evo-inventory-panel relative mx-auto max-w-2xl text-center">
        <PanelGlow />
        <p className="evo-eyebrow text-primary">Evo Motors · Inventory</p>

        {isEmpty && hasActiveFilters ? (
          <>
            <h1 className="evo-section-heading mt-3 text-foreground">
              No vehicles match those filters
            </h1>
            <p className="evo-body mx-auto mt-4 max-w-md text-muted-foreground">
              Try clearing your filters or tell us what you are looking for — we can help source it.
            </p>
          </>
        ) : isEmpty ? (
          <>
            <h1 className="evo-section-heading mt-3 text-foreground">
              Your EV search, with real guidance.
            </h1>
            <p className="evo-body mx-auto mt-4 max-w-md text-muted-foreground">
              Small inventory, hands-on service. We help you source the right EV, answer ownership
              questions, and guide you on charging — before and after the sale.
            </p>
          </>
        ) : (
          <>
            <h1 className="evo-section-heading mt-3 text-foreground">
              Your EV search, with real guidance.
            </h1>
            <p className="evo-body mx-auto mt-4 max-w-md text-muted-foreground">
              Hand-picked electric vehicles on our lot, backed by a team that knows EV ownership
              inside and out.
            </p>
            <p className="mt-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-sm font-medium text-foreground">
              {vehicleCount} {vehicleCount === 1 ? "vehicle" : "vehicles"} available now
            </p>
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {isEmpty && hasActiveFilters ? (
            <>
              <Link href="/inventory" className={outlineButtonClass}>
                View all vehicles
              </Link>
              <Link href="/request-vehicle" className={primaryButtonClass}>
                Request a vehicle
              </Link>
            </>
          ) : isEmpty ? (
            <>
              <Link href="/request-vehicle" className={primaryButtonClass}>
                Request a vehicle
              </Link>
              <Link href="/contact" className={outlineButtonClass}>
                Contact Evo Motors
              </Link>
            </>
          ) : (
            <>
              <a href="#available-evs" className={primaryButtonClass}>
                View available EVs
              </a>
              <Link href="/request-vehicle" className={outlineButtonClass}>
                Request a vehicle
              </Link>
            </>
          )}
        </div>

        <p className="evo-muted mx-auto mt-6 max-w-sm">
          {isEmpty ? (
            <>
              Charging or ownership questions?{" "}
              <Link href="/ev-charging" className={ghostLinkClass}>
                EV charging support
              </Link>
            </>
          ) : (
            <>
              Questions about range or charging?{" "}
              <Link href="/contact" className={ghostLinkClass}>
                Talk to our team
              </Link>
              {" · "}
              <Link href="/ev-charging" className={ghostLinkClass}>
                Charging guidance
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

function BrowseHero({ hasResults, vehicleCount, className }: Omit<InventoryHeroProps, "simpleMode" | "hasActiveFilters">) {
  return (
    <section
      className={cn("evo-content-width max-w-3xl", className)}
      aria-label="Inventory overview"
    >
      <p className="evo-eyebrow text-primary">Inventory</p>
      <h1 className="evo-section-heading mt-2 text-foreground">
        Electric vehicles, expert-backed.
      </h1>
      <p className="evo-body mt-3 max-w-2xl text-muted-foreground">
        Browse our selection with support from a team that knows EV ownership inside and out.
      </p>
      {hasResults && vehicleCount != null && vehicleCount > 0 && (
        <p className="mt-4 text-sm font-medium text-foreground/90">
          {vehicleCount} {vehicleCount === 1 ? "vehicle" : "vehicles"} available
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {hasResults && (
          <a href="#available-evs" className={primaryButtonClass}>
            Browse inventory
          </a>
        )}
        <Link href="/ev-charging" className={outlineButtonClass}>
          EV charging support
        </Link>
      </div>
    </section>
  );
}

export function InventoryHero({
  simpleMode = true,
  hasResults = false,
  hasActiveFilters = false,
  vehicleCount = 0,
  className,
}: InventoryHeroProps) {
  if (simpleMode) {
    return (
      <SimplePanelHero
        hasResults={hasResults}
        hasActiveFilters={hasActiveFilters}
        vehicleCount={vehicleCount}
        className={className}
      />
    );
  }

  return (
    <BrowseHero hasResults={hasResults} vehicleCount={vehicleCount} className={className} />
  );
}
