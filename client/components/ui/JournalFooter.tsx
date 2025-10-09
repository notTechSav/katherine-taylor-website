import { memo } from "react";

interface JournalFooterLink {
  href: string;
  text: string;
}

interface JournalFooterProps {
  intro: string;
  links: JournalFooterLink[];
}

const JournalFooter = memo(({ intro, links }: JournalFooterProps) => {
  return (
    <footer className="border-t border-[#e8e8e5] bg-[#fafaf7] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-[620px] space-y-4 text-left">
        <p className="text-[14px] font-light leading-[1.7] text-[#4a4a4a]">{intro}</p>
        <nav className="flex flex-wrap gap-3 text-[14px] font-light text-[#1a1a1a]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="underline-offset-[4px] transition-colors duration-300 hover:underline"
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
});

JournalFooter.displayName = "JournalFooter";

export default JournalFooter;
