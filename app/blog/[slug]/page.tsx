import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/utils/data";
import type { BlogPost } from "@/utils/types";
import { slugFromPath } from "@/utils/slugify";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/blog/BlogPostView";
import Newsletter from "@/components/home/Newsletter";
import { buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";

type Props = { params: Promise<{ slug: string }> };


function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => slugFromPath(p.path) === slug);
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: slugFromPath(p.path) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const pathname = `/blog/${slug}`;

  if (!post) {
    return {
      title: "Blog Post Not Found | Rocky Real Estate",
      description: "This blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const seo = await fetchSeoFromCms(pathname);

  return buildPageMetadata({
    pathname,
    seo,
    openGraphType: "article",
    fallback: {
      title: `${post.title} | Blog | Rocky Real Estate`,
      description: post.description,
      image: post.image
        ? toAbsoluteUrl(post.image)
        : toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: [
        post.title,
        "Dubai real estate blog",
        "property news Dubai",
        "UAE real estate insights",
        "Rocky Real Estate blog",
        ...(post.category ? [`${post.category} Dubai real estate`] : []),
      ],
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
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
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

