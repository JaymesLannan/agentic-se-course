import { NextResponse } from "next/server";
import { getProgressByModule, createTestResponse } from "@/lib/db";
import { gradeResponse } from "@/lib/claude";
import { getModule } from "@/content/index";

export async function POST(request: Request) {
  const { moduleId, questionId, userResponse } = await request.json();

  const mod = getModule(moduleId);
  if (!mod) return NextResponse.json({ error: "Module not found" }, { status: 404 });

  const question = mod.questions.find((q) => q.id === questionId);
  if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

  const progress = getProgressByModule(moduleId) as any;
  if (!progress) return NextResponse.json({ error: "Progress not found" }, { status: 404 });

  let result: { score: number; passed: boolean; feedback: string };

  if (question.options && question.correctAnswer) {
    // Multiple choice — auto-grade, no Claude needed
    const correct = userResponse.trim() === question.correctAnswer.trim();
    result = {
      score: correct ? question.maxScore : 0,
      passed: correct,
      feedback: correct
        ? `Correct! "${question.correctAnswer}" is right.`
        : `Incorrect. The correct answer is: "${question.correctAnswer}". ${question.rubric}`,
    };
  } else {
    // Open-ended — grade with Claude
    result = await gradeResponse({
      moduleTitle: mod.title,
      questionText: question.text,
      questionType: question.type,
      rubric: question.rubric,
      userResponse,
      maxScore: question.maxScore,
    });
  }

  createTestResponse({
    progressId: progress.id,
    questionId,
    questionType: question.type,
    userResponse,
    feedback: result.feedback,
    score: result.score,
    maxScore: question.maxScore,
    passed: result.passed,
  });

  return NextResponse.json(result);
}
