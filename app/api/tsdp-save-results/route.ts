import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SECTION_TITLES = [
  "Inner Sense of Uniqueness",
  "Authentic vs Adapted Self",
  "Expression & Courage",
  "Inner Voice & Direction",
  "Depth & Meaning",
];

const RESULTS = [
  { min: 20, max: 25, label: "Deep Inner Calling" },
  { min: 14, max: 19, label: "Active Search" },
  { min: 8,  max: 13, label: "Emerging Awareness" },
  { min: 0,  max: 7,  label: "External Identity Orientation" },
];

export async function POST(req: Request) {
  const { totalYes, sectionYes, accessType } = await req.json() as {
    totalYes: number;
    sectionYes: number[];
    accessType: "quiz" | "consultation";
  };

  const result = RESULTS.find((r) => totalYes >= r.min && totalYes <= r.max) ?? RESULTS[RESULTS.length - 1];
  const participantId = `TSDP-${Date.now().toString(36).toUpperCase()}`;

  const sectionRows = SECTION_TITLES.map((title, i) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#F8FAFC;border-radius:10px;margin-bottom:8px;">
      <span style="font-size:14px;color:#334155;font-weight:500;">${title}</span>
      <span style="font-size:14px;font-weight:700;color:#377A00;">${sectionYes[i] ?? 0} / 5 YES</span>
    </div>`).join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#EAF7EB;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:620px;margin:32px auto;background:#F8FAFC;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
        <div style="background:linear-gradient(135deg,#377A00,#2f6a00);padding:36px 32px;text-align:center;">
          <p style="font-size:12px;color:#a8d878;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">New Submission</p>
          <h1 style="font-size:24px;font-weight:700;color:#fff;margin:0;">True Self Discovery Profile</h1>
        </div>
        <div style="padding:32px;">
          <div style="background:#fff;border-radius:16px;padding:28px;text-align:center;margin-bottom:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
            <div style="display:inline-block;width:100px;height:100px;border-radius:50%;border:7px solid #377A00;line-height:86px;text-align:center;margin-bottom:16px;">
              <span style="font-size:30px;font-weight:800;color:#151716;">${totalYes}</span>
            </div>
            <p style="font-size:12px;color:#94A3B8;margin:0 0 4px;">out of 25 YES answers</p>
            <h2 style="font-size:20px;font-weight:700;color:#151716;margin:8px 0 4px;">${result.label}</h2>
            <p style="font-size:13px;color:#64748B;margin:0;">Access type: ${accessType} · ID: ${participantId}</p>
          </div>
          <h3 style="font-size:14px;font-weight:600;color:#475569;margin:0 0 12px;">Section Breakdown</h3>
          ${sectionRows}
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
