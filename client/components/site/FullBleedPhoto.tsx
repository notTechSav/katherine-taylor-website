import { cn } from "@/lib/utils";

type FullBleedPhotoProps = {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
};

export default function FullBleedPhoto({
  src,
  alt = "",
  className,
  sizes = "100vw",
}: FullBleedPhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full object-cover",
        className,
      )}
      decoding="async"
      fetchPriority="high"
      sizes={sizes}
    />
  );
}
