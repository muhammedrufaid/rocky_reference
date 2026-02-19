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


export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <Header />
      {/* hero with bg image and filter search */}
      <Hero />
      {/* no background color , title and desc left align*/}
      <FeaturedOffPlanProjects />

      {/* Discover Dubai Properties — buy & rent listings, center aligned */}
      <ExplorePropertySection />
      <DevelopmentPartnersSection />
      {/* background color , title and desc center align*/}
      <ServiceSection />
      {/* no background color , 2 grid  left image right contentn*/}
      <WhyChooseUsSection />

      <ValuationCTA />

      {/* background color , title and desc left align*/}
      <TestimonialSection />
      {/* no background color , title and desc center align*/}
      <BlogSection />
      <Footer />
    </div>
  );
}
