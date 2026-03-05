import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServiceSection from "@/components/home/ServiceSection";
import ServiceIntroSection from "@/components/services/ServiceIntroSection";
import ValuationCTA from "@/components/home/ValuationCTA";
import WhychooseSection from "@/components/services/WhychooseSection";
import DevelopmentPartnersSection from "@/components/home/DevelopmentPartnersSection";


export const metadata = {
  title: "Service Individual Page | Rocky Real Estate",
  description:
    "Service individual page description",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main>
        <PageHero
          title="Service Individual Page"
          description="Service individual page description"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Service Individual Page" },
          ]}
        />
        <ServiceIntroSection />
        <ServiceSection hideHeading backgroundColor="#ffffff" className="pb-16 md:pb-20 lg:pb-24" />
        {/* <WhychooseSection /> */}
        {/* <DevelopmentPartnersSection /> */}
        {/* <FaqsSection />   */}
        <ValuationCTA className="py-16 md:py-20 lg:py-24" />
        <TestimonialSection/>

      </main>
      <Footer />
    </div>
  );
}
