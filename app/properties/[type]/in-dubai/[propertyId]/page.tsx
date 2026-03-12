import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/properties/PropertyGallery";
import Container from "@/components/layout/Container";
import { propertyListings } from "@/utils/data";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ type: string; propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = propertyListings.find(
    (p) => String(p.id) === propertyId || p.path.includes(propertyId)
  );
  const images = property?.images ?? propertyListings[0]?.images ?? [];

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid hideOnScroll />
      <main className="pt-16 md:pt-20">
        <Container className="py-8 md:py-12">
          <PropertyGallery />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
