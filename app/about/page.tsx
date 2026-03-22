import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "About Me",
  description: "Andrzej Misiek — performance coach, educator, and lifelong student of human potential.",
};

const PHOTO = "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2025/11/IMG_3273-1-717x1024.jpg";

const MEDALS = [
  { medal: "🥇", count: 5, label: "Gold" },
  { medal: "🥈", count: 3, label: "Silver" },
  { medal: "🥉", count: 5, label: "Bronze" },
];

const MILESTONES = [
  {
    title: "High-Performance Coaching",
    body:  "Developed national-level players, including guiding Karolina Filipiak from U16 #20 to Junior National Champion — with a win over future world No. 2 Agnieszka Radwańska. Led 5 players to ATP and 3 to WTA professional careers.",
  },
  {
    title: "Leadership in Action",
    body:  "Head Coach and Training Coordinator at AZS Poznań, awarded the Polish Tennis Federation's Silver Badge of Merit for his contributions to national sport. He founded and ran his own tennis school in Poland for nearly a decade before taking his methods international — serving as Tennis Director at Johnson Ranch Sports Club Tennis Academy (California), Head Coach at Paddington Recreation Ground (London), and currently Performance Manager at Highgate Cricket and Lawn Tennis Club (London).",
  },
  {
    title: "Psychological Foundations",
    body:  "Built a coaching philosophy anchored in self-awareness, personal responsibility, and the interplay between the conscious and instinctive mind. His approach integrates principles from Nathaniel Branden's Six Pillars of Self-Esteem and Stephen Covey's The 7 Habits of Highly Effective People — helping players develop not just technically, but mentally and emotionally.",
  },
  {
    title: "Mindfulness Practice",
    body:  "A 20-year practitioner of the Quan Yin Meditation Method, integrating inner stillness, emotional balance, and mindful presence into every session.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#fff" }}>

      {/* ── HERO: photo + intro text side by side ── */}
      <section style={{ padding: "3rem 0 2.5rem" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "clamp(1.5rem, 4vw, 3.5rem)",
            alignItems: "center",
          }}
            className="about-grid"
          >
            {/* Photo column — fixed 300px width, portrait crop */}
            <div style={{ position: "relative" }}>
              <div style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
                aspectRatio: "3/4",
                position: "relative",
              }}>
                <Image
                  src={PHOTO}
                  alt="Andrzej Misiek — CoachAndrew"
                  fill
                  priority
                  sizes="300px"
                  style={{ objectFit: "cover", objectPosition: "81% 40%" }}
                />
              </div>
            </div>

            {/* Text column */}
            <div>
              <p style={{
                fontSize: ".75rem", fontWeight: 600, letterSpacing: ".16em",
                textTransform: "uppercase", color: "var(--green)", marginBottom: ".6rem",
              }}>
                Coach · Educator · Mindfulness Practitioner
              </p>

              <h1 style={{
                fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 700, lineHeight: 1.15,
                color: "var(--text)", marginBottom: ".6rem",
              }}>
                Andrzej Misiek
              </h1>

              <p style={{
                fontFamily: "var(--font-heading), serif",
                fontSize: "clamp(.9rem, 1.5vw, 1.05rem)",
                fontWeight: 400, fontStyle: "italic",
                color: "var(--green-dark)", marginBottom: "1rem",
                lineHeight: 1.4,
              }}>
                Where the Inner Growth meets High-Performance Training
              </p>

              <div style={{ width: "36px", height: "2px", background: "var(--green)", borderRadius: "2px", marginBottom: "1rem" }} />

              <p style={{ fontSize: ".9375rem", color: "#444", lineHeight: 1.75, marginBottom: "1rem" }}>
                Andrzej Misiek is a lifelong student of human potential. A former Top-10 junior and national coach in Poland. He spent the past 20 years developing players across Europe, United States and Australia.
              </p>
              <p style={{ fontSize: ".9375rem", color: "#444", lineHeight: 1.75, marginBottom: "1rem" }}>
                His approach blends high-performance practices with psychology, mindfulness, and authentic leadership, helping athletes unlock the deeper potential.
              </p>
              <p style={{ fontSize: ".9375rem", color: "#444", lineHeight: 1.75, marginBottom: "1.75rem" }}>
               
                Unlocking human potential requires more than training the body, it begins with mastering the self.
              </p>

              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-green">Start Your Journey</Link>
                <Link href="/blog"    className="btn btn-outline-green">Read the Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section style={{ background: "var(--green-pale)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: ".8125rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green)", marginBottom: ".5rem" }}>
              Track Record
            </p>
            <h2 style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)",
              fontWeight: 700, color: "var(--text)",
            }}>
              Milestones in Coaching Excellence
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
            className="milestones-grid"
          >
            {MILESTONES.map((m) => (
              <div key={m.title} style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                borderTop: "3px solid var(--green)",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-heading), serif",
                  fontSize: "1.125rem", fontWeight: 700,
                  color: "var(--text)", marginBottom: ".75rem",
                }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: ".9375rem", color: "#555", lineHeight: 1.7, marginBottom: m.title === "High-Performance Coaching" ? "1.25rem" : 0 }}>
                  {m.body}
                </p>
                {m.title === "High-Performance Coaching" && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: ".75rem", background: "#EAF7EB", borderRadius: 10, padding: ".5rem 1rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#2f6a00", textTransform: "uppercase", letterSpacing: ".05em" }}>Captained National Teams to</span>
                    {MEDALS.map((item, i) => (
                      <span key={item.label} style={{ display: "flex", alignItems: "center", gap: ".25rem" }}>
                        {i > 0 && <span style={{ display: "inline-block", width: ".5rem" }} />}
                        <span style={{ fontSize: "1.1rem" }}>{item.medal}</span>
                        <span style={{ fontFamily: "var(--font-heading), serif", fontWeight: 700, fontSize: ".95rem", color: "#1e2e1e" }}>{item.count}</span>
                      </span>
                    ))}
                  </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <p style={{ fontSize: ".8125rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green)", marginBottom: ".5rem" }}>
            Philosophy
          </p>
          <h2 style={{
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)",
            fontWeight: 700, color: "var(--text)", marginBottom: "1.5rem",
          }}>
            First principles, Mindfulness &amp; Tennis Excellence
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "#555", lineHeight: 1.8, marginBottom: "1rem" }}>
            We prioritise oneness with Nature and animal welfare in our coaching approach, believing that a harmonious relationship with the environment builds strong and respectful individuals.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)",
        padding: "5rem 0", textAlign: "center",
      }}>
        <div className="container" style={{ maxWidth: "560px" }}>
          <h2 style={{
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            fontWeight: 700, color: "#fff", marginBottom: "1rem",
          }}>
            Start Your Journey to Excellence Today
          </h2>
          <p style={{ color: "rgba(255,255,255,.85)", fontSize: "1.0625rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Ready to unlock your full potential? Let&apos;s begin.
          </p>
          <Link href="/contact" className="btn btn-outline-white">Get in Touch</Link>
        </div>
      </section>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 720px) {
          .about-grid     { grid-template-columns: 1fr !important; }
          .milestones-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
