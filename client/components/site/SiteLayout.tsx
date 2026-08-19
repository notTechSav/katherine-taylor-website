import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/site/Footer";
import { cn } from "@/lib/utils";

const SiteLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";

  return (
    <div
      className={cn(
        "flex w-full max-w-[100vw] flex-col overflow-x-hidden bg-luxury-white text-gray-700",
        isHomepage ? "h-full overflow-hidden" : "min-h-screen",
      )}
    >
      <Navigation />
      <div
        className={
          isHomepage
            ? "min-h-0 min-w-0 flex-1 overflow-hidden"
            : "min-w-0 flex-1 pt-24 md:pt-44 lg:pt-48"
        }
      >
        {children}
      </div>
      {!isHomepage && <Footer />}
    </div>
  );
};

export default SiteLayout;
