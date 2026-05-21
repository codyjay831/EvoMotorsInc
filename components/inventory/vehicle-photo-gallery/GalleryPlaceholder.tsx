import { ImageOff, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryPlaceholderProps = {
  message: string;
  className?: string;
  icon: "empty" | "unavailable";
};

export function GalleryPlaceholder({ message, className, icon }: GalleryPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] w-full max-w-full items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-neutral-900/40",
        className
      )}
      aria-label="Vehicle image unavailable"
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        {icon === "empty" ? (
          <Zap className="size-10 opacity-40" aria-hidden />
        ) : (
          <ImageOff className="size-10 opacity-50" aria-hidden />
        )}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
