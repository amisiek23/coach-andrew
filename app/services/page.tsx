import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Services",
  description: "Explore CoachAndrew's unique coaching offerings — Self-Mastery Profile, Online Tennis Classes, and Books & Resources.",
};

const OFFERINGS = [
  {
    title:   "Self-Mastery Profile",
    titleHtml: "<strong>Self-Mastery</strong> Profile",
    desc:    "The Self Mastery Profile (SMP) questionnaire is designed for anyone committed to becoming a champion, or the best possible version of themselves, regardless of their current level of performance. This is not a personality test. It is a diagnostic instrument to develop self-mastery and inner clarity that will show you your strengths, weaknesses and blind spots that you never thought possible to be self-realized.",
    image:   "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2025/10/paraglider-sunset-paragliding-5358333.jpg",
    alt:     "Paraglider at sunset — freedom and potential",
    cta:     { label: "Explore the Profile", href: "/1496-2" },
    reverse: false,
  },
  {
    title:   "Online Tennis Classes",
    titleHtml: "Online Tennis Classes",
    desc:    "Our online tennis classes focus not only on improving your skills but also on enhancing your mental well-being. Each session integrates mindfulness practices that help you stay centred, allowing you to approach the game with clarity and confidence.",
    image:   "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2025/10/frog-tennis-fun-figure-cute-funny-1212392.jpg",
    alt:     "Tennis figure — fun and playful approach to the game",
    cta:     { label: "Learn More", href: "/contact" },
    reverse: true,
  },
  {
    title:   "Books and Resources",
    titleHtml: "Books and Resources",
    desc:    "Discover our collection of insightful books and resources that dive into the synergy between tennis and mental self-growth. These carefully chosen works aim to inspire and empower, providing you with the knowledge and tools to excel in both the sport and your personal journey.",
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

                <Link
                  href={o.cta.href}
                  className="btn btn-green"
                  style={{ fontSize: ".8125rem" }}
                >
                  {o.cta.label}
                </Link>
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
