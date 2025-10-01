const LoveUnlimitedSection = () => {
  return (
    <section className="border-b border-border/60 bg-white py-16 sm:py-20">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-[0.78rem] uppercase tracking-[0.4em] text-foreground">
          The New Love Unlimited
        </h2>
        <p className="font-serif text-xl leading-relaxed text-foreground/80 sm:text-2xl">
          Creative, pure, and symbolically powerful, the latest LOVE Unlimited
          designs intensify the original design with luminous flexibility.
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center border border-foreground px-9 py-2 text-[0.68rem] uppercase tracking-[0.38em] text-foreground transition hover:bg-foreground hover:text-background"
        >
          Shop
        </button>
      </div>
    </section>
  );
};

export default LoveUnlimitedSection;
