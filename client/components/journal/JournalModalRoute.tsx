'use client';

import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    if (!essay) {
      navigate("/journal", { replace: true });
    }
  }, [essay, navigate]);

  const handleClose = () => {
    if (state?.backgroundLocation) {
      navigate(-1);
    } else {
      navigate("/journal", { replace: true });
    }
  };

  const handleNavigateNext = (nextSlug: string) => {
    navigate(`/journal/${nextSlug}` , {
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
