import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Coaching | CoachAndrew",
  description: "The Self² Method — True Self vs Ego Self. Coaching that builds responsibility, awareness, and self-reliance through tennis.",
};

const OFFERINGS: {
  title: string; titleHtml: string; desc: string; image: string; alt: string;
  cta: { label: string; href: string };
  cta2?: { label: string; href: string };
  reverse: boolean;
}[] = [
  {
    title:   "Hands-on training",
    titleHtml: "Hands-on training",
    desc:    "This is a direct, on-court experience with Andrzej. If you are a complete beginner—even a highly uncoordinated player—he will be able to show you effective ways to rally within the span of a single lesson. On the other hand, if you are pursuing a professional journey in tennis and personal development, you will gain confidence, comfort, and competence in discovering your own unique and best possible tennis identity.",
    image:   "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2025/10/frog-tennis-fun-figure-cute-funny-1212392.jpg",
    alt:     "Tennis figure — fun and playful approach to the game",
    cta:     { label: "Learn More", href: "/contact" },
    reverse: true,
  },
  {
    title:   "Online 1-to-1 Classes",
    titleHtml: "Online 1-to-1 Classes",
    desc:    "Join the interactive online one-to-one tennis classes for all skill levels, combining smart technical guidance with mindfulness to improve focus and performance. Each session helps quiet the critical voice, allowing your natural, intuitive ability to emerge, so you move more efficiently, make better decisions under pressure, and play with greater confidence and consistency.",
    image:   "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2025/10/tennis-tennis-player-sports-4755926.jpg",
    alt:     "Tennis player in action",
    cta:     { label: "Learn More", href: "/contact" },
    reverse: false,
  },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#fff" }}>

      {/* ── Hero ── */}
      <section style={{ background: "#fff", padding: "4rem 0 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>

          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <Image
              src="/self2-method-logo.png"
              alt="The Self² Method logo"
              width={320}
              height={320}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Subtitle */}
          <p style={{ fontSize: ".8125rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--green)", marginBottom: ".75rem" }}>
            Method behind the logic of True Self vs Ego Self
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, color: "var(--text)",
            marginBottom: "3rem",
            letterSpacing: ".04em",
          }}>
            THE SELF<sup style={{ fontSize: "0.55em", verticalAlign: "super" }}>2</sup> METHOD
          </h1>

        </div>
      </section>

      {/* ── Self² Method intro ── */}
      <section style={{ background: "var(--green-pale)", padding: "4rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: "1.0625rem", color: "#3a4a3a", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            <strong>True confidence is built through action, not instruction.</strong> Coaching on 2 selfs (The Inner Game of Tennis) develops responsibility, awareness, and self-reliance by creating situations where players learn to think, adapt, and solve problems.
          </p>
          <p style={{ fontSize: "1.0625rem", color: "#3a4a3a", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Tennis becomes more than a sport — it becomes a training ground for character. Particularly in the early stages of a tennis development, the wall is the focal point of each session. It is the best teacher players could possibly have (pure mirror), while giving the coaches one of the most effective tools available. The wall works as our assistant and a sparring partner, allowing coaches to step aside and help players refine and perfect all the necessary technical aspects of their game.
          </p>
          <p style={{ fontSize: "1.0625rem", color: "#3a4a3a", lineHeight: 1.9 }}>
            Above all, it creates conditions (gives back) in which players can learn and adopt a <strong>100% responsibility approach</strong> as a habit. No other habit influences the ultimate outcome of a tennis journey more profoundly than this one!
          </p>
        </div>
      </section>

      {/* ── Offerings ── */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {OFFERINGS.map((o) => (
            <article
              key={o.title}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(2rem, 5vw, 4rem)",
                alignItems: "center",
                direction: o.reverse ? "rtl" : "ltr",
              }}
              className="offering-row"
            >
              {/* Image */}
              <div style={{ direction: "ltr", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-card)", aspectRatio: "4/3", position: "relative" }}>
                <Image
                  src={o.image}
                  alt={o.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Text */}
              <div style={{ direction: "ltr" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
                    fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                    fontWeight: 700, color: "var(--text)",
                    marginBottom: "1rem", lineHeight: 1.25,
                  }}
                  dangerouslySetInnerHTML={{ __html: o.titleHtml }}
                />

                <div style={{ width: "40px", height: "3px", background: "var(--green)", borderRadius: "2px", marginBottom: "1.25rem" }} />

                <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                  {o.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                  <Link
                    href={o.cta.href}
                    className="btn btn-green"
                    style={{ fontSize: ".8125rem" }}
                  >
                    {o.cta.label}
                  </Link>
                  {o.cta2 && (
                    <Link
                      href={o.cta2.href}
                      className="btn btn-outline-green"
                      style={{ fontSize: ".8125rem" }}
                    >
                      {o.cta2.label}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

<style>{`
        @media (max-width: 680px) {
          .offering-row {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </div>
  );
}
