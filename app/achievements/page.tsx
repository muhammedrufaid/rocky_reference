import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import FaqsSection from "@/components/common/FaqsSection";
import Newsletter from "@/components/home/Newsletter";
import ImageHeroSection from "@/components/common/ImageHeroSection";
import AwardsTimelineSection from "@/components/achievements/AwardsTimelineSection";


export const metadata = {
  title: "Achievements | Rocky Real Estate",
  description:
    "View our achievements and awards in the real estate industry.",
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="">
        <ImageHeroSection
          title="Achievements"
          description="View our achievements and awards in the real estate industry."
          image="/assets/common/awards.webp"
        />
        <AwardsTimelineSection showContent={true}/>
        {/* <AchievementsSection />
        <GallerySection /> */}
        <Newsletter  className="pb-16 md:pb-20 lg:pb-24"/>
        <TestimonialSection backgroundColor="#ffffff" className="pb-16 md:pb-20  lg:pb-24"/>
        <FaqsSection />  

      </main>
      <Footer />
    </div>
  );
}
