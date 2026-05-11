import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { CategoryCard, MorePostsCard } from "@/components/blog/BlogPostSidebarCards";
import BlogPostArticleBody from "@/components/blog/BlogPostArticleBody";
import type { BlogPost } from "@/utils/types";
import Image from "next/image";

export default function BlogPostView({
  post,
  morePosts,
}: {
  post: BlogPost;
  morePosts: BlogPost[];
}) {
  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <Container>
        <h1 className="text-3xl font-medium tracking-tight text-[#081F3A] sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-6 grid grid-cols-12 gap-8 lg:gap-10">
          <article className="col-span-12 lg:col-span-9">
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[#C3AD95]/35 bg-[#F6F6F6]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="object-cover"
              />
            </div>

            {post.content?.length ? (
              <BlogPostArticleBody blocks={post.content} />
            ) : (
              <div className="prose prose-neutral mt-8 max-w-none">
                <p className="text-[#333333]/80 leading-relaxed">{post.description}</p>
                <p className="text-[#333333]/70 leading-relaxed">
                  This is a placeholder article page. If you want, I can help you add full post
                  content (MDX/Markdown), author, publish date, and related articles.
                </p>
              </div>
            )}
          </article>

          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <CategoryCard category={post.category} />
              <MorePostsCard posts={morePosts} />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

