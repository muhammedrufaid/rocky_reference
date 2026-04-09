import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import DevelopersHeroSection from "@/components/off-plan-properties/DevelopersHeroSection";
import FeaturedProjectsTimelineSection from "@/components/off-plan-properties/FeaturedProjectsTimelineSection";
import AllDevelopersShowcaseGridSection from "@/components/off-plan-properties/AllDevelopersShowcaseGridSection";
import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";
import { getOffPlanProperties } from "@/utils/getServices";

export const metadata = {
  title: "Developers | Rocky Real Estate",
  description:
    "Paperwork to handover — property management, brokerage, mortgage, professional inspection, listing & marketing, and after-sales support. Solutions tailored for Dubai's dynamic market.",
};

export default async function DevelopersPage() {
  const offPlanPropertiesData = await getOffPlanProperties();
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        {/* <DevelopersHeroSection
          title="Discover Trusted Developers Behind Iconic Properties"
          description="Explore Dubai’s premium developers shaping landmark communities—built for long-term value, strong rental demand, and modern waterfront living."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Developers" },
          ]}
        /> */}

        {/* <Newsletter className="py-16 md:py-20 lg:py-24" /> */}
        <AllDevelopersShowcaseGridSection />
        <FeaturedProjectsTimelineSection />
        <FeaturedOffPlanProjects data={offPlanPropertiesData} />

        <Newsletter className="pb-16 md:pb-20 lg:pb-24" />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
