const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-white">
    <div className="max-w-luxury mx-auto px-8 text-center">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.1] mb-8">
        Your Headline Here
      </h1>
      <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
        Your elegant subheadline that provides context and intrigue
      </p>
      <button className="px-12 py-5 bg-black text-white font-light text-sm tracking-widest uppercase hover:bg-gray-900 transition-all duration-luxury-fast">
        Explore Collection
      </button>
    </div>
  </section>
);

export default Hero;
