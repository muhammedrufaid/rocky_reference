import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactMap from "@/components/contact/ContactMap";
import TestimonialSection from "@/components/home/TestimonialSection";
import OfficeGallerySection from "@/components/contact/OfficeGallerySection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";


export async function generateMetadata() {
  const pathname = "/contact";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Contact Us | Rocky Real Estate – Dubai Property Specialists",
      description:
        "Reach out to Rocky Real Estate – Dubai's trusted property specialists. Buy, sell, or rent UAE real estate with expert guidance. Call, WhatsApp, or visit our office seven days a week.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "contact Rocky Real Estate",
        "Rocky Real Estate Dubai",
        "Dubai real estate brokers",
        "buy property Dubai",
        "sell property Dubai",
        "rent property UAE",
        "Dubai property consultation",
        "real estate agents Dubai",
        "property experts UAE",
        "Dubai real estate office",
        "WhatsApp real estate Dubai",
        "property inquiry Dubai",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Contact Us"
          description="Let's help you find your perfect property."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
        <ContactSection />
        <ContactMap />
        {/* <OfficeGallerySection /> */}
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
