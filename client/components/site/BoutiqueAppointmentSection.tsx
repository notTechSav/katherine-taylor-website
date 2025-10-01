import { Button } from "@/components/ui/button";

const boutiqueImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F1e11f82a44e14d38b4acbc8cf09f2990?format=webp&width=1600";

const BoutiqueAppointmentSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div
        className="relative flex min-h-[480px] w-full items-center bg-cover bg-center px-6 py-24 md:py-32 lg:py-40 sm:min-h-[560px]"
        style={{ backgroundImage: `url(${boutiqueImage})` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[440px] space-y-6 text-white">
          <span className="text-[0.78rem] uppercase tracking-[0.4em] text-white/70">
            Your Love Story Awaits
          </span>
          <p className="max-w-[65ch] text-[0.82rem] leading-7 text-white/80 sm:text-sm">
            Take a closer look at the latest LOVE creations with a private
            appointment at your preferred boutique.
          </p>
          <Button variant="ctaPrimary">Book an Appointment</Button>
        </div>
      </div>
    </section>
  );
};

export default BoutiqueAppointmentSection;
