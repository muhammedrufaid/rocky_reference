import type { JobPosition } from "@/utils/data";
import ShareJobButton from "@/components/careers/ShareJobButton";

type Props = { job: JobPosition };

export default function JobApplyCard({ job }: Props) {
    return (
        <aside className="lg:col-span-4">
            <div
                className="lg:sticky lg:top-28 rounded-2xl border bg-white p-6 shadow-sm"
                style={{ borderColor: "#e8edf3" }}
                aria-label="Apply card"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold" style={{ color: "#0d365e" }}>
                            Apply now
                        </h2>
                        <p className="mt-1 text-sm" style={{ color: "#6b7a8d" }}>
                            We usually respond within a few business days.
                        </p>
                    </div>

                    <ShareJobButton title={job.title} className="shrink-0" />
                </div>

                <div className="mt-5 grid gap-3 text-sm" style={{ color: "#555" }}>
                    {job.applyEmail && (
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-medium" style={{ color: "#0d365e" }}>
                                Email
                            </span>
                            <a
                                href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(
                                    `Application: ${job.title}`
                                )}`}
                                className="text-right hover:opacity-80"
                                style={{ color: "#0d365e" }}
                            >
                                {job.applyEmail}
                            </a>
                        </div>
                    )}
                    {job.phone && (
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-medium" style={{ color: "#0d365e" }}>
                                Phone
                            </span>
                            <a
                                href={`tel:${job.phone}`}
                                className="text-right hover:opacity-80"
                                style={{ color: "#0d365e" }}
                            >
                                {job.phone}
                            </a>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <a
                        href={
                            job.applyEmail
                                ? `mailto:${job.applyEmail}?subject=${encodeURIComponent(
                                      `Application: ${job.title}`
                                  )}`
                                : "/careers"
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                            backgroundColor: "#0d365e",
                            color: "#fff",
                            outlineColor: "#0d365e",
                        }}
                    >
                        Apply for this role <span aria-hidden>→</span>
                    </a>
                </div>
            </div>
        </aside>
    );
}

