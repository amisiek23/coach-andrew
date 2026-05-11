"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [codeOpen, setCodeOpen]   = useState(false);
  const [code, setCode]           = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading]     = useState<"consultation" | "quiz" | "code" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePay = async (plan: "consultation" | "quiz") => {
    setLoading(plan);
    try {
      const res  = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
      else {
        alert(data.error ?? "Something went wrong. Please try again.");
        setLoading(null);
      }
    } catch {
      alert("Could not connect to payment. Please try again.");
      setLoading(null);
    }
  };

  const handleCode = async () => {
    if (!code.trim()) return;
    setLoading("code");
    setCodeError("");
    const res  = await fetch("/api/validate-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
    const data = await res.json() as { valid: boolean };
    if (data.valid) {
      window.location.href = "/self-mastery-profile/quiz?access=quiz&via=code";
    } else {
      setCodeError("Invalid code. Please try again.");
      setLoading(null);
    }
  };

  const card = (
    plan: "consultation" | "quiz",
    price: string,
    title: string,
    subtitle: string,
    perks: string[],
  ) => {
    const busy = loading === plan;
    return (
      <div style={{
        background: "#fff", borderRadius: 20, padding: "32px 28px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "2px solid #E2E8F0",
        display: "flex", flexDirection: "column", flex: 1,
      }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#377A00", marginBottom: 4 }}>{price}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 14, color: "#64748B", marginBottom: 20, lineHeight: 1.5 }}>{subtitle}</div>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 8 }}>
          {perks.map((p) => (
            <li key={p} style={{ fontSize: 14, color: "#3a4a3a", display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#377A00", fontWeight: 700, flexShrink: 0 }}>✓</span> {p}
            </li>
          ))}
        </ul>
        <button
          onClick={() => handlePay(plan)}
          disabled={loading !== null}
          style={{
            marginTop: "auto", padding: "14px 0", fontSize: 15, fontWeight: 600,
            color: "#fff", background: busy ? "#94b87a" : "linear-gradient(135deg, #377A00, #2f6a00)",
            border: "none", borderRadius: 50, cursor: loading !== null ? "not-allowed" : "pointer",
            boxShadow: busy ? "none" : "0 4px 14px rgba(55,122,0,0.3)",
          }}
        >
          {busy ? "Redirecting…" : "Get Started"}
        </button>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "8px 24px 80px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>
      <div style={{ textAlign: "center", maxWidth: 680, width: "100%" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>

        <h1 style={{
          fontSize: 28, fontWeight: 700, color: "#151716", marginBottom: 8,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          Choose Your Experience
        </h1>

        <p style={{ fontSize: 16, color: "#3a4a3a", marginBottom: 36, lineHeight: 1.6 }}>
          Select the option that fits you best to unlock your Elite Performance Awareness.
        </p>

        {/* Cards */}
        <div style={{ display: "flex", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
          {card("consultation", "£100", "Full Experience", "Questionnaire + 30-min consultation call with Andrew", [
            "Complete High Performance Profile (35 questions)",
            "Personal radar chart & archetype",
            "30-min 1-on-1 consultation with Andrew",
            "Personalised action plan",
          ])}
          {card("quiz", "£25", "Assessment Only", "Questionnaire & full personalised report", [
            "Complete High Performance Profile (35 questions)",
            "Personal radar chart & archetype",
            "Detailed feedback per dimension",
          ])}
        </div>

        {/* Access code */}
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(4px)" }}>
          {!codeOpen ? (
            <button
              onClick={() => { setCodeOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
              style={{
                background: "#fff", border: "2px solid #377A00", borderRadius: 50,
                cursor: "pointer", fontSize: 14, fontWeight: 600,
                color: "#377A00", padding: "10px 28px",
              }}
            >
              I have an access code
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, width: "100%", maxWidth: 340 }}>
                <input
                  ref={inputRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCode()}
                  placeholder="Enter your code"
                  style={{ flex: 1, padding: "10px 16px", borderRadius: 10, border: "1.5px solid #CBD5E1", fontSize: 15, outline: "none" }}
                />
                <button
                  onClick={handleCode}
                  disabled={loading !== null}
                  style={{ padding: "10px 20px", background: "#377A00", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: loading !== null ? "not-allowed" : "pointer" }}
                >
                  {loading === "code" ? "…" : "Apply"}
                </button>
              </div>
              {codeError && <p style={{ fontSize: 13, color: "#EF4444", margin: 0 }}>{codeError}</p>}
            </div>
          )}
        </div>

        <p style={{ marginTop: 24, fontSize: 14, color: "#6b7280" }}>
          Want to know more about the HPP and how it was created?{" "}
          <a
            href="/measuring-elite-performance"
            style={{ color: "#377A00", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Learn more →
          </a>
        </p>
      </div>
    </div>
  );
}
