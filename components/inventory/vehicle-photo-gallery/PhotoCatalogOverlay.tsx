"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoTile } from "./PhotoTile";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useMountedPortal } from "./useMountedPortal";

type PhotoCatalogOverlayProps = {
  photos: string[];
  alt: string;
  catalogScrollRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
  onError: (url: string) => void;
  scrollLockActive: boolean;
};

const CATALOG_SIZES = "(max-width: 1024px) 50vw, 25vw";

export function PhotoCatalogOverlay({
  photos,
  alt,
  catalogScrollRef,
  onClose,
  onSelectPhoto,
  onError,
  scrollLockActive,
}: PhotoCatalogOverlayProps) {
  const mounted = useMountedPortal();
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(scrollLockActive);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  if (!mounted) return null;

  const [hero, ...rest] = photos;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
    >
      <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-3">
        <h2 className="text-base font-semibold">Photo gallery</h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex size-10 items-center justify-center rounded-full text-foreground evo-focus-ring"
          aria-label="Close photo gallery"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>

      <main
        ref={catalogScrollRef}
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-2 overflow-y-auto overscroll-y-contain px-4 py-4"
      >
        {hero && (
          <PhotoTile
            url={hero}
            alt={alt}
            variant="catalog"
            priority
            sizes={CATALOG_SIZES}
            className={cn(rest.length === 0 && "col-span-2")}
            onSelect={() => onSelectPhoto(0)}
            onError={() => onError(hero)}
          />
        )}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {rest.map((url, i) => (
              <PhotoTile
                key={url}
                url={url}
                alt={alt}
                variant="catalog"
                sizes={CATALOG_SIZES}
                onSelect={() => onSelectPhoto(i + 1)}
                onError={() => onError(url)}
              />
            ))}
          </div>
        )}
      </main>
    </div>,
    document.body
  );
}
