import { parseDrizzleSchema } from "@/lib/extractor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  const parsed = parseDrizzleSchema(code);
  console.log(parsed);

  return NextResponse.json({ data: parsed });
}
