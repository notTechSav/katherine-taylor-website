'use client';

import { useEffect } from "react";
import GiftsHero from "@/components/gifts/GiftsHero";
import GiftsContent from "@/components/gifts/GiftsContent";
import GiftsFooter from "@/components/gifts/GiftsFooter";
import {
  giftsMetadata,
  heroImage,
  giftsDisplay,
  guidanceParagraphs,
  giftsFooter,
} from "@/lib/gifts-content";
import { injectJsonLd, removeJsonLd, setLinkTag, setNamedMeta, setPropertyMeta } from "@/lib/seo-helpers";

const Gifts = () => {
  useEffect(() => {
    const { title, description, keywords, openGraph } = giftsMetadata;
    document.title = title;

    setNamedMeta("description", description);
    setNamedMeta("keywords", keywords);
    setNamedMeta("geo.region", "US-CA");
    setNamedMeta("geo.position", "37.7749;-122.4194");
    setNamedMeta("ICBM", "37.7749, -122.4194");

    const canonicalUrl = typeof window !== "undefined"
      ? `${window.location.origin}/gifts`
      : "/gifts";

    const heroImageUrl = typeof window !== "undefined"
      ? new URL(heroImage.src, window.location.origin).toString()
      : heroImage.src;

    setLinkTag("canonical", canonicalUrl);
    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:title", openGraph.title);
    setPropertyMeta("og:description", openGraph.description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:image", heroImageUrl);
    setPropertyMeta("og:image:alt", heroImage.alt);

    injectJsonLd("gifts", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: giftsDisplay.pageTitle,
      description: openGraph.description,
      url: canonicalUrl,
      image: heroImageUrl,
      author: {
        "@type": "Person",
        name: "Katherine Taylor",
      },
      keywords: giftsMetadata.keywords,
    });

    return () => {
      removeJsonLd("gifts");
    };
  }, []);

  return (
    <div className="bg-[#fafaf7] text-[#1a1a1a]">
      <GiftsHero
        title={giftsDisplay.pageTitle}
        subtitle={giftsDisplay.subtitle}
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <GiftsContent
        paragraphs={guidanceParagraphs}
        ctaLabel={giftsDisplay.ctaLabel}
        ctaLabelExpanded={giftsDisplay.ctaLabelExpanded}
      />
      <GiftsFooter intro={giftsFooter.intro} links={giftsFooter.links} />
    </div>
  );
};

export default Gifts;
