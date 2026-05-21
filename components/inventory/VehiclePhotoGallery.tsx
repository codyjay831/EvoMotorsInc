"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Expand, ImageOff, Zap } from "lucide-react";
import { dedupePreserveOrder, normalizePhotoUrl } from "@/lib/vehicle-photos";
import { cn } from "@/lib/utils";

type VehiclePhotoGalleryProps = {
  imageUrls: string[];
  alt?: string;
  className?: string;
};

function normalizePhotos(urls: ReadonlyArray<string>): string[] {
  const normalized = urls
    .map((raw) => normalizePhotoUrl(raw))
    .filter((url): url is string => url != null);
  return dedupePreserveOrder(normalized);
}

const GALLERY_WRAPPER_CLASS = "w-full max-w-full space-y-2 sm:space-y-2.5";

const MAIN_FRAME_CLASS =
  "relative w-full max-w-full overflow-hidden rounded-xl border border-border/60 bg-black/40 " +
  "aspect-[16/10] lg:aspect-[4/3]";

function GalleryPlaceholder({
  message,
  className,
  icon,
}: {
  message: string;
  className?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={cn(GALLERY_WRAPPER_CLASS, className)}>
      <div className={MAIN_FRAME_CLASS} aria-label="Vehicle image unavailable">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-sm">{message}</span>
        </div>
      </div>
    </div>
  );
}

export function VehiclePhotoGallery({
  imageUrls,
  alt = "Vehicle",
  className,
}: VehiclePhotoGalleryProps) {
  const photos = useMemo(() => normalizePhotos(imageUrls), [imageUrls]);

  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const validPhotos = useMemo(
    () => photos.filter((url) => !failed.has(url)),
    [photos, failed]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const effectiveIndex =
    validPhotos.length === 0
      ? 0
      : selectedIndex >= 0 && selectedIndex < validPhotos.length
        ? selectedIndex
        : 0;

  const selectedPhoto: string | null =
    validPhotos[effectiveIndex] ?? validPhotos[0] ?? null;
  const hasMultiple = validPhotos.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (validPhotos.length === 0) return;
      setSelectedIndex((i) => {
        const safeI = i >= 0 && i < validPhotos.length ? i : 0;
        return (safeI + dir + validPhotos.length) % validPhotos.length;
      });
    },
    [validPhotos.length]
  );

  const handleImageError = useCallback((url: string) => {
    if (!photos.includes(url)) return;
    if (process.env.NODE_ENV !== "production") {
      console.warn("[VehiclePhotoGallery] Failed to load image:", url);
    }
    setFailed((prev) => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  }, [photos]);

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

  if (photos.length === 0) {
    return (
      <GalleryPlaceholder
        className={className}
        message="No photos yet"
        icon={<Zap className="size-10 opacity-40" aria-hidden />}
      />
    );
  }

  if (!selectedPhoto) {
    return (
      <GalleryPlaceholder
        className={className}
        message="Photo unavailable"
        icon={<ImageOff className="size-10 opacity-50" aria-hidden />}
      />
    );
  }

  return (
    <>
      <div className={cn(GALLERY_WRAPPER_CLASS, className)}>
        <div className={MAIN_FRAME_CLASS} aria-label="Main vehicle image">
          <Image
            key={selectedPhoto}
            src={selectedPhoto}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            onError={() => handleImageError(selectedPhoto)}
            className="object-contain"
            draggable={false}
          />

          <div
            className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-1 text-xs text-white/90 backdrop-blur-sm"
            aria-hidden
          >
            {effectiveIndex + 1}/{validPhotos.length}
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute right-2 top-2 z-10 hidden rounded-md bg-black/55 p-1.5 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:inline-flex"
            aria-label="Expand gallery"
          >
            <Expand className="size-4" aria-hidden />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:right-12"
                aria-label="Next image"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div
            className="flex gap-2 overflow-x-auto pb-0.5 snap-x snap-mandatory"
            role="tablist"
            aria-label="Image thumbnails"
          >
            {validPhotos.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => setSelectedIndex(i)}
                role="tab"
                aria-selected={i === effectiveIndex}
                aria-label={`Image ${i + 1} of ${validPhotos.length}`}
                className={cn(
                  "h-12 w-16 shrink-0 snap-start overflow-hidden rounded-lg border-2 bg-black/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-14 sm:w-20",
                  i === effectiveIndex
                    ? "border-primary opacity-100 ring-2 ring-primary/25"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => handleImageError(url)}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 hidden items-center justify-center bg-black/90 p-4 lg:flex"
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
            {/* eslint-disable-next-line @next/next/no-img-element -- desktop-only lightbox sizing */}
            <img
              src={selectedPhoto}
              alt={alt}
              onError={() => handleImageError(selectedPhoto)}
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
