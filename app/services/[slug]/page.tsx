import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServiceSection from "@/components/home/ServiceSection";
import ServiceIntroSection from "@/components/services/ServiceIntroSection";
import ValuationCTA from "@/components/home/ValuationCTA";
import { services, getServiceBySlug } from "@/utils/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found | Rocky Real Estate" };
  return {
    title: `${service.title} | Rocky Real Estate`,
    description: service.description,
  };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceIndividualPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main>
        <PageHero
          title={service.title}
          description={service.description}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />
        <ServiceIntroSection />
        <ServiceSection
          data={service.subservices}
          hideHeading
          backgroundColor="#ffffff"
          className="pb-16 md:pb-20 lg:pb-24"
          iconFallback={service.icon}
          linkToService={false}
        />
        {/* <WhychooseSection /> */}
        {/* <DevelopmentPartnersSection /> */}
        {/* <FaqsSection />   */}
        <ValuationCTA className="py-16 md:py-20 lg:py-24" />
        <TestimonialSection/>

      </main>
      <Footer />
    </div>
  );
}
