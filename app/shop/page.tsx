import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Shop | CoachAndrew",
  description: "Coaching programmes, assessments and tools from CoachAndrew.",
};

const products = [
  {
    emoji: "✨",
    tag: "Self-Discovery",
    title: "The Unique Self Assessment",
    subtitle: "TSDP · A Self-Mirror in 25 Questions",
    desc: "Explore who you are beyond roles, expectations, and external validation. 25 YES/NO questions across five dimensions of inner self-discovery.",
    details: ["25 YES/NO questions across 5 dimensions", "Section-by-section breakdown", "4-tier self-discovery activation result", "Optional 30-min consultation with Andrew"],
    href: "/true-self-discovery-profile",
    accent: "#377A00",
    accentBg: "#EAF7EB",
    price: "from £25",
  },
  {
    emoji: "🌿",
    tag: "Performance",
    title: "High Performance Profile",
    subtitle: "HPP · Advanced Athlete Diagnostic",
    desc: "Discover your mental performance profile across 7 core dimensions. Rate yourself honestly on 35 qualities to reveal your strengths, growth areas, and unique competitor archetype.",
    details: ["35 questions across 7 dimensions", "Radar chart & competitor archetype", "Personalised feedback per dimension", "Optional 30-min consultation with Andrew"],
    href: "/self-mastery-profile",
    accent: "#2D5A8E",
    accentBg: "#EEF4FF",
    price: "from £25",
  },
  {
    emoji: "🎾",
    tag: "Tennis Assessment",
    title: "ITN Assessment",
    subtitle: "International Tennis Number · Psychological Growth Tool",
    desc: "The ITN On-Court Assessment rates your game across 5 sections. Used correctly it becomes a psychological framework — shifting players from a result mindset to a growth mindset.",
    details: ["5-section on-court assessment", "Groundstrokes, volleys, serve & mobility", "Interactive score calculator", "Growth mindset framework by CoachAndrew"],
    href: "/itn-assessment",
    accent: "#377A00",
    accentBg: "#EAF7EB",
    price: "Free resource",
  },
];

export default function ShopPage() {
  return (
    <div style={{ background: "#fff" }}>

      {/* Foundation & Philosophy */}
      <section style={{ padding: "3rem 0 0" }}>
        <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 32px rgba(55,122,0,0.08)", overflow: "hidden", marginBottom: 40 }}>
            <div style={{ background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)", padding: "2.5rem 2.5rem 2rem" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#a8d878", marginBottom: 10 }}>
                Foundation &amp; Philosophy
              </p>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: 0, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
                The Work Behind These Tools
              </h2>
            </div>
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
              <blockquote style={{ margin: "0 0 1.5rem", padding: "1.25rem 1.5rem", background: "#EAF7EB", borderLeft: "4px solid #377A00", borderRadius: "0 12px 12px 0" }}>
                <p style={{ fontSize: 17, fontStyle: "italic", color: "#1e3a1e", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
                  &quot;Real change happens when awareness, responsibility, and attention come together in action.&quot;
                </p>
              </blockquote>
              <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, margin: 0 }}>
                Through years of coaching, competition, and deeper spiritual exploration, this approach has been refined
                into <strong>practical tools</strong> — designed not only to understand performance, but to{" "}
                <strong>transform how you operate under pressure</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product cards */}
      <section style={{ padding: "0 0 5rem" }}>
        <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
            {products.map((p) => (
              <div key={p.href} style={{
                background: "#fff", borderRadius: 24,
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                border: `2px solid ${p.accentBg}`,
                display: "flex", flexDirection: "column",
                overflow: "hidden",
              }}>
                {/* Card header band */}
                <div style={{ background: p.accentBg, padding: "1.5rem 1.75rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>{p.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: p.accent }}>
                      {p.tag}
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: 22, fontWeight: 700, color: "#151716", margin: "0 0 4px",
                    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                  }}>
                    {p.title}
                  </h2>
                  <p style={{ fontSize: 12, fontWeight: 600, color: p.accent, margin: 0, letterSpacing: ".08em" }}>
                    {p.subtitle}
                  </p>
                </div>

                {/* Body */}
                <div style={{ padding: "1.5rem 1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {p.details.map((d) => (
                      <li key={d} style={{ fontSize: 13, color: "#3a4a3a", display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: p.accent, fontWeight: 700, flexShrink: 0 }}>✓</span> {d}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: p.accent }}>{p.price}</span>
                    <Link
                      href={p.href}
                      style={{
                        padding: "12px 28px", fontSize: 14, fontWeight: 600,
                        color: "#fff", background: p.accent,
                        borderRadius: 50, textDecoration: "none",
                        boxShadow: `0 4px 12px ${p.accent}44`,
                      }}
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
