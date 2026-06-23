import type { Module } from "../types";

export const module: Module = {
  id: "m17",
  track: 4,
  trackName: "Upskilling & Practice Building",
  order: 17,
  title: "Scaling the Practice",
  description:
    "How engagements become organisational knowledge, the pattern→playbook→training→engagement flywheel, feedback loops, contributing vs executing.",
  estimatedMinutes: 90,
  content: `
# Scaling the Practice

A single SE running great engagements is not a practice. A practice is a system that makes knowledge compound — where every engagement makes future engagements better, faster, and more reliably excellent. This module covers how to build that system: the flywheel that turns individual insight into organizational capability, the infrastructure that preserves what would otherwise be lost, and the daily tension between contributing to the practice and delivering for clients.

---

## The Flywheel Model

The agentic SE practice flywheel has six stages, each feeding the next:

**Stage 1: Individual Insight**
An SE encounters something in an engagement — a resistance pattern, a workflow design that worked unexpectedly well, a client scenario that broke the standard playbook. The insight lives in the SE's head.

**Stage 2: Pattern**
The insight is examined: is this a one-off, or is there a recurring structure here? If it appears in multiple engagements (or can be validated against colleagues' experiences), it becomes a candidate pattern.

**Stage 3: Playbook Entry**
The pattern is documented in the five-component format: problem statement, context conditions, approach, gotchas, success metrics. It enters the shared playbook where other SEs can find and apply it.

**Stage 4: Training Material**
The playbook entry is translated into training content for two audiences: (a) new SEs joining the practice, who need to learn the pattern before they encounter it; (b) client engineers, who need the conceptual framework to apply the pattern in their own context.

**Stage 5: New Engagement Template**
Playbook entries cluster into engagement templates — pre-scoped starting points for new engagements where the client's situation matches a known pattern. An SE starting an engagement at a team with a QA bottleneck problem now has a template to start from rather than a blank page.

**Stage 6: Faster Delivery → More Insights**
Engagement templates make delivery faster and more reliable. Faster delivery means more engagements per SE. More engagements generate more insights. The flywheel completes.

**The compounding effect:** A practice in its second year of disciplined flywheel operation doesn't just have more playbook entries than in its first year — it has better ones, because the third and fourth engagements using a pattern produce refinements that the first and second couldn't. The value of the playbook compounds non-linearly with the number of engagements that have contributed to it.

---

## How to Contribute Back Effectively

Contributing back to the practice is different from executing well on a client engagement. Both matter, but they require different activities and different discipline.

**The failure mode of good executors who don't contribute:**
An SE who delivers excellent client work but doesn't extract patterns or update playbook entries is generating value for their clients and zero compounding value for the practice. When they leave the practice, everything they learned leaves with them. The practice is exactly as capable as it was before they joined, despite years of engagement experience.

This is not a character flaw — it's a structural failure. If the practice only measures and rewards client outcomes, and never measures or rewards practice contribution, the rational behavior for every SE is to optimize for client outcomes and not contribute. The flywheel starves.

**The difference between a 'lessons learned doc' and actual practice contribution:**

A lessons learned document is a list of things that happened and what you'd do differently. It's written for the author. It says: "We should have started the discovery interviews earlier. The stakeholder mapping took too long. The CLAUDE.md configuration was underspecified." These are notes, not patterns. They require the author to interpret them. Another SE reading the lessons learned doc can't apply it without knowing the full context.

An actual practice contribution is a pattern or playbook entry that another SE can use without talking to you. It encodes enough context — the recognition conditions, the specific approach, the gotchas — that the reader can apply it independently. The test: could a new SE use this to navigate their first encounter with this situation without asking you?

**What effective contribution looks like:**

- During the engagement: weekly pattern log, friction and surprise flags
- End of engagement: one polished playbook entry per major novel pattern encountered; update to existing entries where your engagement adds nuance or a new gotcha
- Quarterly: participate in a playbook review where stale entries are updated or archived
- When asked about a past engagement: don't just tell the story — point to the playbook entry the story is an instance of, or create one if it doesn't exist

---

## Scaling from One SE to a Team of SEs

Growing from a solo practice to a team is where most of the practice infrastructure gets built — because when you were alone, you could carry things in your head. When there are three of you, you can't.

**What needs to be explicit at team scale:**

- **Playbook:** The patterns that lived in one person's head must be documented. The standard is: if you can't find it in the playbook, it doesn't exist as practice knowledge.

- **Onboarding:** A new SE joining the team should be able to get to competency faster because of the practice's accumulated knowledge, not at the same rate as the first SE. This is the flywheel test for onboarding: does the playbook actually accelerate a new SE's development, or is it still mainly word-of-mouth?

- **Quality standards:** What does "good enough" look like for a discovery interview, a pairing session, a workshop, a playbook entry? Without documented standards, every SE defines these themselves. The team diverges. Client experience becomes inconsistent.

- **Engagement handoffs:** When an SE leaves an engagement (client ends, SE reassigned), the incoming SE should be able to pick up where the previous one left off from documentation, not from a briefing call. This requires a standard engagement handoff document.

- **Decision-making:** Who can decide to modify the playbook? Who can approve a new engagement template? Who has authority to say "we won't do this type of engagement"? At team scale, these questions need answers that don't require a call with the founder.

---

## What Gets Lost When You Scale

Growth destroys certain kinds of knowledge even when it's done carefully. Understanding what gets lost is the first step to preserving it.

**Tacit knowledge:** The unspoken, inarticulate knowing that comes from experience. An SE who has run 20 discovery interviews develops intuition about when a client's account of their problem doesn't match the underlying reality. They can't fully articulate how they know — they've developed a pattern-recognition capacity that's faster than their conscious reasoning. When the team scales, this tacit knowledge doesn't transfer through documentation. It requires mentorship, observation, and shared experience.

**Contextual judgment:** Related to tacit knowledge, but distinct. Contextual judgment is the ability to know when a pattern applies and when it doesn't — to recognize the conditions that make this situation an exception. Playbook entries capture the typical case. Judgment handles the exceptions. Judgment scales poorly; it must be developed individually through experience.

**Relationship memory:** The practice's relationship history with clients, partners, and the broader ecosystem. Which clients had difficult engagements and why? Who in the ecosystem is trustworthy? What commitments were made to which clients? This knowledge lives in individuals and is fragile at scale.

**Cultural calibration:** The shared understanding of what the practice stands for — what we'd never do, what we prioritize when there are tradeoffs, how we want clients to feel about working with us. Early in a practice, this is absorbed through proximity. At scale, it must be made explicit and consistently modeled.

---

## How to Preserve Tacit Knowledge in Playbooks

You can't fully capture tacit knowledge in a playbook. But you can capture more of it than most practitioners think.

**The "what I noticed" section:** Add an optional section to every playbook entry for the SE who ran the pattern to write: "Here's what I noticed that made me think this pattern applied." This is the intuition layer — the pattern-recognition cues that preceded the conscious decision to apply the pattern. A new SE reading this gets access to the experienced SE's perceptual pattern, not just their logical reasoning.

**Case studies alongside patterns:** For each major pattern, document one or two real engagement cases (anonymized if needed) that illustrate the pattern in practice. Patterns in the abstract teach the logic. Case studies teach the texture — the way the situation actually appears, the human dynamics, the unexpected turns. Case studies carry tacit knowledge more efficiently than any abstract format.

**Mentored observation:** For patterns with high tacit knowledge content — the ones where "you'd know it when you see it" — pair new SEs with experienced ones specifically on engagements where those patterns are expected to appear. The observation itself, with structured debriefing afterward ("why did you do X at that moment?"), transfers the tacit knowledge better than any documentation can.

**Recorded demonstrations:** Video or transcript recordings of an experienced SE running a discovery interview, a pairing session, or a workshop. The experienced SE narrates their decision-making. These recordings are imperfect playbook entries — they're too contextual to apply directly — but they carry tacit knowledge that no written format can.

---

## The Tension Between Standardization and Flexibility

A mature playbook is a double-edged tool. Its value comes from accumulation and standardization — you can apply it because you trust it, not because you're figuring it out from scratch each time. But standardization creates its own failure mode: SEs who follow the playbook precisely in situations where it doesn't quite apply, missing the signals that this situation is different.

**The expert paradox:** The more expertise an SE develops, the more they deviate productively from the playbook — because their judgment has developed to the point where they can recognize when the standard approach needs to be adapted. A junior SE following the playbook precisely may produce a worse outcome than an expert who knows when to break it. But you can't build a practice on expert deviation; you need the playbook to carry the weight while expertise is developed.

**The resolution:** Frame the playbook not as rules but as strong defaults. The playbook says: "In most situations that match these conditions, this approach works." It doesn't say: "In all situations that match these conditions, follow these exact steps." Every entry should have a "when this approach doesn't apply" component — the contexts where a senior SE would deviate and why.

This framing does two things: it preserves flexibility for experienced SEs who have the judgment to deviate productively; and it makes the conditions for deviation explicit, which is the first step toward developing that judgment in junior SEs.

---

## What 'Building the Practice' Looks Like Day-to-Day vs Delivering Client Work

The recurring tension in an SE role is between client work (which is urgent, visible, and directly rewarded) and practice building (which is important, invisible, and indirectly rewarded — usually only visible when it's absent).

**Day-to-day reality:**
- 80-90% of an SE's time is in client-facing work during active engagements
- 10-20% is practice contribution: weekly pattern logs, playbook entries, participation in quarterly reviews, onboarding support for new SEs
- In gaps between engagements: 50/50 split between preparation for upcoming engagements (learning new content, updating relevant playbook sections) and practice building (turning backlogged pattern logs into polished entries, contributing to training materials)

**Making practice contribution sustainable:**

Practice contribution fails when it's an add-on to a full client workload. It succeeds when it's built into the engagement cadence: the weekly pattern log is 20 minutes on Friday afternoon, the end-of-engagement playbook entry is allocated in the last week's plan, the quarterly review is a scheduled event that client engagements are planned around.

The critical protection: engagement commitments should not be made that fill the entire available time. A practice that is 100% utilized on client work is a practice that is consuming its own accumulated knowledge faster than it's producing new knowledge. It will be less capable in 18 months than it is today, even if every engagement is delivered well.

**The contribution vs execution distinction:**

Executing: running a great discovery session. Contributing: turning the discovery session into a playbook entry that improves future SEs' discovery sessions.

Executing: delivering an upskilling program that the client loves. Contributing: updating the curriculum design principles based on what worked and what didn't.

Both matter. An SE who only executes is a contractor. An SE who only contributes is an academic. The practice needs people who do both, in the right ratio, continuously.

---

## Measuring Practice Health

A healthy practice is getting better. It's delivering more confidently in areas it has experience in, and it's expanding to new areas with a clear learning path. A declining practice is repeating mistakes, relying on individuals rather than systems, and creating institutional debt.

**Leading indicators of practice health:**

- **Playbook coverage rate:** % of engagement situations where a relevant playbook entry exists. Rising means the flywheel is working. Plateauing means patterns are being encountered but not captured.

- **New SE ramp time:** How long does it take a new SE to deliver their first independent engagement competently? If this is decreasing over time, the onboarding and training materials are improving. If it's flat or increasing, the accumulated knowledge is not actually accelerating new SE development.

- **Pattern reuse rate:** How often do SEs report using a specific playbook entry in an engagement? Entries that are never used are either addressing rare situations or aren't accessible/usable. High reuse indicates high relevance.

- **Engagement success rate:** % of engagements that produce measurable client outcomes (not just good NPS scores, but actual behavior change or SDLC improvement). This is the ultimate outcome metric. All the flywheel investment should eventually show up here as a sustained improvement.

**Lagging indicators (less useful for steering but important for accountability):**

- Revenue per engagement (higher if delivery is more efficient)
- Repeat engagement rate (clients come back if the first engagement delivered)
- Referral rate (clients recommend the practice if the delivery was strong enough)

**The warning sign:** When practice health metrics are positive (good playbook coverage, fast ramp time) but client outcome metrics are stagnating, the practice has become inwardly focused. The playbook is being built for its own sake, not for clients. This is a culture problem as much as a measurement problem.

---

## Key Takeaways

1. The flywheel is the practice's fundamental value creation mechanism: insight → pattern → playbook → training → engagement template → faster delivery → more insights. Every stage must work for the flywheel to compound.
2. Effective practice contribution means creating artifacts another SE can use without talking to you — not writing lessons learned for yourself.
3. Scaling exposes what was tacit and individual. What must become explicit: playbook, quality standards, onboarding, handoff documents, decision-making authority.
4. Tacit knowledge can't be fully documented, but it can be partially captured through "what I noticed" sections, case studies, mentored observation, and recorded demonstrations.
5. The standardization vs flexibility tension is resolved by framing the playbook as strong defaults, not rules — with explicit "when this doesn't apply" conditions in every entry.
6. Day-to-day: 80-90% client work, 10-20% practice contribution. Practice contribution must be built into the engagement cadence, not added on top.
7. Measure practice health with leading indicators (playbook coverage, ramp time, pattern reuse) not just lagging ones (revenue, NPS).
`,
  questions: [
    {
      id: "m17-q1",
      type: "conceptual",
      text: "Explain the six-stage flywheel model in full. Then identify which stage is most commonly skipped in practices that exist for several years without compounding value, and explain mechanically why that stage is the one that fails.",
      rubric:
        "Strong answer: stages in full: (1) individual insight — SE encounters something in an engagement; (2) pattern — insight examined for recurrence, validated as a pattern; (3) playbook entry — pattern documented in five-component format; (4) training material — entry translated for new SE onboarding and client training; (5) engagement template — clusters of entries become starting points for new engagements; (6) faster delivery → more insights — templates make delivery more efficient, generating more engagements and more insights; most commonly skipped: Stage 3, the playbook entry, not because SEs are lazy but because there's no structural incentive to write it and the cost is immediate while the benefit is future; Stage 2 also commonly fails — SEs don't do the validation work of checking whether their insight is a pattern (two-instance rule); mechanical explanation of why Stage 3 fails: client work is visible and immediately rewarded; playbook entries are invisible and rewarded indirectly through future engagements that the contributing SE may not even work on; this creates an incentive structure where the rational behavior is to not contribute, especially when under client delivery pressure; practices that succeed at Stage 3 have made contribution visible and recognized — through contribution tracking, through public acknowledgment, through advancement criteria that include practice contribution. Weak answer describes the flywheel without identifying the skip pattern or the mechanism.",
      maxScore: 15,
      placeholder:
        "Walk through all six stages and identify the most skipped stage with a specific explanation of the incentive mechanism behind the failure...",
    },
    {
      id: "m17-q2",
      type: "conceptual",
      text: "What is the expert paradox in the context of playbook-driven practices, and how does framing the playbook as 'strong defaults rather than rules' resolve it without sacrificing the standardization value that made the playbook worthwhile?",
      rubric:
        "Strong answer: the expert paradox: the more expertise an SE develops, the more productively they deviate from the playbook — because their judgment has developed to the point where they recognize when the standard approach needs adaptation; but a junior SE following the playbook precisely in a situation that appears to match the conditions but is actually an exception will produce a worse outcome than an expert who adapts; the paradox is that playbook value (standardization) is highest for juniors, but playbook compliance (following it precisely) is most appropriate for experts who know when to deviate, and least appropriate to mandate for juniors who can't yet make the deviation judgment; the resolution: framing as strong defaults — the entry says 'in most situations matching these conditions, this works'; each entry includes 'when this doesn't apply' conditions that describe the edge cases where the standard approach fails; this does two things: (1) experts have explicit permission to deviate when they recognize the conditions that call for it; (2) the conditions for deviation are documented, which is the first step toward developing that judgment in juniors — they can read 'when this doesn't apply' and begin to learn what to look for; strong answers also note that the 'when this doesn't apply' section is the hardest to write (requires the author to articulate edge cases they may recognize intuitively) and the most valuable for junior development. Weak answer describes the paradox without explaining how the resolution mechanism works.",
      maxScore: 15,
      placeholder:
        "Define the paradox precisely, explain why standard framing (rules) fails to resolve it, and describe the mechanism of the strong-defaults resolution...",
    },
    {
      id: "m17-q3",
      type: "applied",
      text: "You're the most senior SE in a practice that has grown from 1 to 5 SEs over the past year. The three most recently hired SEs are all excellent at client delivery but have not submitted a single playbook entry in 6 months. The practice lead is considering making playbook contribution a performance metric. You think this is the wrong approach. Why, and what do you recommend instead?",
      rubric:
        "Strong answer: why metrics-based contribution is wrong: it treats contribution as a compliance behavior rather than a practice norm; metrics-driven contribution produces quantity over quality — SEs will submit thin, low-value entries to hit their numbers; it creates resentment (another performance hurdle on top of client delivery pressure) rather than intrinsic motivation; it doesn't address the root cause, which is almost certainly structural (no time protected for contribution, no recognition for it, no visible impact from previous contributions); what to recommend instead: (1) investigate the root cause first — are the three SEs at 100% client utilization? (almost certainly yes); if so, the capacity isn't there to contribute regardless of incentives or penalties; (2) protect time structurally — two hours per week, blocked on the calendar, not client-facing; this is a capacity decision, not a motivation decision; (3) make contribution visible and immediately rewarding — when a new SE uses a playbook entry that an existing SE wrote, tell the author; make the connection between contribution and client success explicit; (4) collaborative contribution as part of engagement cadence — end-of-engagement retrospective (30 min) that produces a draft playbook entry as output; the draft gets polished later but the raw material is created together, reducing the solo contribution burden; (5) model it — the senior SE should contribute visibly and talk about it, not just expect others to; strong answers also note that a single metric will produce gaming behavior. Weak answer supports the metrics approach or says 'just tell them it's important.'",
      maxScore: 20,
      placeholder:
        "Explain why the metrics approach produces the wrong behavior, identify the likely root causes, and recommend specific structural interventions...",
    },
    {
      id: "m17-q4",
      type: "applied",
      text: "Your practice has a playbook with 35 entries, but analysis shows that only 8 of them have been used in the past 12 months. The other 27 are 'available' but no SE has cited them in an engagement report. What are the possible explanations, and how do you diagnose which is the real cause? Then describe what you do with the 27 unused entries.",
      rubric:
        "Strong answer possible explanations: (1) the 27 entries address rare situations that genuinely haven't appeared in 12 months; (2) the entries address common situations but are too abstract/generic to be recognized as applicable; (3) the entries are hard to find (discoverability problem — SEs don't think to look, or the search is poor); (4) SEs don't consult the playbook during engagements — it's not part of their workflow; (5) the situations are being encountered but SEs are solving them ad hoc without citing the playbook; diagnosis: (1) interview SEs: when you were in [situation from one of the unused entries], did you consult the playbook? if not, why? (2) compare the 27 entry topics to recent engagement challenges — do the challenges appear in the entries? (3) check the entry quality — are the problem statements written as recognition guides, or are they too abstract to map to a concrete situation? (4) observe an SE working through a new engagement — when do they consult the playbook? what do they search for?; what to do with 27 unused entries: (1) for entries addressing rare situations — keep but tag as 'infrequent'; (2) for entries with discoverability issues — rewrite the problem statement as a recognition guide with specific scenario language; (3) for genuinely stale entries — archive with explanation; (4) for entries that reveal a workflow problem (SEs don't consult the playbook) — address the workflow, not the entries; don't delete all 27 — that destroys institutional knowledge; do restructure the playbook to make the entries findable when needed. Weak answer suggests deleting the unused entries or adding more metrics.",
      maxScore: 20,
      placeholder:
        "List possible explanations, describe a specific diagnosis approach, and prescribe what to do with the 27 unused entries...",
    },
    {
      id: "m17-q5",
      type: "hands_on",
      text: "Design a 'practice health dashboard' for an agentic SE practice with 8 SEs. Include: 5 leading indicators with specific measurement methods and target values, 3 lagging indicators with appropriate caveats about their limitations, and a decision framework for what to do when a leading indicator goes red.",
      rubric:
        "Strong answer leading indicators: (1) playbook coverage rate — % of distinct engagement situations in the past quarter that had a relevant playbook entry; measured by: engagement reports cite which playbook entry they used (or 'none applicable'); target: >70%; (2) new SE ramp time — time from hire to first independently-delivered engagement rated as 'competent' by the client; measured by: engagement outcome ratings and SE self-assessment; target: decreasing quarter-over-quarter; (3) pattern reuse rate — average number of engagements per playbook entry in the past quarter; measured by: engagement reports; target: >2 per entry (if significantly lower, entries may be too specific to one engagement; if much higher, entries may be too generic); (4) contribution rate — % of SEs who submitted at least 1 polished playbook entry in the quarter; target: 80%; note: quantity threshold should be low to avoid gaming; (5) weekly pattern log completion — % of SEs who submitted a weekly pattern log during active engagements; target: 100%; leading indicator for future contributions; lagging indicators with caveats: (1) client outcome metrics (SDLC improvement, adoption rate) — the ultimate test but lags by 6+ months after practice changes; caveat: influenced by client factors outside the practice's control; (2) engagement repeat rate — clients who engage again; caveat: influenced by budget and timeline factors; (3) referral rate — clients who refer; caveat: long lag time, influenced by client network; when a leading indicator goes red: for coverage rate: run engagement-pattern matching retrospective, identify uncaptured patterns; for ramp time increase: review onboarding curriculum, pair new SEs with experienced ones; for contribution rate drop: investigate capacity first (utilization), then incentive structure; for log completion drop: check for unprotected time (engagements at >90% utilization); dashboard reviewed monthly by practice lead. Weak answer uses only lagging indicators or doesn't include measurement methods.",
      maxScore: 20,
      placeholder:
        "Design the complete 5+3 indicator dashboard with measurement methods, targets, and the red-indicator decision framework...",
    },
    {
      id: "m17-q6",
      type: "hands_on",
      text: "Write the standard engagement handoff document template that an SE must complete when leaving an active engagement (client continues, SE is replaced or reassigned). Include all sections, what content goes in each, and what the incoming SE should be able to do after reading it without speaking to the outgoing SE.",
      rubric:
        "Strong answer template: (1) Engagement context (1 page) — client name, the problem they were hired to solve, the original scope, what changed from the original scope and why, where the engagement currently stands; (2) Stakeholder map (table) — every significant stakeholder, their role, their attitude toward the engagement (champion/skeptic/blocker/passenger), their specific concerns, and the last conversation that matters; (3) Current state of the work — what has been done (link to outputs: discovery document, SDLC map, playbook entries, workshop materials, etc.), what is in progress (specific tasks, who owns them, what done looks like), what is not started but planned; (4) Open issues and decisions — specific questions that haven't been resolved, decisions that need to be made, dependencies that are blocking progress; (5) Relationship context — what promises or commitments have been made to the client? what has the client said they're worried about? what is the client's preferred communication style and cadence?; (6) Playbook references — which playbook entries are currently in use? which situations have been encountered that don't have a playbook entry yet?; (7) 30-day plan — what should the incoming SE do in the first 30 days? what are the most critical milestones? what would cause the engagement to go badly?; what the incoming SE can do after reading: schedule their first client meeting and know exactly what to say, identify the 3 most critical open issues to address first, understand the stakeholder dynamics without a briefing call, know which playbook entries to review, have a clear picture of what done looks like. Weak answer produces a status update rather than a structured handoff document.",
      maxScore: 20,
      placeholder:
        "Write the complete template with all sections, content descriptions, and the 'what the incoming SE can do' test...",
    },
    {
      id: "m17-q7",
      type: "edge_case",
      text: "Your practice has been running for three years and the flywheel is working well — playbook is strong, ramp time is fast, delivery is reliable. But you notice a cultural shift: SEs have stopped being surprised. New client situations are being mapped to existing patterns quickly, sometimes too quickly. One new SE has mentioned that she feels like 'every problem is just a version of something we've already seen.' Is this a good sign, a bad sign, or both? What does it tell you about where the practice is in its maturity, and what do you do with this observation?",
      rubric:
        "Strong answer: it's both a good sign and a warning sign; good sign: the flywheel has worked — the practice has accumulated enough pattern coverage that new SEs arrive to a mature taxonomy that makes sense of most situations quickly; the goal of the flywheel was to make the practice more confident in familiar territory; warning sign: premature closure — mapping a new situation to an existing pattern without adequately testing whether the situation is actually an instance of that pattern; the 'context conditions' check is being skipped; the new SE's comment ('every problem is a version of something we've already seen') is either (a) accurate — the practice has genuinely mapped the domain well, or (b) a sign that situational analysis is becoming superficial; what it tells you about maturity: this is a characteristic of a mature practice entering a risk zone; the risk is that the playbook becomes a cage rather than a scaffold — limiting perception of genuinely novel situations; what to do: (1) add a 'pattern challenge' step to the engagement process — before applying a pattern, the SE must articulate 'what specific conditions here differ from the typical case, and do those differences matter?'; (2) institutionalize a 'novel situation' flag — when an SE notices something genuinely new, there's a specific process to explore it rather than defaulting to the closest existing pattern; (3) recognize the new SE's observation as healthy intellectual skepticism — don't dismiss it; (4) check the engagement reports for pattern mismatch signals (approaches applied from the playbook that required more adaptation than expected). Strong answers treat this as a signal to evolve the practice, not as a problem to be solved or a success to be celebrated uncritically. Weak answer says this is only a good sign.",
      maxScore: 20,
      placeholder:
        "Explain why it's both a good and bad sign, what it reveals about practice maturity, and what structural changes you make in response...",
    },
    {
      id: "m17-q8",
      type: "edge_case",
      text: "A competing consulting practice publishes a public playbook that is very similar to yours — same five-component format, similar pattern categories, similar engagement templates. Some of your clients have seen it and are asking why they should pay for your practice's work when the competitor's playbook is free. How do you respond to this client question, and what does this competitive situation reveal about where the true value of your practice actually lives?",
      rubric:
        "Strong answer: does not dismiss the competitor's playbook or claim it's inferior; acknowledges it may be very good; frames the real value clearly: (1) a playbook describes what to do; knowing what to do and being able to do it in a specific organizational context are different things; the playbook is the map, the SE is the navigator who knows which roads are closed today; (2) the patterns in a public playbook have been generalized to the point of universal applicability — which means they've been abstracted away from the specificity that makes them maximally useful in any particular context; your practice's value is in the adaptation layer: taking the general pattern and making it work in this client's specific culture, codebase, team dynamics, and constraints; (3) the flywheel produces compounding value that a static public playbook can't replicate — your practice is updating its patterns based on current engagements; a published playbook is a snapshot; (4) execution risk: the client could attempt to apply the playbook themselves, and some clients successfully do; for those clients, the playbook is sufficient; for clients who have tried and failed to implement these changes without external help, the value is in the judgment and facilitation that the playbook can't provide; what this reveals about value: the true value of the practice is not in the documented patterns — those can be copied; it's in the accumulated judgment that isn't yet documentable, the current-engagement feedback loop that keeps patterns current, and the execution capability that turns a playbook entry into organizational change. Strong answers treat the competitive situation as a clarifying question about value proposition, not a threat. Weak answer attacks the competitor or claims the playbook is wrong.",
      maxScore: 20,
      placeholder:
        "Describe how you respond to the client question and what the competitive situation reveals about where your practice's actual value lives...",
    },
  ],
};
