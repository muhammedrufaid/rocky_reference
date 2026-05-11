import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import { developers, projects } from "@/utils/data";
import DeveloperHeroSection from "@/components/off-plan-properties/DeveloperHeroSection";
import DeveloperAboutSection from "@/components/off-plan-properties/DeveloperAboutSection";
import DeveloperGlobalPresenceSection from "@/components/off-plan-properties/DeveloperGlobalPresenceSection";
import DeveloperShowcaseImageSection from "@/components/off-plan-properties/DeveloperShowcaseImageSection";

type Props = { params: Promise<{ developer: string }> };

function getDeveloperSlugFromPath(path?: string) {
  return (path ?? "").split("/").filter(Boolean).pop() ?? "";
}

function getDeveloperData(developer: string) {
  const project = projects.find((p) => p.id === developer);
  const dev = developers.find((d) => getDeveloperSlugFromPath(d.path) === developer);
  if (!project && !dev) return null;
  return {
    title: project?.title ?? dev?.name ?? developer,
    description: project?.description ?? "Explore off-plan projects by this developer in Dubai.",
  };
}

export async function generateMetadata({ params }: Props) {
  const { developer } = await params;
  const data = getDeveloperData(developer);
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
  const data = getDeveloperData(developer);
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="">
        <DeveloperHeroSection
          title={data.title}
          description={data.description}
          image="/assets/developers/featured/emaar-hero.webp"
        />
        <DeveloperAboutSection />
        <DeveloperShowcaseImageSection
          imageSrc="/assets/developers/featured/emaar-about.webp"
          imageAlt={`${data.title} — Dubai skyline and developments`}
        />
        <DeveloperGlobalPresenceSection />
        {/* <Newsletter className="pb-16 md:pb-20 lg:pb-24" /> */}
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
