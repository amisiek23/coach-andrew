"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

interface EmailCaptureModalProps {
  quizType: "etp" | "tsdp";
  resultsPayload: Record<string, unknown>;
  onDone: () => void;
}

export default function EmailCaptureModal({ quizType, resultsPayload, onDone }: EmailCaptureModalProps) {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSend = async () => {
    if (!email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/send-results-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, quizType, ...resultsPayload }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const content = status === "sent" ? (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#151716", marginBottom: 6 }}>Results sent!</p>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 24 }}>Check your inbox at <strong>{email}</strong></p>
      <button onClick={onDone} style={btnPrimary}>View my results</button>
    </div>
  ) : (
    <>
      <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#377A00", marginBottom: 8 }}>
        Get your results by email
      </p>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#151716", marginBottom: 8, lineHeight: 1.2 }}>
        Want a copy of your results?
      </h2>
      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, marginBottom: 24 }}>
        Enter your email and we&apos;ll send you a summary. This is optional — you can skip and view your results now.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="your@email.com"
        style={{
          width: "100%", padding: "12px 16px", fontSize: 15,
          border: "1.5px solid #CBD5E1", borderRadius: 10,
          outline: "none", marginBottom: 12, boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />

      {status === "error" && (
        <p style={{ fontSize: 13, color: "#EF4444", marginBottom: 8 }}>Could not send — please try again.</p>
      )}

      <button
        onClick={handleSend}
        disabled={!email.trim() || status === "sending"}
        style={{ ...btnPrimary, opacity: !email.trim() || status === "sending" ? 0.6 : 1, marginBottom: 10 }}
      >
        {status === "sending" ? "Sending…" : "Send my results →"}
      </button>

      <button onClick={onDone} style={btnSkip}>
        Skip, show my results now
      </button>
    </>
  );

  return createPortal(
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "2rem",
        maxWidth: 440, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {content}
      </div>
    </div>,
    document.body
  );
}

const btnPrimary: React.CSSProperties = {
  display: "block", width: "100%", padding: "13px 0", fontSize: 15, fontWeight: 600,
  color: "#fff", background: "linear-gradient(135deg, #377A00, #2f6a00)",
  border: "none", borderRadius: 50, cursor: "pointer",
  boxShadow: "0 4px 14px rgba(55,122,0,0.3)",
};

const btnSkip: React.CSSProperties = {
  display: "block", width: "100%", padding: "10px 0", fontSize: 14,
  color: "#888", background: "none", border: "none", cursor: "pointer",
};
