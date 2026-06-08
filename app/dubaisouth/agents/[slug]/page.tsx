import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgentProfileSection from "@/components/dubaisouth/AgentProfileSection";
import { dubaiSouthAgents } from "@/utils/data";
import {
  getDubaiSouthAgentBySlug,
  getTeamMemberSlug,
} from "@/utils/selectors";
import { notFound } from "next/navigation";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import DubaiSouthListingSection from "@/components/dubaisouth/DubaiSouthListingSection";
import { getAgentDubaiSouthListings } from "@/utils/getServices";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dubaiSouthAgents.map((m) => ({ slug: getTeamMemberSlug(m) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const member = getDubaiSouthAgentBySlug(slug);
  const pathname = `/dubaisouth/agents/${slug}`;

  if (!member) {
    return {
      title: "Agent Not Found | Rocky Real Estate",
      description: "This agent profile could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const role = [member.designation, member.department].filter(Boolean).join(" · ");
  const description =
    role ||
    `Meet ${member.name}, a Dubai South property specialist at Rocky Real Estate.`;

  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: `${member.name} | Dubai South Agents | Rocky Real Estate`,
      description,
      image: member.image
        ? toAbsoluteUrl(member.image)
        : toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        `${member.name} Rocky Real Estate`,
        "Dubai South property agent",
        "real estate agents Dubai South",
        "property consultants Dubai",
        ...(member.department ? [`${member.department} Dubai`] : []),
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default async function DubaiSouthAgentPage({ params }: Props) {
  const { slug } = await params;
  const member = getDubaiSouthAgentBySlug(slug);
  if (!member) notFound();

  const listings = await getAgentDubaiSouthListings(
    { name: member.name, email: member.email },
    12,
  );

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <AgentProfileSection member={member} />
        <DubaiSouthListingSection member={member} listings={listings} />
      </main>
      <Footer />
    </div>
  );
}
