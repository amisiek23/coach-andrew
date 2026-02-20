import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CoachAndrew — start your journey to excellence today.",
};

export default function ContactPage() {
  return (
    <div style={{ background: "#fff" }}>

      {/* Header */}
      <section style={{ background: "var(--green-pale)", padding: "3rem 0 2.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--green)", fontWeight: 600, fontSize: ".8125rem", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: ".5rem" }}>
            Get in Touch
          </p>
          <h1 style={{ fontFamily: "var(--font-heading), serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)", marginBottom: ".75rem" }}>
            Contact
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto" }}>
            Ready to start your journey? Reach out and let&apos;s talk.
          </p>
        </div>
      </section>

      {/* Calendly — Free 30-min Chat */}
      <section style={{ background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)", padding: "3.5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              borderRadius: "999px",
              padding: ".35rem 1rem",
              marginBottom: "1rem",
            }}>
              Free · 30 Minutes · No Commitment
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: ".75rem",
            }}>
              Book a Free Discovery Call
            </h2>
            <p style={{ color: "rgba(255,255,255,.85)", fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto" }}>
              Let&apos;s spend 30 minutes getting to know each other — your goals, your challenges, and how I can help.
            </p>
          </div>

          <div style={{
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}>
            <iframe
              src="https://calendly.com/a-misiek23/30min?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=377A00"
              width="100%"
              height="700"
              scrolling="no"
              style={{ border: "none", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "4rem 0 5rem" }}>
        <div className="container contact-grid">

          {/* Left — info */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading), serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", marginBottom: "1.25rem" }}>
              Let&apos;s connect
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
              Whether you&apos;re looking to elevate your tennis game, develop mental resilience, or explore mindfulness coaching — I&apos;d love to hear from you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                {
                  icon: (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: "Email",
                  value: "andrzej@mycoachandrew.com",
                  href: "mailto:andrzej@mycoachandrew.com",
                },
                {
                  icon: (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: "Location",
                  value: "London, UK",
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--green)", marginTop: ".1rem", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: ".2rem" }}>{label}</p>
                    {href
                      ? <a href={href} style={{ fontSize: "1rem", color: "var(--text)", textDecoration: "none" }}>{value}</a>
                      : <p style={{ fontSize: "1rem", color: "var(--text)", margin: 0 }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right — form */}
          <form
            action="mailto:andrzej@mycoachandrew.com"
            method="POST"
            encType="text/plain"
            style={{
              background: "var(--green-pale)",
              borderRadius: "16px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                <label htmlFor="name" style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--text)" }}>Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name"
                  style={{ padding: ".7rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: ".9375rem", color: "var(--text)", background: "#fff", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                <label htmlFor="email" style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--text)" }}>Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com"
                  style={{ padding: ".7rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: ".9375rem", color: "var(--text)", background: "#fff", outline: "none" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <label htmlFor="subject" style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--text)" }}>Subject</label>
              <input id="subject" name="subject" type="text" placeholder="How can I help?"
                style={{ padding: ".7rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: ".9375rem", color: "var(--text)", background: "#fff", outline: "none" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <label htmlFor="message" style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--text)" }}>Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="Tell me about yourself and what you're looking for..."
                style={{ padding: ".7rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: ".9375rem", color: "var(--text)", background: "#fff", outline: "none", resize: "vertical" }} />
            </div>

            <button type="submit" className="btn btn-green" style={{ alignSelf: "flex-start" }}>
              Send Message
            </button>
          </form>

        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: start;
        }
        @media (max-width: 720px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
