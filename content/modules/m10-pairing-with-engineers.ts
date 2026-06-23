import type { Module } from "../types";

export const module: Module = {
  id: "m10",
  track: 3,
  trackName: "Client Delivery Skills",
  order: 10,
  title: "Pairing with Engineers",
  description:
    "How to demonstrate without taking over, meeting engineers where they are, the crossed-threshold moment, resistance patterns, and making wins visible.",
  estimatedMinutes: 90,
  content: `
# Pairing with Engineers

Pairing sessions are the most high-leverage touchpoints in an agentic SE engagement. Done well, a single pairing session can collapse weeks of skepticism into genuine adoption. Done poorly, it reinforces every concern the engineer already had — that AI is hype, that it only works in demos, that it will slow them down. This module covers how to structure pairing sessions so the former happens, not the latter.

---

## The SE's Role in Pairing: Facilitator, Not Driver

The single most common mistake SEs make when pairing with engineers is taking over. You sit down, open the terminal, and start showing what Claude Code can do. The engineer watches. You look impressive. You walk away feeling like the session went well. The engineer doesn't change their workflow at all.

The problem is structural: you were the one doing the work. When you drive, you reinforce the engineer's position as a passive observer. You're performing competence, not transferring it.

**The SE's role in pairing is to create the conditions for the engineer to have their own experience with the tool.** That means:

- You narrate, they type
- You suggest next prompts, they send them
- You read outputs together, they make the judgment calls
- You handle meta-questions ("why did it do that?"), they handle the task at hand

This requires you to relinquish control of the outcome. The session may go slower than it would if you drove. The engineer may choose prompts you wouldn't have chosen. That's not a problem — it's the point. They need to learn to navigate the tool, not watch someone else navigate it.

**When you can take over:** The only time you should take control of the keyboard during a pairing session is to quickly demonstrate a specific behavior you're trying to explain, and then immediately hand it back. Even then, keep it under 60 seconds. The default is: they drive.

---

## Reading the Room: Three Engineer Archetypes

Before the session starts, assess who you're working with. Engineers who are new to agentic tools fall into roughly three archetypes, and each requires a different opening.

### The Skeptic

**Signals:** Crossed arms, flat affect, phrases like "we've tried AI tools before," references to GitHub Copilot being "basically autocomplete." Senior engineers are disproportionately represented here. They've been through multiple technology hype cycles and have learned that most promises don't survive contact with a real codebase.

**What they need:** Respect for their skepticism, not a pitch. Never argue with the skeptic's prior experiences — those experiences are probably accurate. Instead, invite them to disprove you in their own environment, on their own code. The fastest way to move a skeptic is to say "let's try it on that bug you've been dreading."

**Opening move:** Ask them to name something in their current sprint that they find tedious or painful. Start there. If the tool helps, they've seen it on their own terms.

### The Curious

**Signals:** Lots of questions before you've started, has already tried prompting the tool on their own, may have already formed opinions about what it can and can't do based on limited experiments. Enthusiastic but may have miscalibrated expectations (either too high or too low).

**What they need:** Structure. Curious engineers often thrash — they try something, it doesn't work perfectly, they try something else. They need you to give them a framework for prompting so their experiments are more likely to succeed and they learn from the ones that don't.

**Opening move:** Start by asking what they've tried so far. Learn their mental model before you try to change it. Build on what's working.

### The Overwhelmed

**Signals:** Quiet, watching you carefully, hasn't opened their laptop yet even though you're five minutes in. May preface their questions with "sorry, this is probably a basic question." Junior engineers and those new to a codebase show up here.

**What they need:** Small wins fast. Overwhelmed engineers need to feel competent quickly. Start with something very constrained — "let's ask it to explain this function" — before moving to generation or complex multi-step tasks. Success early gives them enough confidence to stay engaged when things get harder.

**Opening move:** Normalize the learning curve explicitly. Tell them that even experienced engineers have prompts that don't work the first time. Failure during the session is useful data, not evidence they're doing it wrong.

---

## The Demo-Then-Drive Pattern

The most reliable pairing structure is: you demonstrate the behavior once, briefly, then immediately give them the keyboard to replicate it or extend it.

**Step 1: Set the frame (2 minutes)**
Explain what you're going to do before you do it. "I'm going to show you how to use Claude Code to run a review on this PR. I'll do it once so you can see the flow, then you're going to do it on the next PR yourself." Setting the expectation that they will drive removes the passivity from the outset.

**Step 2: Demo — fast, narrated (5-10 minutes)**
Do the task. Narrate your prompt decisions out loud: "I'm choosing to include the specific function name because Claude can read it directly from the repo — I don't need to paste it in." Keep the demo focused on one task, not a showcase of every feature.

**Step 3: Hand the keyboard (immediately)**
Before they've processed what happened, hand control to them. Resist the urge to let them watch you do it again. The second exposure should be theirs. "Okay, now there's another PR in the queue — you do it."

**Step 4: Read the output together**
When results come back, don't evaluate them yourself first. Read together. Ask: "What do you think? Is this what you expected?" Let them make the judgment. This builds the critical evaluative skill — knowing when to trust the output and when to push back.

**Step 5: Debrief the prompt (2 minutes per round)**
After each round, spend two minutes on the prompt itself: "What did you add that I didn't? Why? What do you think happened when Claude saw that phrasing?" This builds prompt intuition, not just prompt habits.

---

## Handling Resistance Patterns

Resistance during a pairing session is information. Here are the most common patterns and what they actually mean.

### "It Just Autocompletes"

This is the most common resistance pattern from experienced engineers who've been burned by Copilot-style tools. They're pattern-matching what they're seeing to their prior experience.

**What it actually means:** They haven't seen agentic behavior yet — the tool taking multi-step action, reading context, making decisions. Their mental model stops at "token prediction."

**Response:** Don't argue about what the technology does. Instead, create a visible multi-step moment. Ask them to set a task that requires reading multiple files and synthesizing a result. Watch Claude navigate the codebase autonomously. The visceral difference between autocomplete and agentic navigation is something they have to see, not be told about.

### "I Can Just Do This Myself Faster"

This is often true for the specific task you're demonstrating. The engineer is a fast typist with deep context in their codebase. They genuinely are faster for that specific thing.

**What it actually means:** They're measuring the wrong thing. They're comparing raw speed on a single task, not cumulative time across all the tasks they do in a day.

**Response:** Agree with them. "For this specific task, you probably are faster. Where does this tool start to matter is when you have ten tasks like this in a morning, or when the task requires you to read 15 files before you can write a single line. Let me show you one of those." Then find a context-heavy task in their actual backlog.

### "What If It's Wrong?"

This is actually a sophisticated question from a thoughtful engineer. They've noticed that Claude produces confident output and they're not sure when to trust it.

**What it actually means:** They need to understand the human-in-the-loop model. They're worried about delegating judgment.

**Response:** This is a teaching moment about the relationship between the engineer and the tool. The tool doesn't replace judgment — it replaces the work of producing a first draft that judgment operates on. Walk them through a concrete example: "If this suggested refactor is wrong, what's the cost of catching that in your review? Now compare that to the cost of producing this refactor from scratch. The math only works if you stay in the review loop." This legitimizes their skepticism while reframing the cost calculus.

### "Our Codebase Is Too Complex / Too Legacy"

Complex codebases are frequently offered as the reason why AI tools won't work. Often this is a proxy for "I'm not sure I want to be the one who tries this on something that matters."

**What it actually means:** Fear of breaking something in a high-stakes environment. The concern is risk, not complexity.

**Response:** Start in the safest possible corner of the codebase. A utility function that hasn't been touched in a year. A test file. Something where the cost of being wrong is low. Build confidence there before moving to the scary parts.

---

## Making the Threshold Moment Happen

The threshold moment is the moment the engineer stops being a skeptical observer and starts being a user. It's a real, observable shift — the moment they start suggesting prompts unprompted, or they grab the keyboard before you offer it, or they say "wait, can we try it on that other thing?"

You cannot manufacture the threshold moment through persuasion. You can only create conditions where it is likely to happen.

**Conditions that produce threshold moments:**
1. The engineer is doing work they actually care about, not a contrived demo
2. The output saves them from something tedious or frustrating
3. The save is visible and unambiguous — not marginal
4. They did it themselves (not watched you do it)

**Timing matters:** Threshold moments tend to happen in the middle of sessions, not at the start or the end. The start is too guarded. The end is retrospective. The middle of a session — when the engineer is absorbed in the task and has lowered their defenses — is when the moment tends to land.

**After the threshold moment:** Don't celebrate it too loudly. Saying "see, I told you it would work" immediately re-erects the walls. Treat it as normal. Continue the session as if this is just how work goes now. Normalize the behavior before you name it.

---

## Concrete Pairing Session Structure (90 Minutes)

**0:00–0:10 — Discovery**
Don't open a terminal. Ask what they're working on this week. What's tedious? What's stuck? What do they wish they could do faster? This isn't small talk — it's how you find the material for the session. The best pairing sessions work on real work, not examples you brought.

**0:10–0:20 — Context setting**
Explain what Claude Code can and can't do in one minute. Set honest expectations. Then explain how the session will work: you'll start with a brief demo, then they drive for the rest of the time.

**0:20–0:30 — First demo (you drive)**
Pick the lowest-friction high-value task from what they told you. Demo it with narration. End by handing the keyboard.

**0:30–0:60 — Hands-on rounds (they drive)**
Three or four tasks from their actual workload. You narrate, suggest, answer questions. They type. After each one, spend two minutes on the prompt decisions.

**0:60–0:75 — Harder task**
Now try something more ambitious — something where the tool might stumble, or where the task requires multiple rounds of back-and-forth. This is the most important part: watching the tool struggle and recover teaches as much as watching it succeed.

**0:75–0:85 — Debrief**
Three questions: What surprised you? Where did it fall short of what you expected? What's the first thing you'd try using this on your own?

**0:85–0:90 — Next steps**
One specific thing they'll try before you meet again. Not "keep experimenting" — a specific task, in their specific sprint, with a check-in date.

---

## When the Live Demo Fails

Live demos fail. A file isn't in the expected place. The model produces a hallucination. The MCP server is down. You have two choices: panic, or use it.

**The recovery frame:** "This is actually useful — let me show you what to do when this happens." Then troubleshoot out loud. Read the error. Explain why it probably happened. Try a different approach or prompt. If you can fix it in under three minutes, do it. If you can't, move to a different task and return to this one later with a note: "I'll look into why that happened and report back."

**What failure teaches:**
- Engineers see that you're comfortable not knowing
- They see that the workflow has recovery paths
- They see that failure in this context is cheap (you didn't deploy anything)
- They learn that debugging agentic behavior is a skill, not a mystery

**What to never do:** Apologize excessively, skip past the failure without acknowledgment, or pivot so abruptly that they don't learn anything from it. Failures addressed honestly build more trust than seamless demos.

---

## What Success Looks Like at the End of a Pairing Session

A successful pairing session has measurable outputs. At the end, you should be able to answer yes to most of these:

- The engineer drove for more than 70% of the hands-on time
- They suggested at least one prompt unprompted
- They evaluated at least one output critically (not just accepted it)
- They can name one specific thing they'll use the tool for before the next session
- They have a mental model of when to use it and when not to
- The threshold moment happened — or you know what prevented it and what to try next time

If the engineer drives away from the session and does nothing different, the session failed — regardless of how impressive the demos were. The goal is behavior change, not insight. Insight without behavior change is entertainment.

---

## Key Takeaways

1. The SE is a facilitator. The moment you take the keyboard for more than 60 seconds, you've slipped into performance mode.
2. Read the room before you open a terminal: skeptic, curious, overwhelmed each need a different opening.
3. Demo-then-drive is the core structure. Never demo twice without having them do it once in between.
4. Resistance patterns ("it just autocompletes") are signals, not objections. Respond with a demonstration that breaks their current mental model.
5. The threshold moment cannot be manufactured — but the conditions for it can.
6. Live failures are teaching material. Use them.
7. Success is behavior change, not a good NPS score for the session.
`,
  questions: [
    {
      id: "m10-q1",
      type: "conceptual",
      text: "Why is the 'facilitator, not driver' principle so important in pairing sessions, and what is the specific failure mode that happens when an SE takes over the keyboard?",
      rubric:
        "Strong answer: when the SE drives, the engineer is a passive observer — they watch competence being performed but don't develop their own; behavior change requires first-person experience, not observation; the specific failure mode is the 'great demo, no adoption' pattern — the session looks successful but nothing changes in the engineer's workflow; it also reinforces the engineer's position as a consumer of AI output rather than an active user; strong answers will also note the psychological dimension — people trust their own experience more than demonstrations. Weak answer says 'the engineer needs to learn by doing' without explaining the mechanism of why observation doesn't transfer.",
      maxScore: 15,
      placeholder:
        "Explain the facilitator principle, the mechanism behind it, and the specific failure mode when violated...",
    },
    {
      id: "m10-q2",
      type: "conceptual",
      text: "Describe the three engineer archetypes (skeptic, curious, overwhelmed) and explain why the same opening move — say, a polished demo of Claude Code's capabilities — produces different and often counterproductive results with each archetype.",
      rubric:
        "Strong answer: Skeptic — a polished demo confirms their suspicion that this only works in curated conditions; they've seen vendor demos before and know the gap between demo and reality; a slick opening raises their guard. Curious — a polished demo answers questions they already have and creates premature closure; they stop experimenting because they think they've already seen it. Overwhelmed — a polished demo is intimidating; it shows the gap between where they are and where you are, which is demotivating rather than inspiring. The strong answer recognizes that the SE's credibility is not what produces adoption — the engineer's own experience does. Weak answer describes the archetypes but doesn't connect each one to why the standard opening fails for them.",
      maxScore: 15,
      placeholder:
        "Describe each archetype and explain the specific way a polished demo backfires with each...",
    },
    {
      id: "m10-q3",
      type: "applied",
      text: "You're pairing with a senior backend engineer, 12 years of experience, who has been vocal in the pre-session Slack thread about being skeptical of AI tools. Twenty minutes into the session, after you've demo'd generating a database migration script, she says: 'That's fine, but I could write that migration in the time it took to write that prompt.' How do you respond in the moment, and how does this change your plan for the remaining 70 minutes?",
      rubric:
        "Strong answer: does not argue or defend; agrees with the speed comparison as probably accurate for this specific task; pivots to where the speed argument doesn't hold — tasks requiring large context windows, cross-file analysis, tasks with high repetition but low cognitive value; changes the plan to find a task from her actual backlog that meets these criteria (a refactor touching 20 files, investigating a performance regression across multiple services, generating docs from a codebase she hasn't worked in before); makes her the judge — 'you tell me whether it saved time' — removes the SE from the position of advocate; also notes that the 70-minute plan should now weight toward more complex tasks, not more demonstrations of straightforward ones. Weak answer tries to argue that the demo was actually faster, or pivots to a different simple demo.",
      maxScore: 20,
      placeholder:
        "Describe your immediate response and how you adapt the remaining session plan...",
    },
    {
      id: "m10-q4",
      type: "applied",
      text: "Halfway through a pairing session, Claude Code produces an output that is confidently wrong — it suggests a refactor that would break a subtle invariant in the code that the engineer immediately spots. The engineer looks at you and says: 'So... it makes stuff up?' How do you handle this moment? What do you say, and what do you do next?",
      rubric:
        "Strong answer: validates their observation without minimizing it — yes, this is a real failure mode; introduces the concept of hallucination without jargon (the model produces confident-sounding output that isn't always correct); reframes the engineer's role — their expertise was essential here; the model didn't replace their knowledge, it produced a candidate that their knowledge evaluated correctly; turns it into a calibration question: 'how did you know immediately it was wrong?' — this surfaces what cues they should look for; then uses the failure to demonstrate how to push back on the model ('explain why this refactor doesn't break X') and see if it can recover; acknowledges that this means the tool works best for engineers who already understand the domain, not instead of them. Weak answer apologizes for the failure, skips past it, or insists this was an edge case that rarely happens.",
      maxScore: 20,
      placeholder:
        "Describe what you say immediately, how you frame the failure, and what you do next in the session...",
    },
    {
      id: "m10-q5",
      type: "hands_on",
      text: "Design a complete 90-minute pairing session agenda for a mid-level frontend engineer (3 years React experience) who uses GitHub Copilot for autocomplete but has never used Claude Code. Their current sprint includes: (1) adding form validation to a checkout flow, (2) writing unit tests for a recently refactored cart component, (3) investigating a subtle re-render bug reported in production. Structure the session with timings, what you'll demo, what they'll drive, and how you'll handle the debrief.",
      rubric:
        "Strong answer: opens with discovery (5 min) to learn their priorities before deciding which tasks to tackle first; identifies the re-render investigation as the highest-value demo target (context-heavy, requires reading multiple files, benefits most from agent vs autocomplete); sequences from lower complexity (validation) to higher (bug investigation); demo-then-drive on each task; allocates more time to the debugging task because it best illustrates the difference from Copilot; debrief includes three specific questions (what surprised you / where did it fall short / what will you use this for); ends with one concrete next step (not 'explore it' but a specific task in their sprint); builds in buffer for failure recovery; notes when to hand the keyboard and when to narrate. Weak answer is generic, doesn't connect the session design to the specific tasks listed, or has the SE driving for most of it.",
      maxScore: 20,
      placeholder:
        "Write the full 90-minute agenda with timings, task assignments, and debrief structure...",
    },
    {
      id: "m10-q6",
      type: "hands_on",
      text: "Write a 'pairing session prep checklist' that an SE should complete before arriving at a pairing session. Include: what to learn about the engineer before the session, what to prepare about the codebase/environment, what to have ready in case the demo fails, and what 'success criteria' to set with yourself before walking in the door.",
      rubric:
        "Strong answer covers four distinct areas: (1) engineer research: role, seniority, prior AI tool exposure, current sprint content, their recent PRs to understand their work patterns; (2) codebase prep: local clone working, CLAUDE.md present or drafted, understand the directory structure well enough to navigate live, identify 3-5 candidate tasks from their backlog that are good demo targets; (3) failure backup: have a second task ready if the first demo fails, know how to reconnect the MCP server, have the model invoked in a fresh context so it's fast; (4) success criteria: define what behavior change looks like for this specific engineer — for the skeptic it might be 'they suggest one prompt'; for the curious it might be 'they identify a limitation themselves'; for the overwhelmed it might be 'they ask to try it on a second task'. Weak answer is generic and doesn't distinguish pre-session research from in-session preparation.",
      maxScore: 20,
      placeholder:
        "Write the complete prep checklist with all four areas covered...",
    },
    {
      id: "m10-q7",
      type: "edge_case",
      text: "You're running a pairing session with an engineer who seems engaged and is driving well. Twenty minutes in, their manager joins unexpectedly and starts asking questions — shifting the dynamic from pairing to a live demo for a manager who wants to understand the ROI. How do you handle the triangulated dynamic, and what do you do to get the session back to what the engineer needs?",
      rubric:
        "Strong answer recognizes the dynamic shift: the engineer now has an audience, which changes their behavior (more self-conscious, less likely to try things that might fail, more likely to defer to the SE); the manager is optimizing for justification, not learning; short-term: acknowledge the manager's interest, offer to answer their specific questions briefly and then return to the hands-on work; if the manager stays, reframe the session for them — 'what you're seeing is [engineer name] learning to use this tool; the best way to see the ROI is to watch this part'; consider privately suggesting a separate 15-minute exec briefing to the manager so the engineer gets their learning time; longer-term: in future engagements, guard pairing time explicitly by setting expectations with stakeholders before the session. Weak answer either ignores the manager or completely pivots the session to serve the manager at the expense of the engineer.",
      maxScore: 20,
      placeholder:
        "Describe how you handle the immediate dynamic and how you protect the session's original purpose...",
    },
    {
      id: "m10-q8",
      type: "edge_case",
      text: "After three pairing sessions with a team of six engineers, two engineers have crossed the threshold and are using Claude Code independently. The other four are politely engaged during sessions but revert to their old workflows immediately after. You have two more sessions scheduled. What do you diagnose as the possible causes, and how do you redesign the remaining sessions to break the pattern for the four who haven't converted?",
      rubric:
        "Strong answer diagnoses multiple possible causes and treats each differently: (1) the four may not have found tasks where the tool genuinely saves them time — the session tasks weren't connected to their real pain; (2) there may be a social/peer dynamic — if the 'converters' are senior, the others may be watching before committing; (3) the session structure may not be giving them enough time to drive before someone else takes over; (4) they may have tried it independently and hit friction (setup issue, authentication, unfamiliar interface) that blocked them; redesign: interview the four individually before the next session to find their specific unsolved problems; in the next session, pair them one-on-one rather than group; have the two converters co-facilitate (peer trust > SE trust); end with an explicit commitment — 'what are you going to use this on before Friday?' and follow up. Weak answer suggests more demos or better marketing of the tool's capabilities.",
      maxScore: 20,
      placeholder:
        "Diagnose the possible causes and redesign the remaining sessions with specific structural changes...",
    },
  ],
};
