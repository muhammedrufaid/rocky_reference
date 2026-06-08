import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DubaiSouthAgentHero from "@/components/dubaisouth/DubaiSouthAgentHero";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import AgentsSection from "@/components/dubaisouth/AgentsSection";

export async function generateMetadata() {
  const pathname = "/dubaisouth/agents";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Dubai South Agents | Rocky Real Estate",
      description:
        "Meet Rocky Real Estate's Dubai South property specialists. Connect with trusted advisors for sales, leasing, and off-plan investments across Dubai South and the wider UAE.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "Dubai South real estate agents",
        "property experts Dubai South",
        "Dubai South property advisors",
        "Rocky Real Estate Dubai South",
        "real estate brokers Dubai South",
        "property sales agents Dubai South",
        "leasing agents Dubai South",
        "off-plan property specialists Dubai South",
        "Dubai South property consultants",
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default function DubaiSouthAgentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <DubaiSouthAgentHero
          title="Dubai South Agents"
          description="Our team brings together experienced real estate specialists, including property sales and leasing experts, off-plan advisors, and dedicated client relationship managers serving Dubai South."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Dubai South Agents" },
          ]}
        />
        <AgentsSection />
      </main>
      <Footer />
    </div>
  );
}
