import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { notFound } from "next/navigation";
import { openPositions } from "@/utils/data";
import type { JobPosition } from "@/utils/types";
import { slugify } from "@/utils/slugify";
import JobHeaderSection from "@/components/careers/JobHeaderSection";
import JobDetailsSection from "@/components/careers/JobDetailsSection";
import JobApplyCard from "@/components/careers/JobApplyCard";
import RelatedJobsSection from "@/components/careers/RelatedJobsSection";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

type Props = { params: Promise<{ job: string }> };

function getJobBySlug(slug: string): JobPosition | undefined {
    return openPositions.find((j) => slugify(j.title) === slug);
}

export function generateStaticParams() {
    return openPositions.map((j) => ({ job: slugify(j.title) }));
}

export async function generateMetadata({ params }: Props) {
    const { job: jobSlug } = await params;
    const job = getJobBySlug(jobSlug);
    const pathname = `/careers/${jobSlug}`;

    if (!job) {
        return {
            title: "Job Not Found | Rocky Real Estate",
            description: "This job listing could not be found.",
            robots: { index: false, follow: false },
        };
    }

    const seo = await fetchSeoFromCms(pathname);
    const description =
        job.description ??
        "Explore job details at Rocky Real Estate. Learn more about the role and apply to join our team in Dubai.";

    return buildPageMetadata({
        pathname,
        seo,
        fallback: {
            title: `${job.title} | Careers | Rocky Real Estate`,
            description,
            image: toAbsoluteUrl("/assets/careers/careers-hero.webp"),
            keywords: [
                `${job.title} Dubai`,
                "real estate jobs Dubai",
                "property careers Dubai",
                "Rocky Real Estate careers",
                "real estate vacancies Dubai",
            ],
            authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
        },
    });
}

export default async function CareersIndividualPage({ params }: Props) {
    const { job: jobSlug } = await params;
    const job = getJobBySlug(jobSlug);
    if (!job) notFound();

    const relatedJobs = openPositions.filter((j) => j.id !== job.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid />
            <main className="site-header-offset">
                <JobHeaderSection job={job} />

                <section className="py-10 sm:py-12 lg:py-14">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                            <div className="lg:col-span-8">
                                <JobDetailsSection job={job} />
                            </div>

                            <JobApplyCard job={job} />
                        </div>
                    </Container>
                </section>

                <RelatedJobsSection jobs={relatedJobs} />
            </main>
            <Footer />
        </div>
    );
}
