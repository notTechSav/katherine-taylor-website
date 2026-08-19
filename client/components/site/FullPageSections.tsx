import { type PropsWithChildren, useRef } from "react";

import { useFullPageSections } from "@/hooks/useFullPageSections";

const FullPageSections = ({ children }: PropsWithChildren) => {
  const rootRef = useRef<HTMLElement>(null);
  useFullPageSections(rootRef);

  return (
    <main ref={rootRef} className="fullpage-root w-full max-w-[100vw]">
      {children}
    </main>
  );
};

export default FullPageSections;
