import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

const styles = {
  h2: {
    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
    fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
    fontWeight: 700, lineHeight: 1.25, color: "#2f6a00",
    marginBottom: "1rem", marginTop: 0, textAlign: "center",
  } as React.CSSProperties,
  lead: { fontSize: "1.125rem", lineHeight: 1.8, color: "#2a3a2a", marginBottom: "1.25rem" } as React.CSSProperties,
  body: { fontSize: ".9375rem", lineHeight: 1.85, color: "#3a4a3a", marginBottom: "1.1rem" } as React.CSSProperties,
  rule: { border: "none", borderTop: "1.5px solid #377A00", margin: "3rem 0" } as React.CSSProperties,
  pullQuote: {
    margin: "2rem 0", padding: "1.25rem 1.75rem",
    background: "#EAF7EB", borderLeft: "4px solid #377A00", borderRadius: "0 12px 12px 0",
    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
    fontSize: "clamp(.875rem, 2vw, 1rem)", fontStyle: "normal", color: "#2f6a00", lineHeight: 1.65,
  } as React.CSSProperties,
  label: {
    fontFamily: "var(--font-body), system-ui", fontSize: ".7rem", fontWeight: 700,
    letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#9ca3af", margin: 0,
  } as React.CSSProperties,
  caption: { fontFamily: "var(--font-body), system-ui", fontSize: ".8125rem", lineHeight: 1.5, margin: 0 } as React.CSSProperties,
};

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
        <p style={{
          fontSize: 13, color: "#377A00", fontWeight: 700,
          letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 6,
        }}>
          Performance
        </p>
        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 4,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          Elite Tennis Profile
        </h1>
      </div>

      {/* ── ARTICLE CONTENT ─────────────────────────────────────────── */}
      <section style={{ width: "100%", maxWidth: 760, marginBottom: "2rem", marginTop: "0" }}>
      <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 32px rgba(55,122,0,0.08)", padding: "2.5rem 2.5rem" }}>
      <article style={{
        fontFamily: "var(--font-body), 'Open Sans', system-ui, sans-serif",
        color: "#2a3a2a", lineHeight: 1.8,
      }}>
        <h2 style={styles.h2}>The Elite Mind Is Not a Checklist.</h2>
        <p style={styles.body}>
          Advanced athletes operate beyond simple &lsquo;agree or disagree.&rsquo; Your mental game
          is a complex, dynamic system. Why are the tools used to measure it so often shallow and
          imprecise? Standard assessments fail to capture the subtle gradations of mastery.
        </p>

        <hr style={styles.rule} />

        <h2 style={styles.h2}>The Limits of &ldquo;Strongly Agree.&rdquo;</h2>
        <p style={styles.body}>
          For the high-consciousness performer, traditional scales are too shallow. The critical
          question isn&rsquo;t <em>if</em> a quality exists, but <em>to what degree</em> it is
          embodied under pressure. The real challenge is measuring <strong>consistency</strong>,
          not just agreement.
        </p>
        <p style={styles.body}>
          A five-point Likert scale forces nuanced, hard-won qualities into blunt categories. It
          cannot distinguish between an athlete who <em>occasionally</em> finds composure and one
          who embodies it <em>under the highest pressure</em> — and that distinction is everything.
        </p>

        <div style={{ background: "#F8FAF8", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem", margin: "1.75rem 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <p style={styles.label}>Conventional Scale</p>
              <div style={{ display: "flex", gap: 6, margin: ".6rem 0" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} style={{ flex: 1, background: "#e5e7eb", borderRadius: 6, height: 32 }} />
                ))}
              </div>
              <p style={{ ...styles.caption, color: "#9ca3af" }}>5 blunt categories. No nuance. No pressure-testing.</p>
            </div>
            <div style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: "1.5rem" }}>
              <p style={{ ...styles.label, color: "#377A00" }}>Mastery Spectrum (ETP)</p>
              <div style={{ position: "relative", height: 32, background: "linear-gradient(to right, #e5e7eb, #9ca3af, #6b7280, #3b82f6, #1d4ed8)", borderRadius: 16, margin: ".6rem 0" }}>
                <div style={{ position: "absolute", right: "16%", top: "50%", transform: "translateY(-50%)", width: 18, height: 18, background: "#1d4ed8", borderRadius: "50%", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,.25)" }} />
              </div>
              <p style={{ ...styles.caption, color: "#2f6a00" }}>0–100% continuous scale. Honest. Precise. Actionable.</p>
            </div>
          </div>
        </div>

        <hr style={styles.rule} />

        <h2 style={styles.h2}>A More Precise Instrument for a More Precise Mind.</h2>
        <p style={styles.body}>
          The <strong>Elite Tennis Profile (ETP)</strong> is a percentage-based diagnostic tool
          designed specifically for advanced athletes. It replaces blunt categories with a 0–100%
          scale, allowing for an honest, nuanced, and actionable assessment of your inner world.
          It is a tool that respects the complexity of your journey.
        </p>
        <p style={{ ...styles.body, marginBottom: 0 }}>For example:</p>
        <blockquote style={{ ...styles.pullQuote, marginTop: ".35rem" }}>
          The question is not whether you have composure. The question is: at what percentage do
          you embody it when the match is on the line?
        </blockquote>
        <p style={styles.body}>Why does this matter? Because a percentage scale is:</p>

        <dl style={{ margin: "1.5rem 0 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            ["More Precise", "It captures the true spectrum of your development — not just whether a quality exists, but how fully it is embodied."],
            ["More Honest", "It encourages radical self-honesty, moving beyond simple labels that can mask uncomfortable truths."],
            ["More Concrete", "It clearly shows the 'holes' in your profile — the specific areas where hidden work needs to happen."],
            ["More Actionable", "It makes interpretation for coaching direct and effective, pointing immediately to what to work on next."],
            ["More Aligned", "It reflects the philosophies of non-attachment, self-honesty, and inner awareness that define true mastery."],
          ].map(([term, def]) => (
            <div key={term as string} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
              <dt style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontWeight: 700, color: "#377A00", fontSize: "1rem", flexShrink: 0, minWidth: 140 }}>{term}</dt>
              <dd style={{ margin: 0, fontSize: ".9375rem", color: "#3a4a3a", lineHeight: 1.7 }}>{def}</dd>
            </div>
          ))}
        </dl>

        <hr style={styles.rule} />

        <blockquote style={{ ...styles.pullQuote, paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
          <strong style={{ display: "block", fontStyle: "normal", marginBottom: ".75rem", fontSize: "1.35em" }}>
            Your Profile Is Not a Label. It Is a Map.
          </strong>
          The ETP is not designed to define you. It is a precise, dynamic map of your inner world,
          showing you exactly WHERE you are and illuminating the path forward. It is a tool for the
          continuous, lifelong journey of growth.
          <br /><br />
          Every percentage is an invitation. Not a verdict.
        </blockquote>
      </article>
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
        </div>
      </div>
    </div>
  );
}
