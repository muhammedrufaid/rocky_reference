import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialSection from "@/components/home/TestimonialSection";
import {
  developers,
  getDeveloperPagePayload,
  getDeveloperSlugFromPath,
} from "@/utils/data";
import DeveloperHeroSection from "@/components/off-plan-properties/DeveloperHeroSection";
import DeveloperAboutSection from "@/components/off-plan-properties/DeveloperAboutSection";
import DeveloperGlobalPresenceSection from "@/components/off-plan-properties/DeveloperGlobalPresenceSection";
import DeveloperShowcaseImageSection from "@/components/off-plan-properties/DeveloperShowcaseImageSection";

type Props = { params: Promise<{ developer: string }> };

export async function generateMetadata({ params }: Props) {
  const { developer } = await params;
  const data = getDeveloperPagePayload(developer);
  if (!data) return { title: "Developer Not Found | Rocky Real Estate" };
  return {
    title: `${data.title} | Rocky Real Estate`,
    description: data.description,
  };
}

export function generateStaticParams() {
  return developers.map((d) => ({ developer: getDeveloperSlugFromPath(d.path) }));
}

export default async function DeveloperPage({ params }: Props) {
  const { developer } = await params;
  const data = getDeveloperPagePayload(developer);
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="">
        <DeveloperHeroSection
          title={data.title}
          description={data.description}
          image={data.heroImage}
        />
        <DeveloperAboutSection
          heading={data.about.heading}
          intro={data.about.intro}
          body={data.about.body}
          headingId={`developer-about-${data.slug}`}
        />
        <DeveloperShowcaseImageSection
          imageSrc={data.showcaseImage}
          imageAlt={data.showcaseImageAlt}
        />
        <DeveloperGlobalPresenceSection
          heading={data.whoIs.heading}
          description={data.whoIs.description}
          whyHeading={data.whyChoose.heading}
          points={data.whyChoose.points}
        />
        {/* <Newsletter className="pb-16 md:pb-20 lg:pb-24" /> */}
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
