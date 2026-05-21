"use client";

import { Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoTile } from "./PhotoTile";

type GalleryPreviewProps = {
  photos: string[];
  alt: string;
  onSeeAll: () => void;
  onError: (url: string) => void;
  className?: string;
};

const PREVIEW_HERO_SIZES = "(max-width: 1024px) 100vw, 50vw";
const PREVIEW_MOSAIC_LARGE_SIZES = "(max-width: 1024px) 50vw, 33vw";
const PREVIEW_MOSAIC_SMALL_SIZES = "(max-width: 1024px) 50vw, 25vw";

function SeeAllButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white backdrop-blur touch-manipulation evo-focus-ring"
    >
      <Images className="size-4 shrink-0" aria-hidden />
      See all photos ({count})
    </button>
  );
}

export function GalleryPreview({
  photos,
  alt,
  onSeeAll,
  onError,
  className,
}: GalleryPreviewProps) {
  const count = photos.length;
  const mosaicPhotos = count >= 5 ? photos.slice(0, 5) : photos;
  const sidePhotos = mosaicPhotos.slice(1);

  return (
    <div className={cn("relative w-full max-w-full", className)}>
      {/* Mobile: single hero */}
      <div className="relative lg:hidden">
        <PhotoTile
          url={photos[0]!}
          alt={alt}
          variant="preview"
          priority
          sizes={PREVIEW_HERO_SIZES}
          onError={() => onError(photos[0]!)}
        />
        <SeeAllButton count={count} onClick={onSeeAll} />
      </div>

      {/* Desktop: single hero or 1 large + side grid */}
      <div className="relative hidden lg:block">
        {sidePhotos.length === 0 ? (
          <PhotoTile
            url={mosaicPhotos[0]!}
            alt={alt}
            variant="preview"
            priority
            sizes={PREVIEW_HERO_SIZES}
            onError={() => onError(mosaicPhotos[0]!)}
          />
        ) : (
          <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
            <div className="relative row-span-2 min-h-[280px]">
              <PhotoTile
                url={mosaicPhotos[0]!}
                alt={alt}
                variant="preview"
                priority
                sizes={PREVIEW_MOSAIC_LARGE_SIZES}
                className="absolute inset-0 h-full rounded-none aspect-auto"
                onError={() => onError(mosaicPhotos[0]!)}
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              {sidePhotos.map((url) => (
                <PhotoTile
                  key={url}
                  url={url}
                  alt={alt}
                  variant="preview"
                  sizes={PREVIEW_MOSAIC_SMALL_SIZES}
                  onError={() => onError(url)}
                />
              ))}
            </div>
          </div>
        )}
        <SeeAllButton count={count} onClick={onSeeAll} />
      </div>
    </div>
  );
}
