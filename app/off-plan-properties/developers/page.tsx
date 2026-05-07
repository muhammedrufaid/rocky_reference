import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import DevelopersHeroSection from "@/components/off-plan-properties/DevelopersHeroSection";
import FeaturedProjectsTimelineSection from "@/components/off-plan-properties/FeaturedProjectsTimelineSection";
import AllDevelopersShowcaseGridSection from "@/components/off-plan-properties/AllDevelopersShowcaseGridSection";
import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";
import { getOffPlanProperties } from "@/utils/getServices";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

export async function generateMetadata() {
  const pathname = "/off-plan-properties/developers";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Top Property Developers in Dubai | Off-Plan Projects | Rocky Real Estate",
      description:
        "Explore Dubai's leading property developers with Rocky Real Estate. Browse iconic off-plan projects from trusted developers — waterfront living, landmark communities, and high-yield investments across UAE.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "property developers Dubai",
        "top real estate developers UAE",
        "off-plan developers Dubai",
        "best property developers Dubai",
        "Dubai developer projects",
        "trusted property developers UAE",
        "new launch developers Dubai",
        "Emaar properties Dubai",
        "Damac properties Dubai",
        "Sobha realty Dubai",
        "waterfront property developers Dubai",
        "luxury property developers UAE",
        "off-plan investment Dubai developers",
        "Rocky Real Estate developers",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

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
