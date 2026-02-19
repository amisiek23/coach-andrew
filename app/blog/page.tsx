import type { Metadata } from "next";
import { getPosts } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Thinking Corner",
  description: "Articles and insights from CoachAndrew on purpose, growth, and self-mastery.",
};

export default async function BlogPage() {
  const posts = await getPosts(100);

  return (
    <>
      {/* Page header */}
      <section style={{ background: "var(--green-pale)", padding: "4rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--green)", fontWeight: 600, fontSize: ".8125rem", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: ".5rem" }}>
            Articles
          </p>
          <h1 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)", marginBottom: ".75rem" }}>
            Thinking Corner
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto" }}>
            Insights on purpose, performance &amp; growth
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ background: "#fff", padding: "4rem 0 5rem" }}>
        <div className="container">
          {posts.length === 0
            ? <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No posts yet.</p>
            : <div className="blog-grid">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
              </div>
          }
        </div>
      </section>
    </>
  );
}
