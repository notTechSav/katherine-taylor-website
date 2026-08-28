import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <div className="relative z-10 flex min-h-full w-full items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="homepage-rail relative z-10 flex flex-col items-center justify-center py-8 text-center">
        <h2 className="homepage-h2 mb-6 text-white">About Katherine Taylor</h2>
        <Link to="/about" className="homepage-cta-frame text-white">
          About Katherine
        </Link>
      </div>
    </div>
  );
}
