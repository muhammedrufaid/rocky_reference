import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/layout/Container";
import { CategoryCard, MorePostsCard } from "@/components/blog/BlogPostSidebarCards";
import { blogPosts } from "@/utils/data";
import type { BlogContentBlock, BlogPost } from "@/utils/types";
import { slugFromPath } from "@/utils/slugify";
import { notFound } from "next/navigation";
import Image from "next/image";
import BlogPostView from "@/components/blog/BlogPostView";

type Props = { params: Promise<{ slug: string }> };

function ArticleBody({ blocks }: { blocks: BlogContentBlock[] }) {
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
                  <li key={i}>{item}</li>
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

function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => slugFromPath(p.path) === slug);
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: slugFromPath(p.path) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Rocky Real Estate",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Blog | Rocky Real Estate`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const morePosts = blogPosts
    .filter((p) => slugFromPath(p.path) !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header forceSolid />
      <main className="site-header-offset">
        {/* <PageHero
          title={post.title}
          description={post.description}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category },
          ]}
          image={post.image}
        /> */}

        <BlogPostView post={post} morePosts={morePosts} />
      </main>
      <Footer />
    </div>
  );
}

