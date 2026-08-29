import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import SiteLayout from "@/components/site/SiteLayout";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Gallery from "@/pages/Gallery";
import Gifts from "@/pages/Gifts";
import GiftsGuidance from "@/pages/GiftsGuidance";
import Index from "@/pages/Index";
import Inquire from "@/pages/Inquire";
import JournalArticle from "@/pages/JournalArticle";
import { JournalIndexContent } from "@/pages/Journal";
import NotFound from "@/pages/NotFound";
import Rates from "@/pages/Rates";
import Sacramento from "@/pages/Sacramento";

export const ROUTE_BODY_START = "<!--route-body:start-->";
export const ROUTE_BODY_END = "<!--route-body:end-->";

const withLayout = (Page: ComponentType) => (
  <SiteLayout>
    <Page />
  </SiteLayout>
);

const GiftsFallback = () => (
  <Gifts>
    <details className="border-t border-gray-200 bg-luxury-white px-6 py-16 sm:px-10">
      <summary className="mx-auto max-w-[680px] cursor-pointer text-[14px] font-light tracking-[0.01em] text-luxury-black underline-offset-[6px]">
        Read guidance
      </summary>
      <div className="mx-auto mt-10 max-w-[680px]">
        <GiftsGuidance />
      </div>
    </details>
  </Gifts>
);

const PrerenderRoutes = () => (
  <Routes>
    <Route path="/" element={withLayout(Index)} />
    <Route path="/about" element={withLayout(About)} />
    <Route path="/gifts" element={withLayout(GiftsFallback)} />
    <Route path="/journal" element={withLayout(JournalIndexContent)} />
    <Route path="/journal/:slug" element={withLayout(JournalArticle)} />
    <Route path="/rates" element={withLayout(Rates)} />
    <Route path="/gallery" element={withLayout(Gallery)} />
    <Route path="/faq" element={withLayout(FAQ)} />
    <Route path="/inquire" element={withLayout(Inquire)} />
    <Route path="/sacramento-escorts" element={withLayout(Sacramento)} />
    <Route path="/404" element={withLayout(NotFound)} />
    <Route path="*" element={withLayout(NotFound)} />
  </Routes>
);

function PrerenderApp({ path }: { path: string }) {
  return (
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]} initialIndex={0}>
        <PrerenderRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );
}

function revealCollapsedSections(html: string): string {
  return html.replace(/max-h-0 opacity-0/g, "max-h-none opacity-100");
}

function titledFallback(title: string, description: string): string {
  return renderToStaticMarkup(
    createElement(
      "div",
      {
        className:
          "flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden bg-luxury-white text-gray-700",
      },
      createElement(
        "main",
        { className: "px-6 py-24 md:px-8" },
        createElement(
          "h1",
          {
            className:
              "text-[32px] font-extralight tracking-[-0.02em] text-luxury-black",
          },
          title,
        ),
        createElement(
          "p",
          { className: "mt-6 text-base font-light text-gray-700" },
          description,
        ),
      ),
    ),
  );
}

export function renderRouteBodyInner(path: string): string {
  if (path === "/content-generator") {
    return titledFallback("Content Generator", "Internal content tools.");
  }
  if (path === "/ai-concierge") {
    return titledFallback("AI Concierge", "Internal concierge tools.");
  }

  const markup = revealCollapsedSections(
    renderToStaticMarkup(createElement(PrerenderApp, { path })),
  );

  return `<div id="prerender-root">${markup}</div>`;
}

export function renderRouteBodyBlock(path: string): string {
  return `${ROUTE_BODY_START}\n${renderRouteBodyInner(path)}\n    ${ROUTE_BODY_END}`;
}

export function applyRouteBody(html: string, path: string): string {
  const pattern = new RegExp(
    `${ROUTE_BODY_START}[\\s\\S]*?${ROUTE_BODY_END}`,
  );
  if (!pattern.test(html)) {
    throw new Error("index.html is missing route-body markers");
  }
  return html.replace(pattern, renderRouteBodyBlock(path));
}

export function htmlHidesPrerenderRoot(html: string): boolean {
  const normalized = html.replace(/\s+/g, " ").toLowerCase();
  const prerenderOpen = html.match(
    /<div[^>]*id="prerender-root"[^>]*>/i,
  )?.[0];
  return (
    /html\.js\s+#prerender-root/.test(normalized) ||
    /#prerender-root\{[^}]*(display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0|clip(?:-path)?\s*:|position\s*:\s*absolute[^;]*(left|top)\s*:\s*-\d)/.test(
      normalized,
    ) ||
    /classlist\.add\(\s*["']js["']\s*\)/.test(normalized) ||
    Boolean(
      prerenderOpen &&
        /aria-hidden|inert|hidden|display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0/i.test(
          prerenderOpen,
        ),
    )
  );
}
