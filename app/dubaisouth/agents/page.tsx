import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import TeamMembersSection from "@/components/teams/TeamMembersSection";
import AgentsSection from "@/components/dubaisouth/AgentsSection";


export async function generateMetadata() {
  const pathname = "/our-team";
  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: "Our Team | Real Estate Agents in Dubai | Rocky Real Estate",
      description:
        "Meet Rocky Real Estate's expert property agents in Dubai. Our team of trusted advisors specialises in sales, leasing, off-plan investments, and property management across UAE's top communities.",
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        "real estate agents Dubai",
        "property experts Dubai",
        "Dubai property advisors",
        "Rocky Real Estate team",
        "real estate brokers UAE",
        "property sales agents Dubai",
        "leasing agents Dubai",
        "off-plan property specialists Dubai",
        "property management experts UAE",
        "trusted real estate agents Dubai",
        "Dubai property consultants",
        "residential property agents Dubai",
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
        <PageHero
          title="Our Agents"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Agents" },
          ]}
        //   ctaLabel="Join Our Agents"
          ctaHref="/careers"
        />
        {/* <TeamMembersSection /> */}

        {/* agents section */}
        <AgentsSection />

      </main>
      <Footer />
    </div>
  );
}
