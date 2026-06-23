import type { Module } from "../types";

export const module: Module = {
  id: "m13",
  track: 3,
  trackName: "Client Delivery Skills",
  order: 13,
  title: "Redesigning Workflows",
  description:
    "Process mapping, the agent-first redesign pattern, change management basics, getting buy-in, measuring success, avoiding the 'pilot forever' trap.",
  estimatedMinutes: 90,
  content: `
# Redesigning Workflows

Deploying an agentic tool into an existing workflow is rarely the right approach. Existing workflows were designed around the constraints of human-speed execution. When those constraints change — when certain tasks become 10x faster — the optimal workflow structure changes too. This module covers how to map current-state workflows with enough precision to redesign them intelligently, how to get engineering teams to embrace the new design, and how to know when a redesign is complete versus when it's drifting into a permanent pilot.

---

## Current-State Mapping: Seeing What's Actually There

You cannot redesign a workflow you haven't accurately mapped. The current-state map is not what's on the team's Confluence page, not the official process document, and not the description the engineering manager gives you. It's what engineers actually do, step by step, hour by hour, in order to ship software.

**Swim-lane mapping:**

A swim-lane map shows each actor in the process as a horizontal lane and each step as a box that passes between lanes. For an engineering workflow, the lanes typically include: engineer, reviewer, QA, product manager, and the automated systems (CI/CD, monitoring).

To build it, follow a single work item — a ticket — from the moment it's created to the moment it's in production. Ask the engineer who last shipped a feature to walk you through every step. Map literally:

1. Engineer picks up ticket from backlog
2. Engineer reads ticket, identifies it's unclear, sends Slack message to PM
3. PM responds 4 hours later with clarification
4. Engineer creates branch, starts implementing
5. Engineer gets stuck on authentication logic, asks senior engineer (who is in a meeting)
6. Senior engineer replies next morning
7. ...

The waits, the blockers, the handoffs, the clarification loops — these are what makes the swim-lane useful. The official process doesn't show you step 2, 3, 5, or 6. Those are where the time goes.

**Friction points:**

As you map, mark every step where:
- Work stops because it's waiting on another actor (a handoff wait)
- Information gets lost between systems (a context gap)
- A human has to translate between two formats or systems manually (a translation step)
- A person has to learn something they didn't know before they could proceed (a knowledge acquisition step)
- The same work gets done twice because there was no single source of truth (a duplication step)

These friction points are the candidates for agentic intervention.

**Time accounting:**

For each step, estimate the time spent. Be specific: "writing the code" is not enough. Break it down: "reading requirements: 20 min, reading relevant existing code: 45 min, writing the implementation: 2 hours, writing tests: 1 hour." This time accounting reveals where the cognitive work actually lives and where agentic tools would have the most leverage.

---

## Future-State Design Principles for Agentic Workflows

Once you have the current-state map, the future-state design is not about inserting agents into the existing steps. It's about rethinking which steps need to exist.

**Principle 1: Collapse translation steps first**

The steps with the highest agentic ROI are translation steps — where a human is manually moving information from one format or system to another. A ticket description being summarized into a PR description. A test output being formatted into a status update. A specification being converted into a test plan. These steps have no cognitive value — they are formatting work — and agents handle them perfectly.

**Principle 2: Front-load context, don't fetch it mid-task**

In human workflows, context is often fetched mid-task because it's time-consuming to gather upfront. Agents make upfront context gathering cheap. Future-state workflows should front-load all context at the beginning of a task (read all relevant files, pull the Jira ticket, get the PR history) so the agent has everything before it starts, rather than making multiple round-trips to gather context during execution.

**Principle 3: Separate agent tasks from human judgment tasks**

The future-state workflow should have clear boundaries between what the agent does and what the human does. The agent should not make judgment calls, and the human should not do mechanical work. Design explicit handoff points: "Agent completes X, human reviews and decides Y, agent continues with Z."

**Principle 4: Move quality checks left**

In many workflows, quality checking happens at the end (QA phase, final review, staging environment testing). In agent-assisted workflows, quality checks should happen at every handoff. Each time the agent produces output and hands it to a human, that human makes a judgment call. This is a micro-review. The big QA step at the end becomes easier because the small checks have already caught most issues.

**Principle 5: Design for the exception, not the average**

Agentic workflows often work well for the common case and fail at the exception. Design the future-state workflow to handle edge cases explicitly. What happens when the agent produces output that the human reviewer disagrees with? What happens when the task turns out to be more complex than anticipated? What's the escalation path? These exception paths need to be designed, not improvised.

---

## The Agent-First Mental Model

The agent-first mental model is a design principle: when designing future-state workflows, start by asking "what would this workflow look like if agents did everything they could?" and then add back the human judgment points that are genuinely necessary.

This is the opposite of the default approach, which is: "here's our existing workflow — where can we add an agent?"

The default approach produces incremental improvement. The agent-first approach produces structural redesign.

**How to apply it:**

Take each step in the current-state map and ask: "Could an agent do this step completely, with a human only reviewing the output?" If yes — redesign that step to be agent-driven. If no — what specifically about this step requires a human? Is it judgment? Accountability? Access to context the agent doesn't have? Those specific requirements define the human's role in the future-state.

**What the agent-first mental model surfaces:**

Often, applying the agent-first mental model to a workflow reveals that several adjacent steps can be collapsed. Three manual steps that were each too small to automate individually can be combined into a single agent task with one human review at the end. The agent does all three steps end-to-end and the human reviews the final output once.

---

## Change Management for Engineers (Different from Non-Technical Stakeholders)

Change management for software engineers is fundamentally different from change management for non-technical staff. Engineers are trained to be skeptical of new things — skepticism is a professional virtue in software development. Telling engineers "this is better" triggers their analytical instincts rather than their compliance instincts. They will probe the claim, find the limitations, and use those limitations to justify not changing.

**What doesn't work with engineers:**

- Mandate without explanation: "You will use this tool starting Monday." This produces passive non-compliance and active resistance.
- ROI presentations: "This will save you 2 hours a week." Engineers immediately start calculating how they'd use those 2 hours, realize it's not that simple, and discount the claim.
- Comparisons to previous AI hype: invoking "AI" as a category triggers the pattern-matching response in engineers who lived through previous AI hype cycles.

**What does work:**

- Evidence over assertion: show them data from a real use in their own codebase, not a demo environment. The claim "this works" is far less credible than "here's the PR where this was used and here's how long it took."
- Opt-in with structure: rather than mandating adoption, structure a voluntary experiment with clear success criteria. Engineers respond to well-designed experiments. "For the next two sprints, you can choose to use this tool on any task you'd normally do manually. At the end, we'll look at cycle time data and decide together whether to continue."
- Peer endorsement: an enthusiastic colleague's account is worth ten times an SE's pitch. Once you have a champion who has had a real positive experience, let them carry the story.
- Acknowledge limitations explicitly: "Here's where this tool is going to fail. Here's what you'll need to do when it does." Engineers trust people who tell them the downsides. If you only present the upsides, they'll find the downsides themselves and use them to dismiss the whole thing.

---

## The Stakeholder Buy-In Sequence

Getting organizational support for a workflow redesign follows a sequence. Skip a step and the later steps don't hold.

**Step 1: Technical credibility with ICs**

You need the engineers who will actually use the tool to believe it works before anyone else matters. This happens in pairing sessions and through the champion relationship. If ICs aren't convinced, no amount of executive sponsorship will produce adoption.

**Step 2: Engineering manager alignment**

With IC evidence in hand, bring the engineering manager the numbers: what happened to cycle time in the sessions where the tool was used? What did the engineers say? The manager needs to see that this is a real improvement, not just enthusiasm, and that it won't create new problems (the SDLC failure mode conversation happens here).

**Step 3: Technical leadership (CTO/VP Eng) sponsorship**

This is about organizational resources: protected time for adoption, permission to change the SDLC, budget for tooling. Technical leadership buys in on two things: the evidence from step 2, and the risk mitigation story — that you've thought about what could go wrong and have designed against it.

**Step 4: Structural support**

Buy-in without structural support evaporates. Structural support means: adoption is on the sprint plan (not an "in addition to your real work" expectation), the new process is documented and enforced by tooling (not just by convention), and there is a named owner who is responsible for the adoption's success.

The sequence matters: getting executive sponsorship before IC evidence means the mandate hits engineers who aren't convinced, producing resistance. Getting IC evidence without executive sponsorship means the adoption quietly dies when engineers return to deadline pressure.

---

## What Metrics Matter at 30/60/90 Days

**30 days — activation metrics**

Are engineers using the tool at all? Usage logs, session counts, the percentage of the team who has completed at least one substantive task with the tool. This is the "is the tool actually installed and used?" check.

At 30 days you're looking for activation, not impact. Don't expect measurable productivity gains yet — engineers are still on the learning curve.

**60 days — behavior change metrics**

Are engineers using the tool for the right things? What types of tasks are they using it for? Are they using it for the high-value tasks the SDLC redesign targeted, or for trivial tasks that don't leverage its capabilities?

At 60 days, look at: session length (too short means it's not being used for substantive work), task type distribution, clarification rate (are specifications getting better?), and early cycle time signals.

**90 days — outcome metrics**

Now you can look at outcomes: PR cycle time compared to the 90-day pre-intervention baseline, rework rate, incident rate attributed to agent-generated code, and engineering satisfaction. The 90-day period is when you have enough data to make a credible attribution claim.

**What not to measure:** Lines of code produced, story points per sprint, "velocity." These are not proxies for quality or cycle time. An increase in lines of code produced can be a sign of scope drift, not productivity.

---

## The Pilot-Forever Trap

The pilot forever trap is one of the most common failure modes in technology adoption programs. It looks like this:

- A pilot is launched with a small group of early adopters
- The pilot produces positive results
- There's no clear plan for what happens when the pilot succeeds
- The organization is in another sprint cycle, or there's another priority, or there's no budget for the rollout
- The pilot continues indefinitely
- The early adopters gradually lose enthusiasm as nothing changes
- The tool quietly dies with a reputation as "that thing we tried that never went anywhere"

**Why it happens:** The pilot was designed to answer "does this work?" but no one answered "and then what?" before the pilot started. The success criteria for the pilot didn't include what happens next.

**How to avoid it:**

Before the pilot starts, define:
1. The specific criteria that constitute pilot success (not "we'll know it when we see it")
2. The date by which the pilot will conclude and a decision will be made
3. What happens on success (specific rollout steps, timeline, resources required)
4. What happens on failure (the pilot stops, the team reverts, the learnings are documented)
5. Who has the authority to make the go/no-go decision and has already committed to making it

The pilot is a time-limited experiment with a defined decision point, not an open-ended exploration.

---

## Definition of 'Done' for a Workflow Redesign

A workflow redesign engagement is complete when:

1. **The new workflow is documented** — not the theoretical future-state map, but the actual workflow as it's being practiced. There is a process document that reflects what the team is actually doing.

2. **The workflow is enforced by tooling, not convention** — PR size limits run in CI, task spec gates run in the ticket system, automated pre-review is in the pipeline. Anything enforced by convention degrades when the SE leaves.

3. **The metrics are owned** — someone on the team is looking at the health dashboard metrics every sprint and knows what to do when they go red.

4. **The team can add to it** — engineers can propose changes to the workflow, evaluate them against the success criteria, and implement them without SE involvement. The team is self-directing the ongoing evolution.

5. **The exception paths are documented and tested** — someone has deliberately triggered the failure modes (agent produces wrong output, scope drift occurs, context loss happens) and the team has practiced the recovery procedures.

---

## When to Declare the Engagement Complete

The SE's engagement is complete — not the team's adoption journey, but the external engagement — when all five 'done' criteria are met and the team has successfully operated the new workflow for at least one full sprint without SE involvement.

The SE should resist the pull to stay involved indefinitely. Every sprint you're still there is a sprint the team hasn't fully owned the process. The exit criteria should be clear at the start of the engagement, not negotiated at the end.

Exit with a documented handoff: what was changed, what the metrics baselines are, what to watch for, who to call if something goes wrong, and what the team should consider doing next (if anything).

---

## Key Takeaways

1. Map the real workflow — the swim-lane with waits, blockers, and handoffs — not the official process document. The official process doesn't show you where the time goes.
2. The agent-first redesign principle: start with "agents do everything possible" and add back human judgment where genuinely required, rather than inserting agents into the existing structure.
3. Change management for engineers requires evidence over assertion, opt-in experiments with clear success criteria, peer endorsement, and explicit acknowledgment of limitations.
4. The buy-in sequence matters: IC credibility → EM alignment → technical leadership sponsorship → structural support. Skipping steps breaks the sequence.
5. At 30/60/90 days, measure activation, then behavior change, then outcomes. Don't try to measure outcomes at 30 days.
6. The pilot-forever trap kills more adoptions than technical failures do. Define the decision point and the decision criteria before the pilot starts.
7. Done means: documented, enforced by tooling, metrics owned internally, team can self-direct evolution.
`,
  questions: [
    {
      id: "m13-q1",
      type: "conceptual",
      text: "Explain the difference between inserting an agent into an existing workflow versus the agent-first redesign approach. Why does the default incremental approach systematically underdeliver, and what does the agent-first approach reveal that the incremental approach misses?",
      rubric:
        "Strong answer: incremental insertion: takes existing workflow as given, finds steps where an agent can assist — produces marginal improvements because the workflow structure was designed for human-speed constraints that no longer apply; agent-first redesign: starts with 'what if agents did everything they could?' and works backward to where human judgment is genuinely necessary — produces structural changes, collapses steps that were only separate because humans needed time to complete each one; what incremental misses: (1) adjacent steps that could be collapsed into a single agent task, (2) translation steps between steps that were necessary for human handoffs but are unnecessary for agent-to-human handoffs, (3) the opportunity to move quality checks left rather than keeping them at the end; what agent-first reveals: the distinction between steps that require human judgment and steps that are mechanical work dressed up as knowledge work; strong answers give a concrete example — e.g., a three-step ticket-to-PR-description process that was three separate human steps can become one agent task with one human review. Weak answer describes both approaches without explaining the mechanism of why one underdelivers.",
      maxScore: 15,
      placeholder:
        "Contrast the two approaches, explain the mechanism of underdelivery in the incremental case, and give a concrete example of what agent-first reveals...",
    },
    {
      id: "m13-q2",
      type: "conceptual",
      text: "Why is change management for software engineers structurally different from change management for non-technical employees? Identify three techniques that work with engineers and explain the mechanism behind each.",
      rubric:
        "Strong answer: engineers are trained to be skeptical — skepticism is a professional virtue; mandate + explanation is insufficient because they'll analytically probe the explanation; ROI presentations fail because engineers immediately model the second-order effects and discount the claim; comparisons to AI hype trigger pattern-matching from previous hype cycles; three techniques that work: (1) evidence over assertion — showing a PR that was produced with the tool in their own codebase is more credible than a benchmark because engineers trust empirical evidence in context, not out of context; (2) opt-in experiments with defined success criteria — engineers respond to well-designed experiments; framing adoption as an experiment with measurable outcomes converts the adoption question into an analytical question they know how to approach; (3) explicit acknowledgment of limitations — engineers trust people who tell them the downsides; if you present only upsides they'll find the downsides themselves and use them to dismiss the whole thing; acknowledging limitations disarms the 'but what about X?' objection by showing you've already thought about it. Weak answer lists the three techniques without explaining the mechanism (why they work with engineers specifically).",
      maxScore: 15,
      placeholder:
        "Explain the structural difference and the mechanism behind each of the three techniques that work...",
    },
    {
      id: "m13-q3",
      type: "applied",
      text: "You've completed a successful 30-day pilot with 4 engineers on a team of 20. Cycle time in the pilot group improved by 30%. The engineering manager wants to roll out to the full team. The CTO wants to see the plan before approving. Write the pitch to the CTO: what does it cover, in what order, and how long does it take?",
      rubric:
        "Strong answer: structure (15 minutes total): (1) the finding (2 min) — state the result and the evidence clearly: 'Our 4-engineer pilot produced a 30% reduction in PR cycle time over 30 days. Here's what we measured and how.' Show the specific metrics, acknowledge what you can and can't attribute to the tool vs other factors. (2) the mechanism (3 min) — explain why it worked: what specific SDLC changes were made, where in the workflow the improvement was captured. This gives the CTO the ability to reason about whether the improvement will generalize. (3) the rollout plan (5 min) — specific steps, timeline, who's responsible, resource requirements (protected time? additional tooling licenses?), rollout sequence (which team next, what order); (4) the risk register (3 min) — what could go wrong in the rollout and the mitigation for each risk; the SDLC failure modes conversation belongs here; (5) the decision request (2 min) — specific ask: approval to proceed with team B starting [date], budget of [X], and executive messaging to the team that this is supported; pitch avoids: 'AI will revolutionize development,' velocity metrics, jargon; pitch includes: specific numbers, honest limitations, clear ask. Weak answer is generic or leads with the technology rather than the evidence.",
      maxScore: 20,
      placeholder:
        "Write the pitch structure with timings, content of each section, and the specific ask at the end...",
    },
    {
      id: "m13-q4",
      type: "applied",
      text: "A workflow redesign engagement you delivered 4 months ago is quietly reverting. The engineers you worked with have gradually drifted back to their old patterns. The new process is technically still in place (the tooling is there), but adoption has dropped from 85% to 40%. You've been asked to come back and diagnose what happened. What are the likely causes, how do you investigate, and what do you do differently this time to prevent the same outcome?",
      rubric:
        "Strong answer: likely causes (name at least 3): (1) structural support wasn't real — adoption was in sprint plans initially but when sprint pressure increased it was the first thing dropped; (2) the champion left or changed teams — the internal advocate who drove adoption is no longer in that position; (3) the SDLC enforcement was by convention not tooling — when nobody was watching, people stopped following it; (4) the new workflow hit a real friction point that wasn't addressed — engineers found something genuinely painful about the new process and chose the old one instead; (5) no one owned the metrics — the health dashboard was built but nobody was looking at it, so the reversion happened invisibly; investigation: talk to the engineers who reverted, not the manager — ask specifically what made them stop; look at the metrics history to pinpoint when the reversion started (immediately after the engagement ended? after a personnel change?); do differently: (1) ensure tooling enforcement, not convention, for every process change; (2) identify and develop a backup champion before leaving; (3) assign internal ownership of the metrics with explicit accountability; (4) build a 60-day check-in into the engagement closure — not to keep working, but to verify the adoption is holding. Weak answer says 'more training' or 'better documentation.'",
      maxScore: 20,
      placeholder:
        "Diagnose at least 3 likely causes, describe your investigation approach, and specify what you'd do differently to prevent reversion...",
    },
    {
      id: "m13-q5",
      type: "hands_on",
      text: "Map the current-state workflow for a typical feature ticket at a mid-sized engineering team. The team has: Jira for tickets, GitHub for code, Slack for communication, a Jenkins CI pipeline, and a separate QA team. A feature ticket typically takes 8-10 days from start to merge. Produce a swim-lane map (in text format) that captures the actual workflow, marks the friction points, and estimates time at each step. Then design the future-state workflow using agent-first principles.",
      rubric:
        "Strong answer current-state swim-lane includes: engineer lane: pick up ticket (15 min), read ticket, identify ambiguity, message PM in Slack (30 min); PM lane: read message, respond (4 hrs wait); engineer: read clarification, check understanding of codebase by reading related files (45 min), create branch and implement (2-4 hrs), write tests (1 hr), create PR with description (30 min); review: PR sits in queue (4-12 hr wait); reviewer: review PR, leave comments (1 hr); engineer: read comments, address them (1-2 hrs); reviewer: re-review (30 min); QA: pick up approved PR, test in staging (2-3 day wait including queue); QA: manual regression (2 hrs); CI: run pipeline (45 min); friction points marked: clarification wait (4 hrs), review queue (4-12 hrs), QA queue (2 days); future-state: agent reads ticket and generates clarification questions upfront (5 min, human reviews), agent reads relevant codebase sections and generates implementation plan (15 min, human confirms), agent implements + writes tests (time varies, human reviews output), agent generates PR description from diff (5 min), automated pre-review runs before human reviewer sees it (30 min, automated), human reviewer reviews summary + flagged items only (30 min), agent generates QA test plan from acceptance criteria (10 min, QA uses as checklist). Total future-state cycle time estimate: 3-4 days. Weak answer describes the workflow in prose rather than mapping it with actors and handoffs.",
      maxScore: 20,
      placeholder:
        "Produce the swim-lane map in text format with friction points and time estimates, then design the future-state workflow with the changes explained...",
    },
    {
      id: "m13-q6",
      type: "hands_on",
      text: "Design the 'pilot definition document' for a 6-week workflow redesign pilot at an engineering team. Include: the specific hypothesis being tested, the success criteria (with specific thresholds), the metrics being tracked and how, the pilot group composition (who is included and why), what happens at day 42 (the decision point), and the rollout plan for the success case and the shutdown plan for the failure case.",
      rubric:
        "Strong answer: hypothesis — must be specific and falsifiable: 'Implementing agent-assisted PR review pre-screening and task specification gates will reduce PR cycle time by at least 20% and maintain or improve rework rate in a 6-week window'; success criteria — specific thresholds not vague aspirations: (1) PR cycle time decreases ≥20% compared to 6-week pre-pilot baseline for the pilot group; (2) rework rate (follow-up fix PRs within 72 hours) does not increase; (3) ≥80% of pilot engineers use the new process for ≥70% of their tasks by week 4; metrics and tracking: cycle time via GitHub Analytics, rework rate via PR labeling in GitHub, usage rate via session logs; pilot group: 4-6 engineers representing range of seniority (not just enthusiasts — must include at least one skeptic), the same team (cross-team pilots have confounding variables), engineers whose work is representative of the full team's workflow; day 42: review meeting with engineering manager and one technical stakeholder; specific agenda: metric review, qualitative feedback from pilot group, go/no-go vote by defined decision maker; success rollout: team B starts week 7 with 2-week onboarding, full team by week 12, timeline with owner; failure shutdown: pilot ends, team reverts to previous workflow, retrospective document published internally with learnings, timeline for reconsideration (6 months). Weak answer is vague about success criteria or doesn't include the shutdown plan.",
      maxScore: 20,
      placeholder:
        "Write the complete pilot definition document with all six sections specified...",
    },
    {
      id: "m13-q7",
      type: "edge_case",
      text: "You're two months into a workflow redesign engagement. The redesign is technically working — cycle time is down 25%, engineers are using the tools — but the engineering manager is now saying 'the agents are doing all the interesting work and my engineers are just doing review.' Two engineers have come to you privately saying they feel less engaged and are thinking about leaving. How do you handle this?",
      rubric:
        "Strong answer: recognizes this as a real problem, not just a change management concern; the engineers' concern is legitimate — if the workflow redesign has made their work feel mechanical, that's a design failure, not an adoption failure; the right response is not to revert the efficiency gains or tell engineers to feel better about review; investigation: what specifically feels mechanical? Is it that review tasks are too routine? That they're not doing any design or architecture work? That the types of problems they're solving have changed in a way that reduces professional challenge?; response options: (1) redesign the human-in-the-loop points to focus on higher-judgment tasks — if review is routine, the reviews should surface more interesting decisions; (2) explicitly create space for engineering initiative — if agents handle the mechanical implementation, engineers should be doing more architecture, design, and technical strategy; (3) use the efficiency gain to tackle more ambitious problems — if the team can ship 25% faster, what would they tackle that they previously didn't have capacity for?; the manager is partly right: if engineers are only doing review, the workflow has been over-automated and the human judgment role needs to be re-elevated; strong answers note that this is a design issue (wrong balance of agent vs human) not a motivation management issue. Weak answer dismisses the concern or says the engineers need to adapt.",
      maxScore: 20,
      placeholder:
        "Diagnose what's actually wrong with the workflow design, describe your response to the engineers and manager, and redesign the human role...",
    },
    {
      id: "m13-q8",
      type: "edge_case",
      text: "You've completed a workflow redesign engagement and declared it done — the process is documented, enforced by tooling, metrics are owned internally, and the team operated independently for one full sprint. Six months later, the client calls and says: 'The workflow is falling apart — half the tooling is broken since a platform migration, and the team can't remember how to set it up.' Is this an engagement failure, and what obligation (if any) do you have to help?",
      rubric:
        "Strong answer: evaluates whether this constitutes an engagement failure honestly; the engagement met its done criteria at the time — documented, tooling-enforced, metrics-owned, independent operation for one sprint; a platform migration that breaks the tooling is a change in conditions that the engagement couldn't have anticipated or prevented; however: (1) the handoff document should have included how to reconfigure or troubleshoot the tooling; if it didn't, that's a gap in the handoff artifact; (2) the team's inability to remember how to set it up suggests the 'team can self-direct evolution' criterion may not have been fully met — if they can't operate the tooling without SE support, they may have been operating it from memory, not genuine capability; professional obligation: there is no contractual obligation to return for free; there is a professional and relationship obligation to help them understand what happened and give them a path forward; in practice: offer a paid re-engagement (the platform migration broke a working system and restoring it is new work, not a defect in the original work); also offer a free post-mortem call to identify what the handoff document should have included that it didn't — this is practice contribution, not client service; strong answers distinguish between: engagement failure (the solution was wrong) vs platform change (external event that broke a working solution) vs documentation gap (the solution wasn't documented well enough to survive without the SE). Weak answer either accepts full responsibility or dismisses the client.",
      maxScore: 20,
      placeholder:
        "Evaluate whether this is an engagement failure, determine what obligation you have, and describe what you do in response...",
    },
  ],
};
