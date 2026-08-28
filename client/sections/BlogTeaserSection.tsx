import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

const JournalTeaserCard = () => {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower-strong" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">The Journal</p>
        <h2 className="homepage-h2">Continuity as Craft</h2>
        <p className="homepage-body">
          The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
        </p>
        <Link to="/journal" className="homepage-cta text-white">
          Read the Journal
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
};

export default JournalTeaserCard;
