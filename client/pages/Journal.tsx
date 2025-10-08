'use client';

import { useLocation, useNavigate } from "react-router-dom";
import JournalFooter from "@/components/journal/JournalFooter";
import JournalGrid from "@/components/journal/JournalGrid";
import JournalHero from "@/components/journal/JournalHero";
import { essays, heroImage, journalDisplay, journalFooter } from "@/lib/journal-content";

const Journal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = (slug: string) => {
    navigate(`/journal/${slug}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="bg-[#fafaf7] text-[#1a1a1a]">
      <JournalHero
        title={journalDisplay.pageTitle}
        subtitle={journalDisplay.subtitle}
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <JournalGrid
        entries={essays}
        microline={journalDisplay.microline}
        onOpen={handleOpen}
        ctaLabel={journalDisplay.ctaLabel}
      />
      <JournalFooter intro={journalFooter.intro} links={journalFooter.links} />
    </div>
  );
};

export default Journal;
