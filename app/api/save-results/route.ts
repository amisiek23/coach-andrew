import { Resend } from "resend";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const CSV_PATH = path.join(process.cwd(), "data", "smp-results.csv");

const CSV_HEADERS = [
  "Participant ID", "Date", "Access Type",
  "Name", "Email",
  "Age", "Gender Identity", "Nationality", "Education Level",
  "Sport", "Sport Type", "Competitive Level", "Years Experience", "Weekly Training Hours",
  "Mental Coaching?", "Mental Coaching Duration", "Mindfulness Practice?", "Mindfulness Duration",
  "Competitive Status", "Season Status", "Recent Result / Ranking",
  "Prompted By", "Allow Re-contact",
  "Overall %", "Calm %", "Presence %", "Freedom %", "Drive %", "Resilience %", "Identity %", "Awareness %",
];

function escapeCSV(val: string | number | undefined | boolean): string {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function appendToCSV(row: (string | number | undefined | boolean)[]) {
  const dir = path.dirname(CSV_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const needsHeader = !fs.existsSync(CSV_PATH);
  const line = row.map(escapeCSV).join(",") + "\n";
  if (needsHeader) {
    fs.writeFileSync(CSV_PATH, CSV_HEADERS.join(",") + "\n" + line, "utf8");
  } else {
    fs.appendFileSync(CSV_PATH, line, "utf8");
  }
}

/* ── Helpers (mirrors quiz/page.tsx) ─────────────────────────────────── */

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
  let text = `Your overall High Performance Profile score is ${Math.round(overall)}%, placing you in the "${getArchetype(overall).title}" archetype. `;
  text += `Your greatest strengths are ${top2[0].title} (${Math.round(top2[0].avg)}%) and ${top2[1].title} (${Math.round(top2[1].avg)}%), which form the core of your competitive mental game. `;
  text += `Your most impactful growth opportunities lie in ${bot2[0].title} (${Math.round(bot2[0].avg)}%) and ${bot2[1].title} (${Math.round(bot2[1].avg)}%). Focusing here will unlock the most significant gains in your overall performance.`;
  if (range <= 15) text += " Your profile shows excellent balance across all dimensions — no single area is dramatically different from the others, suggesting a well-rounded approach to mental training.";
  else if (range <= 30) text += " Your profile shows moderate variation between areas, which is typical. Continue building on your strengths while giving focused attention to your development areas.";
  else text += " Your profile shows significant variation between your strongest and weakest areas. This gap represents a powerful opportunity: targeted work on your lower-scoring dimensions will create a more integrated and resilient competitive mindset.";
  return text;
}

const SECTION_FEEDBACK: Record<string, Record<FeedbackKey, string>> = {
  calm: {
    mastery: "You have achieved remarkable emotional mastery. Pressure situations are your natural habitat — you remain an anchor of calm regardless of circumstances.",
    advanced: "Your emotional regulation under pressure is strong and reliable. You've developed sophisticated coping mechanisms and can maintain composure in most high-stakes situations.",
    solid: "You have a good foundation of emotional stability. In moderate pressure situations, you handle yourself well. However, extreme stress or unexpected adversity can still throw you off balance.",
    developing: "You're becoming more aware of your emotional patterns under pressure. You may still react strongly to mistakes or adversity, but you're starting to recognize these patterns.",
    low: "Emotional volatility under pressure is currently a significant challenge. Stress triggers strong reactive patterns that can hijack your performance.",
  },
  presence: {
    mastery: "You possess an extraordinary ability to inhabit the present moment. Your mind naturally drops into the 'now' during competition, free from the noise of past mistakes or future anxieties.",
    advanced: "Your present-moment awareness is well-developed. You have reliable rituals and techniques for staying grounded between points, and you catch yourself quickly when your mind drifts.",
    solid: "You understand the importance of presence and can maintain it during normal play. Under higher pressure, your mind may drift to outcomes, past errors, or 'what-ifs.'",
    developing: "You're beginning to recognize the difference between being present and being lost in thought during competition. Mind-wandering is still frequent, but you're developing awareness of it.",
    low: "The mental chatter during competition is currently very active — replaying past points, worrying about outcomes, judging yourself in real-time.",
  },
  freedom: {
    mastery: "You have liberated yourself from the tyranny of outcomes. You compete with full intensity precisely because you're not enslaved by results. Wins and losses inform but don't define you.",
    advanced: "You've made significant progress in separating your identity from your results. Most of the time, you can compete freely without the weight of outcome anxiety.",
    solid: "You intellectually understand non-attachment but still feel the emotional pull of outcomes during competition. Fear of losing can restrict your game in key moments.",
    developing: "Results still significantly impact your emotional state and self-image. Losing feels personal, and the need to win can create tension that undermines performance.",
    low: "Your identity is currently deeply intertwined with your results. Winning feels essential to self-worth, and losing triggers strong negative emotions.",
  },
  courage: {
    mastery: "You are a true warrior of authentic expression. Under pressure, you don't shrink — you expand. Your natural game flows freely in the biggest moments.",
    advanced: "You consistently choose bold play over safe play and trust your instincts in crucial moments. Your authentic style comes through clearly in competition.",
    solid: "You play your game well in comfortable situations but may shift to a more conservative style under high pressure.",
    developing: "Under pressure, the tendency to play safe and protect rather than express and attack is still dominant. Fear of failure drives strategic decisions more than confidence does.",
    low: "Fear currently governs most of your competitive choices. You play well below your training level in matches because self-protection overrides self-expression.",
  },
  responsibility: {
    mastery: "You are the undisputed CEO of your athletic journey. Everything — preparation, performance, recovery, mindset — is owned completely. You waste zero energy on blame or excuses.",
    advanced: "You take strong ownership of your development and performance. Excuses are rare, and when they surface, you catch them quickly.",
    solid: "You generally take responsibility for your performance. Under frustration, you may sometimes look outward — at conditions, opponents, or luck.",
    developing: "Blame and excuses still play a role in how you process difficult performances. External factors receive too much of your attention.",
    low: "Currently, much of your energy goes toward external attribution. When things go wrong, the default is to look outward rather than inward.",
  },
  humility: {
    mastery: "You embody the beginner's mind of a true master. No matter how much you've achieved, every match and practice is an opportunity to learn. Feedback is received as a gift, not a threat.",
    advanced: "Your growth mindset is well-established and genuine. You actively seek feedback and learn from both wins and losses. Success doesn't breed complacency.",
    solid: "You're generally open to learning and improvement, and you handle most feedback well. After strong wins, maintaining the learning focus can be challenging.",
    developing: "Ego resistance to feedback is still a significant factor. Criticism may feel like an attack, and success can create a false sense of 'having arrived.'",
    low: "Currently, the ego is heavily guarding against perceived threats to self-image. Feedback is filtered, losses are explained away, and growth is limited by defensiveness.",
  },
  power: {
    mastery: "You have found the source within. Your power doesn't come from the scoreboard or external validation — it comes from deep alignment with your values, your breath, and your purpose.",
    advanced: "You have strong access to your inner resources and can draw on them in most situations. Your connection to breath and values provides a reliable anchor.",
    solid: "You've experienced moments of deep alignment and flow, and you know what it feels like. Consistently accessing this state is the challenge.",
    developing: "Your sense of power is still largely tied to external indicators — scores, rankings, validation from others.",
    low: "The need to prove yourself currently drives most of your competitive energy. Power is sought externally — through winning, through recognition, through validation.",
  },
};

const SECTION_EMOJIS: Record<string, string> = {
  calm: "🧘", presence: "🎯", freedom: "🕊️", courage: "🦁",
  responsibility: "⚡", humility: "🌱", power: "💎",
};

/* ── POST ────────────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  const { profile: p, sectionResults, overall, accessType } = await req.json() as {
    profile: Record<string, string>;
    sectionResults: { id: string; title: string; avg: number; questionScores: number[] }[];
    overall: number;
    accessType: "quiz" | "consultation";
  };

  // Save to CSV
  try {
    appendToCSV([
      p.participantId, new Date().toISOString().split("T")[0], accessType,
      p.name, p.email,
      p.age, p.genderIdentity === "Self-describe" ? p.genderSelfDescribe : p.genderIdentity, p.nationality, p.educationLevel,
      p.sport, p.sportType, p.competitiveLevel, p.yearsExperience, p.weeklyTrainingHours,
      p.hasMentalCoaching, p.mentalCoachingDuration, p.hasMindfulnessPractice, p.mindfulnessDuration,
      p.competitiveStatus, p.seasonStatus, p.recentResultOrRanking,
      p.promptedBy, p.allowRecontact,
      Math.round(overall),
      ...sectionResults.map((r) => Math.round(r.avg)),
    ]);
  } catch (err) {
    console.error("[save-results] CSV write error:", err);
  }

  // Build email HTML
  const archetype = getArchetype(overall);
  const narrative = buildNarrative(sectionResults, overall);
  const overallLevel = getLevel(overall);

  const dimensionCards = sectionResults.map((r) => {
    const lvl = getLevel(r.avg);
    const feedback = SECTION_FEEDBACK[r.id]?.[lvl.key] ?? "";
    const emoji = SECTION_EMOJIS[r.id] ?? "";
    const pct = Math.round(r.avg);
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
        <!-- progress bar -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td style="background:#F1F5F9;border-radius:4px;height:6px;padding:0;">
              <div style="width:${pct}%;height:6px;background:linear-gradient(90deg,#2D5A8E88,#2D5A8E);border-radius:4px;"></div>
            </td>
          </tr>
        </table>
        <p style="font-size:13px;color:#64748B;line-height:1.7;margin:0;">${feedback}</p>
      </div>`;
  }).join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#EEF2F7;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:680px;margin:32px auto;background:#F8FAFC;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#1E3D6B,#2D5A8E);padding:36px 32px;text-align:center;">
          <p style="font-size:12px;color:#93C5FD;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Your Results</p>
          <h1 style="font-size:26px;font-weight:700;color:#fff;margin:0;">High Performance Profile</h1>
        </div>

        <div style="padding:32px;">

          <!-- Score + Archetype -->
          <div style="background:#fff;border-radius:16px;padding:32px;text-align:center;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:8px solid ${overallLevel.fg};line-height:104px;text-align:center;margin-bottom:16px;">
              <span style="font-size:36px;font-weight:800;color:#1E293B;">${Math.round(overall)}</span>
            </div>
            <br>
            <span style="font-size:28px;">${archetype.icon}</span>
            <h2 style="font-size:22px;font-weight:700;color:#1E293B;margin:8px 0;">${archetype.title}</h2>
            <p style="font-size:14px;color:#64748B;line-height:1.7;max-width:460px;margin:0 auto;">${archetype.desc}</p>
          </div>

          <!-- Profile Summary -->
          <div style="background:#fff;border-radius:16px;padding:24px;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <h3 style="font-size:14px;font-weight:600;color:#475569;margin:0 0 10px;">📋 Profile Summary</h3>
            <p style="font-size:14px;color:#475569;line-height:1.8;margin:0;">${narrative}</p>
          </div>

          <!-- Dimension Cards -->
          <h3 style="font-size:14px;font-weight:600;color:#475569;margin:0 0 14px;">Profile Dimensions</h3>
          ${dimensionCards}

        </div>
      </div>
    </body>
    </html>`;

  try {
    await resend.emails.send({
      from: "HPP Results <onboarding@resend.dev>",
      to: "a.misiek23@gmail.com",
      subject: `New HPP Submission — ${Math.round(overall)}% · ${archetype.title} [${p.participantId}]`,
      html,
    });
  } catch (err) {
    console.error("[save-results] Email error:", err);
  }

  return NextResponse.json({ success: true });
}
