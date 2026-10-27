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
| `<id>-<name>.md` | Notebook for one sub-task, next to its code file: notes + flashcards (see [Anki](#anki)) |
| `my-anki-cards/` | Submodule: the [AnkiOps](https://pypi.org/project/ankiops/) collection that syncs the cards with Anki |
| [`AGENTS.md`](AGENTS.md) | Shared agent prompt; each track adds its own `AGENTS.md` |
| [`docs/prompting.md`](docs/prompting.md) | How the agent prompts are built, and how to improve them |

## Commits and tags

- Commit per task, prefixed by track: `dev 1.5 closures: counter example`,
  `homelab 0.3 ssh: key-only login works`.
- Tag per stage or phase: `dev-stage-1-done`, `homelab-phase-0-done`.

## Anki

Cards live in **Markdown notebooks in this repo**; the files are the source of truth. Each
sub-task has one `.md` next to its code file, with the same name: `1.1.1-types.js` →
`1.1.1-types.md`. The notebook is where notes and flashcards for that sub-task go.
[AnkiOps](https://pypi.org/project/ankiops/) syncs the cards with Anki through the
`my-anki-cards/` submodule.

Card format: a line starting with `Q:` (front), then one starting with `A:` (back); cards are
separated by `---`. Code goes in normal fenced blocks. Leave the `<!-- note_key ... -->` comments
alone: AnkiOps adds them and uses them to update the same note instead of making a duplicate.

> Any `.md` with a line that **starts** with `Q:` or `A:` becomes a deck. Do not start lines that
> way in other docs (READMEs, journal).

Sync (Anki Desktop must be open):

| Command | What |
|---|---|
| `npm run anki:link` | Symlink every `.md` with `Q:`/`A:` lines into `my-anki-cards/`, named by its path (`dev__concepts__...__1.1.1-types.md`). Run after adding a new notebook |
| `npm run anki:fa` | Files → Anki: push new and edited cards into Anki |
| `npm run anki:af` | Anki → files: pull edits made in Anki back into the Markdown files |

- **After a sub-task:** write the cards in its notebook, `anki:link` (if the file is new),
  `anki:fa`, commit the notebook with the code.
- **Edited a card in Anki** (desktop or phone): `anki:af`, then commit the changed files.
- **Daily:** 10 minutes of reviews, on the Mac or the phone (AnkiWeb sync).

Good card: "What happens to a pod that fails its readiness probe?" Weak card: "What is a readiness
probe?" Ask **why** and **what happens when**, not syntax.
