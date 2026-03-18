import { cn } from "@/lib/utils";

type SurfaceCardVariant = "default" | "glow" | "muted";

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: SurfaceCardVariant;
  as?: "div" | "article" | "section";
};

const variantClasses: Record<SurfaceCardVariant, string> = {
  default: "rounded-xl border border-border bg-card text-card-foreground",
  glow: "evo-card-glow",
  muted: "evo-card-muted",
};

export function SurfaceCard({
  children,
  className,
  variant = "default",
  as: Component = "div",
}: SurfaceCardProps) {
  return (
    <Component
      className={cn(variantClasses[variant], "transition-all duration-200", className)}
      data-slot="surface-card"
    >
      {children}
    </Component>
  );
}
