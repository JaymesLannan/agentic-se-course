import type { Module } from "../types";

export const module: Module = {
  id: "m2",
  track: 1,
  trackName: "Foundations",
  order: 2,
  title: "What 'Agentic' Actually Means",
  description: "The agent loop, autonomy spectrum, when NOT to use agents, and how to distinguish agents from chatbots and automations in client conversations.",
  estimatedMinutes: 90,
  content: `
# What "Agentic" Actually Means

The word "agentic" is overused to the point of meaninglessness in sales conversations. Your job as an SE is to bring precision — to help clients understand what they're actually building, what category of system it belongs to, and what the implications are. This module gives you that precision.

---

## The Spectrum: Chatbot → Automation → Agent → Multi-Agent

These are not interchangeable terms. They represent fundamentally different architectures with different risk profiles, maintenance requirements, and appropriate use cases.

### Chatbots

A chatbot is a **single-turn or multi-turn conversational interface** where the model generates text in response to user input. The model has no ability to take actions in the world. It can:
- Answer questions
- Summarise text
- Draft content
- Explain concepts

What it cannot do: access live data, modify files, call APIs, run code, or take any action outside the conversation window.

**Risk profile:** Low. The worst outcome is a bad answer. Easily audited, easily corrected.

**Examples:** Customer support FAQ bot, documentation assistant, writing helper.

### Automations

An automation is a **predefined sequence of steps** that runs in response to a trigger. The model may be used to process data at one or more steps, but the overall flow is hardcoded. The model doesn't decide what to do next — the code does.

\`\`\`
Trigger: New support ticket arrives
→ LLM classifies ticket category
→ Route to correct queue (hardcoded logic)
→ LLM drafts suggested response
→ Send to human for approval
\`\`\`

The model is a component, not a controller. This is the most underrated pattern — it's lower risk than a full agent and sufficient for the majority of real-world use cases.

**Risk profile:** Medium. Each step is predictable, but the model's outputs at each step need validation.

**Examples:** Email triage, document summarisation pipelines, code review comment drafting.

### Agents

An agent is a system where **the model controls the loop** — deciding what to do next, which tools to call, what information to gather, and when it has achieved the goal.

The agent loop:
\`\`\`
1. Observe: receive the task and current state
2. Think: reason about what to do next (may be explicit or implicit)
3. Act: call a tool, write output, or ask a clarifying question
4. Observe: receive the result of the action
5. Repeat until the task is complete or the agent is stuck
\`\`\`

The critical difference from automation: **the model decides the sequence, not the code.** This is what makes agents powerful — and risky.

**Risk profile:** High. The model can take unexpected paths, chain errors, get stuck in loops, or take actions with real-world consequences.

**Examples:** Claude Code (reads files, writes code, runs tests, iterates), research agents (searches web, synthesises findings), autonomous PR review agents.

### Multi-Agent Systems

A multi-agent system has **multiple specialised agents coordinated by an orchestrator**. The orchestrator is itself often a model that decides which sub-agent to call and how to combine their outputs.

\`\`\`
Orchestrator: "Review this PR for security and performance"
→ Security Agent: analyses code for vulnerabilities
→ Performance Agent: profiles algorithmic complexity
→ Orchestrator: synthesises findings into final review
\`\`\`

**Risk profile:** Very high. Errors compound across agents. Trust boundaries between agents must be explicitly designed. A compromised sub-agent can manipulate the orchestrator.

---

## The Autonomy Spectrum and Why It Matters

Not all agents operate at the same autonomy level. Think of it as a dial:

**Level 1 — Suggest:** Agent proposes an action, human approves before execution
**Level 2 — Supervised:** Agent acts, human can intervene within a time window
**Level 3 — Reported:** Agent acts autonomously, reports outcomes afterward
**Level 4 — Autonomous:** Agent acts, notifies only on failure

Most production agentic systems for enterprise clients should start at **Level 1 or 2**. The instinct to maximise autonomy is understandable but wrong — trust must be earned through demonstrated reliability, not assumed at the outset.

**A key SE insight:** When a client says they want "full autonomy", what they usually mean is they want to reduce human overhead. The right response is to help them design staged autonomy — starting at Level 1, building confidence with metrics, then progressively reducing oversight where the data supports it.

---

## When NOT to Use Agents

This is one of the most important things you can tell a client. Agents are not always the answer, and recommending one when simpler patterns suffice damages trust and creates unnecessary complexity.

**Don't use an agent when:**

- The task has a well-defined, unchanging sequence → use automation
- The cost of error is very high and the model can't easily recover → use human-in-the-loop
- The task can be completed in a single LLM call → use a chatbot
- The workflow needs to be auditable at every step → automation with logging is cleaner
- The team can't maintain agent infrastructure → operational overhead matters

**Use an agent when:**

- The sequence of steps can't be fully predetermined
- The task requires gathering information before knowing what to do next
- The task spans multiple tools that need to be called in a model-determined order
- The goal is clear but the path to it is not

**Worked example — the wrong call:**

A client wants to "add AI" to their invoice processing pipeline. They describe: receive PDF → extract line items → validate against purchase orders → flag discrepancies → route for approval. This is a **perfect automation**, not an agent. Every step is known in advance. An agent would add complexity and risk with no benefit.

---

## The Three Questions to Ask Any Client

When a client says they want to "build an agent", ask these three questions before touching any code:

**1. What happens if the agent takes the wrong action?**
This surfaces the risk profile and autonomy level. If the answer is "nothing bad — it's just text", an agent may be appropriate. If the answer is "it could delete data" or "it could send emails to customers", you need Level 1 autonomy at minimum, and possibly an automation instead.

**2. What information does the agent need that isn't in the prompt?**
This surfaces the tool requirements. Every piece of external information is a potential tool call. Map these out before writing any code.

**3. How will you know if it's working?**
This surfaces the evaluation strategy. An agent without an eval framework is a liability — you can't improve what you can't measure. Push clients to define success metrics before building.

---

## Worked Example: Classifying a Real Request

A client says: "We want AI to handle our GitHub PR process — read the code, check for issues, and merge it if it looks good."

Let's classify this:

- "Read the code" — tool call (read files) → requires agent capability
- "Check for issues" — LLM reasoning → agent step
- "Merge if it looks good" — action with real-world consequence → high risk

**Classification: Agent, Level 3 autonomy minimum (if merging autonomously)**

**What I'd actually recommend:** Start as an automation (agent generates review, human approves merge), collect data on accuracy for 30 days, then consider moving to Level 2 (agent can merge, human has 1 hour to veto). Full autonomy only after 95%+ accuracy on a statistically significant sample.

This is the kind of thinking that makes clients trust you.

---

## Key Takeaways

1. Chatbot → Automation → Agent → Multi-Agent: different architectures, different risk profiles
2. The model controlling the loop is what makes something an agent
3. Autonomy is a dial, not a switch — design for staged autonomy
4. Know when NOT to use agents — recommending simpler patterns when appropriate builds credibility
5. Three questions to ask any client: what goes wrong, what data is needed, how do you measure success
`,
  questions: [
    {
      id: "m2-q1",
      type: "conceptual",
      text: "Explain the fundamental difference between an automation and an agent. Give a concrete example of a workflow that would be wrong to build as an agent when an automation would suffice.",
      rubric: "Strong answer: automation has hardcoded sequence, agent has model-controlled loop; gives a specific example (e.g., email routing, invoice processing) and explains why the deterministic nature of the task makes automation appropriate. Must explain the tradeoff — agents add complexity/risk that isn't justified when the sequence is known. Weak answer just says 'automations are simpler'.",
      maxScore: 15,
      placeholder: "Define the distinction and give your concrete example with reasoning...",
    },
    {
      id: "m2-q2",
      type: "conceptual",
      text: "What is the 'agent loop' and what are its four stages? Why does the model controlling this loop (rather than code) create both the power and the risk of agentic systems?",
      rubric: "Strong answer: observe/think/act/observe (or equivalent framing), explains that model-controlled sequencing allows dynamic adaptation to unexpected states, but also means the model can chain errors, pursue wrong subgoals, or loop infinitely. Connects this to why human oversight matters in early deployments. Weak answer lists the stages without explaining the implications.",
      maxScore: 15,
      placeholder: "Describe the agent loop and explain the power/risk tradeoff...",
    },
    {
      id: "m2-q3",
      type: "applied",
      text: "A client comes to you excited about building an 'AI agent' for their HR department. They describe the use case: 'When a new employee is hired, the system should send a welcome email, create their Slack account, add them to the right channels, create a Jira account, and schedule their onboarding meetings.' How do you classify this, what do you recommend building, and how do you explain your recommendation to the client?",
      rubric: "Strong answer: correctly classifies as automation (fixed sequence, known steps, no dynamic decision-making), recommends automation over agent, explains this is actually better for their use case (predictable, auditable, lower risk of a welcome email going to the wrong person), and frames the recommendation as the right tool for the job rather than 'agents are overkill'. Weak answer recommends an agent because it involves multiple systems.",
      maxScore: 20,
      placeholder: "Classify the use case, make your recommendation, explain your reasoning...",
    },
    {
      id: "m2-q4",
      type: "applied",
      text: "A fintech client wants a coding agent to autonomously merge pull requests once it has reviewed them for security issues. The CTO says 'we trust it — just let it merge.' Map out the autonomy levels appropriate for a 90-day rollout of this system, including the metrics you'd use to decide when to progress each level.",
      rubric: "Strong answer: Level 1 (agent reviews, human merges) for weeks 1-4, metrics on review quality accuracy; Level 2 (agent can merge, human has veto window of 2-4 hours) weeks 5-8, metrics on false positive/negative rates; Level 3 (autonomous merge with post-hoc reporting) only if accuracy > 95% on statistically significant sample. Must include specific metrics not just 'check if it's working'. Weak answer just says 'start slow and increase trust'.",
      maxScore: 20,
      placeholder: "Design the 90-day staged autonomy rollout with specific metrics...",
    },
    {
      id: "m2-q5",
      type: "hands_on",
      text: "Classify each of the following 6 use cases as: Chatbot / Automation / Agent / Multi-Agent. For each, write 2 sentences explaining your classification and naming the key factor that determined it.\n\n1. Answer customer questions about return policies\n2. When a GitHub issue is created, label it, assign it to the right team, and draft an initial response\n3. Given a vague feature request, research the codebase, write a technical spec, implement it, write tests, and open a PR\n4. Summarise a meeting transcript\n5. Monitor production logs, diagnose errors, and either auto-fix or page the on-call engineer depending on severity\n6. Generate a weekly sales report from a database",
      rubric: "Correct: 1=Chatbot, 2=Automation, 3=Agent, 4=Chatbot (single call), 5=Agent (dynamic decision: fix vs page), 6=Automation (fixed sequence). Award points for correct classification AND quality of explanation. Deduct if explanation contradicts the correct answer. Full marks requires all 6 correct with clear reasoning.",
      maxScore: 20,
      placeholder: "Classify all 6 use cases with your 2-sentence explanation for each...",
    },
    {
      id: "m2-q6",
      type: "hands_on",
      text: "Write the three discovery questions you'd ask a client who says they want to 'build an agent'. For each question, explain: (a) what you're trying to learn, (b) what a red-flag answer looks like, and (c) how the answer should change your recommendation.",
      rubric: "Strong answer asks questions that surface: risk profile (what happens if wrong), data requirements (what info is needed), and success definition (how do you measure it). Red flags include: 'if it's wrong we'll just re-run it' on a high-stakes task, 'we just need it to work', 'we'll know it's good when it feels right'. Each answer should map to a concrete change in approach (e.g., red-flag risk answer → recommend Level 1 autonomy or automation instead).",
      maxScore: 20,
      placeholder: "Write your 3 discovery questions with (a), (b), (c) for each...",
    },
    {
      id: "m2-q7",
      type: "edge_case",
      text: "You've recommended an automation to a client but they insist on building an agent because 'agents are more impressive for our board presentation'. How do you handle this situation without losing the client or building something you know is the wrong architecture?",
      rubric: "Strong answer: validates the client's goal (board presentation impact) while being honest about the technical recommendation, finds a path that serves both (e.g., build the automation with agent-style UI/UX, or add a genuine agent component to the workflow that actually needs it), doesn't just capitulate and build the wrong thing, doesn't lecture the client about being wrong. Shows client relationship maturity.",
      maxScore: 20,
      placeholder: "Describe how you'd navigate this client situation...",
    },
    {
      id: "m2-q8",
      type: "edge_case",
      text: "An agent you've deployed for a client has been running successfully for 2 weeks at Level 2 autonomy. Yesterday it took an action that was technically correct but caused significant downstream problems the client hadn't anticipated (it deleted draft documents that were in a folder the agent interpreted as 'archive'). The client wants to shut the agent down entirely. How do you respond, and what does this incident reveal about the system design?",
      rubric: "Strong answer: takes responsibility without being defensive, identifies the root cause (underspecified tool permissions/scope, insufficient action reversibility design, missing confirmation step for destructive actions), proposes concrete fix (scope guard on delete operations, reversible actions first, explicit confirmation for destructive tools), and makes the case for continuing with modifications rather than shutting down — using the incident as a learning moment about the importance of tool design. Weak answer just apologises and agrees to shut it down.",
      maxScore: 20,
      placeholder: "Respond to the client and diagnose what the incident reveals about the design...",
    },
  ],
};
