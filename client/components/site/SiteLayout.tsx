import { PropsWithChildren } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/site/Footer";

const SiteLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 pt-40 md:pt-44 lg:pt-48">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
