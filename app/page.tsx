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

export default async function Home() {
  const offPlanPropertiesData = await getOffPlanProperties();
  const readyPropertiesData = await getReadyProperties();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedOffPlanProjects data={offPlanPropertiesData} />
      <ExplorePropertySection data={readyPropertiesData}/>
      <DevelopmentPartnersSection />
      <ServiceSection data={services} />
      <WhyChooseUsSection />
      <ValuationCTA />
      <TestimonialSection />
      <BlogSection />
      <FaqsSection />
      <Footer />
    </div>
  );
}
