"use client";

import { useState } from "react";
import Link from "next/link";

const STATIC_NAV = [
  { label: "Home",            href: "/" },
  { label: "Shop",             href: "/shop" },
  { label: "Thinking Corner", href: "/blog" },
  { label: "About Me",        href: "/about" },
  { label: "Contact",         href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff",
      borderBottom: "1px solid #e8f0e8",
      boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
    }}>
      {/* Main bar */}
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "1.45rem", fontWeight: 700, color: "#151716", letterSpacing: "-0.01em",
          }}>
            CoachAndrew
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }} className="desktop-nav">
          {STATIC_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".9375rem", fontWeight: 500, color: "#377A00" }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="mobile-toggle"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", color: "#377A00", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {open
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown — full-width, outside container */}
      {open && (
        <div style={{
          background: "#fff",
          borderTop: "1px solid #e8f0e8",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "0.25rem 1.25rem 0.75rem" }}>
            {STATIC_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "1rem", fontWeight: 500, color: "#151716",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid #e8f0e8",
                  display: "block", textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        .nav-link:hover { color: #2c6300 !important; }
        /* Desktop: show top nav, hide hamburger */
        @media (min-width: 1024px) {
          .mobile-toggle { display: none !important; }
          .desktop-nav   { display: flex !important; }
        }
        /* Mobile: hide top nav, show hamburger */
        @media (max-width: 1023px) {
          .desktop-nav   { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
