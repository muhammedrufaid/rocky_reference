import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";
import Hero from "@/components/home/Hero";
import BlogSection from "@/components/home/BlogSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DevelopmentPartnersSection from "@/components/home/DevelopmentPartnersSection";
import ServiceSection from "@/components/home/ServiceSection";
import ValuationCTA from "@/components/home/ValuationCTA";
import ExplorePropertySection from "@/components/home/ExplorePropertySection";
import FaqsSection from "@/components/common/FaqsSection";
import { getOffPlanProperties, getReadyProperties } from "@/utils/getServices";
import { services } from "@/utils/data";
import WhyChooseUsSection2 from "@/components/home/WhyChooseUsSection2";
import Newsletter from "@/components/home/Newsletter";
import PropertyCategoriesSection from "@/components/home/PropertyCategoriesSection";
import FeaturedDubaiSouthSection from "@/components/home/FeaturedDubaiSouthSection";
import AwardsSection from "@/components/home/AwardsSection";
import AwardsSection3 from "@/components/home/AwardsSection3";
import ServiceSectionv2 from "@/components/home/ServiceSectionv2";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";


export async function generateMetadata() {
  const pathname = "/";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Dubai Real Estate Agency | Rocky Real Estate",
      description:
        "Buy, sell or invest in Dubai real estate with Rocky Real Estate. Explore off-plan projects, ready properties & luxury homes with award-winning expert agents.",
      image: toAbsoluteUrl("/assets/common/awards.webp"),
      keywords: [
        "Dubai real estate",
        "real estate agency Dubai",
        "off plan properties Dubai",
        "ready properties Dubai",
        "luxury homes Dubai",
        "property investment Dubai",
        "buy property in Dubai",
        "Dubai property for sale",
        "villas for sale Dubai",
        "apartments for sale Dubai",
        "Rocky Real Estate",
        "Dubai real estate broker",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default async function Home() {
  const offPlanPropertiesData = await getOffPlanProperties();
  const readyPropertiesData = await getReadyProperties();
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main id="main-content" className="site-header-offset" tabIndex={-1}>
        <Hero />
        <FeaturedOffPlanProjects data={offPlanPropertiesData} />
        {/* <ExplorePropertySection data={readyPropertiesData}/> */}
        <PropertyCategoriesSection data={readyPropertiesData} />
        <FeaturedDubaiSouthSection />
        <DevelopmentPartnersSection />
        {/* <ServiceSection data={services} />  */}
        {/* <ServiceSectionv2 data={services} /> */}
        {/* <AwardsSection /> */}
        {/* <AwardsSection3 /> */}
        {/* <WhyChooseUsSection /> */}
        {/* <WhyChooseUsSection2 /> */}
        <Newsletter className="pb-16 md:pb-20 lg:pb-24" />
        {/* <ValuationCTA /> */}
        <TestimonialSection />
        <BlogSection />
        <FaqsSection />
      </main>
      <Footer />
    </div>
  );
}
