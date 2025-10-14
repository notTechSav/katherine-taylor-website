import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const InquireTeaserCard = () => {
  const animRef = useScrollAnimation();

  return (
    <section className="relative bg-luxury-black flex items-center justify-center" style={{ height: 'min(100vh, 100dvh)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/limited-availability-bg.webp"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.4) 0%, rgba(17,17,17,0.6) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div ref={animRef} className="relative z-10 mx-auto max-w-luxury px-8 text-center md:px-12 w-full fade-in-on-scroll">
        <h2 className="mb-4 text-xs font-light uppercase tracking-uppercase text-luxury-white/80">
          Limited Availability
        </h2>
        <p className="mx-auto mb-12 max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-luxury-white/90">
          Currently accepting 3–4 bookings monthly. November holds two remaining appointments. December holds four.
        </p>
        <a
          href="/inquire"
          className="text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
        >
          Reserve Your Experience
        </a>
      </div>
    </section>
  );
};

export default InquireTeaserCard;
