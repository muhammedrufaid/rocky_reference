import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import DevelopersHeroSection from "@/components/off-plan-properties/DevelopersHeroSection";

export const metadata = {
  title: "Developers | Rocky Real Estate",
  description:
    "Paperwork to handover — property management, brokerage, mortgage, professional inspection, listing & marketing, and after-sales support. Solutions tailored for Dubai's dynamic market.",
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid/>
      <main>
        {/* <PageHero
          title="Developers"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Developers" },
          ]}
        /> */}
        {/* <DevelopersHeroSection
          title="Developers in Dubai"
          description=" Discover trusted developers, premium communities, and off‑plan opportunities—curated for modern Dubai living."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Developers" },
          ]}
          image="https://images.pexels.com/photos/19136351/pexels-photo-19136351.jpeg"
        /> */}
        
        <Newsletter className="py-16 md:py-20 lg:py-24"/>
        <TestimonialSection />

      </main>
      <Footer />
    </div>
  );
}
