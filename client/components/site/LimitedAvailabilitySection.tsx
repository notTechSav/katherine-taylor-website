const LimitedAvailabilitySection = () => {
  return (
    <section className="animate-fade-in-up bg-stone-50 py-16">
      <div className="mx-auto max-w-7xl px-8 text-center md:px-12">
        <p className="mb-4 text-[0.78rem] uppercase tracking-[0.4em] text-stone-500">
          Limited Availability
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-[0.82rem] leading-7 text-stone-900/80 sm:text-sm">
          Currently accepting 3-4 bookings monthly among SF escorts and Sacramento
          escorts. December has two remaining opportunities.
        </p>
        <a
          href="/booking"
          className="inline-block border border-stone-900 px-8 py-4 text-[0.68rem] uppercase tracking-[0.38em] text-stone-900 transition-all duration-luxury-fast ease-luxury-in hover:border-stone-600 hover:text-stone-600"
        >
          Reserve Your Experience
        </a>
      </div>
    </section>
  );
};

export default LimitedAvailabilitySection;
