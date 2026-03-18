"use client";

import { useState, useCallback, useEffect } from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type VehicleGalleryProps = {
  imageUrls: string[];
  alt?: string;
  className?: string;
};

export function VehicleGallery({
  imageUrls,
  alt = "Vehicle",
  className,
}: VehicleGalleryProps) {
  const images = imageUrls.length > 0 ? imageUrls : [];
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = images[selected];
  const hasMultiple = images.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      setSelected((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, go]);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "aspect-[4/3] w-full rounded-xl bg-muted/50 flex items-center justify-center",
          className
        )}
        aria-hidden
      >
        <Zap className="size-16 text-muted-foreground opacity-40" />
      </div>
    );
  }

  return (
    <>
      <div className={cn("space-y-3", className)}>
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30"
          aria-label="Main vehicle image"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
          >
            <img
              src={current}
              alt={alt}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
            />
          </button>
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        {hasMultiple && (
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Image thumbnails">
            {images.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                role="tab"
                aria-selected={i === selected}
                aria-label={`Image ${i + 1}`}
                className={cn(
                  "h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                  i === selected ? "border-primary" : "border-transparent opacity-80 hover:opacity-100"
                )}
              >
                <img src={url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute inset-0"
            aria-label="Close"
          />
          <div className="relative max-h-full max-w-4xl">
            <img
              src={current}
              alt={alt}
              className="max-h-[90vh] w-auto object-contain"
            />
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous"
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next"
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close gallery"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
