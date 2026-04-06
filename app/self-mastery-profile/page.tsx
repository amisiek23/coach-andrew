import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Self Mastery Profile | CoachAndrew",
  description: "Discover your mental performance profile across 7 core dimensions.",
};

export default function SelfMasteryProfileIntroPage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "3rem 24px 40px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>

        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 8,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          Self Mastery Profile
        </h1>

        <p style={{
          fontSize: 16, color: "#377A00", fontWeight: 600,
          marginBottom: 24, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Advanced Athlete Diagnostic
        </p>

        <p style={{ fontSize: 17, color: "#3a4a3a", lineHeight: 1.7, marginBottom: 12 }}>
          Discover your mental performance profile across 7 core dimensions. Rate yourself
          honestly on 35 qualities to reveal your strengths, growth areas, and unique
          competitor archetype.
        </p>

        <div style={{
          display: "inline-flex", flexDirection: "column", gap: 6,
          background: "#fff", borderRadius: 12, padding: "16px 24px",
          marginBottom: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          textAlign: "left", fontSize: 14, color: "#555",
        }}>
          <span><strong style={{ color: "#EF4444" }}>0–20%</strong> Low</span>
          <span><strong style={{ color: "#F59E0B" }}>21–50%</strong> Emerging</span>
          <span><strong style={{ color: "#10B981" }}>51–70%</strong> Solid foundation</span>
          <span><strong style={{ color: "#3B82F6" }}>71–85%</strong> Advanced</span>
          <span><strong style={{ color: "#377A00" }}>86–100%</strong> Mastery</span>
        </div>

        <br />

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
