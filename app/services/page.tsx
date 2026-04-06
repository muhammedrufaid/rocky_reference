import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServiceSection from "@/components/home/ServiceSection";
import ServiceIntroSection from "@/components/services/ServiceIntroSection";
import ValuationCTA from "@/components/home/ValuationCTA";
import WhychooseSection from "@/components/services/WhychooseSection";
import DevelopmentPartnersSection from "@/components/home/DevelopmentPartnersSection";
import { services } from "@/utils/data";
import Newsletter from "@/components/home/Newsletter";

export const metadata = {
  title: "Our Services | Rocky Real Estate",
  description:
    "Paperwork to handover — property management, brokerage, mortgage, professional inspection, listing & marketing, and after-sales support. Solutions tailored for Dubai's dynamic market.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Our Services"
          description="Paperwork to handover, our experienced team offers solutions tailored for Dubai’s dynamic market."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <ServiceIntroSection />
        <ServiceSection data={services} hideHeading backgroundColor="#ffffff" className="pb-16 md:pb-20 lg:pb-24" />
        <WhychooseSection />
        {/* <DevelopmentPartnersSection /> */}
        {/* <FaqsSection />   */}
        <Newsletter />
        {/* <ValuationCTA className="py-16 md:py-20 lg:py-24" /> */}
        <TestimonialSection/>

      </main>
      <Footer />
    </div>
  );
}
