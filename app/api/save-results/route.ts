import { Resend } from "resend";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const CSV_PATH = path.join(process.cwd(), "data", "smp-results.csv");

const CSV_HEADERS = [
  "Participant ID", "Date", "Access Type",
  // Identity
  "Name", "Email",
  // Demographic
  "Age", "Gender Identity", "Nationality", "Education Level",
  // Sport-specific
  "Sport", "Sport Type", "Competitive Level", "Years Experience", "Weekly Training Hours",
  // Psychological background
  "Mental Coaching?", "Mental Coaching Duration", "Mindfulness Practice?", "Mindfulness Duration",
  // Performance context
  "Competitive Status", "Season Status", "Recent Result / Ranking",
  // Optional
  "Prompted By", "Allow Re-contact",
  // Scores
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

export async function POST(req: Request) {
  const { profile: p, sectionResults, overall, accessType } = await req.json();

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
      ...sectionResults.map((r: { avg: number }) => Math.round(r.avg)),
    ]);
  } catch (err) {
    console.error("[save-results] CSV write error:", err);
  }

  // Send email
  const dimensionRows = sectionResults
    .map((r: { title: string; avg: number; questionScores: number[] }) =>
      `<tr>
        <td style="padding:6px 12px;border:1px solid #d4e8d4;">${r.title}</td>
        <td style="padding:6px 12px;border:1px solid #d4e8d4;text-align:center;font-weight:700;">${Math.round(r.avg)}%</td>
        <td style="padding:6px 12px;border:1px solid #d4e8d4;font-size:12px;">${r.questionScores.map((s: number, i: number) => `Q${i + 1}: ${s}%`).join(" · ")}</td>
      </tr>`
    ).join("");

  const row = (label: string, val: string) => val ? `<tr><td style="padding:4px 0;color:#555;width:200px;">${label}</td><td style="padding:4px 0;font-weight:500;">${val}</td></tr>` : "";

  const html = `
    <div style="font-family:sans-serif;max-width:700px;margin:0 auto;color:#1e2e1e;">
      <div style="background:linear-gradient(135deg,#2c6300,#4a9900);padding:24px 32px;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:22px;">New EPAS Submission</h1>
        <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">${p.participantId} · ${accessType === "consultation" ? "Full Experience" : "Assessment Only"}</p>
      </div>
      <div style="background:#f8faf8;padding:24px 32px;border:1px solid #d4e8d4;border-top:none;">
        <h2 style="font-size:14px;color:#377A00;margin:0 0 12px;text-transform:uppercase;letter-spacing:.08em;">Identity</h2>
        <table style="font-size:14px;">${row("Name", p.name)}${row("Email", p.email)}</table>
        <h2 style="font-size:14px;color:#377A00;margin:16px 0 12px;text-transform:uppercase;letter-spacing:.08em;">Demographic</h2>
        <table style="font-size:14px;">${row("Age", p.age)}${row("Gender", p.genderIdentity === "Self-describe" ? p.genderSelfDescribe : p.genderIdentity)}${row("Nationality", p.nationality)}${row("Education", p.educationLevel)}</table>
        <h2 style="font-size:14px;color:#377A00;margin:16px 0 12px;text-transform:uppercase;letter-spacing:.08em;">Sport</h2>
        <table style="font-size:14px;">${row("Sport", p.sport)}${row("Type", p.sportType)}${row("Level", p.competitiveLevel)}${row("Years exp.", p.yearsExperience)}${row("Hours/week", p.weeklyTrainingHours)}</table>
        <h2 style="font-size:14px;color:#377A00;margin:16px 0 12px;text-transform:uppercase;letter-spacing:.08em;">Psychological Background</h2>
        <table style="font-size:14px;">${row("Mental coaching?", p.hasMentalCoaching)}${row("Duration", p.mentalCoachingDuration)}${row("Mindfulness?", p.hasMindfulnessPractice)}${row("Duration", p.mindfulnessDuration)}</table>
        <h2 style="font-size:14px;color:#377A00;margin:16px 0 12px;text-transform:uppercase;letter-spacing:.08em;">Performance Context</h2>
        <table style="font-size:14px;">${row("Status", p.competitiveStatus)}${row("Season", p.seasonStatus)}${row("Result / Ranking", p.recentResultOrRanking)}</table>
        <h2 style="font-size:14px;color:#377A00;margin:16px 0 12px;text-transform:uppercase;letter-spacing:.08em;">Optional</h2>
        <table style="font-size:14px;">${row("Prompted by", p.promptedBy)}${row("Allow re-contact", p.allowRecontact)}</table>
      </div>
      <div style="background:#fff;padding:24px 32px;border:1px solid #d4e8d4;border-top:none;">
        <h2 style="font-size:14px;color:#377A00;margin:0 0 4px;text-transform:uppercase;letter-spacing:.08em;">Overall Score</h2>
        <p style="font-size:32px;font-weight:800;color:#1e2e1e;margin:0 0 16px;">${Math.round(overall)}%</p>
        <h2 style="font-size:14px;color:#377A00;margin:0 0 12px;text-transform:uppercase;letter-spacing:.08em;">Dimensions</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="background:#EAF7EB;">
            <th style="padding:6px 12px;border:1px solid #d4e8d4;text-align:left;">Dimension</th>
            <th style="padding:6px 12px;border:1px solid #d4e8d4;">Score</th>
            <th style="padding:6px 12px;border:1px solid #d4e8d4;text-align:left;">Questions</th>
          </tr></thead>
          <tbody>${dimensionRows}</tbody>
        </table>
      </div>
    </div>`;

  try {
    await resend.emails.send({
      from: "EPAS Results <onboarding@resend.dev>",
      to: "a.misiek23@gmail.com",
      subject: `New EPAS: ${p.name} — ${Math.round(overall)}% [${p.participantId}]`,
      html,
    });
  } catch (err) {
    console.error("[save-results] Email error:", err);
  }

  return NextResponse.json({ success: true });
}
