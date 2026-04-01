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
  title: "Developers | Rocky Real Estate",
  description:
    "Paperwork to handover — property management, brokerage, mortgage, professional inspection, listing & marketing, and after-sales support. Solutions tailored for Dubai's dynamic market.",
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main>
        <PageHero
          title="Developers"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Developers" },
          ]}
        />
        
        <Newsletter />
        <TestimonialSection/>

      </main>
      <Footer />
    </div>
  );
}
