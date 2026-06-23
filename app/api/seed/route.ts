import { NextResponse } from "next/server";
import { upsertProgress, getAllProgress } from "@/lib/db";
import { MODULES } from "@/content/index";

export async function POST() {
  try {
    const existing = getAllProgress() as any[];
    if (existing.length > 0) return NextResponse.json({ ok: true, skipped: true });

    for (let i = 0; i < MODULES.length; i++) {
      upsertProgress(MODULES[i].id, i === 0 ? "available" : "locked");
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
