import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { getPropertyByRefNo } from "@/utils/getServices";
import OffPlanIndividualHero from "@/components/properties/OffPlanIndividualHero";
import PropertyDetailPage from "@/components/properties/PropertyDetailPage";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";


export const metadata = {
    title: "Our Team | Rocky Real Estate",
    description:
        "Meet our expert real estate advisors. Browse our team of specialists in sales, leasing, off-plan investments, and property management.",
};

export default async function OffPlanPropertyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const property = await getPropertyByRefNo(slug);

    if (!property) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <OffPlanIndividualHero data={property} />
                <PropertyDetailPage property={property} />
                <Newsletter className="py-16 md:py-20 lg:py-24"/>
                <TestimonialSection />
            </main>
            <Footer />
        </div>
    );
}
