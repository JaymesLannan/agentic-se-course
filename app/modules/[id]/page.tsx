"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getModule } from "@/content/index";
import { ArrowLeft, Clock, BookOpen, ChevronRight, Zap } from "lucide-react";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  conceptual: { label: "Conceptual", color: "text-blue-200 bg-blue-500/20 border-blue-400/40" },
  applied:    { label: "Applied",    color: "text-sky-200 bg-sky-500/20 border-sky-400/40" },
  hands_on:   { label: "Hands-on",  color: "text-emerald-200 bg-emerald-500/20 border-emerald-400/40" },
  edge_case:  { label: "Edge Case", color: "text-amber-200 bg-amber-500/20 border-amber-400/40" },
};

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const mod = getModule(id);

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

  return (
    <div className="min-h-screen bg-[#111827]">
      <header className="border-b border-gray-700 bg-[#111827]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            All modules
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="h-4 w-4" />
            {mod.estimatedMinutes} min
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-200 bg-sky-500/15 border border-sky-400/35 px-2.5 py-1 rounded-full">
              {mod.trackName}
            </span>
            <span className="text-xs text-gray-400">Module {mod.order} of 17</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">{mod.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{mod.description}</p>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800/60 p-8 mb-10">
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{mod.content}</ReactMarkdown>
          </div>
        </div>

        {/* Test preview */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800/60 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-sky-300" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Module Test</h2>
              <p className="text-sm text-gray-300">{mod.questions.length} questions · Score 80%+ to unlock next module</p>
            </div>
          </div>

          <div className="space-y-2.5 mb-6">
            {mod.questions.map((q, i) => {
              const typeInfo = TYPE_LABELS[q.type] ?? { label: q.type, color: "text-gray-300" };
              return (
                <div key={q.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 bg-gray-900/50">
                  <span className="text-xs text-gray-500 font-mono w-5">{i + 1}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${typeInfo.color}`}>{typeInfo.label}</span>
                  <span className="text-sm text-gray-200 flex-1 truncate">{q.text.slice(0, 80)}...</span>
                  <span className="text-xs text-gray-400">{q.maxScore}pts</span>
                </div>
              );
            })}
          </div>

          <Link
            href={`/modules/${mod.id}/test`}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Zap className="h-4 w-4" />
            Start Test
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
