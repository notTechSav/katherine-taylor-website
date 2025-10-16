export default function AboutSection() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-luxury-white px-6 py-12">
      <div className="max-w-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-serif mb-4">
          Strategic Counsel Meets Personal Continuity
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-6">
          I work with C-suite executives, IPO founders, and family-office principals who already have brilliant advisors but no one who remembers the whole picture—the professional, the personal, and the quiet space in between. By the third engagement, we're operating at full depth. Decisions move faster, and conversations reach a level most people never get to have.
        </p>
        <a
          href="/about"
          className="text-sm font-light uppercase tracking-uppercase text-luxury-black underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
        >
          Learn More About My Practice
        </a>
      </div>
    </div>
  );
}
