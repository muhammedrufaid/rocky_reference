import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import BlogListingSection from "@/components/blog/BlogListingSection";

export const metadata = {
    title: "Blog | Rocky Real Estate",
    description:
        "Explore our blog and stay updated with the latest news and insights in the real estate industry.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid />
            <main className="site-header-offset">
                <PageHero
                    title="Blogs"
                    description="Explore our blog and stay updated with the latest news and insights in the real estate industry."
                    breadcrumb={[
                        { label: "Home", href: "/" },
                        { label: "Blog" },
                    ]}
                />
                <BlogListingSection />
            </main>
            <Footer />
        </div>
    );
}
