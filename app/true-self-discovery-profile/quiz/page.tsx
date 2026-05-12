"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* ────────────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────────────── */

const SECTIONS = [
  {
    id: "uniqueness",
    label: "A",
    title: "Inner Sense of Uniqueness",
    emoji: "🌱",
    questions: [
      "I feel that there is something unique about me, even if I can't fully describe it.",
      "I sometimes feel misunderstood by others.",
      "I have thoughts, perspectives, or sensitivities that I don't often express.",
      "I feel that my path in life may be different from what is expected.",
      "I sense that I have more to express than I currently do.",
    ],
  },
  {
    id: "authentic",
    label: "B",
    title: "Authentic vs Adapted Self",
    emoji: "🔍",
    questions: [
      "I sometimes adjust who I am to fit in or be accepted.",
      "I hold back parts of myself in certain environments.",
      "I feel most like myself only in specific situations or with certain people.",
      "I have made choices in life based more on expectations than inner truth.",
      "I sometimes feel disconnected from my real self.",
    ],
  },
  {
    id: "expression",
    label: "C",
    title: "Expression & Courage",
    emoji: "🔥",
    questions: [
      "I want to express myself more freely than I currently do.",
      "I feel there are ideas, talents, or qualities in me that are not fully used.",
      "I sometimes hesitate to show my true opinions or feelings.",
      "I admire people who are fully authentic.",
      "I feel a quiet push inside to become more “myself.”",
    ],
  },
  {
    id: "innervoice",
    label: "D",
    title: "Inner Voice & Direction",
    emoji: "🧭",
    questions: [
      "I feel that I have an inner voice or intuition guiding me.",
      "I sometimes ignore that inner voice.",
      "I feel most aligned when I follow what feels true, not what is expected.",
      "I question whether the life I am living fully reflects who I am.",
      "I feel that discovering myself is an ongoing journey.",
    ],
  },
  {
    id: "depth",
    label: "E",
    title: "Depth & Meaning",
    emoji: "✨",
    questions: [
      "I am interested in understanding myself at a deeper level.",
      "I feel that life is more than just achieving results or success.",
      "I am drawn to questions like \"Who am I?\" or \"What is my true nature?\"",
      "I sense that my value is not defined only by what I achieve.",
      "I want to live in a way that feels true to who I am inside.",
    ],
  },
];

const RESULTS = [
  {
    min: 20, max: 25,
    label: "Deep Inner Calling",
    color: "#377A00", bg: "#EAF7EB",
    icon: "🌿",
    desc: "You strongly feel that there is a deeper self within you waiting to be expressed. This is not confusion — it is awakening. The inner calling you sense is real, and it is asking to be honoured.",
  },
  {
    min: 14, max: 19,
    label: "Active Search",
    color: "#2D5A8E", bg: "#EEF4FF",
    icon: "🔍",
    desc: "You are aware that there is more to you than your current expression. You are in the process of discovery — actively searching, questioning, and beginning to listen more deeply to what is true for you.",
  },
  {
    min: 8, max: 13,
    label: "Emerging Awareness",
    color: "#D97706", bg: "#FEF3C7",
    icon: "🌅",
    desc: "You occasionally feel this inner layer, but it is not yet stable. Life may still be guided more by external structures. The awareness is emerging — and that is where every meaningful journey begins.",
  },
  {
    min: 0, max: 7,
    label: "External Identity Orientation",
    color: "#64748B", bg: "#F1F5F9",
    icon: "🔲",
    desc: "Your identity is currently shaped more by roles, expectations, and environment. The inner layer may not yet be a central focus — and that is okay. Asking the question at all is the first step.",
  },
];

/* ────────────────────────────────────────────────────────────────────
   QUIZ SCREEN
   ──────────────────────────────────────────────────────────────────── */

const QuizScreen = ({
  section, sectionIndex, answers, onAnswer, onNext, onPrev, onFinish, totalSections,
}: {
  section: typeof SECTIONS[0];
  sectionIndex: number;
  answers: Record<string, boolean | null>;
  onAnswer: (key: string, val: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  totalSections: number;
}) => {
  const progress = (sectionIndex / totalSections) * 100;
  const isFirst = sectionIndex === 0;
  const isLast  = sectionIndex === totalSections - 1;

  const sectionAnswers = section.questions.map((_, qi) => answers[`${sectionIndex}-${qi}`]);
  const allAnswered = sectionAnswers.every((v) => v !== undefined && v !== null);
  const [showError, setShowError] = useState(false);

  const handleAdvance = () => {
    if (!allAnswered) { setShowError(true); return; }
    setShowError(false);
    isLast ? onFinish() : onNext();
  };

  useEffect(() => {
    setShowError(false);
  }, [sectionIndex]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)", display: "flex", flexDirection: "column" }}>

      {/* Progress bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #CBD5E1" }}>
        <div style={{ height: 3, background: "#CBD5E1" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #377A00, #2f6a00)", transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px" }}>
          <span style={{ fontSize: 12, color: "#377A00", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>Section {sectionIndex + 1} of {totalSections}</span>
          <span style={{ fontSize: 12, color: "#377A00", fontWeight: 600 }}>{Math.round(progress)}% complete</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "32px 20px 100px" }}>
        <div style={{ width: "100%", maxWidth: 680 }}>

          {/* Section card */}
          <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 32px rgba(55,122,0,0.10)", overflow: "hidden", marginBottom: 24 }}>
            <div style={{ background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)", padding: "1.75rem 2rem" }}>
              <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#a8d878", margin: "0 0 4px" }}>
                {section.emoji} Section {section.label} · {section.title}
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", margin: "6px 0 0", lineHeight: 1.5 }}>
                Answer YES or NO for each statement below.
              </p>
            </div>

            {section.questions.map((q, qi) => {
              const key = `${sectionIndex}-${qi}`;
              const val = answers[key];
              const unanswered = showError && (val === undefined || val === null);
              return (
                <div key={key} style={{
                  padding: "18px 24px",
                  borderBottom: qi < section.questions.length - 1 ? "1px solid #EAF7EB" : "none",
                  background: unanswered ? "#FEF2F2" : "transparent",
                }}>
                  <p style={{ fontSize: 15, color: "#334155", fontWeight: 500, lineHeight: 1.6, margin: "0 0 12px" }}>
                    {sectionIndex * 5 + qi + 1}. {q}
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {([true, false] as const).map((v) => (
                      <button
                        key={String(v)}
                        onClick={() => { onAnswer(key, v); setShowError(false); }}
                        style={{
                          padding: "8px 28px", fontSize: 14, fontWeight: 700,
                          borderRadius: 50, cursor: "pointer", transition: "all 0.15s",
                          border: val === v ? "2px solid transparent" : "2px solid #CBD5E1",
                          background: val === v
                            ? (v ? "linear-gradient(135deg, #377A00, #2f6a00)" : "#334155")
                            : "#fff",
                          color: val === v ? "#fff" : "#64748B",
                          boxShadow: val === v ? "0 2px 8px rgba(55,122,0,0.25)" : "none",
                        }}
                      >
                        {v ? "YES" : "NO"}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {showError && (
            <p style={{ fontSize: 13, color: "#EF4444", marginBottom: 12, textAlign: "right" }}>
              Please answer all questions before continuing.
            </p>
          )}

          <div style={{ display: "flex", justifyContent: isFirst ? "flex-end" : "space-between", gap: 16 }}>
            {!isFirst && (
              <button onClick={onPrev} style={{ padding: "14px 32px", fontSize: 15, fontWeight: 600, color: "#377A00", background: "#fff", border: "1.5px solid #CBD5E1", borderRadius: 50, cursor: "pointer" }}>
                ← Previous
              </button>
            )}
            <button onClick={handleAdvance} style={{ padding: "14px 36px", fontSize: 15, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #377A00, #2f6a00)", border: "none", borderRadius: 50, cursor: "pointer", boxShadow: "0 4px 14px rgba(55,122,0,0.30)" }}>
              {isLast ? "See My Results →" : "Next Section →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────
   RESULTS SCREEN
   ──────────────────────────────────────────────────────────────────── */

const ResultsScreen = ({
  answers, accessType,
}: {
  answers: Record<string, boolean | null>;
  accessType: "quiz" | "consultation";
}) => {
  const sectionYes = SECTIONS.map((_, si) =>
    [0, 1, 2, 3, 4].filter((qi) => answers[`${si}-${qi}`] === true).length
  );
  const totalYes = sectionYes.reduce((a, b) => a + b, 0);
  const result = RESULTS.find((r) => totalYes >= r.min && totalYes <= r.max) ?? RESULTS[RESULTS.length - 1];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "#377A00", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your Results</p>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#151716", marginBottom: 4, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
            True Self Discovery Profile
          </h1>
        </div>

        {/* Score card */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center", marginBottom: 24 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 120, height: 120, borderRadius: "50%",
            border: `8px solid ${result.color}`, marginBottom: 20,
            flexDirection: "column",
          }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: "#151716" }}>{totalYes}</span>
            <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>/ 25</span>
          </div>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{result.icon}</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#151716", marginBottom: 12 }}>{result.label}</h2>
          <div style={{
            display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".1em",
            textTransform: "uppercase", color: result.color, background: result.bg,
            padding: "4px 16px", borderRadius: 20, marginBottom: 16,
          }}>
            {totalYes} YES answers out of 25
          </div>
          <p style={{ fontSize: 16, color: "#3a4a3a", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>{result.desc}</p>
        </div>

        {/* Section breakdown */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", marginBottom: 20 }}>Section Breakdown</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SECTIONS.map((sec, si) => {
              const yes = sectionYes[si];
              const pct = (yes / 5) * 100;
              return (
                <div key={sec.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#151716" }}>
                      {sec.emoji} {sec.title}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#377A00" }}>{yes} / 5</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "#F1F5F9" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: "linear-gradient(90deg, #377A0088, #377A00)", transition: "width 0.8s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All 4 result levels for context */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", marginBottom: 16 }}>Self-Discovery Activation Scale</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {RESULTS.map((r) => (
              <div key={r.label} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "12px 16px", borderRadius: 12,
                background: r.label === result.label ? r.bg : "#F8FAFC",
                border: r.label === result.label ? `1.5px solid ${r.color}` : "1.5px solid transparent",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{r.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: r.color, margin: "0 0 2px" }}>
                    {r.label} · {r.min}–{r.max} YES
                  </p>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation CTA */}
        {accessType === "consultation" && (
          <div style={{ background: "linear-gradient(135deg, #377A00 0%, #2f6a00 100%)", borderRadius: 24, padding: "36px 32px", textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Book Your Consultation</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 24, maxWidth: 440, margin: "0 auto 24px" }}>
              You&apos;ve unlocked a 30-minute 1-on-1 session with Andrew. Use your results to guide the conversation.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/a-misiek23/30min"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "14px 40px", background: "#fff", color: "#377A00", fontWeight: 700, fontSize: 16, borderRadius: 50, textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
            >
              Book on Calendly →
            </a>
          </div>
        )}

        {/* Print */}
        <style>{`
          @page { margin: 1.6cm; size: A4; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .tsdp-no-print { display: none !important; }
          }
        `}</style>
        <div className="tsdp-no-print" style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              const prev = document.title;
              document.title = "True Self Discovery Profile";
              window.print();
              document.title = prev;
            }}
            style={{
              padding: "14px 44px", background: "linear-gradient(135deg, #377A00, #2f6a00)",
              color: "#fff", border: "none", borderRadius: 50,
              fontSize: 16, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(55,122,0,0.25)",
            }}
          >
            Download PDF
          </button>
        </div>

      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────
   MAIN
   ──────────────────────────────────────────────────────────────────── */

function TSDPQuizInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase]           = useState<"loading" | "quiz" | "results">("loading");
  const [accessType, setAccessType] = useState<"quiz" | "consultation">("quiz");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers]       = useState<Record<string, boolean | null>>({});
  const [fade, setFade]             = useState(true);

  useEffect(() => {
    const access    = searchParams.get("access") as "quiz" | "consultation" | null;
    const sessionId = searchParams.get("session_id");
    const viaCode   = searchParams.get("via") === "code";

    if (!access) { router.replace("/true-self-discovery-profile/checkout"); return; }

    if (viaCode) {
      setAccessType(access);
      setPhase("quiz");
      return;
    }

    if (sessionId) {
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((r) => r.json())
        .then(({ valid }: { valid: boolean }) => {
          if (valid) { setAccessType(access); setPhase("quiz"); }
          else router.replace("/true-self-discovery-profile/checkout");
        });
      return;
    }

    router.replace("/true-self-discovery-profile/checkout");
  }, [searchParams, router]);

  const transition = (cb: () => void) => {
    setFade(false);
    setTimeout(() => { cb(); setFade(true); }, 250);
  };

  const handleNext   = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setSectionIdx((i) => i + 1)); };
  const handlePrev   = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setSectionIdx((i) => i - 1)); };
  const handleFinish = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const sectionYes = SECTIONS.map((_, si) =>
      [0, 1, 2, 3, 4].filter((qi) => answers[`${si}-${qi}`] === true).length
    );
    const totalYes = sectionYes.reduce((a, b) => a + b, 0);
    fetch("/api/tsdp-save-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalYes, sectionYes, accessType }),
    }).catch(console.error);
    transition(() => setPhase("results"));
  };

  const handleAnswer = (key: string, val: boolean) =>
    setAnswers((prev) => ({ ...prev, [key]: val }));

  if (phase === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#EAF7EB" }}>
        <span style={{ color: "#377A00", fontSize: 18 }}>Loading…</span>
      </div>
    );
  }

  return (
    <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.25s ease", minHeight: "100vh" }}>
      {phase === "quiz" && (
        <QuizScreen
          section={SECTIONS[sectionIdx]}
          sectionIndex={sectionIdx}
          totalSections={SECTIONS.length}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onFinish={handleFinish}
        />
      )}
      {phase === "results" && (
        <ResultsScreen answers={answers} accessType={accessType} />
      )}
    </div>
  );
}

export default function TSDPQuizPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#EAF7EB" }}>
        <span style={{ color: "#377A00", fontSize: 18 }}>Loading…</span>
      </div>
    }>
      <TSDPQuizInner />
    </Suspense>
  );
}
