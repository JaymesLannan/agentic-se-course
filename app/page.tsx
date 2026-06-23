"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MODULES, TRACKS } from "@/content/index";
import { BookOpen, CheckCircle, Lock, Clock, ChevronRight, Zap } from "lucide-react";

interface ProgressRecord {
  moduleId: string;
  status: string;
  score: number | null;
  attempts: number;
}

const TRACK_GRADIENT: Record<number, string> = {
  1: "from-blue-500/10 to-transparent border-blue-400/25",
  2: "from-sky-500/10 to-transparent border-sky-400/25",
  3: "from-emerald-500/10 to-transparent border-emerald-400/25",
  4: "from-amber-500/10 to-transparent border-amber-400/25",
};

const TRACK_BADGE: Record<number, string> = {
  1: "bg-blue-500/20 text-blue-200 border-blue-400/40",
  2: "bg-sky-500/20 text-sky-200 border-sky-400/40",
  3: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  4: "bg-amber-500/20 text-amber-200 border-amber-400/40",
};

export default function HomePage() {
  const [progress, setProgress] = useState<ProgressRecord[]>([]);

  useEffect(() => {
    async function init() {
      const res = await fetch("/api/progress");
      const existing = await res.json();
      if (!Array.isArray(existing) || existing.length === 0) {
        await fetch("/api/seed", { method: "POST" });
      }
      const prog = await fetch("/api/progress").then((r) => r.json());
      setProgress(Array.isArray(prog) ? prog : []);
    }
    init();
  }, []);

  const getModuleProgress = (id: string): ProgressRecord | undefined =>
    progress.find((p) => p.moduleId === id);

  const totalCompleted = progress.filter((p) => p.status === "completed").length;
  const totalModules = MODULES.length;
  const overallPct = totalModules > 0 ? Math.round((totalCompleted / totalModules) * 100) : 0;

  const nextModule = MODULES.find((m) => getModuleProgress(m.id)?.status === "available");
  const totalMinutes = MODULES.reduce((acc, m) => acc + m.estimatedMinutes, 0);
  const completedMinutes = MODULES.filter(
    (m) => getModuleProgress(m.id)?.status === "completed"
  ).reduce((acc, m) => acc + m.estimatedMinutes, 0);

  return (
    <div className="min-h-screen bg-[#111827]">
      <header className="border-b border-gray-700 bg-[#111827]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-gray-100 text-[15px] tracking-tight">Agentic SE Training</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>{totalCompleted}/{totalModules} modules</span>
            <div className="h-2 w-32 rounded-full bg-gray-700 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
            <span className="text-gray-100 font-semibold">{overallPct}%</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1.5 text-sm font-semibold text-sky-300 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Zero to interview-ready
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">Agentic Solutions Engineer</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">17 modules across 4 tracks. Master every concept, skill, and responsibility an interviewer will probe.</p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{Math.round(totalMinutes / 60)}h total</span>
            <span>·</span>
            <span>{totalModules} modules</span>
            <span>·</span>
            <span>80% required to advance</span>
          </div>
        </div>

        {nextModule && (
          <div className="mb-10">
            <Link href={`/modules/${nextModule.id}`} className="group flex items-center justify-between rounded-2xl border border-sky-400/40 bg-sky-500/10 px-6 py-5 hover:border-sky-400/60 hover:bg-sky-500/15 transition-all duration-200">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-1">Continue where you left off</p>
                <p className="text-white font-semibold text-base">{nextModule.title}</p>
                <p className="text-sm text-gray-300 mt-0.5">{nextModule.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-sky-300 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Completed", value: totalCompleted },
            { label: "Hours invested", value: `${Math.round(completedMinutes / 60)}h` },
            { label: "Remaining", value: totalModules - totalCompleted },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-700 bg-gray-800 p-5 text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {Object.entries(TRACKS).map(([trackNum, track]) => {
          const trackModules = MODULES.filter((m) => m.track === Number(trackNum));
          const trackCompleted = trackModules.filter((m) => getModuleProgress(m.id)?.status === "completed").length;

          return (
            <div key={trackNum} className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${TRACK_BADGE[Number(trackNum)]}`}>Track {trackNum}</span>
                <h2 className="text-lg font-bold text-white">{track.name}</h2>
                <span className="text-sm text-gray-400 ml-auto">{trackCompleted}/{trackModules.length}</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">{track.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trackModules.map((mod) => {
                  const prog = getModuleProgress(mod.id);
                  const status = prog?.status ?? "locked";
                  const isLocked = status === "locked";
                  const isCompleted = status === "completed";

                  return (
                    <div key={mod.id} className={`relative rounded-xl border transition-all duration-200 ${
                      isLocked ? "border-gray-700/60 bg-gray-800/30 opacity-45 cursor-not-allowed"
                      : isCompleted ? "border-emerald-500/40 bg-emerald-500/8 hover:border-emerald-400/60"
                      : `border-gray-600 bg-gradient-to-br ${TRACK_GRADIENT[Number(trackNum)]} hover:border-gray-400`
                    }`}>
                      {isLocked ? (
                        <div className="p-5 flex items-start gap-4">
                          <Lock className="h-4 w-4 text-gray-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">M{mod.order}: {mod.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{mod.estimatedMinutes} min · Complete previous module to unlock</p>
                          </div>
                        </div>
                      ) : (
                        <Link href={`/modules/${mod.id}`} className="block p-5">
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 shrink-0">
                              {isCompleted ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <BookOpen className="h-4 w-4 text-gray-300" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white">M{mod.order}: {mod.title}</p>
                              <p className="text-xs text-gray-300 mt-1 leading-relaxed line-clamp-2">{mod.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{mod.estimatedMinutes} min</span>
                                {isCompleted && prog?.score != null && <span className="text-xs text-emerald-400 font-semibold">Best: {prog.score}%</span>}
                                {status === "available" && !isCompleted && <span className="text-xs text-sky-300 font-semibold">● Ready</span>}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
