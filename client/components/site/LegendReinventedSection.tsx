import { Button } from "@/components/ui/button";

const backgroundImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fe246c70555454c878a1ed76d322ad9a5?format=webp&width=1600";

const LegendReinventedSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div
        className="relative flex min-h-[520px] w-full items-center justify-start bg-cover bg-center px-6 py-24 md:py-32 lg:py-40 sm:min-h-[640px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/10"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[520px] space-y-6 text-left text-white">
          <span className="text-[0.72rem] uppercase tracking-[0.4em] text-white/80">
            The Legend Reinvented
          </span>
          <p className="max-w-[65ch] text-sm leading-loose text-white/80">
            Born in New York City in 1969, the LOVE bracelet is a jewelry icon.
            With its special screwdriver, falling in love became a bold,
            symbolic adventure. Now, the Maison reimagines the original bracelet
            with multiple gadrooned links punctuated by the characteristic
            hand-polished screws. Flexible, classic, or studded with diamonds,
            there is a LOVE bracelet for every style.
          </p>
          <Button variant="ctaPrimary">Discover the Collection</Button>
        </div>
      </div>
    </section>
  );
};

export default LegendReinventedSection;
