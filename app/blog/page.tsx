import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Thinking Corner",
  description: "Articles and insights from CoachAndrew on purpose, growth, and self-mastery.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Page header */}
      <section style={{ background: "var(--green-pale)", padding: "2rem 0 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--green)", fontWeight: 600, fontSize: ".8125rem", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: ".5rem" }}>
            Articles
          </p>
          <h1 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)", marginBottom: ".5rem" }}>
            Thinking Corner
          </h1>
          <p style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", fontWeight: 600, color: "var(--green)", marginBottom: ".5rem" }}>
            Elevate Your Game: Tennis and Mindfulness
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto" }}>
            Insights on purpose, performance &amp; growth
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: "var(--green-light)", borderBottom: "1px solid var(--border)", padding: "2rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>

          <p style={{ fontFamily: "var(--font-heading), serif", fontSize: "1.375rem", fontWeight: 700, color: "var(--green)", marginBottom: ".75rem", letterSpacing: ".03em" }}>
            Breath. Move. Grow.
          </p>

          <p style={{ fontSize: "1.0625rem", color: "var(--text)", lineHeight: 1.75, marginBottom: ".75rem" }}>
            Welcome to the Thinking Corner — a space for honest reflection on what it means to perform at your best, live with purpose, and keep growing every day.
          </p>

          <p style={{ fontSize: "1.0625rem", color: "var(--text)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Coaching isn&apos;t about giving you a script to follow. It&apos;s about helping you see your own patterns more clearly, so you can choose differently when it matters most.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading), serif", fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: ".75rem" }}>
            What you&apos;ll find here
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {[
              { label: "Mindset", desc: "how to build the mental foundations that support sustainable performance" },
              { label: "Movement", desc: "why the body and mind are inseparable partners in growth" },
              { label: "Breath", desc: "the simplest, most overlooked tool for regulation and clarity" },
            ].map(({ label, desc }) => (
              <li key={label} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                <span style={{ marginTop: ".25rem", width: "8px", height: "8px", borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
                <span style={{ fontSize: "1rem", color: "var(--text)", lineHeight: 1.65 }}>
                  <strong style={{ color: "var(--text)" }}>{label}</strong> — {desc}
                </span>
              </li>
            ))}
          </ul>

          <h2 style={{ fontFamily: "var(--font-heading), serif", fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: ".75rem" }}>
            A note from me
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "var(--text)", lineHeight: 1.75, marginBottom: ".75rem" }}>
            I&apos;ve spent over a decade working with individuals who are committed to showing up better — not just on the court or in the boardroom, but in life. What I&apos;ve found, again and again, is that the real breakthroughs happen in the quiet moments between the big ones.
          </p>
          <p style={{ fontSize: "1.0625rem", color: "var(--text)", lineHeight: 1.75, fontStyle: "italic" }}>
            This blog is where I share those insights. Pull up a chair.
          </p>

        </div>
      </section>

      {/* Grid */}
      <section style={{ background: "#fff", padding: "2.5rem 0 3.5rem" }}>
        <div className="container">
          {posts.length === 0
            ? <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No posts yet.</p>
            : <div className={`blog-grid${posts.length === 2 ? " blog-grid--two" : ""}`}>
                {posts.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
          }
        </div>
      </section>
    </>
  );
}
