import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/properties/PropertyGallery";
import { getPropertyByRefNo } from "@/utils/getServices";
import PropertyHeader from "@/components/properties/PropertyHeader";
import PropertyHighlights from "@/components/properties/PropertyHighlights";
import PropertyDescription from "@/components/properties/PropertyDescription";
import PropertyFeatures from "@/components/properties/PropertyFeatures";
import TestimonialSection from "@/components/home/TestimonialSection";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ type: string; propertyId: string }>;
}) {
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
      <Header forceSolid />
      <main className="pt-16 md:pt-20">
          <PropertyGallery
            images={images}
            propertyTitle={propertyTitle}
          />
          <PropertyHeader data={property} />
          <PropertyHighlights data={property} />
          <PropertyDescription propertyDescription={property.propertyDescription ?? ""} />
          <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
