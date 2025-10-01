import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "@/components/site/SiteLayout";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";
import Gifts from "./pages/Gifts";
import Index from "./pages/Index";
import Inquire from "./pages/Inquire";
import Journal from "./pages/Journal";
import Maison from "./pages/Maison";
import Rates from "./pages/Rates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SiteLayout>
                <Index />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <SiteLayout>
                <NotFound />
              </SiteLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
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
