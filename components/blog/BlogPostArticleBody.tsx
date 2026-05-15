import Link from "next/link";
import type { BlogContentBlock, BlogInlinePart } from "@/utils/types";

function BlogInlineContent({ parts }: { parts: BlogInlinePart[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <Link
            key={i}
            href={part.href}
            className="font-medium text-[#081F3A] underline decoration-[#C3AD95]/60 underline-offset-2 transition-colors hover:text-[#C3AD95]"
          >
            {part.text}
          </Link>
        ),
      )}
    </>
  );
}

export default function BlogPostArticleBody({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="prose prose-neutral mt-8 max-w-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading2":
            return (
              <h2
                key={index}
                className="mt-10 mb-3 text-xl font-medium tracking-tight text-[#081F3A] first:mt-0 sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "heading3":
            return (
              <h3
                key={index}
                className="mt-8 mb-2 text-lg font-medium text-[#081F3A] sm:text-xl"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="text-[#333333]/80 leading-relaxed [&+&]:mt-4">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={index}
                className="mt-3 list-disc space-y-2 pl-5 text-[#333333]/80 leading-relaxed"
              >
                {block.items.map((item, i) => (
                  <li key={i}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <BlogInlineContent parts={item} />
                    )}
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

