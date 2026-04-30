type Props = { items: string[] };

export default function JobBullets({ items }: Props) {
    return (
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={`${idx}-${item}`} className="flex gap-3">
                    <span
                        className="mt-2 h-1.5 w-1.5 rounded-full flex-none"
                        style={{ backgroundColor: "#0d365e" }}
                        aria-hidden
                    />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

