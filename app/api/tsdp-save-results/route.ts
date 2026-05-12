import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SECTIONS = [
  { title: "Inner Sense of Uniqueness",  emoji: "🌱" },
  { title: "Authentic vs Adapted Self",  emoji: "🔍" },
  { title: "Expression & Courage",       emoji: "🔥" },
  { title: "Inner Voice & Direction",    emoji: "🧭" },
  { title: "Depth & Meaning",            emoji: "✨" },
];

const RESULTS = [
  {
    min: 20, max: 25,
    label: "Deep Inner Calling",
    color: "#377A00", bg: "#EAF7EB", icon: "🌿",
    desc: "You strongly feel that there is a deeper self within you waiting to be expressed. This is not confusion — it is awakening. The inner calling you sense is real, and it is asking to be honoured.",
  },
  {
    min: 14, max: 19,
    label: "Active Search",
    color: "#2D5A8E", bg: "#EEF4FF", icon: "🔍",
    desc: "You are aware that there is more to you than your current expression. You are in the process of discovery — actively searching, questioning, and beginning to listen more deeply to what is true for you.",
  },
  {
    min: 8, max: 13,
    label: "Emerging Awareness",
    color: "#D97706", bg: "#FEF3C7", icon: "🌅",
    desc: "You occasionally feel this inner layer, but it is not yet stable. Life may still be guided more by external structures. The awareness is emerging — and that is where every meaningful journey begins.",
  },
  {
    min: 0, max: 7,
    label: "External Identity Orientation",
    color: "#64748B", bg: "#F1F5F9", icon: "🔲",
    desc: "Your identity is currently shaped more by roles, expectations, and environment. The inner layer may not yet be a central focus — and that is okay. Asking the question at all is the first step.",
  },
];

export async function POST(req: Request) {
  const { totalYes, sectionYes, accessType } = await req.json() as {
    totalYes: number;
    sectionYes: number[];
    accessType: "quiz" | "consultation";
  };

  const result     = RESULTS.find((r) => totalYes >= r.min && totalYes <= r.max) ?? RESULTS[RESULTS.length - 1];
  const participantId = `TSDP-${Date.now().toString(36).toUpperCase()}`;

  /* ── Section breakdown cards ─────────────────────────────────────── */
  const sectionCards = SECTIONS.map((sec, i) => {
    const yes = sectionYes[i] ?? 0;
    const pct = Math.round((yes / 5) * 100);
    return `
      <div style="background:#fff;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.05);border-left:4px solid #377A00;">
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
          <tr>
            <td style="font-size:14px;font-weight:600;color:#151716;">${sec.emoji} ${sec.title}</td>
            <td align="right" style="font-size:14px;font-weight:700;color:#377A00;white-space:nowrap;">${yes} / 5 YES</td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#F1F5F9;border-radius:4px;height:6px;padding:0;">
              <div style="width:${pct}%;height:6px;background:linear-gradient(90deg,#377A0088,#377A00);border-radius:4px;"></div>
            </td>
          </tr>
        </table>
      </div>`;
  }).join("");

  /* ── Activation scale ────────────────────────────────────────────── */
  const scaleRows = RESULTS.map((r) => {
    const isActive = r.label === result.label;
    return `
      <div style="display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-radius:10px;margin-bottom:8px;background:${isActive ? r.bg : "#F8FAFC"};border:1.5px solid ${isActive ? r.color : "transparent"};">
        <span style="font-size:18px;flex-shrink:0;">${r.icon}</span>
        <div>
          <p style="font-size:13px;font-weight:700;color:${r.color};margin:0 0 3px;">${r.label} &middot; ${r.min}–${r.max} YES</p>
          <p style="font-size:13px;color:#64748B;line-height:1.6;margin:0;">${r.desc}</p>
        </div>
      </div>`;
  }).join("");

  /* ── Full email ──────────────────────────────────────────────────── */
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#e2ecdf;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:660px;margin:32px auto;background:#F8FAFC;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#377A00,#2f6a00);padding:36px 32px;text-align:center;">
          <p style="font-size:12px;color:#a8d878;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Your Results</p>
          <h1 style="font-size:26px;font-weight:700;color:#fff;margin:0;font-family:Georgia,serif;">True Self Discovery Profile</h1>
        </div>

        <div style="padding:32px;">

          <!-- Score + Category card -->
          <div style="background:#fff;border-radius:16px;padding:32px;text-align:center;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <!-- Score circle -->
            <div style="display:inline-block;width:110px;height:110px;border-radius:50%;border:8px solid ${result.color};text-align:center;margin-bottom:16px;line-height:1;">
              <table width="110" height="110" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr><td align="center" valign="middle">
                  <span style="font-size:34px;font-weight:800;color:#151716;display:block;">${totalYes}</span>
                  <span style="font-size:12px;color:#94A3B8;font-weight:500;">/ 25</span>
                </td></tr>
              </table>
            </div>
            <!-- Icon + Label -->
            <div style="font-size:32px;margin-bottom:8px;">${result.icon}</div>
            <h2 style="font-size:22px;font-weight:700;color:#151716;margin:0 0 10px;font-family:Georgia,serif;">${result.label}</h2>
            <!-- Badge -->
            <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${result.color};background:${result.bg};padding:4px 16px;border-radius:20px;margin-bottom:14px;">
              ${totalYes} YES answers out of 25
            </div>
            <!-- Description -->
            <p style="font-size:15px;color:#3a4a3a;line-height:1.8;max-width:480px;margin:0 auto;">${result.desc}</p>
            <!-- Meta -->
            <p style="font-size:12px;color:#94A3B8;margin:16px 0 0;">Access: ${accessType} &middot; ID: ${participantId}</p>
          </div>

          <!-- Section breakdown -->
          <h3 style="font-size:15px;font-weight:600;color:#475569;margin:0 0 14px;">Section Breakdown</h3>
          ${sectionCards}

          <!-- Activation scale -->
          <h3 style="font-size:15px;font-weight:600;color:#475569;margin:20px 0 12px;">Self-Discovery Activation Scale</h3>
          ${scaleRows}

        </div>

        <!-- Footer -->
        <div style="background:#EAF7EB;padding:20px 32px;text-align:center;border-top:1px solid #c8e0c4;">
          <p style="font-size:13px;color:#377A00;font-weight:600;margin:0;font-style:italic;">CoachAndrew · Breath. Act. Grow.</p>
        </div>

      </div>
    </body>
    </html>`;

  try {
    await resend.emails.send({
      from: "TSDP Results <onboarding@resend.dev>",
      to: "a.misiek23@gmail.com",
      subject: `New TSDP Submission — ${totalYes}/25 YES · ${result.label} [${participantId}]`,
      html,
    });
  } catch (err) {
    console.error("[tsdp-save-results] Email error:", err);
  }

  return NextResponse.json({ success: true });
}
