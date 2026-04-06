import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Measuring Elite Performance Consciousness | CoachAndrew",
  description:
    "Why standard assessments fail advanced athletes — and how the Self Mastery Profile (SMP) provides a more precise instrument for a more precise mind.",
};

/* ── SVG Radar Chart (static illustration) ──────────────────────────── */
function RadarIllustration() {
  const cx = 200;
  const cy = 200;
  const maxR = 140;
  const pillars = [
    "Inner Calm",
    "Presence",
    "Freedom",
    "Courage",
    "Responsibility",
    "Humility",
    "Inner Power",
  ];
  const sampleValues = [0.72, 0.85, 0.58, 0.76, 0.9, 0.64, 0.78];
  const n = pillars.length;

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const gridPoints = (r: number) =>
    Array.from({ length: n }, (_, i) => ({
      x: cx + r * Math.cos(angle(i)),
      y: cy + r * Math.sin(angle(i)),
    }));

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";

  const dataPoints = pillars.map((_, i) => ({
    x: cx + maxR * sampleValues[i] * Math.cos(angle(i)),
    y: cy + maxR * sampleValues[i] * Math.sin(angle(i)),
  }));

  const labelOffset = 22;
  const labelPoints = gridPoints(maxR + labelOffset);

  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: 420, height: "auto" }} aria-hidden>
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((frac) => (
        <path
          key={frac}
          d={toPath(gridPoints(maxR * frac))}
          fill="none"
          stroke="#d4e8d4"
          strokeWidth={frac === 1 ? 1.5 : 1}
        />
      ))}
      {/* Spokes */}
      {Array.from({ length: n }, (_, i) => {
        const tip = gridPoints(maxR)[i];
        return (
          <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#d4e8d4" strokeWidth={1} />
        );
      })}
      {/* Data area */}
      <path d={toPath(dataPoints)} fill="rgba(55,122,0,0.2)" stroke="#377A00" strokeWidth={2.5} strokeLinejoin="round" />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill="#377A00" />
      ))}
      {/* Labels */}
      {pillars.map((label, i) => {
        const lp = labelPoints[i];
        const textAnchor =
          lp.x < cx - 10 ? "end" : lp.x > cx + 10 ? "start" : "middle";
        return (
          <text
            key={label}
            x={lp.x}
            y={lp.y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fontSize={11}
            fontFamily="system-ui, sans-serif"
            fontWeight={600}
            fill="#2f6a00"
          >
            {label}
          </text>
        );
      })}
      {/* % labels on rings */}
      {[25, 50, 75, 100].map((pct) => (
        <text key={pct} x={cx + 3} y={cy - maxR * (pct / 100) + 4} fontSize={9} fill="#6b7280" fontFamily="system-ui">
          {pct}%
        </text>
      ))}
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function MeasuringElitePerformancePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(160deg, #1a3800 0%, #2f6a00 50%, #377A00 100%)",
          color: "#fff",
          padding: "6rem 0 5rem",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 700 }}>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: ".8125rem",
              fontWeight: 600,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#a8d878",
              marginBottom: "1.25rem",
            }}
          >
            Self Mastery Profile · SMP
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            The Elite Mind Is Not&nbsp;a&nbsp;Checklist.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,.82)",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 2.5rem",
            }}
          >
            Advanced athletes operate beyond simple &lsquo;agree or disagree.&rsquo; Your mental
            game is a complex, dynamic system. Why are the tools used to measure it so often shallow
            and imprecise?
          </p>
          <Link href="/self-mastery-profile" className="btn" style={{ background: "#fff", color: "#377A00", borderColor: "#fff" }}>
            Take the SMP Assessment
          </Link>
        </div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, marginBottom: "1.5rem" }} />
          <h2
            style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#151716",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            The Limits of &ldquo;Strongly Agree.&rdquo;
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#3a4a3a",
              lineHeight: 1.8,
              maxWidth: 720,
              marginBottom: "3rem",
            }}
          >
            For the high-consciousness performer, traditional scales are too shallow. The critical
            question isn&rsquo;t <em>if</em> a quality exists, but <em>to what degree</em> it is
            embodied under pressure. The real challenge is measuring{" "}
            <strong>consistency</strong>, not just agreement.
          </p>

          {/* Scale comparison */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Conventional */}
            <div style={{ background: "#F8FAF8", border: "1px solid #e5e7eb", borderRadius: 16, padding: "1.75rem" }}>
              <p style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "1rem" }}>
                Conventional Scale
              </p>
              <div style={{ display: "flex", gap: 6, marginBottom: "0.75rem" }}>
                {["Strongly\nDisagree", "Disagree", "Neutral", "Agree", "Strongly\nAgree"].map((label) => (
                  <div
                    key={label}
                    style={{
                      flex: 1,
                      background: "#e5e7eb",
                      borderRadius: 6,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".875rem", color: "#6b7280", lineHeight: 1.6 }}>
                5 blunt categories. No nuance. No pressure-testing.
              </p>
            </div>

            {/* Mastery Spectrum */}
            <div style={{ background: "#EAF7EB", border: "1px solid #d4e8d4", borderRadius: 16, padding: "1.75rem" }}>
              <p style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#377A00", marginBottom: "1rem" }}>
                Mastery Spectrum (SMP)
              </p>
              <div
                style={{
                  position: "relative",
                  height: 40,
                  background: "linear-gradient(to right, #e5e7eb, #9ca3af, #6b7280, #3b82f6, #1d4ed8)",
                  borderRadius: 20,
                  marginBottom: "0.75rem",
                  overflow: "visible",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "16%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 20,
                    height: 20,
                    background: "#1d4ed8",
                    borderRadius: "50%",
                    border: "3px solid #fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                  }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".875rem", color: "#2f6a00", lineHeight: 1.6 }}>
                0–100% continuous scale. Honest. Precise. Actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SMP INTRO ─────────────────────────────────────────────────── */}
      <section style={{ background: "#e2ecdf", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 820, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(4rem, 14vw, 9rem)",
              fontWeight: 900,
              color: "#377A00",
              lineHeight: 1,
              letterSpacing: "-.02em",
              marginBottom: "1.5rem",
            }}
          >
            SMP
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "#151716",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            A More Precise Instrument for a More Precise Mind.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#3a4a3a",
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Introducing the <strong>Self Mastery Profile (SMP)</strong> — a percentage-based
            diagnostic tool designed specifically for advanced athletes. The SMP replaces blunt
            categories with a 0–100% scale, allowing for an honest, nuanced, and actionable
            assessment of your inner world. It&rsquo;s a tool that respects the complexity of your
            journey.
          </p>
        </div>
      </section>

      {/* ── WHY PERCENTAGE ────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "#151716",
                lineHeight: 1.2,
              }}
            >
              Why a Percentage Scale Unlocks Deeper Insight.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                label: "More Precise",
                body: "It captures the true spectrum of your development — not just whether a quality exists, but how fully it is embodied.",
                icon: "◎",
              },
              {
                label: "More Honest",
                body: "It encourages radical self-honesty, moving beyond simple labels that can mask uncomfortable truths.",
                icon: "◈",
              },
              {
                label: "More Concrete",
                body: "It clearly shows the 'holes' in your profile — the specific areas where hidden work needs to happen.",
                icon: "◐",
              },
              {
                label: "More Actionable",
                body: "It makes interpretation for coaching direct and effective, pointing immediately to what to work on next.",
                icon: "↗",
              },
              {
                label: "More Aligned",
                body: "It reflects the philosophies of non-attachment, self-honesty, and inner awareness that define true mastery.",
                icon: "❋",
              },
            ].map(({ label, body, icon }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  background: "#F8FAF8",
                  border: "1px solid #d4e8d4",
                  borderRadius: 14,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    background: "#EAF7EB",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    color: "#377A00",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#1e2e1e",
                      margin: "0 0 .35rem",
                    }}
                  >
                    {label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: ".9375rem",
                      color: "#4a5a4a",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 PILLARS ─────────────────────────────────────────────────── */}
      <section style={{ background: "#e2ecdf", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "#151716",
                marginBottom: ".75rem",
                lineHeight: 1.2,
              }}
            >
              The 7 Pillars of Self Mastery.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "1rem",
                color: "#4a5a4a",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              The SMP is built on a comprehensive framework of seven interconnected areas that define
              the inner game of an elite performer.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { title: "Inner Calm & Equanimity", desc: "Emotional stability and composure under pressure, regardless of circumstances." },
              { title: "Presence & Awareness", desc: "The ability to stay fully present, point by point, moment by moment." },
              { title: "Freedom & Non-Attachment", desc: "Performance free from fear of outcome, judgment, or external validation." },
              { title: "Courage & Authentic Expression", desc: "Willingness to play boldly and express your true game without hesitation." },
              { title: "Responsibility & Inner Ownership", desc: "Taking full ownership of your results, reactions, and development." },
              { title: "Humility & Growth Mindset", desc: "Openness to learning, feedback, and the ongoing process of refinement." },
              { title: "Inner Power & Alignment", desc: "Acting from a deep, stable sense of inner authority and personal values." },
            ].map(({ title, desc }, i) => (
              <div
                key={title}
                style={{
                  background: "#fff",
                  border: "1px solid #d4e8d4",
                  borderRadius: 14,
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#377A00",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: ".875rem",
                    fontFamily: "var(--font-heading), serif",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#1e2e1e",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: ".875rem",
                    color: "#4a5a4a",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MASTERY SPECTRUM ──────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "#151716",
                marginBottom: ".75rem",
              }}
            >
              The Spectrum of Mastery.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "1rem",
                color: "#4a5a4a",
                lineHeight: 1.7,
              }}
            >
              For each quality, select the percentage that honestly reflects its strength within you <em>right now</em>.
            </p>
          </div>

          {/* Gradient bar */}
          <div
            style={{
              height: 28,
              borderRadius: 14,
              background: "linear-gradient(to right, #e5e7eb 0%, #d1d5db 20%, #9ca3af 50%, #3b82f6 70%, #1d4ed8 100%)",
              marginBottom: "1rem",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["0%", "20%", "50%", "70%", "85%", "100%"].map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".75rem", color: "#6b7280", fontWeight: 600 }}>
                {t}
              </span>
            ))}
          </div>

          {/* Bands */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              marginTop: "2.5rem",
            }}
          >
            {[
              { range: "0–20%", label: "Low / Undeveloped", color: "#e5e7eb", text: "#374151" },
              { range: "21–50%", label: "Emerging", color: "#d1d5db", text: "#374151" },
              { range: "51–70%", label: "Solid Foundation", color: "#9ca3af", text: "#fff" },
              { range: "71–85%", label: "Advanced, Consistent", color: "#3b82f6", text: "#fff" },
              { range: "86–100%", label: "Mastery Level", color: "#1d4ed8", text: "#fff" },
            ].map(({ range, label, color, text }) => (
              <div
                key={range}
                style={{
                  background: color,
                  borderRadius: 12,
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: text,
                    marginBottom: ".25rem",
                  }}
                >
                  {range}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: ".8125rem",
                    color: text,
                    opacity: 0.9,
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section style={{ background: "#EAF7EB", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "#151716",
                marginBottom: ".75rem",
              }}
            >
              From Raw Data to Actionable Insight.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "1rem",
                color: "#4a5a4a",
                lineHeight: 1.7,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              After completing all 35 questions, the next step is to synthesise your results.
              Calculate the average percentage for each of the seven sections. This transforms your
              individual answers into seven core <strong>Mastery Indicators</strong>.
            </p>
          </div>

          {/* Flow diagram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #d4e8d4",
                borderRadius: 12,
                padding: "1.25rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-heading), serif", fontSize: "2rem", fontWeight: 700, color: "#377A00" }}>35</div>
              <div style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".8rem", color: "#4a5a4a", textTransform: "uppercase", letterSpacing: ".08em" }}>Questions</div>
            </div>
            <div style={{ fontSize: "1.5rem", color: "#377A00" }}>→</div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #d4e8d4",
                borderRadius: 12,
                padding: "1.25rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-heading), serif", fontSize: "2rem", fontWeight: 700, color: "#377A00" }}>7</div>
              <div style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".8rem", color: "#4a5a4a", textTransform: "uppercase", letterSpacing: ".08em" }}>Sections</div>
            </div>
            <div style={{ fontSize: "1.5rem", color: "#377A00" }}>→</div>
            <div
              style={{
                background: "#377A00",
                borderRadius: 12,
                padding: "1.25rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-heading), serif", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>7</div>
              <div style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".8rem", color: "rgba(255,255,255,.85)", textTransform: "uppercase", letterSpacing: ".08em" }}>Mastery Indicators</div>
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: ".9375rem",
              color: "#4a5a4a",
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            5 questions per section · average the scores · plot your profile
          </p>
        </div>
      </section>

      {/* ── RADAR CHART ───────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, marginBottom: "1.5rem" }} />
              <h2
                style={{
                  fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                  fontSize: "clamp(1.75rem, 4vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#151716",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                Visualising Your Unique Self Mastery Profile.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "1rem",
                  color: "#4a5a4a",
                  lineHeight: 1.8,
                }}
              >
                Plotting your seven Mastery Indicators on a chart provides an immediate, holistic
                view of your current mental and emotional landscape. It clearly highlights areas of
                strength and opportunities for focused growth.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: ".9375rem",
                  color: "#377A00",
                  lineHeight: 1.7,
                  marginTop: "1rem",
                  fontStyle: "italic",
                }}
              >
                No two profiles are identical — your map is uniquely yours.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHETYPES ────────────────────────────────────────────────── */}
      <section style={{ background: "#e2ecdf", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "#151716",
                marginBottom: ".75rem",
              }}
            >
              The Five Archetypes of Performance Consciousness.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "1rem",
                color: "#4a5a4a",
                lineHeight: 1.7,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Your overall average score across all 35 questions corresponds to one of five Master
              Archetypes — answering the question: &ldquo;What is the core driver of my performance
              right now?&rdquo;
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
            {[
              {
                range: "86–100%",
                name: "True Mastery",
                desc: "Identity-free, pressure-free, pure expression.",
                bg: "#1d4ed8",
                text: "#fff",
              },
              {
                range: "71–85%",
                name: "High-Level Performer",
                desc: "Stable, conscious, ready for breakthrough.",
                bg: "#3b82f6",
                text: "#fff",
              },
              {
                range: "51–70%",
                name: "Solid Competitive Mind",
                desc: "Growing, consistent, needs refinement.",
                bg: "#9ca3af",
                text: "#fff",
              },
              {
                range: "21–50%",
                name: "Developing Awareness",
                desc: "Potential present, dependency still strong.",
                bg: "#d1d5db",
                text: "#374151",
              },
              {
                range: "0–20%",
                name: "Ego-Based Performer",
                desc: "Outcome-driven, reactive, emotionally unstable.",
                bg: "#e5e7eb",
                text: "#374151",
              },
            ].map(({ range, name, desc, bg, text }) => (
              <div
                key={name}
                style={{
                  background: bg,
                  borderRadius: 14,
                  padding: "1.25rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: text,
                    opacity: 0.8,
                    minWidth: 90,
                    flexShrink: 0,
                  }}
                >
                  {range}
                </div>
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: text,
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: ".9375rem",
                      color: text,
                      opacity: 0.85,
                      marginLeft: "1rem",
                    }}
                  >
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ───────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
          <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
          <h2
            style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: "#151716",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            Your Profile Is Not a Label. It Is a Map.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#3a4a3a",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            The Self Mastery Profile is not designed to define who you are. It is a precise, dynamic
            map of your inner world, showing you exactly where you are and illuminating the path
            forward. It is a tool for the continuous, lifelong journey of growth.
          </p>
          <Link href="/self-mastery-profile" className="btn btn-green" style={{ fontSize: "1rem", padding: "1em 2.5em" }}>
            Take the SMP Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
