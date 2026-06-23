import type { Module } from "../types";

export const module: Module = {
  id: "m9",
  track: 2,
  trackName: "Coding Agents in Practice",
  order: 9,
  title: "Custom Skills & Tool Ecosystems",
  description: "Composing tools into workflows, skill reusability, error handling and fallbacks, testing tool integrations, and building a skill library that scales across engagements.",
  estimatedMinutes: 90,
  content: `
# Custom Skills & Tool Ecosystems

Individual tools are building blocks. Skills are composed workflows — sequences of tool calls that accomplish a specific, reusable task. This module covers how to design skills that work reliably, how to handle failures gracefully, and how to build a skill ecosystem that compounds in value across client engagements.

---

## What Is a Skill?

In the context of Claude Code and agentic systems, a **skill** is a reusable, composable workflow that the agent can invoke to accomplish a specific task. Skills differ from individual tools in that they:

- Represent a multi-step workflow, not a single action
- Have a defined success/failure contract
- Can be reused across different contexts
- Are designed to be robust — they handle errors, retry, and fall back gracefully

Think of the difference between a tool (\`search_codebase\`) and a skill (\`find_and_document_usage_of_deprecated_function\` — which searches, reads results, identifies usages, and generates a migration guide).

---

## Anatomy of a Well-Designed Skill

A skill consists of:

**1. Trigger / Intent**
What causes this skill to be invoked? Either the user explicitly requests it ("create a PR for these changes") or the orchestrator determines it's needed.

**2. Pre-conditions**
What must be true before the skill can run?
- Required inputs (PR description, target branch)
- Required context (git repository must be clean, CI must be passing)
- Required permissions (write access to the repository)

**3. Execution steps**
The ordered sequence of tool calls that accomplish the task. Each step should be atomic — if it fails, the skill knows exactly where it failed and can recover or surface the failure.

**4. Post-conditions / Verification**
How does the skill know it succeeded?
- Tests pass
- API returns 200
- File exists with expected content
- No error in the log

**5. Error handling**
What happens when each step fails? Skills should never fail silently. They should:
- Categorise the failure (transient vs permanent)
- Attempt retry for transient failures (network timeout)
- Fail fast for permanent failures (permission denied)
- Return structured error information

**6. Rollback**
For skills that make real-world changes (write files, call APIs), what can be undone if something goes wrong? Design skills to be reversible where possible.

---

## Composing Tools into Skills

Here's how individual tools compose into a "Create PR" skill:

\`\`\`typescript
// Individual tools available:
// - git_status() → staged/unstaged changes
// - git_diff() → diff of staged changes
// - generate_pr_description(diff) → AI-generated PR description
// - create_pr(title, body, base, head) → creates the PR
// - add_reviewers(pr_number, reviewers) → assigns reviewers
// - run_ci_check(branch) → triggers and waits for CI

// Composed skill: create_reviewed_pr
async function createReviewedPR(title?: string, reviewers?: string[]) {
  // Pre-condition check
  const status = await git_status();
  if (status.unstaged.length > 0) {
    return { error: "UNSTAGED_CHANGES", message: "Commit or stash all changes before creating a PR" };
  }

  // Step 1: Generate PR content
  const diff = await git_diff();
  const description = title
    ? await generate_pr_description(diff, title)
    : await generate_pr_description(diff);

  // Step 2: Create the PR
  const pr = await create_pr({
    title: description.title,
    body: description.body,
    base: "main",
    head: getCurrentBranch()
  });

  // Step 3: Assign reviewers (non-fatal if fails)
  if (reviewers?.length) {
    try {
      await add_reviewers(pr.number, reviewers);
    } catch (e) {
      // Log but don't fail the skill — PR was created successfully
      console.warn("Could not assign reviewers:", e.message);
    }
  }

  // Step 4: Verify
  return {
    success: true,
    pr_url: pr.html_url,
    pr_number: pr.number,
    reviewers_assigned: reviewers?.length > 0
  };
}
\`\`\`

Notice: pre-conditions checked first, non-fatal steps have try/catch that doesn't propagate, structured success/failure return.

---

## Error Handling Patterns

### Transient vs Permanent Failures

Not all errors are equal. Design skills to distinguish between:

**Transient failures** (retry makes sense):
- Network timeouts
- Rate limiting (429)
- Temporary service unavailability (503)
- Lock contention

**Permanent failures** (retry is pointless):
- Invalid credentials (401)
- Resource not found (404)
- Permission denied (403)
- Invalid input (validation errors)

\`\`\`typescript
async function callExternalAPIWithRetry(params) {
  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await externalAPI.call(params);
    } catch (error) {
      if (isPermanentError(error)) {
        // Don't retry — surface immediately
        throw new PermanentError(error.message, { params });
      }
      lastError = error;
      if (attempt < maxRetries) {
        await sleep(Math.pow(2, attempt) * 1000); // exponential backoff
      }
    }
  }

  throw new TransientError(\`Failed after \${maxRetries} attempts\`, { lastError });
}

function isPermanentError(error) {
  return [401, 403, 404, 422].includes(error.statusCode);
}
\`\`\`

### Fallback Patterns

When a primary approach fails, skills should have fallback strategies:

\`\`\`typescript
async function searchCodebase(query: string) {
  // Primary: semantic search
  try {
    return await semanticSearch(query);
  } catch (e) {
    console.warn("Semantic search unavailable, falling back to grep");
  }

  // Fallback: keyword search
  try {
    return await grepSearch(query);
  } catch (e) {
    console.warn("Grep search failed, falling back to file listing");
  }

  // Last resort: list files for manual selection
  return await listFiles({ pattern: extractKeywords(query) });
}
\`\`\`

---

## Testing Tool Integrations

Tool integrations are some of the hardest things to test because they interact with external systems. A robust testing strategy has three layers:

**Layer 1: Unit tests with mocks**
Test the skill logic — pre-condition checks, error handling, retry logic — with mocked tool responses. Fast, no external dependencies.

**Layer 2: Integration tests with real tools in a sandbox**
Use a test environment (test GitHub org, staging database) to verify real tool calls work as expected. Slower, but catches integration issues.

**Layer 3: Contract tests**
Verify that the MCP server's tool schemas match what you actually call. These catch breaking changes when the server is updated.

\`\`\`typescript
// Layer 1: Unit test
describe("createReviewedPR", () => {
  it("fails fast when there are unstaged changes", async () => {
    mockGitStatus.mockResolvedValue({ unstaged: ["file.ts"] });
    const result = await createReviewedPR("My PR");
    expect(result.error).toBe("UNSTAGED_CHANGES");
    expect(mockCreatePR).not.toHaveBeenCalled();
  });

  it("creates PR successfully", async () => {
    mockGitStatus.mockResolvedValue({ unstaged: [] });
    mockGitDiff.mockResolvedValue("diff content");
    mockGeneratePRDescription.mockResolvedValue({ title: "Add feature", body: "..." });
    mockCreatePR.mockResolvedValue({ html_url: "...", number: 42 });

    const result = await createReviewedPR("My PR");
    expect(result.success).toBe(true);
    expect(result.pr_number).toBe(42);
  });
});
\`\`\`

---

## Building a Skill Library

A skill library is a versioned collection of skills that can be deployed across client engagements. It's one of the primary ways an Agentic SE practice builds compounding value.

**What belongs in a skill library:**
- Skills that solve problems that appear across multiple client contexts
- Skills with clear interfaces that can be configured per-client
- Skills with proven reliability (>95% success rate in production)

**What doesn't belong:**
- One-off skills that are too client-specific to generalise
- Skills with unstable interfaces that change frequently
- Skills that depend on client-specific internal systems

**Skill library structure:**
\`\`\`
skills/
  code-quality/
    create-pr.ts                 # Create PR with generated description
    request-review.ts            # Smart reviewer selection
    run-quality-checks.ts        # Lint, test, coverage check
  documentation/
    generate-api-docs.ts         # From code to OpenAPI spec
    update-changelog.ts          # Conventional commits → changelog
    create-runbook.ts            # From incident → runbook draft
  deployment/
    create-release.ts            # Tag, changelog, release notes
    rollback-deployment.ts       # Detect issue → rollback
  discovery/
    analyse-codebase.ts          # Assess agent-readiness
    generate-claude-md.ts        # Draft CLAUDE.md from codebase
\`\`\`

Each skill in the library has:
- README with use case, parameters, expected outputs
- Configuration options (so it can be adapted per-client)
- Test suite
- Version history and changelog

---

## Worked Example: A Complete Skill — "Diagnose Failing Test"

This skill composes multiple tools to diagnose a specific test failure and suggest a fix:

\`\`\`
Input: test_file, test_name (the failing test)

Step 1: run_test(test_file, test_name)
→ Capture the failure output and error message

Step 2: read_file(test_file)
→ Understand what the test is asserting

Step 3: identify_tested_function(test_content)
→ Extract the function/module being tested

Step 4: read_file(source_file)
→ Read the implementation being tested

Step 5: search_git_log(source_file, limit=10)
→ Check recent changes to this file

Step 6: analyse_failure(test_output, test_content, source_content, recent_changes)
→ LLM reasoning step: what's the most likely cause?

Step 7: generate_fix_suggestion(analysis)
→ Produce a structured suggestion: root cause, recommended fix, files to change

Output: {
  root_cause: "...",
  fix_recommendation: "...",
  files_to_change: ["..."],
  confidence: "high|medium|low"
}
\`\`\`

This skill takes what might take a developer 10-15 minutes (reproduce → read code → check git log → diagnose → plan fix) and does it in under a minute.

---

## Key Takeaways

1. Skills are composed workflows with defined contracts — not just chains of tool calls
2. Good skills check pre-conditions, handle errors, and have rollback strategies
3. Distinguish transient from permanent failures — retry only when it makes sense
4. Three-layer testing: unit mocks → integration sandbox → contract tests
5. A skill library builds compounding value — what you build for one client benefits all
6. Skills belong in the library when they're general enough to reconfigure, not when they're client-specific
`,
  questions: [
    {
      id: "m9-q1",
      type: "conceptual",
      text: "What is the key difference between a tool and a skill in an agentic system?",
      options: [
        "Tools are built by engineers while skills are defined by the AI model at runtime based on available tools",
        "Tools execute a single atomic action while skills are composed workflows with pre-conditions, ordered steps, error handling, and verification",
        "Skills are tools that have been approved for production use while tools are still in development or testing",
        "Tools interact with external systems while skills only use in-memory operations within the agent context",
      ],
      correctAnswer: "Tools execute a single atomic action while skills are composed workflows with pre-conditions, ordered steps, error handling, and verification",
      rubric: "Correct answer: tool = single atomic action; skill = composed workflow with contract. A tool does one thing (read_file, call_api). A skill orchestrates multiple tools with explicit pre-conditions, a defined success state, structured error handling, and post-condition verification. This distinction matters because skills have reliability contracts that individual tools don't — you can version, test, and reuse a skill across engagements.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m9-q2",
      type: "conceptual",
      text: "Explain the difference between transient and permanent errors in the context of skill error handling. Give two examples of each and explain how the error handling strategy differs.",
      rubric: "Transient: network timeout, rate limit (429), temporary unavailability (503) — handle with retry + exponential backoff. Permanent: authentication failure (401), not found (404), validation error (422) — fail immediately, no retry. Strategy difference: transient errors may resolve without intervention; retrying permanent errors wastes time and may cause harm (e.g., locking an account with repeated auth failures). Must give specific examples from real systems, not generic 'temporary' vs 'permanent'.",
      maxScore: 15,
      placeholder: "Define both types with two real examples each and explain the different strategies...",
    },
    {
      id: "m9-q3",
      type: "applied",
      text: "A 'Deploy to Staging' skill times out 30% of the time when triggering CI, but CI always succeeds when triggered manually. What type of error is this and what is the correct handling strategy?",
      options: [
        "Permanent error — the skill's CI trigger implementation is broken and must be rewritten before retrying",
        "Transient error — retry up to 3 times with exponential backoff (2s, 4s, 8s), checking CI status separately from the trigger response",
        "User error — the model is triggering CI before the codebase is in a deployable state",
        "Transient error — retry immediately in a tight loop until the CI system responds successfully",
      ],
      correctAnswer: "Transient error — retry up to 3 times with exponential backoff (2s, 4s, 8s), checking CI status separately from the trigger response",
      rubric: "Correct answer: transient error with bounded exponential backoff. A 30% failure rate with manual success indicates CI system load or webhook queue delay — not a permanent failure. Exponential backoff gives the CI system time to recover. The key subtlety: check CI status separately from the trigger response — the API may return 202 Accepted immediately while CI is still queued, so completion must be polled independently. Tight-loop retry (option 4) can make load worse.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m9-q4",
      type: "applied",
      text: "You've built a 'Generate API Documentation' skill for one client. It: reads TypeScript source files, extracts JSDoc comments, generates an OpenAPI spec, and commits it to a docs branch. A second client wants to use this skill but they use Python with docstrings, generate documentation in Confluence, and don't want it committed to Git. Redesign the skill to be reusable across both clients. What becomes configuration vs what stays hardcoded?",
      rubric: "Strong answer: configuration: language/parser (TypeScript vs Python), doc source format (JSDoc vs docstrings), output format (OpenAPI vs Confluence format), output destination (git branch vs Confluence API); hardcoded: the phases of the workflow (read source → extract → generate → publish), error handling logic, retry strategy; provides a configuration interface/schema; shows how each client gets a configured instance. Weak answer just says 'make it more generic'.",
      maxScore: 20,
      placeholder: "Redesign the skill with explicit configuration vs hardcoded boundary...",
    },
    {
      id: "m9-q5",
      type: "hands_on",
      text: "A 'Create GitHub Release' skill has pushed a git tag but then fails when calling create_release. What is the correct rollback action?",
      options: [
        "Leave the tag in place and instruct the user to manually complete the release creation",
        "Delete the pushed tag to restore the repository to its pre-skill state, then surface a structured error",
        "Retry create_release up to 5 times before giving up, since the tag is already pushed",
        "Create the release with an empty changelog as a placeholder, then let the user fill in the details",
      ],
      correctAnswer: "Delete the pushed tag to restore the repository to its pre-skill state, then surface a structured error",
      rubric: "Correct answer: delete the pushed tag and surface a structured error. An orphaned tag (pointing to a commit with no matching release) pollutes the repository and confuses future release tooling. The skill must undo what it has done — in this case, the tag push — to leave the system in a clean state. Leaving the tag (option 1) creates inconsistency. Retrying create_release (option 3) may fail repeatedly and leaves the tag dangling in the meantime. A placeholder release (option 4) creates technical debt.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m9-q6",
      type: "hands_on",
      text: "Write a three-layer test strategy for a 'Send Notification' skill that: checks if the user wants to be notified (queries preferences DB), formats the notification based on their preferences, sends via their preferred channel (email, Slack, or push). Include what you'd mock in layer 1, what you'd use a sandbox for in layer 2, and what contract tests you'd write for layer 3.",
      rubric: "Layer 1 (unit, mocked): mock DB returning different preference combinations, mock all three channel senders, test: correct channel selected for each preference, correct format applied per channel, no send when user has notifications disabled, error handling when DB returns error; Layer 2 (integration, sandbox): use test DB, test Slack workspace, test email inbox, verify actual message arrives in correct format; Layer 3 (contract): verify send_slack_message, send_email, send_push schemas match what the skill actually calls — catches schema drift when notification service updates. Must cover all three layers with appropriate depth.",
      maxScore: 20,
      placeholder: "Write the complete three-layer test strategy...",
    },
    {
      id: "m9-q7",
      type: "edge_case",
      text: "A 'Refactor Function' skill passes all tests and auto-commits, but later introduces a performance regression — an extra DB call per invocation not covered by any test. What is the most important design change going forward?",
      options: [
        "Disable auto-commit for all refactor skills and require human approval before every commit",
        "Add a post-condition step to the skill that checks query counts or runs EXPLAIN ANALYZE on affected database operations before committing",
        "Increase test coverage to 100% so every code path is verified before the skill commits",
        "Add a rollback step that reverts the commit if a performance regression is detected within 24 hours of deployment",
      ],
      correctAnswer: "Add a post-condition step to the skill that checks query counts or runs EXPLAIN ANALYZE on affected database operations before committing",
      rubric: "Correct answer: add a performance post-condition. The incident reveals that 'tests pass' is not sufficient verification for data-access code — the skill needs to verify not just correctness but efficiency. Running EXPLAIN ANALYZE or counting queries before committing closes this gap. 100% coverage (option 3) doesn't guarantee performance tests exist. Post-commit rollback (option 4) detects too late. Disabling auto-commit (option 1) is a useful safeguard but doesn't identify the regression — it just delays it.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m9-q8",
      type: "edge_case",
      text: "You're presenting your skill library to a client. They say: 'This is great, but we want to use your skills internally without going through your consulting practice — can we just buy the library?' How do you handle this request, and what does your answer reveal about how a sustainable agentic consulting practice should be structured?",
      rubric: "Strong answer navigates the business dimension: the skills themselves have limited value without the expertise to deploy, configure, and maintain them; the library is a means to deliver value faster, not the value itself; however, being rigid about this damages client relationships; consider offering: a license with a support arrangement, access to the library as part of a retainer, or help training their internal team to use and extend the skills; this question reveals that a healthy practice should ensure clients can't just 'buy the methodology' — the value is in ongoing expertise, new patterns, and the ability to adapt skills to new contexts. Shows business maturity alongside technical depth.",
      maxScore: 20,
      placeholder: "Handle the request and explain what it reveals about practice structure...",
    },
  ],
};
