import { PropsWithChildren } from "react";
import Header from "@/components/site/Header";

const SiteLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-40 md:pt-44 lg:pt-48">{children}</main>
    </div>
  );
};

export default SiteLayout;
