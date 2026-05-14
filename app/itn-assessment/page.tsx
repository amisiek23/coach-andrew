import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ITN Assessment | CoachAndrew",
  description: "How the International Tennis Number assessment can become a powerful tool for psychological growth — shifting from a result mindset to a growth mindset.",
};

const MINDSET_ROWS = [
  { result: '"Did I win?"',              growth: '"What did I improve?"' },
  { result: "Fear of mistakes",          growth: "Mistakes become feedback" },
  { result: "Identity tied to ranking",  growth: "Identity tied to development" },
  { result: "Emotional highs & lows",    growth: "Greater emotional stability" },
  { result: "Needs validation",          growth: "Builds self-awareness" },
  { result: "Avoids challenge",          growth: "Seeks challenge" },
  { result: "Focus on outcome",          growth: "Focus on process" },
  { result: "Short-term thinking",       growth: "Long-term mastery" },
];

const WHY_POINTS = [
  {
    num: "1",
    icon: "📊",
    title: "It Creates Objective Feedback",
    body: "Instead of emotionally guessing \"I played terribly\", players begin to understand what specifically worked, what needs development, and where they stand realistically. This reduces emotional distortion.",
  },
  {
    num: "2",
    icon: "🎯",
    title: "It Shifts Attention From Ego to Process",
    body: "Without structure, many players attach their worth to match results, comparison, and external validation. The ITN reframes improvement as measurable progression and skill development. The question becomes: \"Am I becoming a more complete player?\" rather than \"Did I win today?\"",
  },
  {
    num: "3",
    icon: "📈",
    title: "The Healthy Performance Curve",
    body: "One of the greatest psychological benefits is understanding that improvement is not linear. Real growth contains setbacks, plateaus, fluctuations, and temporary regressions. The ITN helps players see the long-term trajectory instead of short-term emotional reactions — developing patience, resilience, and emotional maturity.",
  },
  {
    num: "4",
    icon: "🔥",
    title: "The Deeper Psychological Shift",
    body: "The player slowly moves from \"I must prove myself\" toward \"I am building myself.\" That is a profound difference. One mentality creates pressure. The other creates development.",
  },
  {
    num: "5",
    icon: "🏆",
    title: "Long-Term Effect",
    body: "Players with a growth mindset usually become more coachable, more resilient, calmer under pressure, more disciplined, and ultimately more consistent performers — because sustainable improvement comes from learning to value the process of mastery itself.",
  },
];

export default function ITNIntroPage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "0.5rem 24px 80px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>

      {/* ── TITLE ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🎾</div>
        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 4,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          ITN Assessment
        </h1>
        <p style={{
          fontSize: 14, color: "#377A00", fontWeight: 600,
          marginBottom: 0, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          A Tool for Psychological Growth
        </p>
      </div>

      {/* ── THE PROBLEM ───────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <div style={{
          background: "#fff", borderRadius: 24,
          boxShadow: "0 4px 32px rgba(55,122,0,0.08)", overflow: "hidden",
        }}>
          <div style={{ background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)", padding: "2.5rem 2.5rem 2rem" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#a8d878", marginBottom: 10 }}>
              The Challenge
            </p>
            <h2 style={{
              fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: 0,
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            }}>
              The Result-Oriented Mindset
            </h2>
          </div>
          <div style={{ padding: "2.5rem" }}>
            <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Most players unconsciously develop a <strong>result-oriented mindset</strong> — judging themselves mainly through winning or losing, rankings, comparison with others, and short-term outcomes.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
              {["Anxiety", "Frustration", "Fear of mistakes", "Emotional instability", "Inconsistent confidence"].map((item) => (
                <div key={item} style={{ background: "#FEF2F2", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#EF4444", fontWeight: 700 }}>·</span>
                  <span style={{ fontSize: 14, color: "#334155" }}>{item}</span>
                </div>
              ))}
            </div>
            <blockquote style={{ margin: 0, padding: "1.25rem 1.5rem", background: "#EAF7EB", borderLeft: "4px solid #377A00", borderRadius: "0 12px 12px 0" }}>
              <p style={{ fontSize: 17, fontStyle: "italic", color: "#1e3a1e", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
                "The ITN process can help shift players away from this mentality toward something far healthier and more sustainable: a Growth Mindset."
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <h2 style={{
          textAlign: "center", fontSize: 22, fontWeight: 700,
          color: "#151716", marginBottom: "1.25rem",
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          ⚖️ Result Mindset vs Growth Mindset
        </h2>
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ background: "#FEF2F2", padding: "14px 24px", borderRight: "1px solid #F1F5F9" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", margin: 0, letterSpacing: ".08em", textTransform: "uppercase" }}>Result-Oriented Player</p>
            </div>
            <div style={{ background: "#EAF7EB", padding: "14px 24px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#377A00", margin: 0, letterSpacing: ".08em", textTransform: "uppercase" }}>Growth-Oriented Player</p>
            </div>
          </div>
          {/* Rows */}
          {MINDSET_ROWS.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #F1F5F9" }}>
              <div style={{ padding: "14px 24px", borderRight: "1px solid #F1F5F9" }}>
                <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>{row.result}</p>
              </div>
              <div style={{ padding: "14px 24px" }}>
                <p style={{ fontSize: 14, color: "#334155", fontWeight: 500, margin: 0 }}>{row.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ITN HELPS ─────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <h2 style={{
          textAlign: "center", fontSize: 22, fontWeight: 700,
          color: "#151716", marginBottom: "1.25rem",
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          🧠 Why the ITN Helps This Transformation
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {WHY_POINTS.map((pt) => (
            <div key={pt.num} style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(55,122,0,0.06)", display: "flex", gap: 16 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{pt.icon}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#151716", margin: "0 0 6px" }}>
                  <span style={{ color: "#377A00" }}>{pt.num}.</span> {pt.title}
                </p>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: 0 }}>{pt.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL MESSAGE ─────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2.5rem" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "2rem 2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🧭</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#151716", marginBottom: 12, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
            Final Message
          </h3>
          <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 16px" }}>
            The ITN is not only a tennis number. Used correctly, it becomes a psychological framework teaching players how to relate to challenge, failure, progress, and themselves.
          </p>
          <p style={{ fontSize: 16, fontStyle: "italic", color: "#377A00", fontWeight: 600, margin: 0, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
            "And perhaps that is even more valuable than the rating itself."
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center" }}>
        <Link
          href="/itn-assessment/guide"
          style={{
            display: "inline-block", padding: "16px 48px", fontSize: 17, fontWeight: 600,
            color: "#fff", background: "linear-gradient(135deg, #377A00, #2f6a00)",
            borderRadius: 50, boxShadow: "0 4px 14px rgba(55,122,0,0.35)", textDecoration: "none",
          }}
        >
          Explore the Assessment →
        </Link>
      </div>
    </div>
  );
}
