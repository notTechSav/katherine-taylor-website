const appointmentImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F2da61afc112641aebee8b6e185ff6d03?format=webp&width=1600";

const AppointmentSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div
        className="relative flex min-h-[480px] w-full items-center justify-start bg-cover bg-center px-6 py-20 sm:min-h-[560px]"
        style={{ backgroundImage: `url(${appointmentImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/10" aria-hidden="true" />
        <div className="relative z-10 max-w-[420px] space-y-5 text-left text-white">
          <span className="text-[0.72rem] uppercase tracking-[0.4em] text-white/70">
            Your Love Story Awaits
          </span>
          <p className="text-sm leading-relaxed text-white/80">
            Take a closer look at the new LOVE Unlimited creations at your
            boutique.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center border border-white/80 px-10 py-3 text-[0.68rem] uppercase tracking-[0.38em] text-white transition hover:border-white hover:bg-white/10"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
