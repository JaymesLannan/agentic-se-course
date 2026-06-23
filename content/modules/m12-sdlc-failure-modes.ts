import type { Module } from "../types";

export const module: Module = {
  id: "m12",
  track: 3,
  trackName: "Client Delivery Skills",
  order: 12,
  title: "SDLC Failure Modes with Agents",
  description:
    "How agents break QA (speed outpaces review), requirements debt, the review bottleneck, poorly scoped tasks, and how to redesign the SDLC to accommodate agents.",
  estimatedMinutes: 90,
  content: `
# SDLC Failure Modes with Agents

Agentic tools change the speed at which code enters the pipeline. They do not automatically change the speed at which code is reviewed, tested, deployed, or maintained. The result is predictable: every part of the software delivery lifecycle that was already under-invested becomes a crisis when agents are introduced. This module covers the five specific ways agent-assisted development breaks the SDLC, how each manifests in practice, and how to design an SDLC that can absorb the throughput that agents produce.

---

## The Core Dynamic

The fundamental tension introduced by agentic development is a mismatch between generation speed and verification speed.

Before agents: writing code was the bottleneck. Engineers spent the most time in the synthesis step — translating requirements into working code. Everything else (review, testing, deployment) was sized around the assumption that code production was the constraint.

After agents: code production is no longer the constraint. An engineer who used to produce 200-300 lines of non-trivial code per day can produce 1,000-2,000 with agent assistance. But the downstream SDLC processes — code review, QA, security review — were designed for the old production rate. They break under the new one.

This is not a problem with agentic tools. It's a problem with SDLCs that weren't designed for them. An SE who deploys agentic tools without redesigning the SDLC has made every downstream process a bottleneck. The team generates more code, but the code accumulates in the pipeline rather than shipping.

---

## Failure Mode 1: Speed/QA Mismatch

**What it is:** Code generation accelerates, but the QA process doesn't. The team ships faster to staging and the QA environment fills up with more code than reviewers can evaluate. Review quality degrades under time pressure, or releases start backing up, or both.

**How it manifests:**

Developers are enthusiastic about the agent-assisted velocity. Sprints feel productive. But PR cycle time quietly increases — not because engineers are slower at code review, but because there are more PRs. A reviewer who used to see 3-4 PRs per day now sees 8-10. Each PR takes the same amount of time to review, but there are more of them, and the reviewer can't keep up.

By week three of agent-assisted development, the pattern becomes visible: a developer creates a PR, it sits for 3-4 days, gets reviewed, and then creates two more PRs. The queue grows. Developers, frustrated by the wait, start batch-merging PRs or self-approving with minimal review. Code quality starts degrading in exactly the areas that reviews were supposed to catch.

**Root cause:** The review process was sized for the old throughput. It has not been given additional capacity (more reviewers, faster review tools, automated pre-screening) to match the new rate.

**Concrete fix:**

1. Introduce automated pre-screening into the PR process. Before a PR reaches a human reviewer, run: linting, formatting checks, automated test suite, security scan, and — critically — an AI-assisted review pass. The AI review flags obvious issues, summarizes changes, and identifies the parts that need human attention. Human reviewers spend their time on the parts that actually require judgment.

2. Establish PR size limits. Agent-assisted development can produce large PRs because the agent can implement a lot quickly. Implement a mandatory check: no PR over 400 lines (excluding generated code). Large PRs are a primary driver of slow review. This rule exists before agents, but its enforcement matters more after.

3. Expand reviewer pool. Identify the engineers who can do code review, not just the ones who currently do. With automated pre-screening, the bar to being a useful reviewer is lower — they're making judgment calls on flagged issues, not doing a full analysis from scratch.

---

## Failure Mode 2: Requirements Debt

**What it is:** Agents produce code quickly from ambiguous requirements. The code is technically coherent and passes tests, but it implements the wrong thing. By the time this is discovered, significant agent time has been spent on code that will be discarded or refactored.

**How it manifests:**

The problem starts in the task specification. When requirements are vague, a human engineer would stop and ask a clarifying question. An agent will make a reasonable assumption and implement from that assumption. If the assumption is wrong, the agent produces a large, coherent, wrong implementation.

This is worse than a small, wrong implementation. A small wrong implementation is easy to identify and discard. A large wrong implementation looks like progress — it has tests, it passes CI, it looks like finished work. It gets further down the pipeline before the wrongness becomes apparent. By the time someone realizes the feature was built for the wrong user journey, there are 15 PRs in review and a sprint report showing great velocity.

Requirements debt also accumulates across sessions. An agent that makes a small assumption in session 1 may build on that assumption in session 2, 3, and 4. By session 5, the wrong assumption is embedded in the architecture and is expensive to reverse.

**Root cause:** The clarifying-question function that human engineers perform before starting work is not present in agentic workflows by default. The agent proceeds with best-guess interpretation rather than blocking on ambiguity.

**Concrete fix:**

1. Require structured task specifications before any agentic implementation task. A task specification includes: the user story, the acceptance criteria (as testable assertions, not prose), the definition of done, and explicitly: "What would make this task fail? What edge cases are excluded from this implementation?"

2. Add an explicit clarification gate. Before the agent writes any implementation code, have it generate a list of assumptions it's making and questions it would need answered to proceed with confidence. Treat this as a mandatory step, not optional. The developer reviews the assumption list, confirms or corrects each item, then the agent proceeds.

3. Short iteration cycles. Cap agent implementation tasks at 2-hour blocks. After each block, review what was produced against the specification. Catch wrong-direction movement early, not after a 2-day implementation sprint.

---

## Failure Mode 3: The Review Bottleneck

**What it is:** A single person or team becomes the critical path for all agentic output, because the organization hasn't distributed the expertise needed to evaluate it.

**How it manifests:**

This is a structural amplification of a pre-existing problem. In many engineering organizations, one or two senior engineers do disproportionate amounts of code review because they have the breadth of knowledge to evaluate changes across the codebase. This was manageable when code production was human-speed. When agents enter the picture, the same bottleneck now processes more work — and it becomes the single constraint on the entire pipeline.

The bottleneck engineer also changes their behavior under pressure. Under normal throughput, they do thorough reviews. Under agent throughput, they do faster, shallower reviews to keep up. The reviews become checkbox exercises, which means the oversight value disappears while the latency cost remains.

There's also a trust dimension. Some senior engineers don't trust agent-generated code and feel they need to scrutinize it more carefully than human-generated code. This doubles review time per PR exactly when PR volume has doubled. The bottleneck compounds.

**Root cause:** Knowledge concentration combined with throughput increase. The organization hasn't built the distributed review capacity that agentic throughput demands.

**Concrete fix:**

1. Automated review pre-filtering: same as failure mode 1. Agents can review agent output. Use a review agent to run a first pass and surface only the genuinely ambiguous or high-risk decisions to the human reviewer.

2. Explicit review distribution. Map the review competency across the team. Who can review database changes? Who understands the authentication layer? Who knows the API contract? Build a routing system — PRs touching specific areas route to the engineers who know those areas, not all to the same two people.

3. Graduated trust model. Develop an explicit framework for which types of agent-generated changes require senior review, which require peer review, and which can be merged with automated checks only. Not all agent output needs the same scrutiny. A change to the test suite for a non-critical utility function does not need the same eyes as a change to the payment processing logic.

---

## Failure Mode 4: Context Loss

**What it is:** Agents work in isolated task contexts. Between sessions, across sessions, or across different engineers using the agent, context that is critical to correct implementation gets lost. The agent makes different assumptions in different sessions, and the resulting code is incoherent across the system.

**How it manifests:**

An engineer uses an agent on Monday to build a user preference system. They make key architectural decisions: preferences are stored as a JSON blob in a single DB column, the preference key names follow a specific convention, and there's a singleton preferences service. The agent implements this correctly.

On Thursday, a different engineer uses an agent to add a new feature that needs to read user preferences. They don't know about the Monday implementation (it hasn't shipped yet, so it's not in the docs). Their agent does something reasonable: it stores the new preference in a separate table, names the keys differently, and queries directly rather than through the singleton. The code works in isolation. When both implementations land, there are two incompatible preferences systems in the codebase.

This is context loss. It happens because agents don't have organizational memory. They know what's in the context window. They don't know about the decision made in Monday's session, the discussion in Tuesday's Slack thread, or the architectural principle that was established last quarter.

**Root cause:** Agentic development sessions are episodic and isolated. The knowledge produced in one session is not automatically available to the next session.

**Concrete fix:**

1. Maintain a live CLAUDE.md (or equivalent) that is updated at the end of each significant implementation session. This document captures: architectural decisions made, patterns established, conventions agreed on, and "things the agent should know before starting work in this area." Treat this document as the agent's long-term memory.

2. Establish architectural decision records (ADRs). For any decision that affects how other engineers will implement adjacent features, write an ADR before the agent implements. The ADR becomes part of the agent's context for all future sessions in that area.

3. Pre-session context review. Before an engineer starts a new agentic session, require them to review the CLAUDE.md and relevant ADRs for the area they're working in. This takes five minutes and prevents hours of rework.

---

## Failure Mode 5: Scope Drift

**What it is:** Agents, given a task, sometimes expand the scope of what they implement — either because the task was underspecified, because they identify adjacent improvements while implementing, or because the engineer's prompts gradually widen the scope without anyone noticing.

**How it manifests:**

An engineer asks the agent to "add input validation to the registration form." The agent, noticing that the form also has no rate limiting, no CSRF protection, and no email verification, adds all of these. This sounds like a good thing. It isn't — at least not as an unexpected output.

The agent has now changed four systems, not one. The PR is large. The reviewer doesn't know what they're reviewing because the description says "add input validation." The tests cover the validation but not the new CSRF implementation (because the engineer didn't know to write tests for it). The rate limiting uses a library that doesn't work well with the team's existing session store. Three bugs are introduced that weren't in the original scope.

Scope drift is subtle because the additional work is often genuinely useful. The agent isn't wrong to flag or implement the adjacent issues. The problem is that unannounced scope expansion creates unreviewed code, untested behavior, and surprises in the merge.

**Root cause:** Agents are helpful by default. They don't distinguish between "what you asked me to do" and "what seems related and useful." Engineers don't always notice when the agent has exceeded the task scope.

**Concrete fix:**

1. Explicit scope boundaries in task specifications. Every task spec should include "Out of scope for this task:" with at least two examples. This is instruction to the agent, not just the engineer.

2. Require the agent to confirm scope before implementation. After reading the task spec, the agent should output: "I'll implement X, Y, and Z. I noticed A and B which are adjacent but out of scope — I'll note them for a follow-up ticket." This makes scope drift visible before it happens.

3. PR size checks catch scope drift in practice. If the PR is significantly larger than expected for the stated task, that's a scope drift signal that triggers a conversation before review.

---

## Metrics That Reveal SDLC Health Under Agent Use

Standard velocity metrics (story points, lines of code, commits per day) will look great during agentic adoption and will not tell you whether the SDLC is healthy. You need different metrics:

**PR cycle time by PR size:** If cycle time is increasing as PR size increases, you have a review bottleneck problem. Track cycle time separately for small (<200 line) and large (>200 line) PRs.

**Clarification rate:** How often does an agent-generated implementation require clarification or correction before it can be merged? A high clarification rate indicates a requirements quality problem.

**Rework rate:** How often does a merged PR require a follow-up PR within 72 hours to fix something that review missed? Rising rework rate indicates review quality degradation.

**Context-collision incidents:** How often does an engineer discover that their implementation conflicts with another engineer's agent-generated implementation? These incidents indicate context loss problems.

**Review thoroughness proxy:** Time per line of code reviewed. If this is decreasing as PR volume increases, reviewers are spending less time per line — quality may be degrading under volume pressure.

---

## The Agent-Ready SDLC Design

An SDLC designed for agentic development looks different from one designed for human-speed development:

**Task specification gate:** No agent starts implementation without a structured spec that includes acceptance criteria, scope boundaries, and an agent assumption review step.

**Automated pre-review pipeline:** Every PR runs automated checks — linting, tests, security scan, and AI-assisted review summary — before reaching a human reviewer. Human review is focused on the issues the automation surfaces, not a full read from scratch.

**Distributed review routing:** PRs route to the appropriate reviewer based on the area of the codebase touched, not to a centralized bottleneck. Review expertise is mapped and maintained explicitly.

**Living context document:** CLAUDE.md (or equivalent) is updated as part of the definition of done for every significant implementation task. It's not a nice-to-have — it's required to close the ticket.

**PR size discipline:** Maximum PR size is enforced by tooling, not convention. Large PRs are flagged and returned for decomposition before they enter the review queue.

**Scope confirmation step:** Every agentic task begins with a scope confirmation output from the agent before any code is written.

---

## The Difference Between Teams Using Agents Well vs Badly

Teams using agents well:
- Have the same or better code quality metrics as before — because the automated pipeline catches regressions
- Have faster cycle times driven by smaller PRs and better pre-screening, not rubber-stamp review
- Have architecture that remains coherent across sessions because of maintained context documents
- Have engineers who feel more productive and less exhausted, because agents handle the mechanical work

Teams using agents badly:
- Have impressive velocity metrics and degrading quality metrics — simultaneously
- Have engineers who produce a lot but feel like nothing is shipping
- Have a growing queue of PRs that are taking longer and longer to merge
- Have incidents caused by agent-generated code that no one fully understood before merging
- Have a growing sense that "the AI is generating bugs faster than we can fix them"

The difference is not the tools — it's whether the SDLC was redesigned to accommodate the tools.

---

## Key Takeaways

1. Agents change the throughput of code production without automatically changing the capacity of code review, QA, or deployment. Every bottleneck downstream of code production becomes a crisis.
2. Five specific failure modes: speed/QA mismatch, requirements debt, review bottleneck, context loss, and scope drift. Each has distinct symptoms, root causes, and fixes.
3. Standard velocity metrics (story points, commits) will look great even when the SDLC is breaking down. Use cycle time, rework rate, and clarification rate instead.
4. An agent-ready SDLC has: task specification gates, automated pre-review pipelines, distributed review routing, living context documents, PR size discipline, and scope confirmation steps.
5. The goal is not to slow agents down to match the old SDLC — it's to accelerate the rest of the SDLC to match the agents.
`,
  questions: [
    {
      id: "m12-q1",
      type: "conceptual",
      text: "When agentic tools are introduced without SDLC redesign, standard velocity metrics (story points, commits per day) continue to look strong even as the team's SDLC breaks down. Why?",
      options: [
        "Velocity metrics are measured by the development team and are susceptible to manipulation when teams feel pressure to appear productive with new tools",
        "Velocity metrics measure the input side of the SDLC (code produced, tickets closed) rather than the output side (code that safely ships), so they improve as agents accelerate code generation while downstream bottlenecks grow",
        "Velocity metrics are designed for waterfall processes and never accurately reflected agile team performance, regardless of whether agentic tools are in use",
        "Management teams stop trusting velocity metrics when they see increasing incidents, causing the metrics to lose predictive value before teams can address underlying issues",
      ],
      correctAnswer: "Velocity metrics measure the input side of the SDLC (code produced, tickets closed) rather than the output side (code that safely ships), so they improve as agents accelerate code generation while downstream bottlenecks grow",
      rubric: "Correct answer: input vs output measurement gap. Agents accelerate code generation (input) but leave review, QA, and deployment (output) sized for the old rate. Velocity metrics measure the input side, so they look great even as cycle times lengthen, rework rates rise, and quality degrades. The metrics that reveal breakdown are downstream: cycle time, rework rate, incidents per release. Agents invert the old constraint — the bottleneck moves from generation to verification.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m12-q2",
      type: "conceptual",
      text: "Context loss and requirements debt are related but distinct failure modes. Explain the mechanism of each, how they produce different symptoms, and why requirements debt is particularly dangerous in agentic workflows compared to human-only development.",
      rubric:
        "Strong answer: requirements debt mechanism — agent makes reasonable assumptions from ambiguous specs and implements confidently from those assumptions; the wrongness is invisible until a demo or integration test; it's more dangerous in agentic workflows because the agent produces a large, coherent, wrong implementation faster than a human would; a human would stop and ask; the agent doesn't; the large wrong implementation looks like progress and gets further down the pipeline; context loss mechanism — agents work episodically; decisions made in one session aren't available in the next unless deliberately preserved; different sessions produce incompatible implementations of adjacent systems; the symptom is architectural incoherence that appears during integration, not during development; distinction: requirements debt makes the right engineer build the wrong thing; context loss makes the right engineer build the right thing incorrectly relative to what another session built; requirements debt is caught at demo/acceptance; context loss is caught at integration or in production. Weak answer conflates the two or only describes one mechanism.",
      maxScore: 15,
      placeholder:
        "Explain the mechanism and symptoms of each, and why requirements debt is distinctively dangerous with agents...",
    },
    {
      id: "m12-q3",
      type: "applied",
      text: "A team has used Claude Code for 6 weeks. Velocity is up 40%, but PR cycle time went from 2 to 5 days, 3 production incidents were traced to agent-generated code, and the 2 senior engineers doing most reviews feel overwhelmed. Which failure mode is the critical path bottleneck that must be fixed first?",
      options: [
        "Context loss — the incidents were caused by agent sessions lacking architectural context, so a CLAUDE.md needs to be created before anything else",
        "Speed/QA mismatch — the 40% velocity increase must be rolled back to match the review pipeline's original capacity",
        "The review bottleneck — two senior engineers reviewing everything is the critical path; fixing automated pre-screening and review distribution unblocks the other failure modes",
        "Scope drift — agents are implementing beyond their task specification, so all tasks need stricter scope boundaries before other fixes are applied",
      ],
      correctAnswer: "The review bottleneck — two senior engineers reviewing everything is the critical path; fixing automated pre-screening and review distribution unblocks the other failure modes",
      rubric: "Correct answer: review bottleneck is the critical path. The failure modes interact — 40% velocity increase hit an unscaled review pipeline → queue grows → reviewers under pressure → shallower reviews → incidents. You cannot fix the QA mismatch without first increasing review capacity. Immediate fix: automated pre-screening (linting, tests, AI-assisted review summary) so human review focuses on judgment, not mechanical checking. Then distribute review load and implement PR size limits. Investigate the incidents in parallel to determine whether they're context loss or scope drift.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m12-q4",
      type: "applied",
      text: "You're designing the SDLC integration for a new client: 20 engineers, a Django/React codebase, currently no automated code review tooling, a single engineering manager who does most code approvals. They're excited about agents. Walk them through the SDLC changes they need to make before they start using agents in production work, and explain the consequences of skipping each step.",
      rubric:
        "Strong answer: (1) task specification template — before anything else; consequence of skipping: requirements debt from day one, agent will make wrong assumptions immediately; (2) automated pre-review pipeline — before agents touch production code; tools: linting already exists, add test runner in CI, security scanner (Bandit for Python), AI-assisted PR summary; consequence of skipping: human reviewer load doubles and the single EM becomes the bottleneck immediately; (3) PR size discipline — configure a GitHub Action to flag PRs over 400 lines before they reach review; consequence of skipping: scope drift goes undetected and review quality degrades under large PR burden; (4) CLAUDE.md / context document — establish before first agent session; consequence of skipping: context loss within weeks as multiple engineers run separate agent sessions without shared architectural context; (5) review distribution plan — map competency, route PRs before volume increases; consequence of skipping: EM bottleneck becomes critical path instantly; not everything needs to be perfect before starting, but items 1-3 are prerequisites; 4-5 can be built concurrently with first agentic work but must be in place by week 2. Weak answer lists changes without prioritizing them or explaining consequences of skipping.",
      maxScore: 20,
      placeholder:
        "Walk through the required SDLC changes in priority order, explaining consequences of skipping each...",
    },
    {
      id: "m12-q5",
      type: "hands_on",
      text: "In a scope confirmation protocol between an engineer and an agent at the start of an implementation task, what must the agent produce before writing any code?",
      options: [
        "A time estimate for the task and a list of files it plans to create, so the engineer can approve the plan before reviewing the implementation",
        "An explicit list of what it will implement, what assumptions it is making, questions that would change its approach, and out-of-scope items it noticed — with the engineer confirming each assumption before code is written",
        "A confidence score for each component of the task, so the engineer knows which parts of the implementation to review most carefully",
        "A summary of the existing codebase patterns it found during the reading phase, confirming it understands the conventions before implementing",
      ],
      correctAnswer: "An explicit list of what it will implement, what assumptions it is making, questions that would change its approach, and out-of-scope items it noticed — with the engineer confirming each assumption before code is written",
      rubric: "Correct answer: four-part pre-implementation output with engineer confirmation. The agent must produce: (1) 'I will implement:' — specific changes and files; (2) 'Assumptions I'm making:' — explicit list; (3) 'Questions that would change my approach:' — things engineer must confirm; (4) 'Out-of-scope items I noticed:' — adjacent issues flagged but not implemented. The engineer confirms or corrects each assumption before the agent writes code. This adds ~5 minutes per task and prevents hours of rework from wrong-direction implementations.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m12-q6",
      type: "hands_on",
      text: "Create an 'SDLC health dashboard' specification for a team that has been using agentic tools for 3 months. List 6 metrics, explain what each measures, what a healthy vs unhealthy reading looks like for each, and which SDLC failure mode each metric is designed to detect.",
      rubric:
        "Strong answer: (1) PR cycle time by PR size — measures time from PR open to merge for small (<200L) vs large (>400L) PRs; healthy: large PRs take proportionally longer; unhealthy: all cycle times increasing or small PRs taking as long as large ones; detects: speed/QA mismatch, review bottleneck; (2) clarification rate — % of agent-generated implementations that require a correction round before they can proceed; healthy: <15%; unhealthy: >30%; detects: requirements debt; (3) rework rate — % of PRs that have a follow-up fix PR within 72 hours; healthy: <10%; unhealthy: >25%; detects: review quality degradation; (4) context collision incidents — number of incidents per sprint where two agent sessions produced incompatible implementations; healthy: 0-1; unhealthy: >2 per sprint; detects: context loss; (5) review load concentration — % of reviews done by top 2 reviewers; healthy: <40%; unhealthy: >60%; detects: review bottleneck; (6) scope drift rate — % of PRs that are >50% larger than estimated at task spec time; healthy: <10%; unhealthy: >25%; detects: scope drift. Weak answer uses standard velocity metrics or doesn't connect metrics to specific failure modes.",
      maxScore: 20,
      placeholder:
        "Specify 6 metrics with what each measures, healthy/unhealthy readings, and which failure mode each detects...",
    },
    {
      id: "m12-q7",
      type: "edge_case",
      text: "Engineers are bypassing a PR size limit by splitting a large feature into multiple small, nominally-unrelated PRs that each individually pass the size check but together represent a large unreviewed scope. What does this behavior reveal, and what is the correct response?",
      options: [
        "The engineers are being unprofessional and should be told that circumventing process controls undermines the team's safety standards",
        "The PR size limit should be increased since it was clearly set too low for the team's actual workflow needs",
        "The gaming behavior is information: it reveals either that the process was miscalibrated (too burdensome) or the enforcement mechanism wasn't smart enough. Fix by measuring related-PR clustering and involve engineers in identifying which steps add value vs feel like overhead without benefit",
        "Remove the PR size limit entirely since it is creating perverse incentives, and rely on code review quality alone to catch scope problems",
      ],
      correctAnswer: "The gaming behavior is information: it reveals either that the process was miscalibrated (too burdensome) or the enforcement mechanism wasn't smart enough. Fix by measuring related-PR clustering and involve engineers in identifying which steps add value vs feel like overhead without benefit",
      rubric: "Correct answer: gaming behavior is diagnostic information, not just misbehavior. Engineers found a technically-compliant workaround — this tells you the enforcement mechanism wasn't smart enough (individual PR size vs related-PR clustering) and/or that the process overhead was miscalibrated. Fix the enforcement by tracking PRs from the same engineer on the same feature filed within 24 hours, not individual PR size. Involve engineers in identifying which steps feel like overhead — the goal was preventing SDLC failures, not adding process.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m12-q8",
      type: "edge_case",
      text: "A client is using agentic development tools and their metrics look excellent: PR cycle time is down 35%, rework rate is low, activation rate is 90%. Then a major production incident occurs. Post-mortem reveals the root cause was agent-generated code that passed all automated checks and human review but contained a subtle race condition that only manifests under high concurrency. The CTO wants to reduce agent use significantly. How do you respond, and what does this incident reveal about the limits of your SDLC health metrics?",
      rubric:
        "Strong answer: validates that the incident is serious and the CTO's concern is legitimate — this is not a 'you're overreacting' moment; the incident reveals a genuine blindspot: the SDLC health metrics were measuring correctness at low concurrency (unit tests, manual review) but not correctness under the emergent conditions of production load; the metrics were good measures of what they measured — they just didn't cover race conditions; this is not a failure of agentic tools specifically — a human engineer could have introduced the same race condition; the question is whether the review process would have caught it, and apparently it didn't; response: (1) don't accept a blanket reduction in agent use as the fix — that doesn't address the root cause; (2) investigate whether this class of bug (concurrency, race conditions, timing-dependent) is something that can be systematically tested — add concurrency testing to the SDLC; (3) add a 'concurrency sensitivity flag' to the scope confirmation protocol for tasks touching shared state; (4) acknowledge to the CTO that the metric set didn't cover this failure mode and propose what would: load testing as part of the CI pipeline for changes touching shared state; (5) reframe the agent use reduction conversation: 'the issue isn't agent use, it's that our test coverage for concurrent behavior was insufficient — that gap would have existed with or without agents.' Strong answers distinguish between 'agent tools caused this' (false) and 'our SDLC didn't catch this class of bug' (true). Weak answer agrees to reduce agent use without addressing the test coverage gap.",
      maxScore: 20,
      placeholder:
        "Respond to the CTO, identify what the metrics missed, and propose the specific SDLC addition that addresses this failure mode...",
    },
  ],
};
