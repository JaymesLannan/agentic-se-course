import { NextResponse } from "next/server";
import { getAllProgress, updateProgress, unlockModule, getProgressByModule } from "@/lib/db";
import { MODULES } from "@/content/index";

export async function GET() {
  const records = getAllProgress();
  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const { moduleId, status, score } = await request.json();

  updateProgress(moduleId, status, score);

  if (status === "completed") {
    const current = MODULES.find((m) => m.id === moduleId);
    const next = MODULES.find((m) => current && m.order === current.order + 1);
    if (next) {
      unlockModule(next.id);
    }
  }

  return NextResponse.json(getProgressByModule(moduleId));
}
