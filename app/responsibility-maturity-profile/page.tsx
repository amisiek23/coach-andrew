"use client";

import { useState, useMemo } from "react";
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
    id: "emotional",
    title: "Emotional Responsibility",
    subtitle: "How consistently do I own my emotional reactions instead of blaming circumstances?",
    emoji: "🔶",
    color: "#F97316",
    shortName: "Emotional",
    questions: [
      "I take responsibility for regulating my emotions instead of blaming circumstances.",
      "I do not justify reactive behaviour by pointing to others' actions.",
      "When triggered, I ask: 'What is this teaching me about myself?'",
      "I recover quickly after emotional overreactions.",
      "I do not expect others to manage my emotional state.",
    ],
    feedback: {
      selfAuthoring: "Deep emotional ownership. You treat your reactions as data about yourself, not verdicts about others. Your capacity to regulate without blaming creates psychological safety for those around you — and an internal environment of clarity and growth.",
      conscious: "You take strong ownership of your emotions most of the time. Occasional lapses into blame are caught and corrected quickly. Continue deepening the pause-response gap — the space between stimulus and reaction is where your power lives.",
      conditional: "You understand emotional ownership intellectually but apply it inconsistently. Under stress or fatigue, external blame is still the default. Develop daily practices — journaling, breath work, check-ins — to build the muscle of consistent ownership.",
      externalizing: "Emotions are frequently attributed to others' actions or circumstances. Recovery is slow and often requires the triggering person to change first. Begin exploring the space between stimulus and response — that space belongs entirely to you.",
      reactive: "Your emotional world is largely experienced as something that happens to you rather than through you. Circumstances feel controlling and overwhelming. This is the most foundational area — even small shifts here will cascade into every other domain of your life.",
    },
  },
  {
    id: "professional",
    title: "Professional Responsibility",
    subtitle: "How fully do I own my professional trajectory, results, and growth?",
    emoji: "💼",
    color: "#EAB308",
    shortName: "Professional",
    questions: [
      "I focus on what I can control rather than complaining about the system.",
      "I proactively improve my skills instead of waiting for opportunities.",
      "When results are poor, I first examine my contribution.",
      "I hold myself accountable without needing external pressure.",
      "I manage my time and energy intentionally.",
    ],
    feedback: {
      selfAuthoring: "You are fully accountable for your professional trajectory. Results — good or bad — are owned completely. This makes you exceptionally coachable, resilient under pressure, and someone others naturally turn to for leadership.",
      conscious: "Strong professional ownership with rare externalization. You self-examine before blaming systems or people. A slight tendency to look outward under prolonged stress is your remaining edge — deepen the habit of leading with internal inquiry.",
      conditional: "You take professional responsibility when things go well but may drift toward blame — of management, systems, or circumstances — when results disappoint. Build the habit of asking 'What was my contribution?' before any other analysis.",
      externalizing: "The system, timing, or others' decisions absorb significant blame for professional outcomes. While external factors are real, focusing on them limits your agency. Deliberately shift your attention to your own contribution each day.",
      reactive: "Professional outcomes feel largely outside your control. Initiative is low, waiting dominates. The belief that conditions must change before you can improve is keeping you exactly where you are. One proactive action today will start to break this pattern.",
    },
  },
  {
    id: "relationship",
    title: "Relationship & Family Responsibility",
    subtitle: "How honestly do I own my role in conflicts and connections?",
    emoji: "❤️",
    color: "#EC4899",
    shortName: "Relational",
    questions: [
      "I own my role in conflicts instead of defending my position.",
      "I communicate needs clearly instead of expecting others to guess.",
      "I apologize sincerely without excuses.",
      "I do not blame upbringing or past events for current behaviour.",
      "I model responsibility for children/partner rather than preaching it.",
    ],
    feedback: {
      selfAuthoring: "You bring rare ownership to your relationships. Conflict is met with curiosity, not defense. Your willingness to apologize without conditions and communicate without passive expectations creates depth and trust that few people ever experience.",
      conscious: "You own your relational role with strength and consistency. In heated moments, traces of defensiveness may surface, but you return to ownership quickly. Your modeling of responsibility has more influence than any words you could speak.",
      conditional: "Relational responsibility is present in calm times but breaks down under conflict or stress. Defensiveness and position-protection can block genuine repair. Practice owning your 50% unconditionally — regardless of what the other person does.",
      externalizing: "Conflicts tend to be explained by the other person's behaviour. Apologies often contain 'but…' Your upbringing and past are still active explanations for current patterns. Ownership is not blame — it is power. It gives you something to work with.",
      reactive: "Relationships feel like they happen to you. Others' behaviour dominates your internal experience, and your role in dynamics is largely invisible. The first breakthrough comes from simply asking: 'How did I contribute to this?' — without judgment.",
    },
  },
  {
    id: "direction",
    title: "Decision & Life Direction Responsibility",
    subtitle: "How consciously do I design my life rather than drift through it?",
    emoji: "🧭",
    color: "#6366F1",
    shortName: "Direction",
    questions: [
      "I make conscious choices instead of drifting by default.",
      "I accept consequences of my decisions without resentment.",
      "I take initiative rather than waiting for ideal conditions.",
      "I do not blame luck or timing for long-term stagnation.",
      "I actively design the direction of my life.",
    ],
    feedback: {
      selfAuthoring: "You are the architect of your life. Every significant choice is made consciously, owned fully, and built upon — not resented. You design rather than drift. This orientation is rare, and it compounds powerfully over time.",
      conscious: "Strong life direction ownership with occasional passive drifting. You generally make conscious choices and own their consequences. Explore where you are still waiting for conditions to improve before acting — that waiting has a cost.",
      conditional: "Intentional decision-making coexists with passive drifting, often depending on your energy or optimism. Resentment toward past decisions can surface under pressure. A decision journal — reviewing your choices weekly — will build consistency.",
      externalizing: "Life direction feels shaped more by others, timing, or circumstance than by deliberate choice. Blame for stagnation is directed outward. Begin by identifying one area today where you can take an initiative rather than wait.",
      reactive: "Life feels like something that is happening to you. Agency feels minimal, initiative feels futile. This is not a character flaw — it is a learned orientation. It can be unlearned. One small, deliberate choice each day is how it starts.",
    },
  },
  {
    id: "health",
    title: "Physical & Health Responsibility",
    subtitle: "How fully do I own my physical condition and long-term wellbeing?",
    emoji: "💪",
    color: "#10B981",
    shortName: "Health",
    questions: [
      "I take ownership of my physical condition.",
      "I maintain habits aligned with long-term well-being.",
      "I do not blame age, genetics, or workload without taking action.",
      "I regulate sleep, nutrition, and movement consciously.",
      "I see health as a responsibility, not a convenience.",
    ],
    feedback: {
      selfAuthoring: "You treat your physical condition as a direct expression of your values and choices. Health is not something you have — it is something you actively create. Your consistency here is foundational to your capacity in every other domain.",
      conscious: "Strong health ownership with genuine commitment. Occasional disruptions — travel, workload, stress — may temporarily derail habits, but you return to them with intention. You know what you need and you act on that knowledge consistently.",
      conditional: "Health responsibility is present when motivation is high but erodes under pressure or convenience. You know what to do — the gap is execution consistency. Identify your most fragile habit and build one non-negotiable around it.",
      externalizing: "Age, genetics, schedule, or circumstance absorb significant blame for current physical condition. While real, these factors do not remove your agency. Focus on the smallest sustainable action you haven't yet committed to — and start there.",
      reactive: "Physical health feels largely outside your control. Habits are reactive — responding to crises rather than preventing them. One non-negotiable daily habit — even 10 minutes of movement — will begin to restore your sense of agency over your own body.",
    },
  },
  {
    id: "financial",
    title: "Financial & Material Responsibility",
    subtitle: "How consciously do I own my financial decisions and patterns?",
    emoji: "📊",
    color: "#3B82F6",
    shortName: "Financial",
    questions: [
      "I manage money consciously rather than impulsively.",
      "I do not blame external economy alone for my financial state.",
      "I educate myself about financial decisions.",
      "I take responsibility for spending patterns.",
      "I plan rather than react financially.",
    ],
    feedback: {
      selfAuthoring: "Financial decisions are conscious, deliberate, and aligned with your values. You neither impulsively spend nor anxiously hoard — you plan. The economic environment doesn't control you; your choices do. This is financial self-authorship.",
      conscious: "Strong financial ownership with consistent planning. Occasional impulsive decisions or moments of economic blame may surface, but you course-correct. Continue building the bridge between your values and your daily financial behaviour.",
      conditional: "Financial responsibility is present in good times but deteriorates under stress or scarcity pressure. External blame — economy, employer, inflation — partially absorbs accountability. One consistent weekly financial review will shift this significantly.",
      externalizing: "The economic system, employer, or circumstances receive substantial blame for your financial state. While systemic factors are real, this orientation limits what you can actually change. Start with one controllable: a week of tracking every purchase.",
      reactive: "Financial outcomes feel determined by forces beyond you. Planning feels pointless, initiative feels futile. This helplessness is changeable. A single step — tracking spending for one week — can begin to restore a sense of agency over your material life.",
    },
  },
  {
    id: "meaning",
    title: "Meaning & Purpose Responsibility",
    subtitle: "How actively do I cultivate meaning rather than waiting for it to arrive?",
    emoji: "🌟",
    color: "#7C3AED",
    shortName: "Meaning",
    questions: [
      "I do not wait for meaning to appear — I cultivate it.",
      "I align daily actions with long-term values.",
      "I do not blame circumstances for lack of fulfilment.",
      "I consciously define what a 'good life' means for me.",
      "I accept that happiness requires intentional participation.",
    ],
    feedback: {
      selfAuthoring: "You have accepted the full weight and freedom of creating your own meaning. You don't wait for purpose to arrive — you build it through aligned action, clarity, and commitment. This is the highest form of self-authorship, and it shows in how you carry yourself.",
      conscious: "Strong meaning-making with genuine intentionality. You align most days with your values and understand that fulfilment is cultivated, not found. In low-energy or discouraging periods, passive waiting may surface. Re-anchor to your values when this happens.",
      conditional: "Meaning and purpose are experienced inconsistently — present when things go well, elusive under pressure. You're beginning to understand that fulfilment requires participation. Define clearly what a 'good day' looks like and build toward it deliberately.",
      externalizing: "Fulfilment is largely attributed to circumstances, people, or luck. When life feels flat, external change is awaited. Begin asking: 'What one action today would make this day meaningful to me — regardless of what happens around me?'",
      reactive: "Life feels empty or purposeless, and the sense that something external must change first is strong. This is a painful place, but it is also a beginning. Meaning is not found — it is chosen. One small act of intentional alignment today can start to shift everything.",
    },
  },
];

/* ────────────────────────────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────────────────────────────── */

type FeedbackKey = "selfAuthoring" | "conscious" | "conditional" | "externalizing" | "reactive";

const getLevel = (score: number): { label: string; key: FeedbackKey; bg: string; fg: string } => {
  if (score >= 86) return { label: "Self-Authoring",  key: "selfAuthoring",  bg: "#F3E8FF", fg: "#7C3AED" };
  if (score >= 71) return { label: "Conscious",       key: "conscious",      bg: "#DBEAFE", fg: "#3B82F6" };
  if (score >= 51) return { label: "Conditional",     key: "conditional",    bg: "#D1FAE5", fg: "#059669" };
  if (score >= 21) return { label: "Externalizing",   key: "externalizing",  bg: "#FEF3C7", fg: "#D97706" };
  return             { label: "Reactive",          key: "reactive",       bg: "#FEE2E2", fg: "#DC2626" };
};

const getArchetype = (overall: number) => {
  if (overall >= 86) return { title: "Self-Authoring Individual",    icon: "🏆", desc: "You operate from a deep internal locus of control. Blame is rare; agency is constant. You understand that you cannot control everything that happens, but you fully own your response to everything. This is the foundation of a life lived with integrity and power." };
  if (overall >= 71) return { title: "Conscious Contributor",        icon: "⭐", desc: "You take strong ownership across most life domains. Occasional externalization surfaces under pressure but is caught and corrected quickly. You are close to full self-authorship. The path forward is deepening ownership in your weakest domains." };
  if (overall >= 51) return { title: "Conditional Owner",            icon: "💪", desc: "You apply responsibility unevenly — strongly in some areas, inconsistently in others. Mood, pressure, and context determine how accountable you feel. The growth work is building unconditional ownership across all seven domains." };
  if (overall >= 21) return { title: "Externalizing Pattern",        icon: "🌅", desc: "Blame — of people, systems, timing, or the past — plays a significant role in how you explain your life. This isn't failure; it's a pattern. And patterns can change. Start with your highest-scoring domain and build outward from there." };
  return               { title: "Reactive Orientation",            icon: "🔥", desc: "Life is currently experienced as something that happens to you. Internal agency feels low or absent. This is a learned position — not a fixed identity. The very act of completing this assessment is already a first step toward reclaiming your agency." };
};

const buildNarrative = (sectionResults: SectionResult[]) => {
  const sorted = [...sectionResults].sort((a, b) => b.avg - a.avg);
  const top2 = sorted.slice(0, 2);
  const bot2 = sorted.slice(-2).reverse();
  const overall = sectionResults.reduce((s, r) => s + r.avg, 0) / sectionResults.length;
  const range = sorted[0].avg - sorted[sorted.length - 1].avg;

  let text = `Your overall Responsibility Maturity score is ${Math.round(overall)}%, placing you in the "${getArchetype(overall).title}" profile. `;
  text += `Your areas of strongest ownership are ${top2[0].title} (${Math.round(top2[0].avg)}%) and ${top2[1].title} (${Math.round(top2[1].avg)}%), forming the core of your accountability mindset. `;
  text += `Your greatest growth opportunities lie in ${bot2[0].title} (${Math.round(bot2[0].avg)}%) and ${bot2[1].title} (${Math.round(bot2[1].avg)}%). Focused work here will create the most significant shift in your overall level of self-authorship.`;

  if (range <= 15) {
    text += " Your profile shows a consistent level of responsibility across all areas — no domain is dramatically different from the others, suggesting an integrated and balanced ownership mindset.";
  } else if (range <= 30) {
    text += " Your profile shows moderate variation between domains, which is typical. Build on your strongest areas while giving deliberate attention to the domains where ownership is less consistent.";
  } else {
    text += " Your profile shows significant variation between your strongest and weakest domains. This gap represents a powerful opportunity: targeted work on your lower-scoring areas will create a more integrated and resilient sense of personal responsibility.";
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

const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 60%, #FEF3C7 100%)" }}>
    <div style={{ textAlign: "center", maxWidth: 560 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🔶</div>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#151716", lineHeight: 1.2, marginBottom: 8, fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif" }}>
        Responsibility Maturity Profile
      </h1>
      <p style={{ fontSize: 16, color: "#C2410C", fontWeight: 600, marginBottom: 24, letterSpacing: 1.5, textTransform: "uppercase" }}>
        Personal Accountability Diagnostic
      </p>
      <p style={{ fontSize: 17, color: "#3a4a3a", lineHeight: 1.7, marginBottom: 12 }}>
        Measure your level of personal responsibility across 7 core life domains. Rate yourself honestly on 35 statements to reveal where you operate from genuine ownership — and where blame or passivity still holds you back.
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 6, background: "#fff", borderRadius: 12, padding: "16px 24px", marginBottom: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", textAlign: "left", fontSize: 14, color: "#555" }}>
        <span><strong style={{ color: "#DC2626" }}>0–20%</strong> Reactive / Victim Orientation</span>
        <span><strong style={{ color: "#D97706" }}>21–50%</strong> Externalizing Pattern</span>
        <span><strong style={{ color: "#059669" }}>51–70%</strong> Conditional Ownership</span>
        <span><strong style={{ color: "#3B82F6" }}>71–85%</strong> Conscious Contributor</span>
        <span><strong style={{ color: "#7C3AED" }}>86–100%</strong> Self-Authoring Individual</span>
      </div>
      <br />
      <p style={{ fontSize: 13, color: "#92400E", fontStyle: "italic", marginBottom: 24 }}>Answer honestly, not aspirationally.</p>
      <button
        onClick={onStart}
        style={{ padding: "16px 48px", fontSize: 17, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #F97316, #C2410C)", border: "none", borderRadius: 50, cursor: "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.4)", transition: "transform 0.15s, box-shadow 0.15s" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(249,115,22,0.4)"; }}
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
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, #F97316, ${section.color})`, transition: "width 0.4s", borderRadius: "0 2px 2px 0" }} />
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

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {section.questions.map((q, qi) => {
              const idx = baseIdx + qi;
              const val = answers[idx];
              return (
                <div key={idx} style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F1F5F9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontSize: 15, color: "#334155", fontWeight: 500, flex: 1, paddingRight: 16, lineHeight: 1.6 }}>{qi + 1}. {q}</p>
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
              style={{ padding: "14px 36px", fontSize: 15, fontWeight: 600, color: "#fff", background: isLast ? "linear-gradient(135deg, #F97316, #C2410C)" : section.color, border: "none", borderRadius: 50, cursor: "pointer", boxShadow: `0 4px 14px ${section.color}55`, transition: "transform 0.15s" }}
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

const ResultsScreen = ({ sectionResults, overall, onRetake }: { sectionResults: SectionResult[]; overall: number; onRetake: () => void }) => {
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 100%)", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 14, color: "#C2410C", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your Results</p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>Responsibility Maturity Profile</h1>
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
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", textAlign: "center", marginBottom: 8 }}>Responsibility Dimensions</h3>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={chartData} outerRadius="75%">
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={<AxisLabel />} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#CBD5E1" }} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="#F97316" fill="#F97316" fillOpacity={0.18} strokeWidth={2} animationDuration={1200} dot={{ r: 5, fill: "#F97316", stroke: "#fff", strokeWidth: 2 }} />
              <Tooltip content={<ChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", marginBottom: 12 }}>📋 Profile Summary</h3>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>{narrative}</p>
        </div>

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

        <div style={{ textAlign: "center" }}>
          <button onClick={onRetake}
            style={{ padding: "14px 40px", fontSize: 15, fontWeight: 600, color: "#F97316", background: "#fff", border: "2px solid #F97316", borderRadius: 50, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#F97316"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#F97316"; }}
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────
   MAIN
   ──────────────────────────────────────────────────────────────────── */

export default function ResponsibilityMaturityProfile() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>(() =>
    Object.fromEntries(Array.from({ length: 35 }, (_, i) => [i, 50]))
  );
  const [fade, setFade] = useState(true);

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

  const handleStart  = () => transition(() => setPhase("quiz"));
  const handleNext   = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setSectionIdx((i) => i + 1)); };
  const handlePrev   = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setSectionIdx((i) => i - 1)); };
  const handleFinish = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => setPhase("results")); };
  const handleRetake = () => { window.scrollTo({ top: 0, behavior: "smooth" }); transition(() => { setPhase("intro"); setSectionIdx(0); setAnswers(Object.fromEntries(Array.from({ length: 35 }, (_, i) => [i, 50]))); }); };
  const handleAnswer = (idx: number, val: number) => setAnswers((prev) => ({ ...prev, [idx]: val }));

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', opacity: fade ? 1 : 0, transition: "opacity 0.25s ease", minHeight: "100vh" }}>
      {phase === "intro" && <IntroScreen onStart={handleStart} />}
      {phase === "quiz" && (
        <QuizScreen
          section={SECTIONS[sectionIdx]} sectionIndex={sectionIdx} totalSections={SECTIONS.length}
          answers={answers} onAnswer={handleAnswer} onNext={handleNext} onPrev={handlePrev} onFinish={handleFinish}
        />
      )}
      {phase === "results" && <ResultsScreen sectionResults={sectionResults} overall={overall} onRetake={handleRetake} />}
    </div>
  );
}
