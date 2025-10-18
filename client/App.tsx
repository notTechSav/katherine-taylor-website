// pages/_app.tsx
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { HelmetProvider } from "react-helmet-async";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SiteLayout>
            <Component {...pageProps} />
            <Toaster />
            <Sonner />
          </SiteLayout>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

