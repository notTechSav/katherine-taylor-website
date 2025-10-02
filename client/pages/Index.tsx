import BoutiqueAppointmentSection from "@/components/site/BoutiqueAppointmentSection";
import DesignInMotionSection from "@/components/site/DesignInMotionSection";
import FAQSectionLuxury from "@/components/site/FAQSectionLuxury";
import Hero from "@/components/site/Hero";
import ImageMosaicSection from "@/components/site/ImageMosaicSection";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LegendReinventedSection from "@/components/site/LegendReinventedSection";
import LimitedAvailabilitySection from "@/components/site/LimitedAvailabilitySection";
import LoveStorySection from "@/components/site/LoveStorySection";
import EmailSignupSection from "@/components/site/EmailSignupSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImageMosaicSection />
      <LegendReinventedSection />
      <DesignInMotionSection />
      <ImmersiveVideoSection />
      <ImageMosaicSection
        title="Gifts – What to Give an Escort?"
        subtitle="Thoughtful Gestures for Escort Arrangements in San Francisco and Beyond."
        tiles={[
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fcf7a7e4f72714427af4c89e3a5f1d15a?format=webp&width=800",
            alt: "Reclining woman surrounded by luxurious gifts and accessories",
          },
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F12bc9c0423ed493994809f8e110f4a0f?format=webp&width=800",
            alt: "Hand raising a crystal coupe glass in celebration",
          },
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F271fccca34744dbd9771ebea5440adfb?format=webp&width=800",
            alt: "Woman in gold dress lighting a dollar bill at an opulent dinner table",
          },
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fd1535f1c8d094f7c8c299372b731133a?format=webp&width=800",
            alt: "Designer heels staged on crushed ice inside a freezer",
          },
        ]}
        withOverlay
      />
      <FAQSectionLuxury />
      <BoutiqueAppointmentSection />
      <LimitedAvailabilitySection />
      <LoveStorySection />
      <EmailSignupSection />
    </div>
  );
};

export default Index;
