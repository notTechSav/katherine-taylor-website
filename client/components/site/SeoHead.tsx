import { Helmet } from "react-helmet-async";

import { DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site-config";

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  geoRegion?: string;
  geoPlacename?: string;
};

const SeoHead = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Katherine Taylor Escort",
  type = "website",
  noIndex = false,
  jsonLd,
  geoRegion,
  geoPlacename,
}: SeoHeadProps) => {
  const url = path ? absoluteUrl(path) : null;
  const jsonLdItems = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Katherine Taylor" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {geoRegion ? <meta name="geo.region" content={geoRegion} /> : null}
      {geoPlacename ? (
        <meta name="geo.placename" content={geoPlacename} />
      ) : null}
      {jsonLdItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
