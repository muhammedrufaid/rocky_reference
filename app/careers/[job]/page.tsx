import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { notFound } from "next/navigation";
import { openPositions, type JobPosition } from "@/utils/data";
import { slugify } from "@/utils/slug";
import JobHeaderSection from "@/components/careers/JobHeaderSection";
import JobDetailsSection from "@/components/careers/JobDetailsSection";
import JobApplyCard from "@/components/careers/JobApplyCard";
import RelatedJobsSection from "@/components/careers/RelatedJobsSection";

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
    if (!job) {
        return {
            title: "Job Not Found | Rocky Real Estate",
            description: "This job listing could not be found.",
        };
    }

    return {
        title: `${job.title} | Careers | Rocky Real Estate`,
        description:
            job.description ??
            "Explore job details at Rocky Real Estate. Learn more about the job and apply for it.",
    };
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
