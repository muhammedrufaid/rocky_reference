import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import PrivacyContent from "@/components/common/PrivacyContent";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

export async function generateMetadata() {
  const pathname = "/privacy-policy";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Privacy Policy | Rocky Real Estate",
      description:
        "Read our privacy policy to understand how we collect, use, and protect your personal information when you use Rocky Real Estate’s website and services in Dubai and the UAE.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "Rocky Real Estate privacy policy",
        "privacy policy UAE",
        "real estate privacy Dubai",
        "personal data protection UAE",
        "PDPL privacy policy",
        "website privacy policy Dubai",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

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
