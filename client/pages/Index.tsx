import GiftsBannerSection from "@/components/site/GiftsBannerSection";
import Hero from "@/components/site/Hero";
import ImageMosaicSection from "@/components/site/ImageMosaicSection";
import ImmersiveVideoSection from "@/components/site/ImmersiveVideoSection";
import LoveStorySection from "@/components/site/LoveStorySection";
import SanFranciscoTeaserSection from "@/components/site/SanFranciscoTeaserSection";
import EmailSignupSection from "@/components/site/EmailSignupSection";
import GoldenHourVideoSection from "@/components/site/GoldenHourVideoSection";
import TwoColumnTeaserGrid from "@/components/site/TwoColumnTeaserGrid";
import JournalTeaserCard from "@/components/site/JournalTeaserCard";
import FAQTeaserCard from "@/components/site/FAQTeaserCard";
import InquireTeaserCard from "@/components/site/InquireTeaserCard";

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* About Section */}
      <LoveStorySection />
      {/* Gallery Preview Section */}
      <ImageMosaicSection
        title="Private Collections"
        subtitle="Saved for private viewing. Each frame a standard, each collection a retreat."
        footerHeading="Three collections for your viewing"
        footerLinkLabel="Indulge"
        footerLinkHref="/gallery"
      />
      {/* Rates Section - Immersive Video */}
      <ImmersiveVideoSection />
      {/* Gifts Section */}
      <GiftsBannerSection />
      {/* Journal Section */}
      <JournalTeaserCard />
      {/* FAQ Section */}
      <FAQTeaserCard />
      {/* Inquire Section */}
      <InquireTeaserCard />
      {/* San Francisco Section */}
      <SanFranciscoTeaserSection />
      {/* Golden Hour Video */}
      <GoldenHourVideoSection />
      {/* Email Signup */}
      <EmailSignupSection />
    </div>
  );
};

export default Index;
