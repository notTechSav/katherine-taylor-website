import { Button } from "@/components/ui/button";

const featureImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Ffc14bd30d26048e5a25fd00cf89da05e?format=webp&width=1600";

const DesignInMotionSection = () => {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-luxury items-center gap-8 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12 lg:gap-16">
        <div className="space-y-6 text-left">
          <h2 className="text-[0.78rem] uppercase tracking-[0.4em] text-foreground">
            A Design in Motion
          </h2>
          <p className="max-w-[65ch] text-[0.82rem] leading-7 text-foreground/80 sm:text-sm">
            Preserving the harmony and proportion of the beloved collection, the
            new LOVE Unlimited ring designs echo all the same distinctive
            features of the bracelet: gadroons, sophistication, and precious
            sparkle with the iconic screw motif.
          </p>
          <Button variant="ctaSecondary">
            Shop Love Rings
          </Button>
        </div>
        <div className="relative h-full w-full overflow-hidden border border-border/80 bg-muted/40">
          <div
            className="aspect-[4/3] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${featureImage})` }}
            role="img"
            aria-label="Love rings displayed against NYC skyline"
          />
        </div>
      </div>
    </section>
  );
};

export default DesignInMotionSection;
