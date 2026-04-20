import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import FaqsSection from "@/components/common/FaqsSection";
import Newsletter from "@/components/home/Newsletter";
import SellPropertyForm from "@/components/sell/SellPropertyForm";
import WhySellWithUs from "@/components/sell/WhySellWithUs";

export const metadata = {
  title: "Who We Are | Rocky Real Estate",
  description:
    "Meet our expert real estate advisors. Browse our team of specialists in sales, leasing, off-plan investments, and property management.",
};

export default function WhoWeArePage() { 
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Sell Your Property"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Sell Your Property" },
          ]}
        />

        <SellPropertyForm />
        <WhySellWithUs />
        <Newsletter  className="py-16 md:py-20 lg:py-24"/>
        <TestimonialSection backgroundColor="#ffffff" className="pb-16 md:pb-20 lg:pb-24"/>
        <FaqsSection />  

      </main>
      <Footer />
    </div>
  );
}
