import { HelmetProvider } from "react-helmet-async";
import "./global.css";

import "./setup/patchViteOverlay";
import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  type Location,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import JournalModalRoute from "@/components/journal/JournalModalRoute";

import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Gifts = lazy(() => import("./pages/Gifts"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Inquire = lazy(() => import("./pages/Inquire"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalArticle = lazy(() => import("./pages/JournalArticle"));
const Rates = lazy(() => import("./pages/Rates"));
const Services = lazy(() => import("./pages/Services"));
const Sacramento = lazy(() => import("./pages/Sacramento"));
const ContentGenerator = lazy(() => import("./pages/ContentGenerator"));
const AIConcierge = lazy(() => import("./pages/AIConcierge"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

type RouterState = {
  backgroundLocation?: Location;
};

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-luxury-white">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-black border-t-transparent" />
  </div>
);

const withLayout = (Page: React.ComponentType) => (
  <SiteLayout>
    <Page />
  </SiteLayout>
);

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as RouterState | undefined;
  const backgroundLocation = state?.backgroundLocation ?? location;

  return (
    <>
      <Suspense fallback={<RouteLoader />}>
        <Routes location={backgroundLocation}>
          <Route path="/" element={withLayout(Index)} />
          <Route path="/about" element={withLayout(About)} />
          <Route path="/gifts" element={withLayout(Gifts)} />
          <Route path="/journal" element={withLayout(Journal)} />
          <Route path="/journal/:slug" element={withLayout(JournalArticle)} />
          <Route path="/rates" element={withLayout(Rates)} />
          <Route path="/gallery" element={withLayout(Gallery)} />
          <Route path="/faq" element={withLayout(FAQ)} />
          <Route path="/inquire" element={withLayout(Inquire)} />
          <Route path="/maison" element={<Navigate to="/" replace />} />
          <Route path="/services" element={withLayout(Services)} />
          <Route
            path="/memoirs-in-the-city"
            element={<Navigate to="/journal/memoirs-in-the-city" replace />}
          />
          <Route
            path="/san-francisco"
            element={<Navigate to="/journal/memoirs-in-the-city" replace />}
          />
          <Route path="/sacramento-escorts" element={withLayout(Sacramento)} />
          <Route
            path="/sacramento"
            element={<Navigate to="/sacramento-escorts" replace />}
          />
          <Route path="/content-generator" element={withLayout(ContentGenerator)} />
          <Route path="/ai-concierge" element={withLayout(AIConcierge)} />
          <Route path="*" element={withLayout(NotFound)} />
        </Routes>
      </Suspense>
      {state?.backgroundLocation ? (
        <Routes>
          <Route path="/journal/:slug" element={<JournalModalRoute />} />
        </Routes>
      ) : null}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container element with id 'root' was not found.");
}

let root: Root;

if (!(globalThis as Record<string, unknown>).__APP_ROOT__) {
  root = createRoot(container);
  (globalThis as Record<string, unknown>).__APP_ROOT__ = root;
} else {
  root = (globalThis as Record<string, unknown>).__APP_ROOT__ as Root;
}

root.render(<App />);
