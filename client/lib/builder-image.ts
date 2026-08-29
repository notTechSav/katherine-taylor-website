const BUILDER_BASE =
  /^(https:\/\/cdn\.builder\.io\/api\/v1\/image\/[^?]+)/;

const HERO_WIDTHS = [800, 1200, 1600, 2400];

/** Responsive srcset for Builder.io URLs. Local assets are returned unchanged. */
export function builderHeroAttrs(src: string): {
  src: string;
  srcSet?: string;
  sizes?: string;
} {
  const match = src.match(BUILDER_BASE);
  if (!match) {
    return { src };
  }

  const base = match[1];
  return {
    src: `${base}?format=webp&width=1600`,
    srcSet: HERO_WIDTHS.map(
      (width) => `${base}?format=webp&width=${width} ${width}w`,
    ).join(", "),
    sizes: "100vw",
  };
}
