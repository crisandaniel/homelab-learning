# Agent instructions: dev track

> Applies to everything under `dev/`. The shared method (mentor role, session flow, closing a task,
> hard rules) is in the root `AGENTS.md`; this file adds the dev context.
> Paths below are relative to `dev/`.

## Goal of this track

Go from "I can fix bugs in an existing codebase" to "I can build a full-stack TypeScript app from
scratch and explain how it works". The learner has seen a lot of code at the surface (Angular,
React, Next, Rails); the gap is **concepts** and **building from zero**.

Layers, from most to least transferable:

```
language (JS/TS)  →  web platform (DOM, HTTP, event loop)  →  framework patterns (components, state)  →  framework API
```

Spend the time at the bottom; the top is looked up in docs.

## Map

```
README.md                          roadmap: stages → concepts → mini-projects (progress checklist)
concepts/<NN-tech>/<id-name>/      one folder per concept: README.md (task) + example files
projects/<Pn-name>/                mini-projects built from scratch, each with its own compose.yaml
templates/                         concept.md and project.md
```

The capstone project (end of stage 6) gets **its own repository**: it is the portfolio piece.

## Resources (in order of use)

| Stage | Primary | Reference |
|---|---|---|
| JavaScript | [javascript.info](https://javascript.info) Part 1 | MDN; *You Don't Know JS Yet* for depth |
| Web platform | javascript.info Part 2 (DOM, events, fetch); Full Stack Open part 0 | MDN, web.dev |
| TypeScript | TypeScript Handbook; Total TypeScript (free parts) | TS Playground, type-challenges (easy/medium only) |
| React | [react.dev/learn](https://react.dev/learn) (do the Challenges); Full Stack Open parts 1, 2, 5, 7 | React TypeScript Cheatsheet |
| Node backend | Full Stack Open parts 3, 4, 13 | Node docs |
| Next.js | [nextjs.org/learn](https://nextjs.org/learn) | Next docs |
| Ship | Full Stack Open parts 11 (CI/CD), 12 (containers) | Playwright docs |

When a chapter has outdated parts (e.g. `var`-era patterns, `XMLHttpRequest`), say which to skip.

## The concept loop

Each concept task (`templates/concept.md`) follows:

1. **Read** the linked chapter (only the listed sections).
2. **Write** `examples.js` / `.ts` with the material **closed**. Comments explain *why*, not syntax.
3. **Exercise** without the material open: the "Done when" check.
4. **Predict**: a "what does this print?" snippet, answered before running.
5. **Close**: In my own words, flashcards, journal, commit (see root `AGENTS.md`).

Every 5–8 concepts there is a **mini-project** (`templates/project.md`) that combines them, built
from scratch with no tutorial open. Mini-projects are where "I can't build from zero" gets fixed;
do not skip them.

## Creating tasks

Create concept and project files **when the learner reaches them**, using the templates.

- Link the exact chapter(s) and say what to skip. Estimate reading time.
- "Write" says **what** the examples must demonstrate, never the code.
- "Done when" is something they can run: an exercise that passes, output that matches.
- "Predict" snippets must be **verified by running them** before they go in the file; put the answer
  inside `<details>`.
- Target 30–60 minutes per concept. Split anything bigger.

## Running code: Docker from day one

The learner runs code in throwaway containers, to practise Docker daily without installing tools on
the host:

- Single files: a `docker run --rm` with the folder bind-mounted (they build the command in task 0.1).
- Projects: one `compose.yaml` per project; `node_modules` lives in a **named volume**, never in the
  bind mount (host is darwin-arm64, container is linux-arm64: native packages break).
- Dev servers must listen on `0.0.0.0` inside the container.
- **Escape hatch:** if they cannot tell whether a problem is the code or Docker, suggest running the
  same file directly on the laptop to isolate it. Docker must not block JS learning for more than
  15 minutes.

## Depth

Essential = shows up in real bugs or interviews. Examples: closures, `this`, event loop,
promises, references vs. copies, React re-rendering: **essential**. Labels and `with`, legacy
prototype tricks, exotic type gymnastics: **skip for now**.

## Modes

- **"quiz dev stage N"**: 5–8 questions, mixing "what does this print?" and "explain why".
- **"interview <topic>"**: act as a technical interviewer for a mid-level full-stack role:
  one question at a time, follow-ups on weak answers, honest feedback at the end.
- **"review my code"**: review code in a concept or project folder. Ask questions and point at
  problems; do not rewrite it.
