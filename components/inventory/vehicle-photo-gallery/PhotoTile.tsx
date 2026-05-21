"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type PhotoTileProps = {
  url: string;
  alt: string;
  variant: "preview" | "catalog";
  priority?: boolean;
  sizes: string;
  className?: string;
  onSelect?: () => void;
  onError?: () => void;
};

export function PhotoTile({
  url,
  alt,
  variant,
  priority = false,
  sizes,
  className,
  onSelect,
  onError,
}: PhotoTileProps) {
  const frameClass = cn(
    "relative w-full overflow-hidden rounded-lg bg-neutral-900 aspect-[16/10]",
    className
  );

  const image = (
    <Image
      src={url}
      alt={variant === "preview" ? "" : alt}
      fill
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      onError={onError}
      className={variant === "preview" ? "object-cover pointer-events-none" : "object-contain"}
      draggable={false}
    />
  );

  if (variant === "preview") {
    return (
      <div className={frameClass} aria-hidden>
        {image}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(frameClass, "touch-manipulation evo-focus-ring")}
      aria-label={`View photo: ${alt}`}
    >
      {image}
    </button>
  );
}
