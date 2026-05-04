import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/layout/Container";
import { blogPosts } from "@/utils/data";
import type { BlogPost } from "@/utils/types";
import { slugFromPath } from "@/utils/slugify";
import { notFound } from "next/navigation";
import Image from "next/image";

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

  return (
    <div className="min-h-screen bg-white">
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

        <section className="py-10 sm:py-12 lg:py-14">
          <Container>
            <div className="">
              {/* <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold tracking-wide text-charcoal/70">
                  {post.category}
                </span>
                <span className="text-xs text-charcoal/45">Rocky Real Estate</span>
              </div> */}

              <div className="relative mt-6 min-h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-black/3">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="prose prose-neutral mt-8 max-w-none">
                <p className="text-charcoal/80 leading-relaxed">
                  {post.description}
                </p>
                <p className="text-charcoal/70 leading-relaxed">
                  This is a placeholder article page. If you want, I can help you add full post
                  content (MDX/Markdown), author, publish date, and related articles.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

