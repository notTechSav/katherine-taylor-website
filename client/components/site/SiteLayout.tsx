import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/site/Footer";

const SiteLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden bg-luxury-white text-gray-700">
      <Navigation />
      <div
        className={
          isHomepage
            ? "min-w-0 flex-1"
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
