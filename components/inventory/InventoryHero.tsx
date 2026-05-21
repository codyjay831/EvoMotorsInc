import Link from "next/link";
import { cn } from "@/lib/utils";

type InventoryHeroProps = {
  simpleMode?: boolean;
  hasResults?: boolean;
  hasActiveFilters?: boolean;
  vehicleCount?: number;
  className?: string;
};

const SIMPLE_CONTENT_WIDTH = "mx-auto w-full max-w-4xl";

const primaryButtonClass =
  "inline-flex h-9 items-center justify-center rounded-lg border border-transparent bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_0_16px_-6px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-9 items-center justify-center rounded-lg border border-border/75 bg-transparent px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/25 hover:bg-muted/70 evo-focus-ring";
const ghostLinkClass =
  "text-sm font-medium text-primary transition-colors hover:text-primary/85 evo-focus-ring rounded-sm";

function PanelGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent md:hidden"
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

  const headline =
    isEmpty && hasActiveFilters
      ? "No vehicles match those filters"
      : "Your EV search, with real guidance.";

  const body =
    isEmpty && hasActiveFilters
      ? "Try clearing your filters or tell us what you are looking for — we can help source it."
      : isEmpty
        ? "Small inventory, hands-on service. We help you source the right EV, answer ownership questions, and guide you on charging — before and after the sale."
        : "Hand-picked electric vehicles on our lot, backed by a team that knows EV ownership inside and out.";

  const actions =
    isEmpty && hasActiveFilters ? (
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
    );

  const supportLinks = isEmpty ? (
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
  );

  return (
    <section
      className={cn("evo-content-width", className)}
      aria-label="Inventory overview"
    >
      <div
        className={cn(
          SIMPLE_CONTENT_WIDTH,
          isEmpty &&
            "evo-inventory-panel relative max-w-xl px-6 py-7 text-center shadow-[0_0_0_1px_rgb(255_255_255_/_0.02),0_0_32px_-20px_var(--glow-subtle)] sm:px-8 sm:py-8 md:max-w-4xl md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:text-left md:shadow-none"
        )}
      >
        {isEmpty && <PanelGlow />}

        <p className="evo-eyebrow text-primary">Inventory</p>

        <div
          className={cn(
            "mt-3",
            (hasResults || isEmpty) && "md:flex md:items-end md:justify-between md:gap-8"
          )}
        >
          <div className={cn(hasResults || isEmpty ? "md:max-w-xl" : "mx-auto max-w-md")}>
            <h1 className="evo-section-heading mt-2 font-sans text-foreground">
              {headline}
            </h1>
            <p
              className={cn(
                "evo-body mt-3 text-muted-foreground",
                !isEmpty && "text-muted-foreground/92",
                isEmpty && "mx-auto max-w-md md:mx-0"
              )}
            >
              {body}
            </p>
            {hasResults && (
              <p className="mt-3.5 inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/80">
                {vehicleCount} {vehicleCount === 1 ? "vehicle" : "vehicles"} available now
              </p>
            )}
          </div>

          <div
            className={cn(
              "mt-6 flex flex-wrap items-center gap-2.5",
              (hasResults || isEmpty) && "md:mt-0 md:shrink-0 md:justify-end",
              isEmpty && "justify-center md:justify-end"
            )}
          >
            {actions}
          </div>
        </div>

        <p
          className={cn(
            "evo-muted mt-4 max-w-sm",
            isEmpty ? "mx-auto md:mx-0" : "md:mt-5"
          )}
        >
          {supportLinks}
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
