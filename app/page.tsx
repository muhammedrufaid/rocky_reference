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


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedOffPlanProjects />
      <ExplorePropertySection />
      <DevelopmentPartnersSection />
      <ServiceSection />
      <WhyChooseUsSection />
      <ValuationCTA />
      <TestimonialSection />
      <BlogSection />
      <FaqsSection />
      <Footer />
    </div>
  );
}
