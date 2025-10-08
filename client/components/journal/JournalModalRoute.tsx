'use client';

import { useEffect } from "react";
import { type Location, useLocation, useNavigate, useParams } from "react-router-dom";
import JournalModal from "@/components/journal/JournalModal";
import { getEssayBySlug, getReadNextEssay, journalDisplay } from "@/lib/journal-content";

type LocationState = {
  backgroundLocation?: Location;
};

const JournalModalRoute = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  const essay = getEssayBySlug(slug);
  const nextEssay = getReadNextEssay(slug ?? undefined);

  useEffect(() => {
    if (!slug) {
      navigate("/journal", { replace: true });
      return;
    }
    if (!essay) {
      navigate("/journal", { replace: true });
    }
  }, [essay, navigate, slug]);

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(-1);
    } else {
      navigate("/journal", { replace: true });
    }
  };

  useEffect(() => {
    if (!essay) return;
    const previousTitle = document.title;
    document.title = `${essay.title} — Katherine Taylor Escort`;
    return () => {
      document.title = previousTitle;
    };
  }, [essay]);

  const handleNavigateNext = (nextSlug: string) => {
    navigate(`/journal/${nextSlug}`, {
      replace: true,
      state: { backgroundLocation: state?.backgroundLocation ?? location },
    });
  };

  return (
    <JournalModal
      isOpen={Boolean(essay)}
      essay={essay}
      nextEssay={nextEssay}
      onClose={handleClose}
      onNavigateNext={handleNavigateNext}
      closeLabel={journalDisplay.closeLabel}
      readNextLabel={journalDisplay.readNextPrefix}
    />
  );
};

export default JournalModalRoute;
