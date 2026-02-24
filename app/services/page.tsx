import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServiceCardsSection from "@/components/services/ServiceCardsSection";


export const metadata = {
  title: "Contact Us | Rocky Real Estate",
  description:
    "Get in touch with Rocky Real Estate. Schedule a consultation, visit our Dubai office, or reach us via phone, email, or WhatsApp.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main>
        <PageHero
          title="Our Services"
          description="Paperwork to handover, our experienced team offers solutions tailored for Dubai’s dynamic market."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <ServiceCardsSection />
        {/* <ContactSection />
        <ContactMap /> */}
        <TestimonialSection />

      </main>
      <Footer />
    </div>
  );
}
