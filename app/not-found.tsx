import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

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
      <main className="site-header-offset py-16 md:py-24">
        <Container>
          <h1 className="text-2xl font-semibold text-charcoal sm:text-3xl">Page not found</h1>
          <p className="mt-3 max-w-lg text-charcoal/70">
            The page you requested does not exist or may have moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#0d365e] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0d365e]/90"
          >
            Back to home
          </Link>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
