# 002 VM tool for Kubernetes nodes

**Status:** Proposed
**Date:** 2026-10-06
**Decided in task:** 0.7

## Context
Phase 4 needs a multi-node Kubernetes cluster where each node behaves like a separate machine:
stopping a node should look like a server going down. The VMs must be created by a script in
`infra/` so the cluster can be rebuilt from scratch. 64 GB RAM leaves plenty of room for 3–4 VMs.

## Options

| Option | Pros | Cons |
|---|---|---|
| **Multipass** | Real VMs, each with its own kernel; cloud-init; simple CLI, easy to script | Ubuntu images only; LAN access needs bridged networking |
| **OrbStack machines** | Already installed (ADR 001), very fast | All machines **share one kernel**: nodes are not truly separate; multi-node k3s not confirmed |
| **UTM** | GUI, any OS (also desktop Linux) | Hard to script; more clicking than code |
| **Lima** | Open source, CLI, YAML templates | More configuration than Multipass |
| **VMware Fusion / Parallels** | Polished, strong networking | Heavier; Parallels is paid; less suited to scripting |

**Leaning:** Multipass. "Right tool for each job": OrbStack for Docker, Multipass for nodes that are
real machines. cloud-init is also used by cloud providers, so it is a skill that transfers.

Check during 0.7 and 0.8: do running instances start again after a Mac reboot, and how does bridged
networking behave on this Mac?

## Decision

## Consequences
