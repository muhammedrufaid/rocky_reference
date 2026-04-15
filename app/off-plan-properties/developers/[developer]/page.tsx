import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import { developers, projects } from "@/utils/data";
import DeveloperHeroSection from "@/components/off-plan-properties/DeveloperHeroSection";
import DeveloperAboutSection from "@/components/off-plan-properties/DeveloperAboutSection";

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
        <Newsletter className="py-16 md:py-20 lg:py-24" />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
