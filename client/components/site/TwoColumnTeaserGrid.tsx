import { ReactNode } from "react";

interface TwoColumnTeaserGridProps {
  children: ReactNode;
}

const TwoColumnTeaserGrid = ({ children }: TwoColumnTeaserGridProps) => {
  return (
    <section className="bg-luxury-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {children}
        </div>
      </div>
    </section>
  );
};

export default TwoColumnTeaserGrid;
