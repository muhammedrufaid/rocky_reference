 "use client";

import { useEffect, useRef, useState } from "react";
import type { JobPosition } from "@/utils/types";
import ShareJobButton from "@/components/careers/ShareJobButton";

type Props = { job: JobPosition };

export default function JobApplyCard({ job }: Props) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cvFile, setCvFile] = useState<File | null>(null);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        function onPointerDown(e: MouseEvent | PointerEvent) {
            const el = rootRef.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
        }

        if (!open) return;
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        // reset form state each open
        setSubmitted(false);
        setSubmitError(null);
        setSubmitting(false);
        setFullName("");
        setEmail("");
        setPhone("");
        setCvFile(null);
    }, [open]);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submitting) return;
        setSubmitError(null);

        if (!fullName.trim() || !email.trim() || !phone.trim()) {
            setSubmitError("Please fill in your name, email, and phone number.");
            return;
        }
        if (!cvFile) {
            setSubmitError("Please upload your CV.");
            return;
        }

        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.set("name", fullName.trim());
            fd.set("email", email.trim());
            fd.set("phone", phone.trim());
            fd.set("position", job.title);
            fd.set("cv", cvFile);

            const res = await fetch("/api/careers/apply", {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Failed to submit application.");
            }

            setSubmitted(true);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Failed to submit application.");
        } finally {
            setSubmitting(false);
        }
    }

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
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                            backgroundColor: "#0d365e",
                            color: "#fff",
                            outlineColor: "#0d365e",
                        }}
                    >
                        Apply for this role <span aria-hidden>→</span>
                    </button>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" aria-hidden />

                    <div
                        ref={rootRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Apply for this role"
                        className="relative w-full max-w-lg md:max-w-xl overflow-hidden rounded-2xl border bg-white shadow-2xl"
                        style={{ borderColor: "#e8edf3" }}
                    >
                        <div
                            className="flex items-start justify-between gap-4 px-5 py-4 border-b"
                            style={{ borderColor: "#eef3f9" }}
                        >
                            <div>
                                <div className="text-sm font-semibold" style={{ color: "#0d365e" }}>
                                    Apply for {job.title}
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: "#6b7a8d" }}>
                                    Fill in your details and upload your CV
                                </div>
                            </div>
                            {/* <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-[#f5f7fa] focus:outline-none focus:ring-1 focus:ring-offset-1"
                                style={{ borderColor: "#e8edf3", color: "#0d365e", outlineColor: "#0d365e" }}
                            >
                                Close
                            </button> */}
                        </div>

                        <div className="p-5 max-h-[calc(100vh-10rem)] overflow-y-auto">
                            {submitted ? (
                                <div className="text-sm">
                                    <div className="rounded-xl border p-4" style={{ borderColor: "#e8edf3" }}>
                                        <div className="font-semibold" style={{ color: "#0d365e" }}>
                                            Application submitted
                                        </div>
                                        <div className="mt-1" style={{ color: "#6b7a8d" }}>
                                            Thanks — our team will reach out to you shortly.
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border transition-colors hover:bg-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                        style={{
                                            borderColor: "#e8edf3",
                                            color: "#0d365e",
                                            outlineColor: "#0d365e",
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} className="grid gap-3 text-sm">
                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium" style={{ color: "#0d365e" }}>
                                            Name
                                        </span>
                                        <input
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            placeholder="Your full name"
                                            className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-offset-1"
                                            style={{ borderColor: "#e8edf3", outlineColor: "#0d365e" }}
                                        />
                                    </label>

                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium" style={{ color: "#0d365e" }}>
                                            Email
                                        </span>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            type="email"
                                            placeholder="you@email.com"
                                            className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-offset-1"
                                            style={{ borderColor: "#e8edf3", outlineColor: "#0d365e" }}
                                        />
                                    </label>

                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium" style={{ color: "#0d365e" }}>
                                            Phone number
                                        </span>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            type="tel"
                                            placeholder="+971 50 000 0000"
                                            className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-offset-1"
                                            style={{ borderColor: "#e8edf3", outlineColor: "#0d365e" }}
                                        />
                                    </label>

                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium" style={{ color: "#0d365e" }}>
                                            Position
                                        </span>
                                        <input
                                            value={job.title}
                                            disabled
                                            className="w-full rounded-xl border bg-[#f5f7fa] px-3 py-2.5"
                                            style={{ borderColor: "#e8edf3", color: "#6b7a8d" }}
                                        />
                                    </label>

                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium" style={{ color: "#0d365e" }}>
                                            Upload CV
                                        </span>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            required
                                            onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                                            className="w-full cursor-pointer rounded-xl border px-3 py-2.5"
                                            style={{ borderColor: "#e8edf3" }}
                                        />
                                        <span className="text-[11px]" style={{ color: "#6b7a8d" }}>
                                            Accepted: PDF, DOC, DOCX
                                        </span>
                                    </label>

                                    {submitError && (
                                        <div
                                            className="rounded-xl border px-3 py-2 text-xs"
                                            style={{ borderColor: "#f3c6c6", backgroundColor: "#fff5f5", color: "#8a1f1f" }}
                                        >
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="mt-2 flex flex-col gap-2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="inline-flex cursor-pointer w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            style={{
                                                backgroundColor: "#0d365e",
                                                color: "#fff",
                                                outlineColor: "#0d365e",
                                            }}
                                        >
                                            {submitting ? "Submitting..." : "Submit application"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border transition-colors hover:bg-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            style={{
                                                borderColor: "#e8edf3",
                                                color: "#0d365e",
                                                outlineColor: "#0d365e",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}

