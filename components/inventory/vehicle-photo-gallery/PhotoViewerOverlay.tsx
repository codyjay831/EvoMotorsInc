"use client";

import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMountedPortal } from "./useMountedPortal";

type PhotoViewerOverlayProps = {
  photos: string[];
  index: number;
  alt: string;
  onBack: () => void;
  onGo: (dir: 1 | -1) => void;
};

type ViewerImageProps = {
  url: string;
  alt: string;
};

function ViewerImage({ url, alt }: ViewerImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        className={cn(
          "max-h-full max-w-full h-auto w-auto object-contain",
          loading && "opacity-0"
        )}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        draggable={false}
      />
    </>
  );
}

export function PhotoViewerOverlay({
  photos,
  index,
  alt,
  onBack,
  onGo,
}: PhotoViewerOverlayProps) {
  const mounted = useMountedPortal();
  const touchStartX = useRef<number | null>(null);
  const url = photos[index];

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start == null) return;
      const end = e.changedTouches[0]?.clientX;
      if (end == null) return;
      const delta = end - start;
      if (Math.abs(delta) < 50) return;
      onGo(delta > 0 ? -1 : 1);
    },
    [onGo]
  );

  if (!mounted || !url) return null;

  const showNav = photos.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-black text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
    >
      <header
        className="flex shrink-0 items-center gap-3 px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex size-10 items-center justify-center rounded-full evo-focus-ring"
          aria-label="Back to photo gallery"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <span className="text-sm font-medium tabular-nums">
          {index + 1} of {photos.length}
        </span>
      </header>

      <main
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ViewerImage key={url} url={url} alt={alt} />

        {showNav && (
          <>
            <button
              type="button"
              onClick={() => onGo(-1)}
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 sm:inline-flex evo-focus-ring"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onGo(1)}
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 sm:inline-flex evo-focus-ring"
              aria-label="Next photo"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </>
        )}
      </main>
    </div>,
    document.body
  );
}
