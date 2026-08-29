import { useRef } from "react";

import { useNearbyFullpageMedia } from "@/hooks/useNearbyFullpageMedia";
import { cn } from "@/lib/utils";

type FullBleedPhotoProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function FullBleedPhoto({
  src,
  alt = "",
  className,
  width = 2048,
  height = 3072,
  priority = false,
}: FullBleedPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const allowMedia = useNearbyFullpageMedia(containerRef, priority);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {allowMedia ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "low"}
          className={cn(
            "pointer-events-none h-full w-full max-h-none max-w-none object-cover object-center",
            className,
          )}
        />
      ) : null}
    </div>
  );
}
