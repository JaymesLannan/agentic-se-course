import type { Module } from "../types";

export const module: Module = {
  id: "m11",
  track: 3,
  trackName: "Client Delivery Skills",
  order: 11,
  title: "Running Discovery",
  description:
    "Discovery frameworks, stated vs actual friction, stakeholder interview techniques, mapping the real SDLC, identifying champion/skeptic/blocker personas.",
  estimatedMinutes: 90,
  content: `
# Running Discovery

Discovery is not a formality before the real work begins. It is the real work. An agentic SE who skips or rushes discovery will spend the rest of the engagement solving the wrong problem confidently. This module covers how to conduct discovery that surfaces actual friction — not the problems the client describes in the kickoff call, but the problems that are actually slowing down their engineering organization.

---

## Why Stated Problems Are Rarely Real Problems

When a client says "we want to speed up our development process," that statement contains almost no useful information. It's a direction, not a problem. When they say "our code review cycle takes too long," that's slightly more specific but still likely a symptom of something else. The actual problem might be:

- PRs are too large because engineers don't break work down into smaller units
- Review standards aren't documented so reviewers invent requirements on the fly
- The most experienced engineers are bottlenecks because they're the only ones who can approve
- The codebase has evolved without clear ownership so everyone feels responsible for everything

Each of these has a different solution, and some of them are better suited to agentic intervention than others. An SE who accepts "slow code review" as the problem spec will build for the wrong thing.

**Why clients describe symptoms rather than causes:**
1. They're too close to the problem to see it structurally
2. The actual cause involves organizational dynamics they'd rather not name
3. They've been describing it the same way for months and it has become the received version
4. The person describing the problem isn't the person experiencing it

Your job in discovery is to decompose the stated problem until you hit something that can be acted on, measured, and where agentic tools would actually make a difference.

---

## The 5-Whys in Engineering Context

The 5-whys technique — asking "why" recursively until you reach a root cause — needs to be adapted for engineering organizations. Engineers respond to the technique literally: they give you the accurate technical answer to each "why" question, which can take you down implementation rabbit holes rather than toward the organizational root cause.

**Engineering-adapted 5-whys:**

Start with the stated problem, then alternate between "why does this happen technically?" and "why does this happen organizationally?" The organizational why is usually more revealing.

*Example:*

**Stated problem:** "Our deployment pipeline is slow — it takes three hours to deploy to production."

- Why does it take three hours? *"Because our test suite takes 2.5 hours to run."*
- Why does the test suite take 2.5 hours? *"Because we have 3,000 integration tests and no parallelization."*
- Why is there no parallelization? *"Because it was never set up and no one owns that piece of infrastructure."*
- Why does no one own it? *"Because infrastructure work isn't allocated in sprint planning — it falls between teams."*
- Why doesn't it get allocated in sprint planning? *"Because there's no engineering manager who feels responsible for cross-team tooling."*

Root cause: governance gap — no one owns cross-team tooling. The fix is not to parallelize the tests (though that's needed too) — it's to establish ownership. Agentic tools can help parallelize tests, but they can't fix the governance gap. If you build the agentic solution without surfacing the governance problem, the governance problem will surface as resistance to your solution.

---

## Who to Talk to, and in What Order

This is a rule that senior SEs violate all the time because it's uncomfortable: talk to individual contributors before managers.

**Why ICs first:**

Managers describe how things are supposed to work. ICs describe how things actually work. The delta between those two descriptions is where you'll find most of your discovery gold.

Managers have also usually filtered the problem statement through their own political context — they've already smoothed over the parts that make their team look bad, deprioritized the problems that reflect poorly on their decisions, and amplified the problems they've been trying to get budget for.

ICs haven't done that filtering yet (or they have, but in the opposite direction — they'll tell you what's actually painful even if it's uncomfortable).

**Interview order:**

1. **Individual contributors** (2-3 engineers who are doing the day-to-day work)
2. **Technical leads / staff engineers** (who see both the implementation and the system)
3. **Engineering managers** (who see the organizational context and business constraints)
4. **Product managers or other stakeholders** (for context on business pressure that drives technical decisions)

Don't start with the manager who approved the engagement. That conversation will color everything you hear afterward.

---

## Discovery Interview Structure (60 Minutes)

A discovery interview is not a survey. You have a structure, but you follow the thread when something interesting surfaces. The goal is to build a model of how this engineer experiences their day, not to fill in a form.

**0:00–0:10 — Warm up and context**

Start by orienting them: you're trying to understand their current workflow, not evaluate their work or their team. Everything they tell you is useful. Ask:

- What's your role, and how long have you been on this team?
- What does a typical day look like?
- What are you working on right now?

You're listening for: daily rhythm, the tasks that take most of their time, whether they describe their work in terms of features or technical work.

**0:10–0:30 — Friction mapping**

Ask about the things that slow them down. Do not use the word "pain points" — it's overused and produces canned answers. Instead:

- "What's the thing you did last week that took longer than it should have?"
- "If you could eliminate one step in your current workflow, what would it be?"
- "When do you find yourself context switching in a way that breaks your flow?"
- "What do you do over and over again that feels like it shouldn't be a manual process?"

Let them talk. When they mention something specific — a task, a tool, a process — go deeper: "How often does that happen? How long does it take? What does the rest of your day look like after you've done it?"

**0:30–0:45 — Current tool usage**

Now you can introduce the topic of existing tools:

- What tools are you using for X? (Replace X with something specific they mentioned)
- What do you use them for? What don't they do well?
- Have you tried any AI-assisted tools? What did you think?

Listen for: frustration with existing tools, workarounds they've invented, tools they use that weren't officially adopted (shadow IT), attitudes toward AI tools specifically.

**0:45–0:55 — Agent-readiness probes**

Without using the word "agentic" or "AI agent," probe for the conditions that make agent deployment successful:

- "How well-documented is your development process? If a new engineer joined tomorrow, where would they learn how to work in this codebase?"
- "How do you handle tasks that require reading a lot of context before you can do anything? Like onboarding to a new part of the codebase?"
- "If a tool could do one step of your workflow automatically and hand you the result, which step would you most trust it to do? Which would you least trust?"

That last question is gold. The tasks they least trust the tool to do autonomously are where the human-in-the-loop checkpoints need to be.

**0:55–1:00 — Close**

- "What have I not asked you about that would be useful for me to know?"
- "Is there anyone else on the team whose perspective I should hear?"
- "What would a win look like for you personally from this engagement?"

That last question separates what the organization wants from what the individual wants. Often they're aligned. Sometimes they're not — and that gap is important.

---

## Reading Between the Lines in Stakeholder Interviews

Engineers are often indirect about the things that matter most. Here are common patterns and what they signal:

**"It's fine, it works"** — usually means "I've given up hoping for it to be better." This is a sign of learned helplessness about a specific tool or process. It often reveals the highest-friction areas, not the lowest.

**"Oh, that's just how it is here"** — normalization of something that is, by objective measure, unusual. Follow up: "How does that compare to how it worked at your previous company?"

**"We tried X before and it didn't work"** — important. This tells you: (a) they have a prior experience that will color their reaction to any similar proposal; (b) there's a failure to analyze and explain why it didn't work. Ask: "What do you think went wrong with that?" Their answer reveals their mental model of what success requires.

**"You'd have to ask [manager name] about that"** — when an IC refers you to a manager for an operational question (not a strategic one), it signals either that the manager is unusually involved in day-to-day work, or that there's a political dimension to the question they don't want to navigate.

**Enthusiastic description of a workaround** — when an engineer describes a manual process they've invented to work around a tool's limitations, and they're proud of it, that workaround is where agentic value lives. They've already identified the gap. The workaround is an agent specification in disguise.

---

## Identifying Where Agents Create Value vs Where Clients Think They Will

Clients often believe agents will help most with the most visible and frustrating problem. That belief is sometimes right and sometimes deeply wrong.

**Where agents actually create value:**

- High-frequency, low-complexity repetitive tasks (generating boilerplate, running standard checks, creating consistent documentation)
- Context-heavy tasks that require reading many files before writing anything (cross-repo refactors, onboarding new engineers to a codebase, incident analysis)
- Tasks that are currently bottlenecked by a single person or team (code review from a principal engineer, security review, compliance checks)
- Tasks that have clear output specifications but variable inputs (turning a spec into a test plan, converting test results into a status report)

**Where agents struggle:**

- Tasks that require deep organizational context that isn't written down anywhere
- Tasks where the quality bar is not clearly defined (subjective design decisions)
- Tasks where the cost of a confident-but-wrong answer is catastrophic (production infrastructure changes without review gates)
- Tasks that are actually management problems masquerading as engineering problems (prioritization, requirements clarity)

**The discovery question that separates these:** "If an agent did this task and produced the result — who would review it, how long would that review take, and what would they be looking for?" A long or vague answer to that question usually means the task isn't ready for agentic automation yet.

---

## The Difference Between Friction and Inefficiency

This distinction is often missed and it matters enormously for scoping.

**Friction** is a step in a workflow that is harder than it needs to be — a process that has unnecessary complexity, a tool that doesn't integrate with adjacent tools, a requirement for approval that could be automated. Friction is localized and usually addressable.

**Inefficiency** is spending time on work that doesn't create the intended value — building features no one uses, running tests that don't cover the right surface area, maintaining documentation nobody reads. Inefficiency is structural and usually requires process or organizational change.

Agents can reduce friction much more effectively than they can fix inefficiency. If an engineering team is spending 20% of their time on a process that produces no value, giving them an agent to do that process faster makes the inefficiency more efficient, not less wasteful. The right answer to inefficiency is usually "stop doing the thing," not "do the thing faster with an agent."

In discovery, when you identify something that takes a lot of time, ask: "What happens if this doesn't get done?" If the answer is "nothing important changes," you've found an inefficiency, not friction.

---

## Mapping the Current SDLC with Agent Blindspots

A key discovery deliverable is a map of the engineering team's actual software delivery lifecycle. Not the one on their Confluence page, but the one that happens in practice.

**How to map it:**

1. Ask an IC to walk you through the last feature they shipped, from first commit to production
2. Document every step, every handoff, every tool, every wait
3. Note: where does work sit waiting for someone? Where does context get lost between tools? Where do humans have to translate between systems?

**The agent blindspots you're looking for:**

- **Context collapse points:** where does the information someone needs to do their job not follow them from one step to the next? (A PR description that doesn't include the Jira ticket context that explains why this change was needed)
- **Repetitive translation steps:** where does someone manually take output from one system and enter it into another? (Copy test results from CI into a status update)
- **Bottleneck humans:** whose review or approval is consistently on the critical path? And what percentage of their review time is judgment vs mechanical checking?
- **The "tribal knowledge" zone:** what knowledge is required to work in this codebase that isn't written down anywhere and can only be learned by asking someone?

Agents can directly address the first two. They can partially address the third (by doing the mechanical checking part of a bottleneck human's job). They are not effective at the fourth — and efforts to deploy agents in the tribal knowledge zone will produce unreliable results.

---

## Persona Identification: Champion, Skeptic, Blocker, Passenger

Every engineering organization has these four personas in some proportion. Identifying them before you finish discovery determines how you structure the engagement.

**The Champion**
Excited about the technology, probably already experimenting, wants to see it succeed, will advocate for it internally. Usually a mid-level engineer or tech lead who's forward-looking and has some influence. Risk: over-reliance on the champion as your only internal advocate — if they leave or change teams, the engagement loses its engine.

**The Skeptic**
Doubtful but intellectually engaged. Will ask hard questions and evaluate answers carefully. Is open to changing their mind if they see compelling evidence. This is your second most important relationship. Converting a skeptic creates the most credible internal advocacy — because their peers know they had to be convinced.

**The Blocker**
Not just skeptical but actively resistant. May use their organizational position to slow or prevent adoption. This is often a senior engineer or architect who sees agentic tools as a threat to the expertise that defines their status, or a manager who sees the engagement as a criticism of their team's current practices. You don't convert blockers with demos or evidence. You convert them by making their concerns concrete, taking them seriously, and designing the solution in a way that addresses those concerns — ideally involving them in the design.

**The Passenger**
Neither for nor against. Will use whatever they're told to use and will stop using it as soon as the mandate relaxes. Passengers are a majority in most organizations. Don't mistake their absence of resistance for support. They need the tool to be meaningfully better than their current workflow, not just available.

**Discovery action:** During your interviews, map each person you talk to to one of these personas. Before ending discovery, make sure you've identified at least one champion and understand the blockers. If you can't name the blockers, you haven't dug deep enough.

---

## The Discovery Output Document

Discovery culminates in a document that becomes the foundation for the rest of the engagement. It should include:

**1. Actual problem statement** (not the stated one — the root cause version, with your reasoning from discovery)

**2. SDLC map** (the real one, with bottlenecks and context collapse points marked)

**3. Agent opportunity matrix** — a table listing every candidate use case with: potential value, implementation complexity, agent-readiness score (1-5), and recommendation (pursue / defer / deprioritize)

**4. Persona map** — who's a champion, who's a skeptic, who's a blocker, and your recommended engagement strategy for each

**5. Risk register** — what could prevent this engagement from succeeding, and what would need to be true for the risk to materialize

**6. Proposed scope** — what the engagement will actually address, given the above

This document is not a proposal. It's a diagnosis. It should feel like a doctor's assessment: here's what's actually going on, here's what would actually help, here's what we recommend. The client should read it and feel that you understand their situation better than their previous framing did.

---

## Key Takeaways

1. Stated problems are symptoms. Discovery's job is to surface root causes through recursive questioning and cross-referencing multiple perspectives.
2. Talk to ICs before managers — managers describe how things should work; ICs describe how things do work.
3. The 5-whys needs both a technical and organizational track to be effective in engineering contexts.
4. Friction (steps that are unnecessarily hard) is amenable to agent intervention; inefficiency (work that doesn't produce value) is usually a process or organizational problem first.
5. Four personas — champion, skeptic, blocker, passenger — require different engagement strategies. Identify all four before ending discovery.
6. The discovery output document is a diagnosis, not a proposal. It should reframe the problem, not just validate the client's initial description of it.
`,
  questions: [
    {
      id: "m11-q1",
      type: "conceptual",
      text: "Explain the distinction between friction and inefficiency in a software development context. Why does this distinction matter for deciding where to apply agentic tools, and what happens when you get it wrong?",
      rubric:
        "Strong answer: friction = a step that is harder than it needs to be, localized, addressable (e.g., a manual step that could be automated, a tool with a bad interface for a specific task); inefficiency = spending time on work that doesn't produce the intended value (building unrequested features, maintaining unread documentation, running reviews that don't change outcomes); agents reduce friction effectively by making hard things easier; they cannot fix inefficiency — they make the inefficiency faster, which may even be counterproductive by increasing the output of valueless work; when you get it wrong you build an agent to generate documentation nobody reads faster, or to process a queue of tickets that should never have been created; the diagnostic question is 'what happens if this step doesn't get done?' Weak answer treats friction and inefficiency as synonyms or only gives one example.",
      maxScore: 15,
      placeholder:
        "Define both terms, explain the mechanism of each, and describe what happens when you misidentify one as the other...",
    },
    {
      id: "m11-q2",
      type: "conceptual",
      text: "Why should discovery interviews with individual contributors happen before interviews with engineering managers, and what specific kinds of information does each population give you that the other cannot?",
      rubric:
        "Strong answer: ICs give you the unfiltered operational reality — how work actually moves, what's actually painful, what workarounds have been invented, how tools are actually used vs how they were intended to be used; managers give you the organizational context and strategic constraints — budget pressures, political dynamics between teams, why certain decisions were made; the order matters because managers' accounts are filtered through political and narrative considerations: they protect their team, emphasize the problems they want solved, and describe a cleaner version of reality than exists; if you talk to managers first, their framing contaminates your IC interviews — you'll ask different questions and interpret answers differently; additionally, ICs will tell you things in confidence that they'd never say in front of their manager; strong answers also note that the delta between IC account and manager account is itself discovery data — it reveals where there are perception gaps that will affect the engagement. Weak answer says 'to get different perspectives' without explaining what each perspective uniquely contains.",
      maxScore: 15,
      placeholder:
        "Explain the order rule, what each population gives you that the other cannot, and why the order matters mechanically...",
    },
    {
      id: "m11-q3",
      type: "applied",
      text: "You're 30 minutes into a discovery interview with a senior backend engineer. She's told you about several challenges, but when you ask about their code review process, she says 'Oh, that's fine — code review works well here, I don't have any complaints.' Your pre-interview research showed that the team's PR cycle time is 6 days on average and two other engineers you've interviewed have mentioned getting 'blocked' in review. How do you handle this moment in the interview?",
      rubric:
        "Strong answer: recognizes 'it's fine' as a possible signal of normalization or political sensitivity, not necessarily accurate data; does not argue with her or cite the statistics (that would put her on the defensive); instead: probe with specifics, not abstractions — 'when your PR sits for a while, what usually causes that? What kinds of things tend to slow it down?'; try the cross-company comparison — 'how does this compare to how it worked at [previous company]?'; try the hypothetical elimination — 'if you could change one thing about how PRs move here, what would you change?'; also consider that she's not wrong from her perspective — senior engineers often have faster cycle times because they get reviewed by peers; the 6-day average may be driven by junior engineers who aren't surfacing their experience to her; note that discrepancy between her account and the data / other interviews is itself a finding: PR process may have a seniority-stratified experience that's invisible at the senior level. Weak answer accepts her answer at face value or directly contradicts her.",
      maxScore: 20,
      placeholder:
        "Describe your in-the-moment technique and what finding you extract from this discrepancy...",
    },
    {
      id: "m11-q4",
      type: "applied",
      text: "A client's VP of Engineering describes the problem as: 'We need to move faster — our competitors are shipping features weekly and we're on a monthly cadence. We think AI coding tools will help.' After three IC interviews, you've found that: (1) the team's monthly cadence is driven by a mandatory QA signoff process that takes 2 weeks; (2) the QA team is separate and understaffed; (3) engineers are actually quite fast at writing code. Draft the reframed problem statement you'll present in the discovery output, and explain which agentic interventions are relevant and which aren't.",
      rubric:
        "Strong answer: reframed problem statement centers on the QA bottleneck, not development speed: 'The engineering team's shipping cadence is constrained by a two-week QA signoff process driven by understaffing, not by development velocity. Increasing development speed with AI coding tools without addressing the QA bottleneck will produce more code waiting in a longer queue'; agentic interventions that are relevant: test generation (agents can write the test suite that engineers currently write manually, reducing QA's manual testing burden), automated test coverage analysis, automated regression testing that runs continuously rather than batched at the end of a sprint; agentic interventions that are not relevant: code generation for feature work (engineers are already fast), PR description generation (not on the critical path); the recommended engagement starts at the QA bottleneck, not at development tooling; also flags the staffing gap as something outside the agentic engagement's scope but important to name. Weak answer suggests AI coding tools to speed up development without questioning the framing.",
      maxScore: 20,
      placeholder:
        "Write the reframed problem statement and specify which agentic interventions are in/out of scope and why...",
    },
    {
      id: "m11-q5",
      type: "hands_on",
      text: "Write a complete 60-minute discovery interview script for an individual contributor engineer. Include: your opening framing, the specific questions for each phase (warm-up, friction mapping, tool usage, agent-readiness probes, close), and your follow-up probes for the most important moments. Also note what you're listening for with each question — not just asking, but what signals the answer might contain.",
      rubric:
        "Strong answer is specific and usable — a practitioner could run this interview verbatim; warm-up questions establish context and build rapport without leading; friction mapping avoids 'pain points' language, uses specific-task questions ('what did you do last week that took longer than it should'); tool usage section asks about actual tools with follow-up on workarounds; agent-readiness probes use indirect language (don't mention AI agents, ask about trust in automation); close includes 'what have I not asked' and 'who else should I talk to' and 'what would a win look like for you personally'; follow-up probes are specific — when engineer says 'it's fine,' the probe is 'what would better look like?' not 'are you sure?'; the 'what are you listening for' notes are substantive — for the friction mapping section, listening for: repetition cues (they mention the same tool/process twice), normalization language ('that's just how it is'), workarounds described enthusiastically. Weak answer is a generic interview guide without the agent-readiness probes or the 'what you're listening for' dimension.",
      maxScore: 20,
      placeholder:
        "Write the complete interview script with all phases, specific questions, probes, and listening notes...",
    },
    {
      id: "m11-q6",
      type: "hands_on",
      text: "Design a discovery output document template for an agentic SE engagement. Include all sections, what content goes in each, and for each section, write one example entry based on this scenario: a fintech company, 40 engineers, 6-day PR cycle time, monthly releases, stated problem 'we want to use AI to go faster', actual root cause you've identified is a combination of large PRs (no PR size discipline) and a single principal engineer who's the only required approver for anything touching payments code.",
      rubric:
        "Strong answer document includes: (1) actual problem statement — not 'go faster' but 'PR cycle time is inflated by two compounding factors: large PRs that require extensive review and a single-approver bottleneck on payments-related changes; the bottleneck is both a process risk and a knowledge concentration risk'; (2) SDLC map — sketch of the actual flow from ticket to production with the bottleneck nodes marked at PR submission and payments review; (3) agent opportunity matrix — table with columns: use case / value / complexity / agent-readiness / recommendation; entries might include: PR summary generation (high value, low complexity, high readiness, pursue), automated PR size check with decomposition suggestions (medium value, medium complexity, high readiness, pursue), automated payments code review pre-screen to reduce principal engineer's queue (high value, high complexity, medium readiness, defer); (4) persona map — champion: mid-level engineer who's already using Copilot; skeptic: the principal engineer who is the bottleneck; blocker: none identified; passenger: most of the team; (5) risk register: principal engineer resistance if they perceive the agent as replacing their role; (6) proposed scope: tackle PR size discipline first, then review automation. Weak answer is generic without the scenario-specific content or missing multiple sections.",
      maxScore: 20,
      placeholder:
        "Write the complete document template with example content from the fintech scenario for each section...",
    },
    {
      id: "m11-q7",
      type: "edge_case",
      text: "Three days into discovery, you realize that the client's stated problem ('our deployment pipeline is slow') is a red herring. The real problem is that their product manager is writing requirements so vague that engineers spend 40% of their time in clarification meetings and building things that get rejected at demo. This is a people and process problem, not an agentic tools problem. How do you handle this situation?",
      rubric:
        "Strong answer: does not bury the finding or pivot to a different scope to protect the engagement; surfaces the finding clearly in the discovery output with evidence from the interviews; acknowledges the scope boundary: agentic tools can help with some parts of this (requirements disambiguation, generating clarifying questions from a spec, structured requirement templates), but the core problem is a product/engineering collaboration process issue that requires process change and possibly coaching; gives the client an honest choice: (1) address the root cause first, which is outside the current engagement scope but should be prioritized; (2) build agentic tools that help engineers navigate the vague requirements better (a more limited intervention); recommends option 1 while offering option 2 as a partial mitigation; notes that deploying agentic development tools into an environment with unclear requirements will generate bad output faster — which is worse, not better. Shows the ethical dimension: the right answer for the client may not be the answer that keeps the engagement going. Weak answer suggests building AI tools for the requirements process without acknowledging that the problem is organizational, not technical.",
      maxScore: 20,
      placeholder:
        "Explain how you surface this finding, what options you give the client, and what you recommend...",
    },
    {
      id: "m11-q8",
      type: "edge_case",
      text: "You're midway through discovery interviews when a junior IC pulls you aside and says, off the record: 'The real problem here is that the CTO writes requirements and they're always wrong, but nobody tells him.' This is valuable discovery information, but it came in confidence and implicates the most senior technical leader at the company. How do you handle this information ethically and practically?",
      rubric:
        "Strong answer: acknowledges the ethical tension immediately — the engineer confided in you, and breaching that confidence damages your relationship with ICs (the people whose trust you most need); does not surface the IC's name or the specific conversation in any document; however, the pattern itself — requirements quality is the root problem, and the source of requirements has organizational protection — is a legitimate discovery finding that you can surface without attributing it to the IC; approach: (1) test the finding independently — look for other evidence that requirements quality is the problem; check whether other ICs (without prompting) mention clarification cycles, rejected features, or demo failures; (2) frame the finding as a pattern, not a confession — 'discovery interviews reveal that clarification cycles are a significant source of delay, with multiple engineers independently noting that requirements are often revised after implementation has started'; (3) in the discovery output, present the root cause (requirements quality) and its systemic impact without naming the CTO or the IC; (4) in the stakeholder conversation, present the finding to the engineering manager and let them navigate the upward political dimension — that is their job, not yours; strong answers also note the structural dimension: if the CTO is also the blocker, the engagement's success depends on either converting the CTO or managing around the political constraint; this is a significant engagement risk that belongs in the risk register — framed as 'organizational dependency on a single decision-maker for requirements quality' rather than 'the CTO is the problem.' Weak answer either surfaces the IC's identity or buries the finding entirely.",
      maxScore: 20,
      placeholder:
        "Describe how you handle the confidence, how you use the information ethically in your discovery output, and what you do with the political dimension...",
    },
  ],
};
