"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ReviewCardProps {
  quote: string;
  name: string;
  role: string;
  region: string;
}

export default function ReviewCard({ quote, name, role, region }: ReviewCardProps) {
  const [open, setOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight + 1);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const modal = open ? createPortal(
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20, padding: "2rem",
          maxWidth: 520, width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "none", border: "none", fontSize: "1.25rem",
            cursor: "pointer", color: "#888", lineHeight: 1,
          }}
        >
          ✕
        </button>

        <span style={{ fontSize: "2rem", lineHeight: 1, color: "#377A00", fontFamily: "Georgia, serif", display: "block", marginBottom: "0.5rem" }}>&ldquo;</span>
        <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".9375rem", color: "#3a4a3a", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          {quote}
        </p>

        <div style={{ borderTop: "1px solid #d4e8d4", paddingTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: ".25rem" }}>
            <p style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontWeight: 700, fontSize: ".9375rem", color: "#1e2e1e", margin: 0 }}>{name}</p>
            <span style={{ fontSize: ".9rem" }}>{region}</span>
          </div>
          <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".8rem", color: "#5a7a5a", lineHeight: 1.5, margin: 0 }}>{role}</p>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        onClick={() => isTruncated && setOpen(true)}
        style={{
          background: "#F8FAF8", border: "1px solid #d4e8d4", borderRadius: 16,
          padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem",
          cursor: isTruncated ? "pointer" : "default",
        }}
      >
        {/* Name + flag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontWeight: 700, fontSize: ".9375rem", color: "#1e2e1e", margin: 0 }}>{name}</p>
          <span style={{ fontSize: ".9rem" }}>{region}</span>
        </div>
        <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".8rem", color: "#5a7a5a", lineHeight: 1.5, margin: 0 }}>{role}</p>

        {/* Quote preview */}
        <div style={{ borderTop: "1px solid #d4e8d4", paddingTop: "0.75rem", position: "relative" }}>
          <p
            ref={textRef}
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontSize: ".9rem", color: "#3a4a3a", lineHeight: 1.6, margin: 0,
              display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {quote}
          </p>
          {isTruncated && (
            <span style={{
              position: "absolute", bottom: 0, right: 0,
              background: "linear-gradient(to right, transparent, #F8FAF8 40%)",
              paddingLeft: "2.5rem",
              color: "#377A00", fontSize: ".8125rem", fontWeight: 600,
            }}>
              Read more ▼
            </span>
          )}
        </div>
      </div>
      {modal}
    </>
  );
}
