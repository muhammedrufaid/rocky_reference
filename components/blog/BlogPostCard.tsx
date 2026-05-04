import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/utils/types";

export type BlogPostCardVariant = "home" | "listing";

type Props = {
  post: BlogPost;
  variant?: BlogPostCardVariant;
  className?: string;
};

export default function BlogPostCard({ post, variant = "listing", className }: Props) {
  if (variant === "home") {
    return (
      <Link href={post.path} className={["group block", className].filter(Boolean).join(" ")}>
        <div className="flex flex-col gap-4">
          <div className="relative h-[240px] overflow-hidden rounded-[12px] bg-(--soft-sand)/30 md:h-[260px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest text-[#717171]"
              style={{ letterSpacing: "0.08em" }}
            >
              {post.category}
            </p>
            <h3 className="mt-2 line-clamp-2 text-base font-medium transition-colors">
              {post.description}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className={["group", className].filter(Boolean).join(" ")}>
      <Link
        href={post.path}
        className="block overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
      >
        <div className="relative aspect-16/10 w-full overflow-hidden bg-black/3">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold tracking-wide text-charcoal/70">
              {post.category}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-base font-medium tracking-[-0.01em] text-charcoal md:text-lg">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/70">{post.description}</p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-rocky-blue">
            Read article
            <span aria-hidden className="translate-x-0 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

