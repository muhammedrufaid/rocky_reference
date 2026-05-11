import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import FaqsSection from "@/components/common/FaqsSection";
import Newsletter from "@/components/home/Newsletter";
import ImageHeroSection from "@/components/common/ImageHeroSection";
import AwardsTimelineSection from "@/components/achievements/AwardsTimelineSection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";


export async function generateMetadata() {
  const pathname = "/achievements";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Our Achievements & Awards | Rocky Real Estate Dubai",
      description:
        "Discover Rocky Real Estate's industry awards and milestones. Recognised as one of Dubai's trusted real estate agencies, our achievements reflect our commitment to excellence in UAE property.",
      image: toAbsoluteUrl("/assets/common/awards.webp"),
      keywords: [
        "Rocky Real Estate awards",
        "real estate achievements Dubai",
        "best real estate agency Dubai",
        "award winning real estate Dubai",
        "top property agency UAE",
        "Dubai real estate recognition",
        "real estate excellence Dubai",
        "Rocky Real Estate milestones",
        "property agency awards UAE",
        "trusted real estate agency Dubai",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid/>
      <main className="site-header-offset">
        <PageHero
          title="Achievements"
          description="View our achievements and awards in the real estate industry."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Achievements" },
          ]}
        />
        {/* <ImageHeroSection
          title="Achievements"
          description="View our achievements and awards in the real estate industry."
          image="/assets/common/awards.webp"
        /> */}
        <AwardsTimelineSection showContent={true} />
        {/* <AchievementsSection />
        <GallerySection /> */}
        <Newsletter className="pb-16 md:pb-20 lg:pb-24" />
        <TestimonialSection backgroundColor="#ffffff" className="pb-16 md:pb-20  lg:pb-24" />
        <FaqsSection />

      </main>
      <Footer />
    </div>
  );
}
