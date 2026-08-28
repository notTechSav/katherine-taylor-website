import { memo, useMemo } from "react";
import { parseJournalBody } from "@/lib/journal-content";

interface JournalBodyProps {
  body: string;
  idPrefix: string;
  className?: string;
}

const headingWeight = { fontWeight: 200 } as const;

const JournalBody = memo(({ body, idPrefix, className }: JournalBodyProps) => {
  const blocks = useMemo(() => parseJournalBody(body), [body]);

  return (
    <div
      className={
        className ??
        "space-y-6 text-[18px] font-light leading-[1.75] text-luxury-black"
      }
    >
      {blocks.map((block, index) => {
        const key = `${idPrefix}-block-${index}`;

        if (block.type === "heading") {
          if (block.level === 2) {
            return (
              <h2
                key={key}
                className="pt-6 text-[26px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black"
                style={headingWeight}
              >
                {block.text}
              </h2>
            );
          }
          if (block.level === 3) {
            return (
              <h3
                key={key}
                className="pt-4 text-[20px] font-light leading-[1.35] tracking-[-0.01em] text-luxury-black"
              >
                {block.text}
              </h3>
            );
          }
          return (
            <h4
              key={key}
              className="pt-2 text-[18px] font-normal leading-[1.4] text-luxury-black"
            >
              {block.text}
            </h4>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="list-disc space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={key}>{block.text}</p>;
      })}
    </div>
  );
});

JournalBody.displayName = "JournalBody";

export default JournalBody;
