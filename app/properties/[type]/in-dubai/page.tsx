import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import PropertyFilterBar from "@/components/layout/PropertyFilterBar";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (type !== "rent" && type !== "buy") {
    notFound();
  }

  const title =
    type === "rent"
      ? "Properties for Rent in Dubai"
      : "Properties for Buy in Dubai";

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: type === "rent" ? "Rent" : "Buy", href: `/properties/${type}/in-dubai` },
    { label: "Dubai" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid hideOnScroll />
      <main className="pt-16 md:pt-20">
        {/* <PageHero
          title={title}
          description="Discover premium properties across Dubai's most sought-after communities."
          breadcrumb={breadcrumb}
        /> */}
        <Suspense fallback={<div className="h-24" style={{ backgroundColor: "#faf9f7" }} />}>
          <PropertyFilterBar type={type} />
        </Suspense>
         
      </main>
      <Footer />
    </div>
  );
}
