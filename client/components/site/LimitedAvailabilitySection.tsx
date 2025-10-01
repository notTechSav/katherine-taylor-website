import { Button } from "@/components/ui/button";

const LimitedAvailabilitySection = () => {
  return (
    <section className="animate-fade-in-up bg-stone-50 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-8 text-center md:px-12">
        <p className="mb-4 text-[0.78rem] uppercase tracking-[0.4em] text-stone-500">
          Limited Availability
        </p>
        <p className="mx-auto mb-8 max-w-[65ch] text-[0.82rem] leading-7 text-stone-900/80 sm:text-sm">
          Currently accepting 3-4 bookings monthly among SF escorts and Sacramento
          escorts. December has two remaining opportunities.
        </p>
        <Button variant="ctaSecondary" asChild>
          <a href="/booking">Reserve Your Experience</a>
        </Button>
      </div>
    </section>
  );
};

export default LimitedAvailabilitySection;
