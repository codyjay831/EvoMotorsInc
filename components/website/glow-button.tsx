"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GlowButtonProps = React.ComponentProps<typeof Button>;

export function GlowButton({ className, ...props }: GlowButtonProps) {
  return (
    <Button
      className={cn(
        "bg-primary text-primary-foreground shadow-[0_0_20px_-2px_var(--glow-subtle)]",
        "hover:bg-primary/90 hover:shadow-[0_0_28px_-2px_var(--glow-subtle)]",
        "focus-visible:ring-primary/50",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}
