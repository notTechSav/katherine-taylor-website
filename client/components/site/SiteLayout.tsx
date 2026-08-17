import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/site/Footer";

const SiteLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-luxury-white text-gray-700">
      <Navigation />
      <div
        className={
          isHomepage ? "flex-1" : "flex-1 pt-28 md:pt-44 lg:pt-48 max-md:pt-24"
        }
      >
        {children}
      </div>
      {!isHomepage && <Footer />}
    </div>
  );
};

export default SiteLayout;
