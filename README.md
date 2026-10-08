# homelab-learning

Two learning tracks, one method: **understand concepts, build things from scratch, remember them.**

| Track | What | Priority | Start here |
|---|---|---|---|
| **Dev** | JavaScript → TypeScript → React → Node → Next.js → ship it | Main: 3–4 sessions a week | [`dev/README.md`](dev/README.md) |
| **Homelab** | Linux → Docker → Compose → Kubernetes, on a Mac mini + Synology | Secondary: 1–2 sessions a week | [`homelab/README.md`](homelab/README.md) |

They meet at the end: dev projects run in Docker from day one and get deployed on the home lab.

## The method

```
learn a concept → close the material → build / explain it myself → verify → flashcards → commit → next
```

1. **20% material, 80% producing.** Read a chapter, then close it and write or do it myself.
2. **Predict** what code or a command will do before running it.
3. **Stuck for more than 20 minutes:** open the next hint, or ask the agent, saying first what I tried.
4. **Done when** a verifiable check passes, never "I think I understand".
5. **Close the task:** "In my own words" (Romanian is fine), 1–3 flashcards, a journal entry,
   tick the box, commit.
6. **End of a stage or phase:** tag it and ask the agent for a quiz.

**AI is a mentor, not a ghostwriter.** No AI autocomplete in this repo while learning; the agent
explains, asks, reviews, but does not write learning code for me. See [`AGENTS.md`](AGENTS.md).

Rhythm: 30–45 minutes a day, 4–5 days a week. Consistency beats long weekends.

## Shared files

| File | What |
|---|---|
| [`JOURNAL.md`](JOURNAL.md) | One log for both tracks, entries tagged `[dev]` or `[homelab]` |
| [`flashcards.tsv`](flashcards.tsv) | Anki import file for both tracks |
| [`AGENTS.md`](AGENTS.md) | Shared agent prompt; each track adds its own `AGENTS.md` |
| [`docs/prompting.md`](docs/prompting.md) | How the agent prompts are built, and how to improve them |

## Commits and tags

- Commit per task, prefixed by track: `dev 1.5 closures: counter example`,
  `homelab 0.3 ssh: key-only login works`.
- Tag per stage or phase: `dev-stage-1-done`, `homelab-phase-0-done`.

## Anki

`flashcards.tsv` is tab-separated, one card per line: `Front`, `Back`, `Tags`, `Deck`.
The header lines tell Anki how to read it, so no import settings need changing.

- **Import:** Anki → File → Import → `flashcards.tsv`. If asked about duplicates, choose
  **Update**: re-importing the whole file is safe and keeps review progress.
- **Decks:** `Learning::Dev` and `Learning::Homelab` (created on first import).
- **Tags:** `dev js task-1.5`, `homelab phase-0 task-0.3`. Filter by tag before a quiz.
- **Editing:** tabs are invisible; in Neovim `:set list` shows them as `^I`.
- **Daily:** 10 minutes of reviews, on the Mac or the phone (AnkiWeb sync).

Good card: "What happens to a pod that fails its readiness probe?" Weak card: "What is a readiness
probe?" Ask **why** and **what happens when**, not syntax.
