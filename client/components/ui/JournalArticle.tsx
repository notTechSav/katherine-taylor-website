'use client';

import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JournalFooter from "@/components/journal/JournalFooter";
import {
  heroImage,
  journalDisplay,
  journalFooter,
  getEssayBySlug,
  getReadNextEssay,
  essayMetadata,
} from "@/lib/journal-content";
import {
  injectJsonLd,
  removeJsonLd,
  setLinkTag,
  setNamedMeta,
  setPropertyMeta,
} from "@/lib/seo-helpers";
import NotFound from "@/pages/NotFound";

const headingLetterSpacing = { letterSpacing: "-0.02em" } as const;

const JournalArticle = () => {
  const { slug } = useParams();
  const essay = useMemo(() => getEssayBySlug(slug), [slug]);
  const readNextEssay = useMemo(() => getReadNextEssay(slug), [slug]);
  const navigate = useNavigate();

  const formattedPublishedDate = useMemo(() => {
    if (!essay) return "";
    const parsed = new Date(essay.publishedDate);
    if (Number.isNaN(parsed.getTime())) {
      return essay.publishedDate;
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsed);
  }, [essay]);

  useEffect(() => {
    if (!essay) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });

    const baseTitle = `${essay.title} — Katherine Taylor Escort`;
    document.title = baseTitle;

    const description = essayMetadata.description;
    setNamedMeta("description", description);
    setNamedMeta("keywords", essayMetadata.keywords);
    setNamedMeta("geo.region", "US-CA");
    setNamedMeta("geo.position", "37.7749;-122.4194");
    setNamedMeta("ICBM", "37.7749, -122.4194");

    const canonicalUrl = typeof window !== "undefined"
      ? `${window.location.origin}/journal/${essay.slug}`
      : `/journal/${essay.slug}`;

    setLinkTag("canonical", canonicalUrl);

    const heroImageUrl = typeof window !== "undefined"
      ? new URL(heroImage.src, window.location.origin).toString()
      : heroImage.src;

    setPropertyMeta("og:type", "article");
    setPropertyMeta("og:title", essay.title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonicalUrl);
    setPropertyMeta("og:image", heroImageUrl);
    setPropertyMeta("og:image:alt", heroImage.alt);

    injectJsonLd("journal-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: essay.title,
      description,
      author: {
        "@type": "Person",
        name: "Katherine Taylor",
      },
      publisher: {
        "@type": "Person",
        name: "Katherine Taylor",
      },
      datePublished: essay.publishedDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      keywords: essayMetadata.keywords,
      image: heroImageUrl,
    });

    return () => {
      removeJsonLd("journal-article");
    };
  }, [essay]);

  if (!essay) {
    return <NotFound />;
  }

  const paragraphs = essay.body.split(/\n\n+/g).map((paragraph) => paragraph.trim());

  return (
    <div className="bg-[#fafaf7] text-[#1a1a1a]">
      <section className="relative overflow-hidden bg-[#fafaf7]">
        <div className="relative h-[48vh] min-h-[260px] w-full sm:h-[52vh]">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(26,26,26,0.05) 0%, rgba(26,26,26,0.65) 100%)" }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1120px] px-8 pb-16 sm:px-12">
              <div className="max-w-2xl space-y-3 text-[#fafaf7]">
                <p className="text-xs font-light uppercase tracking-[0.12em] text-[#f5f4f0]/80">
                  {formattedPublishedDate}
                </p>
                <h1
                  className="text-[40px] font-extralight leading-[1.1] sm:text-[48px]"
                  style={headingLetterSpacing}
                >
                  {essay.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-[620px] space-y-8 text-left">
          <p className="text-sm font-light tracking-[0.12em] text-[#4a4a4a]">
            {journalDisplay.subtitle}
          </p>
          <div className="space-y-6 text-[18px] font-light leading-[1.75] text-[#1a1a1a]">
            {paragraphs.map((paragraph, index) => (
              <p key={`${essay.slug}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
          <div className="flex justify-between pt-8 text-sm font-light text-[#1a1a1a]">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/journal", { replace: true });
                }
              }}
              className="underline-offset-[6px] transition-colors duration-300 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1a1a1a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf7]"
            >
              {journalDisplay.closeLabel}
            </button>
            {readNextEssay ? (
              <Link
                to={`/journal/${readNextEssay.slug}`}
                className="underline-offset-[6px] transition-colors duration-300 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1a1a1a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf7]"
              >
                {journalDisplay.readNextPrefix} {readNextEssay.title}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <JournalFooter intro={journalFooter.intro} links={journalFooter.links} />
    </div>
  );
};

export default JournalArticle;
