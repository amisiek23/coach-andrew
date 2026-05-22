import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elite Tennis Profile | CoachAndrew",
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
          Elite Tennis Profile
        </h1>
        <p style={{
          fontSize: 14, color: "#377A00", fontWeight: 600,
          marginBottom: 0, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Advanced Athlete Diagnostic
        </p>
      </div>

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

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
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
            }}
          >
            Begin Assessment
          </Link>
          <Link
            href="/measuring-elite-performance"
            style={{
              display: "inline-block",
              padding: "16px 40px", fontSize: 17, fontWeight: 600,
              color: "#377A00",
              background: "#fff",
              border: "2px solid #377A00",
              borderRadius: 50,
              textDecoration: "none",
            }}
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}
