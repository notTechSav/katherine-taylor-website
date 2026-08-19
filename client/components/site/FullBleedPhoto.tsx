import { cn } from "@/lib/utils";

type FullBleedPhotoProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function FullBleedPhoto({
  src,
  alt = "",
  className,
  width = 2048,
  height = 3072,
}: FullBleedPhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={false}
      decoding="sync"
      fetchPriority="high"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full max-h-none max-w-none object-cover object-center",
        className,
      )}
    />
  );
}
