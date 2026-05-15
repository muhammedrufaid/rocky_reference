import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import BlogListingSection from "@/components/blog/BlogListingSection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import Newsletter from "@/components/home/Newsletter";

export async function generateMetadata() {
    const pathname = "/blog";
    const seo = await fetchSeoFromCms(pathname);
  
    return buildPageMetadata({
      pathname,
      seo,
      fallback: {
        title: "Dubai Real Estate Blog | Property News & Insights | Rocky Real Estate",
        description:
          "Stay ahead with Rocky Real Estate's blog. Get the latest Dubai property market news, investment insights, community guides, and expert advice on buying, selling, and renting in UAE.",
        image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
        keywords: [
          "Dubai real estate blog",
          "property news Dubai",
          "UAE real estate insights",
          "Dubai property market updates",
          "real estate investment tips Dubai",
          "property buying guide Dubai",
          "Dubai rental market news",
          "off-plan property news UAE",
          "Dubai community guides",
          "real estate advice UAE",
          "property market trends Dubai",
          "Rocky Real Estate blog",
        ],
        authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
      },
    });
  }

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
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}
