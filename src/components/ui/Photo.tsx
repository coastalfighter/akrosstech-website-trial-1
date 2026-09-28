import Image from "next/image";
import { gradedPhotos, photos, type PhotoKey } from "@/content/media";
import { cn } from "@/lib/utils";

interface PhotoProps {
  name: PhotoKey;
  className?: string;
  imgClassName?: string;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  priority?: boolean;
  /** Keep full colour (skip the cinematic grade). */
  natural?: boolean;
  /** Grade reveals full colour on hover of the photo itself. */
  hover?: boolean;
  /** Use the pre-graded file (backgrounds): same look, no runtime filters. */
  baked?: boolean;
  /** Extra overlay content (captions, gradients). */
  children?: React.ReactNode;
}

/**
 * Optimised photograph shown in monochrome, warming to full colour on
 * hover. `baked` uses the pre-graded black & white file (no runtime filter).
 */
export function Photo({
  name,
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  natural,
  hover,
  baked,
  children,
}: PhotoProps) {
  const photo = photos[name];
  const plain = natural || baked;
  return (
    <div
      className={cn(
        plain ? "relative overflow-hidden bg-soft" : "photo relative overflow-hidden bg-soft",
        hover && !plain && "photo-hover",
        className,
      )}
    >
      <Image
        src={baked ? gradedPhotos[name] : photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        // Large backgrounds skip the SVG-blur placeholder (expensive to rasterise
        // at full-viewport size); the solid panel colour stands in instead.
        placeholder={baked ? "empty" : "blur"}
        className={cn("object-cover", imgClassName)}
      />
      {children}
    </div>
  );
}
