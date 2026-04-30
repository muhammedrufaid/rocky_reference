type Props = { text: string };

export default function JobParagraphs({ text }: Props) {
    return (
        <div className="space-y-4">
            {text
                .split(/\n{2,}/g)
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p, idx) => (
                    <p key={`${idx}-${p.slice(0, 16)}`}>{p}</p>
                ))}
        </div>
    );
}

