import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Shop | CoachAndrew",
  description: "Coaching programmes, assessments and tools from CoachAndrew.",
};

const products = [
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
    emoji: "✨",
    tag: "Self-Discovery",
    title: "True Self Discovery Profile",
    subtitle: "TSDP · A Self-Mirror in 25 Questions",
    desc: "Explore who you are beyond roles, expectations, and external validation. 25 YES/NO questions across five dimensions of inner self-discovery.",
    details: ["25 YES/NO questions across 5 dimensions", "Section-by-section breakdown", "4-tier self-discovery activation result", "Optional 30-min consultation with Andrew"],
    href: "/true-self-discovery-profile",
    accent: "#377A00",
    accentBg: "#EAF7EB",
    price: "from £25",
  },
];

export default function ShopPage() {
  return (
    <div style={{ background: "#fff" }}>

      {/* Header */}
      <section style={{ background: "var(--green-pale)", padding: "4rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green)", marginBottom: ".5rem" }}>
            Programmes &amp; Products
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            fontWeight: 700, color: "var(--text)", marginBottom: ".75rem",
          }}>
            Shop
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "460px", margin: "0 auto" }}>
            Coaching programmes, assessments and tools to help you grow.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section style={{ padding: "3rem 0 5rem" }}>
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
