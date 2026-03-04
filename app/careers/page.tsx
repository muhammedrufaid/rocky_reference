import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import FaqsSection from "@/components/common/FaqsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CareersIntroSection from "@/components/careers/CareersIntroSection";


export const metadata = {
    title: "Careers | Rocky Real Estate",
    description:
        "Explore career opportunities at Rocky Real Estate. Join our growing team in Dubai and build a successful career in the real estate industry.",
};

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid />
            <main>
                <PageHero
                    title="Careers at Rocky Real Estate"
                    description="Join our growing team in Dubai and build a rewarding career in the real estate industry."
                    breadcrumb={[
                        { label: "Home", href: "/" },
                        { label: "Careers" },
                    ]}
                />
                <CareersIntroSection />
                {/* <CareersBenefitsSection />
                <OpenPositionsSection />
                <CareersApplySection /> */}
                <TestimonialSection />
                <FaqsSection />
            </main>
            <Footer />
        </div>
    );
}
