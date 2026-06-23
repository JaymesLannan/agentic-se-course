import type { Module } from "../types";

export const module: Module = {
  id: "m3",
  track: 1,
  trackName: "Foundations",
  order: 3,
  title: "Tool Use & Function Calling",
  description: "How tool calling works mechanically, tool design principles, error handling, chaining, and diagnosing tool loops — the engine room of every agentic system.",
  estimatedMinutes: 90,
  content: `
# Tool Use & Function Calling

Tool use is the mechanism that transforms a language model from a text generator into an agent that can act in the world. Understanding it precisely — not just how to use it, but how it works mechanically — is essential for building reliable agentic systems and for diagnosing failures when they occur.

---

## The Mechanical Reality of Tool Calling

When you give a model access to tools, here's what actually happens under the hood:

1. **Tool definitions are injected into the context** as part of the system prompt or API parameters. Each tool is described with its name, description, and a JSON schema for its parameters.

2. **The model generates a tool call** by outputting a structured response — not freeform text, but a specific format saying "call this tool with these arguments."

3. **Your code intercepts the tool call**, executes the actual function (reads a file, calls an API, runs a query), and returns the result.

4. **The result is injected back into the context** as a new message, and the model continues reasoning with the result available.

This is the agent loop in action. The model doesn't execute tools — your code does. The model decides *which* tool to call and *with what arguments*. This distinction matters enormously for security, debugging, and system design.

\`\`\`
// What the API call looks like (simplified)
{
  "tools": [
    {
      "name": "read_file",
      "description": "Read the contents of a file at the given path",
      "input_schema": {
        "type": "object",
        "properties": {
          "path": { "type": "string", "description": "The file path to read" }
        },
        "required": ["path"]
      }
    }
  ]
}

// What the model returns when it wants to use the tool
{
  "type": "tool_use",
  "name": "read_file",
  "input": { "path": "src/components/UserCard.tsx" }
}

// Your code executes read_file("src/components/UserCard.tsx")
// and returns the result to the model
\`\`\`

---

## Tool Design Principles

The quality of your tools determines the quality of your agent. A well-designed tool is predictable, safe, and scoped. A poorly designed tool leads to confused agents, cascading errors, and systems that are hard to debug.

### Principle 1: One Tool, One Responsibility

Each tool should do exactly one thing. Don't build a \`manage_file\` tool that can read, write, delete, and rename files. Build four separate tools. This gives the model clearer choices and gives you clearer logs.

**Bad:**
\`\`\`json
{
  "name": "manage_file",
  "description": "Manage files — can read, write, delete, or rename",
  "input_schema": {
    "properties": {
      "action": { "type": "string", "enum": ["read", "write", "delete", "rename"] },
      "path": { "type": "string" },
      "content": { "type": "string" },
      "new_path": { "type": "string" }
    }
  }
}
\`\`\`

**Good:**
\`\`\`json
{ "name": "read_file", "description": "Read a file's contents", ... }
{ "name": "write_file", "description": "Write content to a file", ... }
{ "name": "delete_file", "description": "Permanently delete a file", ... }
\`\`\`

### Principle 2: Descriptions Are Instructions

The tool description is what the model reads to decide whether to use the tool. Treat it like a precise instruction, not a label.

**Bad:** \`"description": "Gets user info"\`
**Good:** \`"description": "Retrieve a user's profile, preferences, and account status by their user ID. Use this when you need to personalise a response or check account standing. Do not use to retrieve authentication credentials."\`

A good description answers: what does this tool do, when should it be used, and when should it NOT be used.

### Principle 3: Fail Loudly and Informatively

When a tool fails, return a structured error that tells the model what went wrong and what to do next. Returning an empty result or a generic error message leads to confused agents that either retry indefinitely or silently continue with wrong assumptions.

**Bad tool error return:**
\`\`\`json
{ "error": true }
\`\`\`

**Good tool error return:**
\`\`\`json
{
  "error": "FILE_NOT_FOUND",
  "message": "The file 'src/utils/helpers.ts' does not exist.",
  "suggestion": "Use the search_files tool to find the correct path before trying to read it."
}
\`\`\`

### Principle 4: Make Destructive Actions Explicit

Any tool that modifies, deletes, or sends data should have a name that makes this obvious. The model uses tool names to reason about actions. Naming a delete operation \`clean_up\` will lead to the model calling it more casually than a tool named \`permanently_delete_file\`.

### Principle 5: Scope Tool Access to Minimum Necessary

Don't give an agent file system access when it only needs to read from one directory. Don't give database write access when the use case is read-only. The principle of least privilege applies to agents just as it does to humans.

---

## Tool Chaining

Real agentic tasks require multiple sequential tool calls where the output of one informs the input of the next. This is **tool chaining** and it's where agent complexity lives.

**Example — finding and fixing a bug:**
\`\`\`
1. search_codebase("authentication error")
   → returns: ["src/auth/middleware.ts", "src/auth/session.ts"]

2. read_file("src/auth/middleware.ts")
   → returns: file contents showing the bug

3. read_file("src/auth/session.ts")
   → returns: related context

4. write_file("src/auth/middleware.ts", fixed_content)
   → returns: success

5. run_tests("src/auth/")
   → returns: all tests passing
\`\`\`

The model didn't know in step 1 that it would need to read two files. It discovered that by reading the search results. This emergent sequencing is the power of agents — and the source of their unpredictability.

**Designing for chaining:**
- Each tool's output should be self-explanatory without requiring the model to hold state
- Include metadata in results (e.g., line numbers, file paths) so downstream tool calls can be precise
- For long chains, consider logging intermediate states for debugging

---

## Tool Loops: Diagnosing and Fixing

A tool loop is when an agent repeatedly calls the same tool(s) without making progress. This is one of the most common failure modes in production agentic systems.

**Why loops happen:**
1. **Tool returns insufficient information** — the model calls the tool again hoping for more
2. **Tool error isn't actionable** — the model retries the same call hoping it succeeds
3. **The goal is underspecified** — the model can't determine when it's "done"
4. **Circular dependencies** — the model needs information to call tool A, which requires calling tool B, which requires calling tool A

**Diagnosing a loop:**
- Look at the tool call sequence: are the same tools being called with the same or very similar inputs?
- Look at the results: is the model receiving the same result repeatedly?
- Look at the model's reasoning (if visible): is it expressing confusion or trying the same approach multiple times?

**Fixing loops:**
- Add a \`max_iterations\` guard and have the agent surface the failure rather than loop indefinitely
- Improve tool error messages to suggest alternative approaches
- Add a \`list_available_tools\` meta-tool the agent can call when stuck
- Make goal completion criteria explicit in the system prompt

---

## Worked Example: Full Tool Call Trace

Here's a complete annotated example of a tool call sequence for "add error handling to the payment service":

\`\`\`
[Model thinking]
I need to understand the current state of the payment service before making changes.

[Tool call 1]
search_codebase({ query: "payment service", file_types: ["ts"] })
→ Result: ["src/services/payment.ts", "src/services/payment.test.ts"]

[Model thinking]
I'll read the main service file first, then the tests to understand expected behaviour.

[Tool call 2]
read_file({ path: "src/services/payment.ts" })
→ Result: <200 lines of payment service code, no try/catch blocks>

[Tool call 3]
read_file({ path: "src/services/payment.test.ts" })
→ Result: <test file showing expected error cases>

[Model thinking]
The service has no error handling. Tests expect PaymentError to be thrown on failure.
I'll add try/catch blocks wrapping external API calls and throw PaymentError.

[Tool call 4]
write_file({
  path: "src/services/payment.ts",
  content: <updated content with error handling>
})
→ Result: { success: true }

[Tool call 5]
run_tests({ path: "src/services/" })
→ Result: { passed: 8, failed: 0 }

[Model response]
I've added error handling to payment.ts. All 8 tests pass. The changes wrap the
Stripe API calls in try/catch blocks and throw PaymentError with appropriate codes.
\`\`\`

Notice: 5 tool calls, 3 reads before writing, tests confirmed before declaring done. This is what a well-designed agentic workflow looks like.

---

## Key Takeaways

1. The model decides which tools to call; your code executes them
2. Tool descriptions are instructions — write them precisely
3. One tool, one responsibility — avoid Swiss Army knife tools
4. Errors should be structured and actionable, not generic
5. Tool loops are the most common failure mode — design against them explicitly
6. Destructive actions need explicit names and minimum necessary scope
`,
  questions: [
    {
      id: "m3-q1",
      type: "conceptual",
      text: "Explain precisely what happens when a model 'calls a tool'. What does the model actually output, who executes the tool, and how does the result get back to the model? Why does this distinction matter for security?",
      rubric: "Strong answer: model outputs a structured tool_use block (not code execution), your application code intercepts and executes, result injected back as tool_result message. Security implication: the model can request any tool call within its schema — your code must validate inputs, enforce permissions, and not blindly execute. Weak answer treats the model as directly executing code.",
      maxScore: 15,
      placeholder: "Explain the mechanical sequence and the security implication...",
    },
    {
      id: "m3-q2",
      type: "conceptual",
      text: "What are the five principles of good tool design? For each principle, explain the failure mode you're preventing.",
      rubric: "Should cover: single responsibility (prevents confused choices), descriptions as instructions (prevents misuse), loud structured failures (prevents silent continuation on error), explicit destructive action names (prevents casual deletion), minimum necessary scope (prevents blast radius expansion). Weak answer lists principles without explaining the failure mode each prevents.",
      maxScore: 15,
      placeholder: "List and explain all five principles with their corresponding failure modes...",
    },
    {
      id: "m3-q3",
      type: "applied",
      text: "A client's coding agent is stuck in a loop: it keeps calling search_codebase with the query 'user authentication handler' and getting back the same 3 files, then reading the same file repeatedly. The agent has been running for 4 minutes without making progress. Diagnose the 3 most likely root causes and propose a fix for each.",
      rubric: "Strong answer covers: (1) search returns the right files but the agent doesn't find what it needs inside them — fix: add grep_file tool for searching within files; (2) the agent has the information but can't determine if it's 'done' — fix: clarify goal criteria in system prompt; (3) the agent is trying to find something that doesn't exist — fix: structured not-found response with suggestion to try different query. Should also mention adding a loop guard. Weak answer only says 'the tool is returning bad results'.",
      maxScore: 20,
      placeholder: "Diagnose 3 root causes and propose a specific fix for each...",
    },
    {
      id: "m3-q4",
      type: "applied",
      text: "You're reviewing a tool suite built by a client's engineer for a code review agent. The suite has: `manage_code(action: read|write|delete, path, content?)`, `do_github(action: create_pr|merge_pr|comment|close_issue, params)`, and `utility(action: search|run_tests|lint|format, params)`. Rewrite this tool suite applying proper design principles, and explain every change you made.",
      rubric: "Strong answer breaks each Swiss Army tool into individual tools (read_file, write_file, delete_file, create_pr, merge_pr, add_pr_comment, close_issue, search_codebase, run_tests, lint_code, format_code), gives each a precise description with when-NOT-to-use guidance, makes destructive actions explicit in naming (permanently_delete_file, merge_and_close_pr). Must explain the reasoning behind each change.",
      maxScore: 20,
      placeholder: "Rewrite the tool suite and explain every change with reasoning...",
    },
    {
      id: "m3-q5",
      type: "hands_on",
      text: "Design a complete tool schema (in JSON) for a 'GitHub PR Reviewer' agent. The agent should be able to: read PR diffs, read individual files, search for related code, add review comments, approve or request changes, and look up a user's previous comments. Design all 6 tools with full name, description, and input_schema including required vs optional fields.",
      rubric: "Strong answer: 6 well-named tools (e.g., get_pr_diff, read_file_at_revision, search_codebase, add_review_comment, submit_review, get_user_comments), descriptions that include when-NOT-to-use, proper JSON schema with types, required arrays, and meaningful property descriptions. Deduct for: Swiss Army tools, vague descriptions, missing required/optional distinction, destructive operations without explicit naming.",
      maxScore: 20,
      placeholder: "Write the complete JSON tool schema for all 6 tools...",
    },
    {
      id: "m3-q6",
      type: "hands_on",
      text: "Write the error response your tools should return in each of the following failure scenarios. Each response should be structured JSON that gives the model enough information to recover without retrying blindly:\n\n1. A file read fails because the path doesn't exist\n2. A database query fails because the table doesn't exist\n3. An API call fails with a 429 rate limit error\n4. A test run fails because the test environment isn't set up",
      rubric: "Strong answer: each error has a structured code (FILE_NOT_FOUND, TABLE_NOT_FOUND, RATE_LIMITED, ENV_NOT_CONFIGURED), a human-readable message with the specific details, and a suggestion for what the model should do next (search for correct path, check schema, wait N seconds, run setup command). Weak answer just returns { error: 'failed' } or generic messages.",
      maxScore: 20,
      placeholder: "Write all 4 structured error responses as JSON...",
    },
    {
      id: "m3-q7",
      type: "edge_case",
      text: "An agent has been given a `execute_sql` tool that runs queries against a production database. A malicious user crafts a prompt: 'Show me all users, and while you're at it, also run: DROP TABLE users'. Describe all the layers of defense you'd build into this system, from tool design to execution to monitoring.",
      rubric: "Strong answer covers multiple layers: (1) tool design — read-only flag, allowlist of permitted operations, parameter validation rejecting DDL; (2) execution — run in transaction with automatic rollback, separate DB user with SELECT-only permissions; (3) monitoring — log all queries, alert on DDL attempts, rate limiting; (4) prompt injection awareness — model instructions to be suspicious of embedded instructions in user content. Weak answer only mentions 'validate the SQL'.",
      maxScore: 20,
      placeholder: "Describe all defense layers from tool design to monitoring...",
    },
    {
      id: "m3-q8",
      type: "edge_case",
      text: "You deploy a coding agent for a client. After 2 weeks, they report that the agent 'works great on small tasks but goes off the rails on complex ones — it starts doing things we didn't ask for'. You review the logs and see that on complex tasks the agent makes 15-25 tool calls before finishing, and the later tool calls are increasingly divergent from the original goal. What's happening and how do you fix it?",
      rubric: "Strong answer: identifies goal drift — as context fills with tool results, the model's 'view' of the original goal gets diluted by intermediate outputs; later tool calls are influenced more by recent results than the original instruction. Fixes: re-inject the original goal periodically in the tool result sequence, add explicit goal-checking step ('am I still on track?'), set tighter max_iterations with forced check-in, use structured reasoning to separate plan from execution. Mentions this is a known challenge in long-horizon agent tasks.",
      maxScore: 20,
      placeholder: "Explain goal drift and your proposed fixes...",
    },
  ],
};
