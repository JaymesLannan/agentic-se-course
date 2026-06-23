import type { Module } from "../types";

export const module: Module = {
  id: "m16",
  track: 4,
  trackName: "Upskilling & Practice Building",
  order: 16,
  title: "Pattern Recognition & Playbook Building",
  description:
    "What a repeatable pattern looks like, extracting it from a single engagement, playbook structure, writing it so someone else can run it.",
  estimatedMinutes: 90,
  content: `
# Pattern Recognition & Playbook Building

Every engagement contains knowledge that could help the next engagement. But that knowledge, left in an SE's head, dies with the engagement. Pattern recognition is the skill of seeing the underlying structure in a specific situation — the general problem that this specific situation is an instance of. Playbook building is the craft of capturing that structure precisely enough that someone else can use it without losing anything essential.

This module covers how to distinguish patterns from one-offs, how to extract a pattern during an active engagement, and how to write a playbook entry that is actually useful — not a generic heuristic dressed up in a template.

---

## The Difference Between a Pattern and a One-Off

A pattern is a recurring structure. It appears in multiple contexts, it has predictable inputs and outputs, and it can be described in enough generality that someone who hasn't seen your specific engagement can recognize when they're in the same situation.

A one-off is a solution to a specific problem in a specific context. It's valuable to the people who experienced it, and it may be interesting to others as a story. But it can't be applied without the original context, and trying to apply it in a different context will produce unreliable results.

**The three criteria for a repeatable pattern:**

**1. It appears in multiple contexts**
If you've seen the same problem — structurally, not superficially — in at least two different engagements with different clients, it's probably a pattern. If you've only seen it once, you might be pattern-matching (finding a pattern where there isn't one). The two-instance rule is a useful heuristic: don't write a playbook entry for something you've seen once.

**2. It has predictable inputs and outputs**
A pattern can be characterized by: here are the conditions that create this situation (inputs), and here's what successful application of the pattern produces (outputs). If you can't specify the inputs clearly enough for someone else to recognize when they're in the situation, or the outputs clearly enough for them to know when they've succeeded, the pattern isn't ready for documentation.

**3. It can be documented and transferred**
Some knowledge is genuinely tacit — it requires direct experience to acquire. If a pattern requires 5 years of SE experience to execute and you can't make that explicit, it's not a playbook pattern yet. It might become one with more work on the explication, but at the stage where it can only be executed by someone who already has it, it lives in a person, not a playbook.

---

## How a Pattern Feels Different from a One-Off (In the Moment)

During an engagement, you'll encounter situations that feel familiar even though the client is new and the tech stack is different. That feeling of familiarity is the signal that you're in a pattern, not a one-off.

But the feeling of familiarity can also be pattern-matching bias — you're projecting a familiar structure onto a situation that's actually different. The discipline is to hold the pattern hypothesis loosely until you've validated it against the specifics.

**Questions that help distinguish:**

- "Have I been in a situation where the underlying dynamic was the same, even if the surface looked different?"
- "If I applied the approach that worked last time, what would I expect to be different here? Can I explain why?"
- "What would make this situation a genuine exception to the pattern?"

If you can answer these questions clearly, you've validated the pattern hypothesis. If you're reaching to make the pattern fit, you're probably in a one-off.

---

## How to Extract a Pattern During an Engagement

The best time to extract a pattern is during the engagement, not after. After the engagement, the specific details that gave you the pattern hypothesis fade. The pattern becomes generic in your memory, and the playbook entry you write from memory will be generic too.

**During-engagement extraction practice:**

**Weekly pattern log:** At the end of each week of an engagement, spend 20 minutes writing free-form notes on: "What did I encounter this week that I've seen before? What did I encounter that was new? What worked? What didn't?" This is not a polished playbook entry — it's raw material.

**Friction flag:** When you do something during the engagement and think "I knew to do that because of [previous engagement]" — that's a pattern. Write it down immediately. The specifics of the triggering moment are the most valuable part.

**Surprise flag:** When something doesn't go as expected — when the approach that worked last time doesn't work here — that's also a pattern (a boundary condition). Write down: what was different about this situation that made the approach fail? That difference is the input condition that distinguishes the pattern from its exceptions.

**The extraction question to ask yourself:** "If I had to explain to a new SE why I did what I did just now, what would I say? What would they need to know to make the same decision?" The answer to that question is the pattern.

---

## The Playbook Entry Format

A playbook entry has five components. All five are required. An entry missing any one of them is incomplete and will be used incorrectly or not at all.

**1. Problem statement**
What is the situation this entry addresses? Written as a recognition guide — when you're reading this, you should know immediately whether it applies to your current situation. Not: "Code review is slow." Instead: "The team's PR cycle time is increasing despite adding agent-assisted development, with the review queue backing up. Human reviewers report feeling overwhelmed. This pattern applies when the increase in code throughput from agents has not been matched by an increase in review capacity."

**2. Context conditions**
The specific conditions under which this pattern applies. These are the input conditions. They're what distinguish this situation from superficially similar ones where a different approach is needed. Include: organizational conditions (team size, engineering maturity, management support level), technical conditions (what's in the stack, what's already in place), and historical conditions (what has already been tried).

**3. Approach**
The specific actions, in order, that address the situation. Not "improve the review process" but: "(1) Run the cycle time analysis from PR creation to merge for the last 60 days, broken down by PR size. (2) Map the reviewers and their load (PRs reviewed per person per week). (3) Present the data to the engineering manager before proposing a solution — let the data make the case. (4) Implement automated pre-screening in this order: linting first (zero config overhead), then test runner, then AI-assisted review summary. Each step should take no more than one sprint to implement. (5) Re-measure cycle time after each step to attribute the improvement."

The approach section should be detailed enough that an SE who hasn't run this pattern before could follow it without getting stuck on the obvious next move. Not a script, but a structured walk.

**4. Gotchas**
What doesn't work. Where the approach fails. What edge cases produce unexpected outcomes. What the pattern looks like when it's not the right pattern. This is the section most likely to be thin in playbook entries written by people who are proud of their pattern — it requires intellectual honesty about the limitations.

Examples of gotcha entries: "This approach fails when the review bottleneck is caused by a single gatekeeping individual with organizational authority to block changes rather than by review capacity. In that case, the bottleneck is political, not procedural, and automated pre-screening doesn't address it." "This approach assumes the team's CI pipeline is already passing reliably. If CI is flaky, adding more automated checks amplifies the flakiness and reduces trust in the whole pipeline."

**5. Success metrics**
How do you know the approach worked? Specific, observable, measurable outcomes that you can check against. Not "engineers are happier with the review process" but: "PR cycle time for small PRs (<200 lines) returns to or below the pre-agent baseline. Reviewer load is more evenly distributed (no single reviewer handling >40% of reviews). Rework rate (follow-up fix PRs within 72 hours) does not increase."

---

## What Makes a Playbook Entry Useful vs Generic

Generic entries are common, useful entries are rare. The difference is specificity.

**Generic entry (useless):**
"When engineers are resistant to adopting new tools, understand their concerns and address them directly. Show the value of the tool through demonstrations and involve them in the adoption process."

This entry is not wrong. It's useless because anyone reading it already knows this. It says nothing that couldn't be derived from common sense. It will not help an SE who is stuck in a specific resistance situation.

**Useful entry (specific):**
"When a senior engineer explicitly says 'this is just autocomplete' in a pairing session, this is a specific resistance pattern, not a general objection. The engineer has mapped what they're seeing to their prior experience with Copilot or similar tools. They've concluded that agentic behavior is a category error because autocomplete is token-level prediction. The specific move that breaks this mental model: set a task that explicitly requires reading multiple files and synthesizing across them (e.g., 'find all the places this interface is implemented and tell me which ones don't match the current interface definition'). Run it while narrating what's happening ('it's reading the directory, now it's opening each file...'). The visual experience of the tool navigating a codebase autonomously is what changes the mental model. Do not argue about what the technology does — create the experience that contradicts the model."

This entry is specific, actionable, and provides the counter-intuitive move that an SE wouldn't derive from first principles. It's worth having in a playbook.

---

## Common Patterns in Agentic SE Work

**The QA Bottleneck Pattern**

*Problem:* Agent-assisted development has increased throughput, and the QA process — which wasn't scaled for the new output rate — has become the critical path. PRs are backing up, quality is degrading under review pressure, and the team has lost the productivity gains of agents to downstream bottlenecks.

*Context:* Applies when: (1) agent adoption has been in place for 4+ weeks, (2) PR cycle time has increased since adoption, (3) the organization has a separate QA function or a concentrated review group.

*Approach:* Automated pre-screening implementation (linting → tests → AI review summary); review distribution mapping; PR size discipline; graduated trust model.

*Gotchas:* Fails when the bottleneck is political (a senior engineer who believes all PRs must go through them). Fails when the CI pipeline is unreliable (automated pre-screening amplifies unreliability). Fails when management wants to maintain the current review structure for compliance reasons.

---

**The Discovery Resistance Pattern**

*Problem:* Engineers in discovery interviews are describing their workflow as working fine, giving surface-level answers, and deflecting deeper questions. You're not getting the friction data you need to identify agent opportunities.

*Context:* Applies when: (1) the interviews are happening in a context where engineers may feel evaluated (their manager is nearby, or they know the outcome affects headcount/tool decisions), (2) the engineers are senior and have high status investment in the current workflow, (3) the company has had previous consulting engagements that went nowhere.

*Approach:* Establish non-evaluation frame explicitly; use cross-company comparison questions ('how did this work at your previous company?'); use hypothetical elimination ('if you could change one step...'); look for workarounds described enthusiastically (they're the real friction); ask about the specific task they did last week, not their workflow in general; find the one engineer who has an obvious gripe and interview them first.

*Gotchas:* This pattern assumes the problem is in the interview technique. Sometimes the genuine answer is "things work fine here" — they've had a stable, well-functioning team for years and the friction is genuinely low. In that case, the opportunity is different (building on success rather than fixing friction).

---

**The Context Collapse Pattern**

*Problem:* Multiple engineers are running agentic development sessions independently, and the codebase is accumulating architectural inconsistencies: duplicate implementations of the same concept, naming convention drift, incompatible assumptions baked into different areas of the code.

*Context:* Applies when: (1) a team has been using agents for 6+ weeks, (2) there are 5+ engineers running sessions, (3) there is no shared context mechanism (no CLAUDE.md, no active ADR process), (4) the inconsistencies are emerging at integration time (when branches are merged).

*Approach:* (1) Immediate: conduct a codebase audit to identify the specific inconsistencies and their origin; (2) retroactive: resolve the inconsistencies before they compound; (3) structural: implement a CLAUDE.md that captures the architectural decisions that led to the inconsistencies; (4) process: add pre-session context review to the workflow; (5) ongoing: assign CLAUDE.md maintenance ownership.

*Gotchas:* If the inconsistencies have been in the codebase for a long time (before agents), the pattern is different — agents are not the cause, they're an accelerator of a pre-existing problem. The fix is different in this case.

---

## How Patterns Evolve Over Time

A pattern written after three engagements is not the same pattern after ten. As more engagements provide more data, patterns get refined: the context conditions become more precise, the approach gets more specific steps, the gotchas become richer. Some patterns split when enough data reveals that what seemed like one situation is actually two with different inputs and different approaches.

**Version your patterns.** Note when the pattern was last updated and what changed. A pattern that hasn't been updated in 18 months in a rapidly evolving domain is probably stale.

**Sunset patterns explicitly.** When the conditions that produce the pattern stop existing — because the tooling has changed, because the market has matured, because the common failure mode has been addressed at the platform level — retire the pattern with a note about why. A playbook full of obsolete patterns is actively harmful: it provides false confidence to SEs who apply stale approaches to current situations.

---

## When to Archive a Pattern

Archive a pattern (move it from active to retired) when:

1. **The context conditions no longer occur.** The pattern addressed a problem that existed in a tool or workflow that no longer exists.

2. **A better pattern supersedes it.** A more specific, more actionable pattern has been developed that covers the same situation more reliably. The old pattern is now redundant.

3. **The approach is consistently failing.** If the pattern's approach is being applied correctly but not producing the expected success metrics in 3+ recent engagements, the pattern is wrong or the context has changed in a way that invalidates it.

4. **The success criteria are no longer relevant.** What "success" looks like has changed, and the pattern's success metrics measure the old definition.

Archiving is not deletion — the historical record is valuable for understanding how the practice has evolved. But active playbooks should only contain patterns that an SE can apply with confidence today.

---

## Key Takeaways

1. A pattern is not a one-off story made general. It meets three criteria: appears in multiple contexts, has predictable inputs/outputs, and can be documented and transferred.
2. Extract patterns during the engagement, not after. The weekly pattern log and friction/surprise flags are the tools.
3. The five-component playbook entry format: problem statement (recognition guide), context conditions (input conditions), approach (specific ordered steps), gotchas (where it fails), success metrics.
4. The difference between a useful and generic entry is specificity. Generic entries derive from common sense. Useful entries capture the counter-intuitive move or the specific condition that differentiates this situation from similar ones.
5. Patterns evolve — version them, update them as more data arrives, and retire them explicitly when their context no longer applies.
`,
  questions: [
    {
      id: "m16-q1",
      type: "conceptual",
      text: "Define the three criteria that distinguish a repeatable pattern from a one-off solution. Then explain why having only two of the three criteria produces a pattern that is dangerous to put in a playbook.",
      rubric:
        "Strong answer: three criteria: (1) appears in multiple contexts; (2) has predictable inputs and outputs; (3) can be documented and transferred; why each pair without the third is dangerous: appears in multiple contexts + predictable inputs/outputs but cannot be documented — produces pattern that lives in an expert's head and can't be used by anyone else, or if it is documented it's too tacit to be useful; appears in multiple contexts + can be documented but unpredictable inputs/outputs — you can recognize the situation but you can't tell when the approach is appropriate or when it has worked, making it impossible to apply correctly or evaluate afterwards; predictable inputs/outputs + can be documented but only seen once — creates a false pattern from insufficient data; the two-instance rule protects against the last failure mode; the full-documentation requirement protects against the first; the predictability requirement protects against the second; strong answers give a concrete example of each dangerous combination. Weak answer lists the three criteria without explaining the danger of missing any one.",
      maxScore: 15,
      placeholder:
        "Define all three criteria and explain specifically what goes wrong when each one is missing...",
    },
    {
      id: "m16-q2",
      type: "conceptual",
      text: "Explain the difference between a useful playbook entry and a generic one, using the concept of 'the counter-intuitive move.' Why do playbooks written by confident, experienced practitioners tend to be less specific than those written by practitioners who have recently failed and reflected on why?",
      rubric:
        "Strong answer: the counter-intuitive move is the specific action that a practitioner wouldn't derive from first principles — it's the thing you know to do because you've been in the situation before, not because it's obviously the right thing; a useful entry captures this move explicitly with the context that makes it appropriate; a generic entry captures only the obvious things (listen to concerns, address objections, show value) which anyone already knows; why experienced confident practitioners produce generic entries: they've been in the pattern so many times that the counter-intuitive moves feel obvious to them — they no longer experience them as non-obvious, so they don't think to document them; why recently-failed practitioners produce better entries: failure forces explicit reasoning about what went wrong and why — they know exactly what the non-obvious thing was because they just got it wrong; the lesson: playbook entries should be written when the situation is fresh, ideally during the engagement, not in retrospect after the successful outcome; the specificity that comes from articulating 'why didn't I do X' is more durable than the specificity that comes from articulating 'why I did Y.' Weak answer describes the difference without explaining the mechanism.",
      maxScore: 15,
      placeholder:
        "Define the counter-intuitive move, explain why experienced practitioners produce generic entries, and explain the failure-reflection mechanism...",
    },
    {
      id: "m16-q3",
      type: "applied",
      text: "You're in week 3 of an engagement. An engineer tells you: 'We tried GitHub Copilot two years ago and it didn't work — engineers used it for a month and then stopped.' You've heard almost exactly this sentence in two previous engagements at different companies. Describe the pattern extraction process you'd run in this moment, and what the initial playbook entry looks like.",
      rubric:
        "Strong answer extraction process: immediately flag this as a potential pattern (third instance of 'we tried an AI coding tool and adoption died'); during the session: ask the follow-up questions that extract the input conditions — 'What do you think went wrong?' 'Who used it? What kinds of things did they use it for?' 'When did people stop?' 'Was there any specific incident that accelerated the drop-off?' 'What support was there during the adoption period?'; after the session: compare what you heard here with what you heard in the previous two engagements; identify the structural commonalities (probable: no structured onboarding, no protected time, tool used for trivial tasks, no sustained support after initial introduction, no metrics to show progress); write the pattern log entry immediately; initial playbook entry: Problem — 'Team has a prior failed adoption of an AI coding tool and is now resistant to a new tool because of the prior experience. The resistance is often expressed as: we tried this before and it did not work.' Context conditions — engineering team with 1+ year of experience since the failed adoption, tool abandoned within 60 days of introduction; Approach — start by understanding the specific cause of the prior failure (was it onboarding? support? task mismatch? no protected time?) before proposing anything new; different causes require different interventions; Gotchas — the prior failure may have been caused by a different fundamental problem (the team didn't have the prerequisites for adoption) that still exists; Success metrics — engineers can name a specific reason the previous adoption failed and a specific structural difference in the current approach. Weak answer extracts a generic 'prior tool failure' pattern without the diagnostic depth.",
      maxScore: 20,
      placeholder:
        "Describe the in-moment extraction process and write the initial playbook entry with all five components...",
    },
    {
      id: "m16-q4",
      type: "applied",
      text: "You've identified what you believe is a new pattern: 'When a team's principal engineer is also the primary code reviewer, and that person is resistant to agentic tools, adoption stalls regardless of IC enthusiasm.' You've seen this twice. Your colleague says: 'That's just the blocker persona — we already have a pattern for handling blockers.' How do you determine whether this is a new pattern or a variant of the existing blocker pattern, and what would need to be true for it to warrant its own playbook entry?",
      rubric:
        "Strong answer: the test is whether the context conditions and approach differ materially from the existing blocker pattern; how to determine: (1) pull up the existing blocker pattern entry; (2) compare the input conditions — does the existing entry address the specific case where the blocker is also the critical path bottleneck (the only required reviewer)? If not, the situation has a different dynamic: this isn't just organizational resistance, it's a structural gatekeeping that IC adoption can't work around; (3) compare the approach — the existing blocker approach probably involves addressing concerns, involving them in design, peer conversion; the new pattern may require: making the gatekeeping visible to technical leadership as a structural risk (not just resistance), proposing changes to the review structure that reduce the single-point-of-failure dependency, distinguishing between personal resistance and structural authority; (4) compare the success metrics — the existing blocker pattern probably defines success as 'blocker changes position'; this new pattern may define success differently: either convert the individual OR restructure the review process so adoption doesn't depend on a single person's position; warrant for a separate entry: if the approach is materially different (not just a nuance) and if the existing entry doesn't capture the structural bottleneck dimension; otherwise, add a subsection to the existing entry. Weak answer says 'it's different because the blocker has more power' without specifying how the approach differs.",
      maxScore: 20,
      placeholder:
        "Describe the specific comparison you'd run, what would make it a new pattern vs a variant, and what the new entry would add that the existing one doesn't...",
    },
    {
      id: "m16-q5",
      type: "hands_on",
      text: "Write a complete playbook entry for the 'Context Collapse Pattern' — the situation where multiple engineers running independent agentic sessions produce architecturally inconsistent code that surfaces at integration time. Include all five components at full depth.",
      rubric:
        "Strong answer: Problem statement (recognition guide): 'Team has been using agentic tools for 6+ weeks with 5+ engineers running independent sessions. At integration time (PR merges, sprint-end integration), architectural inconsistencies appear: duplicate implementations of the same concept in different styles, naming convention drift, incompatible assumptions about shared services. Engineers are producing more code faster but spending increasing time on integration conflicts.'; Context conditions: team size 5+, agentic tool adoption 6+ weeks, no shared context mechanism (no CLAUDE.md or equivalent, no active ADR process), multiple engineers touching adjacent areas of the codebase; Approach: (1) audit: run a codebase consistency check — identify all cases of the same concept implemented twice, name convention violations, incompatible assumptions (this can be done with an agent itself); (2) triage: categorize inconsistencies by severity and refactor complexity; address critical ones immediately, defer low-severity; (3) root cause analysis: for each major inconsistency, identify which sessions produced the incompatible implementations and what context they were missing; (4) CLAUDE.md creation: write a CLAUDE.md that captures the architectural decisions that, if they'd been in context, would have prevented each inconsistency; (5) pre-session protocol: establish that engineers review relevant CLAUDE.md sections before starting any session that touches an area with prior architectural decisions; (6) ownership: assign CLAUDE.md maintenance to a tech lead with explicit trigger conditions for updating it; Gotchas: if the inconsistencies predate agentic tool adoption, agents are accelerators of a pre-existing problem — the fix is different (standard codebase refactor before deploying CLAUDE.md); this pattern is often misdiagnosed as 'agents write bad code' — the correct diagnosis is 'agents write good code from bad context'; Success metrics: no new architectural inconsistencies in the next sprint review; CLAUDE.md covers all architectural domains that produced inconsistencies; every engineer can describe what to check before starting a session in an unfamiliar codebase area. Weak answer is missing one or more components or provides shallow content in any component.",
      maxScore: 20,
      placeholder:
        "Write the complete 5-component playbook entry for the Context Collapse Pattern at full depth...",
    },
    {
      id: "m16-q6",
      type: "hands_on",
      text: "You're maintaining a playbook with 24 entries. After a recent engagement, you suspect that 3-4 of your existing entries may be stale — the context conditions have changed because the tooling has matured. Design a playbook review protocol: how often, what the review process looks like, who is involved, what criteria trigger archiving, and how you handle the case where an entry is partially stale (the approach still works but the context conditions have changed).",
      rubric:
        "Strong answer review protocol: quarterly review of all active entries; review process: (1) for each entry, compare the context conditions to the current state of the tooling and market — are the conditions that produce this situation still occurring? (2) check the approach against recent engagements — was it applied? did it work? were there modifications?; (3) update success metrics if the definition of success has shifted; who is involved: all SEs who used the entry in the past 12 months, not just the entry author; fresh eyes catch staleness that the author's familiarity with the original context obscures; archiving criteria: (1) context conditions no longer occur in current engagements; (2) approach consistently fails in 3+ recent applications; (3) success metrics are no longer meaningful; (4) a better entry supersedes it; partially stale entries: don't archive, but split the entry — the original entry gets a note 'context conditions modified [date]' and the updated conditions; alternatively, add a 'version history' section at the bottom that notes what changed and when; this preserves the historical record while keeping the active entry current; the partially stale case is actually most common: the fundamental pattern persists but the specific tooling or organizational dynamics have shifted; updating context conditions while keeping the approach is usually the right move. Weak answer gives a vague review schedule without the specific criteria or the partially-stale handling.",
      maxScore: 20,
      placeholder:
        "Design the complete review protocol with cadence, process, participants, archiving criteria, and the partially-stale case...",
    },
    {
      id: "m16-q7",
      type: "edge_case",
      text: "You discover that two SEs on your team have independently developed playbook entries for what appears to be the same pattern — the QA bottleneck pattern — but their entries have different approaches. One recommends automated pre-screening as the first move; the other recommends review distribution as the first move. Both claim their approach worked in multiple engagements. How do you resolve this, and what does this situation tell you about how patterns should be structured?",
      rubric:
        "Strong answer: don't resolve it by picking one — this is actually a discovery opportunity; if two experienced SEs developed different approaches for what looks like the same pattern and both worked, the most likely explanation is that the pattern has two variants with different context conditions that weren't captured in either entry; the resolution process: (1) get both SEs to walk through their engagements together: what were the specific context conditions? (automated pre-screening works better when CI is already reliable and the bottleneck is mechanical checking; review distribution works better when knowledge is siloed and the bottleneck is access to the right reviewer, not the amount of review); (2) the pattern may need to split: 'QA Bottleneck - Throughput Variant' and 'QA Bottleneck - Knowledge Silo Variant' with different context conditions driving which variant applies; (3) merge the gotchas across both entries — each SE's failure cases are the other SE's edge cases; what this tells you about pattern structure: the context conditions section is the most important part of an entry for distinguishing patterns; when two approaches work in different cases for the same apparent problem, the context conditions weren't specific enough to distinguish the two cases; the resolution is always to make the context conditions more precise, not to declare one approach right. Weak answer merges the two entries by combining both approaches into a single linear approach (without understanding when to use which).",
      maxScore: 20,
      placeholder:
        "Describe the resolution process, what the two-variant discovery reveals, and what this tells you about playbook structure...",
    },
    {
      id: "m16-q8",
      type: "edge_case",
      text: "You're in the middle of an engagement when you realize you're applying a playbook pattern that worked in your last three engagements. The client's situation matches the context conditions precisely. But something feels off — you can't articulate what. Should you trust the playbook or your intuition, and how do you investigate the discrepancy?",
      rubric:
        "Strong answer: frames this as a signal worth taking seriously, not as a weakness to suppress; the feeling that something is off is pattern-recognition operating faster than conscious reasoning — an experienced practitioner's intuition is not irrational, it's the result of accumulated pattern data that hasn't been fully verbalized yet; what to do: (1) don't override the intuition or the playbook — pause; (2) try to articulate the unease: what specifically feels different about this situation? walk through the context conditions one by one and ask: is this one actually matching, or am I assuming it matches?; (3) look for the boundary condition: what would need to be true for this situation to be an exception to the pattern?; (4) run a low-cost test: apply the first step of the approach and observe the response carefully before committing to the full approach; the test is: does the response match what the pattern predicts? if not, you've found the mismatch; (5) document what you find regardless — if your intuition was right and the pattern doesn't apply here, that's a new gotcha for the entry; if your intuition was wrong and the pattern applies perfectly, you've validated the context conditions more precisely; strong answers treat the tension between intuition and playbook as a data source, not a problem to resolve; the playbook is strong prior; intuition is current signal; both are valid inputs to the decision. Weak answer says 'follow the playbook' or 'follow your gut' without the investigation step.",
      maxScore: 20,
      placeholder:
        "Describe how you navigate the tension between playbook and intuition, and the specific steps you take to investigate the discrepancy...",
    },
  ],
};
