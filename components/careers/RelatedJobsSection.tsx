import Link from "next/link";
import type { JobPosition } from "@/utils/types";
import { slugify } from "@/utils/slugify";
import Container from "@/components/layout/Container";
import JobBadge from "@/components/careers/JobBadge";

type Props = { jobs: JobPosition[] };

export default function RelatedJobsSection({ jobs }: Props) {
    if (!jobs.length) return null;

    return (
        <section className="pb-14">
            <Container>
                <div className="flex items-end justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-medium" style={{ color: "#0d365e" }}>
                        Other open roles
                    </h2>
                    <Link
                        href="/careers"
                        className="text-sm font-medium hover:opacity-80"
                        style={{ color: "#0d365e" }}
                    >
                        View all
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((j) => (
                        <Link
                            key={j.id}
                            href={`/careers/${slugify(j.title)}`}
                            className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-18px_rgba(13,54,94,0.16)]"
                            style={{ borderColor: "#e8edf3" }}
                            aria-label={`View ${j.title}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div
                                        className="text-lg font-semibold leading-snug"
                                        style={{ color: "#0d365e" }}
                                    >
                                        {j.title}
                                    </div>
                                    <div className="mt-1 text-sm" style={{ color: "#6b7a8d" }}>
                                        {j.location}
                                    </div>
                                </div>
                                <span
                                    className="text-sm font-semibold transition-transform group-hover:translate-x-0.5"
                                    style={{ color: "#0d365e" }}
                                    aria-hidden
                                >
                                    →
                                </span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <JobBadge label={j.department} variant="primary" />
                                <JobBadge label={j.jobType} />
                                {j.workMode && <JobBadge label={j.workMode} />}
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}

