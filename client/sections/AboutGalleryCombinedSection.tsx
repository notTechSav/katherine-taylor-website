import FullBleedPhoto from "@/components/site/FullBleedPhoto";

export default function AboutGalleryCombinedSection() {
  return (
    <div className="grid h-full w-full grid-cols-2">
      {/* Left Column: About */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 py-12">
        <FullBleedPhoto src="/about-slide-mobile.webp?v=hires3" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <h2 className="relative z-10 mb-6 text-xl font-serif uppercase tracking-wider leading-tight text-white">
          About
        </h2>
        <a
          href="/about"
          className="relative z-10 inline-block border border-white px-4 py-2 text-sm uppercase text-white transition-opacity duration-250 hover:opacity-70"
        >
          Discover
        </a>
      </div>

      {/* Right Column: Gallery */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 py-12">
        <FullBleedPhoto src="/katherinewindow.webp?v=hires3" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <h2 className="relative z-10 mb-6 text-xl font-serif uppercase tracking-wider leading-tight text-white">
          Gallery
        </h2>
        <a
          href="/gallery"
          className="relative z-10 inline-block border border-white px-4 py-2 text-sm uppercase text-white transition-opacity duration-250 hover:opacity-70"
        >
          Explore
        </a>
      </div>
    </div>
  );
}
