import type { Module } from "../types";

export const module: Module = {
  id: "m1",
  track: 1,
  trackName: "Foundations",
  order: 1,
  title: "How LLMs Actually Work",
  description: "Tokens, context windows, attention, temperature, and why LLMs are not databases. The mental model every agentic SE needs before touching any tooling.",
  estimatedMinutes: 90,
  content: `
# How LLMs Actually Work

Before you can build with LLMs or advise clients on them, you need to understand what they actually are — not the marketing version, but the mechanical reality. This module strips away the hype and builds a precise mental model.

---

## What an LLM Is (and Isn't)

A Large Language Model is a **statistical next-token predictor** trained on a vast corpus of text. That's the core of it. Every response you see is the result of repeatedly predicting: "given everything so far, what token is most likely to come next?"

This has a profound implication: **LLMs do not retrieve facts. They pattern-match.** When a model answers a question correctly, it's because the training data contained enough similar patterns that the model learned to reproduce the right shape of answer. When it's wrong — confidently, fluently wrong — it's because the pattern matched but the specific fact didn't exist or was underrepresented in training.

This is not a bug to be fixed. It is the fundamental nature of the technology. Understanding this shapes every architectural decision you'll make as an agentic SE.

---

## Tokens: The Unit of Everything

LLMs don't process words or characters — they process **tokens**. A token is roughly 3–4 characters of English text, but this varies significantly:

- Common words: often 1 token ("the", "is", "and")
- Uncommon words: often 2–3 tokens ("tokenization" → ["token", "ization"])
- Code: highly variable (operators, brackets, identifiers all tokenize differently)
- Non-English text: typically more tokens per word than English

Why does this matter?

1. **Cost**: you pay per token, not per word or per request
2. **Context limits**: every model has a maximum number of tokens it can process in a single context window
3. **Performance**: longer contexts cost more compute and can degrade quality

**Worked example — tokenization of a function name:**

\`\`\`
calculateUserRetentionRate → ["calculate", "User", "Ret", "ention", "Rate"] (5 tokens)
calc_retention → ["calc", "_ret", "ention"] (3 tokens)
\`\`\`

This is why naming conventions in codebases affect agentic performance. A codebase with long, descriptive names consumes more tokens, compressing how much code fits in context.

---

## The Context Window

The context window is the model's **working memory** — everything it can "see" at once. This includes:

- The system prompt
- The conversation history
- Any documents, code, or tool results you've injected
- The model's own previous responses

Modern models like Claude have context windows of 200K tokens (roughly 150,000 words, or ~500 pages of text). This sounds enormous — and it is — but it fills up faster than you'd expect in agentic workflows where you're injecting codebase files, tool outputs, and conversation history simultaneously.

**Critical insight:** The context window is not infinite RAM. Research shows that models perform better on information at the **beginning and end** of the context, and can miss or underweight information buried in the middle. This is called the **"lost in the middle" problem** and it shapes how you structure prompts and inject context in agentic systems.

---

## Temperature and Sampling

When the model predicts the next token, it produces a probability distribution over every possible token in its vocabulary. **Temperature** controls how that distribution is sampled:

| Temperature | Effect | Use case |
|-------------|--------|----------|
| 0.0 | Always picks the highest-probability token (deterministic) | Code generation, fact extraction, structured output |
| 0.3–0.5 | Slightly varied, still focused | Most professional tasks |
| 0.7–1.0 | More varied, more creative | Brainstorming, creative writing |
| > 1.0 | Very random, often incoherent | Rarely useful |

**Top-p (nucleus sampling)** is an alternative that samples from the smallest set of tokens whose combined probability exceeds p. It's often used alongside temperature.

**The mistake most engineers make:** setting temperature to 0 and expecting determinism. In practice, even at temperature 0, models can produce slightly different outputs due to floating-point non-determinism in GPU computation. Never build a system that depends on byte-for-byte identical outputs.

---

## Why LLMs Hallucinate

Hallucination is the most misunderstood behaviour in LLMs. It's not a bug — it's an emergent property of how these models work.

The model was trained to produce fluent, coherent text. Fluency and accuracy are independent properties. A model can produce perfectly grammatical, confident, well-structured text that is factually wrong — because it learned the *shape* of correct answers without having memorised the specific fact.

**The three main causes of hallucination:**

1. **Knowledge gaps**: the fact wasn't in training data, or was underrepresented
2. **Context conflicts**: the model's training knowledge conflicts with context you've provided, and it blends them
3. **Instruction following pressure**: the model was asked a question it can't answer, but was trained to be helpful, so it generates something plausible rather than saying "I don't know"

**As an agentic SE, your job is to design systems that don't rely on the model's memory.** Use RAG to inject facts at inference time. Use tool calls to retrieve live data. Never ask a model a question you're relying on it to know the answer to from memory alone.

---

## Attention and Why It Matters for Agents

The **attention mechanism** is the core architectural innovation that makes transformers work. Without going into the mathematics, here's the practical implication:

Every token in the context "attends to" every other token — meaning the model computes a relevance weight between all pairs of tokens to understand relationships and context. This is why:

- Models understand pronouns ("she" refers to the doctor mentioned three sentences ago)
- Models can follow complex multi-step instructions
- Models can synthesise information from different parts of a long document

But attention is also why context gets expensive: the computation scales with the **square** of the context length. Doubling the context doesn't double the compute — it quadruples it. This is being mitigated by architectural improvements, but it's why context efficiency still matters even with large windows.

---

## The System Prompt and Its Role

The system prompt is instructions placed before the conversation that shape the model's behaviour throughout the interaction. In agentic systems, the system prompt is where you:

- Define the agent's role and persona
- Specify what tools are available and how to use them
- Set constraints and guardrails
- Inject persistent context (e.g., the current date, user preferences)

**System prompts are not magic.** They compete with the training distribution. If you tell a model "never mention competitors" but the user asks about competitors, the model is making a tradeoff between following your instruction and being helpful. Stronger, clearer instructions win more often — but they don't always win.

---

## Worked Example: Prompt Construction for an Agentic Task

Here's how context gets assembled in a real coding agent interaction:

\`\`\`
[SYSTEM PROMPT — ~500 tokens]
You are an expert software engineer working in a Next.js 15 codebase.
The project uses TypeScript, Prisma ORM, and Tailwind CSS.
When making changes, always check existing patterns before introducing new ones.
Available tools: read_file, write_file, run_tests, search_codebase

[CONVERSATION HISTORY — ~2,000 tokens]
User: Add a loading state to the UserCard component
Assistant: I'll read the current implementation first...
[tool call: read_file("components/UserCard.tsx")]
[tool result: <file contents>]

[CURRENT MESSAGE — ~50 tokens]
Here's what I found. I'll now add the loading state...
\`\`\`

Total: ~2,550 tokens before the model writes a single line of code. In a complex session spanning many tool calls, you can easily reach 50,000–100,000 tokens. Understanding this is why context management is a core engineering skill.

---

## Key Takeaways

1. LLMs predict tokens, not retrieve facts — design systems accordingly
2. Context windows are finite and have positional biases — structure inputs carefully
3. Temperature controls randomness — match it to the task
4. Hallucination is structural, not random — mitigate with retrieval and tools
5. System prompts shape but don't guarantee behaviour
6. Context length has quadratic compute cost — efficiency matters at scale
`,
  questions: [
    {
      id: "m1-q1",
      type: "conceptual",
      text: "Why does an LLM generate a plausible-sounding but nonexistent API endpoint when asked about a specific library?",
      options: [
        "The model retrieved incorrect information from a stale version of its training database",
        "The model statistically predicted tokens that form a plausible endpoint pattern, with no mechanism to verify the endpoint actually exists",
        "The model was trained on an older version of the API documentation and confused two versions",
        "The model exceeded its context window and began generating random placeholder text",
      ],
      correctAnswer: "The model statistically predicted tokens that form a plausible endpoint pattern, with no mechanism to verify the endpoint actually exists",
      rubric: "Correct answer: 'The model statistically predicted tokens that form a plausible endpoint pattern, with no mechanism to verify the endpoint actually exists'. LLMs are next-token predictors, not retrieval systems. They produce outputs that match the pattern of their training data — a plausible-looking endpoint is statistically likely given the surrounding context, whether or not it exists.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m1-q2",
      type: "conceptual",
      text: "Explain the relationship between context window size, token usage, and model performance. Why can't you just throw everything into the context window and expect better results?",
      rubric: "Strong answer covers: lost-in-the-middle problem, quadratic compute cost, context pollution with irrelevant information degrading signal-to-noise ratio, and the strategic use of retrieval to inject only relevant context. Weak answer just says 'there's a token limit'.",
      maxScore: 15,
      placeholder: "Explain the tradeoffs of context window usage...",
    },
    {
      id: "m1-q3",
      type: "applied",
      text: "A client's customer support bot must answer from product documentation that updates weekly. Which approach best handles the need for current, accurate answers?",
      options: [
        "Fine-tune the model monthly on the latest documentation so its internal knowledge stays current",
        "Use high temperature (0.8+) to allow the model flexibility when documentation doesn't cover a question",
        "Use low temperature with RAG to dynamically inject current documentation at query time, avoiding fine-tuning for frequently-changing knowledge",
        "Embed all documentation in a very large system prompt so the model always has it available without retrieval",
      ],
      correctAnswer: "Use low temperature with RAG to dynamically inject current documentation at query time, avoiding fine-tuning for frequently-changing knowledge",
      rubric: "Correct answer: 'Use low temperature with RAG to dynamically inject current documentation at query time, avoiding fine-tuning for frequently-changing knowledge'. Fine-tuning bakes knowledge in statically — it cannot reflect weekly updates without constant retraining. A large system prompt wastes context on irrelevant docs and hits length limits. RAG retrieves only what's needed at query time and reflects the latest indexed content.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m1-q4",
      type: "applied",
      text: "You're reviewing a prompt written by a client's engineer. The system prompt is 3,000 tokens long and includes the entire company handbook, all product specs, and detailed instructions. The conversation history is being kept in full for every turn. Users are starting to report that the bot 'forgets' things mentioned earlier in long conversations. Diagnose the problem and propose a fix.",
      rubric: "Strong answer: identifies lost-in-the-middle degradation from bloated context, recognises the context is filling with irrelevant system prompt material, proposes RAG to replace static injections with dynamic retrieval, suggests conversation summarisation or sliding window for history, and may mention context window approaching limit. Weak answer just says 'reduce the system prompt'.",
      maxScore: 20,
      placeholder: "Diagnose what's happening and propose a concrete solution...",
    },
    {
      id: "m1-q5",
      type: "hands_on",
      text: "Which single change to the AcmeCorp system prompt most directly reduces hallucination risk?\n\n**Original:** 'You are a helpful assistant for AcmeCorp. Answer questions about our products. Be helpful and accurate. If you don't know something, try your best.'",
      options: [
        "Expand the prompt with more detail about AcmeCorp's product history and company values",
        "Change 'try your best' to 'always provide an answer, even if uncertain, to avoid frustrating users'",
        "Replace 'try your best' with an explicit instruction to say 'I don't know' when the answer is not in the provided documentation",
        "Add a tone instruction such as 'Be warm and conversational' to increase user trust in responses",
      ],
      correctAnswer: "Replace 'try your best' with an explicit instruction to say 'I don't know' when the answer is not in the provided documentation",
      rubric: "Correct answer: replace 'try your best' with permission to say 'I don't know'. 'Try your best' implicitly tells the model to generate an answer regardless of confidence — the primary driver of hallucination. Explicitly scoping responses to the provided documentation removes that pressure.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m1-q6",
      type: "hands_on",
      text: "A client's codebase has function names like `processAndValidateUserInputDataForFormSubmission()`. They're asking why their Claude Code sessions seem to 'run out of space' faster than expected. Explain the tokenization issue at play, estimate the token cost difference between this naming style and a reasonable alternative, and write a CLAUDE.md note that addresses this.",
      rubric: "Strong answer: explains that long camelCase names tokenize into more tokens than shorter alternatives, estimates ~3-5x token difference for extreme names vs concise ones, recommends a naming guideline (concise but descriptive, prefer snake_case for consistency), and writes a CLAUDE.md section that mentions this explicitly and gives examples. Weak answer only vaguely mentions 'long names use more tokens'.",
      maxScore: 20,
      placeholder: "Explain the tokenization issue, estimate the cost, write the CLAUDE.md note...",
    },
    {
      id: "m1-q7",
      type: "edge_case",
      text: "A client sets temperature to 0 but still receives inconsistent responses to the same question. What is the most likely technical explanation?",
      options: [
        "Temperature 0 only reduces randomness in short responses; outputs longer than 200 tokens revert to probabilistic sampling",
        "The model switched to a newer internal version between requests, changing its behaviour",
        "GPU floating-point non-determinism and context differences such as injected timestamps mean temperature 0 does not guarantee identical outputs",
        "Temperature 0 is not yet supported in production deployments and silently reverts to 0.5",
      ],
      correctAnswer: "GPU floating-point non-determinism and context differences such as injected timestamps mean temperature 0 does not guarantee identical outputs",
      rubric: "Correct answer: GPU floating-point non-determinism and context differences mean temperature 0 does not guarantee identical outputs. Temperature 0 picks the highest-probability token, but floating-point operations on GPUs are not perfectly reproducible across runs, and any context difference (timestamps, session IDs, cached vs uncached) produces divergent outputs.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m1-q8",
      type: "edge_case",
      text: "You're advising a client on whether to use a 200K context window model to process an entire 180-page legal contract in one shot, versus chunking it and using RAG. The client argues: 'We can fit it all in context — why bother with RAG complexity?' Make the case for RAG even though the document fits.",
      rubric: "Strong answer: lost-in-the-middle problem means important clauses buried in the middle may be missed, cost is quadratic at 180K tokens making retrieval cheaper at scale, RAG allows targeted retrieval for different question types, large context windows increase latency, and for production systems doing this thousands of times the cost difference is significant. Also acknowledges the valid counterpoint: for one-shot analysis of a single document, full-context may actually be appropriate. The nuanced answer wins over the dogmatic one.",
      maxScore: 20,
      placeholder: "Make your case for RAG while acknowledging when full-context is actually better...",
    },
  ],
};
