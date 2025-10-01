import { Button } from "@/components/ui/button";

const backgroundImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F32bd225e72b4401caaa255eefe65a6e8?format=webp&width=1600";

const LegendReinventedSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div
        className="relative flex min-h-[520px] w-full items-center justify-start bg-cover bg-center px-6 py-24 md:py-32 lg:py-40 sm:min-h-[640px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative z-10 max-w-[560px] space-y-6 text-left text-white">
          <H2 as="p" className="mb-0 text-white">
            About Katherine Taylor – The Escort Experience That Redefines "Near Me"
          </H2>
          <H3 as="p" className="mb-0 text-white/80">
            For Those Searching "Escorts Near Me" �� Discover Why Proximity Is Only the Beginning
          </H3>
          <p className="max-w-[65ch] text-sm leading-loose text-white/80">
            Too many “escorts near me” results promise the world but deliver something forgettable.
            Convenience doesn’t create connection, and proximity alone never makes an experience worth
            remembering.
          </p>
          <p className="max-w-[65ch] text-sm leading-loose text-white/80">
            That’s where I’m different. With over a decade of escort experience, I’ve built my
            reputation on anticipation, memory, and refinement. I learn your preferences quickly — from
            the way you like to be greeted to the smallest details that matter years later — and weave
            them into every encounter.
          </p>
          <p className="max-w-[65ch] text-sm leading-loose text-white/80">
            This is why clients return. Not because I’m the closest option, but because I transform time
            together into something trusted, discreet, and lasting. That’s the difference of choosing
            Katherine Taylor.
          </p>
          <Button asChild variant="ctaPrimary">
            <a href="/about">Discover</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LegendReinventedSection;
