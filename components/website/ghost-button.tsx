"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GhostButtonProps = React.ComponentProps<typeof Button>;

export function GhostButton({ className, ...props }: GhostButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "text-foreground hover:bg-muted/80 hover:text-foreground",
        "transition-colors duration-150",
        className
      )}
      {...props}
    />
  );
}
