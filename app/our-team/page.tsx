import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServiceSection from "@/components/home/ServiceSection";
import TeamsIntroSection from "@/components/teams/TeamsntroSection";
import TeamMembersSection from "@/components/teams/TeamMembersSection";
import ValuationCTA from "@/components/home/ValuationCTA";
import WhychooseSection from "@/components/services/WhychooseSection";
import DevelopmentPartnersSection from "@/components/home/DevelopmentPartnersSection";
import FaqsSection from "@/components/common/FaqsSection";
import WhychooseAgentsSection from "@/components/teams/WhychooseAgentsSection";


export const metadata = {
  title: "Our Team | Rocky Real Estate",
  description:
    "Meet our expert real estate advisors. Browse our team of specialists in sales, leasing, off-plan investments, and property management.",
};

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main>
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
        <ValuationCTA className="py-16 md:py-20 lg:py-24" />
        <TestimonialSection backgroundColor="#ffffff" className="!pb-16 md:!pb-20  lg:!pb-24"/>
        <FaqsSection />  

      </main>
      <Footer />
    </div>
  );
}
