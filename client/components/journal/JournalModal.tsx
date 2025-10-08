import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Fragment, useMemo } from "react";
import type { JournalEssay } from "@/lib/journal-content";

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  essay: JournalEssay | undefined;
  closeLabel: string;
  readNextLabel: string;
  nextEssay?: JournalEssay;
  onNavigateNext?: (slug: string) => void;
}

const overlayClassName =
  "fixed inset-0 z-[70] bg-[rgba(0,0,0,0.08)] backdrop-blur-sm transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out";

const contentClassName =
  "fixed left-1/2 top-1/2 z-[80] w-full max-w-[620px] -translate-x-1/2 -translate-y-1/2 bg-[#fafaf7] px-8 py-12 shadow-[0_24px_60px_rgba(0,0,0,0.12)] outline-none transition-[opacity,transform] duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 sm:rounded-none";

const JournalModal = ({
  isOpen,
  onClose,
  essay,
  closeLabel,
  readNextLabel,
  nextEssay,
  onNavigateNext,
}: JournalModalProps) => {
  const paragraphs = useMemo(() => {
    if (!essay) return [];
    return essay.body.split(/\n\n+/g).map((paragraph) => paragraph.trim());
  }, [essay]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlayClassName} />
        <DialogPrimitive.Content className={contentClassName} aria-describedby={undefined}>
          <div className="flex flex-col gap-8">
            <header className="space-y-3 text-left">
              <p className="text-xs font-light uppercase tracking-[0.12em] text-[#4a4a4a]">
                Published {essay?.publishedDate}
              </p>
              <DialogPrimitive.Title asChild>
                <h2
                  className="text-[32px] font-extralight leading-[1.2] tracking-[-0.02em] text-[#1a1a1a]"
                  style={{ fontWeight: 200 }}
                >
                  {essay?.title}
                </h2>
              </DialogPrimitive.Title>
            </header>
            <DialogPrimitive.Description asChild>
              <div className="space-y-6 text-[18px] font-light leading-[1.75] text-[#1a1a1a]">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${essay?.slug ?? ""}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            </DialogPrimitive.Description>
            {essay?.readNext && onNavigateNext && nextEssay ? (
              <footer className="border-t border-[#e8e8e5] pt-6">
                <button
                  type="button"
                  onClick={() => onNavigateNext(essay.readNext!)}
                  className="text-sm font-light tracking-[0.01em] text-[#1a1a1a] underline-offset-[6px] transition-colors duration-300 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1a1a1a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf7]"
>
                  {readNextLabel} <span className="font-normal">{nextEssay.title}</span>
                </button>
              </footer>
            ) : null}
          </div>
          <DialogPrimitive.Close asChild>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-8 top-8 text-sm font-light tracking-[0.08em] text-[#1a1a1a] underline-offset-4 transition-colors duration-300 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1a1a1a]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf7]"
            >
              {closeLabel}
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default JournalModal;
