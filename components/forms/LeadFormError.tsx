import { cn } from "@/lib/utils";

type LeadFormErrorProps = {
  message: string;
  onDismiss?: () => void;
  className?: string;
};

export function LeadFormError({ message, onDismiss, className }: LeadFormErrorProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-destructive/30 bg-destructive/10 p-4",
        className
      )}
      role="alert"
    >
      <p className="evo-body-sm text-destructive">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="evo-body-sm mt-2 font-medium text-destructive underline hover:no-underline evo-focus-ring rounded px-1"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
