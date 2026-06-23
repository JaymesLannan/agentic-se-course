import type { Module } from "../types";

export const module: Module = {
  id: "m15",
  track: 4,
  trackName: "Upskilling & Practice Building",
  order: 15,
  title: "Building Upskilling Programs",
  description:
    "Curriculum design, assessing current skill level, stack-specific vs generic training, measuring uptake, designing for the client's culture not generic best practices.",
  estimatedMinutes: 90,
  content: `
# Building Upskilling Programs

A single training session creates awareness and produces a first experience. An upskilling program builds capability — the kind of deep, practical skill that changes how engineers work day-to-day. The difference between a program and a series of sessions is design: a program has a progression, a measurement system, and a mechanism for sustaining behavior change after the formal training ends.

This module covers how to design upskilling programs that work in the real conditions of an engineering organization — where time is scarce, priorities shift, and skills evaporate without reinforcement.

---

## Assessing the Starting Point

Designing a program without knowing the starting point is like calibrating a navigation system without entering your current location. You'll produce a path to the destination, but you won't know how long it will take or what terrain you'll cross.

**Three assessment methods:**

**1. Skill audit (structured questionnaire + self-assessment)**

A skill audit asks engineers to self-assess their current level across a defined capability framework. For agentic tools, the framework might include:

- Prompt construction (can articulate what they're asking for and why)
- Context management (understands what context the agent needs and how to provide it)
- Output evaluation (can distinguish correct from plausible-but-wrong outputs)
- Tool integration (knows how to configure and troubleshoot MCP connections, CLAUDE.md, etc.)
- Workflow integration (has integrated the tool into their daily development workflow)

Self-assessment is unreliable in isolation (people don't know what they don't know), so combine it with a short practical task: "Use Claude Code to do X. Tell me what you did and what the agent produced." The gap between their self-assessment and their actual task performance tells you about their calibration of their own skill.

**2. Usage observation (watch them work for 30 minutes)**

This is the most reliable assessment method and the most time-intensive. You sit with the engineer for 30 minutes while they do real work and observe: Do they use the tool? When? What do they prompt? How do they evaluate the output? What do they miss? What do they struggle with?

Usage observation reveals things that interviews and questionnaires don't: the moment they instinctively reach for StackOverflow rather than the agent, the times they accept an output without reading it carefully, the kinds of tasks they don't think to use the tool for.

**3. Stakeholder interview (what does their manager observe?)**

The manager or tech lead can tell you: which engineers are already using the tool enthusiastically, which are resistant, which are compliant but not effective. This calibrates the self-assessments you've collected.

**What the assessment produces:**

A starting-point map with: skill level distribution across the team (not just an average), the specific gaps most commonly shared, the outliers (who's ahead, who's behind), and the specific failure modes you've observed (over-trusting, under-trusting, wrong use cases). This map drives the curriculum design.

---

## Curriculum Design Principles for Agentic Tools

**Principle 1: Build on existing mental models**

Engineers already have mental models from their experience. They know what version control is, what a code review is, what a test suite is. Curriculum that connects agentic capabilities to these existing mental models is absorbed faster than curriculum that treats everything as new.

Example: "Claude Code's context window is like a very capable colleague looking over your shoulder. You tell it what file to read, and it reads it. If you don't tell it, it doesn't know." This analogy to a human collaborator is more accessible than an explanation of transformer attention mechanisms.

**Principle 2: Immediate practical application**

Every learning unit should have an application step that engineers can run in their actual development environment, on their actual codebase, within 24 hours of the learning. Curriculum that teaches abstract concepts without immediate application produces knowledge that decays within a week.

This means: the program is built around the team's specific stack (Java, Python, TypeScript — not a generic codebase), the exercises reference real tasks from their backlog, and the application assignments are checked against real work the engineer did, not manufactured exercises.

**Principle 3: Interleave learning and doing**

The worst curriculum structure: learn everything, then do everything. Better: learn one thing, do it, learn the next thing, do it. Best: learn one thing, do it today, do it again tomorrow in a different context, then learn the next thing. The interleaving of learning and application, with enough spacing to require recall, produces durable skill.

**Principle 4: Design for the edge of competence**

Training that is too easy produces confidence without skill. Training that is too hard produces anxiety without learning. The right exercises are at the edge of the engineer's current competence — just hard enough to require effort, easy enough that success is achievable. This is the Zone of Proximal Development, and it applies as much to professional training as to educational settings.

---

## Stack-Specific Customization vs Generic Content

Generic upskilling programs fail for one of two reasons: they're too abstract (engineers don't know how to apply them to their specific context) or they're too stack-specific in the wrong way (the exercises are in Python and the engineers work in Go).

**What should be stack-specific:**

- All exercises: the task, the codebase, the expected agent behavior
- The CLAUDE.md template: the conventions, testing patterns, and architectural constraints specific to their stack
- The failure mode examples: how context loss manifests in a Java Spring Boot codebase looks different from how it manifests in a Next.js app
- The MCP configuration examples: specific MCPs relevant to their toolchain

**What can be generic:**

- The underlying principles: prompt construction, context management, output evaluation, calibration
- The mental models: the trust calibration framework, the task suitability assessment
- The change management concepts: why engineers resist, how adoption happens, what sustains behavior change

A well-designed program has a generic conceptual layer (6-8 concepts that apply universally) and a stack-specific application layer (exercises, templates, examples tailored to this team's environment). The program structure is reused; the application layer is recreated for each engagement.

---

## The 4-Week Programme Structure

Four weeks is the right time frame for an upskilling program in most engineering organizations. Less than four weeks doesn't allow enough time for behavior change to take root. More than four weeks loses to competing priorities.

**Week 1 — Foundation**

Goal: Every engineer has a working setup and has completed their first substantive task with the tool.

Content: Tool setup, CLAUDE.md configuration, first session structure, calibration framework introduction. The first task should be: "Use Claude Code to do [specific task from current sprint] and report back what happened."

Assessment gate: By end of week 1, every engineer has submitted a brief report on their first task: what they tried, what the agent produced, what was correct, and what wasn't. Anyone who hasn't completed this gate gets a targeted intervention before week 2.

**Week 2 — Deepening**

Goal: Engineers are using the tool for at least 3 different task types and have identified one limitation through first-person experience.

Content: Advanced prompting, context management for their specific codebase, output evaluation techniques, the SDLC integration points (how the tool fits into their PR process). Group session: each engineer shares one success and one failure from the past week.

The group share-out is critical. Hearing peers describe real experiences — not curated demos — is the most motivating input available. It also surfaces team-specific patterns you didn't anticipate.

**Week 3 — Integration**

Goal: Engineers have integrated the tool into their regular workflow for at least 2 categories of tasks.

Content: Workflow-specific applications (their actual SDLC, their actual sprint process), troubleshooting common failures, the efficiency calculation ("is the tool actually saving time on X, and how do you know?"). Individual check-ins: a 15-minute 1:1 with each engineer to address specific questions and calibrate their progress.

Assessment: usage metrics from session logs + engineer self-report on task integration.

**Week 4 — Self-Direction and Handoff**

Goal: Engineers can assess new tasks independently (should I use the tool for this? how?), identify when they're stuck and know how to get unstuck, and teach basic usage to a new team member.

Content: Peer teaching exercise (engineers teach each other), troubleshooting without the SE in the room, building personal practice (what does using this tool look like for me personally, in my specific workflow?). Final group session: lessons learned, what the team will keep doing, what they'll stop doing, what they'll do differently.

The final session is run by the engineers, not the SE. The SE facilitates but does not lead. This models self-direction.

---

## Measuring Uptake Beyond Attendance

Attendance is a lagging indicator of nothing. An engineer can attend every session and return to their old workflow the next morning. The metrics that actually predict durable behavior change:

**Activation rate:** % of engineers who completed at least 3 substantive tasks with the tool by end of week 2. "Substantive" means: not a test prompt, a real task from their sprint. Target: 80%.

**Depth of use:** What is the distribution of task types each engineer is using the tool for? Engineers who use it for only one type of task (usually the most obvious/easy one) haven't developed the task-selection judgment that sustains long-term use.

**Self-reported calibration accuracy:** At week 2 and week 4, ask engineers to predict (before running a prompt) whether the agent will produce a correct result for a specific task. Compare their prediction to the actual outcome. Improvement in prediction accuracy is a direct measure of calibration development — the core skill of the program.

**Peer teaching readiness:** By week 4, can engineers explain the tool to a new colleague well enough that the new colleague can complete their first task? This tests depth of understanding, not just usage fluency.

**30-day retention:** At 30 days post-program, what % of engineers are still using the tool? Target: 70%. Below 50% means the program produced engagement but not habit formation.

---

## The Sustaining Mechanism After the Programme Ends

The most common program failure mode is strong results during the program, followed by reversion to old habits within 4-6 weeks of the program ending. The program created a supported environment; the regular environment didn't change enough to sustain the new habits.

**Effective sustaining mechanisms:**

**1. An internal champion cohort:** Before the program ends, identify 2-3 engineers who are most enthusiastic and most capable. Offer them a defined role: "You are the internal resource for Claude Code questions on this team." Give them slightly advanced training, a channel to the SE practice for questions, and recognition for the role. They provide social proof and practical support after the SE leaves.

**2. Integration into existing rituals:** The new behavior should become part of something the team already does. Sprint planning mentions: "Did you consider using Claude Code for any of these tasks?" Retrospectives include: "What worked/didn't work with agent-assisted development this sprint?" Code review comments include references to agent-generated code. When the behavior is embedded in existing rituals, it persists without requiring new habits.

**3. A self-assessment prompt at 60 days:** At 60 days post-program, engineers receive a brief (5-question) prompt: "Rate yourself on the calibration framework. Where have you improved? Where are you stuck?" This creates a moment of reflection that can surface stagnation before it becomes permanent.

**4. New team member integration:** When a new engineer joins the team, the champion cohort is responsible for teaching them basic usage. This perpetuates the practice through onboarding rather than requiring periodic retraining.

---

## What Kills a Programme

**No management support:** Engineers are told the program is important, but their sprint commitment doesn't decrease. They show up for sessions but do the program work in stolen minutes between their real deliverables. The learning is shallow and doesn't stick.

**No protected time:** Related to above, but distinct. Even with management endorsement, if protected time isn't put on the calendar before the program starts, it will be eroded by meetings, incidents, and sprint pressure. Protected learning time must be on the calendar before day 1 of the program.

**No clear outcome:** If engineers don't know what they're supposed to be able to do by the end of the program, they have no frame for evaluating whether they're making progress. Clear, specific outcomes ("by week 4, you will independently apply Claude Code to at least 3 different task categories in your sprint") give engineers something to work toward.

**Content disconnected from real work:** If the exercises use a made-up codebase rather than their actual codebase, engineers don't develop the transfer skill that takes them from "I can do this in the exercise" to "I can do this in my real sprint." They walk away feeling like they participated in an interesting demo, not like they built a skill.

**Programs designed for generic engineers:** Every engineering culture is different. A program designed for a startup culture (fast, informal, high risk tolerance) will fail at an enterprise bank (formal, slow, risk-averse). A program that treats these as the same will produce poor results at one or both. The curriculum framework is reused; the program design is rebuilt for each culture.

---

## How to Adapt in Real Time When the Programme Isn't Working

A program that isn't working shows signals early if you're looking for them. The intervention in week 2 is much cheaper than the post-mortem in week 5.

**Week 1 signal: low activation rate.** Less than 50% of engineers completed their first task. Diagnosis: setup friction (something in the configuration isn't working), time pressure (sprint commitment wasn't adjusted), or motivation gap (engineers don't see the relevance). Intervention: targeted 1-on-1 setup session for the non-activated engineers. If it's motivation, find the specific task in each engineer's current sprint where the tool is most likely to produce a visible win — make the first task matter.

**Week 2 signal: engineers are using the tool but only for trivial tasks.** They're using it to generate docstrings and check spelling, not for anything substantive. Diagnosis: they haven't found the high-value use cases, or they don't trust it for high-stakes tasks. Intervention: explicit guidance on task selection. Show the task suitability matrix. Have the champion show how they use it on a real substantial task.

**Week 3 signal: usage is dropping.** After initial enthusiasm, the tool is being used less in week 3 than week 2. Diagnosis: novelty wore off, deadline pressure increased, or they hit a failure they didn't recover from. Intervention: individual check-ins. Find out specifically what happened. If they hit a failure that discouraged them, work through it with them — transform the failure into a learning moment.

---

## Key Takeaways

1. Assessment before design: know the starting skill distribution, the specific gaps, and the dominant failure modes before writing a curriculum.
2. Stack-specific exercises are non-negotiable. Generic exercises produce generic skills that don't transfer to their actual work.
3. The 4-week structure (Foundation, Deepening, Integration, Self-Direction) gives enough time for behavior change while staying within the attention budget of a real engineering team.
4. Measure uptake through behavior, not attendance: activation rate, depth of use, calibration accuracy, 30-day retention.
5. Sustaining mechanisms — champion cohort, integration into existing rituals, self-assessment prompts — are as important as the program itself.
6. Three things kill programs: no management support, no protected time, and content disconnected from real work.
7. Adapt early. Week 2 signals predict week 5 outcomes. Intervene when you first see the signal, not when the program has already failed.
`,
  questions: [
    {
      id: "m15-q1",
      type: "conceptual",
      text: "Training series consistently produce strong session feedback scores but poor long-term behavior change. What is the primary structural reason?",
      options: [
        "Engineers enjoy training sessions but don't implement what they learn because they lack management support to change their established workflows",
        "Session feedback measures experience quality, not learning — and series lack the designed progression, inter-session accountability, and sustaining mechanisms that convert learning into durable behavior change",
        "Training series are too short to teach agentic tools, which require months of continuous practice before producing any measurable productivity improvement",
        "Engineers who attend training series already know the content from self-directed learning online, so sessions don't introduce genuinely new knowledge",
      ],
      correctAnswer: "Session feedback measures experience quality, not learning — and series lack the designed progression, inter-session accountability, and sustaining mechanisms that convert learning into durable behavior change",
      rubric: "Correct answer: experience quality vs behavior change gap. Session feedback scores measure how much engineers enjoyed the session — not what they learned or changed. Series fail to produce durable behavior change because: (1) no progression — each session is self-contained; (2) no inter-session accountability — commitments made in session 3 are forgotten by session 4; (3) no sustaining mechanism — when the series ends, nothing maintains the developing behavior. A program adds designed progression, accountability structure, and post-program mechanisms that bridge the experience/behavior gap.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m15-q2",
      type: "conceptual",
      text: "Why must upskilling programs be designed for the client's specific engineering culture rather than using generic best practices? Give two concrete examples of how the same program content would need to be different for a startup engineering team versus a large financial institution's engineering team.",
      rubric:
        "Strong answer: engineering culture differences that matter: risk tolerance (startup: try things, break things, move fast; bank: everything needs approval, risk is career-ending), formality (startup: informal communication, bank: everything documented and signed off), time horizon (startup: this quarter matters; bank: 5-year regulatory compliance matters), decision-making speed (startup: engineer can adopt a new tool tomorrow; bank: new tools need security review, procurement, and infosec approval); concrete examples: (1) adoption approach — startup: 'here's how to start using this today, you can self-configure'; bank: 'here's the pre-approved configuration, here's the security review sign-off, here's the infosec-approved set of permitted use cases'; generic programs assume fast adoption which fails at the bank; (2) exercise design — startup exercise: 'use Claude Code on your current sprint task, deploy the result'; bank exercise: 'use Claude Code in a sandboxed environment on a non-production codebase, document what you produced, have a peer review it before it's used anywhere'; the bank context requires a more conservative, audit-trail-compatible approach that a generic program won't include. Weak answer says 'different cultures need different approaches' without specifics.",
      maxScore: 15,
      placeholder:
        "Explain the mechanism and give two concrete contrasting examples for startup vs financial institution...",
    },
    {
      id: "m15-q3",
      type: "applied",
      text: "When designing success criteria for a 4-week upskilling program for a Python data engineering team, which approach is most likely to produce meaningful measurement?",
      options: [
        "Measure completion rate (% of engineers who attended all 4 weeks) and satisfaction score (post-program survey), as these reflect program quality and engagement",
        "Track story points completed per sprint before and after the program, since this is the standard productivity metric that management already understands and trusts",
        "Define specific thresholds tied to the team's actual work: % using the tool for their primary task types (dbt model generation, DAG debugging) by week 4, PR cycle time change for pipeline work, and time to first working draft for new models",
        "Count the number of times engineers open Claude Code per day, since usage frequency is the most direct proxy for real adoption of the new tooling",
      ],
      correctAnswer: "Define specific thresholds tied to the team's actual work: % using the tool for their primary task types (dbt model generation, DAG debugging) by week 4, PR cycle time change for pipeline work, and time to first working draft for new models",
      rubric: "Correct answer: stack-specific thresholds tied to actual work. Generic metrics (attendance, satisfaction, story points) measure the wrong things. Meaningful success criteria are directly tied to the team's actual work: adoption of the tool for their primary task types (dbt, Airflow, Snowflake), cycle time change for pipeline PRs, and time to working draft for new models. These metrics are specific enough that you can't hit them without genuine behavior change — they can't be satisfied by attending sessions or opening the tool briefly.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m15-q4",
      type: "applied",
      text: "You're 10 days into a 4-week program. Week 1 activation rate was 90% — strong start. But in week 2, you're observing that the 3 engineers who used ChatGPT before are using Claude Code in a way that treats it like a chatbot: asking one-off questions, ignoring the agentic capabilities entirely (no file reading, no multi-step tasks). The other 12 engineers are using it more appropriately. How do you diagnose why this pattern exists and what do you do about it in weeks 3 and 4?",
      rubric:
        "Strong answer diagnosis: the 3 ChatGPT users have a strong prior mental model — they interact with AI tools through single-shot prompts in a chat interface; their mental model works fine for that use case so they haven't replaced it with the agentic model; they're also the most experienced with AI tools, which paradoxically makes them harder to reskill than the 12 engineers with no prior AI experience (the 12 had no competing model to displace); what to do: (1) direct conversation with each of the three: 'you're using it like ChatGPT — let me show you what's different'; go through a specific comparison: same task done both ways, side by side, with visible difference in output quality when using agentic features; (2) design a specific exercise for week 3 that is impossible to complete well without agentic features — a task requiring reading 5 files before generating output; if they try to do it one-shot, the output will be visibly wrong; the failure creates the moment to introduce the alternative; (3) use the 12 engineers who are using it appropriately as peer teachers — have one of them pair with each of the three for an hour in week 3; peer demonstration from someone who started from the same place is more credible than SE demonstration. Weak answer just provides more training content.",
      maxScore: 20,
      placeholder:
        "Diagnose why the prior ChatGPT experience produces this specific pattern, and describe your specific interventions for weeks 3 and 4...",
    },
    {
      id: "m15-q5",
      type: "hands_on",
      text: "In a starting-point skill assessment for a development team new to agentic tools, which observation during a practical assessment task is most informative about their current calibration level?",
      options: [
        "Whether they can correctly describe the difference between Claude Code and GitHub Copilot in a pre-assessment quiz",
        "How quickly they complete the practical assessment task, since speed indicates comfort with the tooling and reduces the ramp time estimate",
        "Whether they read and evaluate the agent's output before accepting it — the critical verification behavior that distinguishes calibrated from uncalibrated users",
        "Whether they use agentic features (file reading, multi-step tasks) or only the chat interface, since feature usage indicates understanding of the tool's architecture",
      ],
      correctAnswer: "Whether they read and evaluate the agent's output before accepting it — the critical verification behavior that distinguishes calibrated from uncalibrated users",
      rubric: "Correct answer: output evaluation behavior is the most informative signal. Calibration is the skill of knowing when to trust the output and when to check it — and the observable indicator is whether engineers actually read and evaluate the output before accepting it. Engineers who accept outputs without reading them will become over-trusters; engineers who read but don't know how to evaluate will become frustrated; engineers who read and systematically evaluate are calibrated. Speed and feature usage are secondary indicators; conceptual knowledge (quiz) doesn't predict behavior.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m15-q6",
      type: "hands_on",
      text: "Design the 'sustaining mechanism package' — the set of structures, rituals, and resources you leave behind at the end of a 4-week upskilling program to prevent behavior reversion. Specify each mechanism, how it's implemented, who owns it, and how you'll know if it's working 60 days after you leave.",
      rubric:
        "Strong answer: (1) champion cohort — 2-3 engineers (identified by week 3, trained in week 4); role: answer peer questions, run monthly 30-min share-outs, onboard new team members; owner: the champions themselves with EM accountability; (2) sprint ritual integration — 'Claude Code' as a standing agenda item in sprint planning ('did you consider agent assistance for any of these tasks?') and retrospectives ('what worked / didn't work with agent-assisted work this sprint?'); owner: scrum master or EM; (3) CLAUDE.md maintenance protocol — quarterly review of the CLAUDE.md to update it as the codebase evolves; owner: tech lead; triggered by: significant new feature area, new developer onboarding, significant architecture change; (4) 60-day self-assessment prompt — automated (Slack bot or calendar reminder) at day 60; 5-question calibration self-assessment with comparison to week 4 baseline; (5) new team member integration guide — a 'Claude Code onboarding guide' for new joiners that champions are responsible for running; knowing if it's working at 60 days: activation rate still ≥70%, champions are actively fielding questions (count in Slack channel), sprint planning includes agent discussion at least 2 out of 4 sprints, new joiner was onboarded to the tool within first 2 weeks. Weak answer lists mechanisms without specifying owners or the 60-day check criteria.",
      maxScore: 20,
      placeholder:
        "Design all sustaining mechanisms with implementation detail, owners, and 60-day measurement criteria...",
    },
    {
      id: "m15-q7",
      type: "edge_case",
      text: "Midway through a 4-week program, the sponsoring engineering manager leaves and their replacement is skeptical of AI tools and has deprioritized 'learning time' for a product deadline. What is the most effective immediate response?",
      options: [
        "Continue the program as planned — the engineers' commitment to the program is independent of management sponsorship and abandoning it wastes the investment already made",
        "Pause the program and wait until after the deadline to restart — attempting to continue over management objection will create resentment that undermines long-term adoption",
        "Request a 30-minute meeting with the new manager to listen to their concerns, reframe the program in terms of the current deadline ('engineers using this are shipping faster — here's what that means for your deadline'), offer a compressed format, and protect the champion cohort regardless of the program's fate",
        "Escalate to the new manager's leadership to ensure program continuation is supported at a higher organizational level before their skepticism takes root",
      ],
      correctAnswer: "Request a 30-minute meeting with the new manager to listen to their concerns, reframe the program in terms of the current deadline ('engineers using this are shipping faster — here's what that means for your deadline'), offer a compressed format, and protect the champion cohort regardless of the program's fate",
      rubric: "Correct answer: meet, listen, reframe, adapt, protect champions. Don't continue ignoring the organizational reality or accept full cancellation without advocacy. First move: 30-minute meeting to listen, not pitch. Reframe from 'investment in future capability' to 'current sprint throughput tool' — show week 1-2 data. Offer a compressed format (2 high-ROI sessions instead of 4) to show adaptability. Get a specific 30-day check-in date for after the deadline (don't accept 'we'll see'). Most important: give the champion cohort self-direction resources now so they continue regardless of program fate.",
      maxScore: 10,
      placeholder: "",
    },
    {
      id: "m15-q8",
      type: "edge_case",
      text: "A client's upskilling program produces excellent results for 12 of their 15 engineers. The remaining 3 are consistently at the bottom of every metric and have not changed their workflow at all despite 4 weeks of the program. One is a very senior engineer who is clearly skeptical but hasn't said so directly. One is a junior engineer who seems to try but struggles to make progress. One is a mid-level engineer who seems disengaged. You are in the final week of the program. What do you do with these three individuals, and is 'success' for this program still achievable?",
      rubric:
        "Strong answer treats all three cases distinctly: Senior skeptic: schedule a 1:1 specifically to surface the unexpressed concern; frame it as: 'I've noticed you haven't found the tool useful — I'd rather hear directly what isn't working for you than leave with it unresolved'; this is the blocker pattern — they need their concern taken seriously, not managed; if their concern is substantive (the tool genuinely doesn't fit their workflow), acknowledge it and adjust the success definition; don't pressure them into compliance; their peer credibility means their skepticism, if unexpressed, will undermine the other 12 post-program; Junior who tries but struggles: this is calibration/confidence issue, not motivation; spend targeted 1:1 time identifying the specific sticking point (usually: they don't know if their output is correct because they don't have enough domain knowledge to evaluate it); the fix is to narrow their use case to areas where they can evaluate correctness; Disengaged mid-level: the most difficult case; disengagement is usually caused by something outside the program (sprint pressure, personal situation, team dynamics); a direct conversation: 'I've noticed you seem less engaged than the others — what's getting in the way?'; don't chase engagement that isn't there; success for the program: 80% adoption (12/15) is a reasonable threshold; the program can be declared successful for the 12 while acknowledging the 3 as open items with specific next steps; insisting on 100% before declaring success sets an unrealistic bar and discounts genuine achievement; strong answers also note that the senior skeptic's unresolved position is the highest-priority open item because of their influence on the other 12. Weak answer tries to apply the same intervention to all three or delays action to after the program ends.",
      maxScore: 20,
      placeholder:
        "Describe your specific intervention for each of the three engineers and define what success looks like for this program given the outcome...",
    },
  ],
};
