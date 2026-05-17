import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServiceSection from "@/components/home/ServiceSection";
import ServiceIntroSection from "@/components/services/ServiceIntroSection";
import ValuationCTA from "@/components/home/ValuationCTA";
import { services } from "@/utils/data";
import { getServiceBySlug } from "@/utils/selectors";
import ServiceOverviewSection from "@/components/services/ServiceOverViewSection";
import Newsletter from "@/components/home/Newsletter";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const pathname = `/services/${slug}`;

  if (!service) {
    return {
      title: "Service Not Found | Rocky Real Estate",
      description: "This service page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: `${service.title} | Rocky Real Estate`,
      description: service.description,
      image: service.image
        ? toAbsoluteUrl(service.image)
        : toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        `${service.title} Dubai`,
        `${service.title} UAE`,
        "real estate services Dubai",
        "Rocky Real Estate",
        "property services Dubai",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
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
      <main className="site-header-offset">
        <PageHero
          title={service.title}
          description={service.description}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
          // image={service?.image || ""}
        />
        {/* <ServiceIntroSection /> */}
        <ServiceOverviewSection service={service} />
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
        <Newsletter />
        {/* <ValuationCTA className="pb-16 md:pb-20 lg:pb-24" /> */}
        <TestimonialSection />

      </main>
      <Footer />
    </div>
  );
}
