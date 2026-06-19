import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "a.misiek23@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* ── ETP helpers ─────────────────────────────────────────────────── */

type FeedbackKey = "mastery" | "advanced" | "solid" | "developing" | "low";

function getLevel(score: number): { label: string; key: FeedbackKey; bg: string; fg: string } {
  if (score >= 86) return { label: "Mastery",    key: "mastery",    bg: "#F3E8FF", fg: "#7C3AED" };
  if (score >= 71) return { label: "Advanced",   key: "advanced",   bg: "#DBEAFE", fg: "#3B82F6" };
  if (score >= 51) return { label: "Solid",      key: "solid",      bg: "#D1FAE5", fg: "#059669" };
  if (score >= 21) return { label: "Developing", key: "developing", bg: "#FEF3C7", fg: "#D97706" };
  return             { label: "Low",         key: "low",        bg: "#FEE2E2", fg: "#DC2626" };
}

function getArchetype(overall: number) {
  if (overall >= 86) return { title: "True Mastery",          icon: "🏆", desc: "Identity-free, pressure-free, pure expression. You compete from a place of deep alignment, where performance flows naturally from inner stillness. You are not defined by your results — you are defined by your presence." };
  if (overall >= 71) return { title: "High-Level Performer",  icon: "⭐", desc: "Stable, conscious, and ready for breakthrough. You've built strong mental foundations and compete with genuine awareness. The path to mastery is clear — continue deepening your practice and trust the process." };
  if (overall >= 51) return { title: "Solid Competitive Mind",icon: "💪", desc: "Growing, consistent, with clear areas for refinement. You understand the mental game and are actively developing it. Focus on the sections with the lowest scores — they represent your greatest leverage points." };
  if (overall >= 21) return { title: "Developing Awareness",  icon: "🌅", desc: "Potential is clearly present, but dependency on external factors is still strong. You're at the beginning of an incredible inner journey. The awareness you're building right now is the foundation for everything that follows." };
  return               { title: "Ego-Based Performer",     icon: "🔥", desc: "Currently outcome-driven, reactive, and emotionally volatile. This isn't a judgment — it's a starting point. Every great champion started somewhere. The fact that you're taking this assessment shows readiness for change." };
}

function buildNarrative(sectionResults: { title: string; avg: number }[], overall: number): string {
  const sorted = [...sectionResults].sort((a, b) => b.avg - a.avg);
  const top2 = sorted.slice(0, 2);
  const bot2 = sorted.slice(-2).reverse();
  const range = sorted[0].avg - sorted[sorted.length - 1].avg;
  let text = `Your overall Self Mastery score is ${Math.round(overall)}%, placing you in the "${getArchetype(overall).title}" archetype. `;
  text += `Your greatest strengths are ${top2[0].title} (${Math.round(top2[0].avg)}%) and ${top2[1].title} (${Math.round(top2[1].avg)}%), which form the core of your competitive mental game. `;
  text += `Your most impactful growth opportunities lie in ${bot2[0].title} (${Math.round(bot2[0].avg)}%) and ${bot2[1].title} (${Math.round(bot2[1].avg)}%). Focusing here will unlock the most significant gains in your overall performance.`;
  if (sorted[sorted.length - 1].avg >= 60) {
    if (range <= 15) text += " Your profile shows excellent balance across all dimensions — no single area is dramatically different from the others, suggesting a well-rounded approach to mental training.";
    else if (range <= 30) text += " Your profile shows moderate variation between areas, which is typical. Continue building on your strengths while giving focused attention to your development areas.";
    else text += " Your profile shows significant variation between your strongest and weakest areas. This gap represents a powerful opportunity: targeted work on your lower-scoring dimensions will create a more integrated and resilient competitive mindset.";
  }
  return text;
}

const SECTION_FEEDBACK: Record<string, Record<FeedbackKey, string>> = {
  calm: {
    mastery:    "You have achieved remarkable emotional mastery. Pressure situations are your natural habitat — you remain an anchor of calm regardless of circumstances. Your nervous system is well-trained to maintain equilibrium, and this stability radiates outward, often calming those around you.",
    advanced:   "Your emotional regulation under pressure is strong and reliable. You've developed sophisticated coping mechanisms and can maintain composure in most high-stakes situations. The occasional slip is quickly corrected. Focus on deepening this stability in the most extreme pressure moments.",
    solid:      "You have a good foundation of emotional stability. In moderate pressure situations, you handle yourself well. However, extreme stress or unexpected adversity can still throw you off balance. Continue building your recovery speed and expanding your window of tolerance.",
    developing: "You're becoming more aware of your emotional patterns under pressure, which is an essential first step. You may still react strongly to mistakes or adversity, but you're starting to recognize these patterns. Focus on breath work and simple grounding techniques.",
    low:        "Emotional volatility under pressure is currently a significant challenge. Stress triggers strong reactive patterns that can hijack your performance. This is a powerful growth area — even small improvements here will cascade into every other dimension of your game.",
  },
  presence: {
    mastery:    "You possess an extraordinary ability to inhabit the present moment. Your mind naturally drops into the 'now' during competition, free from the noise of past mistakes or future anxieties. This presence is the foundation of flow states, and you access them regularly.",
    advanced:   "Your present-moment awareness is well-developed. You have reliable rituals and techniques for staying grounded between points, and you catch yourself quickly when your mind drifts. Your breath has become a powerful anchor. Explore deeper layers of stillness within performance.",
    solid:      "You understand the importance of presence and can maintain it during normal play. Under higher pressure, your mind may drift to outcomes, past errors, or 'what-ifs.' Your reset routines are developing but not yet automatic. Keep refining your between-point rituals.",
    developing: "You're beginning to recognize the difference between being present and being lost in thought during competition. Mind-wandering is still frequent, but you're developing awareness of it. Start with simple breath-counting between points to build this muscle.",
    low:        "The mental chatter during competition is currently very active — replaying past points, worrying about outcomes, judging yourself in real-time. This is one of the most transformative areas to develop. Even 5 minutes of daily mindfulness practice will begin to shift this pattern.",
  },
  freedom: {
    mastery:    "You have liberated yourself from the tyranny of outcomes. You compete with full intensity precisely because you're not enslaved by results. Wins and losses inform but don't define you. This freedom paradoxically makes you more dangerous as a competitor — you play loose, creative, and fearless.",
    advanced:   "You've made significant progress in separating your identity from your results. Most of the time, you can compete freely without the weight of outcome anxiety. In the biggest moments or against certain opponents, traces of attachment may surface. Keep practicing surrender.",
    solid:      "You intellectually understand non-attachment but still feel the emotional pull of outcomes during competition. Fear of losing can restrict your game in key moments. You're learning to see results as data, but your ego still invests heavily in wins and losses.",
    developing: "Results still significantly impact your emotional state and self-image. Losing feels personal, and the need to win can create tension that undermines performance. You're becoming aware of this pattern, which is the beginning of change. Practice competing for the joy of expression.",
    low:        "Your identity is currently deeply intertwined with your results. Winning feels essential to self-worth, and losing triggers strong negative emotions. This attachment creates enormous internal pressure. Begin exploring: who are you beyond your results? This question holds transformative power.",
  },
  courage: {
    mastery:    "You are a true warrior of authentic expression. Under pressure, you don't shrink — you expand. Your natural game flows freely in the biggest moments because you've learned that playing safe is the real risk. Your courage inspires others and defines your competitive identity.",
    advanced:   "You consistently choose bold play over safe play and trust your instincts in crucial moments. Your authentic style comes through clearly in competition. Occasionally, in unfamiliar or extremely high-stakes situations, you may hold back slightly. Push into those edges.",
    solid:      "You play your game well in comfortable situations but may shift to a more conservative style under high pressure. You recognize the pattern of 'playing not to lose' and are actively working to trust yourself in big moments. Your courage muscle is growing.",
    developing: "Under pressure, the tendency to play safe and protect rather than express and attack is still dominant. Fear of failure drives strategic decisions more than confidence does. Start small — commit to one courageous shot per game, regardless of outcome.",
    low:        "Fear currently governs most of your competitive choices. You play well below your training level in matches because self-protection overrides self-expression. This is common and changeable. Courage isn't the absence of fear — it's playing your game despite the fear.",
  },
  responsibility: {
    mastery:    "You are the undisputed CEO of your athletic journey. Everything — preparation, performance, recovery, mindset — is owned completely. You waste zero energy on blame, excuses, or external complaints. Every obstacle becomes fuel. Your discipline and accountability set a standard for those around you.",
    advanced:   "You take strong ownership of your development and performance. Excuses are rare, and when they surface, you catch them quickly. Your work ethic and self-discipline are consistent. Occasionally, external frustrations may distract you. Deepen your commitment to radical ownership.",
    solid:      "You generally take responsibility for your performance and maintain decent training discipline. Under frustration, you may sometimes look outward — at conditions, opponents, or luck. You're developing the habit of asking 'What can I control?' as your default response.",
    developing: "Blame and excuses still play a role in how you process difficult performances. External factors — umpires, conditions, opponents — receive too much of your attention. You're beginning to see the power of focusing on controllables. Make this shift a daily practice.",
    low:        "Currently, much of your energy goes toward external attribution. When things go wrong, the default is to look outward rather than inward. This pattern keeps you stuck because you can't improve what you don't own. Start with one simple question after every match: 'What could I have done differently?'",
  },
  humility: {
    mastery:    "You embody the beginner's mind of a true master. No matter how much you've achieved, every match, every practice, every conversation is an opportunity to learn. Feedback is received as a gift, not a threat. Your humility creates an ever-expanding capacity for growth that has no ceiling.",
    advanced:   "Your growth mindset is well-established and genuine. You actively seek feedback and learn from both wins and losses. Success doesn't breed complacency. Occasionally, ego may subtly filter certain feedback. Stay curious about your blind spots — they're where the deepest growth lives.",
    solid:      "You're generally open to learning and improvement, and you handle most feedback well. After strong wins, maintaining the learning focus can be challenging. After tough losses, ego defense may delay the learning process. Keep cultivating the habit of curiosity over judgment.",
    developing: "Ego resistance to feedback is still a significant factor. Criticism may feel like an attack, and success can create a false sense of 'having arrived.' You're beginning to see that humility and confidence aren't opposites — they're partners. Lean into this understanding.",
    low:        "Currently, the ego is heavily guarding against perceived threats to self-image. Feedback is filtered, losses are explained away, and growth is limited by defensiveness. This is perhaps the most important quality to develop — everything else opens up when you become genuinely coachable.",
  },
  power: {
    mastery:    "You have found the source within. Your power doesn't come from the scoreboard, from external validation, or from proving anything — it comes from deep alignment with your values, your breath, and your purpose. In your most centered moments, performance flows effortlessly because you're not fighting yourself.",
    advanced:   "You have strong access to your inner resources and can draw on them in most situations. Your connection to breath and values provides a reliable anchor. During extended difficult phases, maintaining this connection may require conscious effort. Trust the process — you're close to effortless alignment.",
    solid:      "You've experienced moments of deep alignment and flow, and you know what it feels like. Consistently accessing this state is the challenge. External results still influence your sense of internal power. Keep building the bridge between your values and your daily performance habits.",
    developing: "Your sense of power is still largely tied to external indicators — scores, rankings, validation from others. You're beginning to glimpse that real strength comes from within, but this understanding is more intellectual than embodied. Daily practices connecting you to breath and values will accelerate this journey.",
    low:        "The need to prove yourself currently drives most of your competitive energy. Power is sought externally — through winning, through recognition, through validation. This is exhausting and fragile. The journey inward, toward your own source of strength, is the most important journey you'll ever take as an athlete.",
  },
};

const SECTION_EMOJIS: Record<string, string> = {
  calm: "🧘", presence: "🎯", freedom: "🕊️", courage: "🦁",
  responsibility: "⚡", humility: "🌱", power: "💎",
};

/* ── TSDP helpers ────────────────────────────────────────────────── */

const TSDP_RESULTS = [
  { min: 20, max: 25, label: "Deep Inner Calling",            icon: "🌿", color: "#377A00", desc: "You strongly feel that there is a deeper self within you waiting to be expressed. This is not confusion — it is awakening. The inner calling you sense is real, and it is asking to be honoured." },
  { min: 14, max: 19, label: "Active Search",                 icon: "🔍", color: "#2D5A8E", desc: "You are aware that there is more to you than your current expression. You are in the process of discovery — actively searching, questioning, and beginning to listen more deeply to what is true for you." },
  { min: 8,  max: 13, label: "Emerging Awareness",            icon: "🌅", color: "#D97706", desc: "You occasionally feel this inner layer, but it is not yet stable. Life may still be guided more by external structures. The awareness is emerging — and that is where every meaningful journey begins." },
  { min: 0,  max: 7,  label: "External Identity Orientation", icon: "🔲", color: "#64748B", desc: "Your identity is currently shaped more by roles, expectations, and environment. The inner layer may not yet be a central focus — and that is okay. Asking the question at all is the first step." },
];

const TSDP_SECTIONS = [
  { title: "Inner Sense of Uniqueness",  emoji: "🌱" },
  { title: "Authentic vs Adapted Self",  emoji: "🔍" },
  { title: "Expression & Courage",       emoji: "🔥" },
  { title: "Inner Voice & Direction",    emoji: "🧭" },
  { title: "Depth & Meaning",            emoji: "✨" },
];

/* ── Email templates ─────────────────────────────────────────────── */

function etpHtml(data: {
  overall: number;
  sectionResults: { id: string; title: string; shortName: string; avg: number; questionScores: number[] }[];
  accessType: string;
}) {
  const archetype    = getArchetype(data.overall);
  const overallLevel = getLevel(data.overall);
  const narrative    = buildNarrative(data.sectionResults, data.overall);

  const dimensionCards = data.sectionResults.map((r) => {
    const lvl      = getLevel(r.avg);
    const feedback = SECTION_FEEDBACK[r.id]?.[lvl.key] ?? "";
    const emoji    = SECTION_EMOJIS[r.id] ?? "";
    const pct      = Math.round(r.avg);
    const qScores  = (r.questionScores ?? []).map((s: number, i: number) =>
      `<span style="display:inline-block;font-size:11px;color:#64748B;background:#F8FAFC;padding:3px 8px;border-radius:6px;border:1px solid #F1F5F9;margin:2px 3px 2px 0;">Q${i + 1}: ${s}%</span>`
    ).join("");

    return `
      <div style="background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:16px;border-left:4px solid #2D5A8E;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
          <tr>
            <td style="font-size:15px;font-weight:600;color:#1E293B;">${emoji} ${r.title}</td>
            <td align="right" style="white-space:nowrap;">
              <span style="font-size:12px;font-weight:600;color:${lvl.fg};background:${lvl.bg};padding:3px 10px;border-radius:20px;">${lvl.label}</span>
              &nbsp;
              <span style="font-size:18px;font-weight:700;color:#2D5A8E;">${pct}%</span>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td style="background:#F1F5F9;border-radius:4px;height:6px;padding:0;">
              <div style="width:${pct}%;height:6px;background:linear-gradient(90deg,#2D5A8E88,#2D5A8E);border-radius:4px;"></div>
            </td>
          </tr>
        </table>
        <div style="margin-bottom:12px;">${qScores}</div>
        <p style="font-size:13px;color:#64748B;line-height:1.7;margin:0;">${feedback}</p>
      </div>`;
  }).join("");

  const calendlyBlock = data.accessType === "consultation" ? `
    <div style="background:linear-gradient(135deg,#1E3D6B,#2D5A8E);border-radius:16px;padding:28px 24px;text-align:center;margin-bottom:20px;">
      <div style="font-size:28px;margin-bottom:8px;">📅</div>
      <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px;">Book Your Consultation</h3>
      <p style="font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 20px;line-height:1.6;">You've unlocked a 30-minute 1-on-1 session with Andrew. Use your results to guide the conversation.</p>
      <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/a-misiek23/30min"}" style="display:inline-block;padding:12px 32px;background:#fff;color:#2D5A8E;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px;">Book on Calendly →</a>
    </div>` : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#EEF2F7;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:680px;margin:32px auto;background:#F8FAFC;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

    <div style="background:linear-gradient(135deg,#1E3D6B,#2D5A8E);padding:36px 32px;text-align:center;">
      <p style="font-size:12px;color:#93C5FD;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Your Results</p>
      <h1 style="font-size:26px;font-weight:700;color:#fff;margin:0;">Elite Tennis Profile</h1>
    </div>

    <div style="padding:32px;">

      <div style="background:#fff;border-radius:16px;padding:32px;text-align:center;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:8px solid ${overallLevel.fg};line-height:104px;text-align:center;margin-bottom:16px;">
          <span style="font-size:36px;font-weight:800;color:#1E293B;">${Math.round(data.overall)}</span>
        </div>
        <br>
        <span style="font-size:28px;">${archetype.icon}</span>
        <h2 style="font-size:22px;font-weight:700;color:#1E293B;margin:8px 0;">${archetype.title}</h2>
        <p style="font-size:14px;color:#64748B;line-height:1.7;max-width:460px;margin:0 auto;">${archetype.desc}</p>
      </div>

      <div style="background:#fff;border-radius:16px;padding:24px;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <h3 style="font-size:14px;font-weight:600;color:#475569;margin:0 0 10px;">📋 Profile Summary</h3>
        <p style="font-size:14px;color:#475569;line-height:1.8;margin:0;">${narrative}</p>
      </div>

      ${calendlyBlock}

      <h3 style="font-size:14px;font-weight:600;color:#475569;margin:0 0 14px;">Profile Dimensions</h3>
      ${dimensionCards}

    </div>

    <div style="background:#F1F5F9;padding:20px 32px;text-align:center;border-top:1px solid #E2E8F0;">
      <p style="margin:0;font-size:12px;color:#94A3B8;">CoachAndrew · Breath. Move. Grow.</p>
    </div>

  </div>
</body></html>`;
}

function tsdpHtml(data: { totalYes: number; sectionYes: number[]; accessType: string }) {
  const result   = TSDP_RESULTS.find((r) => data.totalYes >= r.min && data.totalYes <= r.max) ?? TSDP_RESULTS[TSDP_RESULTS.length - 1];
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/a-misiek23/30min";

  const sectionRows = TSDP_SECTIONS.map((sec, i) => {
    const yes = data.sectionYes[i] ?? 0;
    const pct = Math.round((yes / 5) * 100);
    return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #F1F5F9">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:14px;font-weight:600;color:#151716">${sec.emoji} ${sec.title}</span>
          <span style="font-size:13px;font-weight:700;color:#377A00;white-space:nowrap;padding-left:12px">${yes} / 5</span>
        </div>
        <div style="height:6px;border-radius:3px;background:#F1F5F9">
          <div style="height:6px;border-radius:3px;background:#377A00;width:${pct}%"></div>
        </div>
      </td>
    </tr>`;
  }).join("");

  const scaleRows = TSDP_RESULTS.map((r) => {
    const isYours = r.label === result.label;
    return `
    <tr>
      <td style="padding-bottom:8px">
        <div style="display:flex;gap:14px;align-items:flex-start;padding:12px 16px;border-radius:12px;background:${isYours ? r.color + "18" : "#F8FAFC"};border:1.5px solid ${isYours ? r.color : "transparent"}">
          <span style="font-size:20px;flex-shrink:0">${r.icon}</span>
          <div>
            <p style="font-size:13px;font-weight:700;color:${r.color};margin:0 0 2px">${r.label} · ${r.min}–${r.max} YES</p>
            <p style="font-size:13px;color:#64748B;line-height:1.6;margin:0">${r.desc}</p>
          </div>
        </div>
      </td>
    </tr>`;
  }).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:20px;background:#EAF7EB;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto">

    <div style="text-align:center;padding:24px 0 16px">
      <p style="margin:0 0 6px;font-size:12px;color:#377A00;font-weight:700;letter-spacing:2px;text-transform:uppercase">Your Results</p>
      <h1 style="margin:0;font-size:28px;font-weight:700;color:#151716">Unique Self Assessment</h1>
    </div>

    <div style="background:#fff;border-radius:24px;padding:36px 32px;text-align:center;margin-bottom:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06)">
      <div style="display:inline-block;width:120px;height:120px;border-radius:60px;border:8px solid ${result.color};text-align:center;line-height:1;padding-top:28px;box-sizing:border-box;margin-bottom:16px">
        <div style="font-size:30px;font-weight:800;color:#151716">${data.totalYes}</div>
        <div style="font-size:13px;color:#94A3B8;font-weight:500">/ 25</div>
      </div>
      <div style="font-size:36px;margin-bottom:8px">${result.icon}</div>
      <h2 style="font-size:24px;font-weight:700;color:#151716;margin:0 0 12px">${result.label}</h2>
      <div style="display:inline-block;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${result.color};background:${result.color}18;padding:4px 16px;border-radius:20px;margin-bottom:16px">${data.totalYes} YES answers out of 25</div>
      <p style="font-size:16px;color:#3a4a3a;line-height:1.8;max-width:480px;margin:0 auto">${result.desc}</p>
    </div>

    <div style="background:#fff;border-radius:20px;padding:28px;margin-bottom:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06)">
      <h3 style="font-size:15px;font-weight:600;color:#475569;margin:0 0 16px">Section Breakdown</h3>
      <table style="width:100%;border-collapse:collapse">${sectionRows}</table>
    </div>

    <div style="background:#fff;border-radius:20px;padding:28px;margin-bottom:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06)">
      <h3 style="font-size:15px;font-weight:600;color:#475569;margin:0 0 16px">Self-Discovery Activation Scale</h3>
      <table style="width:100%;border-collapse:collapse">${scaleRows}</table>
    </div>

    ${data.accessType === "consultation" ? `
    <div style="background:linear-gradient(135deg,#377A00,#2f6a00);border-radius:24px;padding:36px 32px;text-align:center;margin-bottom:16px">
      <div style="font-size:32px;margin-bottom:12px">📅</div>
      <h3 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 8px">Book Your Consultation</h3>
      <p style="font-size:15px;color:rgba(255,255,255,0.85);line-height:1.7;margin:0 0 24px;max-width:400px;display:block">You've unlocked a 30-minute 1-on-1 session with Andrew. Use your results to guide the conversation.</p>
      <a href="${calendly}" style="display:inline-block;padding:14px 40px;background:#fff;color:#377A00;font-weight:700;font-size:15px;border-radius:50px;text-decoration:none">Book on Calendly →</a>
    </div>` : ""}

    <div style="text-align:center;padding:16px 0 32px">
      <p style="font-size:13px;color:#94A3B8;margin:0">If you have any questions, reply to this email.<br/><strong style="color:#377A00">Andrew</strong> · Breath. Move. Grow.</p>
    </div>

  </div>
</body></html>`;
}

/* ── Handler ─────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, quizType, ...results } = body as {
      email: string;
      quizType: "etp" | "tsdp";
      [key: string]: unknown;
    };

    if (!email || !quizType) {
      return NextResponse.json({ error: "Missing email or quizType" }, { status: 400 });
    }

    const quizName = quizType === "etp" ? "Elite Tennis Profile" : "Unique Self Assessment";
    const subject  = `Your ${quizName} Results — CoachAndrew`;

    const html = quizType === "etp"
      ? etpHtml(results as Parameters<typeof etpHtml>[0])
      : tsdpHtml(results as Parameters<typeof tsdpHtml>[0]);

    await transporter.sendMail({
      from: "CoachAndrew <a.misiek23@gmail.com>",
      to:   email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-results-email]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
