import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import PrivacyContent from "@/components/common/PrivacyContent";



export const metadata = {
  title: "Privacy Policy | Rocky Real Estate",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          title="Privacy Policy"
          description="Read our privacy policy to understand how we collect, use, and protect your personal information."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />
        <PrivacyContent />
      </main>
      <Footer />
    </div>
  );
}
