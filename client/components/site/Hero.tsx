const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-luxury-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-end justify-end p-12"
      >
        <p className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-display leading-relaxed text-luxury-black/80 opacity-0 animate-fadeInSlow">
          “Time is the only real luxury.”
        </p>
      </div>
      <div className="relative z-10 max-w-luxury mx-auto px-8 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.1] mb-8 text-luxury-black">
          LOVE, ELEVATED
        </h1>
        <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-12 text-gray-700 tracking-luxury">
          Unhurried Time Is The Only Real Luxury
        </p>
        <a
          href="/inquire"
          className="inline-block px-12 py-5 bg-luxury-black text-white font-light text-sm tracking-uppercase uppercase hover:bg-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Request an Introduction
        </a>
      </div>
    </section>
  );
};

export default Hero;
