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

const getArchetype = (overall: number) => {
  if (overall >= 86) return { title: "True Mastery", icon: "🏆" };
  if (overall >= 71) return { title: "High-Level Performer", icon: "⭐" };
  if (overall >= 51) return { title: "Solid Competitive Mind", icon: "💪" };
  if (overall >= 21) return { title: "Developing Awareness", icon: "🌅" };
  return { title: "Ego-Based Performer", icon: "🔥" };
};

const getLevelColor = (score: number) => {
  if (score >= 86) return "#7C3AED";
  if (score >= 71) return "#3B82F6";
  if (score >= 51) return "#059669";
  if (score >= 21) return "#D97706";
  return "#DC2626";
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
  sectionResults: { title: string; shortName: string; avg: number }[];
  accessType: string;
}) {
  const archetype = getArchetype(data.overall);
  const rows = data.sectionResults.map((s) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333">${s.title}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:700;font-size:14px;color:${getLevelColor(s.avg)}">${Math.round(s.avg)}%</td>
    </tr>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#1E3D6B,#2D5A8E);padding:36px 32px;text-align:center">
      <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,.7);letter-spacing:.14em;text-transform:uppercase">Elite Tennis Profile</p>
      <h1 style="margin:0;font-size:28px;color:#fff;font-weight:700">Your Results</h1>
    </div>
    <div style="padding:32px">
      <div style="text-align:center;margin-bottom:28px">
        <div style="display:inline-block;background:#EEF4FF;border-radius:50%;width:90px;height:90px;line-height:90px;font-size:40px;margin-bottom:12px">${archetype.icon}</div>
        <div style="font-size:36px;font-weight:800;color:#1E293B;margin-bottom:4px">${Math.round(data.overall)}%</div>
        <div style="font-size:18px;font-weight:700;color:#2D5A8E">${archetype.title}</div>
      </div>
      <h2 style="font-size:15px;color:#475569;margin:0 0 12px;font-weight:600">Section Scores</h2>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      ${data.accessType === "consultation" ? `
      <div style="margin-top:28px;background:#EEF4FF;border-radius:12px;padding:20px;text-align:center">
        <p style="margin:0 0 12px;font-size:14px;color:#2D5A8E;font-weight:600">📅 You've unlocked a 30-minute consultation with Andrew</p>
        <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/a-misiek23/30min"}" style="display:inline-block;padding:12px 32px;background:#2D5A8E;color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px">Book on Calendly →</a>
      </div>` : ""}
    </div>
    <div style="background:#f8faf8;padding:20px 32px;text-align:center;border-top:1px solid #eee">
      <p style="margin:0;font-size:12px;color:#999">CoachAndrew · Breath. Move. Grow.</p>
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
