import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import FaqsSection from "@/components/common/FaqsSection";
import Newsletter from "@/components/home/Newsletter";
import ImageHeroSection from "@/components/common/ImageHeroSection";
import AwardsTimelineSection from "@/components/achievements/AwardsTimelineSection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import SalesHeroSection from "@/components/sell/SalesHeroSection";


export async function generateMetadata() {
    const pathname = "/recruitment";
    const seo = await fetchSeoFromCms(pathname);

    return buildPageMetadata({
        pathname,
        seo,
        fallback: {
            title: "Real Estate Recruitment in Dubai | Rocky Real Estate",
            description:
                "Explore recruitment opportunities with Rocky Real Estate in Dubai. Join a trusted agency, grow your property career, and work with a team focused on excellence in UAE real estate.",
            image: toAbsoluteUrl("/assets/common/careers.webp"),
            keywords: [
                "real estate recruitment Dubai",
                "property recruitment UAE",
                "join Rocky Real Estate",
                "real estate agent recruitment Dubai",
                "property consultant recruitment Dubai",
                "real estate careers Dubai",
                "work in real estate Dubai",
                "real estate agency recruitment UAE",
                "Rocky Real Estate recruitment",
                "become a property agent Dubai",
            ],
            authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
        },
    });
}

export default function RecruitmentPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid hideNavigation={true}/>
            <main className="site-header-offset">
                <SalesHeroSection
                    title="Lorem ipsum dolor sit amet"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    image="/assets/common/careers.webp"
                />

                {/* image hero section */}
                {/* <ImageHeroSection
          title="Achievements"
          description="View our achievements and awards in the real estate industry."
          image="/assets/common/awards.webp"
        /> */}
                {/* <AwardsTimelineSection showContent={true} /> */}
                {/* <AchievementsSection />
        <GallerySection /> */}
                {/* <Newsletter className="pb-16 md:pb-20 lg:pb-24" />
        <TestimonialSection backgroundColor="#ffffff" className="pb-16 md:pb-20  lg:pb-24" />
        <FaqsSection /> */}

            </main>
            <Footer hideNavigation={true}/>
        </div>
    );
}
