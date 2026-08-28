import { Helmet } from "react-helmet-async";

import { DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site-config";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
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
  const url = absoluteUrl(path);

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
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Katherine Taylor" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
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
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};

export default SeoHead;
