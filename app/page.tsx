import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";

const HERO_IMAGE = "https://wpstrona.wpmudev.host/coachandrew/wp-content/uploads/sites/6/2026/01/istockphoto-178745492-1024x1024-5-edited.jpg";

export const metadata: Metadata = { title: "Home", description: "Breath. Move. Grow." };

export default function HomePage() {
  const recentPosts = getAllPosts(3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", width: "100%", minHeight: "auto", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Image
          src={HERO_IMAGE}
          alt="Tennis player at sunset"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Gradient overlay — dark at bottom, semi-transparent top */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.62) 100%)",
        }} />

        <div className="container hero-content" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "640px" }}>
            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: ".8125rem", fontWeight: 600,
              letterSpacing: ".18em", textTransform: "uppercase",
              color: "#a8d878", marginBottom: "1.25rem",
            }}>
              Coaching · Mindset · Performance
            </p>

            <h1 style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 700, lineHeight: 1.1,
              color: "#fff",
              marginBottom: "1.25rem",
            }}>
              Unleash Your<br />Potential
            </h1>

            <p style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: "1.125rem", color: "rgba(255,255,255,.82)",
              lineHeight: 1.65, marginBottom: "2.25rem", maxWidth: "480px",
            }}>
              Breath. Move. Grow. — a holistic approach to purpose, performance and lasting change.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/blog" className="btn btn-outline-white">Thinking Corner</Link>
              <Link href="/about" className="btn btn-green">About Me</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: "#377A00", color: "#fff", padding: "2rem 0" }}>
        <div className="container stats-strip" style={{ display: "flex", justifyContent: "center", gap: "clamp(1rem, 2.5vw, 3rem)", flexWrap: "nowrap" }}>
          {[
            { number: "25+",           label: "Years coaching" },
            { number: "5🥇 3🥈 5🥉",   label: "National medals" },
            { number: "10+ ATP · 3 WTA", label: "Professional career players" },
            { number: "4",             label: "Generations of players coached" },
             { number: "3",         label: " years academic teaching " }
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading), serif", fontSize: "1.75rem", fontWeight: 700 }}>{stat.number}</div>
              <div style={{ fontFamily: "var(--font-body), system-ui", fontSize: ".8125rem", opacity: .85, letterSpacing: ".06em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / PHILOSOPHY ───────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5.5rem 0 2rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>

          {/* accent line */}
          <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />

          <h2 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
            fontWeight: 700, lineHeight: 1.2,
            color: "var(--text)", marginBottom: "2.5rem", textAlign: "center",
          }}>
            The Idea Behind the Project
          </h2>

          <div style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            color: "#3a4a3a", lineHeight: 1.8,
            display: "flex", flexDirection: "column", gap: "1.25rem",
          }}>
            {/* lead paragraph — slightly larger */}
            <p style={{ fontSize: "1.0rem", fontWeight: 500, color: "#1e2e1e" }}>
            We all start with an X, An unknown. A question mark waiting to be answered. 
X is potential,  something real, but often untrained, inconsistent, or simply missed and unrecognised. `
             </p>
{ 
            <p style={{ fontSize: "1.0rem" }}>
             But when you dare to step forward, that X transforms…it becomes the IT-Factor!
             </p> }

            {/* pull quote */}
            <blockquote style={{
              margin: "1rem 0",
              padding: "1.5rem 2rem",
              background: "#EAF7EB",
              borderLeft: "4px solid #377A00",
              borderRadius: "0 12px 12px 0",
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              fontStyle: "italic",
              color: "#2f6a00",
              lineHeight: 1.6,
            }}>
             What many people call the “IT factor” which seems to be bestowed only on a very few, in reality it is not a mystery. It is something we all have it inside.
                 </blockquote>

            <p style={{ fontSize: "1.0rem" }}>
              My coaching and this entire project are built around igniting this fire within. Tennis became my laboratory for understanding this process, but the same principle applies far beyond sport. It is universal to any area of our reality.
            </p>
          </div>

          {/* section intro */}
          <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "1.0rem", color: "#3a4a3a", lineHeight: 1.8, margin: "1.5rem 0 0.5rem", fontWeight: 600 }}>
            You will find here:
          </p>

          {/* 3-card row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", margin: "2rem 0" }}>
            {[
              { icon: "🎾", title: "Coaching Methods", body: "Developed through years of competitive and professional experience, connecting performance with awareness." },
              { icon: "📋", title: "Self-Discovery Tools", body: "Designed to help you unlock potential you never thought possible." },
              { icon: "🌱", title: "Materials/Resources", body: " Applicable both in sport and across all areas of life, inspiring you to see things from an unconventional perspective." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ background: "#F8FAF8", border: "1px solid #d4e8d4", borderRadius: 16, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: 32 }}>{icon}</span>
                <h3 style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontSize: "1.05rem", fontWeight: 700, color: "#1e2e1e", margin: 0 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".9rem", color: "#4a5a4a", lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          {/* closing statement */}
          <div style={{
            background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)",
            borderRadius: 16, padding: "2rem 2.5rem", marginTop: "0.5rem",
          }}>
            <p style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              fontStyle: "italic", textAlign: "center",
              color: "#fff", lineHeight: 1.8, margin: 0,
            }}>
              The goal is not only to make better tennis players, it is to help people become more conscious, more balanced, and more connected with their True Self. Because when that connection appears, improvement is no longer chased. It takes place naturally and joyfully. And from that place, both sport and life take on a different quality.
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="/services" className="btn btn-outline-green">Explore Our Products</a>
          </div>
        </div>
      </section>

     

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "0.5rem 0 5.5rem" }}>
        <div className="container" style={{ maxWidth: "960px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ width: 56, height: 4, background: "#377A00", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <h2 style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.4rem)", fontWeight: 700, color: "var(--text)" }}>
              What People Say
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                quote: "Andrzej is very ambitious coach with great theoretical knowledge and practical experience. As his professor, I will remember him being a diligent student with outstanding communication skills and very good manners.",
                name: "Piotr Unierzyski",
                role: "Lecturer, University School of Physical Education · Coach & Speaker, International Tennis Federation",
                region: "🇵🇱 Poland",
              },
              {
                quote: "His will to fight, discipline, willingness to improve and above all ability of coping various, complex group dynamics are remarkable.",
                name: "Pawel Geldner",
                role: "Davis Cup Captain 2003–2005 · Best Club Coach in Germany 1999",
                region: "🇵🇱 Poland",
              },
              {
                quote: "He continues to stress the importance of mental and social development of young players in his everyday work with top Polish juniors. In this field he is very creative in adopting ideas from top sport psychologists and successful managers.",
                name: "Tomasz Schefke",
                role: "Ph.D, Tennis Unit at the University School of Physical Education · U21 National Coach",
                region: "🇵🇱 Poland",
              },
              {
                quote: "When they started working together boys were 16th, 33rd and 45th U12 in the country. Today they are 6th, 7th and 9th respectively U18.",
                name: "Jacek Muzolf",
                role: "President, National Tennis Federation 2003–2017",
                region: "🇵🇱 Poland",
              },
              {
                quote: "Our experience with Andrzej was 'eye opening' in regards to instruction. He really teaches and closely observes every aspect of the student's game. My son (9 years old) commented that if you want to improve you need to go to Andrzej.",
                name: "Susan Hambly M.D.",
                role: "Parent · CA, 2006",
                region: "🇺🇸 U.S.",
              },
              {
                quote: "I fully recommend Andrzej to a future employer not only as an educated, experienced and skillful coach, but also as a great person who is open to help and learn every time stepping on the tennis court.",
                name: "Slava Konikov",
                role: "Belarus Federation Cup Captain 1995–1997 · Davis Cup Captain 1997–2002 · Head Coach, Sacramento State University",
                region: "🇺🇸 U.S.",
              },
            ].map(({ quote, name, role, region }) => (
              <div key={name} style={{ background: "#F8FAF8", border: "1px solid #d4e8d4", borderRadius: 16, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{ fontSize: "2rem", lineHeight: 1, color: "#377A00", fontFamily: "Georgia, serif" }}>&ldquo;</span>
                <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".9375rem", color: "#3a4a3a", lineHeight: 1.75, margin: 0, flex: 1 }}>
                  {quote}
                </p>
                <div style={{ borderTop: "1px solid #d4e8d4", paddingTop: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontWeight: 700, fontSize: ".9375rem", color: "#1e2e1e", margin: "0 0 .25rem" }}>{name}</p>
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".8rem", color: "#5a7a5a", lineHeight: 1.5, margin: "0 0 .35rem" }}>{role}</p>
                  <span style={{ fontSize: ".75rem", fontWeight: 600, color: "#377A00", letterSpacing: ".06em", textTransform: "uppercase" }}>{region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)",
        padding: "5rem 0", textAlign: "center", color: "#fff",
      }}>
        <div className="container" style={{ maxWidth: "620px" }}>
          <h2 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Ready to start your journey?
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,.85)", lineHeight: 1.65, marginBottom: "2rem" }}>
            Explore the programmes, take the questionnaire, and find out which coaching path is right for you.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/services" className="btn" style={{ background: "#fff", color: "#377A00", borderColor: "#fff" }}>View Programmes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
