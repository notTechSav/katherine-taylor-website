const LoveUnlimitedSection = () => {
  return (
    <section className="border-b border-border/60 bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-4 px-6 text-center">
        <h2 className="text-[0.78rem] uppercase tracking-[0.4em] text-foreground">
          The New Love Unlimited
        </h2>
        <p className="text-[0.82rem] leading-7 text-foreground/80 sm:text-sm">
          Creative, pure, and symbolically powerful, the latest LOVE Unlimited
          designs intensify the original design with luminous flexibility.
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center border border-foreground px-8 py-2 text-[0.68rem] uppercase tracking-[0.38em] text-foreground transition-all duration-luxury-fast ease-luxury-in hover:bg-foreground hover:text-background"
        >
          Shop
        </button>
      </div>
    </section>
  );
};

export default LoveUnlimitedSection;
