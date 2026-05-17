import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/properties/PropertyGallery";
import { getPropertyByRefNo } from "@/utils/getServices";
import {
  buildPropertyDetailMetadata,
  fetchSeoFromCms,
} from "@/utils/seo";
import PropertyHeader from "@/components/properties/PropertyHeader";
import PropertyHighlights from "@/components/properties/PropertyHighlights";
import PropertyDescription from "@/components/properties/PropertyDescription";
import PropertyFeatures from "@/components/properties/PropertyFeatures";
import TestimonialSection from "@/components/home/TestimonialSection";
import OffPlanIndividualHero from "@/components/properties/OffPlanIndividualHero";
import PropertyDetailPage from "@/components/properties/PropertyDetailPage";
import Newsletter from "@/components/home/Newsletter";

type Props = {
  params: Promise<{ type: string; propertyId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { type, propertyId } = await params;
  const pathname = `/properties/${type}/in-dubai/${propertyId}`;
  const property = await getPropertyByRefNo(propertyId);

  if (!property) {
    return {
      title: "Property Not Found | Rocky Real Estate",
      description: "This property listing could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const transaction = type === "rent" ? "rent" : "buy";
  const seo = await fetchSeoFromCms(pathname);

  return buildPropertyDetailMetadata({
    property,
    pathname,
    seo,
    transaction,
  });
}

export default async function PropertiesPage({
  params,
}: Props) {
  const { propertyId } = await params;
  const propertyRefNo = propertyId;

  const property = await getPropertyByRefNo(propertyRefNo);

  if (!property) {
    notFound();
  }

  const images = property.images ?? [];
  const propertyTitle = property.propertyTitle ?? property.towerName ?? property.propertyRefNo;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="">
          {/* <PropertyGallery
            images={images}
            propertyTitle={propertyTitle}
          /> */}
          <OffPlanIndividualHero data={property} />
          {/* <PropertyHeader data={property} />
          <PropertyHighlights data={property} />
          <PropertyDescription propertyDescription={property.propertyDescription ?? ""} /> */}
          <PropertyDetailPage property={property} />
          <Newsletter className="py-16 md:py-20 lg:py-24"/>
          <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
