import { Link } from "react-router-dom";

const FAQTeaserCard = () => {
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
          <p className="homepage-eyebrow text-white/80">
            Transparency Over Theater
          </p>
          <h2 className="homepage-h2 text-white">Frequently Asked Questions</h2>
          <p className="homepage-body text-white/90">
            I answer the questions other providers don't. After a decade at the highest tier of this industry, I answer what law firm blogs and agency websites won't touch.
          </p>
          <Link to="/faq" className="homepage-cta text-white">
            Read the FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQTeaserCard;
