import type { Module } from "../types";

export const module: Module = {
  id: "m6",
  track: 2,
  trackName: "Coding Agents in Practice",
  order: 6,
  title: "Claude Code Deep Dive",
  description: "How Claude Code works internally, what makes it different from Copilot, the extended thinking loop, how it reads codebases, its real limitations, and how to prompt it for coding tasks.",
  estimatedMinutes: 90,
  content: `
# Claude Code Deep Dive

Claude Code is not a smarter autocomplete. It is a coding agent — a system where an LLM controls a loop of tool calls to read, write, test, and reason about a codebase. Understanding how it actually works is what separates an Agentic SE from an enthusiastic user.

---

## What Claude Code Actually Is

Claude Code is a CLI-based coding agent that runs in your terminal with access to your local filesystem. At its core, it is:

1. A Claude model (claude-opus-4-8 by default)
2. A set of tools: read_file, write_file, bash (run shell commands), search (grep/find), web_fetch
3. A context assembly system that reads your codebase and builds a prompt
4. A loop that runs until the task is complete or the user interrupts

When you give Claude Code a task, it doesn't generate a single response. It:
1. Reads relevant files to understand the current state
2. Reasons about what changes are needed
3. Makes the changes (tool calls to write_file)
4. Runs tests or checks to verify (bash)
5. Iterates if something is wrong
6. Reports back when done (or when stuck)

This is the agent loop in practice. Claude Code is the most accessible demonstration of what agentic AI actually looks like in production.

---

## How It Differs from GitHub Copilot

This comparison comes up constantly in client conversations. Get it right.

| Dimension | GitHub Copilot | Claude Code |
|-----------|---------------|-------------|
| Architecture | Autocomplete model | Coding agent with tool access |
| Scope | Current file / cursor position | Entire codebase |
| Action | Suggests code inline | Reads, writes, runs, iterates |
| Context | ~2K tokens around cursor | Full project context + tools |
| Iteration | One shot (accept/reject) | Multi-step until task complete |
| Verification | None — human checks output | Runs tests, validates itself |
| Use case | Speed up writing code you already know | Delegate tasks you specify at a high level |

**The key insight for client conversations:** Copilot helps you write code faster. Claude Code helps you *delegate* coding tasks. These are fundamentally different value propositions. A developer who's used Copilot for a year is not prepared for what Claude Code does — it's a different category of tool.

---

## The Reading Phase: How Claude Code Understands Your Codebase

Before writing a single line of code, Claude Code builds a mental model of your project. It does this by:

**1. Reading CLAUDE.md (if it exists)**
This is the most important file for agentic performance. Claude Code reads this first and uses it to understand project structure, conventions, important constraints, and how to navigate the codebase.

**2. Directory exploration**
Claude Code uses bash commands (ls, find) to understand the project structure before reading individual files.

**3. Targeted file reading**
Based on the task, it reads the files most likely to be relevant. It doesn't read the entire codebase upfront — it reads what it needs as it discovers what it needs.

**4. Dependency tracing**
For changes that touch shared code, it traces imports to understand what else might be affected.

This reading phase is expensive in tokens and time. Optimising it — by providing good CLAUDE.md files and a well-structured codebase — is a significant part of what an Agentic SE does for clients.

---

## Extended Thinking in Claude Code

Claude Code uses Claude's extended thinking capabilities for complex reasoning tasks. When thinking is enabled, the model produces a "thinking" block before its response — an internal reasoning trace that isn't shown to the user by default but informs the output.

In practice, this means:

- For simple file edits: thinking may be minimal or disabled
- For architecture decisions: thinking is extensive, exploring multiple approaches before settling on one
- For debugging complex issues: thinking traces through possible causes systematically

**Why this matters for SEs:** Extended thinking is what makes Claude Code qualitatively different from previous coding tools. A model that thinks before it acts is more likely to check existing patterns before inventing new ones, consider edge cases, and produce code that fits the codebase rather than code that "looks right" in isolation.

---

## Claude Code's Real Limitations

Being honest about limitations is part of what builds client trust.

**1. Context window filling**
Claude Code reads files, writes code, runs tests, reads results. All of this goes into the context window. On large codebases with complex tasks, the context fills up, and later in the session the model starts working with less full-picture visibility. This is why breaking large tasks into smaller focused sessions often produces better results.

**2. Codebase coherence**
Claude Code understands the code it reads. It does not understand the *history* of decisions — why something was built a certain way, what was tried and abandoned, what business constraints shaped the architecture. This context lives in people's heads and Slack threads, not in files. The model can make technically correct changes that violate organisational constraints it doesn't know about.

**3. Non-determinism**
Even with temperature 0, Claude Code may make different choices on different runs. This is usually fine for routine tasks but creates challenges for tasks requiring exact reproducibility.

**4. Test coverage dependency**
Claude Code's ability to verify its own work is limited by the test coverage in the codebase. With good tests, it can confirm changes are correct. Without tests, it's guessing. This is why Agentic SEs push hard for test coverage as a prerequisite to agent deployment.

**5. Task scope creep**
Given a vague task, Claude Code may do more or less than intended. "Improve the authentication system" is an invitation for the model to make decisions the engineer should be making. Tight task specification prevents this.

---

## Prompting Claude Code Effectively

The quality of your task description is the single biggest variable in Claude Code output quality.

**Anatomy of a good Claude Code task:**

\`\`\`
[WHAT]: Add input validation to the user registration endpoint.

[WHERE]: src/api/users/register.ts — the createUser function

[CONSTRAINTS]:
- Validate: email format, password minimum 8 characters, username 3-20 chars alphanumeric
- Throw ValidationError with field-specific messages (see src/errors/ValidationError.ts for the pattern)
- Do NOT modify the database schema
- Existing tests are in src/api/users/register.test.ts — all must still pass

[DONE WHEN]: All validation tests pass and the function throws the correct error types
\`\`\`

**vs a bad task description:**
\`\`\`
"Add validation to the registration form"
\`\`\`

The bad version is ambiguous on scope ("registration form" — frontend? backend? both?), has no constraints, no definition of done, and doesn't point to relevant patterns.

**Key elements of effective prompting:**
- **What**: the specific change to make
- **Where**: file paths and function names, not "the auth stuff"
- **Constraints**: what NOT to do is often more important than what to do
- **Pattern references**: point to existing code that shows the expected pattern
- **Done condition**: how will the model know it's finished?

---

## What "Making a Codebase Agent-Friendly" Means

After every Claude Code deployment, Agentic SEs ask: "what would make this codebase easier for the agent to work with?" The answers compound over time.

- **CLAUDE.md**: documents conventions, important patterns, what to avoid
- **Consistent naming**: reduces tokenization overhead and improves pattern matching
- **Clear file structure**: agent doesn't need to explore — structure signals location
- **High test coverage**: agent can verify its own work
- **Small, focused files**: easier to fit relevant context in window

This is covered in depth in Module 7.

---

## Worked Example: Claude Code Session Trace

Task: "Add rate limiting to the API — max 100 requests per minute per API key. Use the existing Redis client."

\`\`\`
Claude Code reading phase:
→ read CLAUDE.md (finds: "Redis client at src/lib/redis.ts", "middleware pattern at src/middleware/auth.ts")
→ read src/lib/redis.ts (understands the client API)
→ read src/middleware/auth.ts (understands the middleware pattern)
→ find existing rate limiting code? (bash: grep -r "rateLimit" src/) → nothing found

Reasoning:
"I'll create a new middleware file following the pattern in auth.ts.
I'll use ioredis sorted sets — the standard pattern for sliding window rate limiting.
I'll add it to the middleware chain after auth so only authenticated requests are rate limited."

Actions:
→ write_file("src/middleware/rateLimit.ts", <rate limiting middleware>)
→ write_file("src/middleware/rateLimit.test.ts", <tests>)
→ bash("npm test src/middleware/rateLimit.test.ts")
→ result: 6/6 tests pass
→ read src/app.ts (to find middleware chain)
→ write_file("src/app.ts", <adds rateLimit middleware after auth>)
→ bash("npm test") → all tests pass

Response: "Added sliding window rate limiting at 100 req/min per API key using Redis sorted sets.
New middleware at src/middleware/rateLimit.ts. Tests included and passing."
\`\`\`

Notice the pattern: read → understand → reason → act → verify. This is Claude Code doing what a careful engineer would do — just faster and without requiring the human to hold the context.

---

## Key Takeaways

1. Claude Code is a coding agent, not autocomplete — fundamentally different category
2. The reading phase is expensive; CLAUDE.md and good structure reduce the cost
3. Extended thinking is what makes complex reasoning reliable
4. Limitations: context filling, unknown history, non-determinism, test dependency, scope creep
5. Good task prompts include: what, where, constraints, pattern references, done condition
6. Making codebases agent-friendly is an ongoing SE responsibility, not a one-time setup
`,
  questions: [
    {
      id: "m6-q1",
      type: "conceptual",
      text: "What is the most fundamental architectural difference between GitHub Copilot and Claude Code?",
      options: [
        "Claude Code has a larger context window, allowing it to read more files before generating a suggestion",
        "Claude Code is trained on more recent code, making its suggestions more up-to-date than Copilot's",
        "Copilot generates inline autocomplete suggestions while Claude Code runs an agent loop that reads, writes, and executes code autonomously across the entire codebase",
        "Claude Code is open-source while Copilot is proprietary, giving developers more control over its behaviour",
      ],
      correctAnswer: "Copilot generates inline autocomplete suggestions while Claude Code runs an agent loop that reads, writes, and executes code autonomously across the entire codebase",
      rubric: "Correct answer: agent loop vs autocomplete. Copilot operates at the cursor position and generates a single suggestion. Claude Code controls a multi-step loop — read, reason, write, run tests, iterate — across the entire codebase. This is a categorical architectural difference, not a size or quality difference.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m6-q2",
      type: "conceptual",
      text: "Explain why test coverage is a prerequisite for reliable Claude Code deployment, not a nice-to-have. What specifically happens in a low-coverage codebase that doesn't happen in a high-coverage one?",
      rubric: "Strong answer: without tests, agent cannot verify its own work — it writes code and has no signal whether it's correct; in low-coverage codebase, changes may appear to work but break untested paths; agent may declare success on a task that has introduced bugs; high coverage gives agent a feedback loop to iterate. Connects to agent loop: act → verify → iterate depends on verification being possible. Weak answer says 'tests are good practice'.",
      maxScore: 15,
      placeholder: "Explain the specific verification dependency and what breaks without it...",
    },
    {
      id: "m6-q3",
      type: "applied",
      text: "Claude Code is asked to 'refactor the authentication system to use JWT tokens instead of sessions' and proceeds to make 23 file changes, break 14 tests, and modify things that weren't requested. What was the primary cause of this failure?",
      options: [
        "Claude Code lacks the ability to handle authentication-related code and should not be used for security-sensitive tasks",
        "The task was too large and vague — no constraints on scope, no definition of done, and no phased approach — giving the agent unlimited latitude",
        "The codebase had too many files for Claude Code to hold in context, causing it to make random changes",
        "The model's temperature was set too high, causing it to make creative but incorrect modifications",
      ],
      correctAnswer: "The task was too large and vague — no constraints on scope, no definition of done, and no phased approach — giving the agent unlimited latitude",
      rubric: "Correct answer: too large and vague. 'Refactor the auth system' gives the agent no scope boundary, no constraint on what NOT to change, and no definition of done. The agent makes autonomous decisions to fill those gaps, many of which the user didn't intend. The fix is to break it into phased, constrained tasks: (1) plan only, (2) implement JWT in one file, (3) migrate endpoints one at a time, (4) update tests.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m6-q4",
      type: "applied",
      text: "You're pairing with a client engineer who is frustrated because Claude Code 'ignores' their project conventions. It keeps using fetch() instead of their custom ApiClient class, writing tests with describe/it instead of their preferred test() syntax, and putting utility functions in the wrong folder. What's causing this and how do you fix it?",
      rubric: "Strong answer: Claude Code has no awareness of unwritten conventions — it defaults to patterns in its training data; without a CLAUDE.md or explicit instruction, it can't know project-specific preferences; fix is a CLAUDE.md that explicitly states these conventions with examples (use ApiClient not fetch, use test() syntax, utilities go in src/lib/); also mentions pointing the agent to exemplar files that demonstrate the expected patterns. Weak answer says 'write better prompts'.",
      maxScore: 20,
      placeholder: "Explain the root cause and provide the specific fix...",
    },
    {
      id: "m6-q5",
      type: "hands_on",
      text: "Which task prompt for Claude Code is most likely to produce correct, scoped results when adding pagination to an API endpoint?",
      options: [
        "Add cursor-based pagination to the products API.",
        "Add pagination to the application so users can browse products page by page without loading everything at once.",
        "Add cursor-based pagination to GET /api/products in src/routes/products.ts. Use Prisma's cursor API. Return nextCursor in the response body. Do not change the Product schema or existing response fields. Done when existing tests pass and manual test with ?cursor= param returns the next page.",
        "Implement cursor-based pagination following REST best practices. Make sure it works correctly and doesn't break anything.",
      ],
      correctAnswer: "Add cursor-based pagination to GET /api/products in src/routes/products.ts. Use Prisma's cursor API. Return nextCursor in the response body. Do not change the Product schema or existing response fields. Done when existing tests pass and manual test with ?cursor= param returns the next page.",
      rubric: "Correct answer: option 3. It specifies WHAT (cursor-based pagination), WHERE (exact file and route), HOW (Prisma cursor API), CONSTRAINTS (do not change schema or existing fields), and DONE CONDITION (tests pass + manual verification). Options 1, 2, and 4 are progressively vaguer — they give the agent latitude to make decisions the user should be making, which leads to unexpected scope.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m6-q6",
      type: "hands_on",
      text: "A client engineer has just run their first Claude Code session and is confused about what happened. They say: 'I asked it to add a feature and it read like 15 files before writing anything — is that normal? And it ran npm test three times?' Explain what Claude Code was doing during the reading phase and the test runs, and why this behaviour is correct and desirable.",
      rubric: "Strong answer explains: reading phase = understanding codebase before acting (better than guessing pattern from partial information); multiple file reads = tracing dependencies and understanding conventions; multiple test runs = act-verify-iterate loop in action; this is exactly what a careful engineer would do, just faster. Makes the connection to agent loop explicitly. Frames the 'overhead' as quality-ensuring behaviour, not inefficiency. Weak answer says 'it's just how it works'.",
      maxScore: 20,
      placeholder: "Explain the reading phase and test runs in terms the engineer will understand...",
    },
    {
      id: "m6-q7",
      type: "edge_case",
      text: "Claude Code successfully modifies a generated file — tests pass — but the change is lost on the next build. What is the correct prevention?",
      options: [
        "Tell Claude Code not to modify any TypeScript files, since generated files are usually TypeScript",
        "Run a manual review of every file Claude Code modifies before accepting its changes",
        "Add generated file paths to CLAUDE.md with an explicit instruction not to modify them, so the agent knows their status before acting",
        "Switch to a different agent tool that automatically detects generated files",
      ],
      correctAnswer: "Add generated file paths to CLAUDE.md with an explicit instruction not to modify them, so the agent knows their status before acting",
      rubric: "Correct answer: document generated files in CLAUDE.md. The agent has no way to distinguish generated from hand-written files without being told — they look identical syntactically. Adding an explicit list of generated paths with a do-not-modify instruction gives the agent the context it needs before it acts. Blocking all TypeScript edits (option 1) is far too broad. Manual review (option 2) is a fallback, not a prevention.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m6-q8",
      type: "edge_case",
      text: "You're demonstrating Claude Code to a group of 12 engineers. Halfway through a live demo, Claude Code starts producing code that's technically correct but violates the team's architectural principles — it introduces a direct database call in a controller layer where the team has a strict repository pattern. The team is watching. What do you do in the moment, and what does this reveal about what was missing from the demo setup?",
      rubric: "Strong answer: in the moment — don't hide it, use it as a teaching moment ('this is exactly why CLAUDE.md is critical — let me show you what happens when we add that context'), interrupt the agent, add the architectural constraint, restart; what was missing: CLAUDE.md with architectural principles, exemplar files demonstrating the repository pattern, or explicit constraint in the task prompt. Turns failure into credibility-building moment by demonstrating the correct response. Weak answer tries to gloss over the mistake.",
      maxScore: 20,
      placeholder: "Describe your in-the-moment response and what the incident reveals about setup...",
    },
  ],
};
