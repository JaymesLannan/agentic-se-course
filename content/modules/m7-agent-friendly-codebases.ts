import type { Module } from "../types";

export const module: Module = {
  id: "m7",
  track: 2,
  trackName: "Coding Agents in Practice",
  order: 7,
  title: "Making Codebases Agent-Friendly",
  description: "CLAUDE.md anatomy, rules files, context hygiene, naming conventions, test coverage as agent guardrails, and auditing an existing codebase for agent readiness.",
  estimatedMinutes: 90,
  content: `
# Making Codebases Agent-Friendly

A codebase that works well for humans may work poorly for agents. Agents read differently than humans — they have context limits, no organisational memory, and no ability to ask a colleague. Making a codebase agent-friendly is one of the most concrete, high-value things an Agentic SE can do for a client.

---

## What "Agent-Friendly" Actually Means

An agent-friendly codebase is one where an agent can:
1. Understand the project structure without human guidance
2. Find relevant files quickly (within few tool calls)
3. Identify existing patterns before implementing new ones
4. Verify its own work through tests
5. Avoid breaking existing functionality

This is not achieved by a single CLAUDE.md file. It's achieved by a combination of documentation, structure, naming conventions, and test coverage — all working together.

---

## CLAUDE.md: The Agent's Briefing Document

CLAUDE.md is the first file Claude Code reads. Think of it as a briefing document for a new contractor who's smart but knows nothing about your organisation. It should answer:

1. What is this project and what does it do?
2. How is the codebase structured? Where does what live?
3. What are the key conventions and patterns I must follow?
4. What should I never do?
5. What tools and commands do I need to know?

### CLAUDE.md Anatomy

\`\`\`markdown
# Project Overview
[2-3 sentences on what the project is and what it does]

## Tech Stack
- Runtime: Node.js 20, TypeScript 5.3
- Framework: Express 4, Prisma 5 (PostgreSQL)
- Testing: Vitest, Supertest for API tests
- Key libraries: Zod (validation), winston (logging), ioredis (caching)

## Project Structure
src/
  api/          # Route handlers — one file per resource
  services/     # Business logic — called by handlers, never directly from routes
  repositories/ # Database access — ALL Prisma calls live here, nowhere else
  middleware/   # Express middleware
  lib/          # Shared utilities and clients
  types/        # TypeScript type definitions

## Architecture Rules (IMPORTANT)
- NEVER call Prisma directly from handlers or services. Always go through the repository layer.
- NEVER put business logic in route handlers. Handlers call services only.
- ALWAYS use the ApiError class for throwing errors (see src/lib/errors.ts)
- ALWAYS use Zod schemas for request validation (see src/api/users/schema.ts for example)

## Key Patterns
- Adding a new endpoint: follow src/api/products/index.ts as the template
- Adding validation: follow src/api/users/schema.ts for the Zod pattern
- Adding a new service: follow src/services/user.service.ts as the template

## Generated Files (DO NOT EDIT)
- src/generated/ — rebuilt by Prisma generate, changes are lost
- src/types/api.generated.ts — built by openapi-typescript, don't edit

## Running the Project
\`\`\`
npm run dev       # Start development server
npm test          # Run all tests
npm test -- --run src/api/users  # Run tests for a specific area
npx prisma studio # View database in browser
\`\`\`

## What to Avoid
- Don't install new packages without checking if the functionality already exists in our utils
- Don't modify the Prisma schema without creating a migration
- Don't bypass the repository layer for "quick" database access
\`\`\`

This is a living document. It should be updated whenever architecture decisions change.

---

## Rules Files

Beyond CLAUDE.md, some teams use rules files for specific workflows:
- \`.cursorrules\` (Cursor IDE)
- Custom instruction files injected at session start

Rules files are useful for:
- Task-specific instructions ("when adding tests, always use the factory pattern in test/factories/")
- Team-specific workflows ("before committing, always run npm run lint:fix")
- Repeated constraints that apply to many tasks

---

## Context Hygiene

Context hygiene is the discipline of keeping the agent's context window clean and relevant.

**What wastes context:**
- Files imported "just in case" they're relevant
- Long comments explaining history ("this was changed because of the 2023 refactor")
- Dead code (commented-out alternatives, abandoned approaches)
- Deeply nested file structures that require many reads to traverse

**What preserves context:**
- Small, focused files (one class/service per file)
- Self-describing names that reduce the need to read for orientation
- Barrel files (index.ts) that expose what's in a directory without requiring traversal
- Types co-located with the code that uses them

**The 300-line rule:** If a file is over 300 lines, it's probably doing too much. Large files cost more tokens to read and make it harder for the agent to find what it needs.

---

## Naming Conventions and Token Cost

How you name things directly affects agent performance. Agents read code in tokens — poor naming choices waste context and introduce ambiguity.

**Overly verbose names:**
\`\`\`typescript
// 8 tokens just for the function name
async function processAndValidateUserInputDataForRegistrationForm(data: unknown)
\`\`\`

**Better:**
\`\`\`typescript
// 3 tokens
async function validateRegistration(data: unknown)
\`\`\`

**Inconsistent patterns:**
\`\`\`typescript
// These are all the same operation — the agent can't pattern-match
getUserById()
fetchUser(id)
loadUserData(userId)
retrieveUserProfile(id: string)
\`\`\`

**Consistent:**
\`\`\`typescript
// Clear pattern: get{Resource}By{Field}
getUserById(id: string)
getProductBySlug(slug: string)
getOrderByReference(ref: string)
\`\`\`

Consistent naming means the agent can predict where things are without reading every file. "I need to find the order retrieval function — given the pattern, it's probably called \`getOrderBy...\`" — and it's right.

---

## Test Coverage as Agent Guardrails

Tests are the primary mechanism by which an agent can verify its own work. Without them, the agent is flying blind.

**What tests give agents:**
- **Confidence to make changes:** if tests pass, the change is likely correct
- **Fast failure signal:** if tests fail, the agent knows immediately and can iterate
- **Scope boundaries:** tests describe expected behaviour, constraining what "correct" looks like

**Test coverage thresholds for agent-assisted development:**
- < 40% coverage: agents can make changes but cannot reliably verify them. Not recommended for autonomous agent use.
- 40-70% coverage: agents can work on covered areas reliably, risky on uncovered areas
- > 70% coverage: agents can work reliably across most of the codebase

**What matters beyond percentage:**
- Are the critical paths tested? (auth, payment, data mutations)
- Are error cases tested? (agent needs to know what invalid inputs should do)
- Do tests run quickly? (fast feedback loop enables more iteration)

---

## Auditing a Codebase for Agent Readiness

When onboarding a new client, you should assess their codebase against these dimensions before recommending agent use:

| Dimension | Red flag | Green flag |
|-----------|----------|------------|
| Documentation | No CLAUDE.md, no architecture docs | CLAUDE.md exists, up to date |
| Structure | Files > 500 lines, no clear patterns | Clear module separation, consistent structure |
| Naming | Inconsistent, abbreviated, context-dependent | Descriptive, consistent, self-explaining |
| Tests | < 40% coverage, no CI | > 70%, fast, CI enforced |
| Generated files | Not marked, not in .gitignore | Clearly marked, committed or gitignored consistently |
| Dependencies | Many, inconsistent use | Few, clearly used, no duplication |

---

## Worked Example: Before/After Codebase Audit

**Before (problematic codebase):**
\`\`\`
src/
  helpers.js          # 847 lines, does everything
  api.js              # 1,200 lines, all routes and business logic mixed
  db.js               # Direct database calls scattered throughout
  utils/
    misc.js           # Catch-all utility file
\`\`\`

No CLAUDE.md. 12% test coverage. Inconsistent naming (getUser, fetchUserData, loadProfile all exist). Generated files in src/ without documentation.

**After (agent-friendly):**
\`\`\`
src/
  api/
    users/
      handler.ts      # ~80 lines — route handling only
      service.ts      # ~120 lines — business logic
      repository.ts   # ~60 lines — database access
      schema.ts       # ~40 lines — Zod validation
      handler.test.ts # ~150 lines — comprehensive tests
  lib/
    redis.ts          # Redis client
    logger.ts         # Winston logger
  generated/          # Marked as generated in CLAUDE.md
CLAUDE.md             # Full architecture guide
\`\`\`

73% test coverage. Consistent naming. CLAUDE.md written. Generated files documented.

**Result:** Claude Code sessions went from requiring 8-12 reads before making any changes to 2-3 reads. Task completion quality improved significantly because the agent understood patterns before writing code.

---

## Key Takeaways

1. Agent-friendly = navigable, consistent, documented, and testable
2. CLAUDE.md is the agent's briefing document — write it like you're briefing a smart new contractor
3. Context hygiene matters: small files, consistent naming, no dead code
4. Naming consistency enables pattern prediction — the agent can infer before it needs to read
5. Test coverage is the agent's feedback mechanism — < 40% means unverified work
6. Audit codebases for agent readiness before recommending autonomous agent use
`,
  questions: [
    {
      id: "m7-q1",
      type: "conceptual",
      text: "Why is test coverage a prerequisite for reliable agentic coding, not just a good practice?",
      options: [
        "Agents cannot write code at all without existing tests to use as examples of the expected patterns",
        "Without tests, an agent has no feedback signal after making changes and may declare success on work that introduced bugs in untested paths",
        "Test coverage is required by Claude Code's terms of service before the tool can be used in a production codebase",
        "Agents will refuse to modify files that are not covered by existing tests to avoid breaking untested behaviour",
      ],
      correctAnswer: "Without tests, an agent has no feedback signal after making changes and may declare success on work that introduced bugs in untested paths",
      rubric: "Correct answer: no feedback signal. The agent loop depends on act → verify → iterate. Without tests, 'verify' is broken — the agent can only check that code compiles, not that it behaves correctly. It declares success based on syntax, not behaviour, which means bugs in untested paths go undetected. 80% coverage closes this loop: the agent runs tests, gets failures, and iterates until they pass.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m7-q2",
      type: "conceptual",
      text: "Why does naming consistency matter for agent performance? Give a concrete example showing how inconsistent naming across a codebase forces the agent to make more tool calls, and how consistent naming reduces them.",
      rubric: "Strong answer: inconsistent naming means agent cannot predict location/identity of functions — must search and read to find what it needs; consistent naming means agent can predict pattern and often go directly to the right function; concrete example showing inconsistent names (getUser/fetchUser/loadProfile) requiring grep search vs consistent pattern (getUserById) allowing direct access. Connects to token/time cost. Weak answer says 'consistent naming is good practice'.",
      maxScore: 15,
      placeholder: "Explain the mechanism with a concrete before/after naming example...",
    },
    {
      id: "m7-q3",
      type: "applied",
      text: "You have 5 days to make a client's codebase agent-ready. It has no CLAUDE.md, a 1,400-line helpers.js, inconsistent naming, and 22% test coverage. What should you do on Day 1?",
      options: [
        "Refactor helpers.js into smaller, well-named files so the agent has a cleaner codebase to work with from the start",
        "Write a CLAUDE.md that documents the current state, key conventions, and most important architecture rules — even if the codebase is messy",
        "Increase test coverage to at least 60% before doing anything else, since agents cannot work reliably below that threshold",
        "Standardise all naming conventions by renaming functions across the codebase to eliminate the inconsistency",
      ],
      correctAnswer: "Write a CLAUDE.md that documents the current state, key conventions, and most important architecture rules — even if the codebase is messy",
      rubric: "Correct answer: write CLAUDE.md first. CLAUDE.md is the highest-leverage first step because it immediately improves every subsequent agent session — the agent reads it before acting and gains context it would otherwise have to discover through expensive tool calls. Refactoring (options 1 and 4) takes days and doesn't help the agent until complete. Targeting test coverage (option 3) is important but secondary to giving the agent a map of the codebase.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m7-q4",
      type: "applied",
      text: "A client's engineer has started using Claude Code and reports that the agent 'keeps reinventing things that already exist in our codebase'. It's creating new utility functions that duplicate existing ones, new validation patterns instead of using the existing Zod schema library, and new error classes instead of extending the existing ApiError. What's causing this and what are all the ways you could fix it?",
      rubric: "Strong answer: root cause is agent isn't discovering existing utilities before implementing — either because CLAUDE.md doesn't point to them, or the file structure doesn't make them discoverable, or there's no pattern for the agent to match against. Fixes: (1) CLAUDE.md section explicitly listing key utilities and when to use them; (2) add a 'check for existing implementation before creating new' instruction; (3) reorganise utilities so they're in obvious locations; (4) add exemplar references to task prompts ('use the pattern in src/lib/validation.ts'). Multiple fixes warranted.",
      maxScore: 20,
      placeholder: "Diagnose the root cause and list all the ways you'd fix it...",
    },
    {
      id: "m7-q5",
      type: "hands_on",
      text: "In a FastAPI codebase with a strict router → service → repository layered architecture, which CLAUDE.md entry is most important to include?",
      options: [
        "A complete list of all Python packages in requirements.txt so the agent knows what is available",
        "An explicit rule stating that database access must only happen in repository files — never in routers or services directly — with an example of the correct pattern",
        "A description of the company's coding philosophy and values to help the agent understand the team culture",
        "The full directory tree of the project so the agent can navigate without calling list_files",
      ],
      correctAnswer: "An explicit rule stating that database access must only happen in repository files — never in routers or services directly — with an example of the correct pattern",
      rubric: "Correct answer: the architectural constraint with an example. CLAUDE.md's most important job is to prevent the agent from violating hard architectural rules that aren't visible from file structure alone. The database-access constraint is exactly this — the agent would otherwise make direct DB calls wherever it is convenient. An explicit rule plus an example of correct usage is the most effective way to enforce it.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m7-q6",
      type: "hands_on",
      text: "Audit the following codebase description against the 6 agent-readiness dimensions (documentation, structure, naming, tests, generated files, dependencies). Give each a score (Red/Amber/Green), explain your reasoning, and for any Red scores, write the specific change you'd make first.\n\nCodebase: E-commerce platform, ~50K lines, Node.js/TypeScript. Has a README with setup instructions but no architecture docs. Files range from 20 to 2,000 lines. Naming is mostly consistent except the payment module uses Hungarian notation (strPaymentRef, intAmount). 58% test coverage with good coverage of the happy path but minimal error case coverage. Generated files from Prisma are in src/generated/ and commented 'DO NOT EDIT' at the top of each file. 4 HTTP client libraries in use (axios, node-fetch, got, native fetch).",
      rubric: "Documentation: Amber (README but no architecture docs — fix: write CLAUDE.md); Structure: Amber/Red (2000 line files are Red — fix: identify and split the largest files); Naming: Amber (mostly consistent — fix: document Hungarian notation exception in CLAUDE.md, plan to migrate payment module naming); Tests: Amber (58% overall but error cases weak — fix: prioritise error case tests for payment and auth paths); Generated files: Green (clearly marked); Dependencies: Red (4 HTTP clients is a significant issue — fix: standardise on one, document which in CLAUDE.md). Should give specific first-step fix for each Red.",
      maxScore: 20,
      placeholder: "Score all 6 dimensions with reasoning and specific first-step fixes for Red scores...",
    },
    {
      id: "m7-q7",
      type: "edge_case",
      text: "Six months after an agent-readiness setup, you find CLAUDE.md is outdated, architecture rules are violated, and test coverage has dropped from 73% to 51%. What is the most important systemic fix?",
      options: [
        "Rewrite CLAUDE.md from scratch with stricter rules to reassert the architecture constraints",
        "Remove Claude Code access from the team until test coverage is restored to 73%",
        "Add automated enforcement: a CI coverage threshold that fails builds below 65%, and a PR checklist item requiring CLAUDE.md review when files are renamed or moved",
        "Hold a team training session to remind engineers of the architectural rules and the importance of test coverage",
      ],
      correctAnswer: "Add automated enforcement: a CI coverage threshold that fails builds below 65%, and a PR checklist item requiring CLAUDE.md review when files are renamed or moved",
      rubric: "Correct answer: automated enforcement. The setup decayed because it relied on human discipline rather than automated guardrails. A CI coverage threshold enforces the floor mechanically — it cannot be bypassed by moving fast. A PR checklist item for CLAUDE.md keeps it current with structural changes. Training (option 4) and rewriting rules (option 1) are both correct but insufficient alone — they will decay again without automation backing them.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m7-q8",
      type: "edge_case",
      text: "A client CTO says: 'We want to use Claude Code but our codebase is a 10-year-old monolith with no tests, inconsistent patterns everywhere, and documentation that's years out of date. It'll take months to make it agent-friendly. Is it worth it, or should we just start fresh?' How do you advise them?",
      rubric: "Strong answer: neither 'yes start fresh' nor 'no don't bother' — advise a targeted approach; identify the 20% of the codebase that generates 80% of the change requests and make just that part agent-friendly first; start with CLAUDE.md that documents current state honestly (even messy current state is better than nothing); argue that making it agent-friendly is the right thing regardless of agents — tests, clear structure, and documentation benefit human developers too; 'start fresh' is rarely the right answer for a 10-year production system. Shows business maturity alongside technical depth.",
      maxScore: 20,
      placeholder: "Give nuanced advice that addresses the real decision they're facing...",
    },
  ],
};
