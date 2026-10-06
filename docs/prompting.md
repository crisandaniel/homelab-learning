# Notes on prompting: how `AGENTS.md` is built

`AGENTS.md` is a **system prompt**: text the agent reads before every conversation in this repo.
This file explains why it is written the way it is, so I can improve it as I learn.

## How agents find it

| Tool | Reads |
|---|---|
| Claude Code | `CLAUDE.md` (here it contains only `@AGENTS.md`, which imports the shared file) |
| Codex, Cursor and others | `AGENTS.md` (an open convention shared across tools) |

One source of truth, several tools. Same idea as not copy-pasting config.

## Anatomy of the prompt

| Section | What it does | Why it is there |
|---|---|---|
| **Role** | "Mentor, not implementer" + what failure looks like | The default behaviour of a coding agent is to *do the work*. Without this, it would solve every task for me |
| **Who the learner is** | Background, how I learn, languages | The agent adapts explanations to me instead of to an average user |
| **The lab** | Hardware, tools, practice app | Facts it would otherwise guess wrong (e.g. arm64) |
| **Repo map** | Where things live | It finds progress and decisions without searching blindly |
| **How to run a session** | Numbered steps | A workflow is followed more reliably than scattered rules |
| **Creating tasks** | Format and constraints | Every generated task looks the same and stays 30–60 min |
| **Decisions** | Present options, I decide | Prevents the agent from silently choosing for me |
| **Modes** | Trigger phrases ("quiz phase N") | Short commands for behaviours I use often |
| **Hard rules** | Things that must never happen | Safety and secrets, kept short and separate so they stand out |

## Techniques used

1. **Give the reason, not just the rule.** "Hints are graded" alone is vague; saying *why* (I learn
   by struggling a bit first) lets the agent handle cases the rule did not foresee.
2. **Say what success and failure look like.** "If you do the work for them, the session failed"
   is clearer than "try not to give answers".
3. **Prefer positive, concrete instructions.** "Ask for a prediction before a command" works better
   than "don't just give commands".
4. **Define verifiable outputs.** "Done when" must be a check, never "I understand X". Vague goals
   give vague results, for agents and for people.
5. **Keep facts current, not historical.** The prompt states how things are; decisions live in the
   ADRs and the prompt points to them, so it does not go stale.
6. **Short hard-rules list.** Too many "NEVER" rules dilute each other.

## How to improve it

When the agent does something I did not want:
1. Note what happened in `JOURNAL.md`.
2. Ask: was the instruction missing, vague, or contradicted by another one?
3. Change **one** thing in `AGENTS.md`, with the reason, and commit it (`prompt: ...`).
4. Watch the next session. The git history of `AGENTS.md` becomes a record of what I learned
   about prompting.

## Experiments to try later
- Remove the **Role** section for one session and compare how the agent behaves.
- Write a reusable **skill** for "create the next task" and compare it with the instructions here.
- Ask two different agents (e.g. Claude Code and Codex) to create the same task and compare results.
