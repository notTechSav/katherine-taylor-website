import { Button } from "@/components/ui/button";

const boutiqueImage = "/journal-teaser-bg.webp";

const BoutiqueAppointmentSection = () => {
  return (
    <>
      {/* Mobile layout - stacked */}
      <section className="bg-luxury-white py-24 md:hidden">
        <div className="mx-auto grid max-w-luxury items-center gap-8 px-4 sm:px-6">
          <div className="relative flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md">
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${boutiqueImage})` }}
              role="img"
              aria-label="Journal background"
            />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
              Continuity as Craft
            </span>
            <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
              The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
            </p>
            <Button variant="ctaSecondary" asChild>
              <a href="/journal">Read The Journal</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Tablet/Desktop layout - original */}
      <section className="hidden md:block bg-luxury-white py-24 md:py-32 lg:py-40">
        <div className="mx-auto grid max-w-luxury items-center gap-8 px-4 sm:px-6 md:px-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative h-full w-full overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md transition-shadow duration-400 ease-out hover:shadow-luxury-lg">
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${boutiqueImage})` }}
              role="img"
              aria-label="Journal background"
            />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
              Continuity as Craft
            </span>
            <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
              The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
            </p>
            <Button variant="ctaSecondary" asChild>
              <a href="/journal">Read The Journal</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoutiqueAppointmentSection;
