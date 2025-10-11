import React, { useEffect, useMemo, useRef, useState } from "react";

// LWS utility CSS (tokens + durations) — keep inline for the preview
const Tokens = () => (
  <style>{`
    :root{
      --shadow-elevation-sm: 0 1px 2px rgba(0,0,0,0.06);
      --shadow-elevation-md: 0 4px 10px rgba(0,0,0,0.07);
      --shadow-elevation-lg: 0 12px 24px rgba(0,0,0,0.09);
      --safe-top: env(safe-area-inset-top);
      --safe-bottom: env(safe-area-inset-bottom);
      --color-ink:#1a1a1a;
      --color-paper:#fafafa;
    }
    .duration-250{ transition-duration:250ms; }
    .duration-400{ transition-duration:400ms; }
    @media (prefers-reduced-motion: reduce){
      *{ transition-duration: 0.01ms !important; animation-duration:0.01ms !important; animation-iteration-count:1 !important; }
    }
  `}</style>
);

type CTA = "private-access" | "conversation" | "inquire";
type FrameAsset = {
  base: string;
  widths?: number[];
  alt?: string;
};

type Collection = {
  slug: string;
  dir?: string;
  placeholderSeed?: string;
  title: string;
  statement: string;
  cta: CTA;
  count: number;
  hero?: {
    src: string;
    srcSet?: string;
    alt?: string;
  };
  frames?: FrameAsset[];
};

type FrameMeta = {
  camera?: string;
  lens?: string;
  focal?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  capturedAt?: string;
  notes?: string;
};

type CollectionMeta = Record<string, FrameMeta>;

const createBuilderSrcSet = (base: string, widths: number[]) =>
  widths.map((width) => `${base}?format=webp&width=${width} ${width}w`).join(", ");

const builderFrameWidths = [640, 960, 1200, 1600];

const silkAndStoneHeroBase = "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fe754cc1d8e334af9a33739cb169d8cce";
const silkAndStoneHeroWidths = [640, 960, 1200, 1600];
const silkAndStoneHeroSrcSet = createBuilderSrcSet(silkAndStoneHeroBase, silkAndStoneHeroWidths);

const DATA: Collection[] = [
  {
    slug: "photos-1",
    title: "Silk & Stone — Los Angeles, 2025",
    statement: "Matte textures; afternoon shadow; breath held.",
    cta: "private-access",
    count: 0,
    hero: {
      src: `${silkAndStoneHeroBase}?format=webp&width=1200`,
      srcSet: silkAndStoneHeroSrcSet,
      alt: "Silk & Stone collection hero featuring Katherine Taylor in white lingerie beside a sunlit window",
    },
    frames: [],
  },
];

const pad3 = (n: number) => String(n).padStart(3, "0");
const enc = (s: string) => encodeURI(s);

const getFrameAsset = (c: Collection, index: number) => c.frames?.[index - 1];

const heroSrc = (c: Collection): string | undefined => {
  if (c.hero?.src) {
    return c.hero.src;
  }
  if (c.dir) {
    return enc(`${c.dir}/hero.avif`);
  }
  return undefined;
};

const heroSrcSet = (c: Collection): string | undefined => {
  if (c.hero?.srcSet) {
    return c.hero.srcSet;
  }
  if (c.dir) {
    return [800, 1200, 1600, 2000]
      .map((w) => `${enc(`${c.dir}/hero-${w}.avif`)} ${w}w`)
      .join(", ");
  }
  return undefined;
};

const heroSizes = "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw";

const frameSrc = (c: Collection, i: number): string | undefined => {
  const asset = getFrameAsset(c, i);
  if (asset) {
    const widths = asset.widths ?? builderFrameWidths;
    const largest = widths[widths.length - 1];
    return `${asset.base}?format=webp&width=${largest}`;
  }
  if (c.dir) {
    return enc(`${c.dir}/images/${pad3(i)}.avif`);
  }
  return undefined;
};

const frameSrcSet = (c: Collection, i: number): string | undefined => {
  const asset = getFrameAsset(c, i);
  if (asset) {
    return createBuilderSrcSet(asset.base, asset.widths ?? builderFrameWidths);
  }
  if (c.dir) {
    return [800, 1200, 1600, 2000, 2400]
      .map((w) => `${enc(`${c.dir}/images/${pad3(i)}-${w}.avif`)} ${w}w`)
      .join(", ");
  }
  return undefined;
};

const frameAlt = (c: Collection, index: number) => getFrameAsset(c, index)?.alt ?? `${c.title} — frame ${pad3(index)}`;

const frameCount = (c: Collection) => c.frames?.length ?? (c.dir ? c.count : 0);

const frameSizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

function canHover() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(hover: hover)").matches;
}

function saveData() {
  if (typeof navigator === "undefined") return false;
  return (navigator as any)?.connection?.saveData === true;
}

function prefetchImages(urls: (string | undefined)[]) {
  if (saveData() || !canHover()) return;
  urls.forEach((u) => {
    if (!u) return;
    const img = new Image();
    (img as any).decoding = "async";
    img.src = u;
  });
}

const prefetched = new Set<string>();

function useCollectionMeta(c: Collection) {
  const [meta, setMeta] = useState<CollectionMeta | null>(null);

  useEffect(() => {
    if (!c.dir) {
      setMeta(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const url = enc(`${c.dir}/meta.json`);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setMeta(null);
          return;
        }
        const json = await res.json();
        if (!cancelled) setMeta(json as CollectionMeta);
      } catch {
        if (!cancelled) setMeta(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [c.dir]);

  return meta;
}

function summarizeMeta(m?: FrameMeta): string {
  if (!m) return "—";
  const parts: string[] = [];
  if (m.camera) parts.push(m.camera);
  if (m.lens) parts.push(m.lens);
  const expo: string[] = [];
  if (m.focal) expo.push(m.focal);
  if (m.aperture) expo.push(`f/${m.aperture}`);
  if (m.shutter) expo.push(m.shutter);
  if (m.iso) expo.push(`ISO ${m.iso}`);
  if (expo.length) parts.push(expo.join(" · "));
  return parts.join(" · ") || "—";
}

function RadioCard({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`border border-neutral-300 px-4 py-3 text-sm font-light rounded-none cursor-pointer ${
        checked ? "bg-neutral-900 text-white" : ""
      }`}
    >
      <input type="radio" name="layout" className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
  ariaLabel,
  ariaBusy,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaBusy?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
      className={`inline-flex items-center justify-center uppercase tracking-[0.15em] text-[13px] sm:text-[14px] font-light px-10 sm:px-12 py-4 sm:py-5 bg-[var(--color-ink)] text-white rounded-none duration-250 ease-out hover:opacity-90 disabled:opacity-60 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center uppercase tracking-[0.15em] text-[13px] sm:text-[14px] font-light px-10 sm:px-12 py-4 sm:py-5 border border-[var(--color-ink)] text-[color:var(--color-ink)] rounded-none duration-250 ease-out hover:bg-[var(--color-ink)] hover:text-[color:var(--color-paper)] ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

function Hub({ onOpen, onIntent }: { onOpen: (slug: string) => void; onIntent: (slug: string) => void }) {
  return (
    <section className="mx-auto max-w-[1180px] px-6 md:px-12 py-24 md:py-40">
      <header className="mx-auto mb-16 max-w-[720px] md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-[58px] font-extralight tracking-[-0.03em] leading-[1.05]">
          Private Collections
        </h1>
        <h2 className="sr-only">Katherine Taylor escort</h2>
        <h2 className="sr-only">Sacramento escort · Bay Area escort</h2>
        <p className="mt-4 max-w-[36ch] text-sm sm:text-base font-light leading-[1.75] text-neutral-600">
          Three rooms, three stories. Choose where to begin — each collection opens into its own space.
        </p>
      </header>
      <div className="grid grid-cols-1 justify-items-start gap-y-16 sm:grid-cols-2 sm:gap-x-16 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-20">
        {DATA.map((c) => (
          <article key={c.slug} className="group w-full max-w-[360px]">
            <button
              onMouseEnter={() => onIntent(c.slug)}
              onFocus={() => onIntent(c.slug)}
              onClick={() => onOpen(c.slug)}
              className="block w-full text-left focus:outline-none"
              aria-label={`Enter collection ${c.title}`}
              aria-describedby={`${c.slug}-desc`}
            >
              <div
                className="aspect-[4/5] overflow-hidden"
                style={{ boxShadow: "var(--shadow-elevation-md)" }}
              >
                {(() => {
                  const src = heroSrc(c);
                  if (!src) {
                    return <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-xs uppercase tracking-[0.18em] text-neutral-500">Image coming soon</div>;
                  }
                  return (
                    <img
                      src={src}
                      srcSet={heroSrcSet(c)}
                      sizes={heroSizes}
                      alt={c.hero?.alt ?? `${c.title} hero`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  );
                })()}
              </div>
              <div className="mt-5 space-y-2">
                <h2 className="text-xl sm:text-2xl md:text-[28px] font-extralight tracking-[-0.02em]">
                  {c.title}
                </h2>
                <p id={`${c.slug}-desc`} className="text-xs sm:text-sm font-light text-neutral-600">
                  {c.statement}
                </p>
                <span className="inline-block text-[11px] sm:text-xs tracking-[0.18em] uppercase">
                  View Collection
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function CollectionHeader({ c, onOpen, onBack }: { c: Collection; onOpen: () => void; onBack: () => void }) {
  return (
    <section className="mx-auto max-w-[1180px] px-6 md:px-12 py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] lg:items-start">
        <div className="space-y-8">
          <button
            onClick={onBack}
            className="inline-flex h-10 items-center text-xs uppercase tracking-[0.15em] text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60"
            aria-label="Back to Gallery"
            title="Back to Gallery"
          >
            Back to Collections
          </button>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-extralight tracking-[-0.025em] leading-[1.05]">
              {c.title}
            </h1>
            <h2 className="sr-only">{c.title} — Katherine Taylor escort</h2>
            <p className="max-w-[48ch] text-sm sm:text-base font-light leading-[1.75] text-neutral-700">
              {c.statement}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <PrimaryButton className="w-full sm:w-auto" ariaLabel={`${c.title}: primary inquiry`}>
              {c.cta === "private-access" && "Request Private Access"}
              {c.cta === "conversation" && "Book a Private Conversation"}
              {c.cta === "inquire" && "Inquire"}
            </PrimaryButton>
            <SecondaryButton className="w-full sm:w-auto" onClick={onOpen} ariaLabel={`Build Private Deck for ${c.title}`}>
              Build Private Deck
            </SecondaryButton>
          </div>
        </div>
        {(() => {
          const src = heroSrc(c);
          if (!src) return null;
          return (
            <figure className="hidden lg:block aspect-[4/5] overflow-hidden" style={{ boxShadow: "var(--shadow-elevation-md)" }}>
              <img
                src={src}
                srcSet={heroSrcSet(c)}
                sizes="(min-width: 1280px) 360px, 30vw"
                alt={c.hero?.alt ?? `${c.title} hero frame`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </figure>
          );
        })()}
      </div>
    </section>
  );
}

function FrameGrid({ c, onOpen }: { c: Collection; onOpen: (index: number) => void }) {
  return (
    <section className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-12 pb-24 md:pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {Array.from({ length: c.count }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onOpen(idx + 1)}
            className="block text-left focus:outline-none"
            aria-label={`Open ${frameAlt(c, idx + 1)} full screen`}
          >
            <figure className="aspect-[4/5] overflow-hidden" style={{ boxShadow: "var(--shadow-elevation-sm)" }}>
              <img
                src={frameSrc(c, idx + 1)}
                srcSet={frameSrcSet(c, idx + 1)}
                sizes={frameSizes}
                alt={frameAlt(c, idx + 1)}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </figure>
          </button>
        ))}
      </div>
    </section>
  );
}

function DeckBuilder({ c, onClose }: { c: Collection; onClose: () => void }) {
  const [layout, setLayout] = useState<"one" | "four" | "sheet">("one");
  const [selected, setSelected] = useState(() => new Set<number>(Array.from({ length: c.count }, (_, i) => i + 1)));
  const [email, setEmail] = useState("");
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState<{ url: string; expires: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const [announce, setAnnounce] = useState<string | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = (n: number) => {
    const next = new Set(selected);
    next.has(n) ? next.delete(n) : next.add(n);
    setSelected(next);
  };

  const frames = useMemo(() => Array.from({ length: c.count }, (_, i) => i + 1), [c.count]);
  const selectedCount = selected.size;
  const allSelected = selectedCount === c.count;

  function onSelectAll() {
    if (allSelected) {
      setSelected(new Set());
      setAnnounce("Cleared all frames");
    } else {
      setSelected(new Set(frames));
      setAnnounce("Selected all frames");
    }
    setTimeout(() => setAnnounce(null), 1200);
  }

  function build() {
    setBuilding(true);
    setTimeout(() => {
      const token = Math.random().toString(36).slice(2, 10);
      const url = `/decks/${token}/deck.pdf`;
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      console.log({ includeWatermark });
      setResult({ url, expires });
      setBuilding(false);
      if (liveRef.current) liveRef.current.focus();
    }, 600);
  }

  return (
    <div className="fixed inset-0 bg-black/30" role="dialog" aria-modal="true" aria-labelledby="deck-title" aria-describedby="deck-desc">
      <div
        className="absolute right-0 top-0 h-full w-full md:max-w-[560px] bg-white p-6 sm:p-8 pb-[calc(1rem+var(--safe-bottom))] overflow-y-auto"
        style={{ boxShadow: "var(--shadow-elevation-lg)" }}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id="deck-title" className="text-xl sm:text-2xl font-extralight tracking-[-0.02em]">
            Build Private Deck
          </h2>
          <button ref={closeRef} onClick={onClose} className="text-sm uppercase tracking-[0.15em]" aria-label="Close deck builder">
            Close
          </button>
        </div>
        <p id="deck-desc" className="mt-2 text-sm font-light text-neutral-700">
          {c.title}
        </p>

        <hr className="my-6 border-neutral-200" />

        <div role="group" aria-labelledby="layout-label">
          <h3 id="layout-label" className="text-xs sm:text-sm uppercase tracking-[0.15em]">
            Layout
          </h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Deck layout">
            <RadioCard label="One per page" checked={layout === "one"} onChange={() => setLayout("one")} />
            <RadioCard label="Four per page" checked={layout === "four"} onChange={() => setLayout("four")} />
            <RadioCard label="Contact sheet" checked={layout === "sheet"} onChange={() => setLayout("sheet")} />
          </div>
        </div>

        <div className="mt-8" role="group" aria-labelledby="frames-label">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <h3 id="frames-label" className="text-xs sm:text-sm uppercase tracking-[0.15em]">
                Frames
              </h3>
              <span className="text-xs text-neutral-600">{selectedCount}/{c.count} selected</span>
            </div>
            <button
              className={`text-[11px] sm:text-xs uppercase tracking-[0.15em] underline underline-offset-4 duration-250 ease-out ${
                allSelected ? "decoration-neutral-900/80" : "decoration-neutral-900/60"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60`}
              onClick={onSelectAll}
              aria-label={allSelected ? "Clear all frames" : "Select all frames"}
              aria-pressed={allSelected}
            >
              {allSelected ? "Clear all" : "Select all"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {frames.map((n) => (
              <button
                key={n}
                onClick={() => toggle(n)}
                role="checkbox"
                aria-checked={selected.has(n)}
                className={`h-9 sm:h-10 text-[11px] sm:text-xs font-light border border-neutral-300 ${
                  selected.has(n) ? "bg-neutral-900 text-white" : "text-neutral-900"
                } rounded-none duration-250`}
              >
                {pad3(n)}
              </button>
            ))}
          </div>
          <div className="sr-only" aria-live="polite">
            {announce ?? ""}
          </div>
        </div>

        <div className="mt-8" role="group" aria-labelledby="delivery-label">
          <h3 id="delivery-label" className="text-xs sm:text-sm uppercase tracking-[0.15em]">
            Delivery
          </h3>
          <div className="mt-3 grid gap-3">
            <label className="sr-only" htmlFor="deck-email">
              Email (optional)
            </label>
            <input
              id="deck-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Optional email for share link"
              className="w-full border border-neutral-300 px-4 py-3 text-sm font-light rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60"
            />
            <label className="inline-flex items-center gap-2 text-xs font-light text-neutral-700">
              <input
                type="checkbox"
                checked={includeWatermark}
                onChange={(e) => setIncludeWatermark(e.target.checked)}
              />
              Include subtle watermark in deck (optional)
            </label>
            <PrimaryButton onClick={build} disabled={building} className="w-full md:w-auto" ariaLabel="Create deck" ariaBusy={building}>
              {building ? "Creating…" : "Create Deck"}
            </PrimaryButton>
            {result && (
              <div ref={liveRef} tabIndex={-1} aria-live="polite" className="mt-3 text-sm font-light">
                <div>Your private deck is ready. Link expires in 7 days.</div>
                <div className="mt-1">
                  <a className="underline" href={result.url} target="_blank" rel="noreferrer">
                    {result.url}
                  </a>
                </div>
                <div className="mt-1 text-neutral-600">Expires: {new Date(result.expires).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>

        <hr className="my-6 border-neutral-200" />

        <ul className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
          <li>Cover: {c.title} — From the archive.</li>
          <li>Footer: By-appointment only · Private social escort & strategic presence.</li>
          <li>Watermark: off by default (toggle above if needed).</li>
          <li>Noindex / nofollow for share links; 7-day expiry.</li>
        </ul>
      </div>
    </div>
  );
}

function ImageViewer({
  c,
  meta,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  c: Collection;
  meta: CollectionMeta | null;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const total = c.count;
  const title = frameAlt(c, index);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key.toLowerCase() === "d") setShowDetails((v) => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const prev = index <= 1 ? total : index - 1;
    const next = index >= total ? 1 : index + 1;
    prefetchImages([frameSrc(c, prev), frameSrc(c, next)]);
  }, [c, index, total]);

  const m: FrameMeta | undefined = meta?.[pad3(index)];
  const specsSummary = summarizeMeta(m);
  const capture = m?.capturedAt ? new Date(m.capturedAt).toLocaleString() : "—";
  const notes = m?.notes ?? "—";

  return (
    <div className="fixed inset-0 bg-black/90 text-white" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 md:px-8 pt-[calc(16px+var(--safe-top))] pb-4 flex items-center justify-between gap-3">
        <button
          onClick={onClose}
          className="text-xs uppercase tracking-[0.15em] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60"
        >
          Back to Collection
        </button>
        <div className="text-xs font-light opacity-80">
          {pad3(index)} / {pad3(total)}
        </div>
      </div>

      <div className="h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <img
          ref={imgRef}
          src={frameSrc(c, index)}
          srcSet={frameSrcSet(c, index)}
          sizes="100vw"
          alt={title}
          className="max-h-[82vh] max-w-[92vw] object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
        <button
          onClick={onPrev}
          aria-label="Previous image"
          className="h-12 w-12 rounded-none border border-white/40 text-white/80 duration-250 ease-out hover:text-white hover:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          aria-label="Next image"
          className="h-12 w-12 rounded-none border border-white/40 text-white/80 duration-250 ease-out hover:text-white hover:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          ›
        </button>
      </div>

      <div className="absolute left-0 right-0 bottom-0 px-4 sm:px-6 md:px-8 pb-[calc(16px+var(--safe-bottom))] pt-4 text-[12px] sm:text-sm font-light text-white/85">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="uppercase tracking-[0.15em] text-[11px] sm:text-xs opacity-80">Title</div>
            <div>{title}</div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDetails((v) => !v)}
              aria-expanded={showDetails}
              className="text-xs uppercase tracking-[0.15em] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              {showDetails ? "Hide details" : "Details"}
            </button>
          </div>
        </div>
        {showDetails && (
          <div id="viewer-details" className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-90">
            <div>
              <div className="uppercase tracking-[0.15em] text-[11px] sm:text-xs opacity-80">Specs</div>
              <div>{specsSummary}</div>
            </div>
            <div>
              <div className="uppercase tracking-[0.15em] text-[11px] sm:text-xs opacity-80">Capture</div>
              <div>{capture}</div>
            </div>
            <div>
              <div className="uppercase tracking-[0.15em] text-[11px] sm:text-xs opacity-80">Notes</div>
              <div>{notes}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DeckBuilderPreview() {
  const [view, setView] = useState<"hub" | "collection">("hub");
  const [slug, setSlug] = useState<string>(DATA[0].slug);
  const [open, setOpen] = useState(false);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const current = useMemo(() => DATA.find((d) => d.slug === slug) ?? DATA[0], [slug]);
  const meta = useCollectionMeta(current);

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (viewerIdx !== null) el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
  }, [viewerIdx]);

  return (
    <div className="text-neutral-900">
      <Tokens />
      {view === "hub" ? (
        <Hub
          onOpen={(s) => {
            setSlug(s);
            setView("collection");
          }}
          onIntent={(s) => {
            const c = DATA.find((d) => d.slug === s);
            if (!c || prefetched.has(c.slug)) return;
            const n = Math.min(6, c.count);
            prefetchImages(Array.from({ length: n }, (_, i) => frameSrc(c, i + 1)));
            prefetched.add(c.slug);
          }}
        />
      ) : (
        <>
          <CollectionHeader
            c={current}
            onOpen={() => setOpen(true)}
            onBack={() => setView("hub")}
          />
          <FrameGrid c={current} onOpen={(i) => setViewerIdx(i)} />
        </>
      )}
      {open && <DeckBuilder c={current} onClose={() => setOpen(false)} />}
      {viewerIdx !== null && (
        <ImageViewer
          c={current}
          meta={meta}
          index={viewerIdx}
          onClose={() => setViewerIdx(null)}
          onPrev={() => setViewerIdx((i) => (i! <= 1 ? current.count : i! - 1))}
          onNext={() => setViewerIdx((i) => (i! >= current.count ? 1 : i! + 1))}
        />
      )}
    </div>
  );
}
