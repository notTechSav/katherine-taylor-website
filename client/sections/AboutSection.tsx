export default function AboutSection() {
  return (
    <div className="relative flex min-h-full w-full items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-8 text-center">
        <h2 className="mb-6 text-2xl font-serif uppercase tracking-wide text-white">
          About
        </h2>
        <a
          href="/about"
          className="border border-white px-4 py-2 text-sm uppercase text-white transition-opacity duration-250 hover:opacity-70"
        >
          Discover
        </a>
      </div>
    </div>
  );
}
