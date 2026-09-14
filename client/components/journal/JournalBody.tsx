import { memo, useMemo, type ReactNode } from "react";
import { headingId, parseJournalBody } from "@/lib/journal-content";

const journalInlineLinkClass =
  "underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline";

const internalMarkdownLink = /\[([^\]]+)\]\((\/(?!\/)[^)\s:]*)\)/g;

function renderInlineText(text: string, keyPrefix: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(internalMarkdownLink)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }
    nodes.push(
      <a
        key={`${keyPrefix}-link-${index}`}
        href={match[2]}
        className={journalInlineLinkClass}
      >
        {match[1]}
      </a>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex === 0) {
    return text;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

interface JournalBodyProps {
  body: string;
  idPrefix: string;
  className?: string;
}

const headingWeight = { fontWeight: 200 } as const;

const JournalBody = memo(({ body, idPrefix, className }: JournalBodyProps) => {
  const blocks = useMemo(() => parseJournalBody(body), [body]);
  const headingIds = useMemo(() => {
    const used = new Map<string, number>();
    return blocks.map((block) => {
      if (block.type !== "heading") {
        return null;
      }
      const base = headingId(block.text);
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      return count === 0 ? base : `${base}-${count + 1}`;
    });
  }, [blocks]);

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
          const id = headingIds[index] ?? headingId(block.text);
          if (block.level === 2) {
            return (
              <h2
                id={id}
                key={key}
                className="scroll-mt-28 pt-6 text-[26px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black"
                style={headingWeight}
              >
                {block.text}
              </h2>
            );
          }
          if (block.level === 3) {
            return (
              <h3
                id={id}
                key={key}
                className="scroll-mt-28 pt-4 text-[20px] font-light leading-[1.35] tracking-[-0.01em] text-luxury-black"
              >
                {block.text}
              </h3>
            );
          }
          return (
            <h4
              id={id}
              key={key}
              className="scroll-mt-28 pt-2 text-[18px] font-normal leading-[1.4] text-luxury-black"
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

        return <p key={key}>{renderInlineText(block.text, key)}</p>;
      })}
    </div>
  );
});

JournalBody.displayName = "JournalBody";

export default JournalBody;
