import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/utils/data";
import type { BlogPost } from "@/utils/types";
import { slugFromPath } from "@/utils/slugify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/blog/BlogPostView";

type Props = { params: Promise<{ slug: string }> };


function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => slugFromPath(p.path) === slug);
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: slugFromPath(p.path) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Blog | Rocky Real Estate`,
      description: post.description,
      images: [post.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog | Rocky Real Estate`,
      description: post.description,
      images: [post.image],
    },
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
        <BlogPostView post={post} morePosts={morePosts} />
      </main>
      <Footer />
    </div>
  );
}

