import { parseDrizzleSchema } from "@/lib/parseDrizzleSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  const parsed = parseDrizzleSchema(code);

  return NextResponse.json({ data: parsed });
}
