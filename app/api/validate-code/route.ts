import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json() as { code: string };
  const validCodes = (process.env.ACCESS_CODES ?? "")
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);

  const valid = validCodes.includes(code.trim().toUpperCase());
  return NextResponse.json({ valid });
}
