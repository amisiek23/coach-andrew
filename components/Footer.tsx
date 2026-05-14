import Link from "next/link";

const LINKS = [
  { label: "Home",            href: "/" },
  { label: "About Me",        href: "/about" },
  { label: "Shop",            href: "/shop" },
  { label: "Thinking Corner", href: "/blog" },
  { label: "Contact",         href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#111", color: "#ccc" }}>
      <div className="container" style={{ padding: "4rem clamp(1.25rem,5vw,3rem) 2.5rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }}>

          {/* Brand */}
          <div style={{ maxWidth: "320px" }}>
            <p style={{
              fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
              fontSize: "1.35rem", fontWeight: 700, color: "#fff", marginBottom: ".4rem",
            }}>
              CoachAndrew
            </p>
            <p style={{ fontSize: ".8125rem", color: "#a8d878", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Breath. Act. Grow.
            </p>
            <p style={{ fontSize: ".875rem", color: "#888", lineHeight: 1.65 }}>
              Coaching for meaning, performance and lasting personal growth.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    fontSize: ".875rem", color: "#999", transition: "color .15s",
                  }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #222", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".8125rem", color: "#555" }}>
            &copy; {year} CoachAndrew. All rights reserved.
          </p>
          <p style={{ fontSize: ".8125rem", color: "#555" }}>
            Built with Next.js
          </p>
        </div>
      </div>

      <style>{`.footer-link:hover { color: #fff !important; }`}</style>
    </footer>
  );
}
