import { useCallback, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current";

const peekImages = [
  {
    src: "/peek/01.jpg",
    alt: "Katherine Taylor in a red dress, from Instagram",
  },
  {
    src: "/peek/02.jpg",
    alt: "Katherine Taylor looking out over a city at night, from Instagram",
  },
  {
    src: "/peek/03.jpg",
    alt: "Katherine Taylor, from Instagram",
  },
  {
    src: "/peek/04.jpg",
    alt: "Katherine Taylor, from Instagram",
  },
  {
    src: "/peek/05.jpg",
    alt: "Katherine Taylor, from Instagram",
  },
  {
    src: "/peek/07.jpg",
    alt: "Katherine Taylor, from Instagram",
  },
  {
    src: "/peek/08.jpg",
    alt: "Katherine Taylor, from Instagram",
  },
  {
    src: "/peek/09.jpg",
    alt: "Katherine Taylor, from Instagram",
  },
] as const;

const handleClass = `relative inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[11px] font-light tracking-[0.08em] text-gray-500 transition-opacity duration-300 hover:opacity-70 ${focusRing}`;

function PeekCursor({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous" : "Next"}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-luxury-black bg-transparent text-luxury-black transition-opacity duration-300 hover:opacity-70 ${
        isPrev ? "left-1 sm:left-2" : "right-1 sm:right-2"
      } ${focusRing}`}
    >
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.25}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            isPrev
              ? "M15.75 19.5 8.25 12l7.5-7.5"
              : "M8.25 4.5 15.75 12l-7.5 7.5"
          }
        />
      </svg>
    </button>
  );
}

const WorldPeek = () => {
  const [api, setApi] = useState<CarouselApi>();

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section
      aria-label="A peek into my world"
      className="flex flex-col items-center gap-6 text-center md:gap-8"
    >
      <p className="text-[10px] font-light uppercase tracking-[0.18em] text-luxury-black sm:text-[11px]">
        A Peek Into My World
      </p>
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <a
          href="https://x.com/TheKatherineExp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Katherine Taylor on X"
          className={handleClass}
        >
          𝕏 @TheKatherineExp
        </a>
        <span aria-hidden="true" className="text-[11px] font-light text-gray-400">
          |
        </span>
        <a
          href="https://www.instagram.com/katherineunscripted/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Katherine Taylor on Instagram"
          className={handleClass}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            aria-hidden="true"
          >
            <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          @katherineunscripted
        </a>
      </p>

      <div className="relative w-full max-w-luxury">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true, dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {peekImages.map((image) => (
              <CarouselItem
                key={image.src}
                className="basis-[8.5rem] pl-3 sm:basis-[10rem]"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <PeekCursor direction="prev" onClick={scrollPrev} />
        <PeekCursor direction="next" onClick={scrollNext} />
      </div>

      <p className="text-sm font-light text-gray-500">
        Moments. Places. Things I love.
      </p>
    </section>
  );
};

export default WorldPeek;
