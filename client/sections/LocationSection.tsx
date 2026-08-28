import { Link } from "react-router-dom";

const SanFranciscoTeaserSection = () => {
  return (
    <div className="relative z-10 flex min-h-full w-full items-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="homepage-rail relative z-10 py-8 md:py-12">
        <div className="homepage-copy space-y-8">
          <p className="homepage-eyebrow text-white/80">The City</p>
          <h2 className="homepage-h2 text-white">San Francisco Escorts</h2>
          <p className="homepage-body text-white/90">
            Where I spend most of my time with clients. Where continuity happens. I know this city the way you know your own patterns—where discretion matters, which hotels understand privacy, how to move through the city without friction.
          </p>
          <Link to="/memoirs-in-the-city" className="homepage-cta text-white">
            Explore San Francisco
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SanFranciscoTeaserSection;
