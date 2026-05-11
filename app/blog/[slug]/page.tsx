import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/layout/Container";
import { blogPosts } from "@/utils/data";
import type { BlogContentBlock, BlogPost } from "@/utils/types";
import { slugFromPath } from "@/utils/slugify";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
                className="mt-10 mb-3 text-xl font-medium tracking-tight text-charcoal first:mt-0 sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "heading3":
            return (
              <h3
                key={index}
                className="mt-8 mb-2 text-lg font-medium text-charcoal sm:text-xl"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="text-charcoal/80 leading-relaxed [&+&]:mt-4">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={index}
                className="mt-3 list-disc space-y-2 pl-5 text-charcoal/80 leading-relaxed"
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
            <div className="grid grid-cols-12 gap-8 lg:gap-10">
              <article className="col-span-12 lg:col-span-9">
                <h1 className="text-3xl font-medium tracking-tight text-charcoal sm:text-4xl">
                  {post.title}
                </h1>

                <div className="relative mt-6 min-h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-black/3">
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
                  <ArticleBody blocks={post.content} />
                ) : (
                  <div className="prose prose-neutral mt-8 max-w-none">
                    <p className="text-charcoal/80 leading-relaxed">{post.description}</p>
                    <p className="text-charcoal/70 leading-relaxed">
                      This is a placeholder article page. If you want, I can help you add full post
                      content (MDX/Markdown), author, publish date, and related articles.
                    </p>
                  </div>
                )}
              </article>

              <aside className="col-span-12 lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <div className="text-xs font-medium tracking-wide text-charcoal/60">
                      Category
                    </div>
                    <div className="mt-2 inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-charcoal/80">
                      {post.category}
                    </div>
                  </div>

                  {morePosts.length ? (
                    <div className="rounded-2xl border border-black/10 bg-white p-5">
                      <div className="text-sm font-medium text-charcoal">More posts</div>
                      <div className="mt-4 space-y-3">
                        {morePosts.map((p) => (
                          <Link
                            key={p.id}
                            href={p.path}
                            className="group block rounded-xl border border-black/5 p-3 transition hover:border-black/10 hover:bg-black/2"
                          >
                            <div className="text-sm font-medium leading-snug text-charcoal group-hover:underline">
                              {p.title}
                            </div>
                            <div className="mt-1 text-xs text-charcoal/60">{p.category}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

