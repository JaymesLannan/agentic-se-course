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
      text: "In the six-stage practice flywheel (insight → pattern → playbook entry → training material → engagement template → faster delivery), which stage is most commonly skipped in practices that exist for years without compounding value, and what is the primary reason it fails?",
      options: [
        "Stage 1 (individual insight) — SEs are too focused on client delivery to notice patterns in their own engagements, so insights never form in the first place",
        "Stage 4 (training material) — translating playbook entries into training content requires pedagogical skills most SEs don't have, creating a skills bottleneck",
        "Stage 3 (playbook entry) — client work is visible and immediately rewarded while playbook contribution is invisible and rewarded indirectly through future engagements the contributing SE may not work on, creating a rational incentive to not contribute under delivery pressure",
        "Stage 6 (faster delivery → more insights) — as practices mature, delivery becomes so efficient that engagements are shorter and produce fewer novel situations for pattern generation",
      ],
      correctAnswer: "Stage 3 (playbook entry) — client work is visible and immediately rewarded while playbook contribution is invisible and rewarded indirectly through future engagements the contributing SE may not work on, creating a rational incentive to not contribute under delivery pressure",
      rubric: "Correct answer: Stage 3, the playbook entry. Not because SEs are lazy — because the incentive structure is wrong. Client work is immediately visible and rewarded; playbook entries are invisible and the benefit accrues to future engagements the contributor may never work on. Under delivery pressure, the rational behavior is to prioritize client work. Practices that succeed at Stage 3 make contribution visible (tracking, public acknowledgment, advancement criteria) and protect time for it structurally — not by asking harder.",
      maxScore: 10,
      placeholder: "",
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
      text: "A practice lead wants to make playbook contribution a performance metric after 3 new SEs submitted zero entries in 6 months. Why is this the wrong intervention, and what should be investigated first?",
      options: [
        "Performance metrics are always demotivating for creative work — the practice lead should use extrinsic rewards (bonuses, recognition programs) instead to incentivize contribution",
        "The metric is wrong because it treats contribution as compliance rather than a practice norm, and metrics-driven contribution produces thin, low-value entries to hit numbers — the root cause is almost certainly that SEs are at 100% client utilization with no capacity to contribute, which a metric doesn't fix",
        "Making contribution a performance metric is fine, but the threshold should be set very low (one entry per quarter) to avoid undue pressure during high-utilization periods",
        "The real problem is that the playbook isn't visible enough — SEs don't see others reading and using their entries, so the solution is a better playbook interface rather than performance pressure",
      ],
      correctAnswer: "The metric is wrong because it treats contribution as compliance rather than a practice norm, and metrics-driven contribution produces thin, low-value entries to hit numbers — the root cause is almost certainly that SEs are at 100% client utilization with no capacity to contribute, which a metric doesn't fix",
      rubric: "Correct answer: diagnose capacity first, then address structure. Investigate: are the three SEs at 100% client utilization? Almost certainly yes — if capacity isn't there, no metric fixes it. Metrics-driven contribution produces gaming (thin entries to hit numbers), not quality. The right interventions: (1) protect 2 hrs/week structurally on the calendar; (2) make contribution visible — tell authors when others use their entries; (3) build contribution into engagement cadence (end-of-engagement retrospective produces a draft entry); (4) model it visibly as the senior SE. The problem is structural, not motivational.",
      maxScore: 10,
      placeholder: "",
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
      text: "Which type of indicator is most valuable as an early warning system for practice health problems, and why should lagging indicators not be the primary focus of a practice health dashboard?",
      options: [
        "Lagging indicators (client NPS, repeat engagement rate) are most valuable because they reflect actual outcomes; leading indicators can be gamed and don't reliably predict client satisfaction",
        "Leading indicators (playbook coverage rate, new SE ramp time, pattern reuse rate) are most valuable because they show the health of the mechanisms that produce outcomes — by the time lagging indicators signal a problem, the opportunity to intervene has passed",
        "Both types are equally important and should receive equal weight — a dashboard should display leading and lagging indicators side by side without prioritizing either",
        "Usage metrics (how often SEs consult the playbook) are the most important indicators because they directly measure whether practice infrastructure is being actively used",
      ],
      correctAnswer: "Leading indicators (playbook coverage rate, new SE ramp time, pattern reuse rate) are most valuable because they show the health of the mechanisms that produce outcomes — by the time lagging indicators signal a problem, the opportunity to intervene has passed",
      rubric: "Correct answer: leading indicators for early warning. Leading indicators (playbook coverage rate, ramp time, contribution rate, pattern reuse rate, weekly pattern log completion) show the health of the mechanisms that produce client outcomes. By the time lagging indicators (NPS, repeat engagement rate, referrals) signal a problem, you're months behind — the problem has already compounded. Leading indicators let you intervene early: coverage rate drops → run pattern-matching retrospective; ramp time increases → review onboarding; contribution rate drops → investigate utilization and capacity.",
      maxScore: 10,
      placeholder: "",
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
      text: "After three years of successful flywheel operation, a new SE observes that 'every problem is just a version of something we've already seen.' This is simultaneously a good and bad sign. What specific risk does it signal, and what structural change addresses it?",
      options: [
        "The risk is that the practice has over-standardized — too many playbook entries make creative judgment impossible. The fix is to archive any entry not used in the past year to reduce the playbook's prescriptive weight",
        "The risk is premature closure — new situations are being mapped to existing patterns too quickly without testing whether context conditions actually match. The fix is to add a 'pattern challenge' step requiring SEs to articulate what specifically differs from the typical case before applying any pattern",
        "The risk is complacency — SEs are relying on the playbook instead of developing new skills. The fix is to stop playbook contributions for 6 months so SEs are forced to develop novel approaches independently",
        "The risk is irrelevant — 'every problem looks like a version of something we've seen' is exactly the intended outcome of three years of flywheel operation and requires no structural intervention",
      ],
      correctAnswer: "The risk is premature closure — new situations are being mapped to existing patterns too quickly without testing whether context conditions actually match. The fix is to add a 'pattern challenge' step requiring SEs to articulate what specifically differs from the typical case before applying any pattern",
      rubric: "Correct answer: premature closure, fixed by pattern challenge. Good sign: the flywheel worked — the practice accumulated enough coverage that most situations map quickly. Bad sign: the context conditions check is being skipped; the playbook is becoming a cage rather than a scaffold. The structural fix: before applying any pattern, the SE must articulate 'what specific conditions here differ from the typical case, and do those differences matter?' Also: institutionalize a 'novel situation' flag for genuinely new situations, rather than defaulting to the closest existing pattern. Treat the new SE's observation as healthy skepticism, not a success to uncritically celebrate.",
      maxScore: 10,
      placeholder: "",
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
