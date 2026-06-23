import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function gradeResponse(params: {
  moduleTitle: string;
  questionText: string;
  questionType: string;
  rubric: string;
  userResponse: string;
  maxScore: number;
}): Promise<{ feedback: string; score: number; passed: boolean }> {
  const { moduleTitle, questionText, questionType, rubric, userResponse, maxScore } = params;

  const message = await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1500,
    thinking: { type: "adaptive" },
    messages: [
      {
        role: "user",
        content: `You are a senior Agentic Solutions Engineer evaluating a trainee's answer. Be rigorous — surface-level answers that use correct vocabulary without demonstrating genuine understanding should score low. You are preparing this person for a real technical interview.

**Module:** ${moduleTitle}
**Question Type:** ${questionType}
**Question:** ${questionText}
**Grading Rubric:** ${rubric}
**Max Score:** ${maxScore}
**Trainee's Answer:** ${userResponse}

Respond in this exact JSON format (no markdown, no preamble):
{
  "score": <integer 0 to ${maxScore}>,
  "passed": <true if score >= ${Math.floor(maxScore * 0.8)}, else false>,
  "feedback": "<2-4 paragraphs: what they got right, what was missing or shallow, what a strong answer would include, and one actionable tip to improve>"
}`,
      },
    ],
  });

  const text = message.content.find((b) => b.type === "text")?.text ?? "{}";

  try {
    const result = JSON.parse(text);
    return {
      score: Math.min(result.score ?? 0, maxScore),
      passed: result.passed ?? false,
      feedback: result.feedback ?? "No feedback returned.",
    };
  } catch {
    return {
      score: 0,
      passed: false,
      feedback: "Grading failed — please try again.",
    };
  }
}
