import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ITN Assessment Guide | CoachAndrew",
  description: "How the ITN On-Court Assessment works — the 5 sections, scoring system, and what your total score means.",
};

const SECTIONS = [
  {
    letter: "01",
    emoji: "🎾",
    title: "Groundstroke Depth",
    max: 90,
    shots: "10 shots — alternating forehand & backhand",
    desc: "Tests your control, depth and power from the baseline. The ball is fed to alternate sides. Points are awarded based on where the ball lands in the court.",
    zones: ["1 pt — service box area", "2 pts — front back court", "3 pts — middle back court", "4 pts — deepest zone"],
  },
  {
    letter: "02",
    emoji: "🏓",
    title: "Volley Depth",
    max: 72,
    shots: "8 shots — alternating forehand & backhand",
    desc: "Played from the service line. Tests your ability to put the volley deep into the court with control and pace. Player makes contact between hip and shoulder height.",
    zones: ["1 pt — service box area", "2 pts — front back court", "3 pts — middle back court", "4 pts — deepest zone"],
  },
  {
    letter: "03",
    emoji: "🎯",
    title: "Groundstroke Accuracy",
    max: 84,
    shots: "12 shots — 6 down the line + 6 cross court",
    desc: "Tests directional control alongside power. You hit 6 shots down the line (alternating FH/BH) then 6 cross court. Target areas run the length of the sideline.",
    zones: ["1 pt — centre area outside targets", "2 pts — target zone before service line", "3 pts — target zone in back court"],
  },
  {
    letter: "04",
    emoji: "💥",
    title: "Serve",
    max: 108,
    shots: "12 serves — 3 to each of the 4 target zones",
    desc: "Tests both placement and power. You serve into four zones: wide and middle of each service box. First and second serve are scored differently.",
    zones: ["First serve target: 4 pts | box: 2 pts", "Second serve target: 2 pts | box: 1 pt", "+1 consistency bonus per successful serve"],
  },
  {
    letter: "05",
    emoji: "⚡",
    title: "Mobility",
    max: 76,
    shots: "Timed — pick up 5 balls one by one",
    desc: "Measures athletic movement around the court. Five balls are placed in specific positions. Starting from the centre of the baseline you retrieve each ball and place it on your racquet strings counter-clockwise.",
    zones: ["Faster time = more points", "Best time (15 sec): 76 pts", "40 seconds: 1 pt"],
  },
];

const ITN_TABLE = [
  { itn: "ITN 1",  male: "363–430", female: "345–430" },
  { itn: "ITN 2",  male: "338–362", female: "304–344" },
  { itn: "ITN 3",  male: "294–337", female: "259–303" },
  { itn: "ITN 4",  male: "269–293", female: "231–258" },
  { itn: "ITN 5",  male: "245–268", female: "206–230" },
  { itn: "ITN 6",  male: "210–244", female: "172–205" },
  { itn: "ITN 7",  male: "176–209", female: "141–171" },
  { itn: "ITN 8",  male: "140–175", female: "109–140" },
  { itn: "ITN 9",  male: "105–139", female: "80–108"  },
  { itn: "ITN 10", male: "75–104",  female: "57–79"   },
];

export default function ITNGuidePage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "0.5rem 24px 80px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>

      {/* ── TITLE ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>📋</div>
        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 4,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          The On-Court Assessment
        </h1>
        <p style={{ fontSize: 14, color: "#377A00", fontWeight: 600, marginBottom: 0, letterSpacing: 1.5, textTransform: "uppercase" }}>
          ITN · 5 Sections · Maximum 430 Points
        </p>
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 32px rgba(55,122,0,0.08)", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)", padding: "2rem 2.5rem" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#a8d878", marginBottom: 10 }}>
              Overview
            </p>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: "0 0 8px", fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
              How the Assessment Works
            </h2>
          </div>
          <div style={{ padding: "2rem 2.5rem" }}>
            <p style={{ fontSize: 15, color: "#3a4a3a", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              The ITN On-Court Assessment was developed by the International Tennis Federation as an objective method of rating players. It is made up of <strong>5 sections</strong>, each testing a different aspect of your game. All shots are fed by an assessor — you focus purely on execution.
            </p>
            {/* Scoring principles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { icon: "🎯", label: "Accuracy", desc: "Points for where the ball lands in the court" },
                { icon: "💪", label: "Power", desc: "Bonus points when the 2nd bounce passes the bonus line" },
                { icon: "✅", label: "Consistency", desc: "+1 point for every shot that stays in the court" },
              ].map((p) => (
                <div key={p.label} style={{ background: "#f0f7ee", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#151716", margin: "0 0 4px" }}>{p.label}</p>
                  <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE SECTIONS ─────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#151716", marginBottom: "1.25rem", fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
          The 5 Test Sections
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SECTIONS.map((sec) => (
            <div key={sec.letter} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(55,122,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "1.25rem 1.5rem", borderBottom: "1px solid #EAF7EB" }}>
                <span style={{ fontSize: 28 }}>{sec.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#377A00", margin: "0 0 2px", letterSpacing: ".1em", textTransform: "uppercase" }}>Section {sec.letter}</p>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#151716", margin: 0 }}>{sec.title}</h3>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 11, color: "#94A3B8", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: ".08em" }}>Max score</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#377A00", margin: 0 }}>{sec.max}</p>
                </div>
              </div>
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#377A00", margin: "0 0 8px" }}>{sec.shots}</p>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 12px" }}>{sec.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {sec.zones.map((z) => (
                    <span key={z} style={{ fontSize: 12, color: "#334155", background: "#F1F5F9", padding: "4px 12px", borderRadius: 20, border: "1px solid #E2E8F0" }}>
                      {z}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ITN TABLE ─────────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2.5rem" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#151716", marginBottom: "1.25rem", fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
          What's Your ITN?
        </h2>
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#377A00" }}>
            {["ITN Level", "Men's Score", "Women's Score"].map((h) => (
              <div key={h} style={{ padding: "12px 16px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: 0, textTransform: "uppercase", letterSpacing: ".08em" }}>{h}</p>
              </div>
            ))}
          </div>
          {ITN_TABLE.map((row, i) => (
            <div key={row.itn} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: i === 0 ? "none" : "1px solid #F1F5F9", background: (row.itn === "ITN 4" || row.itn === "ITN 5") ? "#EAF7EB" : "transparent" }}>
              <div style={{ padding: "12px 16px" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#377A00", margin: 0 }}>{row.itn}</p>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <p style={{ fontSize: 14, color: "#334155", margin: 0 }}>{row.male}</p>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <p style={{ fontSize: 14, color: "#334155", margin: 0 }}>{row.female}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", marginTop: 12 }}>
          For the most accurate ITN, complete the assessment 3 times and average the scores.
        </p>
      </section>

      {/* ── CTAs ──────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/itn-assessment/calculator"
          style={{
            display: "inline-block", padding: "16px 40px", fontSize: 16, fontWeight: 600,
            color: "#fff", background: "linear-gradient(135deg, #377A00, #2f6a00)",
            borderRadius: 50, boxShadow: "0 4px 14px rgba(55,122,0,0.35)", textDecoration: "none",
          }}
        >
          Calculate My ITN →
        </Link>
        <Link
          href="/itn-assessment"
          style={{
            display: "inline-block", padding: "16px 40px", fontSize: 16, fontWeight: 600,
            color: "#377A00", background: "#fff", border: "2px solid #377A00",
            borderRadius: 50, textDecoration: "none",
          }}
        >
          ← Back to Introduction
        </Link>
      </div>
    </div>
  );
}
