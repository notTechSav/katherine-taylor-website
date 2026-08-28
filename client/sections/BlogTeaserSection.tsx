import { Link } from "react-router-dom";

const JournalTeaserCard = () => {
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
          <p className="homepage-eyebrow text-white/80">The Journal</p>
          <h2 className="homepage-h2 text-white">Continuity as Craft</h2>
          <p className="homepage-body text-white/90">
            The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
          </p>
          <Link to="/journal" className="homepage-cta text-white">
            Read the Journal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JournalTeaserCard;
