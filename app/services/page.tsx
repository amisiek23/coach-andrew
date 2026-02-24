import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Services",
  description: "Explore CoachAndrew's unique coaching offerings — Self-Mastery Profile, Online Tennis Classes, and Books & Resources.",
};

const OFFERINGS: {
  title: string; titleHtml: string; desc: string; image: string; alt: string;
  cta: { label: string; href: string };
  cta2?: { label: string; href: string };
  reverse: boolean;
}[] = [
  {
    title:   "Self-Mastery Profile",
    titleHtml: "<strong>Self-Mastery</strong> Profile",
    desc:    "The Self Mastery Profile (SMP) questionnaire is designed for anyone committed to becoming a champion, or the best possible version of themselves, regardless of their current level of performance. This is not a personality test. It is a diagnostic instrument to develop self-mastery and inner clarity that will show you your strengths, weaknesses and blind spots that you never thought possible to be self-realized.",
    image:   "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2025/10/paraglider-sunset-paragliding-5358333.jpg",
    alt:     "Paraglider at sunset — freedom and potential",
    cta:     { label: "Begin the Journey", href: "/self-mastery-profile" },
    cta2:    { label: "Responsibility Maturity Profile", href: "/responsibility-maturity-profile" },
    reverse: false,
  },
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

      {/* ── Page header ── */}
      <section style={{ background: "var(--green-pale)", padding: "4rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green)", marginBottom: ".5rem" }}>
            What we offer
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            fontWeight: 700, color: "var(--text)",
          }}>
            Explore Our Unique Offerings
          </h1>
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

      {/* ── CTA banner ── */}
      <section style={{
        background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)",
        padding: "5rem 0", textAlign: "center", marginTop: "4rem",
      }}>
        <div className="container" style={{ maxWidth: "560px" }}>
          <h2 style={{
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            fontWeight: 700, color: "#fff", marginBottom: "2rem",
          }}>
            Start Your Journey to Excellence Today!
          </h2>
          <Link href="/contact" className="btn btn-outline-white">
            Start Now
          </Link>
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
