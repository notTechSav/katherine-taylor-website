import { Button } from "@/components/ui/button";

const LimitedAvailabilitySection = () => {
  return (
    <>
      {/* Mobile layout - stacked */}
      <section className="bg-luxury-white py-12 md:hidden">
        <div className="mx-auto grid max-w-luxury items-center gap-8 px-8">
          <div className="relative flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md">
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(/limited-availability-bg.webp)` }}
              role="img"
              aria-label="Limited availability background"
            />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
              Limited Availability
            </span>
            <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
              Currently accepting 3–4 bookings monthly. November holds two remaining appointments. December holds four.
            </p>
            <Button variant="ctaSecondary" asChild>
              <a href="/inquire">Reserve Your Experience</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Tablet/Desktop layout - original */}
      <section className="hidden md:block relative bg-luxury-black py-24 md:py-32 lg:py-40">
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
        <div className="relative z-10 mx-auto max-w-luxury px-8 text-center md:px-12">
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
    </>
  );
};

export default LimitedAvailabilitySection;
