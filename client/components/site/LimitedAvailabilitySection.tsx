const LimitedAvailabilitySection = () => {
  return (
    <section className="bg-stone-50 py-16 animate-fade-in-up">
      <div className="mx-auto max-w-7xl px-8 text-center md:px-12">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-stone-500">
          Limited Availability
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-lg font-light tracking-[0.05em] text-stone-900 md:text-xl">
          Currently accepting 3-4 bookings monthly among SF escorts and Sacramento
          escorts. December has two remaining opportunities.
        </p>
        <a
          href="/booking"
          className="inline-block border border-stone-900 px-8 py-4 text-xs uppercase tracking-[0.2em] text-stone-900 transition-colors duration-300 hover:border-stone-600 hover:text-stone-600"
        >
          Reserve Your Experience
        </a>
      </div>
    </section>
  );
};

export default LimitedAvailabilitySection;
