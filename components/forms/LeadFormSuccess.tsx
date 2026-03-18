import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type LeadFormSuccessProps = {
  title?: string;
  message?: string;
  className?: string;
};

export function LeadFormSuccess({
  title = "Thank you",
  message = "We've received your message and will be in touch soon.",
  className,
}: LeadFormSuccessProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-primary/30 bg-primary/5 p-6 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden>
        <Check className="size-6" />
      </span>
      <h3 className="evo-card-title text-foreground mt-4">{title}</h3>
      <p className="evo-body text-muted-foreground mt-2">{message}</p>
    </div>
  );
}
