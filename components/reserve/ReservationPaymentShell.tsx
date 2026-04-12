import { cn } from "@/lib/utils";
import type { ReserveResponse } from "@/lib/api";

type ReservationPaymentShellProps = {
  status: "pending" | "reserved";
  reservation?: ReserveResponse | null;
  className?: string;
};

export function ReservationPaymentShell({
  status,
  reservation,
  className,
}: ReservationPaymentShellProps) {
  const depositDisplay = reservation?.depositAmountDisplay;
  const hasClientSecret = !!reservation?.clientSecret;

  if (status === "pending") {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-surface/50 p-5 sm:p-6",
          className
        )}
      >
        <h3 className="evo-card-title text-foreground">Reservation deposit</h3>
        <p className="evo-muted mt-2 text-sm">
          After you hold the vehicle, we&apos;ll confirm your reservation and send secure payment details if a deposit is required.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6",
        className
      )}
    >
      <h3 className="evo-card-title text-foreground">Reservation held</h3>
      {reservation?.message && (
        <p className="evo-body text-muted-foreground mt-2">{reservation.message}</p>
      )}
      {depositDisplay && !hasClientSecret && (
        <p className="evo-body-sm mt-4 text-foreground">
          Refundable deposit: <span className="font-semibold">{depositDisplay}</span>
          <span className="evo-muted ml-1">We&apos;ll send a secure link to complete payment.</span>
        </p>
      )}
      {hasClientSecret && (
        <div className="mt-4 rounded-lg border border-border bg-background p-4" data-slot="payment-form">
          <p className="evo-muted text-sm">Payment form will be embedded here when wired.</p>
        </div>
      )}
      {reservation?.expiresAt && (
        <p className="evo-muted mt-3 text-xs">
          Hold expires: {new Date(reservation.expiresAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
        </p>
      )}
    </div>
  );
}
