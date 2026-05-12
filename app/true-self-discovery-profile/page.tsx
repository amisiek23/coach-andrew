import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "True Self Discovery Profile | CoachAndrew",
  description: "A self-mirror in 25 questions. Discover who you are beyond roles, expectations, and external validation.",
};

export default function TSDPIntroPage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "0.5rem 24px 80px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>

      {/* ── TITLE ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>✨</div>
        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 4,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          True Self Discovery Profile
        </h1>
        <p style={{
          fontSize: 14, color: "#377A00", fontWeight: 600,
          marginBottom: 0, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          TSDP · A Self-Mirror in 25 Questions
        </p>
      </div>

      {/* ── PHILOSOPHY ────────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <div style={{
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 4px 32px rgba(55,122,0,0.08)",
          overflow: "hidden",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)",
            padding: "2.5rem 2.5rem 2rem",
          }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "#a8d878", marginBottom: 10,
            }}>
              Before You Begin
            </p>
            <h2 style={{
              fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: 0,
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            }}>
              This Questionnaire is a Mirror
            </h2>
          </div>

          <div style={{ padding: "2.5rem" }}>
            <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              This is not diagnostic in the traditional sense. It is designed to{" "}
              <strong>feel personal, feel safe, and feel revealing</strong> — without judgment.
              Each question invites you to look inward, beyond your roles, your achievements,
              and the expectations placed on you.
            </p>

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
                "There is something unique in me… but I don't fully see it, and maybe no one else does either."
              </p>
            </blockquote>

            <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              The 25 questions are grouped across <strong>five inner dimensions</strong> — from your
              sense of uniqueness and authentic expression, to your inner voice, courage, and depth of meaning.
            </p>

            <div style={{
              background: "#f0f7ee", border: "1.5px solid #c8e0c4",
              borderRadius: 16, padding: "1.25rem 1.5rem",
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#377A00", marginBottom: 10, margin: "0 0 10px" }}>
                A few things that help
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Find a quiet 15 minutes. Don't do this between meetings.",
                  "Answer with the first feeling that comes — don't overthink.",
                  "If a question feels uncomfortable, that is information.",
                  "There are no right or wrong answers. This is about who you already are.",
                ].map((tip) => (
                  <li key={tip} style={{ fontSize: 14, color: "#3a4a3a", display: "flex", gap: 8, lineHeight: 1.6 }}>
                    <span style={{ color: "#377A00", fontWeight: 700, flexShrink: 0 }}>·</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE DIMENSIONS ───────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem" }}>
        <h2 style={{
          textAlign: "center", fontSize: 20, fontWeight: 700,
          color: "#151716", marginBottom: "1.25rem",
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          The Five Dimensions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { emoji: "🌱", label: "A", title: "Inner Sense of Uniqueness", desc: "Do you feel there is something distinctly yours — even if you can't name it?" },
            { emoji: "🔍", label: "B", title: "Authentic vs Adapted Self", desc: "How much of who you show the world is truly you?" },
            { emoji: "🔥", label: "C", title: "Expression & Courage", desc: "Are you expressing as much of yourself as you could?" },
            { emoji: "🧭", label: "D", title: "Inner Voice & Direction", desc: "Do you hear — and follow — your own inner compass?" },
            { emoji: "✨", label: "E", title: "Depth & Meaning", desc: "Are you drawn to the deeper questions of who you are?" },
          ].map((d) => (
            <div key={d.label} style={{
              background: "#fff", borderRadius: 16, padding: "1.25rem",
              boxShadow: "0 2px 12px rgba(55,122,0,0.06)", border: "1px solid #e2ecdf",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{d.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#377A00" }}>
                  Section {d.label}
                </span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#151716", margin: "0 0 6px" }}>{d.title}</p>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", maxWidth: 760 }}>
        <div style={{
          background: "#f0f7ee", border: "1.5px solid #c8e0c4",
          borderRadius: 16, padding: "1.5rem 2rem", marginBottom: 28,
        }}>
          <p style={{ fontSize: 17, color: "#2d3d2d", lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
            Answer <strong style={{ color: "#377A00" }}>25 YES / NO questions</strong> across five dimensions of self-discovery.
            Takes approximately <strong style={{ color: "#377A00" }}>10–15 minutes</strong>.
          </p>
        </div>

        <Link
          href="/true-self-discovery-profile/checkout"
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
      </div>
    </div>
  );
}
