const braceletImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F3787c432450b4b348ab6d2d5752be09d?format=webp&width=1600";

const LoveStorySection = () => {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-luxury items-center gap-8 px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <div className="relative flex items-center justify-center overflow-hidden border border-border/70 bg-muted/40">
          <div
            className="aspect-[4/3] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${braceletImage})` }}
            role="img"
            aria-label="Cartier Love bracelets against Brooklyn Bridge"
          />
        </div>
        <div className="space-y-4 text-left">
          <span className="text-[0.75rem] uppercase tracking-[0.45em] text-foreground">
            A Love Story Without Limits
          </span>
          <p className="max-w-[65ch] text-[0.82rem] leading-7 text-foreground/80 sm:text-sm">
            A true feat of innovation, the bracelet is the result of over one
            hundred trials and prototypes by the Manufacture and the Maison&apos;s
            design studios. Radiant as one or linked to another bracelet: its
            special clasp can connect, making a pair, or an endless amount.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-start text-[0.68rem] uppercase tracking-[0.38em] text-foreground underline underline-offset-4 transition-all duration-luxury-fast ease-luxury-in hover:text-accent"
          >
            Shop Love Bracelets
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
