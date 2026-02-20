import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";

const HERO_IMAGE = "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2026/01/istockphoto-178745492-1024x1024-5-edited.jpg";

export const metadata: Metadata = { title: "Home", description: "Breath. Move. Grow." };

export default function HomePage() {
  const recentPosts = getAllPosts(3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", width: "100%", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Image
          src={HERO_IMAGE}
          alt="Tennis player at sunset"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Gradient overlay — dark at bottom, semi-transparent top */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.62) 100%)",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "640px" }}>
            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: ".8125rem", fontWeight: 600,
              letterSpacing: ".18em", textTransform: "uppercase",
              color: "#a8d878", marginBottom: "1.25rem",
            }}>
              Coaching · Mindset · Performance
            </p>

            <h1 style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 700, lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1.25rem",
            }}>
              Unleash Your<br />Potential
            </h1>

            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.125rem", color: "rgba(255,255,255,.82)",
              lineHeight: 1.65, marginBottom: "2.25rem", maxWidth: "480px",
            }}>
              Breath. Move. Grow. — a holistic approach to purpose, performance and lasting change.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/blog" className="btn btn-outline-white">Thinking Corner</Link>
              <Link href="/about-me" className="btn btn-green">About Me</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: "#377A00", color: "#fff", padding: "2rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: "clamp(2rem, 6vw, 5rem)", flexWrap: "wrap" }}>
          {[
            { number: "10+", label: "Years coaching" },
            { number: "500+", label: "Sessions delivered" },
            { number: "3",   label: "Coaching programmes" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading), serif", fontSize: "2rem", fontWeight: 700 }}>{stat.number}</div>
              <div style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".8125rem", opacity: .85, letterSpacing: ".06em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST ARTICLES ──────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section style={{ background: "var(--green-pale)", padding: "5rem 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "var(--green)", fontWeight: 600, fontSize: ".8125rem", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: ".5rem" }}>
                Thinking Corner
              </p>
              <h2 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--text)" }}>
                Latest Articles
              </h2>
            </div>

            <div className="blog-grid">
              {recentPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" className="btn btn-outline-green">View all articles</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)",
        padding: "5rem 0", textAlign: "center", color: "#fff",
      }}>
        <div className="container" style={{ maxWidth: "620px" }}>
          <h2 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Ready to start your journey?
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,.85)", lineHeight: 1.65, marginBottom: "2rem" }}>
            Explore the programmes, take the questionnaire, and find out which coaching path is right for you.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/questionnaire" className="btn btn-outline-white">Take the Questionnaire</Link>
            <Link href="/shop" className="btn" style={{ background: "#fff", color: "#377A00", borderColor: "#fff" }}>View Programmes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
