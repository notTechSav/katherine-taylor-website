import { Button } from "@/components/ui/button";

const boutiqueImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F1e11f82a44e14d38b4acbc8cf09f2990?format=webp&width=1600";

const BoutiqueAppointmentSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-luxury-black">
      <div
        className="relative flex min-h-[480px] w-full items-center bg-cover bg-center px-8 py-24 sm:min-h-[560px] md:py-32 lg:py-40"
        style={{ backgroundImage: `url(${boutiqueImage})` }}
      >
        <div
          className="absolute inset-0 bg-luxury-black/60"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[540px] space-y-8 text-luxury-white">
          <span className="text-xs font-light uppercase tracking-uppercase text-white/70">
            Continuity as Craft
          </span>
          <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-white/85">
            The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
          </p>
          <Button variant="ctaPrimary" asChild>
            <a href="/journal">Read The Journal</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BoutiqueAppointmentSection;
