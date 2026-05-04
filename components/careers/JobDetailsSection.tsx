import type { JobPosition } from "@/utils/types";
import JobSection from "@/components/careers/JobSection";
import JobParagraphs from "@/components/careers/JobParagraphs";
import JobBullets from "@/components/careers/JobBullets";

type Props = { job: JobPosition };

export default function JobDetailsSection({ job }: Props) {
    return (
        <JobSection title="About the job">
            <div className="space-y-6">
                {job.subTitle && (
                    <div
                        className="text-base sm:text-lg font-semibold"
                        style={{ color: "#0d365e" }}
                    >
                        {job.subTitle}
                    </div>
                )}

                {job.description && <JobParagraphs text={job.description} />}

                {job.benefits && job.benefits.length > 0 && (
                    <div>
                        <div
                            className="text-sm sm:text-[15px] font-semibold"
                            style={{ color: "#0d365e" }}
                        >
                            What We Offer
                        </div>
                        <div className="mt-3">
                            <JobBullets items={job.benefits} />
                        </div>
                    </div>
                )}

                {job.responsibilities && job.responsibilities.length > 0 && (
                    <div>
                        <div
                            className="text-sm sm:text-[15px] font-semibold"
                            style={{ color: "#0d365e" }}
                        >
                            Key Responsibilities
                        </div>
                        <div className="mt-3">
                            <JobBullets items={job.responsibilities} />
                        </div>
                    </div>
                )}

                {job.requirements && job.requirements.length > 0 && (
                    <div>
                        <div
                            className="text-sm sm:text-[15px] font-semibold"
                            style={{ color: "#0d365e" }}
                        >
                            Requirements
                        </div>
                        <div className="mt-3">
                            <JobBullets items={job.requirements} />
                        </div>
                    </div>
                )}
            </div>
        </JobSection>
    );
}

