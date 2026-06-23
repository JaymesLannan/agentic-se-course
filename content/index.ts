import type { Module } from "./types";
import { module as m1 } from "./modules/m1-how-llms-work";
import { module as m2 } from "./modules/m2-what-is-agentic";
import { module as m3 } from "./modules/m3-tool-use";
import { module as m4 } from "./modules/m4-rag-systems";
import { module as m5 } from "./modules/m5-multi-agent";
import { module as m6 } from "./modules/m6-claude-code-deep-dive";
import { module as m7 } from "./modules/m7-agent-friendly-codebases";
import { module as m8 } from "./modules/m8-mcps";
import { module as m9 } from "./modules/m9-custom-skills";
import { module as m10 } from "./modules/m10-pairing-with-engineers";
import { module as m11 } from "./modules/m11-running-discovery";
import { module as m12 } from "./modules/m12-sdlc-failure-modes";
import { module as m13 } from "./modules/m13-redesigning-workflows";
import { module as m14 } from "./modules/m14-teaching-by-doing";
import { module as m15 } from "./modules/m15-upskilling-programs";
import { module as m16 } from "./modules/m16-pattern-recognition";
import { module as m17 } from "./modules/m17-scaling-the-practice";

export const MODULES: Module[] = [
  m1, m2, m3, m4, m5, m6, m7, m8, m9,
  m10, m11, m12, m13, m14, m15, m16, m17,
];

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getModulesByTrack(track: number): Module[] {
  return MODULES.filter((m) => m.track === track).sort((a, b) => a.order - b.order);
}

export function getNextModule(currentId: string): Module | undefined {
  const current = MODULES.find((m) => m.id === currentId);
  if (!current) return undefined;
  return MODULES.find((m) => m.order === current.order + 1);
}

export { TRACKS } from "./types";
