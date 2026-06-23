import type { Module } from "../types";

export const module: Module = {
  id: "m14",
  track: 4,
  trackName: "Upskilling & Practice Building",
  order: 14,
  title: "Teaching by Doing",
  description:
    "Why lectures don't work for this, the demo-then-drive pattern, live coding with clients, failure as a teaching tool, calibrating to skill level in real time.",
  estimatedMinutes: 90,
  content: `
# Teaching by Doing

Teaching agentic tools is not like teaching a programming language or a framework. A developer learning React can follow a tutorial, understand the API, and then build something. They can test their understanding against the documentation. There are right answers.

Agentic tools are different. Proficiency with Claude Code or any agent-first development environment is not about memorizing commands or understanding an API. It's about developing judgment — knowing when to use the tool, how to prompt it, how to evaluate its output, and when to override it. Judgment cannot be lectured into someone. It has to be developed through experience, failure, and calibration.

This module covers why traditional teaching approaches fail for this domain, how to structure learning experiences that actually produce judgment, and how to manage the practical complexity of teaching a live, nondeterministic system.

---

## Why Traditional Training Fails for Agentic Tools

The traditional training model for software tools is: concept explanation → demonstration → exercise → assessment. This model works well when the tool has a defined correct-use pattern. It fails for agentic tools for several reasons:

**The tool is nondeterministic.** Two people giving the same prompt will get different outputs. An exercise built around "now you should see X" will fail when someone sees Y. The traditional model assumes consistent outputs. Agents don't provide them.

**The skill is not transferable from observation.** Watching someone use an agentic tool competently produces almost no transferable skill. The practitioner's competence looks like magic — they seem to know what to prompt, when to push back, when to accept the output. What's invisible is the judgment they've developed through hundreds of sessions. You can't transfer that through observation.

**The failure mode is not obvious.** In programming, an error usually produces an error message. With agents, an incorrect output often looks correct — it's well-formatted, confident, and syntactically valid. Trainees who haven't developed critical evaluation skills will accept incorrect outputs without noticing. Training must therefore develop evaluation skills, not just generation skills.

**Prior experience creates the wrong mental model.** Engineers who have used autocomplete tools (Copilot, Tabnine) have a mental model that predicts token completion, not agentic action. This mental model causes them to underuse agentic capabilities and be surprised by failures that don't fit the autocomplete pattern. Training needs to replace the mental model, not just add new knowledge.

**Motivation is different.** Learning a new framework is usually instrumentally motivated — it will help me ship the feature. The motivation for learning agentic tools is often extrinsic — my manager said I should learn this, or the company is adopting it. Extrinsic motivation produces compliance, not genuine uptake. Training must create intrinsic motivation through early wins that produce genuine value for the learner.

---

## The Psychological Barrier: Learned Helplessness vs Trust

There are two psychological failure modes in agentic tool adoption, and they're opposite:

**Learned helplessness** occurs when an engineer has had several experiences of using an agent and being burned — the output was wrong, they trusted it, they shipped a bug. The response is to stop trusting the tool. They use it minimally, check every output obsessively, and get none of the productivity benefit. This engineer has learned that the tool can't be trusted, and their experience is not wrong — they just haven't learned the calibration skill that tells them when to trust and when to check.

**Over-trust** occurs when an engineer is enthusiastic about the technology, delegates too much, and doesn't develop the critical evaluation muscle. They accept confident-sounding outputs without evaluating them. The tool produces bugs they don't catch. This engineer has learned the wrong lesson from early positive experiences — they've concluded the tool is reliable rather than that the tool worked in those specific cases.

Both failure modes come from the same root: engineers haven't learned to calibrate trust based on task type, context, and output characteristics. Teaching calibration is the primary goal of any training in this domain.

**What calibration looks like:**

A calibrated practitioner has specific, articulated beliefs about when the tool is reliable and when it isn't. For example: "I trust Claude Code to write test cases for functions I describe clearly, because I can verify correctness by running the tests. I don't trust it to make architectural decisions, because the evaluation criteria are too implicit and the cost of a wrong decision is high." That kind of specific belief is the outcome we're building toward.

---

## The Demo-Then-Drive Structure in Training Contexts

The demo-then-drive structure (introduced in the pairing module) applies to training contexts too, but with specific adaptations for group settings:

**Demo phase (10-15 minutes):**
Demonstrate a complete task, narrated. The narration is critical — it externalizes the internal decisions: "I'm choosing this phrasing because I want Claude to read the actual file, not guess at its contents. I'm being explicit about the output format because if I leave it unspecified, I'll need to do cleanup afterward." Trainees should be listening for the decisions, not watching the keystrokes.

At the end of the demo, ask: "What decisions did you notice me making? What might you have done differently?" This activates their analytical attention and surfaces their initial mental model, which you can then address.

**Drive phase (20-30 minutes):**
Trainees work on the same task (or a closely related one) on their own machines, with you circulating. The task should be:

1. Real enough to matter: something from their actual work context, or a close simulation of it
2. Small enough to complete: the feedback loop needs to close within the session
3. Hard enough to require judgment: if the task is trivially easy, no judgment is developed
4. Forgiving enough to fail in: the cost of a wrong output should be low (they're not deploying to production)

**Key insight: the task design is the training design.** A poorly chosen task will produce no learning regardless of how well you facilitate. Spend as much time designing the exercise as you spend on the demo.

---

## Designing Exercises That Create the 'Aha' Moment

The 'aha' moment in agentic tool training is the moment a trainee realizes the tool can do something they genuinely didn't know was possible. Not a demo — their own discovery, in their own context.

**What produces the aha moment:**

1. **A task they couldn't have done efficiently before:** The exercise should target something the trainee either avoids because it's tedious or can't do well because it requires synthesizing too much context. When the agent handles it cleanly, the contrast is visceral.

2. **Discovery rather than instruction:** The trainee should find the capability themselves, not be told about it. The exercise should be designed so the natural solution path reveals the capability. You don't say "here's a cool thing Claude can do." You give a task that requires the capability and let them discover it's available.

3. **Failure followed by recovery:** Build a step into the exercise where the agent's first output is wrong, and the trainee needs to diagnose why and correct it. The recovery teaches more than the success. "Oh, I see — I didn't give it enough context about the database schema, so it guessed wrong about the field names" is a durable insight that changes future prompting behavior.

**Exercise structure that works:**
- Part 1: a task where the agent handles everything (builds confidence)
- Part 2: a task where the agent's first attempt is partially wrong (builds evaluation skill)
- Part 3: a task where the agent can't fully solve it and needs significant human judgment (builds calibration)

The three parts together produce a calibrated understanding: the tool is powerful, it fails in specific ways, and the human's judgment is irreplaceable in specific contexts.

---

## Handling Different Skill Levels in the Same Room

Group training almost always has a skill distribution. In a team of ten, there will be one or two engineers who have already experimented with agentic tools and are ahead of the group, five or six who are starting from scratch, and one or two who are resistant or skeptical.

**The trap: pacing to the middle**

If you pace the training to the average skill level, you lose the advanced engineers (bored and disengaged) and leave the beginners behind (overwhelmed and unwilling to ask questions). Most traditional training falls into this trap.

**What works instead: structured parallel tracks**

Design exercises with a base track and an extension. The base task is doable by the beginners. The extension track is a harder version of the same problem that the advanced engineers can explore while you help beginners. After 20 minutes, reconvene and have the advanced engineers present what they found on the extension track. This creates peer teaching (high trust) and keeps everyone engaged.

**Use the advanced learners as facilitators**

During the drive phase, identify the engineers who are progressing fastest and ask them (privately, so it doesn't embarrass the others) to help the people near them who are stuck. This distributes your facilitation capacity and builds the advanced learners' explanatory understanding.

**Name the variation explicitly**

"People in this room are starting from different places — that's expected and fine. If you find yourself waiting for something to do, there's an extension task on the next page. If you're stuck, wave and I'll come to you." Making the variation visible removes the shame from struggling.

---

## Using Live Failures as Teaching Moments

Live failures — when the agent produces a wrong, surprising, or incoherent output during training — are the highest-value teaching moments in the session. They are also the moments most facilitators mishandle.

**What facilitators usually do with a live failure:**
- Apologize
- Skip past it quickly
- Try to explain the failure away
- Blame it on an unusual case

**What you should do:**

**Step 1: Name it without embarrassment.** "Okay, this is wrong. Let's figure out why." Matter-of-fact tone. No apology. No drama.

**Step 2: Diagnose it out loud.** "What was in the prompt? What did we ask it to do? What did it actually do? What's the gap?" Walk through the diagnosis with the group. This teaches the diagnostic skill, not just the fix.

**Step 3: Fix it (or explain why you can't).** Try a different prompt. Add context that was missing. Change the task framing. If you can fix it in two minutes, do it. If you can't, acknowledge it: "This is a genuine limitation — the model doesn't have enough context about your internal data model to get this right. The fix is to include a schema excerpt in the prompt. I'll note this as something we should set up in your CLAUDE.md."

**Step 4: Extract the durable lesson.** "So what this tells us is: whenever we're asking the agent to work with internal data structures it hasn't seen, we need to provide the schema. That's a rule of thumb you can apply going forward."

The failure goes from being an embarrassing glitch to being a lesson that advances everyone's calibration. Engineers remember the failures more vividly than the successes. Make them count.

---

## The Debrief Pattern

Every exercise should be followed by a structured debrief. The debrief is not "how did it go?" — that produces vague answers. The debrief is structured to surface specific learning.

**Four-question debrief (10 minutes):**

1. "What worked? Describe a specific moment where the agent's output was useful." (Makes the success concrete, not generic)

2. "What failed? Describe a specific moment where the output was wrong or unhelpful." (Normalizes failure, surfaces calibration data)

3. "What did you do to fix it or work around it? Did it work?" (Teaches that failures have recovery paths, not dead ends)

4. "What will you do differently next time? Finish this sentence: 'The next time I do a task like this, I'll...'." (Converts learning to behavior change intention)

The debrief answers that come out of question 4 are the closest thing you have to a learning outcome in the session. If trainees can't complete the sentence, they haven't learned something durable. If they can, you have a leading indicator that behavior will change.

---

## Measuring Whether Learning Is Happening During the Session

Traditional training measures learning after the session (quiz, assessment). For agentic tools, you need to measure during the session, because the session is when you can intervene.

**Real-time signals that learning is happening:**
- Trainees are suggesting prompts without being asked
- Trainees are evaluating outputs critically (questioning, not just accepting)
- Trainees are diagnosing failures without prompting from you
- Trainees are connecting what they're seeing to their actual work ("this would help with that thing I always have to do on Mondays")
- The advanced learners are helping their neighbors
- The quiet trainee (usually a beginner or skeptic) asks their first question

**Real-time signals that learning is stalling:**
- Trainees are copying your prompts verbatim rather than adapting them
- Trainees are accepting all outputs without evaluation
- Eyes drifting to phones during the drive phase
- The exercise is taking much longer than expected (stuck, not challenged)
- The exercise is completing much faster than expected (too easy)

When you see stalling signals, intervene: change the task, change the pacing, check in individually with the stuck trainee. Don't wait for the end of the session to notice that someone didn't learn anything.

---

## The Follow-Up That Sustains Behavior Change

Training without follow-up produces a short-lived behavior change. Engineers are enthusiastic after a good session and return to their old habits within 1-2 weeks as deadline pressure returns. The follow-up is what separates a session that produces lasting change from one that produces a good experience score.

**Effective follow-up structure:**

Within 24 hours of the session: send each trainee a brief personalized note. Reference something specific they did or said in the session. This reinforces that the session was about them, not about the technology. Include one specific task they said they'd try.

Day 3: a short check-in (Slack message or brief call): "Did you get a chance to try X? What happened?" This keeps the commitment alive during the period when deadline pressure is highest.

Week 2: a group share-out (30 minutes, optional but incentivized): each engineer who tried something reports back. What task did they use it for? What happened? This peer sharing is more motivating than any facilitated session — hearing that a colleague used it on a real sprint task and it worked is the most credible evidence available.

Week 4: metrics check-in with the engineering manager. Is the tool showing up in PR comments, commit messages, or workflow? This closes the accountability loop at the organizational level.

**The single biggest follow-up mistake:** telling people what to practice rather than asking them to commit to what they'll practice, in their own words, before the session ends. Commitments made by the trainee are 3-5x more likely to result in behavior change than commitments assigned by the trainer.

---

## Key Takeaways

1. Traditional training (lecture, demo, exercise, assessment) fails for agentic tools because the tool is nondeterministic, the skill is judgment not knowledge, and the failure mode is not obvious.
2. The primary training goal is calibration — developing specific, articulated beliefs about when to trust the tool and when to check it.
3. Demo-then-drive is the core teaching structure. The demo externalizes decisions; the drive develops judgment through first-person experience.
4. Exercise design is training design. A task that's too easy develops no judgment; a task that's too hard develops learned helplessness.
5. Live failures are the highest-value teaching moments. Name them without embarrassment, diagnose them publicly, extract the durable lesson.
6. Measure learning during the session (real-time signals) not just after. Intervene when you see stalling.
7. Follow-up sustains behavior change. Engineer commitment to a specific next step, made in their own words, before the session ends.
`,
  questions: [
    {
      id: "m14-q1",
      type: "conceptual",
      text: "Explain why teaching agentic tools through observation and lecture is structurally insufficient, even when the demonstration is excellent. What is the specific cognitive process that needs to be developed and why observation alone cannot develop it?",
      rubric:
        "Strong answer: the cognitive process is calibration — developing specific, articulated beliefs about when to trust the tool's output and when to check or override it; observation doesn't develop calibration because calibration is built through first-person decisions and their outcomes, not through watching someone else make decisions; when you watch an expert, you see the decisions (choice of prompt, evaluation of output) but not the judgment process behind them — the expert makes it look natural and you can't decompose what you're seeing into transferable rules; additionally, the tool is nondeterministic — watching one session doesn't tell you what you'll see in your session; and the failure mode is non-obvious — agents produce confident wrong outputs that look correct, so you can't learn to spot failures by watching someone else run the tool; finally, observation produces vicarious confidence ('I've seen someone do this') which is psychologically similar to real confidence but doesn't transfer to actual performance. Weak answer says 'you learn by doing' without explaining the mechanism.",
      maxScore: 15,
      placeholder:
        "Name the specific cognitive process, explain why it requires first-person experience, and describe the mechanism of failure in observation-based training...",
    },
    {
      id: "m14-q2",
      type: "conceptual",
      text: "Describe the two psychological failure modes in agentic tool adoption (learned helplessness and over-trust) and explain why they both stem from the same root cause. What does a practitioner who has avoided both failure modes look like, and what does their training experience need to contain?",
      rubric:
        "Strong answer: learned helplessness — engineer has been burned by wrong outputs, stops trusting the tool, uses it minimally, gets none of the productivity benefit; over-trust — engineer is enthusiastic, delegates too much, accepts confident-sounding outputs without evaluation, ships bugs; same root cause: neither engineer has learned calibration — the skill of making specific, context-dependent trust decisions; the burned engineer over-generalized from bad experiences ('the tool can't be trusted'); the enthusiastic engineer over-generalized from good experiences ('the tool is reliable'); both are applying a blanket trust level instead of a task-specific trust level; a practitioner who has avoided both failure modes: can articulate specific conditions under which they trust the tool (e.g., 'for test generation when the function contract is clear') and specific conditions where they don't (e.g., 'for architectural decisions where the evaluation criteria are implicit'); training must contain: exercises where the tool succeeds (builds appropriate trust), exercises where the tool fails in detectable ways (builds evaluation skill), and exercises where the failure is subtle (builds skepticism calibration). Weak answer treats the two failure modes as separate problems rather than stemming from the same root.",
      maxScore: 15,
      placeholder:
        "Define both failure modes, identify the shared root cause, describe the calibrated practitioner, and specify what training must contain...",
    },
    {
      id: "m14-q3",
      type: "applied",
      text: "You're running a 3-hour training session for 12 engineers at a fintech company. Halfway through the drive phase, the agent produces an output that is confidently wrong — it generates a test file that references a database table name that doesn't exist in their schema. Three engineers are looking at the output and one says, out loud, 'yeah, it just makes stuff up.' How do you handle this moment, and how does your handling of it change the learning trajectory for the rest of the session?",
      rubric:
        "Strong answer: immediately names the failure without apology or drama; validates the engineer's observation: 'You're right — it made an assumption about the schema rather than reading the actual schema. That's a real failure mode. Let's look at why it happened and what we can do about it.'; diagnoses out loud: 'What was in the prompt? Was the schema available for it to read? No — we didn't include it or point the agent at the schema file.'; fix: shows how to include the schema in context (add the schema file to context, or paste the relevant CREATE TABLE statement); extracts durable lesson: 'The rule of thumb here: whenever you're asking the agent to write code that touches your database, give it the schema. Without it, it guesses. With it, it's accurate.'; changes in session trajectory: the skeptic ('just makes stuff up') has now had their concern taken seriously and seen a principled response; the exercise now includes schema context as a required setup step; the failure becomes a lesson that advances everyone's calibration; the rest of the session includes a step where trainees deliberately omit context and observe the failure, then add context and observe the improvement; the contrast is the lesson. Weak answer apologizes, pivots quickly, or dismisses the comment.",
      maxScore: 20,
      placeholder:
        "Describe your immediate response, the diagnostic process you run publicly, and how you restructure the rest of the session around this moment...",
    },
    {
      id: "m14-q4",
      type: "applied",
      text: "A senior engineer in your training session is visibly ahead of the group — she completed the exercise in 8 minutes when others are still working on it 20 minutes later. She's now on her phone. You have 10 beginners who need help. How do you handle the skill distribution in real time, and what do you do specifically with this engineer?",
      rubric:
        "Strong answer: approaches the advanced engineer directly (don't announce it to the group); ask privately what she's found so far — this is both facilitation and intel gathering; offer the extension track if it exists; if not, create one on the fly: 'Since you've finished the main task, here's a harder version: take what you built and try to make the agent produce a wrong output. Then diagnose why and fix it.' This extends her learning into critical evaluation territory while keeping her engaged; after 10 minutes, ask if she'd be willing to share her experience with the group during the debrief — making her a peer teacher; for the beginners: triage — identify which are stuck vs which are just slow; for the stuck, provide a narrower starting prompt (reduce the task scope); announce to the group that the exercise time is flexible and people can work at their own pace, removing the pressure that's creating shame in the slower engineers; strong answers also note that the advanced engineer's presence is an asset, not a problem — the goal is to use her ahead-of-the-curve position to help others rather than to manage her boredom. Weak answer either ignores her or slows the session down for everyone.",
      maxScore: 20,
      placeholder:
        "Describe specifically what you do with the advanced engineer and how you manage the skill distribution for the rest of the group in parallel...",
    },
    {
      id: "m14-q5",
      type: "hands_on",
      text: "Design a 3-hour training session for a team of 8 backend engineers (Java/Spring Boot, all experienced, none have used agentic tools before) who will be adopting Claude Code. Include: session objectives, the demo content and narration script highlights, the exercise design (with base track and extension), the debrief structure, and the follow-up plan.",
      rubric:
        "Strong answer: objectives — specific and measurable: 'By end of session, each engineer will have (1) completed one real task with Claude Code successfully, (2) identified one limitation in the tool through first-person experience, (3) committed to one specific task they'll try in their next sprint'; demo content — narrated, 15 minutes, shows: reading a Spring Boot service file and generating a test class for it, with narration on prompt decisions; extension on schema-aware code generation with narration on context management; exercise design — base track: take the last service they worked on, generate a test class, evaluate correctness, make one correction; extension track: generate an integration test that requires database context — requires them to figure out how to provide schema context themselves; exercises must run on their own machines with their own code; debrief — 4-question structure: what worked / what failed / what did you fix / what will you do differently; 10 minutes; follow-up plan: 24-hr personalized Slack message referencing something specific each person did; day 3 check-in on committed task; week 2 optional 30-minute group share-out; week 4 metrics review with EM. Weak answer designs a generic session without connecting to Java/Spring Boot context or provides no extension track.",
      maxScore: 20,
      placeholder:
        "Design the complete 3-hour session with all five components specified for a Java/Spring Boot team...",
    },
    {
      id: "m14-q6",
      type: "hands_on",
      text: "Write the debrief facilitation script for the end of a 2-hour hands-on training session. Include: the exact questions you ask, the prompts you use when answers are vague, what you do when the group is silent, and how you close the session with behavior-change commitments from each participant.",
      rubric:
        "Strong answer: question 1 script — 'What worked? Tell me a specific moment, not a general impression.' Silence prompt: 'Think about the last 90 minutes. Was there a moment when the output surprised you in a good way?' Vague answer prompt: 'Can you tell me what the task was and what the agent actually produced?'; question 2 script — 'What failed? Describe a specific moment.' Silence prompt: 'Think about a moment when you had to redo a prompt or when the output wasn't what you wanted.' Vague answer prompt: 'What was different about what you expected vs what you got?'; question 3 script — 'What did you do when it failed?' Vague answer prompt: 'Walk me through what you tried.'; question 4 script — 'Complete this sentence out loud: The next time I work on [task type], I will...' Silence prompt: 'Think about your sprint this week. What's one task you're going to work on? Now tell me how you'd start it with Claude Code.'; closing commitment: go around the room, each person states one specific task they commit to trying before the next check-in — write it down in their presence; you repeat it back to them ('So [name] will try [task] by [day]') to make it concrete and public; strong answers note that public commitments (made in front of peers) are more durable than private ones. Weak answer provides generic facilitation advice without the specific scripts.",
      maxScore: 20,
      placeholder:
        "Write the complete facilitation script with specific question wording, silence/vague-answer prompts, and the commitment-closing sequence...",
    },
    {
      id: "m14-q7",
      type: "edge_case",
      text: "You're 45 minutes into a training session when the agent's MCP server goes down — Claude Code can no longer access the codebase. You have 8 engineers, 1.5 hours left, and a session plan that is entirely hands-on. What do you do?",
      rubric:
        "Strong answer: doesn't panic or apologize excessively; checks quickly whether the issue is recoverable in 5 minutes (restart the MCP server, check connectivity) — if yes, fix it; if not, pivot immediately; the pivot plan: the failure is itself teachable — briefly name what happened ('the MCP server is the component that gives Claude access to your codebase; when it goes down, it falls back to conversation-only mode'); pivot the exercise to something that works without the MCP: prompt engineering with pasted code (copy a function from their codebase and paste it into the context); this teaches the fallback mode engineers will need when MCP is unavailable; alternatively: use the time for a structured discussion exercise — each engineer identifies three tasks in their current sprint and categorizes them: high/medium/low agent-suitability, with justification; this develops the meta-skill of knowing when to use the tool; closes the session with the insight: 'Part of working with agentic tools is knowing the failure modes and their recovery paths — you've now seen one live'; follow up with a second session when the infrastructure is back. Strong answers treat the failure as curriculum, not as an obstacle. Weak answer says 'reschedule the session' or tries to continue with a broken environment.",
      maxScore: 20,
      placeholder:
        "Describe your immediate response, your pivot plan, what you teach from the failure, and how you close the session...",
    },
    {
      id: "m14-q8",
      type: "edge_case",
      text: "After a training session you facilitated, one of the engineers contacts you privately and says: 'I found something in the session — when I asked Claude to analyze our authentication code, it produced a detailed breakdown that included what looked like a security vulnerability. I screenshotted it but didn't say anything because I wasn't sure if it was real. What should I do, and what should you have done differently to handle this kind of moment in a session?' Answer both questions.",
      rubric:
        "Strong answer for what the engineer should do: report it to their security team immediately through the team's standard vulnerability reporting process; don't dismiss it just because it came from an AI — the AI may have correctly identified a real vulnerability; don't share the screenshot publicly; treat it the way they'd treat any potential security finding until it's evaluated by someone who can assess it; for what you should have done differently in the session: (1) pre-session: when working with security-sensitive code in a training context, establish upfront that if the agent identifies what looks like a security issue, the session pauses and the engineering manager or security lead is notified before continuing — this is a 'stop and report' protocol; (2) in the session setup: consider whether sensitive production code should be in the training scope at all — training exercises can use a sandboxed or anonymized codebase for security-sensitive areas; (3) broader principle: agentic tools used during training sessions are still running real analysis on real code; if that analysis surfaces real findings, those findings have real implications regardless of the training context; strong answers note that this is actually a positive outcome (a vulnerability may have been found) and a process gap (no protocol existed for handling security findings that emerge during training). Weak answer focuses only on what the engineer should do without addressing the training session protocol failure.",
      maxScore: 20,
      placeholder:
        "Answer both questions: what the engineer should do now, and what you should have done differently in the session setup and design...",
    },
  ],
};
