import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import NextSectionCTA from "@/components/site/NextSectionCTA";
import SeoHead from "@/components/site/SeoHead";
import {
  briefInterruptionJsonLd,
  briefInterruptionSponsor,
  briefInterruptionVideo,
} from "@/lib/brief-interruption";
import { bindVideoLoopRestart, lockVideoLoop } from "@/lib/video-loop";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl } from "@/lib/site-config";

const ABriefInterruption = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playMotion, setPlayMotion] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlayMotion(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !playMotion) {
      return;
    }
    lockVideoLoop(element);
    return bindVideoLoopRestart(element);
  }, [playMotion]);

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    const nextMuted = !isMuted;
    element.muted = nextMuted;
    if (element.paused) {
      void element.play();
    }
    setIsMuted(nextMuted);
  };

  return (
    <main className="bg-luxury-white text-luxury-black">
      <SeoHead
        title={pageSeo.briefInterruption.title}
        description={pageSeo.briefInterruption.description}
        path={pageSeo.briefInterruption.path}
        image={absoluteUrl(briefInterruptionVideo.poster)}
        imageAlt="A Brief Interruption"
        jsonLd={briefInterruptionJsonLd}
      />

      <header className="px-6 pb-10 pt-6 text-center md:px-8 md:pb-14 md:pt-10">
        <h1 className="homepage-h1 text-luxury-black">A Brief Interruption</h1>
      </header>

      <section className="w-full bg-luxury-black">
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: `${briefInterruptionVideo.width} / ${briefInterruptionVideo.height}`,
          }}
        >
          <img
            src={briefInterruptionVideo.poster}
            alt=""
            width={briefInterruptionVideo.width}
            height={briefInterruptionVideo.height}
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
          />
          {playMotion ? (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={briefInterruptionVideo.src}
                poster={briefInterruptionVideo.poster}
                width={briefInterruptionVideo.width}
                height={briefInterruptionVideo.height}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="none"
                controls={false}
                aria-label="A Brief Interruption"
                {...{ "webkit-playsinline": "true" }}
              />
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-6 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/40 sm:right-6"
                aria-label={isMuted ? "Play audio" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </>
          ) : null}
        </div>
      </section>

      <section className="px-6 py-16 text-center md:px-8 md:py-24">
        <h2 className="homepage-h2">
          <a
            href={briefInterruptionSponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={briefInterruptionSponsor.accessibleName}
            className="inline-flex min-h-[44px] items-center text-luxury-black transition-opacity duration-250 hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            {briefInterruptionSponsor.heading} ↗
          </a>
        </h2>
      </section>

      <NextSectionCTA label="Gift Etiquette" href="/gifts" />
    </main>
  );
};

export default ABriefInterruption;
