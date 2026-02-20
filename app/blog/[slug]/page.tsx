import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={{ background: "#fff" }}>
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
          >
            {post.title}
          </h1>
        </header>

        <div className="prose prose-green max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </div>
  );
}
