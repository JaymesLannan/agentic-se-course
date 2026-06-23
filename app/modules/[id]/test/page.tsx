"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getModule } from "@/content/index";
import { ArrowLeft, Send, CheckCircle, XCircle, RefreshCw, Loader2, Trophy, ChevronRight } from "lucide-react";

interface GradeResult {
  score: number;
  passed: boolean;
  feedback: string;
}

const TYPE_LABELS: Record<string, { label: string; color: string; description: string }> = {
  conceptual: { label: "Conceptual", color: "text-blue-200 border-blue-400/40 bg-blue-500/15",    description: "Demonstrate deep understanding of the why" },
  applied:    { label: "Applied",    color: "text-sky-200 border-sky-400/40 bg-sky-500/15",        description: "Show judgment in a realistic scenario" },
  hands_on:   { label: "Hands-on",  color: "text-emerald-200 border-emerald-400/40 bg-emerald-500/15", description: "Produce an actual artifact or deliverable" },
  edge_case:  { label: "Edge Case", color: "text-amber-200 border-amber-400/40 bg-amber-500/15",  description: "Navigate unexpected situations and tradeoffs" },
};

export default function TestPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const mod = getModule(id);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [grades, setGrades] = useState<Record<string, GradeResult & { loading?: boolean }>>({});
  const [submitting, setSubmitting] = useState(false);
  const [allSubmitted, setAllSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);

  if (!mod) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Module not found</p>
          <Link href="/" className="text-sky-300 hover:text-sky-200">← Back to home</Link>
        </div>
      </div>
    );
  }

  const totalMaxScore = mod.questions.reduce((acc, q) => acc + q.maxScore, 0);

  async function submitAll() {
    setSubmitting(true);
    const results: Record<string, GradeResult> = {};

    for (const question of mod!.questions) {
      const response = answers[question.id] ?? "";
      if (!response.trim()) {
        results[question.id] = { score: 0, passed: false, feedback: "No answer provided." };
        setGrades((prev) => ({ ...prev, [question.id]: results[question.id] }));
        continue;
      }

      setGrades((prev) => ({ ...prev, [question.id]: { score: 0, passed: false, feedback: "", loading: true } }));

      try {
        const res = await fetch("/api/grade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleId: id, questionId: question.id, userResponse: response }),
        });
        const data = await res.json();
        results[question.id] = data;
        setGrades((prev) => ({ ...prev, [question.id]: { ...data, loading: false } }));
      } catch {
        results[question.id] = { score: 0, passed: false, feedback: "Grading failed — please try again." };
        setGrades((prev) => ({ ...prev, [question.id]: { ...results[question.id], loading: false } }));
      }
    }

    const totalEarned = Object.values(results).reduce((acc, r) => acc + (r.score ?? 0), 0);
    const pct = Math.round((totalEarned / totalMaxScore) * 100);
    const didPass = pct >= 80;

    setFinalScore(pct);
    setPassed(didPass);
    setAllSubmitted(true);
    setSubmitting(false);

    setSavingProgress(true);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: id, status: didPass ? "completed" : "available", score: pct }),
    });
    setSavingProgress(false);
  }

  const answeredCount = mod.questions.filter((q) => (answers[q.id] ?? "").trim().length > 0).length;
  const allAnswered = answeredCount === mod.questions.length;

  return (
    <div className="min-h-screen bg-[#111827]">
      <header className="border-b border-gray-700 bg-[#111827]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href={`/modules/${id}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to module
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-300">{answeredCount}/{mod.questions.length} answered</span>
            {!allSubmitted && (
              <button
                onClick={submitAll}
                disabled={submitting || !allAnswered}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-sky-400 hover:to-blue-500 transition-all duration-200"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Grading..." : "Submit all"}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-2">{mod.trackName} · Module {mod.order}</p>
          <h1 className="text-2xl font-extrabold text-white mb-2">{mod.title} — Test</h1>
          <p className="text-gray-300 text-sm">{mod.questions.length} questions · Score 80%+ to advance · Claude grades open-ended answers</p>
        </div>

        {/* Result banner */}
        {allSubmitted && finalScore !== null && (
          <div className={`rounded-2xl border p-6 mb-8 ${passed ? "border-emerald-500/40 bg-emerald-500/10" : "border-red-500/40 bg-red-500/10"}`}>
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-full flex items-center justify-center ${passed ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                {passed ? <Trophy className="h-7 w-7 text-emerald-400" /> : <XCircle className="h-7 w-7 text-red-400" />}
              </div>
              <div className="flex-1">
                <div className={`text-3xl font-extrabold ${passed ? "text-emerald-400" : "text-red-400"}`}>{finalScore}%</div>
                <p className={`font-semibold ${passed ? "text-emerald-300" : "text-red-300"}`}>
                  {passed ? "Passed — next module unlocked!" : `Not yet — need 80% (${80 - finalScore} more points)`}
                </p>
                {savingProgress && <p className="text-xs text-gray-400 mt-1">Saving progress...</p>}
              </div>
              {passed ? (
                <Link href="/" className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors">
                  Continue <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={() => { setAllSubmitted(false); setGrades({}); setFinalScore(null); setPassed(false); }}
                  className="flex items-center gap-2 rounded-xl bg-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-100 hover:bg-gray-600 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              )}
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-8">
          {mod.questions.map((q, i) => {
            const typeInfo = TYPE_LABELS[q.type] ?? { label: q.type, color: "text-gray-300 border-gray-500/40 bg-gray-500/10", description: "" };
            const grade = grades[q.id];
            const hasGrade = grade && !grade.loading;
            const isMC = !!(q.options && q.correctAnswer);

            return (
              <div key={q.id} className={`rounded-2xl border transition-all duration-200 ${
                hasGrade
                  ? grade.passed ? "border-emerald-500/30 bg-emerald-500/8" : "border-red-500/30 bg-red-500/8"
                  : "border-gray-700 bg-gray-800/60"
              }`}>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-sm text-gray-400 font-bold mt-0.5 w-6 shrink-0">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${typeInfo.color}`}>{typeInfo.label}</span>
                        {isMC && <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-gray-500/40 bg-gray-500/10 text-gray-300">Multiple Choice</span>}
                        <span className="text-xs text-gray-400">{typeInfo.description}</span>
                        <span className="ml-auto text-xs text-gray-300 font-medium">{q.maxScore} points</span>
                      </div>
                      <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-line">{q.text}</p>
                    </div>
                  </div>

                  {/* Multiple choice options */}
                  {isMC && !hasGrade && (
                    <div className="space-y-2 ml-9">
                      {q.options!.map((option, optIdx) => {
                        const isSelected = answers[q.id] === option;
                        return (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                              submitting || allSubmitted ? "opacity-50 cursor-not-allowed" :
                              isSelected
                                ? "border-sky-400/60 bg-sky-500/15 text-white"
                                : "border-gray-600 bg-gray-900/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={isSelected}
                              onChange={() => !submitting && !allSubmitted && setAnswers((prev) => ({ ...prev, [q.id]: option }))}
                              disabled={submitting || allSubmitted}
                              className="accent-sky-400 h-4 w-4 shrink-0"
                            />
                            <span className="text-sm leading-snug">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* MC result display */}
                  {isMC && hasGrade && (
                    <div className="ml-9 space-y-2">
                      {q.options!.map((option, optIdx) => {
                        const isSelected = answers[q.id] === option;
                        const isCorrect = option === q.correctAnswer;
                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                              isCorrect
                                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                                : isSelected && !isCorrect
                                ? "border-red-500/40 bg-red-500/10 text-red-300"
                                : "border-gray-700 bg-gray-900/30 text-gray-500"
                            }`}
                          >
                            {isCorrect ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                              : isSelected ? <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                              : <span className="h-4 w-4 shrink-0" />}
                            <span className="text-sm leading-snug">{option}</span>
                            {isSelected && !isCorrect && <span className="text-xs text-red-400 ml-auto">Your answer</span>}
                            {isCorrect && <span className="text-xs text-emerald-400 ml-auto">Correct</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Open-ended textarea */}
                  {!isMC && (!allSubmitted || !hasGrade) && (
                    <textarea
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder}
                      disabled={submitting || allSubmitted}
                      rows={8}
                      className="w-full rounded-xl border border-gray-600 bg-gray-900 text-gray-100 text-sm p-4 resize-none focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 placeholder-gray-500 disabled:opacity-50 leading-relaxed"
                    />
                  )}

                  {grade?.loading && (
                    <div className="flex items-center gap-3 text-sm text-gray-300 py-4">
                      <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
                      Claude is grading this answer...
                    </div>
                  )}

                  {/* Open-ended submitted answer */}
                  {!isMC && hasGrade && answers[q.id] && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Your answer</p>
                      <div className="rounded-xl border border-gray-700 bg-gray-900 p-4 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {answers[q.id]}
                      </div>
                    </div>
                  )}

                  {/* Feedback block */}
                  {hasGrade && (
                    <div className={`rounded-xl border p-4 mt-4 ${grade.passed ? "border-emerald-500/30 bg-emerald-500/10" : "border-amber-500/30 bg-amber-500/10"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {grade.passed
                            ? <CheckCircle className="h-4 w-4 text-emerald-400" />
                            : <XCircle className="h-4 w-4 text-amber-400" />}
                          <span className={`text-sm font-semibold ${grade.passed ? "text-emerald-300" : "text-amber-300"}`}>
                            {grade.passed ? "Passed" : "Needs improvement"}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${grade.passed ? "text-emerald-300" : "text-amber-300"}`}>
                          {grade.score}/{q.maxScore}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{grade.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!allSubmitted && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-300">
              {allAnswered ? "All questions answered — ready to submit" : `${mod.questions.length - answeredCount} question${mod.questions.length - answeredCount !== 1 ? "s" : ""} remaining`}
            </p>
            <button
              onClick={submitAll}
              disabled={submitting || !allAnswered}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-sky-400 hover:to-blue-500 transition-all duration-200 hover:-translate-y-0.5"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Grading all answers..." : "Submit & grade all"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
