import { cn } from "@/lib/utils";

type LeadFormSubmitProps = {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};

const buttonClass =
  "inline-flex h-11 w-full items-center justify-center rounded-lg border border-transparent bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)] evo-focus-ring disabled:pointer-events-none disabled:opacity-60";

export function LeadFormSubmit({
  children,
  loading = false,
  className,
  disabled,
}: LeadFormSubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled ?? loading}
      className={cn(buttonClass, className)}
    >
      {loading ? "Sending…" : children}
    </button>
  );
}
