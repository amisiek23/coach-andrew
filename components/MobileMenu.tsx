"use client";

import { useState } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden" style={{ position: "relative" }}>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#377A00",
          borderRadius: "8px",
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          background: "#fff",
          borderBottom: "1px solid #e8f0e8",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          zIndex: 49,
        }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "0.5rem 1.25rem 1rem" }}>
            {links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#151716",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid #e8f0e8",
                  display: "block",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
