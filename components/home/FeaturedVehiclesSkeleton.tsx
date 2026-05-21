import { cn } from "@/lib/utils";

export function FeaturedVehiclesSkeleton({ className }: { className?: string }) {
  return (
    <section
      id="inventory"
      className={cn(
        "evo-content-width relative rounded-2xl sm:rounded-3xl",
        "px-6 sm:px-8 lg:px-10",
        "bg-[linear-gradient(180deg,rgba(5,5,5,0.98)_0%,#0a0a0a_50%,rgba(6,6,6,0.98)_100%)]",
        className
      )}
      aria-label="Loading available vehicles"
      aria-busy="true"
    >
      <div className="mb-12 sm:mb-14">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted/40" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-muted/30" />
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 lg:gap-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-card"
          >
            <div className="h-[200px] animate-pulse bg-muted/30 sm:h-[220px]" />
            <div className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-muted/40" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted/30" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
