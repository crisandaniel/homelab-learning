# Agent instructions: homelab track

> Applies to everything under `homelab/`. The shared method (mentor role, session flow, closing a
> task, hard rules) is in the root `AGENTS.md`; this file adds the lab context.
> Paths below are relative to `homelab/`.

## Goal of this track

Understand and retain Docker, Kubernetes and the infrastructure around them by building a real
home lab. Secondary to the dev track in time, but it is where the dev projects get deployed.

## The lab

| Component | Details |
|---|---|
| Server | Mac mini M5 Pro, 64 GB RAM, 512 GB internal SSD, 10 GbE, Apple Silicon (**arm64**) |
| Storage | Synology DS1522+ (1 GbE today, 10 GbE module planned) |
| Optional | External 1 TB NVMe (not bought yet) |
| Tool principle | Right tool for each job. Every choice is recorded as an ADR in `docs/decisions/` |
| Host role | The Mac mini is **production**: real services (e.g. a website) run there in containers, alongside the lab. Every experiment runs in a VM or container, never directly on the host. Before suggesting anything that installs, changes or restarts something on the host, say so and ask |
| Remote access | Needed from outside the home: SSH + desktop |
| Practice app | Docker's `example-voting-app` (vote/Python, result/Node, worker/.NET, Redis, Postgres). Only the **source code** is copied; the learner writes every Dockerfile, compose file and manifest from scratch |

Check `docs/decisions/` for the current state of each decision. **Proposed** means not decided yet:
do not assume the leaning option was chosen.

## Map

```
README.md              phases 0–5 as a checklist (source of truth for progress in this track)
phases/<N>-<name>/     one folder per phase, one folder per task inside
docs/decisions/        ADRs (status Proposed / Accepted / Superseded)
templates/             task.md and adr.md
infra/                 scripts and config that rebuild the lab (cloud-init, cluster scripts, network notes)
```

## Creating tasks

Task files are created **when the learner reaches them**, not in advance. Use `templates/task.md`:

- `Why` and `Concepts`: what they learn and why it matters.
- `Requirements`: describe **what** to achieve, never **how**. No commands in requirements.
- `Done when`: one verifiable check (a command output, a URL that responds), never "I understand X".
- `Hints`: inside `<details>`, graded from vague to specific.
- Target 30–60 minutes per task. Split anything bigger.

## Decisions (ADRs)

When a task needs a choice (tool, protocol, layout), do not decide for the learner. Present the
options in an ADR (`templates/adr.md`), with trade-offs and your leaning, then let them pick.
They write the "Decision" and "Consequences" sections, then mark it **Accepted**.

## Depth

Essential = needed to debug when it breaks. Say so explicitly, e.g. dockershim history: skip;
containerd/CRI mental model: 5 minutes, needed for `crictl`.

## Modes

- **"quiz homelab phase N"**: 5–8 debugging scenarios from that phase, one at a time
  (e.g. "the pod is in CrashLoopBackOff, what do you check first?").

## Track rules

- **Never open router ports** for SSH or desktop access.
- **Confirm before destructive actions** on anything outside a throwaway VM:
  NAS shares and data, router config, macOS system settings, deleting VMs that hold data.
- **arm64:** when an image fails with `exec format error` or has no matching manifest,
  treat it as a learning moment about multi-arch images, not something to silently work around.
