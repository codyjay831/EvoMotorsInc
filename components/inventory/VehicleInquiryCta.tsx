import Link from "next/link";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring";
const outlineButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring";

type VehicleInquiryCtaProps = {
  vehicleId: string;
  className?: string;
};

export function VehicleInquiryCta({ vehicleId, className }: VehicleInquiryCtaProps) {
  return (
    <section
      className={cn(
        "evo-content-width rounded-2xl border border-border bg-surface/60 py-10 sm:py-12 px-6 sm:px-8",
        className
      )}
      aria-label="Get in touch"
    >
      <div className="evo-content-narrow mx-auto text-center">
        <h2 className="evo-section-heading text-foreground">
          Interested in this vehicle?
        </h2>
        <p className="evo-body text-muted-foreground mt-3">
          Reserve it while you decide, or ask us anything. We’re here to help.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/inventory/${vehicleId}/reserve`} className={glowButtonClass}>
            Reserve vehicle
          </Link>
          <Link href={`/request-vehicle?vehicleId=${vehicleId}`} className={outlineButtonClass}>
            Ask about this vehicle
          </Link>
          <Link
            href="/contact"
            className="evo-body-sm font-medium text-muted-foreground no-underline hover:text-foreground transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
