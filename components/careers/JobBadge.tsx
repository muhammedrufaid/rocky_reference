type Props = {
    label: string;
    variant?: "primary" | "muted";
};

export default function JobBadge({ label, variant = "muted" }: Props) {
    const style =
        variant === "primary"
        // bg-[] text-[#9f8870] 
            ? { backgroundColor: "#f5f2ee", color: "#9f8870" }
            : { backgroundColor: "#f5f7fa", color: "#555" };

    return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={style}>
            {label}
        </span>
    );
}

