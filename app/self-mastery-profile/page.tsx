import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elite Performance Awareness Scale | CoachAndrew",
  description: "Discover your mental performance profile across 7 core dimensions.",
};

export default function SelfMasteryProfileIntroPage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "0.5rem 24px 80px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>

      {/* ── TITLE ───────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🌿</div>
        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 4,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          Elite Performance Awareness Scale (EPAS)
        </h1>
        <p style={{
          fontSize: 14, color: "#377A00", fontWeight: 600,
          marginBottom: 0, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Advanced Athlete Diagnostic
        </p>
      </div>

      {/* ── THE WORK BEHIND THESE TOOLS ─────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <div style={{
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 4px 32px rgba(55,122,0,0.08)",
          overflow: "hidden",
        }}>
          {/* Header band */}
          <div style={{
            background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)",
            padding: "2.5rem 2.5rem 2rem",
          }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "#a8d878", marginBottom: 10,
            }}>
              Foundation &amp; Philosophy
            </p>
            <h2 style={{
              fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: 0,
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            }}>
              The Work Behind These Tools
            </h2>
          </div>

          {/* Body */}
          <div style={{ padding: "2.5rem" }}>
            <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              This project sits at the intersection of <strong>performance, psychology, and inner development</strong>.
              Over the years, many influential figures have explored parts of this path — from the behavioural focus of <strong>Tony Robbins</strong>,
              to the depth of human emotion described by <strong>Gabor Maté</strong> and <strong>Nathaniel Branden</strong> in his 6 pillars,
              the unconscious patterns explored by <strong>Carl Jung</strong>, and the awareness-based perspectives brought forward by <strong>Deepak Chopra</strong>.
            </p>

            <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              What you will find here is not a repetition of those ideas — but their{" "}
              <strong>integration through direct experience, coaching practice, and a long personal journey of inner work</strong>.
            </p>

            {/* Pull quote */}
            <blockquote style={{
              margin: "0 0 1.5rem",
              padding: "1.25rem 1.5rem",
              background: "#EAF7EB",
              borderLeft: "4px solid #377A00",
              borderRadius: "0 12px 12px 0",
            }}>
              <p style={{
                fontSize: 17, fontStyle: "italic", color: "#1e3a1e",
                lineHeight: 1.75, margin: 0,
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              }}>
                "Real change happens when awareness, responsibility, and attention come together in action."
              </p>
            </blockquote>

            <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, margin: 0 }}>
              Through years of coaching, competition, and deeper spiritual exploration, this approach has been refined
              into <strong>practical tools</strong> — designed not only to understand performance, but to{" "}
              <strong>transform how you operate under pressure</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC INTRO ────────────────────────────────────────── */}
      <div style={{ textAlign: "center", maxWidth: 760 }}>
        <div style={{
          background: "#f0f7ee",
          border: "1.5px solid #c8e0c4",
          borderRadius: 16, padding: "1.5rem 2rem", marginBottom: 28,
        }}>
          <p style={{ fontSize: 17, color: "#2d3d2d", lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
            Discover your mental performance profile across <strong style={{ color: "#377A00" }}>7 core dimensions</strong>. Rate yourself
            honestly on <strong style={{ color: "#377A00" }}>35 qualities</strong> to reveal your strengths, growth areas, and unique
            competitor archetype.
          </p>
        </div>

        <Link
          href="/self-mastery-profile/checkout"
          style={{
            display: "inline-block",
            padding: "16px 48px", fontSize: 17, fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #377A00, #2f6a00)",
            borderRadius: 50,
            boxShadow: "0 4px 14px rgba(55,122,0,0.35)",
            textDecoration: "none",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
        >
          Begin Assessment
        </Link>
      </div>
    </div>
  );
}
