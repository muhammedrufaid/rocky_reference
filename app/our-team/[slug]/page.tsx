import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { teamMembers2 } from "@/utils/data";
import { getTeamMemberBySlug, getTeamMemberSlug } from "@/utils/selectors";
import { notFound } from "next/navigation";
import Image from "next/image";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return teamMembers2.map((m) => ({ slug: getTeamMemberSlug(m) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  const pathname = `/our-team/${slug}`;

  if (!member) {
    return {
      title: "Team Member Not Found | Rocky Real Estate",
      description: "This team profile could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const role = [member.designation, member.department].filter(Boolean).join(" · ");
  const description =
    role || `Meet ${member.name}, a trusted real estate advisor at Rocky Real Estate in Dubai.`;

  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title: `${member.name} | Our Team | Rocky Real Estate`,
      description,
      image: member.image
        ? toAbsoluteUrl(member.image)
        : toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        `${member.name} Rocky Real Estate`,
        "real estate agents Dubai",
        "property advisors Dubai",
        "Rocky Real Estate team",
        ...(member.department ? [`${member.department} Dubai`] : []),
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

export default async function OurTeamIndividualPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid />
      <main className="site-header-offset">
        <section className="py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="">
              <div className="relative mt-6 min-h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-black/3">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="prose prose-neutral mt-8 max-w-none">
                <h1 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
                  {member.name}
                </h1>
                {(member.designation || member.department) && (
                  <p className="mt-2 text-charcoal/80 leading-relaxed">
                    {[member.designation, member.department].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-charcoal/70 leading-relaxed">
                  This is a placeholder profile page. Add fields on{" "}
                  <code className="text-sm">TeamMember</code> in{" "}
                  <code className="text-sm">utils/types/site.ts</code>, populate them in{" "}
                  <code className="text-sm">utils/data.ts</code>, then render them here.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
