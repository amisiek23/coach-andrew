import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  { min: 20, max: 25, label: "Deep Inner Calling",           icon: "🌿", color: "#377A00" },
  { min: 14, max: 19, label: "Active Search",                icon: "🔍", color: "#2D5A8E" },
  { min: 8,  max: 13, label: "Emerging Awareness",           icon: "🌅", color: "#D97706" },
  { min: 0,  max: 7,  label: "External Identity Orientation",icon: "🔲", color: "#64748B" },
];

const TSDP_SECTIONS = ["Uniqueness", "Authentic", "Expression", "Inner Voice", "Depth"];

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
  const result = TSDP_RESULTS.find((r) => data.totalYes >= r.min && data.totalYes <= r.max) ?? TSDP_RESULTS[TSDP_RESULTS.length - 1];
  const rows = TSDP_SECTIONS.map((name, i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333">${name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:700;font-size:14px;color:${result.color}">${data.sectionYes[i] ?? 0} / 5</td>
    </tr>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#2c6300,#377A00);padding:36px 32px;text-align:center">
      <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,.7);letter-spacing:.14em;text-transform:uppercase">Unique Self Assessment</p>
      <h1 style="margin:0;font-size:28px;color:#fff;font-weight:700">Your Results</h1>
    </div>
    <div style="padding:32px">
      <div style="text-align:center;margin-bottom:28px">
        <div style="display:inline-block;background:#EAF7EB;border-radius:50%;width:90px;height:90px;line-height:90px;font-size:40px;margin-bottom:12px">${result.icon}</div>
        <div style="font-size:36px;font-weight:800;color:#151716;margin-bottom:4px">${data.totalYes} / 25</div>
        <div style="font-size:18px;font-weight:700;color:${result.color}">${result.label}</div>
      </div>
      <h2 style="font-size:15px;color:#475569;margin:0 0 12px;font-weight:600">Section Breakdown</h2>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      ${data.accessType === "consultation" ? `
      <div style="margin-top:28px;background:#EAF7EB;border-radius:12px;padding:20px;text-align:center">
        <p style="margin:0 0 12px;font-size:14px;color:#377A00;font-weight:600">📅 You've unlocked a 30-minute consultation with Andrew</p>
        <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/a-misiek23/30min"}" style="display:inline-block;padding:12px 32px;background:#377A00;color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px">Book on Calendly →</a>
      </div>` : ""}
    </div>
    <div style="background:#f8faf8;padding:20px 32px;text-align:center;border-top:1px solid #eee">
      <p style="margin:0;font-size:12px;color:#999">CoachAndrew · Breath. Move. Grow.</p>
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
    const subject = `${quizName} results — ${email}`;

    const html = quizType === "etp"
      ? etpHtml(results as Parameters<typeof etpHtml>[0])
      : tsdpHtml(results as Parameters<typeof tsdpHtml>[0]);

    await resend.emails.send({
      from: "CoachAndrew <onboarding@resend.dev>",
      to: "a.misiek23@gmail.com",
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-results-email]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
