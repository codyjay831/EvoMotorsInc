import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const glowButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 evo-focus-ring";
const outlineButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 evo-focus-ring";

type ReservationSuccessStateProps = {
  vehicleId: string;
  className?: string;
};

export function ReservationSuccessState({ vehicleId, className }: ReservationSuccessStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden>
        <Check className="size-7" />
      </span>
      <h2 className="evo-section-heading text-foreground mt-6">Reservation received</h2>
      <p className="evo-body text-muted-foreground mt-3 max-w-md mx-auto">
        We&apos;ve held this vehicle for you. Our team will contact you shortly to confirm details and, if applicable, send a secure link to complete your deposit.
      </p>
      <div className="mt-8 space-y-3">
        <p className="evo-body-sm text-muted-foreground">What happens next?</p>
        <ul className="evo-body-sm text-foreground text-left max-w-sm mx-auto space-y-2 list-disc list-inside">
          <li>We&apos;ll reach out within 1 business day</li>
          <li>Confirm vehicle availability and your details</li>
          <li>Send deposit link if required</li>
          <li>Arrange viewing or delivery when you&apos;re ready</li>
        </ul>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href={`/inventory/${vehicleId}`} className={outlineButtonClass}>
          Back to vehicle
        </Link>
        <Link href="/inventory" className={outlineButtonClass}>
          Browse inventory
        </Link>
        <Link href="/contact" className={glowButtonClass}>
          Contact us
        </Link>
      </div>
    </div>
  );
}
