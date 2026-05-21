"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dedupePreserveOrder, normalizePhotoUrl } from "@/lib/vehicle-photos";

function normalizePhotos(urls: ReadonlyArray<string>): string[] {
  const normalized = urls
    .map((raw) => normalizePhotoUrl(raw))
    .filter((url): url is string => url != null);
  return dedupePreserveOrder(normalized);
}

function clampIndex(index: number, length: number): number {
  if (length === 0) return 0;
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

export function useVehiclePhotoGallery(imageUrls: string[]) {
  const photos = useMemo(() => normalizePhotos(imageUrls), [imageUrls]);

  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const validPhotos = useMemo(
    () => photos.filter((url) => !failed.has(url)),
    [photos, failed]
  );

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const vdpScrollYRef = useRef(0);
  const catalogScrollTopRef = useRef(0);
  const catalogScrollRef = useRef<HTMLElement | null>(null);

  const effectiveIndex = clampIndex(selectedIndex, validPhotos.length);
  const selectedPhoto = validPhotos[effectiveIndex] ?? null;

  const handleImageError = useCallback(
    (url: string) => {
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
    },
    [photos]
  );

  const openCatalog = useCallback(() => {
    vdpScrollYRef.current = window.scrollY;
    setSelectedIndex(0);
    setViewerOpen(false);
    setCatalogOpen(true);
  }, []);

  const closeAll = useCallback(() => {
    setViewerOpen(false);
    setCatalogOpen(false);
    const y = vdpScrollYRef.current;
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  }, []);

  const openViewer = useCallback((index: number) => {
    if (catalogScrollRef.current) {
      catalogScrollTopRef.current = catalogScrollRef.current.scrollTop;
    }
    setSelectedIndex(clampIndex(index, validPhotos.length));
    setViewerOpen(true);
  }, [validPhotos.length]);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    requestAnimationFrame(() => {
      if (catalogScrollRef.current) {
        catalogScrollRef.current.scrollTop = catalogScrollTopRef.current;
      }
    });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (validPhotos.length === 0) return;
      setSelectedIndex((i) => {
        const safe = clampIndex(i, validPhotos.length);
        return (safe + dir + validPhotos.length) % validPhotos.length;
      });
    },
    [validPhotos.length]
  );

  useEffect(() => {
    return () => {
      setViewerOpen(false);
      setCatalogOpen(false);
      const y = vdpScrollYRef.current;
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    };
  }, []);

  useEffect(() => {
    if (!catalogOpen && !viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewerOpen) closeViewer();
        else closeAll();
      }
      if (viewerOpen && e.key === "ArrowLeft") go(-1);
      if (viewerOpen && e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [catalogOpen, viewerOpen, closeAll, closeViewer, go]);

  return {
    validPhotos,
    catalogOpen,
    viewerOpen,
    effectiveIndex,
    selectedPhoto,
    selectedIndex: effectiveIndex,
    catalogScrollRef,
    openCatalog,
    closeAll,
    openViewer,
    closeViewer,
    go,
    handleImageError,
  };
}
