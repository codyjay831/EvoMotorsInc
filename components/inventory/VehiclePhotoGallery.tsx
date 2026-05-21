"use client";

import { useState, useCallback, useEffect } from "react";
import { Expand, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type VehiclePhotoGalleryProps = {
  imageUrls: string[];
  alt?: string;
  className?: string;
};

export function VehiclePhotoGallery({
  imageUrls,
  alt = "Vehicle",
  className,
}: VehiclePhotoGalleryProps) {
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
          "flex h-[240px] w-full items-center justify-center rounded-xl border border-border/60 bg-surface/50 sm:h-[280px] lg:aspect-[4/3] lg:h-auto",
          className
        )}
        aria-hidden
      >
        <Zap className="size-12 text-muted-foreground opacity-40" />
      </div>
    );
  }

  return (
    <>
      <div className={cn("space-y-3", className)}>
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border border-border/60 bg-surface/50",
            "h-[240px] w-full sm:h-[280px] lg:aspect-[4/3] lg:h-auto lg:max-h-none"
          )}
          aria-label="Main vehicle image"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            aria-label="Open full-screen gallery"
          >
            <img
              src={current}
              alt={alt}
              className="h-full w-full object-contain lg:object-cover"
              draggable={false}
            />
          </button>

          <div
            className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-xs text-white/90 backdrop-blur-sm lg:hidden"
            aria-hidden
          >
            <Expand className="size-3.5" />
            <span>{selected + 1}/{images.length}</span>
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
          <div
            className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 snap-x snap-mandatory"
            role="tablist"
            aria-label="Image thumbnails"
          >
            {images.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                role="tab"
                aria-selected={i === selected}
                aria-label={`Image ${i + 1} of ${images.length}`}
                className={cn(
                  "h-[3.75rem] w-[5.25rem] shrink-0 snap-start overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-16 sm:w-24",
                  i === selected
                    ? "border-primary opacity-100 ring-2 ring-primary/25"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={url} alt="" className="h-full w-full object-cover" draggable={false} />
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
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Previous"
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
