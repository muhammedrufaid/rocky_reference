import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Page Not Found | Rocky Real Estate",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <PageHero
          variant="charcoal"
          title="Page not found"
          description="The page you requested does not exist or may have moved."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "404" },
          ]}
          ctaLabel="Back to home"
          ctaHref="/"
        />
      </main>
      <Footer />
    </div>
  );
}
