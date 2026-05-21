"use client";

import { useVehiclePhotoGallery } from "./vehicle-photo-gallery/useVehiclePhotoGallery";
import { GalleryPreview } from "./vehicle-photo-gallery/GalleryPreview";
import { GalleryPlaceholder } from "./vehicle-photo-gallery/GalleryPlaceholder";
import { PhotoCatalogOverlay } from "./vehicle-photo-gallery/PhotoCatalogOverlay";
import { PhotoViewerOverlay } from "./vehicle-photo-gallery/PhotoViewerOverlay";

type VehiclePhotoGalleryProps = {
  imageUrls: string[];
  alt?: string;
  className?: string;
};

export function VehiclePhotoGallery({
  imageUrls,
  alt = "Vehicle photo",
  className,
}: VehiclePhotoGalleryProps) {
  const g = useVehiclePhotoGallery(imageUrls);

  if (imageUrls.length === 0) {
    return (
      <GalleryPlaceholder
        message="No photos available"
        icon="empty"
        className={className}
      />
    );
  }

  if (g.validPhotos.length === 0) {
    return (
      <GalleryPlaceholder
        message="Photos unavailable"
        icon="unavailable"
        className={className}
      />
    );
  }

  return (
    <>
      <GalleryPreview
        photos={g.validPhotos}
        alt={alt}
        onSeeAll={g.openCatalog}
        onError={g.handleImageError}
        className={className}
      />
      {g.catalogOpen && (
        <PhotoCatalogOverlay
          photos={g.validPhotos}
          alt={alt}
          catalogScrollRef={g.catalogScrollRef}
          onClose={g.closeAll}
          onSelectPhoto={g.openViewer}
          onError={g.handleImageError}
          scrollLockActive={g.catalogOpen || g.viewerOpen}
        />
      )}
      {g.viewerOpen && g.selectedPhoto && (
        <PhotoViewerOverlay
          photos={g.validPhotos}
          index={g.selectedIndex}
          alt={alt}
          onBack={g.closeViewer}
          onGo={g.go}
        />
      )}
    </>
  );
}
