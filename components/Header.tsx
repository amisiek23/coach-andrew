import Link from "next/link";
import MobileMenu from "./MobileMenu";
import type { NavLink } from "@/lib/types";

const STATIC_NAV: NavLink[] = [
  { label: "Home",            href: "/" },
  { label: "About Me",        href: "/about" },
  { label: "Services",        href: "/services" },
  { label: "Thinking Corner", href: "/blog" },
  { label: "Contact",         href: "/contact" },
];

export default function Header() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff",
      borderBottom: "1px solid #e8f0e8",
      boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "1.45rem",
            fontWeight: 700,
            color: "#151716",
            letterSpacing: "-0.01em",
          }}>
            CoachAndrew
          </span>
        </Link>

        <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }} className="hidden lg:flex">
          {STATIC_NAV.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".9375rem", fontWeight: 500, color: "#377A00" }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileMenu links={STATIC_NAV} />
      </div>

      <style>{`.nav-link:hover { color: #2c6300 !important; }`}</style>
    </header>
  );
}
