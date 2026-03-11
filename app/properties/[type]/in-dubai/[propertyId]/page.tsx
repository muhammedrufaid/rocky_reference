import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyListingGrid from "@/components/properties/PropertyListingGrid";
import { Suspense } from "react";
import {
  getBuyProperties,
  getOffPlanProperties,
  getRentProperties,
  mapApiResponseToPropertyListings,
} from "@/utils/getServices";

import PropertySearchBar from "@/components/properties/PropertySearchBar";
import TestimonialSection from "@/components/home/TestimonialSection";
import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";
import ValuationCTA from "@/components/home/ValuationCTA";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ type: string; propertyId: string }>;
}) {
  const { propertyId } = await params;
  
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid hideOnScroll />
      <main className="pt-16 md:pt-20">
        

      </main>
      <Footer />
    </div>
  );
}
