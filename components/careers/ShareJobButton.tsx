"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShareNetworkIcon } from "@/utils/icons";

type Props = {
    title: string;
    className?: string;
};

export default function ShareJobButton({ title, className }: Props) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

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
        if (!copied) return;
        const t = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(t);
    }, [copied]);

    const shareText = useMemo(() => {
        const base = `Check out this job: ${title}`;
        return url ? `${base}\n${url}` : base;
    }, [title, url]);

    const links = useMemo(() => {
        const u = encodeURIComponent(url || "");
        const t = encodeURIComponent(`Check out this job: ${title}`);
        const tt = encodeURIComponent(shareText);
        return {
            whatsapp: `https://wa.me/?text=${tt}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
            x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
        };
    }, [title, url, shareText]);

    async function copyLink() {
        try {
            const toCopy = url || window.location.href;
            await navigator.clipboard.writeText(toCopy);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    return (
        <div ref={rootRef} className={className}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl border bg-white p-2 transition-colors hover:bg-[#f5f7fa] focus:outline-none focus:ring-1 focus:ring-offset-1"
                style={{ borderColor: "#e8edf3", color: "#0d365e", outlineColor: "#0d365e" }}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label="Share this job"
            >
                <ShareNetworkIcon className="h-5 w-5" />
            </button>

            {open && (
                <div
                    role="dialog"
                    aria-label="Share options"
                    className="relative z-20"
                >
                    <div
                        className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border bg-white shadow-lg"
                        style={{ borderColor: "#e8edf3" }}
                    >
                        <div className="px-4 py-3 border-b" style={{ borderColor: "#eef3f9" }}>
                            <div className="text-sm font-semibold" style={{ color: "#0d365e" }}>
                                Share
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: "#5a6a7d" }}>
                                Choose a platform
                            </div>
                        </div>

                        <div className="p-2">
                            <a
                                href={links.whatsapp}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-[#f5f7fa]"
                                style={{ color: "#0d365e" }}
                            >
                                <span>WhatsApp</span>
                                <span aria-hidden>↗</span>
                            </a>

                            {/* <a
                                href={links.facebook}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-[#f5f7fa]"
                                style={{ color: "#0d365e" }}
                            >
                                <span>Facebook</span>
                                <span aria-hidden>↗</span>
                            </a> */}
                            {/* <button
                                type="button"
                                onClick={async () => {
                                    await copyLink();
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-[#f5f7fa] text-left"
                                style={{ color: "#0d365e" }}
                            >
                                <span>{copied ? "Copied!" : "Instagram"}</span>
                                <span aria-hidden>{copied ? "✓" : "⧉"}</span>
                            </button> */}
                            <a
                                href={links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-[#f5f7fa]"
                                style={{ color: "#0d365e" }}
                            >
                                <span>LinkedIn</span>
                                <span aria-hidden>↗</span>
                            </a>
                            <button
                                type="button"
                                onClick={async () => {
                                    await copyLink();
                                }}
                                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-[#f5f7fa] text-left"
                                style={{ color: "#0d365e" }}
                            >
                                <span>{copied ? "Copied!" : "Copy link"}</span>
                                <span aria-hidden>{copied ? "✓" : "⧉"}</span>
                            </button>
                            {/* <a
                                href={links.x}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-[#f5f7fa]"
                                style={{ color: "#0d365e" }}
                            >
                                <span>X</span>
                                <span aria-hidden>↗</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

