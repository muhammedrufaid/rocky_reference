import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TermsContent from "@/components/common/TermsContent";



export const metadata = {
  title: "Terms and Conditions | Rocky Real Estate",
  description:
    "Review the terms governing your use of Rocky Real Estate’s website and services, including responsibilities and limitations.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Terms and Conditions"
          description="Understand the rules, responsibilities, and policies that apply when using our website and services."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Terms and Conditions" },
          ]}
        />
        <TermsContent />
      </main>
      <Footer />
    </div>
  );
}
