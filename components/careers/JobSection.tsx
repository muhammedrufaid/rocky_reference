import type { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
};

export default function JobSection({ title, children }: Props) {
    return (
        <section className="mt-10 first:mt-0">
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "#0d365e" }}>
                {title}
            </h2>
            <div className="mt-4 text-sm sm:text-[15px] leading-relaxed" style={{ color: "#6b7a8d" }}>
                {children}
            </div>
        </section>
    );
}

