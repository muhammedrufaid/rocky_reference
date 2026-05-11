import Link from "next/link";
import type { ReactNode } from "react";

import type { BlogPost } from "@/utils/types";

function SidebarCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#C3AD95]/35 bg-[#FFFFFF] p-5">
      {title ? <div className="text-sm font-medium text-[#081F3A]">{title}</div> : null}
      {children}
    </div>
  );
}

export function CategoryCard({ category }: { category: string }) {
  return (
    <SidebarCard>
      <div className="text-xs font-medium tracking-wide text-[#081F3A]/70">Category</div>
      <div className="mt-2 inline-flex items-center rounded-full bg-[#E7DCCD] px-3 py-1 text-sm font-medium text-[#0D365E]">
        {category}
      </div>
    </SidebarCard>
  );
}

export function MorePostsCard({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <SidebarCard title="More posts">
      <div className="mt-4 space-y-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={p.path}
            className="group block rounded-xl border border-[#C3AD95]/25 p-3 transition hover:border-[#9F8870]/35 hover:bg-[#F6F6F6]"
          >
            <div className="text-sm font-medium leading-snug text-[#0D365E] group-hover:underline">
              {p.title}
            </div>
            <div className="mt-1 text-xs text-[#333333]/60">{p.category}</div>
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
}

