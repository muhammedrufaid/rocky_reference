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
import AwardsSection from "@/components/home/AwardsSection";
import AwardsSection3 from "@/components/home/AwardsSection3";
import ServiceSectionv2 from "@/components/home/ServiceSectionv2";


export default async function Home() {
  const offPlanPropertiesData = await getOffPlanProperties();
  const readyPropertiesData = await getReadyProperties();
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
      <Hero />
      <FeaturedOffPlanProjects data={offPlanPropertiesData} />
      {/* <ExplorePropertySection data={readyPropertiesData}/> */}
      <PropertyCategoriesSection data={readyPropertiesData}/>
      <DevelopmentPartnersSection />
      {/* <ServiceSection data={services} />  */}
      {/* <ServiceSectionv2 data={services} /> */}
      {/* <AwardsSection /> */}
      {/* <AwardsSection3 /> */}
      {/* <WhyChooseUsSection /> */}
      {/* <WhyChooseUsSection2 /> */}
      <Newsletter className="pb-16 md:pb-20 lg:pb-24"/>
      {/* <ValuationCTA /> */}
      <TestimonialSection />
      <BlogSection />
      <FaqsSection />
      </main>
      <Footer />
    </div>
  );
}
