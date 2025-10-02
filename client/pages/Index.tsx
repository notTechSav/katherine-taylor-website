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
            src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F65909920a7b144bbb16190fee459fafa?format=webp&width=800",
            alt: "Woman in gold attire lighting money while celebrating with champagne",
          },
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fe98fdd6d66ad48e2b18ab6284dfd9e2b?format=webp&width=800",
            alt: "Gloved hand presenting black designer heels with jeweled buckles",
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
