import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CSV_PATH = path.join(process.cwd(), "data", "smp-results.csv");

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("key");

  if (!secret || secret !== process.env.EXPORT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  if (!fs.existsSync(CSV_PATH)) {
    return NextResponse.json({ error: "No results yet." }, { status: 404 });
  }

  const csv = fs.readFileSync(CSV_PATH, "utf8");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="smp-results-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
