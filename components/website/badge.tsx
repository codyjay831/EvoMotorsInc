import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "muted" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/20 text-primary border border-primary/30",
  muted: "bg-muted text-muted-foreground",
  outline: "border border-border bg-transparent text-foreground",
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "evo-eyebrow inline-flex items-center rounded-md px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest",
        variantClasses[variant],
        className
      )}
      data-slot="badge"
    >
      {children}
    </span>
  );
}
