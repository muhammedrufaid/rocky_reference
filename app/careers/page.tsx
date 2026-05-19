import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import FaqsSection from "@/components/common/FaqsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CareersIntroSection from "@/components/careers/CareersIntroSection";
import CareersBenefitsSection from "@/components/careers/CareersBenefitsSection";
import OpenPositionsSection from "@/components/careers/OpenPositionsSection";
import WhyRockySection from "@/components/careers/WhyRockySection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";


export async function generateMetadata() {
    const pathname = "/careers";
    const seo = await fetchSeoFromCms(pathname);
  
    return buildPageMetadata({
      pathname,
      seo,
      fallback: {
        title: "Real Estate Jobs in Dubai | Rocky Real Estate",
        description:
          "Join Rocky Real Estate and grow your property career in Dubai. We offer clear progression, great incentives and a winning culture. View our latest vacancies.",
        image: toAbsoluteUrl("/assets/careers/careers-hero.webp"),
        keywords: [
          "real estate jobs Dubai",
          "real estate agent jobs Dubai",
          "property careers Dubai",
          "real estate broker jobs Dubai",
          "join real estate agency Dubai",
          "real estate vacancies Dubai",
          "property consultant jobs Dubai",
          "work in real estate Dubai",
          "Rocky Real Estate careers",
          "Rocky Real Estate jobs",
        ],
        authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
      },
    });
  }

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid />
            <main className="site-header-offset">
                <PageHero
                    title="Careers at Rocky Real Estate"
                    description="Build a rewarding future in real estate by joining our expanding team"
                    breadcrumb={[
                        { label: "Home", href: "/" },
                        { label: "Careers" },
                    ]}
                />
                <CareersIntroSection />
                <WhyRockySection />
                <CareersBenefitsSection />
                {/* <OpenPositionsSection /> */}
                {/* <CareersApplySection /> */}
                <TestimonialSection />
                {/* <FaqsSection /> */}
            </main>
            <Footer />
        </div>
    );
}
