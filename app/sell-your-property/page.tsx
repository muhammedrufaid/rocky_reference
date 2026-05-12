import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import FaqsSection from "@/components/common/FaqsSection";
import Newsletter from "@/components/home/Newsletter";
import SellPropertyForm from "@/components/sell/SellPropertyForm";
import WhySellWithUs from "@/components/sell/WhySellWithUs";
import SalesHeroSection from "@/components/sell/SalesHeroSection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

export async function generateMetadata() {
  const pathname = "/sell-your-property";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Sell Your Property in Dubai | Get the Best Price | Rocky Real Estate",
      description:
        "Ready to sell your property in Dubai? Rocky Real Estate connects you with qualified buyers fast. Get a free valuation, expert marketing, and dedicated agent support to maximise your sale price.",
      image: toAbsoluteUrl("/assets/common/selling.webp"),
      keywords: [
        "sell property Dubai",
        "sell my property UAE",
        "sell house Dubai",
        "property for sale Dubai",
        "sell apartment Dubai",
        "Dubai property valuation",
        "free property valuation Dubai",
        "real estate agents to sell property Dubai",
        "best price property Dubai",
        "list property for sale Dubai",
        "sell villa Dubai",
        "property selling agents UAE",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function SellYourPropertyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid/>
      <main className="site-header-offset">
        {/* <PageHero
          title="Sell Your Property"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Sell Your Property" },
          ]}
        /> */}
        <SalesHeroSection
          title="Sell Your Property"
          description="Sell your property quickly and at the right price with expert real estate support. Take advantage of today’s fast-moving property market."
          image="/assets/common/selling.webp"
        />

        <SellPropertyForm />
        <WhySellWithUs />
        <Newsletter className="py-16 md:py-20 lg:py-24" />
        <TestimonialSection backgroundColor="#ffffff" className="pb-16 md:pb-20 lg:pb-24" />
        <FaqsSection />

      </main>
      <Footer />
    </div>
  );
}
