import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactMap from "@/components/contact/ContactMap";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";
import FaqsSection from "@/components/common/FaqsSection";


export const metadata = {
  title: "Contact Us | Rocky Real Estate",
  description:
    "Get in touch with Rocky Real Estate. Schedule a consultation, visit our Dubai office, or reach us via phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main>
        <ContactHero />
        <ContactSection />
        <ContactMap />
        <FaqsSection />
        {/* <ContactFAQ /> */}
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
