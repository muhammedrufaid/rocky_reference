import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import TeamsIntroSection from "@/components/teams/TeamsntroSection";
import TeamMembersSection from "@/components/teams/TeamMembersSection";
import FaqsSection from "@/components/common/FaqsSection";
import WhychooseAgentsSection from "@/components/teams/WhychooseAgentsSection";
import Newsletter from "@/components/home/Newsletter";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";


export async function generateMetadata() {
  const pathname = "/our-team";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Our Team | Real Estate Agents in Dubai | Rocky Real Estate",
      description:
        "Meet Rocky Real Estate's expert property agents in Dubai. Our team of trusted advisors specialises in sales, leasing, off-plan investments, and property management across UAE's top communities.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "real estate agents Dubai",
        "property experts Dubai",
        "Dubai property advisors",
        "Rocky Real Estate team",
        "real estate brokers UAE",
        "property sales agents Dubai",
        "leasing agents Dubai",
        "off-plan property specialists Dubai",
        "property management experts UAE",
        "trusted real estate agents Dubai",
        "Dubai property consultants",
        "residential property agents Dubai",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Our Team"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Our Team" },
          ]}
        />
        <TeamsIntroSection />
        <TeamMembersSection />
        <WhychooseAgentsSection />
        {/* <WhychooseSection /> */}
        {/* <DevelopmentPartnersSection /> */}
        {/* <ValuationCTA className="py-16 md:py-20 lg:py-24" /> */}
        <Newsletter  className="py-16 md:py-20 lg:py-24"/>
        <TestimonialSection backgroundColor="#ffffff" className="!pb-16 md:!pb-20  lg:!pb-24"/>
        <FaqsSection />  

      </main>
      <Footer />
    </div>
  );
}
