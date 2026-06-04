import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { getPropertyByRefNo } from "@/utils/getServices";
import OffPlanIndividualHero from "@/components/properties/OffPlanIndividualHero";
import PropertyDetailPage from "@/components/properties/PropertyDetailPage";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import { buildPropertyDetailMetadata, fetchSeoFromCms, getSiteUrl } from "@/utils/seo";
import JsonLd from "@/components/seo/JsonLd";
import { buildRealEstateListingJsonLd } from "@/utils/jsonLd";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const pathname = `/off-plan-properties/in-dubai/${slug}`;
    const property = await getPropertyByRefNo(slug);

    if (!property) {
        return {
            title: "Property Not Found | Rocky Real Estate",
            description: "This off-plan property could not be found.",
            robots: { index: false, follow: false },
        };
    }

    const seo = await fetchSeoFromCms(pathname);

    return buildPropertyDetailMetadata({
        property,
        pathname,
        seo,
        transaction: "off-plan",
    });
}

export default async function OffPlanPropertyPage({ params }: Props) {
    const { slug } = await params;
    const property = await getPropertyByRefNo(slug);

    if (!property) {
        notFound();
    }

    const pageUrl = `${getSiteUrl()}/off-plan-properties/in-dubai/${slug}`;

    return (
        <div className="min-h-screen bg-white">
            <JsonLd data={buildRealEstateListingJsonLd(property, pageUrl)} />
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
