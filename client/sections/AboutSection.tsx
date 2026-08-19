export default function AboutSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-6 py-8 text-center">
      {/* Heading */}
      <h2 className="mb-6 text-2xl font-serif uppercase tracking-wide text-white">
        About
      </h2>

      {/* CTA Button */}
      <a
        href="/about"
        className="border border-white px-4 py-2 text-sm uppercase text-white transition-opacity duration-250 hover:opacity-70"
      >
        Discover
      </a>
    </div>
  );
}
