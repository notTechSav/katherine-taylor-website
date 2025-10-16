import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  type Location,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import JournalModalRoute from "@/components/journal/JournalModalRoute";

// Eager load: Index page only (needed immediately)
import Index from "./pages/Index";

// Lazy load all other routes (code splitting for better performance)
const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const SanFrancisco = lazy(() => import("./pages/SanFrancisco"));
const Gifts = lazy(() => import("./pages/Gifts"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Inquire = lazy(() => import("./pages/Inquire"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalArticle = lazy(() => import("./pages/JournalArticle"));
const Maison = lazy(() => import("./pages/Maison"));
const Rates = lazy(() => import("./pages/Rates"));
const ContentGenerator = lazy(() => import("./pages/ContentGenerator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

type RouterState = {
  backgroundLocation?: Location;
};

// Loading fallback for lazy-loaded routes
const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-luxury-white">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-black border-t-transparent" />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as RouterState | undefined;
  const backgroundLocation = state?.backgroundLocation ?? location;

  return (
    <>
      <Suspense fallback={<RouteLoader />}>
        <Routes location={backgroundLocation}>
          <Route
            path="/"
            element={<Index />}
          />
          <Route
            path="/about"
            element={
              <SiteLayout>
                <About />
              </SiteLayout>
            }
          />
          <Route
            path="/san-francisco"
            element={
              <SiteLayout>
                <SanFrancisco />
              </SiteLayout>
            }
          />
          <Route
            path="/gifts"
            element={
              <SiteLayout>
                <Gifts />
              </SiteLayout>
            }
          />
          <Route
            path="/journal"
            element={
              <SiteLayout>
                <Journal />
              </SiteLayout>
            }
          />
          <Route
            path="/journal/:slug"
            element={
              <SiteLayout>
                <JournalArticle />
              </SiteLayout>
            }
          />
          <Route
            path="/rates"
            element={
              <SiteLayout>
                <Rates />
              </SiteLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <SiteLayout>
                <Gallery />
              </SiteLayout>
            }
          />
          <Route
            path="/faq"
            element={
              <SiteLayout>
                <FAQ />
              </SiteLayout>
            }
          />
          <Route
            path="/inquire"
            element={
              <SiteLayout>
                <Inquire />
              </SiteLayout>
            }
          />
          <Route
            path="/maison"
            element={
              <SiteLayout>
                <Maison />
              </SiteLayout>
            }
          />
          <Route
            path="/content-generator"
            element={
              <SiteLayout>
                <ContentGenerator />
              </SiteLayout>
            }
          />
          {/* 404 catch-all route */}
          <Route
            path="*"
            element={
              <SiteLayout>
                <NotFound />
              </SiteLayout>
            }
          />
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
