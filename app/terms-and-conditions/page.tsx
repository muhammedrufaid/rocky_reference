import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import TermsContent from "@/components/common/TermsContent";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

export async function generateMetadata() {
  const pathname = "/terms-and-conditions";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Terms and Conditions | Rocky Real Estate",
      description:
        "Review the terms governing your use of Rocky Real Estate’s website and services, including responsibilities, limitations, and policies for property transactions in Dubai and the UAE.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "Rocky Real Estate terms and conditions",
        "website terms UAE",
        "real estate terms Dubai",
        "property services terms UAE",
        "terms of use Dubai real estate",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function TermsAndConditionsPage() {
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
