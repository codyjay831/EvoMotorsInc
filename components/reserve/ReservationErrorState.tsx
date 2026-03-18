import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const outlineButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 evo-focus-ring";

type ReservationErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  vehicleId: string;
  className?: string;
};

export function ReservationErrorState({
  message = "We couldn't complete your reservation right now. Please try again or contact us.",
  onRetry,
  vehicleId,
  className,
}: ReservationErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-destructive/30 bg-destructive/10 p-6 sm:p-8 text-center",
        className
      )}
      role="alert"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-destructive/20 text-destructive" aria-hidden>
        <AlertCircle className="size-6" />
      </span>
      <h2 className="evo-card-title text-foreground mt-4">Something went wrong</h2>
      <p className="evo-body text-muted-foreground mt-2 max-w-md mx-auto">
        {message}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={outlineButtonClass}
          >
            Try again
          </button>
        )}
        <Link href={`/inventory/${vehicleId}`} className={outlineButtonClass}>
          Back to vehicle
        </Link>
        <Link href="/contact" className={outlineButtonClass}>
          Contact us
        </Link>
      </div>
    </div>
  );
}
