"use client";

import { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "gsDepth",    label: "Groundstroke Depth",    emoji: "🎾", max: 90  },
  { id: "volley",     label: "Volley Depth",           emoji: "🏓", max: 72  },
  { id: "gsAccuracy", label: "Groundstroke Accuracy",  emoji: "🎯", max: 84  },
  { id: "serve",      label: "Serve",                  emoji: "💥", max: 108 },
  { id: "mobility",   label: "Mobility",               emoji: "⚡", max: 76  },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

const ITN_LEVELS = [
  { itn: "ITN 1",  male: [363, 430], female: [345, 430] },
  { itn: "ITN 2",  male: [338, 362], female: [304, 344] },
  { itn: "ITN 3",  male: [294, 337], female: [259, 303] },
  { itn: "ITN 4",  male: [269, 293], female: [231, 258] },
  { itn: "ITN 5",  male: [245, 268], female: [206, 230] },
  { itn: "ITN 6",  male: [210, 244], female: [172, 205] },
  { itn: "ITN 7",  male: [176, 209], female: [141, 171] },
  { itn: "ITN 8",  male: [140, 175], female: [109, 140] },
  { itn: "ITN 9",  male: [105, 139], female: [80,  108] },
  { itn: "ITN 10", male: [75,  104], female: [57,  79]  },
];

const ITN_DESCRIPTIONS: Record<string, string> = {
  "ITN 1":  "World-class player. This level represents professional or near-professional ability.",
  "ITN 2":  "Elite amateur or ex-professional. Exceptional all-round game with powerful, consistent strokes.",
  "ITN 3":  "Very strong club player or low-level professional. Highly consistent with advanced tactical play.",
  "ITN 4":  "Strong advanced club player. Reliable strokes, good depth and direction, capable of competitive play.",
  "ITN 5":  "Solid intermediate-advanced player. Consistent groundstrokes and developing tactical awareness.",
  "ITN 6":  "Intermediate player. Has developed all the basic strokes but still working on consistency under pressure.",
  "ITN 7":  "Beginner-intermediate. Knows all the basic shots but needs more consistency and court positioning.",
  "ITN 8":  "Early intermediate. Beginning to develop consistency and understanding of court play.",
  "ITN 9":  "Beginner with some experience. Has basic strokes but still developing control and consistency.",
  "ITN 10": "Absolute beginner. Just starting out — still learning the fundamental strokes.",
};

function getITN(total: number, gender: "male" | "female") {
  return ITN_LEVELS.find((l) => total >= l[gender][0] && total <= l[gender][1]) ?? null;
}

export default function ITNCalculatorPage() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [scores, setScores] = useState<Record<SectionId, string>>({
    gsDepth: "", volley: "", gsAccuracy: "", serve: "", mobility: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const numericScores = SECTIONS.map((s) => {
    const v = parseInt(scores[s.id], 10);
    return isNaN(v) ? 0 : Math.min(s.max, Math.max(0, v));
  });
  const total = numericScores.reduce((a, b) => a + b, 0);
  const allFilled = SECTIONS.every((s) => scores[s.id] !== "");
  const result = allFilled ? getITN(total, gender) : null;

  const setScore = (id: SectionId, raw: string) => {
    setSubmitted(false);
    const sec = SECTIONS.find((s) => s.id === id)!;
    if (raw === "") { setScores((p) => ({ ...p, [id]: "" })); return; }
    const n = Math.min(sec.max, Math.max(0, parseInt(raw, 10) || 0));
    setScores((p) => ({ ...p, [id]: String(n) }));
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      padding: "0.5rem 24px 80px",
      background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)",
    }}>

      {/* ── TITLE ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🧮</div>
        <h1 style={{
          fontSize: 36, fontWeight: 700, color: "#151716",
          lineHeight: 1.2, marginBottom: 4,
          fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
        }}>
          ITN Score Calculator
        </h1>
        <p style={{ fontSize: 14, color: "#377A00", fontWeight: 600, marginBottom: 0, letterSpacing: 1.5, textTransform: "uppercase" }}>
          Enter your assessment scores to find your ITN level
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 600 }}>

        {/* ── GENDER TOGGLE ─────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", margin: "0 0 12px", letterSpacing: ".08em", textTransform: "uppercase" }}>Gender</p>
          <div style={{ display: "flex", gap: 12 }}>
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                style={{
                  flex: 1, padding: "12px 0", fontSize: 15, fontWeight: 600,
                  borderRadius: 50, cursor: "pointer", border: "2px solid transparent", transition: "all 0.15s",
                  background: gender === g ? "linear-gradient(135deg, #377A00, #2f6a00)" : "#F8FAFC",
                  color: gender === g ? "#fff" : "#64748B",
                  boxShadow: gender === g ? "0 2px 8px rgba(55,122,0,0.25)" : "none",
                }}
              >
                {g === "male" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </div>

        {/* ── SCORE INPUTS ──────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          {SECTIONS.map((sec, i) => {
            const val = parseInt(scores[sec.id], 10) || 0;
            const pct = scores[sec.id] !== "" ? (val / sec.max) * 100 : 0;
            return (
              <div key={sec.id} style={{ padding: "16px 20px", borderBottom: i < SECTIONS.length - 1 ? "1px solid #EAF7EB" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{sec.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#151716", margin: "0 0 2px" }}>{sec.label}</p>
                    <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>Max: {sec.max} points</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <input
                      type="number"
                      min={0}
                      max={sec.max}
                      value={scores[sec.id]}
                      placeholder="—"
                      onChange={(e) => setScore(sec.id, e.target.value)}
                      style={{
                        width: 72, fontSize: 20, fontWeight: 700, color: "#377A00",
                        border: "2px solid #BFDBFE", borderRadius: 8, padding: "4px 6px",
                        textAlign: "center", outline: "none", background: "#EEF4FF",
                      }}
                    />
                    <span style={{ fontSize: 13, color: "#94A3B8" }}>/ {sec.max}</span>
                  </div>
                </div>
                {scores[sec.id] !== "" && (
                  <div style={{ height: 5, borderRadius: 3, background: "#F1F5F9" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: "linear-gradient(90deg, #377A0088, #377A00)", transition: "width 0.3s" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── TOTAL ─────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.25rem 1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: ".08em" }}>Total Score</p>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>Maximum: 430 points</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 42, fontWeight: 800, color: total > 0 ? "#377A00" : "#CBD5E1" }}>{total}</span>
            <span style={{ fontSize: 16, color: "#94A3B8", marginLeft: 4 }}>/ 430</span>
          </div>
        </div>

        {/* ── RESULT ────────────────────────────────────────────── */}
        {result && allFilled && (
          <div style={{
            background: "linear-gradient(135deg, #377A00, #2f6a00)",
            borderRadius: 24, padding: "2rem", textAlign: "center",
            boxShadow: "0 4px 24px rgba(55,122,0,0.3)", marginBottom: 20,
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#a8d878", letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>
              Your International Tennis Number
            </p>
            <div style={{ fontSize: 72, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>
              {result.itn.replace("ITN ", "")}
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{result.itn}</p>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, margin: 0 }}>
                {ITN_DESCRIPTIONS[result.itn]}
              </p>
            </div>
            <p style={{ fontSize: 13, color: "#a8d878", margin: 0 }}>
              Score range ({gender}): {result[gender][0]}–{result[gender][1]} pts
            </p>
          </div>
        )}

        {allFilled && !result && (
          <div style={{ background: "#FEF2F2", borderRadius: 16, padding: "1.25rem", textAlign: "center", marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: "#EF4444", margin: 0 }}>Score out of range. Please check your inputs.</p>
          </div>
        )}

        {/* ── NOTE ──────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "1.25rem 1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#475569" }}>For the most accurate ITN</strong> the ITF recommends completing the assessment 3 times and averaging your scores. Your true ITN is based on the last 3 assessments.
          </p>
        </div>

        {/* ── NAVIGATION ────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/itn-assessment/guide"
            style={{
              flex: 1, display: "block", padding: "14px 0", textAlign: "center", fontSize: 15, fontWeight: 600,
              color: "#377A00", background: "#fff", border: "2px solid #377A00",
              borderRadius: 50, textDecoration: "none",
            }}
          >
            ← Assessment Guide
          </Link>
          <Link
            href="/itn-assessment"
            style={{
              flex: 1, display: "block", padding: "14px 0", textAlign: "center", fontSize: 15, fontWeight: 600,
              color: "#fff", background: "linear-gradient(135deg, #377A00, #2f6a00)",
              borderRadius: 50, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(55,122,0,0.25)",
            }}
          >
            Introduction →
          </Link>
        </div>
      </div>
    </div>
  );
}
