import { Button } from "@/components/ui/button";

const LimitedAvailabilitySection = () => {
  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-luxury px-8 text-center md:px-12">
        <p className="mb-4 text-xs font-light uppercase tracking-uppercase text-gray-600">
          Limited Availability
        </p>
        <p className="mx-auto mb-12 max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
          Currently accepting 3-4 bookings monthly among SF escorts and
          Sacramento escorts. December has two remaining opportunities.
        </p>
        <Button variant="ctaSecondary" asChild className="w-full sm:w-auto">
          <a href="/booking">Reserve Your Experience</a>
        </Button>
      </div>
    </section>
  );
};

export default LimitedAvailabilitySection;
