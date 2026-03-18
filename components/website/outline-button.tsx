"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OutlineButtonProps = React.ComponentProps<typeof Button>;

export function OutlineButton({ className, ...props }: OutlineButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-border text-foreground hover:bg-muted/80 hover:border-primary/30 hover:text-foreground",
        "transition-colors duration-150",
        className
      )}
      {...props}
    />
  );
}
