import Link from "next/link";
import type { JobPosition } from "@/utils/types";
import Container from "@/components/layout/Container";
import JobBadge from "@/components/careers/JobBadge";

type Props = { job: JobPosition };

export default function JobHeaderSection({ job }: Props) {
    return (
        <section className="py-10 sm:py-12 lg:py-14 border-b" style={{ borderColor: "#e8edf3" }}>
            <Container>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-3">
                        <Link
                            href="/careers"
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                            style={{ color: "#0d365e" }}
                            aria-label="Back to careers"
                        >
                            <span aria-hidden>←</span> Back to Careers
                        </Link>
                    </div>

                    <div>
                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight"
                            style={{ color: "#0d365e" }}
                        >
                            {job.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <JobBadge label={job.department} variant="primary" />
                            <JobBadge label={job.location} />
                            <JobBadge label={job.jobType} />
                            {job.workMode && <JobBadge label={job.workMode} />}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

