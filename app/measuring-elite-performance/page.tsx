import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Measuring Elite Performance Consciousness | CoachAndrew",
  description:
    "Why standard assessments fail advanced athletes — and how the Self Mastery Profile (SMP) provides a more precise instrument for a more precise mind.",
};

/* ── SVG Radar Chart ─────────────────────────────────────────────────── */
function RadarIllustration() {
  const cx = 200, cy = 200, maxR = 140;
  const pillars = ["Inner Calm", "Presence", "Freedom", "Courage", "Responsibility", "Humility", "Inner Power"];
  const sampleValues = [0.72, 0.85, 0.58, 0.76, 0.9, 0.64, 0.78];
  const n = pillars.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const gridPoints = (r: number) =>
    Array.from({ length: n }, (_, i) => ({ x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) }));
  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";
  const dataPoints = pillars.map((_, i) => ({
    x: cx + maxR * sampleValues[i] * Math.cos(angle(i)),
    y: cy + maxR * sampleValues[i] * Math.sin(angle(i)),
  }));
  const labelPoints = gridPoints(maxR + 22);
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: 400, height: "auto" }} aria-hidden>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <path key={f} d={toPath(gridPoints(maxR * f))} fill="none" stroke="#d4e8d4" strokeWidth={f === 1 ? 1.5 : 1} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const tip = gridPoints(maxR)[i];
        return <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#d4e8d4" strokeWidth={1} />;
      })}
      <path d={toPath(dataPoints)} fill="rgba(55,122,0,0.18)" stroke="#377A00" strokeWidth={2.5} strokeLinejoin="round" />
      {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={5} fill="#377A00" />)}
      {pillars.map((label, i) => {
        const lp = labelPoints[i];
        const anchor = lp.x < cx - 10 ? "end" : lp.x > cx + 10 ? "start" : "middle";
        return (
          <text key={label} x={lp.x} y={lp.y} textAnchor={anchor} dominantBaseline="middle"
            fontSize={11} fontFamily="system-ui, sans-serif" fontWeight={600} fill="#2f6a00">
            {label}
          </text>
        );
      })}
      {[25, 50, 75, 100].map((pct) => (
        <text key={pct} x={cx + 3} y={cy - maxR * (pct / 100) + 4} fontSize={9} fill="#9ca3af" fontFamily="system-ui">{pct}%</text>
      ))}
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function MeasuringElitePerformancePage() {
  return (
    <>
      {/* ── HEADER BAND ───────────────────────────────────────────────── */}
      {/* <section style={{
        background: "var(--green-pale)",
        padding: "2rem 0",
        textAlign: "center",
      }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h1 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.25rem, 3vw, 2rem)",
            fontWeight: 700,
            letterSpacing: ".04em",
            color: "#151716",
            margin: 0,
          }}>
            Self Mastery Profile - SMP
          </h1>
        </div>
      </section> */}

      {/* ── DOCUMENT BODY ─────────────────────────────────────────────── */}
      <div style={{ background: "#fff" }}>
        <article style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "4rem clamp(1.25rem, 5vw, 3rem) 6rem",
          fontFamily: "var(--font-body), 'Open Sans', system-ui, sans-serif",
          color: "#2a3a2a",
          lineHeight: 1.8,
        }}>

          {/* ── 1. Opening ─────────────────────────────────────────────── */}
          <h2 style={styles.h2}>The Elite Mind Is Not a Checklist.</h2>
          <p style={styles.lead}>
            Advanced athletes operate beyond simple &lsquo;agree or disagree.&rsquo; Your mental game
            is a complex, dynamic system. Why are the tools used to measure it so often shallow and
            imprecise? Standard assessments fail to capture the subtle gradations of mastery.
          </p>

          <hr style={styles.rule} />

          {/* ── 2. The Problem ─────────────────────────────────────────── */}
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

          {/* Scale comparison — single box */}
          <div style={{ ...styles.compareBox, margin: "1.75rem 0", background: "#F8FAF8", borderColor: "#e5e7eb" }}>
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
                <p style={{ ...styles.label, color: "#377A00" }}>Mastery Spectrum (SMP)</p>
                <div style={{
                  position: "relative", height: 32,
                  background: "linear-gradient(to right, #e5e7eb, #9ca3af, #6b7280, #3b82f6, #1d4ed8)",
                  borderRadius: 16, margin: ".6rem 0",
                }}>
                  <div style={{
                    position: "absolute", right: "16%", top: "50%", transform: "translateY(-50%)",
                    width: 18, height: 18, background: "#1d4ed8", borderRadius: "50%",
                    border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                  }} />
                </div>
                <p style={{ ...styles.caption, color: "#2f6a00" }}>0–100% continuous scale. Honest. Precise. Actionable.</p>
              </div>
            </div>
          </div>

          <hr style={styles.rule} />

          {/* ── 3. What is the SMP ─────────────────────────────────────── */}
          <h2 style={styles.h2}>A More Precise Instrument for a More Precise Mind.</h2>
          <p style={styles.body}>
            The <strong>Self Mastery Profile (SMP)</strong> is a percentage-based
            diagnostic tool designed specifically for advanced athletes. The SMP replaces blunt
            categories with a 0–100% scale, allowing for an honest, nuanced, and actionable
            assessment of your inner world. It is a tool that respects the complexity of your journey.
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
                <dt style={{
                  fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                  fontWeight: 700, color: "#377A00", fontSize: "1rem", flexShrink: 0, minWidth: 140,
                }}>{term}</dt>
                <dd style={{ margin: 0, fontSize: ".9375rem", color: "#3a4a3a", lineHeight: 1.7 }}>{def}</dd>
              </div>
            ))}
          </dl>

          <hr style={styles.rule} />

         

          {/* ── 9. Closing ─────────────────────────────────────────────── */}
          <blockquote style={{ ...styles.pullQuote, paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
            <strong style={{ display: "block", fontStyle: "normal", marginBottom: ".75rem", fontSize: "1.35em" }}>
              Your Profile Is Not a Label. It Is a Map.
            </strong>
            The SMP is not designed to define you. It is a precise, dynamic
            map of your inner world, showing you exactly WHERE you are and illuminating the path
            forward. It is a tool for the continuous, lifelong journey of growth.
            <br /><br />
            Every percentage is an invitation. Not a verdict.
          </blockquote>

        </article>

        <div style={{ textAlign: "center", paddingBottom: "3rem", marginTop: "-5rem" }}>
          <Link href="/self-mastery-profile?checkout=1" className="btn btn-green" style={{ fontSize: "1rem", padding: "1em 2.5em" }}>
            Take the Assessment →
          </Link>
        </div>
      </div>
    </>
  );
}

/* ── Shared text styles ──────────────────────────────────────────────── */
const styles = {
  h1: {
    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    color: "#2f6a00",
    marginBottom: "1.25rem",
    textAlign: "center",
  } as React.CSSProperties,
  h2: {
    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
    fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
    fontWeight: 700,
    lineHeight: 1.25,
    color: "#2f6a00",
    marginBottom: "1rem",
    marginTop: 0,
    textAlign: "center",
  } as React.CSSProperties,
  lead: {
    fontSize: "1.125rem",
    lineHeight: 1.8,
    color: "#2a3a2a",
    marginBottom: "1.25rem",
  } as React.CSSProperties,
  body: {
    fontSize: ".9375rem",
    lineHeight: 1.85,
    color: "#3a4a3a",
    marginBottom: "1.1rem",
  } as React.CSSProperties,
  rule: {
    border: "none",
    borderTop: "1.5px solid #377A00",
    margin: "3rem 0",
  } as React.CSSProperties,
  pullQuote: {
    margin: "2rem 0",
    padding: "1.25rem 1.75rem",
    background: "#EAF7EB",
    borderLeft: "4px solid #377A00",
    borderRadius: "0 12px 12px 0",
    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
    fontSize: "clamp(.875rem, 2vw, 1rem)",
    fontStyle: "normal",
    color: "#2f6a00",
    lineHeight: 1.65,
  } as React.CSSProperties,
  label: {
    fontFamily: "var(--font-body), system-ui",
    fontSize: ".7rem",
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase" as const,
    color: "#9ca3af",
    margin: 0,
  } as React.CSSProperties,
  caption: {
    fontFamily: "var(--font-body), system-ui",
    fontSize: ".8125rem",
    lineHeight: 1.5,
    margin: 0,
  } as React.CSSProperties,
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.25rem",
    margin: "1.75rem 0",
  } as React.CSSProperties,
  compareBox: {
    background: "#F8FAF8",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "1.25rem",
  } as React.CSSProperties,
};
