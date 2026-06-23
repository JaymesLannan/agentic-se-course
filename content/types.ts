export type QuestionType = "conceptual" | "applied" | "hands_on" | "edge_case";

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  rubric: string;
  maxScore: number;
  placeholder: string;
  // Multiple choice — if present, renders as radio buttons and auto-grades
  options?: string[];
  correctAnswer?: string;
}

export interface Module {
  id: string;
  track: number;
  trackName: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  content: string;
  questions: Question[];
}

export const TRACKS: Record<number, { name: string; description: string; color: string }> = {
  1: { name: "Foundations", description: "Build the mental model from first principles", color: "blue" },
  2: { name: "Coding Agents in Practice", description: "The hands-on engineering skills clients pay for", color: "violet" },
  3: { name: "Client Delivery Skills", description: "The soft skills that are actually hard", color: "emerald" },
  4: { name: "Upskilling & Practice Building", description: "How you scale beyond one client", color: "amber" },
};
