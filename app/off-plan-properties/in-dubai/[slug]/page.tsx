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
import OffPlanIndividualHero from "@/components/properties/OffPlanIndividualHero";


export const metadata = {
    title: "Our Team | Rocky Real Estate",
    description:
        "Meet our expert real estate advisors. Browse our team of specialists in sales, leasing, off-plan investments, and property management.",
};

export default function OffPlanPropertyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid />
            <main className="pt-16 md:pt-20">
                <OffPlanIndividualHero />
            </main>
            <Footer />
        </div>
    );
}
