import { Link } from "react-router-dom";

const GiftsBannerSection = () => {
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
          <p className="homepage-eyebrow text-white/80">On Gifts</p>
          <h2 className="homepage-h2 text-white">Gift Etiquette</h2>
          <p className="homepage-body text-white/90">
            Gifts aren't expected—they're punctuation, not purpose. When they happen, they feel like a quiet thank-you that marks knowing each other. The best ones reflect the texture of us.
          </p>
          <Link to="/gifts" className="homepage-cta text-white">
            Gift Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftsBannerSection;
