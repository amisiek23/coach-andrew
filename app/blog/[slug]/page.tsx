import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPost, getPosts, getFeaturedImageUrl } from "@/lib/wordpress";
import WpContent from "@/components/WpContent";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts(100);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const image = getFeaturedImageUrl(post, "large");
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 160);

  return {
    title: post.title.rendered,
    description,
    openGraph: {
      title: post.title.rendered,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const imageUrl = getFeaturedImageUrl(post, "full");
  const imageAlt =
    post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={{ background: "#fff" }}>
      {/* Featured image */}
      {imageUrl && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/6" }}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
        </div>
      )}

      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "4rem", maxWidth: "800px" }}>
        {/* Back link */}
        <Link
          href="/blog"
          className="font-body inline-flex items-center gap-1"
          style={{ fontSize: "0.875rem", color: "#377A00", marginBottom: "2rem", display: "inline-flex" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All articles
        </Link>

        {/* Date + title */}
        <header style={{ marginBottom: "2rem" }}>
          <time
            dateTime={post.date}
            className="font-body font-semibold uppercase"
            style={{ fontSize: "13px", color: "#377A00", letterSpacing: "0.1em" }}
          >
            {date}
          </time>
          <h1
            className="font-heading font-bold"
            style={{ color: "#151716", marginTop: "0.5rem" }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </header>

        <WpContent html={post.content.rendered} />
      </div>
    </div>
  );
}
