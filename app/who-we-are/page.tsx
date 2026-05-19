import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import FaqsSection from "@/components/common/FaqsSection";
import Newsletter from "@/components/home/Newsletter";
import SellPropertyForm from "@/components/sell/SellPropertyForm";
import WhySellWithUs from "@/components/sell/WhySellWithUs";
import AboutRockySection from "@/components/who-we-are/AboutRocky";
import WhatWeDoSection from "@/components/who-we-are/WhatWeDoSection";
import VisionMissionSection from "@/components/who-we-are/VisionMission";
import Achievements from "@/components/who-we-are/Achievements";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import AchievementsStatsGrid from "@/components/who-we-are/AchievementsStatsGrid";

export async function generateMetadata() {
  const pathname = "/who-we-are";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "About Rocky Real Estate | Dubai Property Experts",
      description:
        "Learn about Rocky Real Estate — Dubai's trusted property agency. Discover our mission, values, achievements and expert team behind every successful transaction.",
      image: toAbsoluteUrl("/assets/common/awards.webp"),
      keywords: [
        "about Rocky Real Estate",
        "Dubai real estate agency",
        "property experts Dubai",
        "real estate company Dubai",
        "trusted real estate broker Dubai",
        "Dubai property consultants",
        "real estate team Dubai",
        "Rocky Real Estate about us",
        "who we are Rocky Real Estate",
        "best real estate agency Dubai",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Who We Are"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Who We Are" },
          ]}
        />
        <AchievementsStatsGrid className="mt-16" />
        <AboutRockySection />
        <WhatWeDoSection />
        <VisionMissionSection />
        <Achievements />

  
        <Newsletter className="pb-16 md:pb-20 lg:pb-24" />
        <TestimonialSection backgroundColor="#ffffff" className="pb-16 md:pb-20 lg:pb-24" />
        <FaqsSection />

      </main>
      <Footer />
    </div>
  );
}
