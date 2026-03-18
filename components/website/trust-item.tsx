import { cn } from "@/lib/utils";

type TrustItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
};

export function TrustItem({ label, value, icon, className }: TrustItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border border-border bg-surface/50 px-4 py-3",
        "transition-colors hover:border-border hover:bg-surface/80",
        className
      )}
      data-slot="trust-item"
    >
      <span className="evo-muted text-xs">{label}</span>
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary [&_svg]:size-4" aria-hidden>{icon}</span>}
        <span className="evo-card-title text-foreground">{value}</span>
      </div>
    </div>
  );
}
