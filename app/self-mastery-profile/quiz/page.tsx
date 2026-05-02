"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
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
    color: "#2D5A8E",
    shortName: "Calm",
    questions: [
      "I remain mentally calm under pressure",
      "I maintain emotional stability after making a mistake",
      "I quickly return to my optimal mental state after a breakdown",
      "I remain cantered and focused in chaotic or unpredictable situations",
      "I maintain composure independent of outcome"
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
    color: "#2D5A8E",
    shortName: "Presence",
    questions: [
      "I stay present, point by point",
      "I mentally reset between points",
      "I use my breath (centring) after every point to stay grounded during the match",
      "I maintain awareness of the present moment rather than the past or future",
      "I maintain calmness and focused mental state during performance"
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
    color: "#2D5A8E",
    shortName: "Freedom",
    questions: [
      "Independence from needing to win",
      "I have the ability to give full effort without outcome obsession",
      "I see results as information rather than a reflection of who I am",
      "I perform without fear of losing",
      "I am free from others' opinions and expectations"
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
    color: "#2D5A8E",
    shortName: "Courage",
    questions: [
     "I go for my shots rather than trying to avoid mistakes",
     "I trust my game in high-pressure moments",
     "I easily play my game regardless of external conditions",
     "I embrace challenges with openness",
     "I maintain confidence, even when I am losing by a large margin"
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
    subtitle: "How much do I feel responsible for my choices and what happens in my life?",
    emoji: "⚡",
    color: "#2D5A8E",
    shortName: "Ownership",
    questions: [
      "I take full responsibility for my performance",
      "I avoid blaming others or making excuses for my performance",
      "I consistently focus on what I can control during performance",
      "I view challenges as opportunities for growth",
      "I act with discipline and respect for my potential"

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
    subtitle: "How open and willing am I to learn and continuously improve?",
    emoji: "🌱",
    color: "#2D5A8E",
    shortName: "Humility",
    questions: [
      "I learn from every match I play",
      "I accept feedback without being defensive",
      "I remain kind and humble in success",
      "I quickly move on from both losses and wins and return to training the next day",
      "I am committed to continuous growth as an athlete and as a person"

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
    color: "#2D5A8E",
    shortName: "Power",
    questions: [
      "My actions are consistent with my words.",
      "My self-discipline does not depend on external motivation",
      "I know what I want",
      "Even against much stronger opponents, I feel and play as if I can win",
      "I trust the process regardless of what happens"

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
   QUIZ SCREEN
   ──────────────────────────────────────────────────────────────────── */
const QuizScreen = ({
  section, sectionIndex, answers, onAnswer, onNext, onPrev, onFinish, totalSections,
}: {
  section: typeof SECTIONS[0]; sectionIndex: number; answers: Record<number, number>;
  onAnswer: (idx: number, val: number) => void; onNext: () => void; onPrev: () => void;
  onFinish: () => void; totalSections: number;
}) => {
  const baseIdx = sectionIndex * 5;
  const progress = (sectionIndex / totalSections) * 100;
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === totalSections - 1;
  const advanceRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Small delay so the fade-in transition completes before focusing
    const t = setTimeout(() => firstInputRef.current?.focus(), 280);
    return () => clearTimeout(t);
  }, [sectionIndex]);

  const sectionAnswers = Array.from({ length: 5 }, (_, i) => answers[baseIdx + i]);
  const allAnswered = sectionAnswers.every((v) => v !== undefined && v !== 0);
  const unanswered = sectionAnswers.map((v, i) => (v === undefined || v === 0 ? baseIdx + i : null)).filter((v) => v !== null);
  const [showError, setShowError] = useState(false);

  const handleAdvance = () => {
    if (!allAnswered) { setShowError(true); return; }
    setShowError(false);
    isLast ? onFinish() : onNext();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EEF2F7 0%, #E4EAF2 60%, #EEF2F7 100%)", display: "flex", flexDirection: "column" }}>

      {/* Progress bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #CBD5E1" }}>
        <div style={{ height: 3, background: "#CBD5E1" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #2D5A8E, #1E3D6B)", transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px" }}>
          <span style={{ fontSize: 12, color: "#2D5A8E", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>Section {sectionIndex + 1} of {totalSections}</span>
          <span style={{ fontSize: 12, color: "#2D5A8E", fontWeight: 600 }}>{Math.round(progress)}% complete</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "32px 20px 100px" }}>
        <div style={{ width: "100%", maxWidth: 680 }}>

          {/* Section card */}
          <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 4px 32px rgba(30,61,107,0.10)", overflow: "hidden", marginBottom: 24 }}>

            {/* Header band */}
            <div style={{ background: "linear-gradient(135deg, #1E3D6B 0%, #2D5A8E 100%)", padding: "1.75rem 2rem" }}>
              <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#93C5FD", margin: "0 0 4px" }}>
                Dimension {sectionIndex + 1} · {section.title}
              </p>
              <p style={{ fontSize: 20, color: "#fff", fontWeight: 600, fontStyle: "italic", margin: "6px 0 0", lineHeight: 1.5, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>{section.subtitle}</p>
            </div>

            {/* Questions */}
            {section.questions.map((q, qi) => {
              const idx = baseIdx + qi;
              const val = answers[idx];
              return (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: qi < section.questions.length - 1 ? "1px solid #EEF2F7" : "none", background: showError && unanswered.includes(idx) ? "#FEF2F2" : "transparent" }}>
                  <p style={{ fontSize: 15, color: "#334155", fontWeight: 500, flex: 1, paddingRight: 16, lineHeight: 1.6, margin: 0 }}>{qi + 1}. {q}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <input
                      ref={qi === 0 ? firstInputRef : undefined}
                      type="number" min={0} max={100} step={1}
                      value={val === 0 ? "" : val}
                      placeholder=""
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === "") { onAnswer(idx, 0); return; }
                        const n = Math.min(100, Math.max(0, Number(raw)));
                        onAnswer(idx, isNaN(n) ? 0 : n);
                        setShowError(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Tab" && qi === 4) {
                          e.preventDefault();
                          advanceRef.current?.focus();
                        }
                      }}
                      style={{ width: 64, fontSize: 20, fontWeight: 700, color: "#2D5A8E", border: `2px solid ${showError && unanswered.includes(idx) ? "#FCA5A5" : "#BFDBFE"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center", outline: "none", background: "#EEF2F7" }}
                    />
                    <span style={{ fontSize: 16, fontWeight: 600, color: "#2D5A8E" }}>%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          {showError && (
            <p style={{ fontSize: 13, color: "#EF4444", marginBottom: 12, textAlign: "right" }}>
              Please fill in all questions before continuing.
            </p>
          )}
          <div style={{ display: "flex", justifyContent: isFirst ? "flex-end" : "space-between", gap: 16 }}>
            {!isFirst && (
              <button onClick={onPrev} style={{ padding: "14px 32px", fontSize: 15, fontWeight: 600, color: "#2D5A8E", background: "#fff", border: "1.5px solid #CBD5E1", borderRadius: 50, cursor: "pointer" }}>
                ← Previous
              </button>
            )}
            <button ref={advanceRef} onClick={handleAdvance}
              style={{ padding: "14px 36px", fontSize: 15, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #1E3D6B, #2D5A8E)", border: "none", borderRadius: 50, cursor: "pointer", boxShadow: "0 4px 14px rgba(30,61,107,0.30)" }}
            >
              {isLast ? "See My Results →" : "Next Section →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────
   PROFILE FORM
   ──────────────────────────────────────────────────────────────────── */

interface ProfileData {
  // Identity
  name: string; email: string;
  // Demographic
  age: string; genderIdentity: string; genderSelfDescribe: string;
  nationality: string; educationLevel: string;
  // Sport-specific
  sport: string; sportType: string;
  competitiveLevel: string; yearsExperience: string; weeklyTrainingHours: string;
  // Psychological background
  hasMentalCoaching: string; mentalCoachingDuration: string;
  hasMindfulnessPractice: string; mindfulnessDuration: string;
  // Performance context
  competitiveStatus: string; recentResultOrRanking: string; seasonStatus: string;
  // Optional
  allowRecontact: string; promptedBy: string;
  // Consent
  consent: boolean;
}

const EMPTY_PROFILE: ProfileData = {
  name: "", email: "",
  age: "", genderIdentity: "", genderSelfDescribe: "",
  nationality: "", educationLevel: "",
  sport: "", sportType: "",
  competitiveLevel: "", yearsExperience: "", weeklyTrainingHours: "",
  hasMentalCoaching: "", mentalCoachingDuration: "",
  hasMindfulnessPractice: "", mindfulnessDuration: "",
  competitiveStatus: "", recentResultOrRanking: "", seasonStatus: "",
  allowRecontact: "", promptedBy: "",
  consent: false,
};

const profileInputStyle: React.CSSProperties = { padding: "9px 13px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", background: "#F8FAFC", color: "#1E293B", width: "100%", boxSizing: "border-box" };
const profileLabelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 4, display: "block" };

const sectionHeading = (label: string) => (
  <div style={{ borderBottom: "2px solid #EAF7EB", paddingBottom: 8, marginTop: 8 }}>
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#377A00", margin: 0 }}>{label}</p>
  </div>
);

const ProfileField = ({ id, label, type = "text", placeholder = "", required = false, value, onChange }: {
  id: keyof ProfileData; label: string; type?: string; placeholder?: string; required?: boolean;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label htmlFor={id} style={profileLabelStyle}>{label}{required && <span style={{ color: "#EF4444" }}> *</span>}</label>
    <input id={id} type={type} value={value} placeholder={placeholder} required={required} onChange={onChange} style={profileInputStyle} />
  </div>
);

const ProfileSelect = ({ id, label, options, required = false, value, onChange }: {
  id: keyof ProfileData; label: string; options: string[]; required?: boolean;
  value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label htmlFor={id} style={profileLabelStyle}>{label}{required && <span style={{ color: "#EF4444" }}> *</span>}</label>
    <select id={id} value={value} onChange={onChange} required={required} style={profileInputStyle}>
      <option value="">—</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

// ProfileFormScreen hidden — data collection disabled
const ProfileFormScreen = ({
  sectionResults, overall, accessType, onSubmit,
}: {
  sectionResults: SectionResult[]; overall: number; accessType: "quiz" | "consultation";
  onSubmit: (profile: ProfileData) => void;
}) => {
  const [form, setForm] = useState<ProfileData>(EMPTY_PROFILE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (id: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [id]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.consent) { setError("Please confirm informed consent to proceed."); return; }
    setSubmitting(true);
    setError("");
    const participantId = `HPP-${Date.now().toString(36).toUpperCase()}`;
    const payload = { profile: { ...form, participantId }, sectionResults, overall, accessType };
    try {
      await fetch("/api/save-results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {
      setError("Could not save to server, but your results are shown below.");
    }
    onSubmit(form);
  };

  const col2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };
  const col3: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "right", marginBottom: 8 }}>
          <button type="button" onClick={() => onSubmit(EMPTY_PROFILE)}
            style={{ background: "none", border: "none", fontSize: 13, color: "#94A3B8", cursor: "pointer", padding: "4px 0", textDecoration: "underline" }}>
            Skip this step →
          </button>
        </div>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1E293B", marginBottom: 8, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
            Complete Your Profile
          </h1>
          <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            This information helps contextualise your results and contributes to ongoing research. Fields marked <span style={{ color: "#EF4444" }}>*</span> are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* ── Identity ── */}
          {sectionHeading("Identity")}
          <div style={col2}>
            <ProfileField id="name" label="Full Name" required placeholder="Your name" value={form.name} onChange={set("name")} />
            <ProfileField id="email" label="Email" type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} />
          </div>

          {/* ── Demographic ── */}
          {sectionHeading("Demographic")}
          <div style={col3}>
            <ProfileField id="age" label="Age" type="number" placeholder="e.g. 28" value={form.age} onChange={set("age")} />
            <ProfileSelect id="genderIdentity" label="Gender Identity" options={["Male", "Female", "Non-binary", "Self-describe", "Prefer not to say"]} value={form.genderIdentity} onChange={set("genderIdentity")} />
            <ProfileField id="nationality" label="Nationality" placeholder="e.g. British" value={form.nationality} onChange={set("nationality")} />
          </div>
          {form.genderIdentity === "Self-describe" && (
            <ProfileField id="genderSelfDescribe" label="Please describe" placeholder="Your gender identity" value={form.genderSelfDescribe} onChange={set("genderSelfDescribe")} />
          )}
          <ProfileSelect id="educationLevel" label="Education Level" options={["Secondary school", "Undergraduate", "Postgraduate / Master's", "Doctoral / PhD", "Vocational / Trade", "Other"]} value={form.educationLevel} onChange={set("educationLevel")} />

          {/* ── Sport-specific ── */}
          {sectionHeading("Sport-Specific")}
          <div style={col2}>
            <ProfileField id="sport" label="Primary Sport" placeholder="e.g. Tennis" value={form.sport} onChange={set("sport")} />
            <ProfileSelect id="sportType" label="Sport Type" options={["Individual", "Team", "Both"]} value={form.sportType} onChange={set("sportType")} />
          </div>
          <div style={col2}>
            <ProfileField id="yearsExperience" label="Years of Experience" type="number" placeholder="e.g. 10" value={form.yearsExperience} onChange={set("yearsExperience")} />
            <ProfileField id="weeklyTrainingHours" label="Weekly Training Hours" type="number" placeholder="e.g. 12" value={form.weeklyTrainingHours} onChange={set("weeklyTrainingHours")} />
          </div>
          <ProfileSelect id="competitiveLevel" label="Competitive Level" options={["Recreational", "Club / Amateur", "Regional", "National", "International", "Professional / Elite"]} value={form.competitiveLevel} onChange={set("competitiveLevel")} />

          {/* ── Psychological Background ── */}
          {sectionHeading("Psychological & Coaching Background")}
          <div style={col2}>
            <ProfileSelect id="hasMentalCoaching" label="Mental coaching / sport psychology support?" options={["Yes", "No"]} value={form.hasMentalCoaching} onChange={set("hasMentalCoaching")} />
            {form.hasMentalCoaching === "Yes" && (
              <ProfileSelect id="mentalCoachingDuration" label="For how long?" options={["Less than 3 months", "3–6 months", "6–12 months", "1–3 years", "More than 3 years"]} value={form.mentalCoachingDuration} onChange={set("mentalCoachingDuration")} />
            )}
          </div>
          <div style={col2}>
            <ProfileSelect id="hasMindfulnessPractice" label="Regular mindfulness / meditation practice?" options={["Yes", "No"]} value={form.hasMindfulnessPractice} onChange={set("hasMindfulnessPractice")} />
            {form.hasMindfulnessPractice === "Yes" && (
              <ProfileSelect id="mindfulnessDuration" label="For how long?" options={["Less than 6 months", "6–12 months", "1–3 years", "3–5 years", "More than 5 years"]} value={form.mindfulnessDuration} onChange={set("mindfulnessDuration")} />
            )}
          </div>

          {/* ── Performance Context ── */}
          {sectionHeading("Performance Context")}
          <div style={col3}>
            <ProfileSelect id="competitiveStatus" label="Current Status" options={["Active competitor", "Transitioning", "Retired", "Taking a break"]} value={form.competitiveStatus} onChange={set("competitiveStatus")} />
            <ProfileSelect id="seasonStatus" label="Season Status" options={["In-season", "Off-season", "Pre-season", "Non-applicable"]} value={form.seasonStatus} onChange={set("seasonStatus")} />
            <ProfileField id="recentResultOrRanking" label="Recent Result / Ranking" placeholder="e.g. #45 national, finalist" value={form.recentResultOrRanking} onChange={set("recentResultOrRanking")} />
          </div>

          {/* ── Optional ── */}
          {sectionHeading("Optional")}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="promptedBy" style={profileLabelStyle}>What prompted you to take this questionnaire?</label>
            <textarea id="promptedBy" value={form.promptedBy} rows={2} placeholder="e.g. Referred by coach, found it online, personal curiosity…"
              onChange={(e) => setForm((p) => ({ ...p, promptedBy: e.target.value }))}
              style={{ ...profileInputStyle, resize: "vertical" }} />
          </div>
          <ProfileSelect id="allowRecontact" label="May we contact you for follow-up research?" options={["Yes", "No"]} value={form.allowRecontact} onChange={set("allowRecontact")} />

          {/* ── Consent ── */}
          {sectionHeading("Informed Consent")}
          <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
              style={{ marginTop: 3, width: 16, height: 16, accentColor: "#377A00", flexShrink: 0 }} />
            <span>I confirm that I am completing this questionnaire voluntarily, that my responses may be used anonymously for research purposes, and that I can withdraw at any time. <span style={{ color: "#EF4444" }}>*</span></span>
          </label>

          {error && <p style={{ fontSize: 13, color: "#EF4444", margin: 0 }}>{error}</p>}

          <button type="submit" disabled={submitting}
            style={{ padding: "14px 0", fontSize: 15, fontWeight: 700, color: "#fff", background: submitting ? "#94b87a" : "linear-gradient(135deg, #377A00, #2f6a00)", border: "none", borderRadius: 50, cursor: submitting ? "not-allowed" : "pointer", marginTop: 8 }}>
            {submitting ? "Saving…" : "View My Results →"}
          </button>
        </form>
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
    <div className="results-root" style={{ minHeight: "100vh", background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 14, color: "#2D5A8E", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your Results</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>High Performance Profile</h1>
        </div>

        <div className="print-card" style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 32 }}>
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

        <div className="mastery-chart-card" style={{ background: "#fff", borderRadius: 24, padding: "28px 16px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", textAlign: "center", marginBottom: 8 }}>Profile Dimensions</h3>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={chartData} outerRadius="75%">
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={<AxisLabel />} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#CBD5E1" }} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="#2D5A8E" fill="#2D5A8E" fillOpacity={0.18} strokeWidth={2} animationDuration={1200} dot={{ r: 5, fill: "#2D5A8E", stroke: "#fff", strokeWidth: 2 }} />
              <Tooltip content={<ChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="profile-summary-card" style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", marginBottom: 12 }}>📋 Profile Summary</h3>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>{narrative}</p>
        </div>

        {accessType === "consultation" && (
          <div className="print-card" style={{ background: "linear-gradient(135deg, #1E3D6B 0%, #2D5A8E 100%)", borderRadius: 24, padding: "36px 32px", textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Book Your Consultation</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 24, maxWidth: 440, margin: "0 auto 24px" }}>
              You&apos;ve unlocked a 30-minute 1-on-1 session with Andrew. Use your results to guide the conversation.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/a-misiek23/30min"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "14px 40px", background: "#fff", color: "#2D5A8E", fontWeight: 700, fontSize: 16, borderRadius: 50, textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
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
              <div key={r.id} className="print-card" style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderLeft: `4px solid ${sec.color}` }}>
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

        {/* PDF Download */}
        <style>{`
          @page { margin: 1.6cm; size: A4; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .epas-no-print { display: none !important; }
            .results-root { min-height: 0 !important; padding: 0 !important; background: none !important; }
            .print-card { page-break-inside: avoid; }
            .mastery-chart-card { page-break-inside: avoid; overflow: hidden; display: flex; flex-direction: column; align-items: center; }
            .mastery-chart-card .recharts-responsive-container { height: 340px !important; width: 100% !important; }
            .mastery-chart-card .recharts-wrapper { height: 340px !important; margin: 0 auto; }
            .profile-summary-card { page-break-before: always; page-break-inside: avoid; }
            .print-stripe { display: none !important; }
          }
        `}</style>
        {/* White stripes — hidden on screen, fixed top/bottom on every printed page */}
        <div className="print-stripe" style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, height: "1.5cm", background: "#fff", zIndex: 9999 }} />
        <div className="print-stripe" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, height: "1.5cm", background: "#fff", zIndex: 9999 }} />

        <div className="epas-no-print" style={{ textAlign: "center", paddingBottom: 16 }}>
          <button
            onClick={() => {
              const prev = document.title;
              document.title = "High Performance Profile";
              window.print();
              document.title = prev;
            }}
            style={{
              padding: "14px 44px",
              background: "linear-gradient(135deg, #1E3D6B, #2D5A8E)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(30,61,107,0.25)",
              letterSpacing: 0.3,
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

function SelfMasteryProfileQuizInner() {
  const router      = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase]           = useState<"loading" | "quiz" | "profile" | "results">("loading");
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
  const handleFinish = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Send results via API (fire-and-forget — profile form is hidden so we pass an empty profile)
    fetch("/api/save-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: {
          participantId: `HPP-${Date.now()}`,
          name: "", email: "", age: "", genderIdentity: "", genderSelfDescribe: "",
          nationality: "", educationLevel: "", sport: "", sportType: "",
          competitiveLevel: "", yearsExperience: "", weeklyTrainingHours: "",
          hasMentalCoaching: "", mentalCoachingDuration: "", hasMindfulnessPractice: "",
          mindfulnessDuration: "", competitiveStatus: "", seasonStatus: "",
          recentResultOrRanking: "", promptedBy: "", allowRecontact: "",
        },
        sectionResults,
        overall,
        accessType,
      }),
    }).catch(console.error);
    transition(() => setPhase("results"));
  };
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

export default function SelfMasteryProfileQuiz() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#EAF7EB" }}><span style={{ color: "#377A00", fontSize: 18 }}>Loading…</span></div>}>
      <SelfMasteryProfileQuizInner />
    </Suspense>
  );
}
