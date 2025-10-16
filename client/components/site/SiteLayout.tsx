import { PropsWithChildren } from "react";

import Footer from "@/components/site/Footer";

const SiteLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-luxury-white text-gray-700">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
