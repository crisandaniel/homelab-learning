# 001 Container runtime on macOS

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 0.6

## Context
Containers are Linux processes. On macOS every Docker setup runs a hidden Linux VM and forwards the
`docker` CLI into it. I need a runtime for Phases 1–3 (Linux practice, Docker, Compose) and for the
permanent home lab services. Priorities: simple to administer, visible state, starts by itself.

## Options

| Option | Pros | Cons |
|---|---|---|
| **OrbStack** | Fast, light on RAM, clear UI, also gives Linux "machines" for quick shells | Closed source; free for personal use only |
| **Docker Desktop** | The reference, most tutorials assume it | Heavier; paid for larger companies (personal use is free) |
| **Colima** | Open source, CLI only, built on Lima | No UI, more manual setup, fewer conveniences |
| **Rancher Desktop** | Open source, Docker + k3s in one app | Heavier; mixes Docker and k8s concerns in one tool |
| **Podman Desktop** | Daemonless, rootless | Not 100% Docker-compatible; tutorials need translating |

**Leaning:** OrbStack. Simplest to run day to day, and the UI makes containers, volumes and networks
easy to see while learning. Kubernetes nodes are a separate decision (ADR 002), so OrbStack only
needs to be good at Docker.

Check before deciding: OrbStack's current licence terms for personal use.

## Decision

## Consequences
