import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type ReservationTrustPanelProps = {
  className?: string;
};

export function ReservationTrustPanel({ className }: ReservationTrustPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-muted/30 px-4 py-4 sm:px-5 sm:py-5",
        className
      )}
    >
      <div className="flex gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden>
          <ShieldCheck className="size-5" />
        </span>
        <div className="space-y-1">
          <p className="evo-card-title text-foreground">Hold this vehicle</p>
          <p className="evo-body-sm text-muted-foreground">
            Enter your details to reserve it. We&apos;ll hold the vehicle for you and contact you shortly to confirm. 
            A refundable deposit may be required to secure the reservation—we&apos;ll explain the next steps when we reach out.
          </p>
        </div>
      </div>
    </div>
  );
}
