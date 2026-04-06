"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* ────────────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────────────── */

const SECTIONS = [
  {
    id: "calm",
    title: "Inner Calm & Equanimity",
    subtitle: "How consistently do I embody emotional stability under pressure?",
    emoji: "🧘",
    color: "#3B82F6",
    shortName: "Calm",
    questions: [
      "Ability to stay mentally calm during stress",
      "Emotional independence from mistakes",
      "Speed of returning to balance after errors",
      "Ability to stay centered in chaotic situations",
      "Composure regardless of winning or losing",
    ],
    feedback: {
      mastery: "You have achieved remarkable emotional mastery. Pressure situations are your natural habitat — you remain an anchor of calm regardless of circumstances. Your nervous system is well-trained to maintain equilibrium, and this stability radiates outward, often calming those around you.",
      advanced: "Your emotional regulation under pressure is strong and reliable. You've developed sophisticated coping mechanisms and can maintain composure in most high-stakes situations. The occasional slip is quickly corrected. Focus on deepening this stability in the most extreme pressure moments.",
      solid: "You have a good foundation of emotional stability. In moderate pressure situations, you handle yourself well. However, extreme stress or unexpected adversity can still throw you off balance. Continue building your recovery speed and expanding your window of tolerance.",
      developing: "You're becoming more aware of your emotional patterns under pressure, which is an essential first step. You may still react strongly to mistakes or adversity, but you're starting to recognize these patterns. Focus on breath work and simple grounding techniques.",
      low: "Emotional volatility under pressure is currently a significant challenge. Stress triggers strong reactive patterns that can hijack your performance. This is a powerful growth area — even small improvements here will cascade into every other dimension of your game.",
    },
  },
  {
    id: "presence",
    title: "Presence & Awareness",
    subtitle: "How deeply do I live in the present moment when competing?",
    emoji: "🎯",
    color: "#8B5CF6",
    shortName: "Presence",
    questions: [
      "Ability to stay present point by point",
      "Mental reset between points",
      "Using breath as a grounding tool",
      "Awareness of 'now' vs past/future",
      "Access to quiet-mind states during performance",
    ],
    feedback: {
      mastery: "You possess an extraordinary ability to inhabit the present moment. Your mind naturally drops into the 'now' during competition, free from the noise of past mistakes or future anxieties. This presence is the foundation of flow states, and you access them regularly.",
      advanced: "Your present-moment awareness is well-developed. You have reliable rituals and techniques for staying grounded between points, and you catch yourself quickly when your mind drifts. Your breath has become a powerful anchor. Explore deeper layers of stillness within performance.",
      solid: "You understand the importance of presence and can maintain it during normal play. Under higher pressure, your mind may drift to outcomes, past errors, or 'what-ifs.' Your reset routines are developing but not yet automatic. Keep refining your between-point rituals.",
      developing: "You're beginning to recognize the difference between being present and being lost in thought during competition. Mind-wandering is still frequent, but you're developing awareness of it. Start with simple breath-counting between points to build this muscle.",
      low: "The mental chatter during competition is currently very active — replaying past points, worrying about outcomes, judging yourself in real-time. This is one of the most transformative areas to develop. Even 5 minutes of daily mindfulness practice will begin to shift this pattern.",
    },
  },
  {
    id: "freedom",
    title: "Freedom & Non-Attachment",
    subtitle: "How free am I from result-based identity and approval?",
    emoji: "🕊️",
    color: "#06B6D4",
    shortName: "Freedom",
    questions: [
      "Independence from needing to win",
      "Ability to give full effort without outcome obsession",
      "Seeing results as information, not identity",
      "Playing without fear of losing",
      "Freedom from others' opinions and expectations",
    ],
    feedback: {
      mastery: "You have liberated yourself from the tyranny of outcomes. You compete with full intensity precisely because you're not enslaved by results. Wins and losses inform but don't define you. This freedom paradoxically makes you more dangerous as a competitor — you play loose, creative, and fearless.",
      advanced: "You've made significant progress in separating your identity from your results. Most of the time, you can compete freely without the weight of outcome anxiety. In the biggest moments or against certain opponents, traces of attachment may surface. Keep practicing surrender.",
      solid: "You intellectually understand non-attachment but still feel the emotional pull of outcomes during competition. Fear of losing can restrict your game in key moments. You're learning to see results as data, but your ego still invests heavily in wins and losses.",
      developing: "Results still significantly impact your emotional state and self-image. Losing feels personal, and the need to win can create tension that undermines performance. You're becoming aware of this pattern, which is the beginning of change. Practice competing for the joy of expression.",
      low: "Your identity is currently deeply intertwined with your results. Winning feels essential to self-worth, and losing triggers strong negative emotions. This attachment creates enormous internal pressure. Begin exploring: who are you beyond your results? This question holds transformative power.",
    },
  },
  {
    id: "courage",
    title: "Courage & Authentic Expression",
    subtitle: "How fully do I express my true game under pressure?",
    emoji: "🦁",
    color: "#F59E0B",
    shortName: "Courage",
    questions: [
      "Choosing courage over safety",
      "Trusting my game on big points",
      "Expressing my natural playing style",
      "Embracing challenges with openness",
      "Boldness vs defensive mindset under pressure",
    ],
    feedback: {
      mastery: "You are a true warrior of authentic expression. Under pressure, you don't shrink — you expand. Your natural game flows freely in the biggest moments because you've learned that playing safe is the real risk. Your courage inspires others and defines your competitive identity.",
      advanced: "You consistently choose bold play over safe play and trust your instincts in crucial moments. Your authentic style comes through clearly in competition. Occasionally, in unfamiliar or extremely high-stakes situations, you may hold back slightly. Push into those edges.",
      solid: "You play your game well in comfortable situations but may shift to a more conservative style under high pressure. You recognize the pattern of 'playing not to lose' and are actively working to trust yourself in big moments. Your courage muscle is growing.",
      developing: "Under pressure, the tendency to play safe and protect rather than express and attack is still dominant. Fear of failure drives strategic decisions more than confidence does. Start small — commit to one courageous shot per game, regardless of outcome.",
      low: "Fear currently governs most of your competitive choices. You play well below your training level in matches because self-protection overrides self-expression. This is common and changeable. Courage isn't the absence of fear — it's playing your game despite the fear.",
    },
  },
  {
    id: "responsibility",
    title: "Responsibility & Inner Ownership",
    subtitle: "How strongly do I own my growth, choices, and development?",
    emoji: "⚡",
    color: "#EF4444",
    shortName: "Ownership",
    questions: [
      "Taking responsibility for performance",
      "Avoiding blame or excuses",
      "Working on controllables consistently",
      "Seeing challenges as growth opportunities",
      "Self-discipline and respect for personal potential",
    ],
    feedback: {
      mastery: "You are the undisputed CEO of your athletic journey. Everything — preparation, performance, recovery, mindset — is owned completely. You waste zero energy on blame, excuses, or external complaints. Every obstacle becomes fuel. Your discipline and accountability set a standard for those around you.",
      advanced: "You take strong ownership of your development and performance. Excuses are rare, and when they surface, you catch them quickly. Your work ethic and self-discipline are consistent. Occasionally, external frustrations may distract you. Deepen your commitment to radical ownership.",
      solid: "You generally take responsibility for your performance and maintain decent training discipline. Under frustration, you may sometimes look outward — at conditions, opponents, or luck. You're developing the habit of asking 'What can I control?' as your default response.",
      developing: "Blame and excuses still play a role in how you process difficult performances. External factors — umpires, conditions, opponents — receive too much of your attention. You're beginning to see the power of focusing on controllables. Make this shift a daily practice.",
      low: "Currently, much of your energy goes toward external attribution. When things go wrong, the default is to look outward rather than inward. This pattern keeps you stuck because you can't improve what you don't own. Start with one simple question after every match: 'What could I have done differently?'",
    },
  },
  {
    id: "humility",
    title: "Humility & Growth Mindset",
    subtitle: "How deeply am I open to learning and continuous improvement?",
    emoji: "🌱",
    color: "#10B981",
    shortName: "Humility",
    questions: [
      "Learning from every match",
      "Receiving feedback without ego resistance",
      "Staying humble in success",
      "Staying open-minded regardless of results",
      "Commitment to evolving as a human and athlete",
    ],
    feedback: {
      mastery: "You embody the beginner's mind of a true master. No matter how much you've achieved, every match, every practice, every conversation is an opportunity to learn. Feedback is received as a gift, not a threat. Your humility creates an ever-expanding capacity for growth that has no ceiling.",
      advanced: "Your growth mindset is well-established and genuine. You actively seek feedback and learn from both wins and losses. Success doesn't breed complacency. Occasionally, ego may subtly filter certain feedback. Stay curious about your blind spots — they're where the deepest growth lives.",
      solid: "You're generally open to learning and improvement, and you handle most feedback well. After strong wins, maintaining the learning focus can be challenging. After tough losses, ego defense may delay the learning process. Keep cultivating the habit of curiosity over judgment.",
      developing: "Ego resistance to feedback is still a significant factor. Criticism may feel like an attack, and success can create a false sense of 'having arrived.' You're beginning to see that humility and confidence aren't opposites — they're partners. Lean into this understanding.",
      low: "Currently, the ego is heavily guarding against perceived threats to self-image. Feedback is filtered, losses are explained away, and growth is limited by defensiveness. This is perhaps the most important quality to develop — everything else opens up when you become genuinely coachable.",
    },
  },
  {
    id: "power",
    title: "Inner Power & Alignment",
    subtitle: "How connected am I to my inner source of strength?",
    emoji: "💎",
    color: "#7C3AED",
    shortName: "Power",
    questions: [
      "Accessing internal power independent of score",
      "Connection to breath, values, inner compass",
      "Calmness leading to natural performance flow",
      "Trusting the journey during difficult phases",
      "Freedom from needing to prove myself",
    ],
    feedback: {
      mastery: "You have found the source within. Your power doesn't come from the scoreboard, from external validation, or from proving anything — it comes from deep alignment with your values, your breath, and your purpose. In your most centered moments, performance flows effortlessly because you're not fighting yourself.",
      advanced: "You have strong access to your inner resources and can draw on them in most situations. Your connection to breath and values provides a reliable anchor. During extended difficult phases, maintaining this connection may require conscious effort. Trust the process — you're close to effortless alignment.",
      solid: "You've experienced moments of deep alignment and flow, and you know what it feels like. Consistently accessing this state is the challenge. External results still influence your sense of internal power. Keep building the bridge between your values and your daily performance habits.",
      developing: "Your sense of power is still largely tied to external indicators — scores, rankings, validation from others. You're beginning to glimpse that real strength comes from within, but this understanding is more intellectual than embodied. Daily practices connecting you to breath and values will accelerate this journey.",
      low: "The need to prove yourself currently drives most of your competitive energy. Power is sought externally — through winning, through recognition, through validation. This is exhausting and fragile. The journey inward, toward your own source of strength, is the most important journey you'll ever take as an athlete.",
    },
  },
];

/* ────────────────────────────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────────────────────────────── */

type FeedbackKey = "mastery" | "advanced" | "solid" | "developing" | "low";

const getLevel = (score: number): { label: string; key: FeedbackKey; bg: string; fg: string } => {
  if (score >= 86) return { label: "Mastery",    key: "mastery",    bg: "#F3E8FF", fg: "#7C3AED" };
  if (score >= 71) return { label: "Advanced",   key: "advanced",   bg: "#DBEAFE", fg: "#3B82F6" };
  if (score >= 51) return { label: "Solid",      key: "solid",      bg: "#D1FAE5", fg: "#059669" };
  if (score >= 21) return { label: "Developing", key: "developing", bg: "#FEF3C7", fg: "#D97706" };
  return             { label: "Low",         key: "low",        bg: "#FEE2E2", fg: "#DC2626" };
};

const getArchetype = (overall: number) => {
  if (overall >= 86) return { title: "True Mastery",         icon: "🏆", desc: "Identity-free, pressure-free, pure expression. You compete from a place of deep alignment, where performance flows naturally from inner stillness. You are not defined by your results — you are defined by your presence." };
  if (overall >= 71) return { title: "High-Level Performer", icon: "⭐", desc: "Stable, conscious, and ready for breakthrough. You've built strong mental foundations and compete with genuine awareness. The path to mastery is clear — continue deepening your practice and trust the process." };
  if (overall >= 51) return { title: "Solid Competitive Mind", icon: "💪", desc: "Growing, consistent, with clear areas for refinement. You understand the mental game and are actively developing it. Focus on the sections with the lowest scores — they represent your greatest leverage points." };
  if (overall >= 21) return { title: "Developing Awareness", icon: "🌅", desc: "Potential is clearly present, but dependency on external factors is still strong. You're at the beginning of an incredible inner journey. The awareness you're building right now is the foundation for everything that follows." };
  return               { title: "Ego-Based Performer",    icon: "🔥", desc: "Currently outcome-driven, reactive, and emotionally volatile. This isn't a judgment — it's a starting point. Every great champion started somewhere. The fact that you're taking this assessment shows readiness for change." };
};

const buildNarrative = (sectionResults: SectionResult[]) => {
  const sorted = [...sectionResults].sort((a, b) => b.avg - a.avg);
  const top2 = sorted.slice(0, 2);
  const bot2 = sorted.slice(-2).reverse();
  const overall = sectionResults.reduce((s, r) => s + r.avg, 0) / sectionResults.length;
  const range = sorted[0].avg - sorted[sorted.length - 1].avg;

  let text = `Your overall Self Mastery score is ${Math.round(overall)}%, placing you in the "${getArchetype(overall).title}" archetype. `;
  text += `Your greatest strengths are ${top2[0].title} (${Math.round(top2[0].avg)}%) and ${top2[1].title} (${Math.round(top2[1].avg)}%), which form the core of your competitive mental game. `;
  text += `Your most impactful growth opportunities lie in ${bot2[0].title} (${Math.round(bot2[0].avg)}%) and ${bot2[1].title} (${Math.round(bot2[1].avg)}%). Focusing here will unlock the most significant gains in your overall performance.`;

  if (range <= 15) {
    text += " Your profile shows excellent balance across all dimensions — no single area is dramatically different from the others, suggesting a well-rounded approach to mental training.";
  } else if (range <= 30) {
    text += " Your profile shows moderate variation between areas, which is typical. Continue building on your strengths while giving focused attention to your development areas.";
  } else {
    text += " Your profile shows significant variation between your strongest and weakest areas. This gap represents a powerful opportunity: targeted work on your lower-scoring dimensions will create a more integrated and resilient competitive mindset.";
  }
  return text;
};

/* ────────────────────────────────────────────────────────────────────
   TYPES
   ──────────────────────────────────────────────────────────────────── */

interface SectionResult {
  id: string;
  title: string;
  shortName: string;
  avg: number;
  questionScores: number[];
}


/* ────────────────────────────────────────────────────────────────────
   CIRCULAR PROGRESS
   ──────────────────────────────────────────────────────────────────── */

const CircleScore = ({ value, color, size = 160 }: { value: number; color: string; size?: number }) => {
  const sw = 10;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }} />
    </svg>
  );
};

/* ────────────────────────────────────────────────────────────────────
   SCREENS
   ──────────────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────────────────
   GATE SCREEN
   ──────────────────────────────────────────────────────────────────── */

const GateScreen = ({ onAccess }: { onAccess: (type: "quiz" | "consultation") => void }) => {
  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode]         = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading]   = useState<"consultation" | "quiz" | "code" | null>(null);
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
      onAccess("quiz");
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
    accent: string,
  ) => (
    <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "2px solid #E2E8F0", display: "flex", flexDirection: "column", flex: 1, opacity: 0.55, filter: "grayscale(0.3)" }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#94A3B8", marginBottom: 4 }}>{price}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#64748B", marginBottom: 20, lineHeight: 1.5 }}>{subtitle}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 8 }}>
        {perks.map((p) => (
          <li key={p} style={{ fontSize: 14, color: "#94A3B8", display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: "#CBD5E1", fontWeight: 700, flexShrink: 0 }}>✓</span> {p}
          </li>
        ))}
      </ul>
      <button
        disabled
        style={{ marginTop: "auto", padding: "14px 0", fontSize: 15, fontWeight: 600, color: "#fff", background: "#CBD5E1", border: "none", borderRadius: 50, cursor: "not-allowed" }}
      >
        Coming Soon
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)" }}>
      <div style={{ textAlign: "center", maxWidth: 680, width: "100%" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#151716", marginBottom: 8, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
          Choose Your Experience
        </h1>
        <p style={{ fontSize: 16, color: "#3a4a3a", marginBottom: 36, lineHeight: 1.6 }}>
          Select the option that fits you best to unlock your Self Mastery Profile.
        </p>

        {/* Cards */}
        <div style={{ display: "flex", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
          {card("consultation", "£75", "Full Experience", "Questionnaire + 30-min consultation call with Andrew", [
            "Complete Self Mastery Profile (35 questions)",
            "Personal radar chart & archetype",
            "30-min 1-on-1 consultation with Andrew",
            "Personalised action plan",
          ], "#377A00")}
          {card("quiz", "£25", "Assessment Only", "Questionnaire & full personalised report", [
            "Complete Self Mastery Profile (35 questions)",
            "Personal radar chart & archetype",
            "Detailed feedback per dimension",
          ], "#6366F1")}
        </div>

        {/* Code option */}
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(4px)" }}>
          {!codeOpen ? (
            <button
              onClick={() => { setCodeOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#64748B", textDecoration: "underline" }}
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
          Want to know more about the SMP and how it was created?{" "}
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
};

const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "linear-gradient(135deg, #EAF7EB 0%, #e2ecdf 60%, #EAF7EB 100%)" }}>
    <div style={{ textAlign: "center", maxWidth: 560 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#151716", lineHeight: 1.2, marginBottom: 8, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
        Self Mastery Profile
      </h1>
      <p style={{ fontSize: 16, color: "#377A00", fontWeight: 600, marginBottom: 24, letterSpacing: 1.5, textTransform: "uppercase" }}>
        Advanced Athlete Diagnostic
      </p>
      <p style={{ fontSize: 17, color: "#3a4a3a", lineHeight: 1.7, marginBottom: 12 }}>
        Discover your mental performance profile across 7 core dimensions. Rate yourself honestly on 35 qualities to reveal your strengths, growth areas, and unique competitor archetype.
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 6, background: "#fff", borderRadius: 12, padding: "16px 24px", marginBottom: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", textAlign: "left", fontSize: 14, color: "#555" }}>
        <span><strong style={{ color: "#EF4444" }}>0–20%</strong> Low</span>
        <span><strong style={{ color: "#F59E0B" }}>21–50%</strong> Emerging</span>
        <span><strong style={{ color: "#10B981" }}>51–70%</strong> Solid foundation</span>
        <span><strong style={{ color: "#3B82F6" }}>71–85%</strong> Advanced</span>
        <span><strong style={{ color: "#377A00" }}>86–100%</strong> Mastery</span>
      </div>
      <br />
      <button
        onClick={onStart}
        style={{ padding: "16px 48px", fontSize: 17, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #377A00, #2f6a00)", border: "none", borderRadius: 50, cursor: "pointer", boxShadow: "0 4px 14px rgba(55,122,0,0.35)", transition: "transform 0.15s, box-shadow 0.15s" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(55,122,0,0.45)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(55,122,0,0.35)"; }}
      >
        Begin Assessment
      </button>
    </div>
  </div>
);

const QuizScreen = ({
  section, sectionIndex, answers, onAnswer, onNext, onPrev, onFinish, totalSections,
}: {
  section: typeof SECTIONS[0]; sectionIndex: number; answers: Record<number, number>;
  onAnswer: (idx: number, val: number) => void; onNext: () => void; onPrev: () => void;
  onFinish: () => void; totalSections: number;
}) => {
  const baseIdx = sectionIndex * 5;
  const progress = ((sectionIndex + 1) / totalSections) * 100;
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === totalSections - 1;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ height: 4, background: "#E5E7EB" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, #6366F1, ${section.color})`, transition: "width 0.4s", borderRadius: "0 2px 2px 0" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px" }}>
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>Section {sectionIndex + 1} of {totalSections}</span>
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{Math.round(progress)}% complete</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "32px 20px 100px" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 48 }}>{section.emoji}</span>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1E293B", marginTop: 8, marginBottom: 6 }}>{section.title}</h2>
            <p style={{ fontSize: 15, color: "#64748B", fontStyle: "italic" }}>{section.subtitle}</p>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F1F5F9", overflow: "hidden" }}>
            {section.questions.map((q, qi) => {
              const idx = baseIdx + qi;
              const val = answers[idx];
              return (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: qi < section.questions.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <p style={{ fontSize: 15, color: "#334155", fontWeight: 500, flex: 1, paddingRight: 16, lineHeight: 1.6, margin: 0 }}>{qi + 1}. {q}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <input
                      type="number" min={0} max={100} step={1} value={val}
                      onChange={(e) => {
                        const n = Math.min(100, Math.max(0, Number(e.target.value)));
                        onAnswer(idx, isNaN(n) ? 0 : n);
                      }}
                      style={{ width: 64, fontSize: 20, fontWeight: 700, color: section.color, border: `2px solid ${section.color}44`, borderRadius: 8, padding: "4px 6px", textAlign: "center", outline: "none", background: "#F8FAFC" }}
                    />
                    <span style={{ fontSize: 18, fontWeight: 600, color: section.color }}>%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: isFirst ? "flex-end" : "space-between", marginTop: 40, gap: 16 }}>
            {!isFirst && (
              <button onClick={onPrev} style={{ padding: "14px 32px", fontSize: 15, fontWeight: 600, color: "#64748B", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 50, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                ← Previous
              </button>
            )}
            <button onClick={isLast ? onFinish : onNext}
              style={{ padding: "14px 36px", fontSize: 15, fontWeight: 600, color: "#fff", background: isLast ? "linear-gradient(135deg, #6366F1, #7C3AED)" : section.color, border: "none", borderRadius: 50, cursor: "pointer", boxShadow: `0 4px 14px ${section.color}55`, transition: "transform 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {isLast ? "See My Results →" : "Next Section →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsScreen = ({ sectionResults, overall, accessType }: { sectionResults: SectionResult[]; overall: number; accessType: "quiz" | "consultation" }) => {
  const archetype = getArchetype(overall);
  const overallLevel = getLevel(overall);
  const chartData = sectionResults.map((r) => ({ subject: r.shortName, value: Math.round(r.avg), fullMark: 100 }));
  const narrative = buildNarrative(sectionResults);

  const ChartTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; payload: { subject: string } }[] }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: "#fff", padding: "8px 14px", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.12)", fontSize: 14, color: "#1E293B", fontWeight: 600 }}>
        {payload[0].payload.subject}: {payload[0].value}%
      </div>
    );
  };

  const AxisLabel = ({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) => {
    const sec = SECTIONS.find((s) => s.shortName === payload?.value);
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fontWeight: 600, fill: sec?.color || "#64748B" }}>
        {payload?.value}
      </text>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 14, color: "#7C3AED", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your Results</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>Self Mastery Profile</h1>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 32 }}>
          <div style={{ position: "relative", marginBottom: 20 }}>
            <CircleScore value={overall} color={overallLevel.fg} size={160} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#1E293B" }}>{Math.round(overall)}</span>
              <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>/ 100</span>
            </div>
          </div>
          <span style={{ fontSize: 32, marginBottom: 4 }}>{archetype.icon}</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>{archetype.title}</h2>
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, maxWidth: 500 }}>{archetype.desc}</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: "28px 16px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", textAlign: "center", marginBottom: 8 }}>Mastery Dimensions</h3>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={chartData} outerRadius="75%">
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={<AxisLabel />} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#CBD5E1" }} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.18} strokeWidth={2} animationDuration={1200} dot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }} />
              <Tooltip content={<ChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", marginBottom: 12 }}>📋 Profile Summary</h3>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>{narrative}</p>
        </div>

        {accessType === "consultation" && (
          <div style={{ background: "linear-gradient(135deg, #2c6300 0%, #377A00 60%, #4a9900 100%)", borderRadius: 24, padding: "36px 32px", textAlign: "center", marginBottom: 32 }}>
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

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
          {sectionResults.map((r) => {
            const lvl = getLevel(r.avg);
            const sec = SECTIONS.find((s) => s.id === r.id)!;
            return (
              <div key={r.id} style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderLeft: `4px solid ${sec.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{sec.emoji}</span>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: "#1E293B" }}>{sec.title}</h4>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: lvl.fg, background: lvl.bg, padding: "3px 12px", borderRadius: 20 }}>{lvl.label}</span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: sec.color }}>{Math.round(r.avg)}%</span>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "#F1F5F9", marginBottom: 14 }}>
                  <div style={{ height: "100%", width: `${r.avg}%`, borderRadius: 3, background: `linear-gradient(90deg, ${sec.color}88, ${sec.color})`, transition: "width 0.8s" }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {sec.questions.map((_, qi) => (
                    <span key={qi} style={{ fontSize: 12, color: "#64748B", background: "#F8FAFC", padding: "4px 10px", borderRadius: 8, border: "1px solid #F1F5F9" }}>
                      Q{qi + 1}: {r.questionScores[qi]}%
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75 }}>{sec.feedback[lvl.key]}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────
   MAIN
   ──────────────────────────────────────────────────────────────────── */

export default function SelfMasteryProfileQuiz() {
  const router      = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase]           = useState<"loading" | "quiz" | "results">("loading");
  const [accessType, setAccessType] = useState<"quiz" | "consultation">("quiz");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers]       = useState<Record<number, number>>(() =>
    Object.fromEntries(Array.from({ length: 35 }, (_, i) => [i, 0]))
  );
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const access    = searchParams.get("access") as "quiz" | "consultation" | null;
    const sessionId = searchParams.get("session_id");
    const viaCode   = searchParams.get("via") === "code";

    if (!access) { router.replace("/self-mastery-profile/checkout"); return; }

    // Access code flow — already validated by checkout page
    if (viaCode) {
      setAccessType(access);
      setPhase("quiz");
      return;
    }

    // Stripe payment flow — verify session
    if (sessionId) {
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((r) => r.json())
        .then(({ valid }: { valid: boolean }) => {
          if (valid) {
            setAccessType(access);
            setPhase("quiz");
          } else {
            router.replace("/self-mastery-profile/checkout");
          }
        });
      return;
    }

    router.replace("/self-mastery-profile/checkout");
  }, [searchParams, router]);

  const sectionResults = useMemo<SectionResult[]>(
    () => SECTIONS.map((sec, si) => {
      const scores = sec.questions.map((_, qi) => answers[si * 5 + qi]);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return { id: sec.id, title: sec.title, shortName: sec.shortName, avg, questionScores: scores };
    }),
    [answers]
  );

  const overall = useMemo(
    () => sectionResults.reduce((s, r) => s + r.avg, 0) / sectionResults.length,
    [sectionResults]
  );

  const transition = (cb: () => void) => {
    setFade(false);
    setTimeout(() => { cb(); setFade(true); }, 250);
  };

  const handleNext   = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setSectionIdx((i) => i + 1)); };
  const handlePrev   = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setSectionIdx((i) => i - 1)); };
  const handleFinish = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setPhase("results")); };
  const handleAnswer = (idx: number, val: number) => setAnswers((prev) => ({ ...prev, [idx]: val }));

  if (phase === "loading") {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#EAF7EB" }}><span style={{ color: "#377A00", fontSize: 18 }}>Loading…</span></div>;
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', opacity: fade ? 1 : 0, transition: "opacity 0.25s ease", minHeight: "100vh" }}>
      {phase === "quiz" && (
        <QuizScreen
          section={SECTIONS[sectionIdx]} sectionIndex={sectionIdx} totalSections={SECTIONS.length}
          answers={answers} onAnswer={handleAnswer} onNext={handleNext} onPrev={handlePrev} onFinish={handleFinish}
        />
      )}
      {phase === "results" && <ResultsScreen sectionResults={sectionResults} overall={overall} accessType={accessType} />}
    </div>
  );
}
