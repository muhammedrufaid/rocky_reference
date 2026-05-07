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
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

export async function generateMetadata() {
  const pathname = "/services";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Real Estate Services in Dubai | Property Management, Brokerage & More | Rocky Real Estate",
      description:
        "Rocky Real Estate offers end-to-end property services in Dubai — property management, brokerage, mortgage assistance, professional snagging, listing & marketing, and after-sales support.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "real estate services Dubai",
        "property management Dubai",
        "real estate brokerage Dubai",
        "mortgage services Dubai",
        "property snagging Dubai",
        "professional property inspection UAE",
        "property listing and marketing Dubai",
        "after sales support real estate Dubai",
        "property management company UAE",
        "real estate solutions Dubai",
        "end to end property services Dubai",
        "Rocky Real Estate services",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

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
