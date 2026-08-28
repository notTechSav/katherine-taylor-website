import { Link } from "react-router-dom";

const SacramentoTeaserSection = () => {
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
            Katherine Taylor • Sacramento Escort
          </p>
          <h2 className="homepage-h2 text-white">
            Escorts Near Me | The High-End Edition
          </h2>
          <div className="space-y-5">
            <p className="homepage-body text-white/90">
              “Escorts near me” is an incredibly efficient Google search. I'm not convinced it's a particularly good selection criterion.
            </p>
            <p className="homepage-body text-white/90">
              Memory matters. Compatibility matters. Discretion matters. Presence matters. And sometimes the right person is worth getting on a plane for.
            </p>
            <p className="homepage-body text-white/90">
              I left escorting because I genuinely thought I was going to get married. That did not go according to plan.
            </p>
          </div>
          <Link to="/sacramento-escorts" className="homepage-cta text-white">
            Escorts Near Me — The High-End Edition
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SacramentoTeaserSection;
